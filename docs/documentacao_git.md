# Estudo sobre Git - Resumo Prático

### 1. Configuração Inicial

```bash
# Definir usuário e email
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"

# Clonar o repositório remoto
git clone https://github.com/unb-mds/2025-2-Eh_Fake.git
```

---

### 2. Manipulação de Commits

```bash
# Adicionar arquivo ao staging
git add arquivo.txt

# Adicionar todos os arquivos ao staging
git add .

# Criar commit
git commit -m "tipo: mensagem"
```

**Sempre** faça commits que representem apenas **uma alteração por vez**, mantendo-os pequenos e focados, com **mensagens claras** seguindo [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

---

### 3. Branches e Fluxo de Trabalho

```bash
# Listar branches
git branch

# Criar nova branch
git branch nova-branch

# Alternar para uma branch
git checkout nova-branch

# Integrar alterações da main (merge)
git checkout main
git merge nova-branch

# Apagar branch após merge
git branch -d nova-branch
```

---

### 4. Sincronização com Repositório Remoto

```bash
# Enviar alterações para o repositório remoto
git push origin sua-branch

# Atualizar branch local
git pull origin main # ou git pull --rebase origin main para histórico linear
```

Usar `git pull --rebase` ajuda a manter o histórico linear e organizado, evitando commits extras de merge quando várias pessoas contribuem na mesma branch.

---

### 5. Coautoria

Para quando dois ou mais participarem da criação de um mesmo commit, utilize o `Co-authored-by` na mensagem:

```bash
git commit -m "Refactor usability tests.
Co-authored-by: NOME <EMAIL@EXEMPLO.COM>
Co-authored-by: OUTRO-NOME <OUTRO-EMAIL@EXEMPLO.COM>"
```

[Clique aqui](https://docs.github.com/pt/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors) para ver a explicação completa.

---

### Informações Adicionais
- [Documentação oficial do Git](https://git-scm.com/doc)  
- [Git Cheat Sheet PDF](https://education.github.com/git-cheat-sheet-education.pdf)
- https://www.youtube.com/watch?v=UBAX-13g8OM
- https://www.youtube.com/watch?v=192HgwRgOYE
