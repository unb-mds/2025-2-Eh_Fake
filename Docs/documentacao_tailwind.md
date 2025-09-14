# Guia resumido de Tailwind CSS

Disclaimer: essa documentação foi feita com base no diagrama do projeto para o frontend e pode sofrer alterações com o decorrer do trabalho

---

### Sumário
1. [Introdução](#1-introdução)  
2. [Layout geral do site](#2-layout-geral-do-site)  
3. [Listagem das notícias](#3-listagem-das-notícias)  
4. [Diferenciação visual entre notícias](#4-diferenciação-visual-entre-notícias)  
5. [Seções importantes](#5-seções-importantes)  
6. [Responsividade](#6-responsividade)  
7. [Como criar alertas e feedback ao usuário](#7-como-criar-alertas-e-feedback-ao-usuário)  
8. [Links úteis](#8-links-úteis)  

---

## 1. Introdução

**Tailwind** é um framework de CSS que facilita a criação de interfaces responsivas e modernas.  
Para o nosso projeto as principais funcionalidades que serão usadas são:

-   Estruturar layouts responsivos.

-   Criar cards de notícias.

-   Diferenciar visualmente entre notícias verdadeiras, falsas, meias verdades e suspeitas.

-   Criação de alertas, badges e ícones.

-   Facilitar a criação de botões, menus e formulários.

---

## 2. Layout geral do site

### Header (barra de navegação)

```html
<header class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
  <h1 class="text-xl font-bold">NewsCheck</h1>
  <nav class="space-x-4">
    <a href="#" class="hover:text-blue-400">Início</a>
    <a href="#" class="hover:text-blue-400">Análises</a>
    <a href="#" class="hover:text-blue-400">Sobre</a>
  </nav>
</header>

```

Principais classes:

-   `flex justify-between items-center`: organiza o menu.

-   `hover:text-blue-400`: hover para dar feedback visual para o usuário.

-   `bg-gray-900 text-white`: boas cores para visualização.


---

## 3. Listagem das notícias

### Card de notícia

```html
<div class="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
  <img class="w-full h-48 object-cover" src="https://via.placeholder.com/400x200" alt="Notícia">
  <div class="p-4">
    <h2 class="text-lg font-bold">Título da Notícia</h2>
    <p class="text-gray-600">Resumo curto da notícia analisada.</p>
    <span class="inline-block mt-2 px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
      Verificada: Verdadeira
    </span>
  </div>
</div>

```

Principais utilidades
    
-   `object-cover`: garante imagem bem dimensionada sem precisar ficar testando.

-   `bg-green-100 text-green-800`: badge de **notícia verdadeira**.

-   Poderia alternar para `bg-red-100 text-red-800` em caso de **fake news**, `bg-yellow-100 text-yellow-800` em caso de **meias verdades** ou `bg-blue-100 text-blue-800` em caso de **duvidosas**.

---

## 4. Diferenciação visual entre notícias 

```html
<p class="bg-red-100 text-red-800 px-2 py-1 rounded">Notícia Falsa</p>
<p class="bg-green-100 text-green-800 px-2 py-1 rounded">Notícia Verdadeira</p>
<p class="bg-orange-100 text-orange-800 px-2 py-1 rounded">Meia Verdade</p>
<p class="bg-blue-100 text-blue-800 px-2 py-1 rounded">Notícia Duvidosa</p>

```

Esse padrão ajuda a dar **feedback visual imediato** ao usuário.

---

## 5. Seções importantes

### Busca de notícias

```html
<div class="flex items-center max-w-xl mx-auto mt-6">
  <input 
    type="text" 
    placeholder="Busque por uma notícia..." 
    class="w-full border border-gray-300 rounded-l px-4 py-2 focus:ring-2 focus:ring-blue-500"
  >
  <button class="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-r">
    Buscar
  </button>
</div>

```

Principais classes:

-   `focus:ring-2 focus:ring-blue-500`: destaque no campo de busca.

-   `rounded-l` e `rounded-r`: cantos arredondados no input e botão, fica mais bonito.

---

### Tabelas de análise

```html
<table class="min-w-full border-collapse border border-gray-300 mt-6">
  <thead class="bg-gray-100">
    <tr>
      <th class="border px-4 py-2 text-left">Notícia</th>
      <th class="border px-4 py-2">Fonte</th>
      <th class="border px-4 py-2">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border px-4 py-2">Exemplo de título</td>
      <td class="border px-4 py-2">Jornal X</td>
      <td class="border px-4 py-2 text-green-600 font-semibold">Verdadeira</td>
    </tr>
    <tr>
      <td class="border px-4 py-2">Outro título</td>
      <td class="border px-4 py-2">Blog Y</td>
      <td class="border px-4 py-2 text-red-600 font-semibold">Falsa</td>
    </tr>
    <tr>
      <td class="border px-4 py-2">Outro título</td>
      <td class="border px-4 py-2">Jornal Z</td>
      <td class="border px-4 py-2 text-orange-600 font-semibold">Meia Verdade</td>
    </tr>
    <tr>
      <td class="border px-4 py-2">Outro título</td>
      <td class="border px-4 py-2">Blog T</td>
      <td class="border px-4 py-2 text-blue-600 font-semibold">Duvidosa</td>
    </tr>
  </tbody>
</table>

```

---

## 6. Responsividade

Em um site de notícias, o acesso mobile é essencial, talvez até mesmo o nosso principal público.  
Com Tailwind, basta prefixar as classes:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- cards de notícias aqui -->
</div>

```

-   `grid-cols-1`: no mobile, 1 coluna.

-   `md:grid-cols-2`: em tablets, 2 colunas.

-   `lg:grid-cols-3`: em telas maiores, PCs em sua maioria, 3 colunas.

---

## 7. Como criar alertas e feedback ao usuário

```html
<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
  <p class="font-bold">Atenção</p>
  <p>Essa notícia ainda está em análise.</p>
</div>

```

-   `border-l-4 border-yellow-500`: alerta chamativo.

-   Pode variar com `bg-green-100`, `bg-red-100`, `bg-orange-100`, `bg-blue-100` conforme o status.

---

## 8. Links úteis

- [Documentação do tailwind](https://tailwindcss.com/docs/installation/using-vite)
-   [Heroicons](https://heroicons.com/) - ícones prontos em SVG de uso livre.

Segundo disclaimer: os exemplos não são o uso final desse framework e foram feitos pelo GPT e revisados por Romm-0

