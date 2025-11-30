---
hide:
  - navigation
  - toc
---

<style>

/* Remove a limitação do grid do MkDocs Material */
.md-grid {
  max-width: 100% !important;
  padding: 0 !important;
}

/* Remove container interno */
.md-content__inner {
  margin: 0 !important;
  padding: 0 !important;
  max-width: 100% !important;
}

.md-main__inner {
  margin: 0 !important;
  padding: 0 !important;
}

/* HERO SECTION */
.hero-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  padding: 100px 20px 60px 20px;
  width: 100%;
}

/* Tipografia Hero */
.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #1a202c;
  max-width: 950px;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 750px;
  margin: 0 auto 40px auto;
  line-height: 1.6;
}

/* MOCKUP */
.browser-mockup {
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0,0,0,0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  background: white;
}

.browser-header {
  background: #f1f3f4;
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.dot { width: 12px; height: 12px; border-radius: 50%; }
.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

/* BOTÕES */
.cta-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.md-button--primary { font-weight: 700; padding: 12px 32px; }

/* SEÇÕES */
.section-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 20px;
}

.section-center-text {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px auto;
}

.section-title { font-size: 2rem; font-weight: 700; margin-bottom: 10px; }

</style>

<div class="hero-wrapper">

<h1 class="hero-title">A Verdade, Verificada por IA.</h1>

<p class="hero-subtitle">
    O <strong>Eh Fake</strong> combina o poder dos LLMs com a precisão da busca vetorial (RAG) para desmascarar desinformação em segundos. Open Source, rápido e confiável.
</p>

<div class="cta-group">
    <a href="como_baixar_ragflow.md" class="md-button md-button--primary md-button--large">
        Começar Agora ⚡
    </a>
    <a href="https://github.com/unb-mds/2025-2-Eh_Fake" class="md-button md-button--secondary md-button--large">
        Ver no GitHub
    </a>
</div>

<div class="browser-mockup">
    <div class="browser-header">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
    </div>
    <img src="https://placehold.co/1200x700/f8fafc/cbd5e1?text=Dashboard+do+Eh+Fake&font=roboto"
         style="display: block; width: 100%;">
</div>

</div>

<div align="center" style="background: white; padding: 50px 0; border-bottom: 1px solid #eee;">
    <p style="opacity: 0.5; font-size: 0.8rem; letter-spacing: 1.5px; font-weight: bold; margin-bottom: 25px; text-transform: uppercase;">Powered by Modern Tech</p>
    
    <div style="display: flex; gap: 40px; justify-content: center; opacity: 0.7; flex-wrap: wrap;">
        <img src="https://cdn.simpleicons.org/react" title="React" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/nextdotjs" title="Next.js" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/python" title="Python" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/postgresql" title="PostgreSQL" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/docker" title="Docker" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/googlegemini" title="Google Gemini" width="40" height="40" />
    </div>
</div>

<div class="section-container">
    <div class="section-center-text">
        <h2 class="section-title">Por que o Eh Fake é diferente?</h2>
        <p>Tecnologia projetada para transparência e precisão.</p>
    </div>

    <div class="grid cards" markdown>

-   :material-brain: **Inteligência Híbrida**
    ---
    Não é apenas um chat. O sistema busca em bases de dados confiáveis (RAG) antes de responder, eliminando alucinações.

-   :material-flash: **Tempo Real**
    ---
    Processamento otimizado para verificar links e textos em segundos, ideal para o ritmo das redes sociais.

-   :material-shield-check: **Transparência Radical**
    ---
    Ao contrário de "caixas pretas", o Eh Fake cita as fontes exatas utilizadas para chegar a cada veredito.

-   :material-api: **API First**
    ---
    Arquitetura desacoplada. Integre nosso motor de verificação ao seu aplicativo ou fluxo editorial via API.

    </div>
</div>

<div style="background-color: #f8f9fa; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
    <div class="section-container">
        <div class="section-center-text">
            <h2 class="section-title">Como Funciona</h2>
            <p>Entenda o fluxo da notícia através do nosso motor RAG.</p>
        </div>

<div style="display: flex; justify-content: center;">

```mermaid
graph TD
    %% Atores e Sistemas Externos
    User([Usuário])
    Agent[Agente de IA<br/>(RagFlow + Gemini)]

    %% Subsistemas do Eh Fake
    subgraph "Plataforma Eh Fake"
        Front[Front End]
        Miner[Minerador]
        SQL[(Banco Relacional)]
        Vec[(Banco Vetorizado)]
    end

    %% Relacionamentos (Conforme Diagrama C4)
    User <-->|Consulta & Veracidade| Front
    Front <-->|Lê Notícias Processadas| SQL
    
    Miner -->|Envia Notícias| Agent
    
    Agent -->|Salva Dados Tratados| SQL
    Agent <-->|Embedding & Contexto| Vec

    %% Estilização
    style User fill:#fff,stroke:#333,stroke-width:2px
    style Front fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Agent fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style SQL fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Vec fill:#fff3e0,stroke:#e65100,stroke-width:2px
```

</div> 
</div>
</div>

<div align="center" style="padding: 100px 20px;"> <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 15px;">Pronto para colaborar?</h3> <p style="margin-bottom: 30px; font-size: 1.1rem; opacity: 0.8;">O código é aberto e precisamos de contribuidores.</p> <a href="equipe" class="md-button md-button--primary md-button--large">Conheça a Equipe</a> </div> 