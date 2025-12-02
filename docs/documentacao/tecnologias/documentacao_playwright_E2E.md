# Relatório de Implementação de Testes End-to-End (E2E)
**Projeto:** Eh Fake

**Ferramenta Principal:** Playwright

---

## 1. Estudo sobre Testes E2E

### 1.1. Definição
O teste End-to-End (Ponta a Ponta) é uma metodologia de validação de software que simula o comportamento de um usuário real navegando pela aplicação. Diferente de testes unitários (que testam funções isoladas) ou testes de integração (que testam a comunicação entre dois módulos), o teste E2E valida o fluxo completo da aplicação, desde a interface do usuário (Frontend) até o banco de dados (Backend) e serviços externos.

No contexto da Pirâmide de Testes, os testes E2E ocupam o topo. Eles são:

- **Caixa Preta:** O teste não "sabe" como o código foi escrito, apenas interage com a tela.
- **Integrativos:** Garantem que o Next.js, a API, o Prisma e o Docker estão conversando corretamente.
- **Críticos:** Focam nas jornadas principais que trazem valor ao usuário final.

### 1.2. Por que aplicar no projeto Eh Fake?
O projeto possui uma arquitetura que envolve múltiplos componentes interconectados:

- **Frontend:** Next.js com renderização híbrida e Tailwind CSS.
- **Backend:** API Routes do Next.js.
- **Dados:** PostgreSQL rodando via Docker gerenciado pelo ORM Prisma.

Testes unitários isolados não seriam capazes de garantir que uma busca feita no componente `SearchBar.tsx` trafegaria corretamente pela API e retornaria os dados filtrados do banco PostgreSQL. Apenas o teste E2E cobre essa integridade.

---

## 2. Tecnologias e Ferramentas
Para a implementação, foi escolhido o Playwright, uma ferramenta moderna de automação mantida pela Microsoft. As razões para essa escolha incluem:

- **Suporte a Motores Web Reais:** O Playwright testa no Chromium, Firefox e WebKit, garantindo fidelidade visual.
- **Auto-waiting:** Ele aguarda automaticamente que elementos apareçam na tela (ex: cards carregando via API) antes de falhar, o que é essencial para aplicações dinâmicas como o Feed de Notícias.
- **Integração com CI/CD:** Facilita a execução automática em pipelines (GitHub Actions).

---

## 3. Metodologia de Aplicação no Projeto
A estratégia de testes foi desenhada baseando-se nos Fluxos Críticos do Usuário (Critical User Journeys). Abaixo, detalhamos como cada funcionalidade do código fonte foi coberta pelos testes.

### 3.1. Cenário 1: Carregamento do Feed de Notícias
**Componentes Envolvidos:** `src/app/page.tsx`, `src/components/LoadCards.tsx`, `src/components/ui/Cards.tsx`.

**Lógica do Teste:** O teste acessa a rota raiz (/). Como o ambiente de teste sobe o container Docker com o banco de dados populado (via script `init.sql`), o teste verifica se os componentes `<article>` foram renderizados na tela. Isso valida a conexão Database -> Prisma -> API -> Frontend.

### 3.2. Cenário 2: Mecanismo de Busca
**Componentes Envolvidos:** `src/components/SearchBar.tsx`, Hook `useSearch.ts`, API Route `route.ts`.

**Lógica do Teste:**
- O teste localiza o input de busca.
- Simula a digitação de um termo (ex: "Vacina").
- Dispara a ação de busca.
- Verifica se a URL foi atualizada com Query Params (ex: `?q=Vacina`).
- Verifica se o conteúdo da página mudou para refletir o filtro.

### 3.3. Cenário 3: Paginação (Scroll Infinito)
**Componentes Envolvidos:** `src/components/NextPage.tsx`, Hook `usePagination.ts`.

**Lógica do Teste:** O script simula uma ação de rolagem (`window.scrollTo`) até o final da página. O teste então aguarda a requisição de rede e verifica se o número de elementos (cards de notícias) aumentou no DOM, validando a lógica de "Load More".

### 3.4. Cenário 4: Preferências de Interface (Temas)
**Componentes Envolvidos:** `src/components/theme/Switcher.tsx`, `src/app/globals.css`.

**Lógica do Teste:** Interage com o botão de troca de tema e verifica a alteração de atributos HTML (ex: classe `dark` ou `data-theme`), garantindo que a estilização do Tailwind responda à ação do usuário.

---

## 4. Configuração do Ambiente de Teste
A configuração foi centralizada no arquivo `playwright.config.ts`. Um ponto crucial da implementação é a orquestração do servidor:

```ts
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
}
```
Esta configuração garante que, ao rodar o comando de teste, o Playwright automaticamente:

- Inicia a aplicação Next.js (como se fosse um usuário rodando `npm run dev`).
- Conecta-se à instância do Banco de Dados Docker definida no `docker-compose.yml`.
- Executa as interações.
- Encerra o processo.

Isso assegura que o teste é executado em um ambiente idêntico ao de produção.

---

## 5. Conclusão
A implementação dos testes E2E no projeto Eh Fake eleva o nível de maturidade do software. Ao cobrir automaticamente os fluxos de visualização, busca e navegação, o projeto se blinda contra alterações futuras no código (refatorações) ou atualizações de bibliotecas que poderiam quebrar as funcionalidades principais.
