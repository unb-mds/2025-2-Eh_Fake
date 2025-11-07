# Documento de Estratégia: Projeto É FAKE

**Responsável:** Davi Severiano Freitas  
**Versão:** 1.1 – 7 de novembro de 2025  

---

## Resumo
O **É FAKE** é uma plataforma web voltada à checagem automatizada de notícias, focada em identificar e classificar conteúdos potencialmente falsos.  
Nosso objetivo é combater a desinformação usando tecnologia de **IA** e **processamento de linguagem natural (NLP)**.  
Este documento detalha a estratégia, os objetivos e o plano de execução do projeto.

---

## Sumário
1. [Contexto e Justificativa](#1-contexto-e-justificativa)  
2. [Objetivos Estratégicos](#2-objetivos-estratégicos)  
3. [Público-Alvo](#3-público-alvo)  
4. [Estratégias e Ações](#4-estratégias-e-ações)  
5. [Tecnologias e Ferramentas](#5-tecnologias-e-ferramentas)  
6. [Indicadores de Sucesso (KPIs)](#6-indicadores-de-sucesso-kpis)  
7. [Riscos e Mitigações](#7-riscos-e-mitigações)  
8. [Cronograma do MVP](#8-cronograma-do-mvp-firebase-como-db-principal)  
9. [Revisão e Monitoramento](#9-revisão-e-monitoramento)  

---

## 1. Contexto e Justificativa
A disseminação de desinformação em escala exponencial tornou-se um dos desafios mais críticos da sociedade digital, corroendo a confiança em instituições, polarizando o debate público e ameaçando a estabilidade democrática.  

As metodologias tradicionais de checagem de fatos, embora essenciais, são reativas e não possuem a velocidade necessária para combater a viralização de conteúdo falso.  

Neste cenário, o projeto **É FAKE** se justifica como uma solução tecnológica proativa.  
Utilizando uma arquitetura de **Geração Aumentada por Recuperação (RAG)**, a plataforma oferece análise quase instantânea fundamentada em uma base de conhecimento de fontes confiáveis.  

O objetivo é democratizar a verificação de fatos, oferecendo uma ferramenta que:
- Identifica a desinformação com agilidade.  
- Age com transparência e confiabilidade.  

---

## 2. Objetivos Estratégicos
- Desenvolver um MVP funcional em **15 semanas**.

---

## 3. Público-Alvo
- Usuários comuns (leitores de notícias).  
- Jornalistas e agências de mídia.  
- Órgãos governamentais interessados em monitoramento de desinformação.  

---

## 4. Estratégias e Ações

| Estratégia             | Ação                                      | Responsável       | Prazo        |
|------------------------|-------------------------------------------|------------------|--------------|
| Criar MVP rápido       | Desenvolver aplicação full-stack com Next.js (Frontend + API Routes)           | Equipe de Dev    | 13 semanas   |
| Melhorar acurácia da IA| Integrar com modelos de NLP e fine-tuning | Equipe de IA/ML  | Semanas 5-11 |

---

## 5. Tecnologias e Ferramentas
- **Frontend:** React, Next.js, Tailwind  
- **Minerador:** Python
- **Banco de Dados:** PostgreSQL  
- **IA e NLP:** RAGFlow (motor de RAG) com Gemini (LLM)  
- **DevOps:** Docker, GitHub Actions  

---

## 6. Indicadores de Sucesso (KPIs)
- Tempo médio de resposta da verificação: **30s**  
- Precisão da IA: **90%**  

---

## 7. Riscos e Mitigações

| Risco                           | Impacto | Probabilidade | Mitigação |
|--------------------------------|---------|---------------|-----------|
| Baixa qualidade dos dados de treinamento | Alto    | Média         | Curadoria de dados e parceria com agências de checagem para obter datasets validados. |

---

## 8. Cronograma do MVP (Firebase como DB Principal)

### Fase 1: Fundação e Estudos
- **Sprint 0 (25/08 a 31/08):** Setup inicial do projeto (issues, labels), estudos sobre gestão de projetos, Figma e Git.  
- **Sprint 1 (01/09 a 07/09):** Aprofundamento em tecnologias (Frontend/Backend), estudo de metodologias ágeis (Scrum) e ciclo de vida de software.  
- **Sprint 2 (08/09 a 14/09):** Protótipo de baixa fidelidade (UI/UX), estudo sobre agentes de IA e documentação das tecnologias do frontend.  
- **Sprint 3 (15/09 a 21/09):** Organização da documentação das sprints e estruturação do backlog inicial do produto.  

### Fase 2: Arquitetura e Front-End Inicial
- **Sprint 4 (22/09 a 28/09):** Documentação da arquitetura C4 (Níveis 1, 2 e 3), criação do backlog da Release 1, desenvolvimento inicial do frontend (página inicial, searchbar, cards).  

### Fase 3: Entrega da Release 1
- **Sprint 5 (29/09 a 05/10):**  **Entrega da Release 1 (01/10).**  
- **Sprint 6 (06/10 a 12/10):** Estrutura do PostgreSQL no Docker, configuração do Prisma, API Route (Next.js) inicial integrada ao frontend.

### Fase 4: Coleta de Dados e IA
- **Sprint 7 (13/10 a 19/10):** Desenvolvimento do módulo *Minerador* para coletar notícias no PostgreSQL.  
- **Sprint 8 (20/10 a 26/10):** Estruturação PostgreSQL e alimentar o RAGFlow.  
- **Sprint 9 (27/10 a 02/11):** Integração do RAGFlow com Gemini, API orquestra análise de notícias.  

### Fase 5: Testes e Refinamento
- **Sprint 10 (03/11 a 09/11):** Testes de integração (end-to-end) e correção de bugs.  
- **Sprint 11 (10/11 a 16/11):** Testes de usabilidade (UAT) com grupo piloto.  
- **Sprint 12 (17/11 a 23/11):** Ajustes de UX/UI e otimização de queries no PostgreSQL.  
- **Sprint 13 (24/11 a 30/11):** Preparação do ambiente de produção e documentação final.  

### Fase 6: Entrega da Release 2
- **Sprint 14 (01/12 a 07/12):** Deploy final da aplicação. **Entrega da Release 2 (03 a 05/12).**  

---

## 9. Revisão e Monitoramento
- Reuniões semanais de alinhamento com todas as equipes.  

---
