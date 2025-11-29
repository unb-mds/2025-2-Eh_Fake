# Relatório Reunião de Planejamento  
**Data:** 14/10/2025  
**Responsável:** Davi  

## Sprint 7  

---

## Anotações da Reunião  

- **Transição do Banco de Dados de Firebase para PostgreSQL:**  
  Davi explicou para Daniel, Mateus, Rafael e Bryan o processo de migração do banco de dados de **Firebase** para **PostgreSQL**, detalhando a integração com o **Docker**, ajustes de portas e estrutura de arquivos.  
  - A instalação do Docker foi concluída com sucesso para suportar o novo banco.  
  - Foi necessário alterar a porta padrão do PostgreSQL devido a conflitos locais.  

- **Estrutura de Arquivos e Organização:**  
  O grupo discutiu onde posicionar o banco de dados e o **Prisma**, com Rafael sugerindo seguir uma **arquitetura de referência**.  
  - Davi incluiu o **PGAdmin** para facilitar a visualização dos dados.  

- **Comandos de Inicialização:**  
  Davi explicou que, no momento, o sistema exige múltiplos comandos para inicialização (subir Docker e rodar Prisma).  
  - **Mateus** sugeriu documentar os comandos para simplificar o processo de execução.  

- **Implementação do Carregamento Paginado de Notícias:**  
  O grupo discutiu a necessidade de otimizar o carregamento das notícias no sistema.  
  - Atualmente, o sistema carrega **todas as notícias de uma vez**, o que pode causar lentidão.  
  - Davi sugeriu exibir **seis notícias por vez**, conforme o usuário navega.  
  - Rafael recomendou o uso de **lazy loading do React** para otimizar o carregamento.  
  - Mateus destacou a importância de ajustar a quantidade conforme o **layout da tela**.  

- **Mecanismo de Busca e Segmentação de Dados:**  
  Davi e Mateus discutiram a implementação de um **sistema de busca** dentro do banco de dados.  
  - A ideia é permitir pesquisas diretas no PostgreSQL, aproveitando sua robustez.  
  - Foi proposta a criação de uma **barra de pesquisa (search bar)** e segmentação de resultados.  

- **Ferramentas de Mineração de Dados:**  
  Rafael apresentou ferramentas para mineração, destacando o **Crawl4AI** e **RSS** como opções.  
  - O Crawl4AI permite extrair e limpar dados em formato Markdown.  
  - **Limitação:** o site G1 não fornece imagens facilmente via XML.  
  - **Alternativa:** Mateus sugeriu usar o **RSS do G1** para obter notícias de forma estruturada.  

- **Organização das Equipes e Créditos nos Commits:**  
  Davi reforçou a importância da divisão de tarefas e do registro correto de créditos nos commits.  
  - As equipes foram reorganizadas para as etapas seguintes, focando na **mineração e banco de dados**.  
  - Davi solicitou que os commits sejam feitos **em nome das equipes**, garantindo crédito coletivo.  

---

## Tarefas de Acompanhamento  

- **Documentar Comandos de Inicialização:** Criar seção no `README` com comandos para subir Docker e Prisma. (**Davi**)  
- **Gerenciar Créditos nos Commits:** Realizar commits em conjunto (co-authored). (**Todos os membros**)  
