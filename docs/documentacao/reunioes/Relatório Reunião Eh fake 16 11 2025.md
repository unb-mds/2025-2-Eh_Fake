# Relatório Reunião de Planejamento  
**Data:** 16/11/2025  
**Responsável:** Davi  

## Sprint 12  

---

## Anotações da Reunião  

- **Abertura da Reunião:**  
  Davi iniciou a reunião informando que o projeto está se aproximando da etapa final e revisou a divisão das responsabilidades sobre os testes: unitários, integração e end-to-end.

- **Configuração da Plataforma de Testes (Unitários):**  
  - Ambiente configurado com **Jest** e **React Testing Library**.  
  - Teste inicial criado para o componente **Footer**, garantindo que a configuração está correta.  
  - Execução de testes definida via `npm test`.  
  - Estrutura oficial de testes estabelecida: cada componente terá seu respectivo arquivo `*.test.jsx`.  
  - Testes unitários ficaram sob responsabilidade de **Davi** e **Bryan**.

- **Organização da Estrutura de Testes:**  
  - Cada seção do sistema (components, APIs, etc.) deverá possuir uma pasta própria de testes.  
  - Davi demonstrou a estrutura e explicou como será mantida a organização dentro do repositório.

- **Atualizações do RagFlow (Rafael):**  
  Rafael apresentou problemas e avanços importantes:  
  - Versões 20–22 do RagFlow possuem erros críticos (parser, comunicação e lentidão).  
  - Versões estáveis identificadas: **18 e 19**, sendo a **19** utilizada.  
  - O parser atual falha ao reconhecer corretamente PDF, TXT e Markdown.  
  - A ingestão passou a ser feita pela **Knowledge Base interna**, com geração automática de *chunks* vetorizados.  
  - Identificado problema de classificação: notícias falsas bem escritas estão sendo tratadas como verdadeiras.  
  - Possíveis soluções:  
    - Integrar **pesquisas automáticas** (Google, Wikipedia, Google Scholar).  
    - Tornar os prompts mais restritivos.  
    - Evitar fine-tuning devido à complexidade e tempo.  
  - Rafael relatou diversos bugs do RagFlow: timeouts ignorados, falhas aleatórias, Out of Memory sem motivo e documentação insuficiente.  
  - Apesar dos desafios, o RagFlow está em desenvolvimento e evoluindo.

- **Sugestão para a Apresentação Final:**  
  Davi propôs gravar o funcionamento do RagFlow previamente para economizar tempo e evitar falhas durante a apresentação.  

- **Atualização do Minerador (Allan):**  
  - O minerador está funcional e já foi enviado ao GitHub.  
  - Allan informou que a versão final será apresentada na reunião de terça-feira.

- **Encerramento:**  
  Davi decidiu não definir novas tarefas, pois as atuais já estão em andamento.  
  A reunião foi finalizada desejando bom domingo a todos e confirmando encontro na terça-feira.

---

## Tarefas de Acompanhamento  

- **Testes Unitários:** Implementar os testes conforme estrutura definida.  
  *Responsáveis:* Bryan, Davi  

- **Testes de Integração:** Estudar e preparar apresentação sobre a abordagem.  
  *Responsável:* Mateus  

- **Testes End-to-End:** Estudar e explicar metodologia e aplicação.  
  *Responsável:* Daniel  

- **Finalização do Minerador:**  
  - Concluir o tradutor para JSON resumido.  
  - Organizar a estrutura final dos arquivos.  
  - Preparar demonstração completa.  
  *Responsável:* Allan  

- **Desenvolvimento do RagFlow:** Ajustes, correções e integração de novos mecanismos de verificação.  
  *Responsável:* Rafael  
