# Guia resumido de React

Aviso: o guia foi produzido com base no protótipo do frontend do site, esse arquivo pode sofrer mudanças no futuro 
Baseado na [documentação oficial do React](https://react.dev) e com ajuda do GPT na escrita dos códigos, mas passaram pela revisão do Romm-0.

---

### Sumário
1. [Conceitos fundamentais](#1-conceitos-fundamentais)
   1.1 [JSX](#11-jsx)
   1.2 [Componentes](#12-componentes)
   1.3 [Props](#13-props)
   1.4 [State](#14-state)
   1.5 [Eventos](#15-eventos)
   1.6 [Renderização condicional](#16-renderização-condicional)
   1.7 [Listas e keys](#17-listas-e-keys)

2. [Hooks essenciais](#2-hooks-essenciais)
   2.1 [`useState`](#21-usestate)
   2.2 [`useEffect`](#22-useeffect)
   2.3 [`useContext`](#23-usecontext)
   2.4 [`useRef`](#24-useref)

3. [Padrões e boas práticas](#3-padrões-e-boas-práticas)
   3.1 [Componentes de layout](#31-componentes-de-layout)
   3.2 [Lifting state up](#32-lifting-state-up)
   3.3 [Custom hooks](#33-custom-hooks)
   3.4 [Controlled vs Uncontrolled components](#34-controlled-vs-uncontrolled-components)

---

## 1. Conceitos fundamentais

### 1.1 JSX
- Sintaxe que mistura **JavaScript** com **HTML**.

- Não é obrigatório, mas facilita bastante. Para mantermos apenas uma forma de escrever o código vamos considera-lo como obrigatório.

**Em JSX:**
```jsx
function Header() {
  return (
    <header className="p-4 bg-gray-900 text-white">
      <h1>É Fake</h1>
    </header>
  );
}
```
**Em HTML:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemplo Header</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <header class="p-4 bg-gray-900 text-white">
    <h1>É Fake</h1>
  </header>
</body>
</html>
```

---

### 1.2 Componentes
- Unidades reutilizáveis de UI.

- Usam a palavra reservada `function`

- Sempre iniciam com letra maiúsculas.

**Exemplo:** card que exibe um título e um status.
```jsx
function Card({ title, status }) {
  return (
    <div className="border rounded-xl p-4 shadow-md">
      <h2 className="font-bold">{title}</h2>
      <StatusLabel status={status} />
    </div>
  );
}
```

---

### 1.3 Props

-   Dados passados de pai para filho.

-   Úteis para cards, botões e layouts reutilizáveis.

**Exemplo:** pai card tem filho status
```jsx
<Card title="Vacina causa doença?" status="fake" />
```

---

### 1.4 State

-   Dados que mudam ao longo da execução.

-   `useState` é a forma principal de controle.

-   Uteis para inputs, filtros e paginação.


**Exemplo:** Search bar
```jsx
import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="border p-2 rounded w-full"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Digite sua pesquisa"
    />
  );
}
```

---

### 1.5 Eventos

-   Ligados a interações (`onClick`, `onChange`, etc).

-   Usados em botões de busca, navegação de páginas e seleção de filtros.


**Exemplo:** Botão genérico
```jsx
function Button({ onClick, label }) {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
```

---

### 1.6 Renderização condicional

-   Mostra UI diferente dependendo do estado ou props.

-   Fundamental para exibir resultados: **É fake, É verdade, Meia verdade, Duvidosa**.


**Exemplo:** Filtra de acordo com o status
```jsx
function StatusLabel({ status }) {
  if (status === "fake") return <p className="text-red-600">É fake</p>;
  if (status === "true") return <p className="text-green-600">É verdade</p>;
  if (status === "doubt") return <p className="text-orange-600">Meia verdade</p>;
  if (status === "doubt") return <p className="text-blue-600">Duvidosa</p>;
  return null;
}
```

---

### 1.7 Listas e keys

-   Renderização de múltiplos itens.

-   Usada para resultados de pesquisa.

**Exemplo:** Renderiza os resultados da busca
```jsx
function Results({ data }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((item) => (
        <Card key={item.id} title={item.title} status={item.status} />
      ))}
    </div>
  );
}
```

---

## 2. Hooks essenciais

### 2.1 `useState`

-   Estado local do componente.

```jsx
const [value, setValue] = useState(initialValue);
```

---

### 2.2 `useEffect`

-   Executa efeitos colaterais (ex.: chamadas de API).

-   Útil em páginas Next.js para buscar dados após interação (Já que a gente vai usar next não faz mal ter uma menção aqui).

**Exemplo:** Busca de acordo com a query
```jsx
import { useState, useEffect } from "react";

function NewsFetcher({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [query]);

  return <Results data={results} />;
}
```

---

### 2.3 `useContext`

-   Compartilha informações globalmente.

-   Útil para autenticação ou tema (dark mode).


**Exemplo:** Troca entre tema claro e tema escuro
```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ToggleTheme() {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
}
```

---

### 2.4 `useRef`

-   Mantém valores persistentes ou acessa elementos do DOM.

**Exemplo:** focar input automaticamente.

```jsx
import { useRef } from "react";

function AutoFocusInput() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} className="border p-2" />
      <button onClick={() => inputRef.current.focus()}>
        Focar
      </button>
    </>
  );
}
```

---

## 3. Padrões e boas práticas

### 3.1 Componentes de layout

-   Organização visual comum a todas as páginas.

```jsx
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">É Fake</header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-200 text-center p-2">Rodapé</footer>
    </div>
  );
}
```

---

### 3.2 Lifting state up

-   Estado compartilhado deve ficar no pai.

-   Útil para barra de pesquisa - resultados.

```jsx
function App() {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <NewsFetcher query={query} />
    </>
  );
}
```

---

### 3.3 Custom hooks

-   Encapsular lógica reutilizável (ex.: busca de notícias).

```jsx
import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);

  return data;
}
```

---

### 3.4 Controlled vs Uncontrolled components

-   **Controlado:** estado gerenciado pelo React (`value` + `onChange`).

-   **Não controlado:** valores lidos via `ref`.

**Recomendação:** usar **controlados** para inputs de pesquisa e filtros.

---
