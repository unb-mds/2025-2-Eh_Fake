import requests
import requests.compat 
from bs4 import BeautifulSoup
from newsplease import NewsPlease
import json
import os
import time
import re
from datetime import date, datetime, timedelta

#Para utilizar este código, atente-se que ele é altamente configuravel
#Opções de configuração incluem as variaveis globais, alterar a DAYS por exemplo
#Faz com que o programa salve noticias dos últimos 3 dias(incluso hoje)
#Abaixo alem de poder alterar o SITE_MAP, adicionando mais páginas
#Voce tambem pode alterar em cada scrapper a opção max-depth individualmente
#Alterando a profundidade de busca

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
    #"TECMUNDO": {
    #    "homepage": "https://www.tecmundo.com.br/",
    #    "scraper": "scrape_tecmundo_links"
    #},
    #"OFUXICO": {
    #    "homepage": "https://www.ofuxico.com.br/",
    #    "scraper": "scrape_ofuxico_links"
    #},
    "TV_FOCO": {
        "homepage": "https://tvfoco.uai.com.br/",
        "scraper": "scrape_tvfoco_links"
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


# Certifique-se de que HOJE está definido no topo do script!
# from datetime import date; HOJE = date.today() 

# Adicione o parâmetro max_depth=1 (ou 2, se quiser mais profundidade)
def scrape_olhardigital_links(homepage_url, max_depth=2):
    """
    Rastreia o Olhar Digital, visitando a homepage e páginas de categoria até a profundidade definida.
    max_depth=1: Apenas a homepage (os links são extraídos, mas não seguidos).
    max_depth=2: Homepage (Nível 1) + Páginas linkadas na homepage (Nível 2).
    """
    
    urls_to_crawl = {homepage_url}  # URLs na fila para rastreamento (URLs de categoria/homepage)
    urls_crawled = set()            # URLs que já foram processadas
    article_urls_found = set()      # URLs finais dos artigos (o que será retornado)
    
    current_depth = 1 
    
    print(f"Buscando links em Olhar Digital até a profundidade {max_depth}...")

    # --- Lógica de Profundidade ---
    while urls_to_crawl and current_depth <= max_depth:
        print(f"  > Rastreando Nível {current_depth} ({len(urls_to_crawl)} URLs na fila)...")
        
        # Faz uma cópia da fila para processar este nível e limpa a fila original para o próximo
        urls_to_process_in_level = urls_to_crawl.copy()
        urls_to_crawl.clear() 
        urls_crawled.update(urls_to_process_in_level) # Adiciona ao histórico de visitadas

        for url in urls_to_process_in_level:
            try:
                # Adiciona um pequeno atraso (respeito ao servidor)
                time.sleep(0.5) 
                
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Seletores que buscam links em todos os tipos de "card" de notícia/categoria
                seletores_precisos = [
                    'a.p-ftfeat',       # Destaques principais
                    'a.p-item',         # Itens de lista/secundários
                    'div[class^="card-"] a' # Genérico para cards de notícia
                ]
                
                for seletor in seletores_precisos:
                    for link_element in soup.select(seletor):
                        href = link_element.get('href')
                        
                        # Converte para URL absoluta
                        full_url = requests.compat.urljoin(homepage_url, href).split('#')[0]

                        # Filtros Comuns
                        is_olhar_digital = 'olhardigital.com.br' in full_url
                        is_media_file = any(ext in full_url for ext in ['.jpg', '.png', '.mp4', '.gif'])
                        
                        # O Olhar Digital usa o formato URL/ANO/MES/DIA/CATEGORIA/ARTIGO/
                        # Links de Artigo são mais longos que links de categoria
                        is_article = full_url.count('/') > 5 

                        if is_olhar_digital and not is_media_file:
                            
                            if is_article:
                                # 1. É um link de artigo final: Salva
                                article_urls_found.add(full_url)
                            
                            elif current_depth < max_depth and full_url not in urls_crawled:
                                # 2. É um link de categoria (e ainda podemos aprofundar): Adiciona à fila
                                urls_to_crawl.add(full_url)
                                
            except Exception:
                # Se falhar em uma URL, ignora e continua
                pass 
                
        current_depth += 1
    # --- Fim da Lógica de Profundidade ---

    print(f"\nBusca em Olhar Digital concluída. Total de links de artigos finais encontrados (Nível 1 a {max_depth}): {len(article_urls_found)}")
    return list(article_urls_found)


def scrape_tecmundo_links(homepage_url, max_depth=2):
    """
    Rastreia o TecMundo, usando a lógica de profundidade para capturar artigos de lista e categorias.
    """
    
    urls_to_crawl = {homepage_url}
    urls_crawled = set()
    article_urls_found = set()
    
    current_depth = 1 
    
    print(f"Buscando links em TecMundo até a profundidade {max_depth}...")

    while urls_to_crawl and current_depth <= max_depth:
        print(f"  > Rastreando Nível {current_depth} ({len(urls_to_crawl)} URLs na fila)...")
        
        urls_to_process_in_level = urls_to_crawl.copy()
        urls_to_crawl.clear() 
        urls_crawled.update(urls_to_process_in_level)

        for url in urls_to_process_in_level:
            try:
                time.sleep(0.5) 
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # --- SELETORES DE ARTIGOS (Para EXTRAÇÃO) ---
                # 1. Links principais do corpo e destaques:
                article_selectors = ['article a[href]']
                
                # 2. Links de "Mais Lidas" e "Leia também" (links de artigos secundários)
                secondary_article_selectors = [
                    'section.styles_container__ctK35 a[href]', # Mais Lidas
                    'li.styles_call_item__xLsq1 a[href]'      # Leia também
                ]

                # --- SELETORES DE NAVEGAÇÃO (Para PROFUNDIDADE) ---
                # 1. Links de menu de categoria (que queremos seguir)
                category_selectors = ['ul.text-theme-fill-gray-darkest a[href]']
                
                
                # Coleta TODOS os links de artigo (primário e secundário)
                all_article_links = set()
                for sel in article_selectors + secondary_article_selectors:
                    for link in soup.select(sel):
                        href = link.get('href')
                        full_url = requests.compat.urljoin(homepage_url, href).split('#')[0]
                        
                        # Filtro Final (Exclui links de categoria ou externos que podem ter entrado)
                        if 'tecmundo.com.br' in full_url and full_url.count('/') > 3 and not any(ext in full_url for ext in ['youtube.com', 'guia-de-compras', 'minha-serie', '/categoria/']):
                            all_article_links.add(full_url)
                            
                article_urls_found.update(all_article_links)


                # Coleta links de Categoria/Navegação (SÓ SE PODEMOS APROFUNDAR)
                if current_depth < max_depth:
                    for sel in category_selectors:
                        for link in soup.select(sel):
                            href = link.get('href')
                            full_url = requests.compat.urljoin(homepage_url, href).split('#')[0]

                            # Filtro: Deve ser um link de categoria/tag (curto) que ainda não visitamos
                            is_category = ('/tags/' in full_url or '/novidades' in full_url or '/mais-lidas' in full_url)
                            
                            if is_category and full_url not in urls_crawled:
                                urls_to_crawl.add(full_url)
                                
            except Exception:
                pass 
                
        current_depth += 1

    print(f"\nBusca em TecMundo concluída. Total de links de artigos finais encontrados (Nível 1 a {max_depth}): {len(article_urls_found)}")
    return list(article_urls_found)


def scrape_ofuxico_links(homepage_url, max_depth=2):
    """
    Rastreia o Ofuxico, visitando a homepage e páginas de categoria até a profundidade definida,
    com filtros aprimorados e heurística de artigo corrigida.
    """
    
    urls_to_crawl = {homepage_url} 
    urls_crawled = set()           
    article_urls_found = set()     
    
    current_depth = 1 
    domain = 'ofuxico.com.br'
    
    print(f"Buscando links em OFUXICO até a profundidade {max_depth}...")

    while urls_to_crawl and current_depth <= max_depth:
        print(f"  > Rastreando Nível {current_depth} ({len(urls_to_crawl)} URLs na fila)...")
        
        urls_to_process_in_level = urls_to_crawl.copy()
        urls_to_crawl.clear() 
        urls_crawled.update(urls_to_process_in_level) 

        for url in urls_to_process_in_level:
            try:
                time.sleep(0.5) 
                
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Seletores Otimizados: 
                # Adicionado :not() para ignorar links de publicidade (mgbox) em qualquer seletor.
                seletores_precisos = [
                    'h2 a[href]:not(div.mgbox a)',                   
                    'div.post-thumbnail a[href]:not(div.mgbox a)',   
                    '#menu-menu-principal a[href]',  
                    '#menu-menu-central a[href]',
                    # Também capturamos links de lista de posts mais abaixo
                    'div.mctitle a[href]:not(div.mgbox a)'
                ]
                
                for seletor in seletores_precisos:
                    for link_element in soup.select(seletor):
                        href = link_element.get('href')
                        
                        # Limpa a URL: Converte para absoluta, remove âncoras e query parameters (como utm_source)
                        full_url = requests.compat.urljoin(homepage_url, href).split('#')[0].split('?')[0].rstrip('/')

                        # --- Filtros Corrigidos ---
                        is_ofuxico = domain in full_url
                        is_homepage = full_url.rstrip('/') == homepage_url.rstrip('/')
                        
                        # NOVA HEURÍSTICA: Se for do domínio e tiver 5 ou mais barras, é um artigo.
                        # Ex: https:/ /ofuxico.com.br/novelas/dona-de-mim/titulo-da-materia-aqui -> 6 barras
                        is_article = is_ofuxico and full_url.count('/') >= 5 

                        # Categoria: É do domínio, não é a homepage e não é um artigo (terá 3 ou 4 barras)
                        is_category = is_ofuxico and not is_article and not is_homepage
                        
                        if is_article:
                            # 1. É um link de artigo final: Salva
                            article_urls_found.add(full_url)
                        
                        elif is_category and current_depth < max_depth and full_url not in urls_crawled:
                            # 2. É um link de categoria e ainda podemos aprofundar: Adiciona à fila
                            urls_to_crawl.add(full_url)
                                
            except Exception as e:
                # print(f"Erro ao processar URL {url}: {e}") # Descomente para debug detalhado
                pass 
                
        current_depth += 1
        
    print(f"\nBusca em OFUXICO concluída. Total de links de artigos finais encontrados (Nível 1 a {max_depth}): **{len(article_urls_found)}**")
    return list(article_urls_found)
    

def scrape_tvfoco_links(homepage_url, max_depth=2):
    """
    Rastreia o TV FOCO, visitando a homepage e páginas de categoria até a profundidade definida.
    
    :param homepage_url: A URL inicial do site.
    :param max_depth: Nível máximo de profundidade de rastreamento (ex: 2 para homepage + categorias).
    :return: Lista de URLs finais dos artigos.
    """
    
    urls_to_crawl = {homepage_url}  # URLs na fila para rastreamento (URLs de categoria/homepage)
    urls_crawled = set()            # URLs que já foram processadas
    article_urls_found = set()      # URLs finais dos artigos (para extração posterior)
    
    current_depth = 1 
    domain = 'tvfoco.uai.com.br' # Domínio principal do site
    
    print(f"Buscando links em TV FOCO até a profundidade {max_depth}...")

    # --- Lógica de Profundidade (Iterativa) ---
    while urls_to_crawl and current_depth <= max_depth:
        print(f"  > Rastreando Nível {current_depth} ({len(urls_to_crawl)} URLs na fila)...")
        
        urls_to_process_in_level = urls_to_crawl.copy()
        urls_to_crawl.clear() 
        urls_crawled.update(urls_to_process_in_level) 

        for url in urls_to_process_in_level:
            try:
                time.sleep(0.5) 
                
                response = requests.get(url, timeout=15)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Otimização: Seletores para artigos e para links de menu/categoria
                # 1. Artigos: Buscamos links <a> dentro de <article class="post">
                article_selector = 'article.post a[href]' 
                # 2. Categorias/Menu: Buscamos links <a> em menus de navegação (ex: nav.navbar)
                category_selectors = ['nav.navbar a[href]', 'ul.navbar-nav a[href]']
                
                # Combina todos os seletores de interesse
                all_selectors = [article_selector] + category_selectors
                
                for seletor in all_selectors:
                    for link_element in soup.select(seletor):
                        href = link_element.get('href')
                        
                        # Limpa a URL: Converte para absoluta e remove query parameters e âncoras
                        full_url = requests.compat.urljoin(homepage_url, href).split('#')[0].split('?')[0].rstrip('/')

                        # --- Filtros de Domínio e Tipo ---
                        is_tvfoco = domain in full_url
                        is_homepage = full_url.rstrip('/') == homepage_url.rstrip('/')
                        
                        # Artigo: Links de Artigo sempre têm 4 ou mais segmentos (barras)
                        # e são do domínio.
                        # Ex: https://tvfoco.uai.com.br/categoria/slug-do-artigo/
                        is_article = is_tvfoco and full_url.count('/') >= 4 and not is_homepage

                        # Categoria: Links de Categoria têm entre 3 e 4 segmentos (barras) 
                        # e NÃO são artigos, homepage, ou links de feed/tag.
                        is_category = is_tvfoco and full_url.count('/') <= 4 and not is_article and not is_homepage and not any(ext in full_url for ext in ['/tag/', '/feed/'])
                        
                        if is_article:
                            # 1. É um link de artigo final: Salva
                            article_urls_found.add(full_url)
                        
                        elif is_category and current_depth < max_depth and full_url not in urls_crawled:
                            # 2. É um link de categoria e ainda podemos aprofundar: Adiciona à fila
                            urls_to_crawl.add(full_url)
                                
            except Exception:
                # Ignora URLs com erro (404, conexão, etc.)
                pass 
                
        current_depth += 1
    # --- Fim da Lógica de Profundidade ---

    print(f"\nBusca em TV FOCO concluída. Total de links de artigos finais encontrados (Nível 1 a {max_depth}): **{len(article_urls_found)}**")
    return list(article_urls_found)
    

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
        "scrape_tecmundo_links": scrape_tecmundo_links,
        "scrape_ofuxico_links": scrape_ofuxico_links,
        "scrape_tvfoco_links":scrape_tvfoco_links
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