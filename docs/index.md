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

/* ---------- CARROSSEL CSS-ONLY ---------- */

/* =============================================
   CARROSSEL CORRIGIDO (LÓGICA MATEMÁTICA PURA)
   ============================================= 
*/

.carousel-wrapper {
  /* Tamanho máximo do carrossel na tela */
  max-width: 900px;
  width: 100%;
  margin: 40px auto;
  position: relative;
  
  /* Define a proporção da caixa (16:10) para evitar pulos de layout */
  aspect-ratio: 16 / 10;
  background: #f1f3f4; /* Fundo cinza claro enquanto carrega */
  border-radius: 12px;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2);
}

/* Esconde os inputs de controle */
.carousel-wrapper input {
  display: none;
}

.carousel-viewport {
  width: 100%;
  height: 100%;
  overflow: hidden; /* O SEGREDO: Corta tudo que sai da caixa */
  border-radius: 12px;
  position: relative;
}

.slides-track {
  display: flex;
  height: 100%;
  /* Largura = 100% * número de imagens. Temos 2 imagens, então 200% */
  width: 200%; 
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1); /* Animação suave */
}

.slide {
  /* Largura relativa ao TRILHO. Se o trilho é 200%, cada slide é 50% dele */
  width: 50%;
  height: 100%;
  position: relative;
  
  /* Centralização Flexbox para a imagem */
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide img {
  /* Garante que a imagem caiba NA CAIXA sem distorcer */
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain; /* O SEGREDO 2: Ajusta a imagem dentro do espaço disponível */
  display: block;
}

/* LÓGICA DE MOVIMENTO 
   Slide 1: Move 0%
   Slide 2: Move -50% (Metade do trilho de 200%, ou seja, 1 tela inteira)
*/
#slide1:checked ~ .carousel-viewport .slides-track {
  transform: translateX(0%);
}

#slide2:checked ~ .carousel-viewport .slides-track {
  transform: translateX(-50%);
}

/* CONTROLES (SETAS) */
.carousel-controls label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(0,0,0,0.3);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  user-select: none;
  z-index: 10;
  transition: background 0.3s;
}

.carousel-controls label:hover {
  background: rgba(0,0,0,0.6);
}

/* Posicionamento das setas */
.prev-btn { left: 15px; }
.next-btn { right: 15px; }

/* Lógica de visibilidade das setas */
/* Se slide 1 checked -> esconde seta esquerda, mostra direita apontando p/ slide 2 */
#slide1:checked ~ .carousel-controls .prev-btn { display: none; }
#slide1:checked ~ .carousel-controls .next-btn { display: flex; }

/* Se slide 2 checked -> mostra seta esquerda apontando p/ slide 1, esconde direita */
#slide2:checked ~ .carousel-controls .prev-btn { display: flex; }
#slide2:checked ~ .carousel-controls .next-btn { display: none; }


/* NAVEGAÇÃO (BOLINHAS) */
.carousel-nav {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.nav-dot {
  width: 10px;
  height: 10px;
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
  border: 1px solid white;
}

#slide1:checked ~ .carousel-nav label:nth-of-type(1),
#slide2:checked ~ .carousel-nav label:nth-of-type(2) {
  background: #333;
  transform: scale(1.2);
}

/* ===========================================================
   LÓGICA PARA CARROSSEL DE 3 SLIDES (SCHEMA RAGFLOW)
   =========================================================== */

/* 1. Ajusta a largura da pista para caber 3 imagens (300%) */
#schema-slide1 ~ .carousel-viewport .slides-track,
#schema-slide2 ~ .carousel-viewport .slides-track,
#schema-slide3 ~ .carousel-viewport .slides-track {
    width: 300%;
}

/* 2. Ajusta a largura de cada slide individual (100% / 3 = 33.33%) */
#schema-slide1 ~ .carousel-viewport .slides-track .slide,
#schema-slide2 ~ .carousel-viewport .slides-track .slide,
#schema-slide3 ~ .carousel-viewport .slides-track .slide {
    width: 33.333333%;
}

/* 3. Lógica de Movimento (Translação) */
#schema-slide1:checked ~ .carousel-viewport .slides-track { transform: translateX(0%); }
#schema-slide2:checked ~ .carousel-viewport .slides-track { transform: translateX(-33.333333%); }
#schema-slide3:checked ~ .carousel-viewport .slides-track { transform: translateX(-66.666666%); }

/* 4. Controle de Setas (Quem aparece e quem some) */

/* Slide 1 Ativo: Esquerda vai p/ 3, Direita vai p/ 2 */
#schema-slide1:checked ~ .carousel-controls label[for="schema-slide3"].prev-btn { display: flex; }
#schema-slide1:checked ~ .carousel-controls label[for="schema-slide2"].next-btn { display: flex; }

/* Slide 2 Ativo: Esquerda vai p/ 1, Direita vai p/ 3 */
#schema-slide2:checked ~ .carousel-controls label[for="schema-slide1"].prev-btn { display: flex; }
#schema-slide2:checked ~ .carousel-controls label[for="schema-slide3"].next-btn { display: flex; }

/* Slide 3 Ativo: Esquerda vai p/ 2, Direita vai p/ 1 (Loop) */
#schema-slide3:checked ~ .carousel-controls label[for="schema-slide2"].prev-btn { display: flex; }
#schema-slide3:checked ~ .carousel-controls label[for="schema-slide1"].next-btn { display: flex; }

/* Esconde as setas que não estão sendo usadas no momento */
.carousel-controls label { display: none; }

/* 5. Bolinhas de Navegação Ativas */
#schema-slide1:checked ~ .carousel-nav label:nth-of-type(1),
#schema-slide2:checked ~ .carousel-nav label:nth-of-type(2),
#schema-slide3:checked ~ .carousel-nav label:nth-of-type(3) {
  background: #333; transform: scale(1.2);
}



</style>





<div class="hero-wrapper">

<h1 class="hero-title">A Verdade, Verificada por IA.</h1>

<p class="hero-subtitle">
    O <strong>Eh Fake</strong> combina o poder dos LLMs com a precisão da busca vetorial (RAG) para desmascarar desinformação em segundos. Open Source, rápido e confiável.
</p>

<div class="cta-group">
    <a href="documentacao/comece_aqui" class="md-button md-button--primary md-button--large">
        Começar Agora ⚡
    </a>
    <a href="https://github.com/unb-mds/2025-2-Eh_Fake" class="md-button md-button--secondary md-button--large">
        Ver no GitHub
    </a>
</div>


<div class="carousel-wrapper">
    
    <input type="radio" name="slider" id="slide1" checked>
    <input type="radio" name="slider" id="slide2">

    <div class="carousel-viewport">
        <div class="slides-track">
            
            <div class="slide">
                <img src="assets/imagens/Eh fake - Tema Claro.png" alt="Tema Claro">
            </div>

            <div class="slide">
                <img src="assets/imagens/Eh fake - Tema Escuro.png" alt="Tema Escuro">
            </div>

        </div>
    </div>

    <div class="carousel-controls">
        <label for="slide1" class="prev-btn">❮</label>
        <label for="slide2" class="next-btn">❯</label>
    </div>

    <div class="carousel-nav">
        <label for="slide1" class="nav-dot"></label>
        <label for="slide2" class="nav-dot"></label>
    </div>

</div>



</div>


<div align="center" style="background: white; padding: 50px 0; border-bottom: 1px solid #eee;">
    <p style="opacity: 0.5; font-size: 0.8rem; letter-spacing: 1.5px; font-weight: bold; margin-bottom: 25px; text-transform: uppercase;">Desenvolvido com Tecnologias Modernas</p>
    
    <div style="display: flex; gap: 40px; justify-content: center; opacity: 0.7; flex-wrap: wrap;">
        <img src="https://cdn.simpleicons.org/react" title="React" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/nextdotjs" title="Next.js" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/python" title="Python" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/postgresql" title="PostgreSQL" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/docker" title="Docker" width="40" height="40" />
        
        <img src="https://cdn.simpleicons.org/googlegemini" title="Google Gemini" width="40" height="40" />
    </div>
</div>


<div class="section-container" markdown="1">
<div class="section-center-text" markdown="1">
<h2 class="section-title">Por que o Eh Fake é diferente?</h2>
<p>Tecnologia projetada para transparência e precisão.</p>
</div>

<div class="grid cards" markdown="1">

-   :material-brain: **RAG Avançado (RagFlow)**
    ---
    Utilizamos *Retrieval-Augmented Generation* para cruzar a notícia suspeita com uma base de conhecimento confiável antes de gerar o veredito, reduzindo alucinações.

-   :material-web: **Busca Híbrida na Web**
    ---
    Além da base interna, nossa IA realiza pesquisas em tempo real na internet (Web Search) para validar fatos muito recentes que ainda não foram catalogados.

-   :material-database-search: **Coleta Controlada**
    ---
    Nosso **Minerador** varre fontes oficiais e jornalísticas de forma automatizada quando acionado, garantindo que o banco de dados receba apenas dados relevantes e curados.

-   :material-text-box-check: **Análise Fundamentada**
    ---
    O veredito não é um palpite. A IA realiza uma verificação lógica complexa nos bastidores, cruzando evidências para garantir que a classificação (Real/Fake) seja tecnicamente precisa.

-   :material-palette-swatch: **UX Moderna & Acessível**
    ---
    Interface desenvolvida em Next.js com suporte nativo a Tema Escuro/Claro e paginação otimizada, garantindo acessibilidade e conforto visual.

-   :material-docker: **Arquitetura Modular**
    ---
    Sistema conteinerizado e desacoplado. O Front-end, o Banco de Dados e o Motor de IA operam de forma independente, facilitando escalabilidade e manutenção.

</div>
</div>







<div style="background-color: #f8f9fa; border-top: 1px solid #eee; border-bottom: 1px solid #eee;" markdown="1">
<div class="section-container" markdown="1">

<div class="section-center-text">
<h2 class="section-title">Como Funciona</h2>
<p>Nossa arquitetura combina mineração de dados contínua com a capacidade analítica de LLMs.</p>
</div>

<div class="grid cards" markdown="1">

-   :material-spider-web: **1. Coleta e Indexação**
    ---
    Nosso **Minerador** extrai notícias de portais confiáveis de forma massiva. O **RagFlow** processa esses textos, transformando-os em vetores matemáticos para nosso banco de dados.

-   :material-magnify-scan: **2. Recuperação de Contexto (RAG)**
    ---
    Quando você envia uma notícia, o sistema busca fatos semelhantes na nossa base vetorial e realiza uma **Web Search** em tempo real para cobrir eventos de última hora.

-   :material-robot-happy: **3. Análise e Veredito**
    ---
    O **Google Gemini** recebe sua notícia + o contexto recuperado (fatos reais). Ele analisa as contradições internamente e gera um veredito validado pelas fontes encontradas.

</div>

<div class="carousel-wrapper">
<input type="radio" name="schema-slider" id="schema-slide1" checked>
<input type="radio" name="schema-slider" id="schema-slide2">
<input type="radio" name="schema-slider" id="schema-slide3">
<div class="carousel-viewport">
<div class="slides-track">
<div class="slide">
<img src="assets/imagens/schema ragflow.jpeg" alt="Arquitetura do RagFlow">
</div>
<div class="slide">
<img src="assets/imagens/Agente.jpeg" alt="Agente">
</div>
<div class="slide">
<img src="assets/imagens/Bases de dado.jpeg" alt="Bases de Dado">
</div>
</div>
</div>
<div class="carousel-controls">
<label for="schema-slide3" class="prev-btn">❮</label>
<label for="schema-slide1" class="prev-btn">❮</label>
<label for="schema-slide2" class="prev-btn">❮</label>
<label for="schema-slide2" class="next-btn">❯</label>
<label for="schema-slide3" class="next-btn">❯</label>
<label for="schema-slide1" class="next-btn">❯</label>
</div>
<div class="carousel-nav">
<label for="schema-slide1" class="nav-dot"></label>
<label for="schema-slide2" class="nav-dot"></label>
<label for="schema-slide3" class="nav-dot"></label>
</div>
</div>

</div>
</div>

<div align="center" style="padding: 100px 20px;"> <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 15px;">Pronto para colaborar?</h3> <p style="margin-bottom: 30px; font-size: 1.1rem; opacity: 0.8;">O código é aberto e precisamos de contribuidores.</p> <a href="equipe" class="md-button md-button--primary md-button--large">Conheça a Equipe</a> </div> 