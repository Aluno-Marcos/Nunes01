/* =====================================
   VARIÁVEIS E RESET
===================================== */
:root {
  --primaria: #007bff;
  --secundaria: #6c757d;
  --sucesso: #25d366;
  --destaque: #dc3545;

  --fundo: #ffffff;
  --card: #ffffff;
  --borda: #dee2e6;

  --texto: #343a40;
  --texto-claro: #ffffff;

  --sm: 0.5rem;
  --md: 1rem;
  --lg: 2rem;

  --fonte: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--fonte);
  background: var(--fundo);
  color: var(--texto);
  line-height: 1.6;
  padding-bottom: 90px; /* espaço para footer fixo */
}

a {
  text-decoration: none;
  color: var(--primaria);
}

/* Acessibilidade */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

:focus-visible {
  outline: 2px solid var(--primaria);
  outline-offset: 2px;
}

/* =====================================
   HEADER
===================================== */
.cabecalho {
  padding: var(--lg) var(--md);
  border-bottom: 1px solid var(--borda);
  text-align: center;
}

.logo-link h1 {
  font-size: 2rem;
}

.slogan {
  font-size: 0.9rem;
  color: var(--secundaria);
  margin-top: 0.3rem;
}

/* =====================================
   BARRA DE PESQUISA
===================================== */
.barra-pesquisa {
  display: flex;
  gap: var(--sm);
  max-width: 600px;
  margin: var(--md) auto;
  position: relative;
}

.campo-pesquisa {
  flex: 1;
  padding: var(--sm);
  border: 1px solid var(--borda);
  border-radius: 4px;
}

.botao-pesquisa {
  background: var(--primaria);
  color: var(--texto-claro);
  border: none;
  padding: var(--sm) var(--md);
  border-radius: 4px;
  cursor: pointer;
}

/* =====================================
   NAVEGAÇÃO
===================================== */
.nav-principal {
  border-bottom: 1px solid var(--borda);
  padding: var(--sm);
}

.nav-list {
  display: flex;
  justify-content: center;
  gap: var(--sm);
  list-style: none;
}

.nav-btn {
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
}

.nav-btn:hover,
.nav-btn[aria-current="page"] {
  background: var(--primaria);
  color: var(--texto-claro);
}

/* =====================================
   MAIN
===================================== */
main {
  max-width: 1200px;
  margin: auto;
  padding: var(--lg) var(--md);
  min-height: calc(100vh - 220px);
}

/* =====================================
   DETALHES DO PRODUTO
===================================== */

.detalhes-produto-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--lg);
  align-items: start;
}

/* Mídia */
.produto-midia {
  border: 1px solid var(--borda);
  border-radius: 8px;
  padding: var(--md);
  text-align: center;
}

#imagem-produto {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Thumbnails */
.thumbnails {
  margin-top: var(--sm);
  display: flex;
  justify-content: center;
  gap: 8px;
}

.thumbnails img {
  width: 60px;
  height: 45px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}

.thumbnails img.active {
  border-color: var(--primaria);
}




/* =================================================
   CATÁLOGO DE PRODUTOS (200x350)
================================================= */
.catalogo {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    justify-content: center;
    gap: 20px;
    list-style: none;
}

.produto-item {
    background: var(--branco);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--sombra);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 350px;
    display: flex;
    flex-direction: column;
}

.produto-item:hover {
    transform: translateY(-6px);
}

.produto-link {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.produto-imagem {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: #eee;
}

.produto-nome {
    font-size: 1rem;
    padding: 10px;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.produto-preco {
    font-size: 1.2rem;
    color: var(--azul-fb);
    font-weight: bold;
    padding: 0 10px 10px;
}

/* =====================================
   INFORMAÇÕES DO PRODUTO
===================================== */
.produto-info h1 {
  font-size: 2.4rem;
  margin-bottom: var(--sm);
}

.preco-destaque {
  font-size: 2rem;
  font-weight: bold;
  color: var(--destaque);
  margin-bottom: var(--md);
}

.descricao-longa {
  margin-bottom: var(--md);
}

/* Pagamento */
.pagamento-container {
  background: #f8f9fa;
  border-left: 4px solid var(--sucesso);
  padding: var(--md);
  margin-bottom: var(--md);
}

.forma-pagamento {
  color: var(--primaria);
  text-align: center;
  font-weight: 600;
}

/* =====================================
   ESPECIFICAÇÕES
===================================== */
#titulo-especificacoes {
  font-size: 1.4rem;
  margin-bottom: var(--sm);
}

#lista-especificacoes {
  list-style: none;
}

#lista-especificacoes li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

#lista-especificacoes li::before {
  content: "•";
  color: var(--primaria);
  margin-right: 0.5rem;
}

/* =====================================
   AÇÕES
===================================== */
.produto-acoes {
  display: flex;
  gap: var(--md);
  margin-top: var(--lg);
  flex-wrap: wrap;
}

.botao-whatsapp {
  background: var(--sucesso);
  color: #fff;
  padding: var(--sm) var(--md);
  border-radius: 4px;
  text-align: center;
  flex: 1;
}

.botao-compartilhar {
  background: var(--secundaria);
  color: #fff;
  border: none;
  padding: var(--sm) var(--md);
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
}

.produto-acoes a:hover,
.produto-acoes button:hover {
  opacity: 0.9;
}

/* =====================================
   NAV SECUNDÁRIA
===================================== */
.nav-secundaria {
  margin-top: var(--lg);
}

.link-voltar {
  font-weight: bold;
}

/* =====================================
   FOOTER
===================================== */
footer {
  background: var(--texto);
  color: #fff;
  text-align: center;
  padding: var(--md);
  position: fixed;
  bottom: 0;
  width: 100%;
}

/* =====================================
   RESPONSIVO
===================================== */
@media (max-width: 768px) {
  .detalhes-produto-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .barra-pesquisa {
    flex-direction: column;
  }

  .produto-info h1 {
    font-size: 1.8rem;
  }
}
/* =================================================
   RESPONSIVO (ATÉ 768px)
================================================= */
@media (max-width: 768px) {

    .cabecalho {
        padding: 1rem;
    }

    .slogan {
        display: none;
    }

    .nav-toggle {
        display: block;
    }

    .header-right {
        width: 100%;
    }

    .barra-pesquisa {
        width: 100%;
        margin-top: 10px;
    }

    .nav-list {
        display: none;
        flex-direction: column;
        background: var(--azul-escuro);
        width: 100%;
        padding: 0;
        gap: 0;
    }

    .nav-list.open {
        display: flex;
    }

    .nav-list li {
        width: 100%;
        text-align: center;
    }

    .nav-btn {
        display: block;
        padding: 15px;
        border-radius: 0;
        border-bottom: 1px solid rgba(255,255,255,0.15);
    }

    .catalogo {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .produto-item {
        height: auto;
    }

    .produto-imagem {
        height: 150px;
    }
}