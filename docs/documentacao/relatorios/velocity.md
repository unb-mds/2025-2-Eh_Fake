---
title: Relatório de Velocity
---

<style>
  /* Estilo para destacar a média final e insights */
  .velocity-highlight {
    background-color: #e3f2fd; /* Azul claro */
    border-left: 4px solid #2196f3;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
  }
  
  .velocity-warning {
    background-color: #fff3e0; /* Laranja claro */
    border-left: 4px solid #ff9800;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
  }

  table {
    margin: 0 auto;
    width: 100%;
  }
</style>

# Histórico de Velocity

Este documento apresenta a evolução da produtividade da equipe **Eh Fake** ao longo das Sprints. O Velocity é calculado com base na quantidade de itens (Histórias de Usuário e Tarefas Técnicas) entregues por sprint.

## 1. Tabela de Dados

| Sprint | Itens Planejados | Itens Concluídos | % de Conclusão | Contexto Principal |
| :--- | :---: | :---: | :---: | :--- |
| **Sprint 00** | 4 | 4 | 100% | Configuração inicial e Estudos |
| **Sprint 01** | 8 | 7 | 87.5% | Requisitos e Docker |
| **Sprint 02** | 9 | 8 | 88.8% | Protótipo e Diagramas |
| **Sprint 03** | 7 | 2 | 28% | **Queda de Produtividade** (Comunicação) |
| **Sprint 04** | 10 | 10 | 100% | MVP Front-end (Pico de entregas) |
| **Sprint 05** | 5 | 5 | 100% | Release 1 e Estratégia |
| **Sprint 06** | 6 | 5 | 83% | Infraestrutura e Story Map (RagFlow adiado) |
| **Sprint 07** | 6 | 6 | 100%* | Migração Postgres (Ver nota sobre Minerador) |
| **Sprint 08** | 1 | 1 | 100% | **Spike do RagFlow** (Tarefa Única Complexa) |
| **Sprint 09** | 3 | 3 | 100% | UX e Dataset Inicial |
| **Sprint 10** | 4 | 4 | 100% | Paginação e Performance |
| **Sprint 11** | 5 | 5 | 100% | Script ETL e Minerador (2ª Tentativa) |
| **Sprint 12** | 5 | 5 | 100% | QA e Entrega Real do Minerador |
| **Sprint 13** | 9 | 9 | 100% | Entrega Final, Doc e Testes |
| **MÉDIA** | **5.8** | **5.3** | **91%** | -- |

<div class="velocity-highlight">
  <h3>⚡ Velocity Médio: ~5.3 Entregas/Sprint</h3>
  <p>A equipe manteve uma taxa de conclusão alta (geralmente 100%), indicando um bom planejamento do que cabia na semana.</p>
</div>

---

## 2. Gráfico de Evolução

![Gráfico de Velocity](Gráfico Velocity.png)

!!! tip "Visualização"
    O gráfico demonstra a curva de aprendizado inicial, a estabilização na fase intermediária e o aumento de produtividade (delivery) nas etapas finais do projeto (Sprints 04 e 13).

---

## 3. Análise de Variação e Gargalos

A análise dos dados revela uma equipe que soube estimar bem suas tarefas, mas enfrentou desafios técnicos específicos que não aparecem apenas nos números brutos.

### ⚠️ O "Paradoxo" do Minerador (Débito Técnico)
Embora a tabela aponte 100% de conclusão na **Sprint 07**, o item **"Minerador"** apresentou comportamento de débito técnico persistente.
* **Sprint 06/07:** O item foi planejado e marcado como "Concluído" (implementação básica do código).
* **Realidade:** A funcionalidade precisou ser refatorada e ajustada continuamente nas **Sprints 10, 11 , 12 e 13**.
* **Conclusão Real:** A entrega estável e testada do Minerador só ocorreu efetivamente nas **Sprints 13 e 14**. Isso indica que, embora o *Velocity numérico* tenha se mantido alto, houve retrabalho oculto nessas semanas.

### 📉 Queda Crítica: Sprint 03 (2 Entregas)
* **Motivo:** Problemas de comunicação e baixo engajamento inicial, resultando em apenas 28% de entregas. Serviu como ponto de virada para a reorganização do time.

### 📈 Pico de Volume: Sprint 04 e 13
* **Motivo:** Sprints focadas em tarefas granulares (Front-end visual e Polimento final), permitindo um número maior de tickets fechados em comparação às sprints de infraestrutura complexa (como a Sprint 08, focada apenas em IA).