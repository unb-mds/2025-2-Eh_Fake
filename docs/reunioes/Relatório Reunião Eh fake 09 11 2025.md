# Relatório Reunião de Planejamento  
**Data:** 09/11/2025  
**Responsável:** Davi  

## Sprint 11  

---

## Anotações da Reunião  

- **Demonstração do Ragflow e Processamento Local de Notícias:**  
  Rafael apresentou para Davi, Bryan, Daniel, Mateus e Allan o funcionamento do **Ragflow**, explicando o pipeline de ingestão, sumarização, vetorização e classificação de notícias.  
  - Foram realizados testes comparativos entre a execução **local (com Llama)** e **via API**.  
  - A execução local elimina custos e limitações de tokens, mas é mais lenta.  
  - A versão via API (Gemini) mostrou melhor desempenho e eficiência.  

- **Pipeline de Processamento de Notícias:**  
  O Ragflow lê arquivos de texto ou PDF, divide o conteúdo em *chunks*, realiza a sumarização, extrai palavras-chave e classifica as notícias automaticamente.  
  - O resultado é exportado em formato **JSON vetorizado** pronto para integração posterior.  
  - O sistema lida melhor com prompts em inglês, mas pode ser adaptado a outros idiomas.  

- **Execução Local com Llama:**  
  Rafael testou o **Llama** localmente, destacando maior controle e independência em relação a APIs externas.  
  - Entretanto, o consumo de GPU é alto e a execução é mais lenta.  
  - Foi sugerido limitar o uso local a testes e desenvolvimento.  

- **Comparação entre Llama e Gemini:**  
  - O modelo **Gemini via API** é mais rápido e otimizado.  
  - O **Llama local** permite mais autonomia, mas tem menor precisão e desempenho. 

- **Discussão sobre Testes de Software:**  
  O grupo discutiu a implementação dos **testes** no projeto.  
  - Foram definidos três tipos prioritários: **unitários**, **de integração** e **de usabilidade**.  
  - Rafael se ofereceu para apoiar com a parte teórica, especialmente **exceptions em Python**.  
  - Davi se comprometeu a enviar até terça-feira a divisão detalhada das tarefas de testes.  

- **Atribuição e Organização das Tarefas do Projeto:**  
  Davi coordenou a distribuição das pendências da sprint:  
  - **Allan:** finalizar o minerador e ajustar/traduzir os arquivos JSON.  
  - **Bryan:** verificar possíveis pendências no banco de dados e apoiar na parte de testes.  
  - **Davi:** supervisionar o andamento geral das entregas e garantir integração entre as partes.  
  - As tarefas podem ser divididas conforme a disponibilidade, mantendo os prazos combinados.  

- **Tarefas do Minerador e JSON:**  
  Allan ficou responsável por finalizar o **minerador** até terça-feira e realizar a **tradução dos arquivos JSON** até sexta-feira.  
  - Foi autorizado abrir duas *issues* distintas no GitHub para acompanhar o progresso.  
  - Os arquivos JSON devem ser padronizados conforme o formato do back-end.  

- **Acompanhamento do Banco de Dados:**  
  Davi verificou com Bryan a situação do banco de dados e, sem novas pendências, decidiu integrá-lo à equipe de testes.  
  - Reforçou-se a importância da **colaboração entre as equipes** e da **comunicação constante** sobre o progresso.  

---

## Tarefas de Acompanhamento  

- **Divisão das Tarefas de Testes:** Dividir a implementação dos testes (unitários, integração e usabilidade) entre os membros e documentar a responsabilidade de cada um. (**Davi**)  
- **Entrega do Minerador:** Finalizar o minerador e garantir sua execução completa. (**Allan**)  
- **Tradução dos Arquivos JSON:** Traduzir os arquivos JSON para o formato resumido do back-end. (**Allan**)  
