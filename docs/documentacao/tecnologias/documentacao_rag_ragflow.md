# Por que usar o Rag

O Retrieval Augumented Generation (RAG) é uma forma de processar os dados que serão enviados para a inteligência artificial. Ele trabalha com a recuperação de informações relevantes junto com a capacidade de geração das LLMs, resultando em respostas bem embasadas e mais precisas do que usando apenas a LLM pura.

---

# O que é o RagFlow

O RagFlow é um software open source que é responsável por organizar os dados que passarão pelo processo do Rag (um orquestrador), tornando mais fácil o uso dessa engine e acelerando o processo de desenvolvimento dos projetos. Além disso ele também é responsável pelo embedding dos dados, deixando mais "barato" de processar os dados.

---

## Quais são suas vantagens

- Fácil implementação comparado ao código bruto

- Lida com o processo de embedding

- Atualiza o conhecimento sem precisar treinar a IA, apenas precisa de novos documentos

---

## Quais são suas desvantagens

- Muito exigente em hardware, requisitos recomendados são: 
	- uma cpu quadcore
	- 16gb de ram ou mais
	- 50gb de armazenamento

- Banco de dados vetorizado em produção e cálculos de embedding consomem CPU/GPU e podem gerar grandes custos com o servidor na nuvem.

- Se o embedding for ruim a resposta é ruim, por ser notícia necessitamos de um embedding mais exigente de hardware

---

## Arquitetura típica

1.  Ingestão: coleta as notícias -> limpa -> faz o chunking.

2.  Embedding: cada chunk vira um vetor.

3.  Indexação: vetores são armazenados em um BD vetorizado.

4.  Recuperação: dado um query, busca k vetores mais próximos.

5.  Prompting + Geração: LLM recebe os trechos recuperados com um prompt template e gera a resposta (no nosso caso a veracidade da notícia) que será armazenada em um BD relacional.

6.  Logging/Monitoramento: armazena query, shards recuperados, resposta e métricas.

---

## Resultado dos testes

Ainda não produzido


