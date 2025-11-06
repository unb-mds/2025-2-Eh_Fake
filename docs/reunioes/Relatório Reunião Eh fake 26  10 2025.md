# Relatório Reunião de Planejamento  
**Data:** 26/10/2025  
**Responsável:** Davi  

## Sprint 9  

---

## Anotações da Reunião  

- **Configuração e Uso do Gemini e RagFlow:**  
  Rafael apresentou as configurações do **Gemini** e do **RagFlow**, detalhando limites de uso, custos e formas de integração.  
  - Testes e configuração de chave de API realizados por Rafael.  
  - Modelo escolhido: **'baai bge-m3'**, por ser leve, gratuito e ter boa performance.  
  - Grupo discutiu limites de requisições:  
    - **Plano Pro:** 5 requisições/minuto e 100/dia.  
    - **Plano Flash:** 15 requisições/minuto e 1000/dia.  

- **Consumo de Recursos e Integração:**  
  Rafael destacou o alto consumo de RAM do RagFlow (até 8 GB) e sugeriu que o projeto fosse rodado localmente, com resultados sincronizados no repositório.  
  - Davi sugeriu automatizar o processo de adicionar novas notícias ao RagFlow.  
  - Rafael propôs reformular a arquitetura para reduzir custos e simplificar o fluxo.  

- **Mudança na Arquitetura do Projeto:**  
  - **Proposta de Rafael:** remover o **back-end**, manter o **front-end no GitHub Pages**, rodar o **minerador em GitHub Actions** e o **RagFlow localmente**.  
  - Vantagens: simplicidade, economia e independência de servidores pagos.  
  - Grupo aprovou a proposta após discussão.  
  - Davi ficou responsável por atualizar o **documento estratégico** e o **C4** para refletir as mudanças.  

- **Desenvolvimento e Pendências do Minerador:**  
  Allan relatou dificuldades técnicas com o web crawler.  
  - Caso não consiga resolver até terça-feira, Mateus assumirá a tarefa.  
  - Alternativa: coleta manual de links.  
  - Decisão: minerador deve coletar notícias verdadeiras e armazená-las no formato definido.  

- **Alimentação Inicial do Banco de Dados:**  
  - Enquanto o minerador é finalizado, **Mateus** e **Daniel** ficarão responsáveis por inserir **25 notícias verdadeiras** cada.  
  - O objetivo é criar uma base inicial de dados para testes e exibição no front-end.  

- **Distribuição de Responsabilidades:**  
  - **Rafael:** responsável geral pelo RagFlow.  
  - **Allan e Mateus:** minerador (dependendo do progresso).  
  - **Daniel e Mateus:** banco de dados.  
  - **Davi:** documentação e estudos sobre testes.  

- **Planejamento de Testes e Banco de Dados:**  
  O grupo discutiu a necessidade de implementar testes unitários no front-end e banco, já que o back-end foi removido.  
  - **Bryan** relatou progressos na separação do banco de dados do front-end.  
  - Davi orientou Bryan a focar na **função de pesquisa** antes de implementar a **paginação**.  

---

## Tarefas de Acompanhamento  

- **Atualização da Documentação:** Atualizar documento estratégico e C4 com a nova arquitetura sem back-end. (**Davi**)  
- **Finalização do Minerador:** Concluir o minerador até terça-feira; se houver impedimentos, transferir a tarefa para Mateus. (**Allan**)  
- **Alimentação do Banco de Dados Inicial:** Inserir 25 notícias verdadeiras no banco. (**Mateus, Daniel**)  
- **Responsabilidade pelo RagFlow:** Coordenar e acompanhar todas as tarefas relacionadas ao módulo. (**Rafael**)  
- **Pesquisa no Banco de Dados:** Garantir funcionamento correto da busca de notícias. (**Bryan**)  
- **Estudo sobre Testes:** Iniciar estudo sobre testes unitários e planejar implementação. (**Davi**)  
- **Correção de Links:** Substituir links gerados por IA por notícias reais. (**Allan**)  
