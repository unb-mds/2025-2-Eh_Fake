# Normas de envio

Esse documento visa explicitar como devem ser preenchidos commits, as issues e os pull request nesse projeto para garantir uma melhor organização. 
Caso você perceba que algum tópico não foi abordado ou o documento está desatualizado faça as devidas alterações.

---

## Sumário

1. [Enviando uma issue](#1-enviando-uma-issue)  
   1.1 [O título](#11-o-título)  
   1.2 [A descrição](#12-a-descrição)  
   1.3 [Tópicos a serem cumpridos](#13-tópicos-a-serem-cumpridos)  
   1.4 [Prova de conclusão](#14-prova-de-conclusão)  
   1.5 [Labels e milestones](#15-labels-e-milestones)  
   1.6 [Exemplo de issue completa](#16-exemplo-de-issue-completa)
   
2. [Enviando um commit](#2-enviando-um-commit)  

3. [Enviando um pull request](#3-enviando-um-pull-request)  
   3.1 [O título](#31-o-título)  
   3.2 [Descrição](#32-descrição)  
   3.3 [Tipo de mudança](#33-tipo-de-mudança)  
   3.4 [Checklist](#34-checklist)  
   3.5 [Como testar / reproduzir](#35-como-testar--reproduzir)  
   3.6 [Áreas impactadas](#36-áreas-impactadas)  
   3.7 [Observações extras](#37-observações-extras)

---

## 1 Enviando uma issue

Se você ainda não sabe como é feito o envio de uma issue, confira [Criando uma issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue) do próprio github.

As issues do nosso projeto seguem um padrão de envio disponível no nosso [template](https://github.com/unb-mds/2025-2-Eh_Fake/blob/teste_template_pullR/.github/ISSUE_TEMPLATE/ISSUE_PADRAO.md?plain=1). Sempre que for criar uma issue selecione a opção **Nova issue**. Após isso você deverá ver um documento nesse mesmo estilo: 
```
*Add a title
[Conventional Commits] <inserir título aqui>

Add a description
<!-- De uma breve explicação por extenso do que deve ser feito -->
## Descrição
complete

---
<!--usar o formato de tópicos enumerados ou não enumerados para definir o que deve ser cumprido, um resumo da descrição -->
## Tópicos a serem cumpridos
- complete

---
<!-- usar o formato de checkboxes para definir formas de comprovar a efetivação da tarefa -->
## Prova de conclusão
- [ ] complete
```

### 1.1 O título:
O título é composto por duas partes, o que fica entre chaves [] e o que fica entre isso aqui <>, para preenche-los siga essas regras

- Deixe as chaves e substitua a frase *Conventional Commits* pelo nome de uma das labels que se encaixe no tema da issue, elas seguem o mesmo padrão do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) com pequenas alterações.
- Após completar a primeira parte, substitua a frase *<inserir título aqui>* por um título breve e descritivo do que será feito.

**Exemplo:** Para uma issue criada com o intuito de criar essa documentação o título poderia ser ''[Docs] Criar a documentação das normas de envio''

### 1.2 A descrição:
A descrição nada mais é do que uma descrição, sem muito segredo ou mistério, explique com um pequeno texto o que será abordado e porquê deve ser abordado. Fique a vontade para adicionar mais coisas, mas não é recomendado fazer textos muito longos. 

Para preencher apenas apague a palavra ''complete'' e escreva o que você tem para escrever.

### 1.3 Tópicos a serem cumpridos:
Nessa parte ele vai seguir uma estrutura padrão de lista, sendo obrigatório frases curtas, de preferência sem passar de três linhas por tópico, objetivas e com apenas uma tarefa por tópico.

Para preencher apenas apague a palavra ''complete'' e preencha os tópicos, não esqueça do formato de uma lista de tópicos no markdown.

### 1.4 Prova de conclusão:
A prova de conclusão serve para manter a organização durante a resolução da issue, elas tem quase a mesma estrutura que os tópicos a serem cumpridos, sendo a única diferença que ela é feita em formato de checkbox. 

As provas de conclusão tem o seu foco em como definir que uma parte da tarefa foi cumprida, pode ser por um commit, envio de um comentário ou um vídeo, fica a seu critério, apenas **não envie documentação nos comentários**, elas devem ser colocadas na pasta [Docs](https://github.com/unb-mds/2025-2-Eh_Fake/tree/main/Docs).

Para preencher apenas apague a palavra ''complete'' e preencha os tópicos, não esqueça do formato de uma lista de checkboxes no markdown.

### 1.5 Labels e milestones:

Esses dois recursos servem para a organização do trabalho, sempre que fizer uma issue adicione as labes de acordo com o que a issue está resolvendo. Em relação as labels elas sempre terão um mínimo do que dever ser atribuído.

- **UMA** em relação a urgência: crítica, alta, média, baixa
- **UMA** em relação a quanto tempo consome: tarefa rápida, tarefa média, tarefa demorada
- **Ao menos uma** relacionada ao conventional commit: bug, chore, docs, estudo, feat, fix, requisito, revert, style, UI/UX


### 1.6 Exemplo de issue completa:
[Esse é um exemplo de uma issue nos padrões](https://github.com/unb-mds/2025-2-Eh_Fake/issues/20)

---

## 2 Enviando um commit

Enviar um commit é uma tarefa simples, mas têm algumas regras

- Os commits devem seguir o padrão das [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) com algumas modificações. As nossas labels são:
	- feat: adição de uma funcionalidade
	- fix: correção de um bug
	- bug: alguma coisa não está funcionando
	- chore: mudanças e tarefas que não afetam o código, documentação ou outras coisas que tem label própria
	- docs: adição ou melhoria na documentação
	- revert: usado caso desfaça o commit anterior
	- style: mudança na formatação do código que não afeta o funcionamento
	- UI/UX: alterações visuais ou de UX/UI

- Quando o commit resolve alguma issue ela deve ser mencionada no commit pelo seu código, apenas adicione esse formato com o número da issue (#829) ao final do seu código. Para mais informações [clique aqui](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests).
- A documentação pode ser commitada diretamente na main sem passar por revisão, mas caso seja o um código necessário a criação de uma branch e após isso a abertura de um pull request.

---

## 3 Enviando um pull request

O Pull Request (PR) é a forma de submeter alterações feitas em uma branch para serem revisadas e integradas ao repositório principal. Para manter a organização do projeto, siga as instruções abaixo. Como ficou bem explicado no próprio template esse foi mais direto ao ponto.

> Aviso: o envio de documentação não precisa passar por Pull Request até o fim da matéria. Caso o projeto continue, as regras deverão ser repensadas. Se perceber que algum documento está desatualizado, qualquer membro pode alterá-lo diretamente.

```
# Pull Request
[Conventional Commits] <inserir título aqui>

## Descrição
- O que foi alterado/implementado?
- Por que esta mudança é necessária / qual problema resolve?
- Como foi feita a implementação?
- Quais Issues são fechadas ou vinculadas? (ex: Closes #123, Fixes #456)

---

## Tipo de mudança
- [ ] [Fix] Correção de bug
- [ ] [Feat] Nova funcionalidade
- [ ] [UI/UX] Alteração do design da página
- [ ] [Style] Mudança no formato do código sem alteração no funcionamento

---

## Checklist
- [ ] Li as ''Normas de envio'' do projeto
- [ ] Código segue os padrões de estilo do projeto
- [ ] Adicionei / atualizei os testes necessários
- [ ] Testes existentes passam localmente
- [ ] Não há erros que impeçam o funcionamento do código
- [ ] Atualizei documentação caso necessário
- [ ] Usei o rebuild para garantir que não há incompatibilidade com a versão
- [ ] O código não quebrou

---

## Como testar / reproduzir
1. Passo A
2. Passo B
<!-- Adicione instruções detalhadas, trechos de código, imagens ou vídeos se necessário. Inclua exemplos de entrada e saída ou comportamentos esperados. -->

---

## Áreas impactadas
- Código fazia A, agora faz B
- Arquivos ou módulos afetados
- ...

---

## Observações extras
Nenhuma

```

### 3.1 O título:

- Use o padrão [[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)] <descrição>, seguindo o mesmo padrão de [commits](#enviando-um-commit) e [issues](#enviando-uma-issue)
    
-   **Exemplo:** [Docs] Adicionar seção de Pull Request nas normas de envio
    

### 3.2 Descrição:

-   Explique o **o que**, **por que** e **como** da alteração.
    

### 3.3 Tipo de mudança:

-   Marque apenas a opção que melhor descreve a alteração.
    

### 3.4 Checklist:

-   Marque todos os itens que se aplicam.

-   Itens que não se aplicam devem ser deixados marcados para manter o padrão.

### 3.5 Como testar / reproduzir:

-   Forneça instruções claras para que outro colaborador valide as alterações, lembre, o próximo a corrigir sempre pode ser você e uma descrição ruim vai dar mais trabalho.

-   É permitido incluir vídeos ou imagens, mas uma boa descrição já basta.

### 3.6 Áreas impactadas:

-   Liste os arquivos, módulos ou componentes afetados.

-   Indique possíveis efeitos colaterais.

### 3.7 Observações extras:

-   Pontos que precisem de atenção ou informações adicionais.

-   Caso não haja observações apenas deixe o “Nenhuma”.
