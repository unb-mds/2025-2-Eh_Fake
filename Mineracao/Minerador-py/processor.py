import os
import json
from glob import glob
from datetime import datetime

# --- CONFIGURAÇÕES DE DIRETÓRIOS ---
BASE_INPUT_DIR = 'noticias'
# Diretório onde os arquivos padronizados serão salvos para o BD
FINAL_OUTPUT_DIR = os.path.join(BASE_INPUT_DIR, 'finais')
# Nome da subpasta que deve ser IGNORADA na leitura
EXCLUDE_FOLDER_NAME = 'finais'
# ------------------------------------

# ESQUEMA FINAL DO BANCO DE DADOS (BD) - Campos que devem estar no JSON final
# (Excluindo 'id', que é serial/gerado pelo BD)
BD_FIELDNAMES = [
    'title',
    'description',
    'imageSrc',
    'imageAlt',
    'status',
    'confidence',
    'source',
    'link',
    'created_at' # Mapeado para data de extração/processamento
]

def process_and_unify_data():
    """
    Percorre todos os arquivos JSON brutos nas subpastas de entrada, 
    padroniza seus campos para o esquema final do BD e salva os arquivos 
    prontos na subpasta 'finais'.
    """
    
    # 1. Cria a pasta de destino se ela não existir
    if not os.path.exists(FINAL_OUTPUT_DIR):
        os.makedirs(FINAL_OUTPUT_DIR)
        print(f"Diretório de saída criado: '{FINAL_OUTPUT_DIR}'")

    # 2. Busca recursivamente todos os arquivos JSON brutos
    all_json_files = glob(os.path.join(BASE_INPUT_DIR, '**', '*.json'), recursive=True)
    
    # Filtra: exclui arquivos que já estão na pasta final
    files_to_process = [
        fp for fp in all_json_files 
        if EXCLUDE_FOLDER_NAME not in fp.split(os.sep)
    ]
    
    if not files_to_process:
        print(f"AVISO: Nenhuma arquivo JSON novo encontrado para processar.")
        return

    print(f"Processando e padronizando {len(files_to_process)} artigos para o esquema final do BD...")

    processed_count = 0
    # Carimbo de data/hora usado para o campo 'created_at' do BD (data de inserção/processamento)
    current_time = datetime.now().isoformat() 

    for filepath in files_to_process:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                article = json.load(f)
            
            # --- CORREÇÃO/CONFIRMAÇÃO DO CAMPO SOURCE: EXTRAI O NOME DA PASTA (SITE) ---
            # Exemplo: './noticias/G1/arquivo.json' -> ['G1']
            path_segments = filepath.split(os.sep)
            
            # Procuramos o nome da pasta diretamente após 'noticias' (BASE_INPUT_DIR)
            # O índice '2' é o mais comum, mas vamos garantir que ele exista.
            try:
                # O nome do site é o diretório que precede o diretório do arquivo.
                site_name = path_segments[-2] 
                # Se houver um './noticias/G1/arquivo.json', o [-2] é 'G1'
                if site_name == BASE_INPUT_DIR:
                     # Caso raro onde o arquivo está na raiz de 'noticias'
                    site_name = 'UNKNOWN'
            except IndexError:
                site_name = 'UNKNOWN'

            # Dicionário FINAL (garante a ordem e presença de todos os campos do BD)
            standardized_data = {}
            
            for field in BD_FIELDNAMES:
                value = None # Valor padrão (NULL)

                # --- 1. Mapeamento de Campos de Dados Brutos ---
                if field == 'title':
                    value = article.get('title')
                elif field == 'description':
                    value = article.get('description')
                elif field == 'link':
                    value = article.get('url')
                elif field == 'imageSrc':
                    value = article.get('image_url')
                
                # --- 2. Mapeamento de Metadados e Padrões (Conforme SQL) ---
                elif field == 'source':
                    # CAMPO CORRIGIDO: Nome da pasta/site de origem (G1, TECMUNDO, etc.)
                    value = site_name 
                elif field == 'created_at':
                    value = current_time # Data do processamento
                
                # --- 3. Campos de Classificação (Padrões do ENUM e NUMERIC) ---
                elif field == 'status':
                    # Padrão: 'Error' (Conforme ENUM do BD)
                    value = 'Error'
                elif field == 'confidence':
                    # Padrão: 0.00 (Conforme NUMERIC do BD)
                    value = 0.00
                elif field == 'imageAlt':
                    # Não temos o Alt Text, então deixamos como None/NULL
                    value = None 
                
                standardized_data[field] = value
            
            # --- SALVAMENTO NA PASTA FINAL ---
            
            # Cria nome de arquivo baseado na data de publicação original, nome do site e hash da URL
            publish_date_str = str(article.get('date_publish', 'unknown'))[:10].replace('-', '')
            article_url = standardized_data.get('link', 'no_url')
            file_hash = str(hash(article_url))[:8]
            
            new_filename = f"{publish_date_str}_{site_name}_{file_hash}.json"
            output_filepath = os.path.join(FINAL_OUTPUT_DIR, new_filename)
            
            with open(output_filepath, 'w', encoding='utf-8') as outfile:
                json.dump(standardized_data, outfile, ensure_ascii=False, indent=4)
            
            processed_count += 1

        except IndexError:
            print(f"AVISO: Erro de estrutura de caminho (verifique se os arquivos estão em ./noticias/SITE_NAME/). Pulando: '{filepath}'")
        except json.JSONDecodeError:
            print(f"AVISO: Pulando arquivo JSON corrompido: {filepath}")
        except Exception as e:
            print(f"ERRO: Falha crítica ao processar {filepath}: {e}")

    print(f"\n✅ Concluído! {processed_count} artigos prontos para o BD salvos em '{FINAL_OUTPUT_DIR}'.")
    print("O projeto de mineração está finalizado.")

if __name__ == '__main__':
    process_and_unify_data()