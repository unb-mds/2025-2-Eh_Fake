# Arquivo: test_minerador.py
import unittest
from unittest.mock import patch, mock_open, MagicMock
import sys
import os
import json

# --- 1. Importação dos Módulos do Projeto ---
# Importa o módulo de lógica que você acabou de confirmar
import data_processor 

# Importa o minerador (Crawler)
import minerador 

# Tenta importar o processor antigo (se existir)
try:
    import processor
except ImportError:
    processor = None
    print("AVISO: 'processor.py' (versão antiga) não encontrado. Testes dele serão pulados.")

# --- 2. Dados de Mock (Simulação) ---

# Mock de HTML para testar o Crawler (G1)
HTML_MOCK_G1 = """
<html>
    <body>
        <a href="https://g1.globo.com/politica/noticia/2025/11/14/teste-artigo.ghtml">Notícia Teste</a>
        <a href="https://g1.globo.com/economia/">Categoria Economia</a>
    </body>
</html>
"""

# Mock de JSON Bruto (simulando um arquivo salvo pelo news-please)
JSON_BRUTO_MOCK = {
    "url": "https://teste.com/noticia",
    "title": "Título Teste",
    "description": "Descrição Teste",
    "image_url": "https://teste.com/img.jpg",
    "date_publish": "2025-11-14 12:00:00",
    "maintext": "Texto completo da notícia para teste de maintext.",
    "language": "pt"
}

# --- 3. Classe de Testes ---

class TestProjetoCompleto(unittest.TestCase):

    # =================================================================
    # TESTE 1: MINERADOR (CRAWLER)
    # =================================================================
    @patch('requests.get')
    def test_minerador_g1_seletores(self, mock_get):
        """Testa se a função scrape_g1_links encontra links de artigo corretamente."""
        print("\n[TESTE] Verificando Crawler do G1...")
        
        # Configura o mock para retornar nosso HTML falso em vez de acessar a internet
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = HTML_MOCK_G1
        mock_get.return_value = mock_response

        # Roda a função do seu minerador (apenas profundidade 1 para teste rápido)
        # Nota: Precisamos garantir que o minerador use requests.compat ou urljoin corretamente mockado se falhar
        links = minerador.scrape_g1_links("https://g1.globo.com/", max_depth=1)
        
        # Verificações
        self.assertIsInstance(links, list)
        self.assertIn("https://g1.globo.com/politica/noticia/2025/11/14/teste-artigo.ghtml", links)
        print("   -> Sucesso: Link de artigo encontrado!")

    # =================================================================
    # TESTE 2: DATA PROCESSOR (Lógica do Processor-B)
    # =================================================================
    @patch('json.dump') # Impede salvar arquivo real
    @patch('builtins.open', new_callable=mock_open, read_data=json.dumps(JSON_BRUTO_MOCK))
    @patch('glob.glob') # Simula encontrar arquivos na pasta
    @patch('os.path.exists')
    @patch('os.makedirs')
    def test_data_processor_schema(self, mock_mk, mock_ex, mock_glob, mock_file, mock_json):
        """Testa se o data_processor gera o JSON com as 10 colunas (incluindo maintext)."""
        print("\n[TESTE] Verificando Lógica do Processor Novo (Data Processor)...")
        
        # Simula que encontrou 1 arquivo na pasta G1
        mock_glob.return_value = [os.path.join('noticias', 'G1', 'teste.json')]
        mock_ex.return_value = True

        # Roda a função de processamento diretamente
        data_processor.process_and_unify_data()

        # Verifica o que ele tentou salvar
        if mock_json.called:
            args, _ = mock_json.call_args
            dados_salvos = args[0]
            
            # 1. Verifica se as chaves salvas correspondem ao BD_FIELDNAMES do arquivo
            chaves_salvas = list(dados_salvos.keys())
            campos_esperados = data_processor.BD_FIELDNAMES
            self.assertEqual(sorted(chaves_salvas), sorted(campos_esperados), 
                             "Erro: O JSON final não tem os campos exatos definidos em BD_FIELDNAMES!")
            
            # 2. Verifica se o campo maintext foi preenchido
            self.assertEqual(dados_salvos['maintext'], "Texto completo da notícia para teste de maintext.")
            
            # 3. Verifica valores padrão
            self.assertEqual(dados_salvos['status'], 'Error')
            self.assertEqual(dados_salvos['confidence'], 0.00)
            
            print("   -> Sucesso: Schema completo (com maintext) validado!")
        else:
            self.fail("O data_processor não tentou salvar nenhum arquivo JSON.")

    # =================================================================
    # TESTE 3: PROCESSOR ANTIGO (processor.py)
    # =================================================================
    @patch('json.dump')
    @patch('builtins.open', new_callable=mock_open, read_data=json.dumps(JSON_BRUTO_MOCK))
    @patch('glob.glob')
    @patch('os.path.exists')
    @patch('os.makedirs')
    def test_processor_antigo_schema(self, mock_mk, mock_ex, mock_glob, mock_file, mock_json):
        """Testa se o processor.py gera o JSON antigo (sem maintext)."""
        if not processor: return 

        print("\n[TESTE] Verificando Processor Antigo...")
        mock_glob.return_value = [os.path.join('noticias', 'G1', 'teste.json')]
        mock_ex.return_value = True

        processor.process_and_unify_data()

        if mock_json.called:
            args, _ = mock_json.call_args
            dados_salvos = args[0]
            
            # Verifica que maintext NÃO está presente (era o comportamento antigo)
            self.assertNotIn('maintext', dados_salvos)
            # Verifica que status e confidence foram adicionados (se o código antigo já tinha isso)
            if 'status' in dados_salvos:
                 self.assertEqual(dados_salvos['status'], 'Error')
            
            print("   -> Sucesso: Comportamento antigo validado!")

if __name__ == '__main__':
    unittest.main(verbosity=2)