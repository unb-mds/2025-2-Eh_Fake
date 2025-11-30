# Como baixar e configurar o ragflow

## Requisitos para rodar o nosso projeto

- CPU quad core ou mais
- 16gb de ram ou mais
- 60gb livres de memoria
- Docker versao 24 ou mais atualizada
- Baixar o modelo de embedding da BAAI, bge-mg

---

## Baixando o ragflow

**Caso prefirir confira a documentacao original de como instalar o ragflow e inicia-lo [aqui](https://ragflow.io/docs/dev/), mas ela e em ingles.**

1. Certifique-se de que `vm.max-map-count >= 262144`, caso nao saiba qual e o se confira com `sysctl vm.max_map_count`

2. Clone o repositorio do github ou se preferir baixe o zip do repositoiro deles [aqui](https://github.com/infiniflow/ragflow?tab=readme-ov-file)
	``` bash
	git clone https://github.com/infiniflow/ragflow.git
	cd ragflow/docker
	git checkout -f v0.21.1
	```

3. Para rodar com a cpu use:
	```
	docker compose -f docker-compose.yml up -d
	```
	Caso predira rodar com a gpu use:
	```bash
	sed -i '1i DEVICE=gpu' .env
	docker compose -f docker-compose.yml up -d
	```
4. Para iniciar o ragflow localmente pela cpu use:
	```
	docker logs -f docker-ragflow-cpu-1
	```
	Em caso de estar usando a gpu use:
	```
	docker logs -f docker-ragflow-gpu-1
	```
5. Agora e so abrir o seu navegador e usar `http://localhost` ou a porta padrao do seu pc

---

## Baixando o embedding model (bge-m3)

Caso prefira tem a versao oficial em ingles no [repositorio](https://github.com/infiniflow/ragflow/blob/main/docs/guides/models/deploy_local_llm.mdx) do ragflow

A forma mais facil e rodando pelo ollama localmente, esse nao e o unico metodo, mas e o que sera documentado

1. Baixe o Ollama [aqui](https://ollama.com/download/linux) caso nao o tenha instalado

2. Use `sudo docker run --name ollama -p 11434:11434 ollama/ollama` no terminal para criar e subir o container

3. Use `sudo docker exec ollama ollama pull bge-m3` para adicionar o embedding model no container

4. Adicione o embedding model da mesma forma que se adiciona qualquer llm ou coisas relacionadas no ragflow, tem as imagens no tutorial do site

