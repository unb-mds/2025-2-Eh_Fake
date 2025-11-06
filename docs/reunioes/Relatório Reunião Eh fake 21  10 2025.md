# Relatório Reunião de Planejamento  
**Data:** 21/10/2025  
**Responsável:** Davi  

## Sprint 10  

---

## Anotações da Reunião  

- **Progresso e Entrega do Minerador:**  
  Allan informou que o minerador está praticamente pronto e se comprometeu a finalizar o código e disponibilizá-lo para revisão até o dia **25/10**.  
  - Davi solicitou que todos revisem o código após o envio antes da entrega definitiva.  
  - Rafael mencionou ter trabalhado em partes do minerador em seu próprio repositório e se colocou à disposição para auxiliar.  
  - Allan confirmou que subirá as pastas e abrirá issues no GitHub.  

- **Migração e Ajustes no Banco de Dados:**  
  Davi comunicou a **migração do banco de dados** e questionou a necessidade de novos ajustes.  
  - Rafael sugeriu priorizar o módulo de IA antes de otimizações.  
  - Mateus reforçou a importância de testar o código antes de merges.  
  - Davi decidiu clonar o repositório e testar do zero para validar o funcionamento.  

- **Melhorias Futuras e Foco de Desenvolvimento:**  
  Davi sugeriu tornar o banco mais completo, com buscas diretas.  
  - Rafael orientou manter o foco no desenvolvimento da **IA**, priorizando funcionalidades essenciais nesta etapa.  

- **Implementação e Problemas do Dark Mode:**  
  Rafael relatou dificuldades na implementação do **modo escuro**, devido a limitações de reconhecimento de tema pelo React.  
  - Solução temporária: uso de cores manuais no Tailwind.  
  - Davi e Rafael discutiram ajustes no layout e funções HTML como alternativa.  
  - Rafael observou que o problema não afeta o funcionamento geral, mas requer refinamento visual.  

- **Uso de Web Crawler e Web Scraper:**  
  Allan explicou as duas abordagens do minerador:  
  - **Web Crawler:** coleta de links das páginas.  
  - **Web Scraper:** extração de informações das notícias.  
  - O grupo discutiu riscos de bloqueio de IPs e alternativas como **GitHub Actions** e **VPNs**.  
  - Rafael sugeriu executar via **GitHub Actions** para evitar bloqueios locais.  

- **Estrutura e Funcionamento do Minerador:**  
  Allan detalhou a estrutura do minerador:  
  - Composto por dois módulos (crawler e scraper).  
  - Permite filtragem por tags e datas.  
  - Pode ser configurado para atualizar notícias automaticamente conforme novas publicações.  


- **Distribuição de Tarefas e Próximos Passos:**  
  - Allan e Rafael continuarão os ajustes do minerador.  
  - Davi assumiu uma tarefa de código solicitada por Mateus (adição de noticias JSON ao banco de dados).  
  - O grupo planejou revisar o minerador e o banco durante a semana, mantendo comunicação contínua.  

---

## Tarefas de Acompanhamento  

- **Entrega do Minerador:** Subir o código do minerador no repositório e garantir revisão e testes antes do merge final. (**Allan, Mateus e Rafael**)  
- **Revisão do Banco de Dados:** Avaliar melhorias e definir possíveis implementações para esta semana. (**Bryan e Daniel**)  
- **Envio de Código Solicitado:** Adicionar o JSON ao banco de dados conforme solicitado por Mateus. (**Davi**)  
