# Relatório da Sprint 06


## 1. Informações Gerais


- **Sprint:** 06

- **Duração:** 06/10 a 12/10

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Configurar ambiente de desenvolvimento conteinerizado (Docker com PostgreSQL e pgAdmin).

- Criação e definição do Story Map (Épicos, Features e User Stories).

- Estudo de viabilidade e testes iniciais do RagFlow.

- Implementação de melhorias visuais no Front-end (Modo Escuro).

- Padronização de commits e documentação.

- Definição da infraestrutura de hospedagem e banco de dados definitivo.


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como desenvolvedor, quero um ambiente Dockerizado para evitar problemas de compatibilidade | Arquivo `docker-compose.yml` funcional com PostgreSQL e pgAdmin rodando | Concluído |
| 2 | Como equipe, quero um Story Map visual para entender o fluxo do produto | Story Map finalizado no Figma com Épicos, Funcionalidades e Histórias | Concluído |
| 3 | Como usuário, quero alterar o tema da aplicação para modo escuro | Botão de alternância de tema funcional e implementado | Concluído |
| 4 | Como mantenedor, quero padronizar os commits de documentação | Todos os commits de docs seguindo o padrão definido na reunião | Concluído |
| 5 | Como equipe, quero definir a infraestrutura de hospedagem | Decisão tomada priorizando soluções gratuitas (Digital Ocean/GitHub Pack) e PostgreSQL | Concluído |


### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Testar viabilidade do RagFlow | Apresentar funcionalidades e estimativa de hardware (Iniciado, conclusão na Sprint 7) | Em andamento |
| 2 | Estudo sobre Infraestrutura | Levantamento de custos e requisitos de hardware para o RagFlow (>= 4 cores, 16GB RAM) | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #7](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- Arquivo `docker-compose.yml` para orquestração do banco.
- Story Map detalhado no Figma.
- Funcionalidade de Dark Mode no Front-end.
- Definição da arquitetura de hospedagem (foco em gratuidade).


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 85%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 5/6 (RagFlow continuou para a próxima sprint)


---


## 6. Retrospectiva


### O que funcionou bem


- **Ambiente de Desenvolvimento:** A criação do container Docker resolveu antecipadamente problemas de "funciona na minha máquina" para o banco de dados.

- **Definição de Papéis:** A divisão clara para o Story Map (Bryan e Daniel) e infraestrutura funcionou bem.

- **Alinhamento Técnico:** Consenso rápido sobre o uso de PostgreSQL e descarte do Firebase para o projeto principal.


### O que pode melhorar


- **Documentação de Protótipos:** Mateus relatou dificuldades em documentar as tecnologias e o protótipo, indicando necessidade de apoio ou revisão dos processos.

- **Organização dos Commits:** Foi necessário uma reunião específica para alinhar o padrão de commits de documentação que estava inconsistente.


### Ações de melhoria


- **Refatoração da Documentação:** Planejamento futuro para refazer documentações antigas visando maior qualidade (sugestão do Rafael).

- **Integração do Minerador:** Rafael se juntará a Mateus e Allan no desenvolvimento do minerador após concluir os testes do RagFlow.

- **Manter Padrão de Commits:** Rigor na utilização do tipo `docs` para atualizações de documentação.