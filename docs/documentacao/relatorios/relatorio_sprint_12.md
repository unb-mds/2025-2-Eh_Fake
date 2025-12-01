# Relatório da Sprint 12


## 1. Informações Gerais


- **Sprint:** 12

- **Duração:** 17/11 a 23/11

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Refinamento de UI/UX: Melhoria no visual da paginação e ajustes no Dark Mode para acessibilidade e consistência.

- Estruturação de Qualidade de Software (QA): Definição do ambiente de testes (Jest, React Testing Library, Pytest) e automação via GitHub Actions.

- Documentação e Gestão: Registro dos relatórios de reuniões de acompanhamento (16/11 e 18/11) e documentação semanal das atividades externas do RagFlow.

- Testes do Minerador: Criação de testes unitários para garantir a robustez do módulo de coleta de dados.


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como usuário, quero uma paginação legível em ambos os temas (claro/escuro) | Componente `NextPage.tsx` refatorado com paleta Slate e contraste adequado nos estados hover/active | Concluído |
| 2 | Como usuário, quero visualizar cards de notícias legíveis no modo escuro | Ajuste nas classes `dark:bg` e `dark:text` dos cards e correção da detecção de tema no CSS global | Concluído |
| 3 | Como desenvolvedor, quero testes automatizados para o minerador | Arquivos de teste com Pytest criados e validados | Concluído |
| 4 | Como mantenedor, quero documentação das reuniões de alinhamento | Relatórios de 16/11 e 18/11 (sobre testes, RagFlow e GitHub Pages) commitados em `/docs/reunioes/` | Concluído |
| 5 | Como equipe, quero acompanhar o progresso do RagFlow | Documento resumo das atividades semanais do RagFlow entregue | Concluído |


### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Configuração de Ambiente de Testes Frontend | Setup do Jest e React Testing Library definidos | Concluído |
| 2 | Automação de CI/CD | Definição do fluxo de testes automatizados via GitHub Actions | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #13](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- **Frontend:** Componente de paginação acessível e correções de contraste no Dark Mode.
- **QA:** Scripts de teste para o minerador e configuração inicial de testes unitários.
- **Documentação:** Relatórios de reuniões detalhando a estratégia de testes e atualizações do RagFlow v19.


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 5/5


---


## 6. Retrospectiva


### O que funcionou bem


- **Foco em UI/UX:** As correções visuais no Dark Mode e na paginação melhoraram significativamente a usabilidade e a estética do projeto.

- **Início da Cultura de Testes:** A implementação de testes para o minerador e o planejamento para o frontend marcam uma mudança importante para a maturidade do código.


### O que pode melhorar


- **Complexidade do RagFlow:** A atualização para a versão 19 trouxe desafios que exigiram documentação específica e atenção redobrada da equipe responsável.


### Ações de melhoria


- **Automação Completa:** Integrar os testes do minerador e do frontend no pipeline do GitHub Actions para rodarem a cada PR.

- **Refatoração da Documentação:** Atualizar o GitHub Pages com a nova seção de integrantes conforme decidido na reunião de 18/11.