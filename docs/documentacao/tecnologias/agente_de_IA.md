# Funcionamento do agente de IA

Essa página tem como objetivo explicar o funcionamento e a estrutura do nosso agente de IA.
Aqui vai um resumo geral: o nosso agente foi desenvolvido na plataforma ragflow, essa plataforma utiliza o método de retrieval augmented generation (RAG) que utiliza as knowledge bases (bancos de conhecimento) para melhorar a precisão e qualidade da resposta, sendo assim quando mais noticias classificadas melhores e mais precisas tendem a ser as respostas.

---

## Knowledge bases

O nosso agente tem duas classes de knowledge bases, uma sendo a de aprendizado e a outra sendo de definições, dentro disso são duas de aprendizado e uma de definição, totalizando três knowledge bases.

- knowledge base de aprendizado: elas são responsáveis por armazenar respostas boas e respostas ruins, sendo uma o exemplo do que fazer e a outra do que não fazer, melhorando a qualidade da resposta e da classificação. Infelizmente isso se equipara a um fine-tuning de uma LLM e precisa ser feito manualmente.

- knowledge base de definições: ela foi montada com uma base de definições de como uma noticia deve ser estruturada e o que deve-se considerar para definir uma noticia como verdadeira e falsa, isso evita que ela tenha que encontrar a definição toda a vez ou criar a resposta para o que é uma noticia bem estruturada, sem essa knowledge base o índice de erro aumentou em 50% (foram só 10 testes).

---

## Improvisos

Pela falta de uma ampla quantidade de informações para ser colocada nas knowledge bases o nosso grupo optou por permitir que o agente pesquisasse sobre os temas no google e no google scholar para fazer a classificação da notícia, isso resolveu o problema de depender apenas das definições de estrutura da notícia e a falta de conhecimento teórico sobre outros assuntos, antes dessa modificação notícias de temas claramente falsos (vacina causar autismo/morte de políticos ainda vivos) eram classificados como verdadeiros caso a noticia fosse bem estruturada, problema que foi resolvido após a adição da busca na web.

---

## Fluxo do agente de IA

- Recebe o arquivo a ser classificado (um por vez melhora a precisão da resposta)

- Gera palavras chave do tema da noticia enviada para buscar na web acerca do tema

- Faz a busca na web de acordo com as palavras chave recebidas

- Envia o resultado da busca para a LLM classificar a notícia (Para uma melhor análise ela dá o motivo da classificação para quem estiver classificando poder conferir e marcar como boa ou má resposta)

- Responde a classificação e a confiança da informação para ser adicionada no banco de dados

---

## Modelos escolhidos para o agente

- Para a nossa LLM o modelo escolhido foi o llama3.2 3b 4_K_L, um modelo de 3 bilhões de parâmetros com janela de contexto de 128 mil tokens, versão quantizada. Esse modelo foi escolhido por ser de uso aberto e funcionar com hardwares menos robustos, um pouco menos que 7gb de VRAM e um poder computacional de uma gpu com essa faixa de VRAM consegue rodar o modelo sem problemas.

- O nosso modelo de embedding é o bge-m3, ele foi escolhido por ser uma referência entre os modelos de embedding multi-linguais, uma característica muito importante para lidar bem com o português, já que a maioria dos modelos sem serem multi-linguais lidam bem com inglês e chinês.

- Para a busca no google é necessária uma chave de API que pode ser obtida no SerpApi.
