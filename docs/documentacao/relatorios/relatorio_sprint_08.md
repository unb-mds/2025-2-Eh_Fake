# Relatório da Sprint 08


## 1. Informações Gerais


- **Sprint:** 08

- **Duração:** 20/10 a 26/10

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael


---


## 2. Objetivos da Sprint


- Configuração inicial e exploração da ferramenta RagFlow.

- Definição e integração da LLM (Large Language Model) para o sistema.

- Configuração do modelo de embedding (BAAI/bge-m3).

- Criação de prova de conceito (PoC) do fluxo de RAG.

- Documentação do passo a passo para configuração do ambiente de IA.


---


## 3. Backlog da Sprint


### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como desenvolvedor, quero configurar o RagFlow para iniciar o desenvolvimento da IA | Sistema de teste criado, LLM configurada e modelo de embedding BAAI/bge-m3 adicionado | Concluído |


### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Exploração de Funcionalidades do RagFlow | Vídeo explicativo do sistema de teste e documentação do setup | Concluído |


---


## 4. Entregas (Review)


É possível visualizar tudo que foi feito na semana pela [Milestone #9](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)


Principais artefatos entregues:
- **Infraestrutura de IA:** Instância do RagFlow configurada.
- **Modelos:** Integração do modelo de embedding `BAAI/bge-m3`.
- **Documentação:** Guia passo a passo de configuração do RagFlow para o time.
- **Demo:** Vídeo demonstrando o funcionamento básico do RAG.


---


## 5. Métricas da Sprint


* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 1/1 (Sprint focada em Spike de IA)


---


## 6. Retrospectiva


### O que funcionou bem


- **Foco Técnico:** A dedicação exclusiva (Spike) para entender o RagFlow foi essencial, dada a complexidade da ferramenta.

- **Documentação Visual:** A produção de um vídeo explicativo facilitou o entendimento do restante do grupo sobre como a IA funcionará.


### O que pode melhorar


- **Curva de Aprendizado:** A configuração inicial do RagFlow se mostrou complexa, exigindo estudo aprofundado sobre embeddings e LLMs.


### Ações de melhoria


- **Compartilhamento de Conhecimento:** Realizar um workshop ou pareamento para que os outros membros consigam rodar o RagFlow localmente seguindo o guia criado.

- **Integração:** Planejar como conectar o banco de dados PostgreSQL (já populado pelo minerador) ao RagFlow na próxima sprint.