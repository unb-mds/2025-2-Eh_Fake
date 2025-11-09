# Teste de desempenho do ragflow

---

## Tecnologia

Os testes foram feitos com um modelo de agente usando o:

- llama3.2:latest rodando localmente

- llama3.2:1b rodando localmente

- gemini_2.5 flash via API.

O modelo de embedding foi o BAAI/bge-m3 versão para múltiplas línguas.

---

## Especificações do hardware

- cpu: intel 14600k

- ram: 32gb ram ddr5 6000mhz cl30

- gpu: 4060 ti 8gb

- ssd: nvme gen 4

---

## Método

Os testes consistiram em:

- Rodar um parser para textos e pdfs.

- Estágio de limpeza para sumarizar e remover informações desnecessárias com uso da LLM.

- Fazer o embedding com o modelo de embedding.

---

## Resultados

- llama3.2:latest
O teste foi executado duas vezes, passou pelo parser em 0.2s e ficou no estágio de limpeza por 20 minutos ao todo em ambas as vezes, o uso do hardware ficou em 100% e a tarefa foi cancelada pela inviabilidade de gastar mais de 20 minutos por notícia.

- llama3.2:1b
Resultado idêntico ao modelo latest (3b), inviável.

- gemini 2.5 flash
O teste foi executado 10 vezes, o parser demorou os mesmos 0.2s, a limpeza durou aproximadamente 10 segundos e o embedding foi concluído em menos de 1 segundo, tempo médio total por notícia foi de 11 segundos, sendo bom o suficiente para ser usado. O grande problema desse método foi o limite do free tier do gemini, devido a quantidade limitada de token e de requisições por segundo, sendo necessária a redução da qualidade final da saída para ser viável.

---

# Conclusões finais

Rodar localmente foi considerado inviável e será descartado. Em relação ao uso de uma ia via API se mostrou possível, mas ao custo de uma resposta menos precisa, mas ainda dentro do escopo para o trabalho.
Foi comprovado que é possível fazer o uso dessa tecnologia.
