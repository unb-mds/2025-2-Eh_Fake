import requests
from bs4 import BeautifulSoup
from newsplease import NewsPlease
import json
import os
from datetime import date, datetime, timedelta

# --- Variáveis Globais (Mantenha estas no topo do seu minerador.py) ---
HOJE = date.today()
DAYS_TO_LOOK_BACK = 3 # Configure este valor (ex: 7 para uma semana)
BASE_OUTPUT_DIR = 'noticias'
# --- Fim das Variáveis Globais ---

# 1. Mapeamento de Sites: Adicione aqui todos os sites que você quer rastrear.
# Cada entrada requer o URL e a função específica de coleta de links.
SITE_MAP = {
    "G1": {
        "homepage": "https://g1.globo.com/",
        "scraper": "scrape_g1_links"  # Nome da função de raspagem
    },
    "FOLHA": {
        "homepage": "https://www.folha.uol.com.br/",
        "scraper": "scrape_folha_links"
    },
    "UOL": {
        "homepage": "https://www.uol.com.br/",
        "scraper": "scrape_uol_links" # Nome da nova função
    }
    # Adicione mais sites aqui futuramente
}
# -------------------------------------------------------------


# --- FUNÇÕES DE COLETA DE LINKS (SCRAPERS) ---

def scrape_g1_links(homepage_url):
    """Função específica para coletar URLs de artigos da homepage do G1."""
    print(f"Buscando links em G1: {homepage_url}...")
    
    try:
        response = requests.get(homepage_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        links_encontrados = set()
        ano_atual_str = str(HOJE.year)
        
        for a in soup.find_all('a', href=True):
            href = a['href']
            
            # Filtros do G1: deve ser do G1, ser uma notícia e conter o ano atual
            if 'g1.globo.com/' in href and '/noticia/' in href and ano_atual_str in href:
                full_url = requests.compat.urljoin(homepage_url, href).split('#')[0]
                links_encontrados.add(full_url)
                
        return list(links_encontrados)

    except Exception as e:
        print(f"Erro ao obter links do G1: {e}")
        return []

# NOVO: Função para a Folha (EXEMPLO DE RASPADOR ÚNICO)
# ATENÇÃO: Os seletores da Folha (classes, tags) são fictícios e devem ser inspecionados no site real.
def scrape_folha_links(homepage_url):
    """Função específica para coletar URLs de artigos da homepage da Folha."""
    print(f"Buscando links em Folha: {homepage_url}...")
    
    try:
        response = requests.get(homepage_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        links_encontrados = set()
        
        # Exemplo de seletor para a Folha: Procura por tags <a> dentro de elementos que parecem notícias
        for link_element in soup.select('a[data-type="noticia"]'): # Seletor totalmente hipotético
            href = link_element['href']
            
            # Filtro: Garante que é um link válido da Folha (exclui links externos ou de redes sociais)
            if href.startswith('https://www1.folha.uol.com.br/'): 
                links_encontrados.add(href.split('#')[0])
                
        return list(links_encontrados)

    except Exception as e:
        print(f"Erro ao obter links da Folha: {e}")
        return []
    

def scrape_uol_links(homepage_url):
    print(f"Buscando links em UOL: {homepage_url}...")
    try:
        response = requests.get(homepage_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        links_encontrados = set()

        # ESTE SELETOR É APENAS UM EXEMPLO. VOCÊ DEVE INSPECIONAR O REAL.
        for a in soup.select('div.manchete-box a'): 
            href = a['href']
            if 'uol.com.br/noticias/' in href:
                links_encontrados.add(href.split('#')[0])

        return list(links_encontrados)
    except Exception as e:
        print(f"Erro ao obter links do UOL: {e}")
        return []

# --- FUNÇÃO PRINCIPAL DE EXTRAÇÃO E SALVAMENTO ---

def extract_and_save(urls, site_name):
    """Extrai o conteúdo de URLs usando NewsPlease, filtra por data (intervalo) e salva."""
    
    FINAL_OUTPUT_DIR = os.path.join(BASE_OUTPUT_DIR, site_name)
    
    # Cria o subdiretório: .\noticias\SITE_NAME
    if not os.path.exists(FINAL_OUTPUT_DIR):
        os.makedirs(FINAL_OUTPUT_DIR, exist_ok=True)

    # --- CÁLCULO DO INTERVALO DE TEMPO ---
    # DAYS_TO_LOOK_BACK - 1 porque o 'HOJE' já conta como um dia.
    DATA_MINIMA = HOJE - timedelta(days=DAYS_TO_LOOK_BACK - 1)
    
    print(f"\nIniciando extração para {len(urls)} URLs. Destino: {FINAL_OUTPUT_DIR}")
    print(f"Filtrando por intervalo: {DATA_MINIMA} até {HOJE}")

    artigos_salvos = 0
    
    for i, url in enumerate(urls):
        try:
            # print(f"[{i+1}/{len(urls)}] Extraindo: {url}") # Opcional: descomente para logs detalhados
            
            # 1. Extração: NewsPlease em modo biblioteca (sem o argumento 'timeout' para evitar erros)
            article = NewsPlease.from_url(url)
            
            if article and article.date_publish:
                # O NewsPlease retorna um objeto datetime, pegamos apenas a data
                publish_date = article.date_publish.date()
                
                # 2. Filtragem: Verifica se a data está dentro do intervalo
                if publish_date >= DATA_MINIMA and publish_date <= HOJE:
                    # Artigo está no intervalo: salva
                    
                    # 3. Preparação e Salvamento do JSON
                    data = article.get_serializable_dict()
                    
                    # Converte objetos datetime/date para strings no formato ISO (necessário para JSON)
                    for key, value in data.items():
                        if isinstance(value, (datetime, date)):
                            data[key] = value.isoformat()

                    # Cria um nome de arquivo único e inclui a data de publicação
                    url_hash = str(hash(url))[:8]
                    filename = f"{publish_date.strftime('%Y%m%d')}_{url_hash}.json" 
                    filepath = os.path.join(FINAL_OUTPUT_DIR, filename) 
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False, indent=4)
                        
                    print(f"  -> SUCESSO ({publish_date}): Salvo em {site_name}: {filename}")
                    artigos_salvos += 1
                # else:
                    # print(f"  -> IGNORADO: Artigo é de {publish_date}") # Opcional: descomente para ver ignorados

            # else:
                # print("  -> FALHA: Não foi possível extrair a data ou o conteúdo.") # Opcional: ver falhas

        except Exception as e:
            # print(f"  -> ERRO Crítico ao processar {url}: {e}") # Opcional: ver erros
            pass # Ignoramos erros críticos para que o loop continue para o próximo artigo

    # === FIM DO LOOP ===

    print(f"\n--- Processo de {site_name} Finalizado ---")
    print(f"Total de artigos salvos para {site_name}: {artigos_salvos}")


# --- EXECUÇÃO PRINCIPAL ---

def run_all_crawlers():
    """Itera sobre o mapa de sites e executa a raspagem e extração para cada um."""
    
    # Mapeamento do nome da função (string) para a função real
    function_map = {
    "scrape_g1_links": scrape_g1_links,
    "scrape_folha_links": scrape_folha_links,
    "scrape_uol_links": scrape_uol_links, # Adicione aqui
    }

    for site_name, config in SITE_MAP.items():
        print(f"\n========================================================")
        print(f"INICIANDO PROCESSAMENTO PARA: {site_name}")
        print(f"========================================================")
        
        # 1. Coletar a função de raspagem e executá-la
        scraper_function = function_map.get(config["scraper"])
        
        if not scraper_function:
            print(f"ERRO: Nenhuma função de raspagem definida para {site_name}. Pulando.")
            continue
            
        urls_encontradas = scraper_function(config["homepage"])
        
        # 2. Executar a extração e o salvamento
        if urls_encontradas:
            extract_and_save(urls_encontradas, site_name)
        else:
            print(f"Nenhuma URL encontrada para {site_name}.")

if __name__ == '__main__':
    run_all_crawlers()