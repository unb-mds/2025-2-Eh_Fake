# Relatório da Sprint 07


## 1. Informações Gerais


- **Sprint:** 07

- **Duração:** 13/10 a 19/10

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Migração completa da arquitetura de dados (Firebase para PostgreSQL).

- Implementação do ORM Prisma e conteinerização do ambiente (Docker).

- Desenvolvimento do módulo Minerador (Web Scraper e Crawler).

- Atualização da documentação técnica (README) para o novo ambiente.

- Implementação de automações de gestão (Fechamento de Milestones).

- Finalização de melhorias de UI (Dark Mode).


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como desenvolvedor, quero migrar a API para PostgreSQL e usar Prisma ORM | Conexão estabelecida, `schema.prisma` configurado e endpoint `/api/noticias` consumindo do Postgres | Concluído |
| 2 | Como desenvolvedor, quero um ambiente padronizado via Docker | `docker-compose.yml` funcional rodando DB e pgAdmin; README atualizado com instruções | Concluído |
| 3 | Como sistema, preciso de um Minerador (Crawler + Scraper) para buscar notícias | Código Python implementado capaz de realizar o crawling e scraping de páginas | Concluído |
| 4 | Como usuário, quero alterar o tema visual (Dark Mode) | Switcher de tema funcional e persistente | Concluído |
| 5 | Como mantenedor, quero automação para fechar sprints vencidas | GitHub Action (`fecha-sprint.yml`) implementada e testada | Concluído |
| 6 | Como novo desenvolvedor, quero instruções claras de setup no README | Documentação atualizada com pré-requisitos de Docker e comandos do Prisma | Concluído |


### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Testes de Viabilidade do RagFlow | Continuação dos testes iniciados na sprint anterior e definição de hardware | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #8](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- **Infraestrutura:** Ambiente Docker com PostgreSQL e pgAdmin.
- **Backend:** Integração com Prisma ORM e remoção do Firebase.
- **Data Engineering:** Scripts do Minerador (Crawler e Scraper).
- **DevOps:** GitHub Action para gestão de milestones e atualização do README.
- **Frontend:** Dark Mode implementado.


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 6/6


---


## 6. Retrospectiva


### O que funcionou bem


- **Padronização do Ambiente:** A adoção do Docker e atualização do README eliminaram ambiguidades na configuração do projeto para os membros.

- **Automação:** A action de fechamento de milestones ajuda a manter o board organizado sem esforço manual.

- **Migração do Banco:** A transição para PostgreSQL com Prisma trouxe tipagem segura e melhor estrutura para os dados.


### O que pode melhorar


- **Detalhes de UI:** O Dark Mode foi entregue funcional, mas identificou-se um pequeno problema na gestão das classes de tema que precisará de um fix futuro.

- **Complexidade do Minerador:** A integração do output do minerador diretamente com o banco de dados exigirá atenção na próxima sprint.


### Ações de melhoria


- **Refinamento do Dark Mode:** Criar issue de fix para ajustar o gerenciamento de temas.

- **Integração Minerador-Banco:** Focar na persistência automática dos dados coletados pelo crawler no banco PostgreSQL.