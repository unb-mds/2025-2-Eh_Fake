# Relatório da Sprint 13


## 1. Informações Gerais


- **Sprint:** 13

- **Duração:** 24/11 a 30/11

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Garantia de Qualidade (QA): Implementação de testes de integração (Jest) e unitários, com execução automatizada via GitHub Actions.

- Funcionalidades de Frontend: Implementação do filtro de status (Real/Fake) e ajustes visuais.

- Reestruturação da Documentação: Organização da árvore de diretórios do MkDocs, customização de CSS (Layout estilo Stripe/RagFlow) e reformulação da página de equipe.

- Entrega do Agente de IA: Documentação final e vídeo explicativo sobre o funcionamento do RagFlow e Web Search.

- Preparação para Release v1.0: Finalização de pendências visuais e de infraestrutura.


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas


| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como desenvolvedor, quero garantir que as APIs funcionem corretamente através de testes de integração | Testes implementados para endpoints `/api/noticias` e `/api/noticias/suggestions` usando mocks do Prisma e rodando no CI | Concluído |
| 2 | Como usuário, quero filtrar notícias por veracidade (Real/Fake) | Componente `FilterBar` implementado com animação e integração com a API | Concluído |
| 3 | Como mantenedor, quero uma documentação organizada e navegável | Reestruturação completa da pasta `docs/`, configuração do plugin `awesome-pages` e limpeza da raiz | Concluído |
| 4 | Como usuário, quero conhecer a equipe do projeto em uma página dedicada | Página de equipe atualizada com layout em grid, fotos personalizadas e links para GitHub | Concluído |
| 5 | Como usuário, quero uma experiência de leitura fluida na documentação | Customização do MkDocs (CSS) para layout "Full Width", cabeçalho unificado e rodapé minimalista | Concluído |
| 6 | Como stakeholder, quero entender como o Agente de IA funciona | Documento de entrega e vídeo explicativo do RagFlow produzidos | Concluído |
| 7 | Como desenvolvedor, quero testes unitários para componentes | Criação de testes unitários para componentes do projeto | Concluído |


### Estudos e Pesquisas Técnicas


| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Relatórios de RagFlow | Documentação semanal das atividades do RagFlow (Web Search, refinamento de prompt) | Concluído |
| 2 | Relatórios de Reuniões | Registros das reuniões de 23/11 e 28/11 (Planejamento e Release v1.0) | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #14](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- **QA:** Pipeline de CI/CD ativo com testes de integração Jest e mocks do Prisma.
- **Frontend:** Filtro de notícias (FilterBar) e Paginação estilizada.
- **Documentação:** Site da documentação totalmente reestruturado (CSS personalizado, menus organizados, página de equipe nova).
- **IA:** Pacote de entrega do Agente de IA (Documento + Vídeo).


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 9/9


---


## 6. Retrospectiva


### O que funcionou bem


- **Cultura de Testes:** A integração do Jest com mocks do Prisma no GitHub Actions elevou a maturidade do projeto, garantindo segurança para refatorações futuras.

- **Polimento Visual:** Tanto o produto (filtro de notícias) quanto a documentação (novo CSS do MkDocs) receberam um cuidado estético que profissionalizou a entrega da Release v1.0.

- **Organização:** A reestruturação dos diretórios da documentação resolveu a dívida técnica de arquivos soltos, facilitando a navegação.


### O que pode melhorar


- **Complexidade do CSS:** A customização do tema Material for MkDocs exigiu ajustes finos de CSS para evitar layout shifts e garantir responsividade.


### Ações de melhoria


- **Cobertura de Testes:** Expandir a cobertura de testes unitários para componentes de UI mais complexos na próxima release.

- **Feedback do Usuário:** Validar a nova interface de filtros e a navegação da documentação com usuários externos (se possível).