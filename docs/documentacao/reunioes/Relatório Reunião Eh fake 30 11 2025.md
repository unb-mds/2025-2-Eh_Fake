# Relatório Reunião de Planejamento  
**Data:** 30/11/2025  
**Responsável:** Davi  

## Sprint 14  

---

## Anotações da Reunião  

- **Abertura e Estruturação (GitPages)**
    O responsável Davi oficializou o início da Sprint 14 (última do projeto). Foi apresentada a nova organização da documentação no GitHub Pages, agora estruturada em pastas específicas como "Estudos", "Relatórios" e "Processos".

- **Design e Front-end**
    - **Página de Equipe:** Mateus finalizou o desenvolvimento, restando apenas o commit final e a atualização das fotos dos integrantes.
    - **Pendências Visuais:** Ressaltou-se a ausência de Allan na reunião, mantendo pendentes a entrega da Logo e do Favicon.
    - **Documentação:** Identificadas lacunas nas páginas de "Comece aqui",  "Configuração" e "Releases", que precisam ser criadas.

- **Conflitos de Merge e Testes**
    - **Incidente:** Detectado um conflito nos arquivos de configuração do Jest e `package-lock.json`, ocasionado por commits em branch incorreta.
    - **Resolução:** Daniel solucionou os conflitos de dependências. Bryan ficou encarregado de corrigir o `jest.config.js` e validar os novos testes na branch main.

- **Documentação Técnica e Legada**
    Foi definido um esforço concentrado para padronizar artefatos antigos. Relatórios em PDF serão convertidos para Markdown e a Arquitetura (Modelo C4) será transcrita para a documentação oficial.

- **RagFlow e Dados (IA)**
    Rafael confirmou a conclusão da documentação da IA. Foi alinhado que a base de dados local será populada automaticamente através da inserção das notícias classificadas no arquivo `init.sql` do Docker.

---

## ✔ Tarefas de Acompanhamento

- **Davi:**
    - Preencher a página de Arquitetura com o Modelo C4 em Markdown.
    - Gerar os relatórios de Sprints.
    - Coordenar a resolução final dos conflitos de merge.

- **Mateus:**
    - Realizar o commit da Página de Equipe com as fotos atualizadas.

- **Daniel:**
    - Converter o relatório Story Map (PDF) para Markdown.

- **Bryan:**
    - Resolver o conflito no arquivo `jest.config.js` e validar testes na main.
    - Criar a seção "Comece Aqui".

- **Rafael:**
    - Criar as páginas de "Release Notes" em Markdown.
    - Enviar foto atualizada.

- **Allan:**
    - Finalizar documentação do Minerador, Favicon e Logo (Entregas pendentes).