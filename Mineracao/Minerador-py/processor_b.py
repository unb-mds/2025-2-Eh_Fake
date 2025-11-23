import os
import json
from glob import glob
from datetime import datetime

# --- CONFIGURAÇÕES DE DIRETÓRIOS ---
BASE_INPUT_DIR = 'noticias'
# Diretório onde os arquivos padronizados serão salvos
FINAL_OUTPUT_DIR = os.path.join(BASE_INPUT_DIR, 'finais')
# Nome da subpasta que deve ser IGNORADA na leitura
EXCLUDE_FOLDER_NAME = 'finais'
# ------------------------------------

# ESQUEMA FINAL DO BANCO DE DADOS (BD) - 10 COLUNAS (exceto 'id')
# Definimos a ordem e os campos que o JSON final deve conter.
BD_FIELDNAMES = [
    'title',
    'description',
    'imageSrc',
    'imageAlt',
    'status',
    'confidence',
    'source',
    'link',
    'created_at',
    'maintext' # Campo adicionado para o texto principal
]

def process_and_unify_data():
    """
    Percorre todos os arquivos JSON brutos nas subpastas de entrada, 
    padroniza seus campos para o esquema final do BD (incluindo maintext) 
    e salva os arquivos prontos na subpasta 'finais'.
    """
    
    # 1. Cria a pasta de destino se ela não existir
    if not os.path.exists(FINAL_OUTPUT_DIR):
        os.makedirs(FINAL_OUTPUT_DIR)
        print(f"Diretório de saída criado: '{FINAL_OUTPUT_DIR}'")

    # 2. Busca e filtra arquivos (exclui a pasta 'finais')
    all_json_files = glob(os.path.join(BASE_INPUT_DIR, '**', '*.json'), recursive=True)
    files_to_process = [
        fp for fp in all_json_files 
        if EXCLUDE_FOLDER_NAME not in fp.split(os.sep)
    ]
    
    if not files_to_process:
        print(f"AVISO: Nenhuma arquivo JSON novo encontrado para processar.")
        return

    print(f"Processando e padronizando {len(files_to_process)} artigos...")

    processed_count = 0
    # Carimbo de data/hora usado para o campo 'created_at' do BD
    current_time = datetime.now().isoformat() 

    for filepath in files_to_process:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                article = json.load(f)
            
            # Extrai o nome do site (ex: G1) da estrutura de diretório (noticias/G1/arquivo.json)
            path_segments = filepath.split(os.sep)
            site_name = path_segments[-2] 
            
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
                elif field == 'maintext':
                    value = article.get('maintext')
                
                # --- 2. Mapeamento de Metadados e Padrões (Conforme SQL) ---
                elif field == 'source':
                    value = site_name # Nome da pasta de origem (G1, TECMUNDO)
                elif field == 'created_at':
                    value = current_time # Data do processamento
                
                # --- 3. Campos de Classificação (Padrões do ENUM e NUMERIC) ---
                elif field == 'status':
                    value = 'Error' # Padrão: 'Error' (Conforme ENUM)
                elif field == 'confidence':
                    value = 0.00 # Padrão: 0.00
                elif field == 'imageAlt':
                    value = None # Deixamos NULL
                
                standardized_data[field] = value
            
            # --- SALVAMENTO NA PASTA FINAL COM NOME LIMPO ---
            
            # Cria nome de arquivo limpo e informativo: DATA_SITE_HASH.json
            publish_date_str = str(article.get('date_publish', 'unknown'))[:10].replace('-', '')
            article_url = standardized_data.get('link', 'no_url')
            file_hash = str(hash(article_url))[:8]
            
            new_filename = f"{publish_date_str}_{site_name}_{file_hash}.json"
            output_filepath = os.path.join(FINAL_OUTPUT_DIR, new_filename)
            
            with open(output_filepath, 'w', encoding='utf-8') as outfile:
                json.dump(standardized_data, outfile, ensure_ascii=False, indent=4)
            
            processed_count += 1

        except IndexError:
            print(f"AVISO: Erro de estrutura de caminho. Pulando: '{filepath}'")
        except json.JSONDecodeError:
            print(f"AVISO: Pulando arquivo JSON corrompido: {filepath}")
        except Exception as e:
            print(f"ERRO: Falha crítica ao processar {filepath}: {e}")

    print(f"\n✅ Concluído! {processed_count} artigos prontos para o BD salvos em '{FINAL_OUTPUT_DIR}'.")

if __name__ == '__main__':
    process_and_unify_data()