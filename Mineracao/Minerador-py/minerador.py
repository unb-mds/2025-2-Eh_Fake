import requests
from bs4 import BeautifulSoup
from newsplease import NewsPlease
import json
import os
import time
import re
from datetime import date, datetime, timedelta

# --- Variáveis Globais (Mantenha estas no topo do seu minerador.py) ---
HOJE = date.today()
DAYS_TO_LOOK_BACK = 3 # Configure este valor (ex: 7 para uma semana)
BASE_OUTPUT_DIR = 'noticias'
# --- Fim das Variáveis Globais ---

# 1. Mapeamento de Sites: Adicione aqui todos os sites que você quer rastrear.
# Cada entrada requer o URL e a função específica de coleta de links.
# No topo do seu minerador.py, atualize o dicionário:

SITE_MAP = {
    #"G1": {
    #    "homepage": "https://g1.globo.com/",
    #    "scraper": "scrape_g1_links"
    #},
    #"OLHAR_DIGITAL": {
    #    "homepage": "https://olhardigital.com.br/",
    #    "scraper": "scrape_olhardigital_links"
    #},
    "TECMUNDO": {
        "homepage": "https://www.tecmundo.com.br/",
        "scraper": "scrape_tecmundo_links"
    }
} #Adicionar mais futuramente
# -------------------------------------------------------------


# --- FUNÇÕES DE COLETA DE LINKS (SCRAPERS) ---


def scrape_g1_links(homepage_url, max_depth=2):
    """
    Rastreia a homepage do G1 e suas páginas de categoria até a profundidade definida.
    
    Usa um filtro rigoroso para coletar apenas links de artigos com o ano atual.
    max_depth=2: Nível 1 (Homepage) + Nível 2 (Páginas de Categoria).
    """
    
    # Conjuntos para gerenciar as URLs e garantir que não haja repetição
    urls_to_crawl = {homepage_url}  # URLs que precisam ser visitadas neste ou em futuros níveis
    urls_crawled = set()            # URLs que já foram visitadas
    urls_found = set()              # URLs FINAIS de artigos de notícia (o que realmente queremos)
    
    current_depth = 1 
    ano_atual_str = str(HOJE.year)
    
    # Regex para identificar links de artigos finais do G1
    # Ex: /politica/noticia/2025/11/07/titulo-do-artigo.ghtml
    # O news-please extrai melhor artigos que terminam em .ghtml ou .html
    article_pattern = re.compile(r'/noticia/\d{4}/\d{2}/\d{2}/.+?\.ghtml|\.html')

    print(f"Buscando links em G1 até a profundidade {max_depth}...")

    while current_depth <= max_depth:
        print(f"  > Rastreando Nível {current_depth} ({len(urls_to_crawl)} URLs na fila)...")
        
        # Faz uma cópia dos links para processar e limpa a fila para o próximo nível
        urls_to_process = urls_to_crawl.copy()
        urls_to_crawl.clear() 
        
        # Adiciona os links processados à lista global de rastreados
        urls_crawled.update(urls_to_process)
        
        for url in urls_to_process:
            
            # Pula se a URL já for um artigo (não precisa mais raspá-la)
            if article_pattern.search(url):
                urls_found.add(url)
                continue

            try:
                # Adiciona um pequeno atraso (respeito ao servidor)
                time.sleep(0.5) 
                
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                
                for a in soup.find_all('a', href=True):
                    # Transforma o link em absoluto
                    href = requests.compat.urljoin(homepage_url, a['href']).split('#')[0]
                    
                    # Filtra links que não são do G1
                    if 'g1.globo.com' not in href:
                        continue
                        
                    # Filtro 1: Se é um link de Artigo Final
                    if article_pattern.search(href) and ano_atual_str in href:
                        urls_found.add(href)
                        
                    # Filtro 2: Se é um link de Categoria (e não foi rastreado e não é um artigo final)
                    elif (current_depth < max_depth and 
                          href not in urls_crawled and 
                          not article_pattern.search(href) and
                          href not in urls_to_crawl):
                        
                        # Adiciona à fila para ser visitado no próximo nível
                        urls_to_crawl.add(href)
                        
            except requests.exceptions.RequestException as e:
                # Ignora URLs que dão erro 404, timeout, etc.
                pass 
                
        current_depth += 1
        
    print(f"\nTotal de links de artigos finais encontrados (Nível 1 a {max_depth}): {len(urls_found)}")
    return list(urls_found)


def scrape_olhardigital_links(homepage_url):
    """Função específica para coletar URLs de artigos da homepage do Olhar Digital."""
    print(f"Buscando links em Olhar Digital: {homepage_url}...")
    
    try:
        response = requests.get(homepage_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        links_encontrados = set()
        
        # Seletores combinados:
        # 1. 'a.p-ftfeat': Capta os destaques principais (conforme seu primeiro código)
        # 2. 'a.p-item': Capta os itens de lista de notícias (conforme este seu novo código)
        # 3. 'div[class^="card-"] a': Mantém um seletor genérico para links em cards
        seletores_precisos = [
            'a.p-ftfeat',
            'a.p-item',
            'div[class^="card-"] a'
        ]
        
        for seletor in seletores_precisos:
            for link_element in soup.select(seletor):
                 href = link_element.get('href')
    
                 # Filtro: Garante que é um link válido de artigo no domínio principal e não é um link de mídia.
                 if href and 'olhardigital.com.br' in href and not any(ext in href for ext in ['.jpg', '.png', '.mp4', '.gif']):
                     links_encontrados.add(href.split('#')[0])
                     
        print(f"Total de links potencialmente úteis encontrados no Olhar Digital: {len(links_encontrados)}")
        return list(links_encontrados)

    except Exception as e:
        print(f"Erro ao obter links do Olhar Digital: {e}")
        return []


def scrape_tecmundo_links(homepage_url):
    """Função otimizada para coletar URLs de artigos da homepage do TecMundo."""
    print(f"Buscando links em TecMundo: {homepage_url}...")
    
    try:
        response = requests.get(homepage_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        links_encontrados = set()
        
        # OTIMIZAÇÃO: Busca por TODOS os links (<a>) que estão dentro de uma tag <article>.
        # <article> é a tag semântica para um bloco de conteúdo independente (artigo/notícia).
        # Isto é MUITO mais robusto do que usar classes que mudam.
        for a_tag in soup.select('article a[href]'):
             href = a_tag.get('href')

             # 1. CONVERSÃO DE URL: Garante que a URL seja absoluta.
             full_url = requests.compat.urljoin(homepage_url, href).split('#')[0]

             # 2. FILTRO RIGOROSO: Garante que seja um artigo e não um link de vídeo externo.
             # * Deve ser do domínio tecmundo.
             # * Deve ser um artigo (geralmente não é um link de YouTube, de Guia de Compras genérico, ou de outro site).
             if ('tecmundo.com.br' in full_url and 
                 not any(ext in full_url for ext in ['youtube.com', 'guia-de-compras', 'minha-serie'])):
                 
                 links_encontrados.add(full_url)
                     
        print(f"Total de links potencialmente úteis encontrados no TecMundo: {len(links_encontrados)}")
        return list(links_encontrados)

    except Exception as e:
        print(f"Erro ao obter links do TecMundo: {e}")
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
        "scrape_olhardigital_links": scrape_olhardigital_links,
        "scrape_tecmundo_links": scrape_tecmundo_links
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