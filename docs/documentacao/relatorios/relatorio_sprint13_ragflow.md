# O que foi feito na semana em relação ao ragflow

Começarei citando o que foi feito no formato de como seriam as issues que foram condensadas nesse documento e depois irei explica-las, investi aproximadamente 6 horas de trabalho nessa semana bem divididas por toda a semana. O tempo de ingestão da knowledge base foi desconsiderado.

1. [Feat] Implementar a busca na web
2. [Chore] Criar uma chave de API para busca no google
3. [Feat] Mudança nas knowledge bases
4. [Estudo] Teste e comparação de resultados
5. [Fix] Mudança na saída para ficar de acordo com o banco de dados

---

## 1. [Feat] Implementar a busca na web 

Assim como foi acordado com o grupo, para evitar do agente de ia classificar notícias erroneamente por falta de informação na knowledge base a busca na web foi adicionada com diversas camadas (duas) de proteção contra falsas informações retiradas da web. Infelizmente isso nos impediu de fazer o trabalho todo sem depender de limite de uso de programas de terceiros, isso será explicado logo abaixo.

---

## 2. [Chore] Criar uma chave de API para busca no google

Para fazer busca no google é necessária uma chave de api, para isso foi necessário criar uma conta no SerpAPI com um limite de 250 requisições por mês, cada notícia demanda uma requisição com múltiplas pesquisas no google, dando uma conversão direta de 1:1, resultando na possibilidade de classificar 250 por mês.

---

## 3. [Feat] Mudança nas knowledge bases

Devido as mudanças na forma que o agente procura informação se mostrou melhor trocar as knowledge bases para uma base de dados do formato que o agente deve e não deve classificar as notícias para evitar saídas indesejadas, coisa que acontece com uma média frequência, mesmo com limitações no prompt.

---

## 4. [Estudo] Teste e comparação de resultados

Testei a classificação e comparei com outros sites de classificação de notícias para ver se a saída estava sendo válida ou inválida, todas as 20 notícias testadas ficaram de acordo com a veracidade indicada em outros sites.

---

## 5. [Fix] Mudança na saída para ficar de acordo com o banco de dados

Para finalizar a saída foi alterada de um texto comum para a estrutura do nosso banco de dados, foi uma mudança simples e rápida, mas vale ser relatado.
