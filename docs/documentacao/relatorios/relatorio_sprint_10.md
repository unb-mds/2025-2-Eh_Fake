# Relatório da Sprint 10


## 1. Informações Gerais


- **Sprint:** 10

- **Duração:** 03/11 a 09/11

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Otimização de performance do Front-end (Implementação de Paginação/Lazy Loading).

- Documentação técnica dos testes de viabilidade do RagFlow.

- Atualização retroativa da documentação de gestão (Relatórios de reuniões pendentes).

- Planejamento e registro das atividades da sprint atual.


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como usuário, quero visualizar as notícias paginadas (6 por vez) para economizar dados e melhorar a performance | Alteração no `LoadCards` e `route.ts` para carregar apenas 6 notícias por requisição, com scroll ou paginação funcional | Concluído |
| 2 | Como desenvolvedor, quero documentar os resultados dos testes do RagFlow | Documento criado detalhando os testes de viabilidade realizados, validando o uso da ferramenta no projeto | Concluído |
| 3 | Como mantenedor, quero o histórico de reuniões atualizado no repositório | Relatórios das reuniões de 12/10, 14/10, 21/10, 26/10 e 04/11 adicionados em `docs/reunioes/` | Concluído |
| 4 | Como Scrum Master, quero registrar o planejamento da Sprint 10 | Relatório da reunião de 07/11 formatado em Markdown e commitado no repositório | Concluído |


### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Análise de Performance de Carregamento | Testes comparativos entre o carregamento total vs. carregamento paginado | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #11](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- **Performance:** Sistema de paginação implementado (Backend e Frontend).
- **Documentação Técnica:** Relatório de testes do RagFlow.
- **Gestão:** Histórico completo de reuniões atualizado, cobrindo o gap de documentação das sprints anteriores.


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 4/4


---


## 6. Retrospectiva


### O que funcionou bem


- **Otimização de Recursos:** A implementação da paginação (6 notícias por vez) tornou o sistema escalável, resolvendo o problema de carregar o banco inteiro de uma só vez.

- **Organização Documental:** O esforço concentrado para atualizar os relatórios de reuniões pendentes (sprints 7 a 10) restabeleceu a transparência e o histórico do projeto.


### O que pode melhorar


- **Tempo de Testes:** A documentação dos testes do RagFlow demorou mais do que o previsto devido à complexidade da criação dos cenários de teste.


### Ações de melhoria


- **Monitoramento de Performance:** Acompanhar se a paginação introduziu algum bug de UX (ex: layout shifting).

- **Manter Constância:** Evitar o acúmulo de relatórios de reunião para as próximas sprints, documentando logo após o acontecimento.