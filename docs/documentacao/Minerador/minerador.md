# 📄 DOCUMENTAÇÃO TÉCNICA DO SISTEMA DE MINERAÇÃO DE NOTÍCIAS

## 1. Visão Geral e Arquitetura

O sistema implementa um *pipeline* modularizado de **Mineração e Classificação de Dados** para coletar artigos de múltiplos *publishers* (sites de tecnologia, grandes portais e fontes sensacionalistas). A arquitetura separa as responsabilidades:

1.  **Coleta (*minerador.py*):** Realiza o *web crawling* inteligente para obter os dados brutos.
2.  **Processamento (*processor\_b.py*):** Padroniza o esquema de dados para o Banco de Dados (BD).

***

## 2. Módulo de Coleta: `minerador.py`

Este módulo é o *crawler* principal, responsável por navegar nos sites e extrair o conteúdo bruto.

### 2.1. Estratégia de Rastreamento (DFS Controlado)

O módulo utiliza a técnica de **Busca em Profundidade (DFS) Controlada** para maximizar a cobertura semanal, sem desperdiçar recursos.

* **Profundidade (`max_depth`):** Limita o rastreamento a URLs de índice ou categorias (Nível 2 ou 3), conforme definido em cada função de *scraper*.
* **Fila de Navegação:** Gerencia URLs de **categorias/índice** (`urls_to_crawl`) para garantir que o *crawler* visite apenas páginas que listam artigos (e não os artigos finais).

### 2.2. Parâmetros Globais Chave

| Constante | Propósito | Tipo | Exemplo |
| :--- | :--- | :--- | :--- |
| `DAYS_TO_LOOK_BACK` | Define o intervalo de busca (e.g., 3 para hoje + 2 dias). | `int` | 3 |
| `SITE_MAP` | Dicionário de configuração de execução (URLs e funções de *scraper*). | `dict` | G1, TECMUNDO, OFUXICO |

### 2.3. Heurística de Identificação de Artigo

Para decidir se uma URL deve ser **coletada (artigo final)** ou **seguida (categoria)**, o *scraper* utiliza uma **heurística de contagem de barras** (`/`) na URL para **diferenciar um *link de artigo* de um *link de categoria***.

---

## 3. Módulo de Processamento: `processor_b.py`

Este módulo transforma os dados JSON brutos (salvos pelo `minerador.py`) em um formato padronizado e limpo, pronto para a ingestão dos dados na pasta `./noticias/finais/`.

### 3.1. Esquema de Conformidade do Banco de Dados

O *processor* garante que cada arquivo JSON final possua exatamente as 10 colunas definidas como o **contrato** para a tabela de destino do BD:

| Coluna BD | Origem / Lógica | Propósito |
| :--- | :--- | :--- |
| **`title`**, **`description`** | Mapeamento direto do JSON. | Informações básicas do artigo. |
| **`maintext`** | Mapeamento do campo `maintext`. | **Corpo do conteúdo para análise.** |
| **`link`**, `imageSrc` | Mapeamento de `url` e `image_url`. | Chave de referência e imagem. |
| **`source`** | Extraído da subpasta de origem (e.g., 'G1'). | Metadado de origem. |
| **`created_at`** | `datetime.now()` | Carimbo de data/hora do processamento. |
| **`status`** | **`'Error'`** (Valor Padrão) | Conformidade com o tipo `ENUM` do BD (para classificação posterior). |
| **`confidence`** | **`0.00`** (Valor Padrão) | Conformidade com o tipo `NUMERIC` do BD. |

### 3.2. Lógica de Validação e Conformidade

* **Preenchimento de Segurança:** O módulo preenche os campos `status` com o valor **`'Error'`** e `confidence` com **`0.00`** em todos os registros, prevenindo erros de violação de tipo na inserção SQL.
* **Filtro de Leitura:** Garante que os arquivos já processados na pasta `finais` **não sejam lidos novamente**, utilizando a variável `EXCLUDE_FOLDER_NAME`.

---

## 4. Garantia de Qualidade (Testes de Unidade)

O projeto é validado por um sistema de **Testes de Unidade** (`test_minerador.py`) que garante a integridade da lógica do sistema através de simulações (*Mocks*):

1.  **Integridade do Scraper:** Verifica se as funções de raspagem (`scrape_site_links`) conseguem identificar e retornar os links corretos a partir de um HTML simulado.
2.  **Conformidade do Esquema:** Assegura que o **`processor\_b.py`** adere rigidamente ao `BD_FIELDNAMES`, verificando a presença de todos os campos e a aplicação dos valores de segurança (`'Error'`, `0.00`) para o BD.