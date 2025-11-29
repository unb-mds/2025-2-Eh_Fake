# O que foi feito na semana em relação ao ragflow

Começarei citando o que foi feito no formato de como seriam as issues que foram condensadas nesse documento e depois irei explica-las, investi aproximadamente 15 horas de trabalho nessa semana bem divididas por toda a semana. O tempo de ingestão da knowledge base foi desconsiderado.

1. [Fix] Mudança no formato de ingestão

2. [Chore] Testes e aumento da knowledge base

3. [Chore] Mais testes e aumento da knowledge base

4. [Estudo] Decidir se usar busca na web ou não

---

## 1. [Fix] Mudança no formato de ingestão

 O formato de ingestão foi alterado para ser capaz de seguir o modelo proposto na saída do minerador, mesmo que o ragflow seja capaz de ler o arquivo por padrão ainda assim fazer um fine-tuning na digestão apresentou uma melhora significativa na ingestão.

---

## 2. [Chore] Testes e aumento da knowledge base

Aumentei a knowledge base para tentar resolver o problema de classificações erradas para noticias falsas que usam de artifícios como comprovação científica falsa ou outros tipos de comprovação, isso se mostrou muito perigoso na classificação de notícias relacionadas a notícias, a IA classificou como verídicas notícias relacionadas a vacina causar autismo e outras doenças. O escopo limitado está tornando a LLM pouco precisa.

---

## 3. [Chore] Mais testes e aumento da knowledge base

O mesmo problema da issue anterior foi apresentado, mesmo com uma knowledge base para desmentir certas notícias ainda assim não está sendo o suficiente para evitar que a LLM classifique algumas notícias de forma errada.

---

## 4. [Estudo] Decidir se usar busca na web ou não

Discutimos na reunião do dia 23/11 sobre adicionar uma busca na web para classificação das notícias para mitigar o problema da falta de dados para evitar classificações erradas da IA.
Foi decidido que a tentativa de adicionar essa Feature é valida e pode resolver o nosso problema, os devidos testes serão feitos para posterior validação.
