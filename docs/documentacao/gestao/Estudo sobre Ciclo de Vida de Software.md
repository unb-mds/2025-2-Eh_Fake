# O Ciclo de Vida de Software: Uma Análise Detalhada

O Ciclo de Vida de Desenvolvimento de Software (SDLC) é uma metodologia estruturada que delineia as fases pelas quais um software passa, desde a sua concepção até à sua retirada. A sua implementação eficaz é crucial para o sucesso de qualquer projeto de software, garantindo que o produto final seja de alta qualidade, cumpra os requisitos do cliente e seja entregue dentro do prazo e do orçamento previstos.

---

## Fases Essenciais do Ciclo de Vida de Software

Cada fase do ciclo de vida tem os seus próprios objetivos, atividades e entregas. Embora a ordem e a ênfase possam variar de acordo com o modelo de ciclo de vida escolhido, as seguintes fases são universalmente reconhecidas:

### 1. Planeamento e Análise de Requisitos
* **Atividades:** Esta fase envolve uma comunicação intensiva com os stakeholders para compreender as suas necessidades e expectativas. As atividades incluem a realização de entrevistas, workshops, questionários e a análise de sistemas existentes. Os requisitos são classificados em funcionais (o que o sistema deve fazer) e não funcionais (como o sistema deve funcionar, por exemplo, desempenho, segurança, usabilidade).
* **Entregas:** O resultado principal desta fase é o Documento de Especificação de Requisitos de Software (ERS), que serve como um contrato entre a equipa de desenvolvimento e o cliente. Outras entregas podem incluir um plano de projeto, uma análise de viabilidade e uma estimativa de custos e prazos.

### 2. Design (Projeto)
* **Atividades:** Com base nos requisitos, a equipa de desenvolvimento projeta a arquitetura do software. Isto é feito em dois níveis:
    * **Design de Alto Nível (Arquitetural):** Define a estrutura geral do sistema, os seus principais componentes e a forma como interagem.
    * **Design de Baixo Nível (Detalhado):** Descreve em detalhe cada componente do sistema, incluindo as suas estruturas de dados, algoritmos e interfaces. Nesta fase, também são criados protótipos e wireframes para visualizar a interface do utilizador e a experiência do utilizador.
* **Entregas:** O Documento de Design de Software (DDS) é a principal entrega, contendo todas as especificações de design.

### 3. Implementação (Codificação)
* **Atividades:** Os programadores escrevem o código-fonte do software na linguagem de programação escolhida, seguindo as diretrizes do documento de design. São utilizadas ferramentas de controlo de versões (como o Git) para gerir as alterações ao código. A revisão de código por pares é uma prática comum para garantir a qualidade e a consistência do código.
* **Entregas:** O código-fonte do software, juntamente com a documentação técnica, são as principais entregas.

### 4. Testes
* **Atividades:** O software é submetido a um processo rigoroso de testes para identificar e corrigir defeitos. Os diferentes níveis de teste incluem:
    * **Teste de Unidade:** Testa componentes individuais do software.
    * **Teste de Integração:** Testa a interação entre os componentes.
    * **Teste de Sistema:** Testa o sistema como um todo.
    * **Teste de Aceitação do Utilizador (UAT):** Realizado pelo cliente para validar que o software cumpre os seus requisitos. Outros tipos de teste, como os de desempenho, segurança e usabilidade, também podem ser realizados.
* **Entregas:** Relatórios de teste, listas de bugs e, finalmente, uma versão estável e testada do software.

### 5. Implantação (Deployment)
* **Atividades:** O software é instalado e configurado no ambiente de produção para que os utilizadores finais possam começar a usá-lo. Estratégias de implantação como "blue-green" ou "canary" podem ser utilizadas para minimizar o tempo de inatividade e o risco. A automação da implantação através de pipelines de Integração Contínua/Entrega Contínua (CI/CD) é uma prática recomendada.
* **Entregas:** O software em produção, manuais de utilizador e documentação de suporte.

### 6. Manutenção e Operação
* **Atividades:** Esta é a fase mais longa do ciclo de vida, durante a qual o software é monitorizado e mantido. Os tipos de manutenção incluem:
    * **Corretiva:** Correção de bugs descobertos após o lançamento.
    * **Adaptativa:** Adaptação do software a mudanças no ambiente (por exemplo, um novo sistema operativo).
    * **Perfectiva:** Implementação de novas funcionalidades ou melhorias.
    * **Preventiva:** Melhorias no software para evitar problemas futuros.
* **Entregas:** Novas versões do software com correções de bugs, atualizações e novas funcionalidades.

---

## Modelos de Ciclo de Vida de Software

A escolha do modelo de ciclo de vida adequado é um fator crítico para o sucesso de um projeto.

### 1. Modelo Cascata (Waterfall)
* **Descrição:** Um modelo linear e sequencial onde cada fase deve ser concluída antes do início da seguinte. É o modelo mais tradicional e rígido.
* **Vantagens:** Simples de entender e gerir; a disciplina rigorosa resulta numa documentação completa.
* **Desvantagens:** Pouco flexível a mudanças; os erros detetados tardiamente são caros de corrigir; o cliente só vê o produto final no fim do projeto.
* **Quando usar:** Projetos pequenos com requisitos bem definidos e estáveis.

### 2. Modelo em V (V-Model)
* **Descrição:** Uma extensão do modelo cascata que enfatiza a verificação e a validação. Para cada fase de desenvolvimento, existe uma fase de teste correspondente.
* **Vantagens:** Deteta erros numa fase inicial; a forte ênfase nos testes resulta num produto de maior qualidade.
* **Desvantagens:** Rígido e pouco flexível, tal como o modelo cascata.
* **Quando usar:** Projetos onde a fiabilidade e a precisão são críticas.

### 3. Modelo Espiral
* **Descrição:** Combina elementos do modelo de prototipagem e do modelo cascata. O desenvolvimento é feito em espirais, com cada volta a representar um conjunto de atividades das fases de desenvolvimento, incluindo a análise de risco.
* **Vantagens:** A forte ênfase na análise de risco ajuda a evitar problemas; é flexível e permite alterações ao longo do projeto.
* **Desvantagens:** Complexo de gerir; pode ser caro.
* **Quando usar:** Projetos grandes, complexos e de alto risco.

### 4. Modelos Iterativos e Incrementais
* **Descrição:** O software é desenvolvido em pequenos ciclos (iterações), com uma parte funcional do sistema (incremento) a ser entregue no final de cada ciclo.
* **Vantagens:** O cliente recebe feedback antecipado e contínuo; é mais fácil de gerir o risco; as mudanças são mais fáceis de implementar.
* **Desvantagens:** Requer um bom planeamento para dividir o sistema em incrementos.
* **Quando usar:** Projetos grandes e complexos onde os requisitos podem mudar.

### 5. Metodologias Ágeis
* **Descrição:** Uma abordagem iterativa e incremental que valoriza a colaboração, a flexibilidade e a entrega contínua de software funcional. O Manifesto Ágil define os seus valores e princípios. Exemplos populares incluem o Scrum (com os seus papéis, eventos e artefactos) e o Kanban (que se foca na visualização do fluxo de trabalho e na limitação do trabalho em curso).
* **Vantagens:** Grande capacidade de adaptação a mudanças; promove a colaboração e a comunicação; entrega de valor ao cliente de forma rápida e contínua.
* **Desvantagens:** Requer uma equipa experiente e autogerida; a falta de documentação detalhada pode ser um problema em alguns projetos.
* **Quando usar:** Projetos onde os requisitos são incertos ou mudam frequentemente.

🔗Link para estudo: [Vídeo-aula](https://www.youtube.com/watch?v=DzqranCyk6w)