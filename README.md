# Eh fake 

Sejam bem vindos ao github do projeto **Eh fake**! Esse projeto visa ajudar as pessoas a identificarem a veracidade das notícias por meio de agentes de inteligência artificial que analisam os principais meios de transmissão de notícias. Além dessa análise, aplica-se uma lógica para filtrar aquilo que não parece verídico do que pode ser comprovado.

---

<!-- Isso aqui é para ser como um sumário -->
- Quer ver o nosso processo criativo e organizacional? [Acesse o nosso figma](https://www.figma.com/board/IEMLIEgwQhLgx0DYJ65hG0/Projeto_Eh_fake?node-id=0-1&t=MRTNctqCu7azt13s-1)

- Quer ler a nossa documentação? [Acesse a nossa GitHub page](https://unb-mds.github.io/2025-2-Eh_Fake/)

---

## 🚀 Como Rodar o Projeto

### 🧩 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** 
  - **Windows/Mac:** Baixe diretamente do site.  
  - **Linux:**  
    ```bash
    sudo apt install nodejs npm -y
    ```
- **[Docker](https://www.docker.com/)** e **Docker Compose** instalados e em execução.

---

### 📦 Passo a passo

#### 1️⃣ Clonar o repositório
Faça o clone do projeto ou baixe o `.zip` diretamente do GitHub:
```bash
git clone https://github.com/unb-mds/2025-2-Eh_Fake
cd 2025-2-Eh_Fake
```

---

#### 2️⃣ Instalar dependências
Entre no diretório do projeto.

**Para o primeiro uso**, utilize o comando `install` para criar a pasta `node_modules`:
```bash
npm install
```

> **Nota:** Para atualizações futuras ou ambientes de integração contínua (CI), recomenda-se usar `npm ci`, que instala as versões exatas listadas no `package-lock.json`.

> 💡 Caso esteja no **Windows PowerShell**, talvez seja necessário permitir scripts antes de rodar:
> ```bash
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

---

#### 3️⃣ Subir o banco de dados com Docker
Dentro do diretório `src`, execute:
```bash
cd src
docker-compose up -d
```

Isso iniciará o contêiner PostgreSQL com o banco configurado para o projeto.

---

#### 4️⃣ Criar o arquivo `.env`
Ainda dentro da pasta `src`, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://user_noticias:password_segura@localhost:5433/app_noticias?schema=public"
```

---

#### 5️⃣ Gerar o Prisma Client
Após subir o banco e criar o `.env`, execute:
```bash
npx prisma generate
```

---

#### 6️⃣ Executar o servidor de desenvolvimento
Por fim, rode o projeto com:
```bash
npm run dev
```

Após o comando, clique no link que aparecer no terminal (geralmente `http://localhost:3000`).

---

### 🧠 Dica
Se quiser resetar o banco de dados (caso algo dê errado), você pode usar:
```bash
docker-compose down -v
docker-compose up -d
npx prisma db push
```

---

### ✅ Resumo rápido

| Etapa | Comando principal |
|-------|-------------------|
| Instalar dependências | `npm install` |
| Atualizar dependências | `npm ci` |
| Subir banco (Docker) | `docker-compose up -d` |
| Gerar Prisma Client | `npx prisma generate` |
| Rodar o servidor | `npm run dev` |


---

## 🧪 Testes Automatizados (E2E)

Este projeto utiliza **Playwright** para realizar testes End-to-End, simulando a jornada real do usuário (Busca, Feed, Paginação e Temas) e garantindo a integridade entre o Frontend, Backend e Banco de Dados.

### ⚙️ Configuração e Execução

Certifique-se de que o **banco de dados esteja rodando** (`docker-compose up -d`), pois os testes interagem com dados reais.

#### 1. Instalar os navegadores do Playwright
Após instalar as dependências do projeto (`npm ci`), execute este comando uma única vez para baixar os binários dos navegadores:
```bash
npx playwright install
```

#### 2. Rodar os testes (Modo Terminal)
Para uma verificação rápida sem interface gráfica:
```bash
npx playwright test
```

#### 3. Rodar os testes (Modo Interface Visual)
Para ver o navegador abrindo e inspecionar o passo a passo de cada teste:
```bash
npx playwright test --ui
```

---

## 🧪 Testes Unitários (Jest)

Para realizar os testes unitários basta usar o jest que foi instalado junto com as dependências do projeto

### ⚙️ Execução

Os testes são realizados com o jest e fazem os testes de 90% dos arquivos do projeto

#### 1. 
Após instalar as dependências do projeto (`npm ci`), execute este comando para testar:
```bash
npm test 
```
#### 2. 
Caso queira ver mais detalhadamente os testes do proejeto:
```bash
npm run test:coverage
```
#### 3. 
Caso queira ver os testes em modo observação:
```bash
npm run test:watch 
```
<!-- A partir daqui não tem erro, sempre que fizer uma coisa nova que for relevante para vir para o README é só colocar -->
## Licença

O projeto Eh fake é desenvolvido sob licença do [MIT](https://github.com/unb-mds/2025-2-Eh_Fake/blob/main/LICENSE)
