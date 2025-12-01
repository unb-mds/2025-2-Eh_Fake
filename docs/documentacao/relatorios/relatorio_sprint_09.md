# Relatório da Sprint 09


## 1. Informações Gerais


- **Sprint:** 09

- **Duração:** 27/10 a 02/11

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Implementação de funcionalidades de UX na busca (Sugestões/Autocomplete).

- Coleta e estruturação do Dataset inicial ("Ground Truth") para treinamento e validação da IA.

- Correção de bugs de interface (Erro de Hidratação).

- Avanço na integração do RAGFlow com Gemini (conforme Cronograma Estratégico).


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como usuário, quero receber sugestões de notícias enquanto digito na barra de pesquisa | Janela de sugestões implementada, adaptável ao tema (claro/escuro) e integrada à searchbar | Concluído |
| 2 | Como cientista de dados, quero um dataset inicial catalogado para validar o modelo | 16 notícias coletadas (Real/Fake) e formatadas no padrão (title, description, status, confidence=100, source, url) | Concluído |
| 3 | Como desenvolvedor, quero corrigir o erro de hidratação do tema | Supressão do alerta de erro no console/tela inicial via commit na main | Concluído |


### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Curadoria de Dados (Dataset) | Pesquisa em fontes variadas (G1, Sensacionalista, etc.) e classificação manual | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #10](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- **Frontend:** Searchbar com Auto-complete/Sugestões.
- **Dados:** Arquivo de dataset inicial formatado.
- **Qualidade de Código:** Fix do erro de hidratação do Theme Provider.


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 3/3


---


## 6. Retrospectiva


### O que funcionou bem


- **UX da Busca:** A implementação das sugestões melhora significativamente a navegabilidade, guiando o usuário para conteúdos existentes.

- **Curadoria de Dados:** A definição de um "Ground Truth" manual (confiança 100%) é um passo crucial para medir a precisão da IA nas próximas etapas.


### O que pode melhorar


- **Integração Frontend-Banco:** As sugestões precisam estar perfeitamente sincronizadas com o banco de dados atualizado pelo minerador para serem úteis em tempo real.


### Ações de melhoria


- **Expansão do Dataset:** Aumentar o número de notícias no dataset de validação para cobrir mais cenários de desinformação.

- **Testes de Integração:** Garantir que a searchbar lida bem com latência do banco de dados ao buscar sugestões.