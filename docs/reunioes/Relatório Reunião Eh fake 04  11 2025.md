# Relatório Reunião de Planejamento  
**Data:** 04/11/2025  
**Responsável:** Davi  

## Sprint 10  

---

## Anotações da Reunião  

- **Sincronização e Retomada das Atividades da Equipe:**  
  Davi conduziu a reunião para retomar o ritmo após duas semanas de baixa produtividade, reforçando a importância de cumprir tarefas atrasadas.  
  - Davi admitiu não ter concluído estudos sobre testes e revisão da documentação estratégica, comprometendo-se a priorizar ambas.  
  - Allan e Bryan confirmaram entregas concluídas, e Mateus foi lembrado de suas pendências.  
  - Cada membro revisou suas tarefas, reforçando comunicação e prazos até sexta-feira.  

- **Desenvolvimento e Ajustes do Minerador de Notícias:**  
  Allan apresentou o estágio atual do minerador, explicando o código, os sites-alvo e o formato dos dados coletados.  
  - O minerador realiza scraping de notícias e filtragem por período, restando programar os sites específicos.  
  - Rafael e Davi recomendaram armazenar as notícias em **JSON**, com função futura para importação ao banco.  
  - Campos padronizados: título, descrição, link, fonte e imagem.  
  - Allan minerará ao menos 3 sites até sexta-feira (podendo expandir para 5).  

- **Desenvolvimento e Integração do RagFlow:**  
  Rafael relatou avanços e dificuldades técnicas na execução do RagFlow.  
  - Configuração de ambiente no **Arch Linux** com GPU funcional, após problemas de compatibilidade.  
  - Integração de embeddings multilíngues via **modelo bge-m3**, rodando dois containers simultaneamente.  
  - O RagFlow não é otimizado para Windows.  
  - Rafael comprometeu-se a documentar as atividades e abrir issues correspondentes.  

- **Aprimoramento da Busca e Paginação no Front-End:**  
  Bryan demonstrou melhorias na busca do site e recebeu sugestões de Allan e Rafael.  
  - Nova barra de busca com sugestões em tempo real e integração com o banco de dados.  
  - Ajustes visuais pendentes: opacidade e cores de fundo para melhor leitura.  
  - Paginação definida: **6 notícias por página**, com navegação entre páginas e carregamento otimizado.  
  - Problemas de banco de dados resolvidos com ajustes no **Prisma** e reestruturação de código.  
  - Rafael revisará o Pull Request até o dia seguinte.  

- **Planejamento de Testes e Organização do Projeto:**  
  Davi enfatizou a importância de implementar testes e organizar as entregas semanais.  
  - Davi assumiu o estudo e implementação de testes automatizados.  
  - Allan sugeriu automação para importar JSONs ao banco, e Davi confirmou que já existe uma função para isso.  
  - Entregas previstas até sexta-feira, com nova rodada de tarefas no fim de semana.  

---

## Tarefas de Acompanhamento  

- **Revisão de Pull Request:** Garantir que as alterações no front-end estejam completas e corretas. (**Rafael**)  
- **Implementação do Minerador:** Minerar notícias de ao menos 3 sites, salvando-as em arquivos JSON padronizados. (**Allan**)  
- **Paginação de Notícias:** Implementar carregamento paginado (6 notícias/página) com navegação fluida. (**Bryan**)  
- **Padronização dos Dados do Minerador:** Assegurar que os JSONs incluam título, descrição, link e fonte. (**Allan**)  
- **Estudo e Implementação de Testes:** Iniciar testes automatizados no projeto e atualizar documentação. (**Davi**)  
