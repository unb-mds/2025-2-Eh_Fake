# Guia resumido de Next.js

Aviso: os códigos foram feitos com a ajuda do GPT, mas foram revisados e alterados por Romm-0, além disso essa é uma documentação feita sem o front concluído e foi feita apenas para uma orientação geral do que fazer, com o decorrer do projeto ela pode sofrer alterações.

---
## Sumário
-   [1. Estrutura de pastas](#1-estrutura-de-pastas)

-   [2. Página inicial e rotas](#2-p%C3%A1gina-inicial-e-rotas)

-   [3. Página dinâmica `[id].js`](#3-p%C3%A1gina-din%C3%A2mica-idjs-detalhes-da-not%C3%ADcia)

-   [4. API interna (`/pages/api/search.js`)](#4-api-interna-pagesapisearchjs)

-   [5. Componentes principais](#5-componentes-principais)

-   [6. Hook customizado](#6-hook-customizado)

-   [7. Resumo do fluxo](#7-resumo-do-fluxo)

---

## 1. Estrutura de pastas
- Aqui temos uma estrutura genérica para facilitar a visualização
```
/é-fake
├─ /pages               # Onde ficam as páginas e rotas do Next.js
│  ├─ index.js          # Página inicial
│  ├─ noticias.js       # Pesquisa avançada
│  ├─ _app.js           # App global (Tailwind, context)
│  └─ api/search.js     # Endpoint interno
├─ /components          # Componentes reutilizáveis (os nomes são autoexplicativos)
│  ├─ Layout.js
│  ├─ SearchBar.js
│  ├─ Results.js
│  └─ Card.js
├─ /styles
│  └─ globals.css
└─ tailwind.config.js
```

## 2. Página inicial e rotas

-   `/pages/index.js` – É a página inicial do site

- Nesse exemplo o Next.js cria rotas automaticamente com base no nome dos arquivos em `/pages`.

**Exemplo:**

```jsx
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Results from "../components/Results";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  return (
    <Layout>
      <SearchBar query={query} setQuery={setQuery} />
      <Results query={query} />
    </Layout>
  );
}

```

---

## 3. Página dinâmica `[id].js` (detalhes da notícia)
- `router.isFallback` - Mostra loading enquanto a página não está pronta

- `getStaticProps` - Busca dados da API para a página

- `getStaticPaths` - Define quais páginas dinâmicas gerar

- O exemplo a seguir mostra como criar páginas dinâmicas para cada notícia sem precisar criar manualmente cada arquivo.

**Exemplo:**
```jsx
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function NewsDetail({ news }) {
  const router = useRouter();
  if (router.isFallback) return <div>Carregando...</div>;
  return (
    <Layout>
      <h1>{news.title}</h1>
      <p>{news.content}</p>
      <span>{news.status}</span>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/news/${params.id}`);
  const news = await res.json();
  return { props: { news } };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

```

---

## 4. API interna (`/pages/api/search.js`)

-   Recebe query via `req.query.q`
    
-   Filtra e retorna resultados JSON
    
-   Simula backend sem precisar de servidor externo

- Facilita testes e integração com frontend Next.js de forma simples.

**Exemplo:**

```jsx
import Card from "./Card";

export default function handler(req, res) {
  const q = req.query.q?.toLowerCase() || "";
  const allNews = [
    { id: 1, title: "Exemplo falso", status: "falso" },
    { id: 2, title: "Exemplo verdadeiro", status: "verdadeiro" },
    { id: 3, title: "Exemplo de meia verdade", status: "meia_verdade" },
    { id: 4, title: "Exemplo duvidoso", status: "duvidoso" },
  ];
  res.status(200).json(allNews.filter(n => n.title.toLowerCase().includes(q)));
}

```

---

## 5. Componentes principais

-   **SearchBar** - Uma barra para pesquisas
    
-   **Card** - Exibe título e status da notícia
    
-   **Results** - Lista de cards, recebe query e faz fetch da API (vulgo pesquisa e mostra o que pedir)

- O exemplo a seguir mostra as três funcionalidades acima

**Exemplo:**
```jsx
// SearchBar.js
export default ({ query, setQuery }) => (
  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar..." />
);

// Card.js
export default ({ title, status }) => <div>{title} - {status}</div>;

// Results.js
import { useFetch } from "../hooks/useFetch";
export default ({ query }) => {
  const data = useFetch(`/api/search?q=${query}`);
  return data.map(n => <Card key={n.id} {...n} />);
};

```

---

## 6. Hook customizado

```jsx
import { useState, useEffect } from "react";
export function useFetch(url) {
  const [data, setData] = useState([]);
  useEffect(() => { if(url) fetch(url).then(r => r.json()).then(setData); }, [url]);
  return data;
}

```

---

## 7. Resumo do fluxo

1.  Usuário digita no **SearchBar** - `Results` mostra cards
    
2.  Clique em card - `noticias/[id]` mostra detalhes
    
3.  Backend simulado via `/api/search.js`
    
4.  Componentes e hook mantêm código limpo e reutilizável (não só é importante para uso geral como também para a nota, prestem atenção nisso)

