# ⚙️ Configuração do Projeto

---


## 📊 Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente (arquivo `src/.env`):

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DATABASE_URL` | URL de conexão PostgreSQL | `postgresql://user_noticias:password_segura@localhost:5433/app_noticias?schema=public` |

---

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza **Prisma** como ORM e **PostgreSQL** como banco de dados. A estrutura principal inclui:

### Tabela: `news`
- `id` (INT, PK): Identificador único
- `title` (STRING): Título da notícia
- `description` (STRING): Descrição completa
- `imageSrc` (STRING, NULLABLE): URL da imagem
- `imageAlt` (STRING, NULLABLE): Texto alternativo da imagem
- `status` (ENUM: `Fake | Real | Error`): Classificação da notícia
- `confidence` (DECIMAL, NULLABLE): Nível de confiança (0-100%)
- `source` (STRING, NULLABLE): Fonte da notícia
- `link` (STRING, NULLABLE): Link para a notícia completa
- `created_at` (TIMESTAMP): Data de criação

### Enum: `news_status`
```
Fake   - Notícia falsa/desinformação
Real   - Notícia verdadeira/verificada
Error  - Notícia não classificada
```

---

## 🛠️ Scripts Disponíveis

Dentro do diretório raiz do projeto:

| Script | Comando | Descrição |
|--------|---------|-----------|
| Desenvolvimento | `npm run dev` | Inicia servidor de desenvolvimento |
| Build | `npm run build` | Compila o projeto para produção |
| Iniciar | `npm start` | Inicia servidor de produção |
| Testes | `npm test` | Executa testes (Jest) |
| Testes (Watch) | `npm run test:watch` | Testes em modo observação |
| Coverage | `npm run test:coverage` | Relatório de cobertura de testes |
| E2E Tests | `npm run test:e2e` | Testes end-to-end (Playwright) |
| Lint | `npm run lint` | Verifica linting com ESLint |

---

## 🔧 Comandos Prisma Úteis

Dentro da pasta `src`, você pode usar:

```bash
# Gerar cliente Prisma
npx prisma generate 

# Sincronizar schema com banco
npx prisma db push 

# Criar uma migration (se usar migrações)
npx prisma migrate dev --name <nome_migration>

# Abrir Prisma Studio (visualizar dados no banco)
npx prisma studio 
```

---

## 🐳 Gerenciar Docker

### Iniciar serviços
```bash
cd src
docker-compose up -d
```

### Parar serviços
```bash
docker-compose down
```

### Resetar banco de dados (remove dados)
```bash
docker-compose down -v
docker-compose up -d
npx prisma db push --schema=prisma/schema.prisma
```

### Ver logs dos serviços
```bash
docker-compose logs -f db
```

---

## ❌ Solução de Problemas

### "Could not connect to database"
- Verifique se o Docker está rodando: `docker ps`
- Confirme que o `DATABASE_URL` está correto no `.env`
- Reinicie os serviços: `docker-compose down && docker-compose up -d`

### "Type 'Status' does not exist"
- Regenere o cliente Prisma: `npx prisma generate --schema=prisma/schema.prisma`
- Sincronize o schema: `npx prisma db push --schema=prisma/schema.prisma`

### "Port 5433 already in use"
- Outra aplicação está usando a porta. Opções:
  - Encerre a aplicação que está usando a porta
  - Modifique a porta em `docker-compose.yml` (ex: `5434:5432`)
  - Use: `docker-compose down -v` para forçar parada

### "npm: command not found"
- Node.js não está instalado ou não está no PATH
- Reinstale o Node.js do site oficial

### Port 5050 (pgAdmin) não funciona
- Verifique se o contêiner pgAdmin está rodando: `docker ps | grep pgadmin`
- Pode ser necessário aguardar alguns segundos após `docker-compose up`


---

## 🔗 Links Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Documentação do Docker](https://docs.docker.com/)
- [Repositório GitHub](https://github.com/unb-mds/2025-2-Eh_Fake)

---

**Última atualização:** Dezembro 2025  
**Versão do projeto:** 0.1.0+
