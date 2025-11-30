# Relatório Reunião de Planejamento  
**Data:** 18/11/2025  
**Responsável:** Davi  

## Sprint 12  

---

## Anotações da Reunião  

- **Status do Projeto:**  
  Davi iniciou alertando que faltam apenas duas semanas para a entrega final do projeto.

- **Testes End-to-End (Daniel):**  
  - Daniel apresentou sua pesquisa sobre o conceito, explicando que examina o sistema em todos os níveis de arquitetura.  
  - Levantou a questão de que um teste E2E "verdadeiro" exigiria o RagFlow funcionando plenamente.  
  - Ficou definido que ele verificará a viabilidade, ferramentas e metodologia para apresentar na sexta-feira.

- **Testes de Integração (Mateus):**  
  - Citou o uso de frameworks como **Jest** e **Pytest**, além da importância do **Docker** para simular o ambiente real.  
  - Deverá trazer um exemplo prático ou explicação aprofundada na sexta-feira.

- **Testes Unitários e Automação (Bryan):**  
  - Bryan relatou ter criado 5 testes unitários que passaram com sucesso.  
  - Apresentou a integração com **GitHub Actions**, demonstrando que os testes podem rodar automaticamente a cada *push* ou *pull request*, barrando código com erro.  
  - Davi delegou a responsabilidade total dos testes unitários e seu gerenciamento para Bryan.

- **Minerador (Allan):**  
  - Allan demonstrou o minerador rodando e o script que consolida os dados em arquivos JSON na pasta `finais`.  
  - Foi identificada uma falha crítica: o JSON não estava salvando o **texto completo da notícia**, apenas link e descrição. O texto completo é necessário para o RagFlow.  
  - Allan ficou responsável por adicionar essa tag e também por criar testes para o minerador.

- **Apresentação e GitHub Pages:**  
  - Davi sugeriu melhorias na GitHub Pages para torná-la a "cara" do projeto.  
  - Ideias discutidas: redirecionamento direto, design inspirado na página do RagFlow e inclusão de fotos dos integrantes.  
  - Davi assumiu a tarefa de reformular a página.

- **Encerramento:**  
  A próxima reunião de acompanhamento ficou pré-agendada para sexta-feira.

---

## Tarefas de Acompanhamento  

- **Estudo Testes End-to-End:** Definir viabilidade e ferramentas para apresentação na sexta.  
  *Responsável:* Daniel  

- **Exemplo Testes de Integração:** Preparar demonstração prática.  
  *Responsável:* Mateus  

- **Gestão de Testes Unitários:** Assumir a implementação e configurar o GitHub Actions.  
  *Responsável:* Bryan  

- **Correção e Testes do Minerador:** Incluir o texto completo da notícia no JSON e criar testes.  
  *Responsável:* Allan  

- **Reformulação GitHub Pages:** Melhorar design e incluir seção de integrantes.  
  *Responsável:* Davi
