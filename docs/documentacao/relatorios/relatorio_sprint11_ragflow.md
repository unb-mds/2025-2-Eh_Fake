# O que foi feito na semana em relação ao ragflow

Começarei citando o que foi feito no formato de como seriam as issues que foram condensadas nesse documento e depois irei explica-las, investi aproximadamente 45 horas de trabalho nessa semana (mais de 10h na sexta (14/11) e no sábado (15/11))

1. [Feat] Criação do ingestor de notícias (v0.22)

2. [Chore] Criação dos testes de comunicação entre ragflow e ollama

3. [Estudo] Teste da versão 0.18

4. [Estudo] Teste da versão 0.19

5. [Estudo] Teste da versão 0.20

6. [Estudo] Teste da versão 0.21

7. [Estudo] Mudança da estrutura do agente de ia

8. [Feat] Criação e testes do ingestor de notícias (v0.19)

9. [Chore] Aumentar a knowledge base da definiçaõ de fakenews
 
10. [Feat] Criação e testes classificador de notícias

---

## 1. [Feat] Criação do ingestor de notícias (v0.22)

 O ingestor de notícias foi criado, mas falhou nos testes. Após uma busca de quase um dia foi constatado de que existe um problema de comunicação entre o ragflow e o ollama, tanto com a llm quanto com o modelo de embedding. Por falta de informações mais detalhadas não seria possível resolver esse problema, então foi decidido testar as versões sugeridas por um integrante do laboratório LAPPIS (v0.18 e v0.19) e as abaixo da 0.22V (latest).

---

## 2. [Chore] Criação dos testes de comunicação entre ragflow e ollama

Uma pequena bateria de testes foi criada para testar a comunicação do ragflow com o ollama.
Eles consistem em:
- Rodar por terminal dentro do docker a resolução de três perguntas para cada modelo de llm instalado no ollama
- Rodar por terminal dentro do docker o embedding de três textos para cada modelo de embedding

---

## 3. [Estudo] Teste da versão 0.18

Foi feita uma instalação limpa da versão 0.18 e ela foi testada pelos testes do item 2, todos passaram, além disso foi testado rodar um modelo pronto de agente dentro do ragflow, ele rodou sem falhas.

---

## 4. [Estudo] Teste da versão 0.19

Foi feita uma instalação limpa da versão 0.19 e ela foi testada pelos testes do item 2, todos passaram, além disso foi testado rodar um modelo pronto de agente dentro do ragflow, ele rodou sem falhas.

---

## 5. [Estudo] Teste da versão 0.20

Foi feita uma instalação limpa da versão 0.20 e ela foi testada pelos testes do item 2, todos passaram, além disso foi testado rodar um modelo pronto dentro do ragflow, ele apresentou problemas de reconhecimento de documentos no parsing e foi considerado INVIÁVEL usar essa versão.

---

## 6. [Estudo] Teste da versão 0.21

Foi feita uma instalação limpa da versão 0.20 e ela foi testada pelos testes do item 2, todos passaram, além disso foi testado rodar um modelo pronto dentro do ragflow, ele apresentou os mesmos problemas da versão 0.20 e também foi descartado

---


## 8. [Estudo] Mudança da estrutura do agente de ia

Pelo resultado dos testes a versão escolhida foi a 0.19 por ser a mais estável. Devido a essa mudança a opção de criar uma pipeline de ingestão foi perdida e o formato do agente teve que ser mudado, a partir de agora o agente de IA irá buscar informações em duas knowledges bases, uma com as notícias e a outra com a definição de notícias falsas. O grande problema desse formato é que o escopo de conhecimento fica limitado as notícias já testadas, fazendo com que a IA acabe definindo que notícias falsas que seguem as regras de escrita definidas possam ser verídicas, a possibilidade de fazer uma busca na internet para aumentar o escopo de conhecimento está sendo considerada.

---


## 9. [Chore] Aumentar a knowledge base da definição de fakenews

Após as mudanças do tópico 8 a criação das knowledges bases foi iniciada, diversas definições foram retiradas de fontes confiáveis como artigos científicos, sites de notícias conhecidos e alertas do governo.

---

## 10. [Feat] Criação e testes classificador de notícias

O classificador de notícias foi criado e ainda está na versão de testes, ele está se comunicando bem com as knowledges bases (kbs), mas seu escopo ficou muito limitado pelo prompt de levar as kbs como verdade absoluta, as vezes notícias falsas são classificadas como verdadeiras quando são as primeiras do tópico, um exemplo foi de uma notícia de vacina causar autismo (versão modificada de uma notícia real feita por mim), por estar bem escrita e não ter nada para ser desmentida ela foi classificada como verdadeira todas as vezes. Um fine-tuning ou integração com a web se mostraram necessárias
