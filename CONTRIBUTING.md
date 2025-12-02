# Guia de Contribuição - Eh Fake

👋 Olá! Ficamos felizes com seu interesse em contribuir para o **Eh Fake**.

Este documento estabelece as diretrizes para garantir que sua contribuição seja eficiente e esteja alinhada com os padrões de qualidade e processos da nossa equipe.

---

## 🚀 Como Começar

### **Pré-requisitos**
Antes de começar, certifique-se de ter instalado em sua máquina:

- **Docker** e **Docker Compose** (Essencial para o Banco de Dados e RagFlow)
- **Node.js** (v18 ou superior)
- **Python** (v3.10 ou superior)
- **Git**

---

## ⚙️ Configuração do Ambiente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/unb-mds/2025-2-Eh_Fake.git
   cd 2025-2-Eh_Fake 

2. **Suba os containers (Banco de Dados):**
     ```bash
   docker-compose up -d
3. **Instale as dependências do Front-end:**
     ```bash
   npm install
4. **Configure as variáveis de ambiente:**
  - Duplique o arquivo .env.example
  - Renomeie para .env
  - Preencha as chaves necessárias

## 🧩 Workflow de Desenvolvimento

Utilizamos metodologias ágeis. Toda contribuição deve estar atrelada a uma **Issue** no GitHub, que pertence a uma **User Story**, dentro de uma **Feature**, ligada a um **Épico**.

---

### **1. Branches**

Nunca faça commits diretamente na `main`.

Crie uma branch para sua tarefa seguindo este padrão:
  ```bash
   tipo/breve-descricao
  ```
**Exemplos:**
- feat/filtro-noticias  
- fix/erro-paginacao  
- docs/atualizacao-readme  
- chore/config-jest  

---

## 2. Padrão de Commits (Conventional Commits)

Mensagens devem ser claras, objetivas e atômicas.

**Formato:**  
tipo: descrição curta e objetiva

**Tipos permitidos:**
- feat: nova funcionalidade  
- fix: correção de bug  
- docs: documentação  
- style: formatação que não afeta lógica  
- refactor: alteração sem mudar funcionalidade  
- test: testes  
- chore: configurações, builds, dependências  
- UI/UX: mudanças visuais ou de experiência  

**Exemplo:**  
```bash
git commit -m "[feat] implementa barra de busca com autocomplete"
```
Dica: para Pair Programming, use **Co-authored-by** no commit.

---

## 3. Código Limpo e Linter

Antes de enviar sua contribuição, garanta que o código está padronizado.

**Front-end:**  
```bash
npm run lint
```
**Back-end / Minerador:**  
Seguir PEP8.

---

## 🧪 Testes

A qualidade é prioridade. Seguimos a pirâmide de testes.

### **Testes Unitários (Obrigatórios)**  
Para novos componentes e lógica de negócio.

**Rodar:**

**Front-end:**  
```bash
npm test
```
**Minerador:**  
```bash
pytest
```
### **Testes de Integração**  
Para APIs e Banco de Dados.

### **Testes End-to-End (E2E)**  
Usamos Playwright para fluxos críticos.

---

📌 **Regra de Ouro:**  
- Criou uma funcionalidade → crie testes  
- Corrigiu um bug → crie um teste que evite regressão  

---

## 📝 Abrindo um Pull Request (PR)

1. Faça push da sua branch:  
   ```bash  
   git push origin sua-branch

2. Abra o PR no GitHub apontando para a **main**.

3. Preencha completamente o template:  
   - Link da Issue  
   - O que foi feito  
   - Prints/GIFs (se houver mudança visual)  
   - Checklist de auto-revisão marcado  

4. Aguarde aprovação do CI/CD (GitHub Actions).  
5. Solicite Code Review de pelo menos um colega.

---

## 🤝 Código de Conduta

Este projeto segue um Código de Conduta para garantir um ambiente saudável, inclusivo e respeitoso.  
Ao contribuir, você concorda em manter uma comunicação clara, cordial e colaborativa.

---

Obrigado por contribuir com o **Eh Fake**! 🚀


