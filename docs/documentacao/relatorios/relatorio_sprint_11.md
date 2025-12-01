# Relatório da Sprint 11


## 1. Informações Gerais


- **Sprint:** 11

- **Duração:** 10/11 a 16/11

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Expansão da capacidade de mineração de dados (Adição de novos sites ao Web Scraper).

- Implementação de script de ETL (Extração, Transformação e Carregamento) para converter dados brutos do scraper para o formato do Banco de Dados.

- Documentação técnica do progresso semanal do RagFlow e comparação de LLMs (Llama vs Gemini).

- Planejamento de Testes de Software e definição de responsabilidades.

- Formalização das reuniões de planejamento e acompanhamento (09/11 e 11/11).


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como sistema, preciso minerar notícias de múltiplas fontes para enriquecer o dataset | Web Scraper atualizado minerando pelo menos 3 novos sites | Concluído |
| 2 | Como desenvolvedor, quero um conversor de dados para popular o banco automaticamente | Script Python criado que limpa, formata e insere as notícias do scraper no DB (PostgreSQL) | Concluído |
| 3 | Como equipe, quero documentar o progresso do RagFlow | Documento entregue detalhando as atividades da semana no RagFlow e comparação Llama vs Gemini | Concluído |
| 4 | Como mantenedor, quero os relatórios de reunião registrados | Relatórios de 09/11 e 11/11 convertidos para Markdown e inseridos em `/docs/reunioes/` | Concluído |


### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Comparativo de LLMs | Análise de viabilidade entre Llama e Gemini para o motor de inferência | Concluído |
| 2 | Planejamento de Testes | Apresentação sobre testes de software e divisão de tarefas (Unitários, Integração) | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #12](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- **Data Engineering:** Script conversor de JSON para SQL/DB e Minerador expandido.
- **Documentação Técnica:** Relatório de progresso do RagFlow.
- **Gestão:** Relatórios de reuniões de alinhamento e planejamento de testes.


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 5/5


---


## 6. Retrospectiva


### O que funcionou bem


- **Pipeline de Dados:** A criação do script conversor (#75) fechou a lacuna que existia entre a coleta de dados (Scraper) e o armazenamento (PostgreSQL), automatizando o fluxo.

- **Definição de Tecnologias:** A discussão comparativa entre Llama e Gemini ajudou a nortear o uso da LLM mais adequada para o RagFlow.


### O que pode melhorar


- **Complexidade de Integração:** A necessidade de um script intermediário de conversão indicou que o formato de saída original do scraper não estava alinhado com o Schema do banco, algo que poderia ter sido planejado antes.


### Ações de melhoria


- **Início dos Testes:** Com a apresentação sobre testes realizada, a próxima sprint deve focar na implementação prática de testes unitários e de integração.

- **Automação do Minerador:** Integrar o script conversor diretamente na execução do minerador para que o processo seja contínuo.