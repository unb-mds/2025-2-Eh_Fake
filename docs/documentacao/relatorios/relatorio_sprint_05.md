# Relatório da Sprint 05

## 1. Informações Gerais

- **Sprint:** 05

- **Duração:** 29/09 a 05/10

- **Product Owner:** Bryan

- **Scrum Master:** Davi

- **Time de Desenvolvimento:** Allan, Bryan, Daniel, Davi, Mateus, Rafael

## 2. Objetivos da Sprint

- Preparação e entrega da Release 1.

- Revisão e definição final da Arquitetura C4 (Níveis 1, 2 e 3).

- Decisão final sobre a tecnologia de Banco de Dados (Migração de Firebase para PostgreSQL).

- Levantamento de documentação faltante e auditoria de Software Livre.

- Finalização e versionamento do Documento de Estratégia.

- Configuração de ambiente para apresentação (Docker e Roteiro).

## 3. Backlog da Sprint

### Tabela das histórias de usuário e tarefas técnicas

| Item | História de Usuário / Tarefa | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Como equipe, quero definir o banco de dados definitivo para garantir escalabilidade | Decisão tomada (PostgreSQL) e validada técnica/estrategicamente em reunião | Concluído |
| 2 | Como equipe, quero revisar a arquitetura C4 para a apresentação | Diagramas de Contexto, Contêiner e Componente revisados e corrigidos (fluxos e nomes) | Concluído |
| 3 | Como mantenedor, quero auditar a documentação do projeto | Levantamento completo de documentos faltantes e plano de migração para GH Pages | Concluído |
| 4 | Como PO, quero oficializar a estratégia do produto | Documento de Estratégia finalizado, versionado (v1.0) e enviado ao repositório | Concluído |
| 5 | Como equipe, quero preparar a apresentação da Release 1 | Roteiro definido, ambiente configurado e slides prontos | Concluído |

### Estudos e Pesquisas Técnicas

| Item | Atividade | Critério de Aceite | Status |
| :--- | :--- | :--- | :--- |
| 1 | Estudo comparativo de Banco de Dados | Análise de limitações do Firebase vs flexibilidade do PostgreSQL | Concluído |
| 2 | Organização de Documentação (Software Livre) | Mapeamento de quais estudos devem virar páginas do GitHub Pages | Concluído |

## 4. Entregas (Review)

É possível visualizar tudo que foi feito na semana pela [Milestone #6](https://github.com/unb-mds/2025-2-Eh_Fake/milestones)

Principais artefatos entregues:

- Documento de Estratégia v1.0.

- Arquitetura C4 revisada.

- Definição da Stack (Next.js + Python/FastAPI + PostgreSQL).

## 5. Métricas da Sprint

* **Velocity (story points concluídos):** 100%

* **Burn-down Chart:** Gráfico indisponível

* **Qtd. de histórias concluídas / planejadas:** 5/5

## 6. Retrospectiva

### O que funcionou bem

- **Decisão Técnica Madura:** O grupo soube pivotar do Firebase para o PostgreSQL após analisar as limitações de armazenamento e necessidade de controle, demonstrando maturidade técnica.

- **Organização da Release:** A divisão de tarefas para a apresentação (Roteiro, Slides, Demo) foi bem estruturada entre os membros.

- **Auditoria de Documentação:** O reconhecimento de que a documentação precisava estar mais acessível (GH Pages) alinha o projeto com os princípios de Software Livre.

### O que pode melhorar

- **Documentação Dispersa:** Foi identificado que muitos documentos importantes (estudos de Git, Figma, Gestão) estão "escondidos" em issues ou arquivos soltos, dificultando o acesso público.

- **Nomeação de Componentes:** Durante a revisão da arquitetura, notou-se inconsistência nos nomes dos componentes do front e back, exigindo retrabalho nos diagramas.

### Ações de melhoria

- **Migração para GH Pages:** Executar o plano de mover os estudos (Gestão, Figma, Git, IA) para o site da documentação.

- **Padronização:** Definir e aplicar nomenclatura padrão para componentes no código e na documentação.

- **Popular Banco de Dados:** Adicionar mais notícias manuais no PostgreSQL para garantir testes de filtro e paginação robustos na apresentação.