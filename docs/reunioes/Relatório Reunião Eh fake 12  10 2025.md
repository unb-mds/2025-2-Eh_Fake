# Relatório Reunião de Planejamento  
**Data:** 12/10/2025  
**Responsável:** Davi  

## Sprint 7  

---

## Anotações da Reunião  

- **Atualização das Tarefas das Equipes:**  
  Davi coordenou a revisão das tarefas e confirmou com Bryan e Daniel a finalização do **Story Map**, além de discutir a documentação do **RagFlow** com Rafael.  
  - Rafael foi integrado à equipe do minerador junto com Allan e Mateus.  
  - Novas composições das equipes foram definidas para as próximas etapas.  

- **Finalização do Story Map:**  
  Bryan e Daniel confirmaram a conclusão das tarefas e informaram que o trabalho foi feito no **Figma principal**.  
  - Davi orientou incluir **prints** no documento para registro e comprovação do commit.  

- **Recomposição das Equipes:**  
  - **Equipe Minerador:** Rafael, Allan e Mateus.  
  - **Equipe Banco de Dados:** Daniel e Bryan.  
  - Davi recomendou reuniões internas em cada equipe para garantir colaboração e alinhamento.  

- **Padronização e Orientação de Commits:**  
  Davi explicou a importância dos **co-commits**, para que mais de um membro receba crédito por uma entrega.  
  - Orientou o uso da flag `--co-authored-by` no terminal.  
  - Incentivou que commits sejam feitos em **reuniões conjuntas** para promover colaboração e revisão cruzada.  

- **Progresso e Planejamento do Banco de Dados:**  
  Davi apresentou o início da implementação do banco com **Docker Compose**, substituindo gradualmente o **Firebase** pelo **PostgreSQL** e **Prisma**.  
  - Nova branch criada com `docker-compose.yml` incluindo PostgreSQL e PGAdmin.  
  - O uso do Docker elimina a necessidade de instalação local.  

- **Apresentação e Discussão sobre o RagFlow:**  
  Rafael apresentou relatório detalhado sobre o **RagFlow**, explicando funcionamento, vantagens, desvantagens e arquitetura típica.  
  - **Definição:** workflow baseado em recuperação e melhoramento de dados para LLMs via embeddings.  
  - **Vantagens:** fácil implementação, no-code, integração rápida.  
  - **Desvantagens:** alto consumo de recursos (mínimo 16 GB RAM, 50 GB de armazenamento).  
  - **Arquitetura:** ingestão → limpeza → chunking → embedding → recuperação → integração com banco relacional.  
  - Rafael ainda não concluiu testes devido à lentidão na versão em nuvem, mas planeja executá-los localmente.  

- **Planejamento das Próximas Atividades:**  
  Davi e Rafael alinharam o início das atividades do minerador para a próxima semana.  
  - Decidiram aguardar o retorno de Mateus para iniciar oficialmente.  
  - Davi reforçou a necessidade de reuniões semanais das equipes para manter o ritmo de entregas.  

---

## Tarefas de Acompanhamento  

- **Inclusão de Prints no Docs:** Adicionar prints do Story Map no `docs` para comprovar o commit realizado no Figma. (**Bryan, Daniel**)  
- **Testes do RagFlow:** Realizar os testes pendentes e apresentar os resultados para o grupo. (**Rafael**)  
- **Organização da Equipe Minerador:** Agendar reunião para iniciar o trabalho conjunto. (**Rafael, Allan, Mateus**)  
- **Implementação de Co-commits:** Adotar co-commits em todos os commits futuros para garantir crédito coletivo. (**Todos os membros**)  
