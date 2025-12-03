# Arquivo: data_processor.py
import os
import json
import glob
from datetime import datetime

# --- CONFIGURAÇÕES DE DIRETÓRIOS ---
BASE_INPUT_DIR = 'noticias'
FINAL_OUTPUT_DIR = os.path.join(BASE_INPUT_DIR, 'finais')
EXCLUDE_FOLDER_NAME = 'finais'

# --- ESQUEMA DO BANCO DE DADOS ---
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
    'maintext'
]

def process_and_unify_data():
    """
    Lógica central de processamento: Padroniza JSONs e salva na pasta final.
    """
    if not os.path.exists(FINAL_OUTPUT_DIR):
        os.makedirs(FINAL_OUTPUT_DIR)

    all_json_files = glob.glob(os.path.join(BASE_INPUT_DIR, '**', '*.json'), recursive=True)
    # Filtra arquivos da pasta finais
    files_to_process = [fp for fp in all_json_files if EXCLUDE_FOLDER_NAME not in fp.split(os.sep)]
    
    if not files_to_process:
        return

    current_time = datetime.now().isoformat() 

    for filepath in files_to_process:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                article = json.load(f)
            
            path_segments = filepath.split(os.sep)
            site_name = path_segments[-2] 
            
            standardized_data = {}
            
            for field in BD_FIELDNAMES:
                value = None

                if field == 'title': value = article.get('title')
                elif field == 'description': value = article.get('description')
                elif field == 'link': value = article.get('url')
                elif field == 'imageSrc': value = article.get('image_url')
                elif field == 'maintext': value = article.get('maintext')
                elif field == 'source': value = site_name
                elif field == 'created_at': value = current_time
                elif field == 'status': value = 'Error'
                elif field == 'confidence': value = 0.00
                elif field == 'imageAlt': value = None
                
                standardized_data[field] = value
            
            publish_date_str = str(article.get('date_publish', 'unknown'))[:10].replace('-', '')
            article_url = standardized_data.get('link', 'no_url')
            file_hash = str(hash(article_url))[:8]
            
            new_filename = f"{publish_date_str}_{site_name}_{file_hash}.json"
            output_filepath = os.path.join(FINAL_OUTPUT_DIR, new_filename)
            
            with open(output_filepath, 'w', encoding='utf-8') as outfile:
                json.dump(standardized_data, outfile, ensure_ascii=False, indent=4)

        except Exception:
            pass