# Relatório Reunião de Planejamento  
**Data:** 23/11/2025  
**Responsável:** Davi  

## Sprint 13  

---

## Anotações da Reunião


- **Abertura e Documentação (GitPages)**
    - Davi apresentou o status inicial do GitHub Pages, propondo uma reestruturação baseada na organização da documentação do *RagFlow* (separação em pastas para Estudos, Relatórios e Processos).
    - **Página de Equipe:** Foi definida a necessidade de uma seção "Quem Somos". Todos os membros devem providenciar fotos para compor esta página.
    - **Correção Técnica:** Identificada a necessidade de ajustar o comando de instalação no pipeline (de `npm ci` para `npm install` ou vice-versa, conforme a atualização das dependências).

- **Testes (End-to-End e Unitários)**
    - **End-to-End (E2E):** Daniel confirmou a utilização da ferramenta **Playwright**. A implementação está em andamento com previsão de entrega até o final da semana.
    - **Unitários (Front-end):** Bryan está utilizando *Jest*. Foi instruído a criar arquivos de teste individuais para cada componente da interface, garantindo modularidade.
    - **Minerador:** Allan relatou o uso do **Pytest**. Os testes de conversão de dados estão aprovados ("verde"), mas os testes do minerador em si ainda precisam de ajustes.

- **Atualizações do RagFlow (IA)**
    - Rafael informou que a leitura de arquivos pela IA foi corrigida.
    - **Problema Identificado:** A IA classifica notícias falsas bem escritas (com termos técnicos ou boa gramática) como verdadeiras devido à falta de validação externa.
    - **Decisão Arquitetural:** Foi aprovada a habilitação da funcionalidade de **Pesquisa na Web** (Web Search) no RagFlow. Isso permitirá que a IA cruze informações internas com dados externos para aumentar a precisão da classificação de *fake news*.

- **Discussões Técnicas e Metodologia**
    - **Commits e Métricas:** Discutiu-se o baixo número de commits do membro Allan (apenas um commit grande). A equipe orientou a fragmentação das tarefas em commits menores ("atomizar") para garantir que as ferramentas de análise de contribuição (Insights/Bot) contabilizem o trabalho corretamente.
    - **Limpeza de Repositório:** Bryan ficou responsável por excluir branches antigas e sem uso.

---

## ✔ Tarefas de Acompanhamento

- **Davi:** Reorganizar a estrutura de pastas do GitPages (Estudos, Relatórios, Processos), corrigir o script de build da main (`npm ci`) para (`npm install`).
- **Daniel:** Finalizar e entregar a implementação dos testes E2E com Playwright até o fim da semana.
- **Bryan:** Refatorar testes unitários (um arquivo por componente), aumentar a frequência de commits e limpar branches obsoletas.
- **Allan:** Corrigir os testes unitários do Minerador, finalizar a documentação técnica do mesmo e realizar o Pull Request para a main.
- **Rafael:** Implementar a funcionalidade de Web Search no RagFlow e documentar essa decisão técnica.
- **Mateus:** Entregar os testes sob sua responsabilidade até sexta-feira.
