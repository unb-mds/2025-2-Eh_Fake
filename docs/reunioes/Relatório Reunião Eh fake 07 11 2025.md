# Relatório Reunião de Planejamento  
**Data:** 07/11/2025  
**Responsável:** Davi  

## Sprint 10  

---

## Anotações da Reunião  

- **Distribuição e Atualização de Tarefas do Projeto:**  
  Davi coordenou a atualização das tarefas entre os membros (Daniel, Mateus, Bryan, Allan e Rafael), revisando pendências e definindo prazos até domingo.  
  - Daniel e Mateus ficaram responsáveis por finalizar as 25 notícias manuais.  
  - Bryan confirmou a conclusão de sua parte no banco de dados.  
  - Allan relatou a finalização do minerador.  
  - Rafael explicou dificuldades técnicas relacionadas ao RagFlow.  

- **Justificativas sobre Coleta Manual:**  
  Daniel e Mateus questionaram a necessidade da coleta manual, sugerindo o uso do minerador.  
  - Davi esclareceu que a coleta manual foi decisão anterior, garantindo base inicial **verificada**.  
  - As 25 notícias devem ser entregues conforme o combinado.  

- **Definição de Novos Prazos e Direcionamentos:**  
  - Todas as pendências devem ser concluídas até domingo.  
  - **Allan:** finalizar o minerador com busca em profundidade e tratamento de JSON.  
  - **Bryan:** finalizar o Pull Request.  
  - **Rafael:** corrigir o problema de conexão do RagFlow.  

- **Demonstração e Ajustes do Minerador de Notícias:**  
  Allan apresentou o minerador desenvolvido em Python, mostrando a lógica de coleta, filtragem por data e salvamento dos arquivos JSON.  
  - Coleta de sites: **G1**, **Tecmundo** e **Olhar Digital**.  
  - Utiliza **busca em profundidade** para o G1 e coleta simples para os demais.  
  - Salva os dados em pastas separadas, permitindo filtragem por data.  
  - Durante a reunião, Allan demonstrou o funcionamento em tempo real, incluindo exclusão e recriação de arquivos.  

- **Ajustes na Estrutura dos Dados:**  
  Davi solicitou que o formato dos arquivos JSON fosse adaptado ao modelo do banco de dados.  
  - Allan se comprometeu a remover campos desnecessários e padronizar o formato.  
  - Definido que o minerador deve ser expandido para até **cinco sites**.  

- **Ajustes Técnicos e Correções de Código:**  
  Daniel e Rafael discutiram erros de atributo HTML e integração.  
  - Rafael explicou que o erro ocorre por divergência entre servidor e cliente.  
  - Sugeriu ignorar o aviso via código e Daniel testou com sucesso.  
  - Rafael autorizou aplicar a correção diretamente na branch principal.  

- **Demonstração do Sistema de Paginação de Notícias:**  
  Bryan apresentou o sistema de **paginação** do front-end.  
  - O site agora carrega **seis notícias por página**, evitando sobrecarga.  
  - O carregamento é dinâmico e conectado ao banco de dados.  
  - Ficou definido que Bryan enviará o **Pull Request** até domingo.  

- **Agendamento da Próxima Reunião:**  
  O grupo definiu o próximo encontro para **domingo, às 14h30**, com participação de Rafael, Mateus, Bryan e demais membros.  

---

## Tarefas de Acompanhamento  

- **Envio de Notícias Manuais:** Enviar as 25 notícias manuais restantes conforme combinado anteriormente. (**Daniel, Mateus**)  
- **Correção de Erro no Projeto:** Resolver o problema do atributo HTML identificado durante os testes. (**Daniel**)  
- **Ajuste do Minerador:** Tratar os arquivos JSON para conter apenas os campos necessários conforme modelo do banco. (**Allan**)  
- **Expansão do Minerador:** Adicionar até 5 sites (incluindo fontes duvidosas) e consolidar dados em pasta única. (**Allan**)  
- **Envio de Pull Request:** Enviar PR com modificações no banco de dados. (**Bryan**)  
- **Apresentação do RagFlow:** Apresentar solução do problema de conexão do RagFlow com o Olhama. (**Rafael**)  
