# Relatório Reunião de Preparação da Release 1  
**Data:** 30/09/2025  
**Responsável:** Davi  

## Sprint 5  

---

## Anotações da Reunião  

- **Decisão Sobre Banco de Dados:**  
  O grupo decidiu adotar o **PostgreSQL** em vez do **Firebase**, devido às limitações de armazenamento do Firebase e à necessidade de maior controle e flexibilidade.  
  - Apresentação das opções: Davi apresentou as diferenças entre os bancos.  
  - Limitações: Rafael destacou o limite de armazenamento do Firebase; Mateus e Bryan defenderam o uso de um banco dedicado.  
  - Votação: Daniel, Rafael e Bryan votaram por PostgreSQL; Rafael ofereceu servidor para testes.  

- **Revisão e Estruturação da Arquitetura do Projeto:**  
  Davi liderou a revisão da arquitetura do sistema, organizando tarefas e ajustando fluxos entre front-end e back-end.  
  - Ajustes na documentação: faltavam nomeações e interações nos diagramas; revisão delegada a Daniel, Bryan e Allan.  
  - Correção dos fluxos: Rafael e Daniel revisaram as setas e conexões entre componentes.  
  - Distribuição: Davi → nível 1; Daniel e Bryan → nível 2; Allan → apoio; Mateus e Rafael → front-end.  
  - Tecnologias: manter **Next.js** no front-end, **Python/FastAPI** no back-end; considerar **RagFlow** e **N8N** para automação.  

- **Preparação para Apresentação e Documentação:**  
  O grupo organizou o roteiro da apresentação e revisou a documentação para envio no GitHub.  
  - Roteiro: dividido entre introdução, desafio, arquitetura, tecnologias e demonstração.  
  - Distribuição: Davi (introdução/estratégia), Bryan (arquitetura), Rafael (aplicação).  
  - Documentação: será enviada em **Markdown e PDF**.  
  - Release notes: Rafael responsável pela publicação no GitHub.  
  - Organização: Davi fará o commit; Rafael prepara a release.  

- **Configuração e Testes do Ambiente de Desenvolvimento:**  
  Davi, Rafael, Mateus e Bryan configuraram o ambiente, resolveram problemas de dependências e testaram o funcionamento em diferentes sistemas.  

- **Planejamento das Próximas Etapas do Projeto:**  
  O grupo discutiu o início da mineração de notícias, dockerização e aumento da base de dados.  
  - **Dockerização:** Rafael cuidará da configuração e integração do servidor.  
  - **Mineração de Notícias:** Davi começará o desenvolvimento após a configuração do banco.  
  - **Adição de Dados:** Mateus propôs adicionar mais notícias para testes de paginação e filtros.  

---

## Tarefas de Acompanhamento  

- **Nomeação dos Componentes:** Definir nomes para componentes do front-end e back-end. (**Davi, Bryan, Daniel, Allan, Mateus, Rafael**)  
- **Documentação de Estratégia:** Atualizar e enviar o documento revisado; realizar commit no repositório. (**Davi**)  
- **Release Notes:** Criar e publicar a release note no GitHub. (**Rafael**)  
- **Adição de Notícias para Teste:** Popular banco de dados com novas notícias para a apresentação. (**Mateus**)  
- **Preparação para Apresentação:** Elaborar roteiro e slides, distribuindo falas. (**Davi, Bryan, Rafael**)  
