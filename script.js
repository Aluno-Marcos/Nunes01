// ===============================
// DADOS
// ===============================

// Importa a lista de produtos do produto.js
const produtos = produtosData;

// ===============================
// ELEMENTOS DOM
// ===============================
const listaProdutos = document.getElementById('lista-produtos');
const formPesquisa = document.getElementById('form-pesquisa');
const campoPesquisa = document.getElementById('barra-pesquisa');
const sugestoesPesquisa = document.getElementById('sugestoes-pesquisa');
const mensagemStatus = document.getElementById('mensagem-status');

// ===============================
// FUNÇÕES UTILITÁRIAS
// ===============================
const normalizarTexto = texto =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

function criarElemento(tag, className, textContent = '') {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;
  return element;
}

// ===============================
// CACHE NORMALIZADO PARA BUSCA
// ===============================
const produtosNormalizados = produtos.map(produto => ({
  ...produto,
  nomeNormalizado: normalizarTexto(produto.nome),
  marcaNormalizada: normalizarTexto(produto.marca),
  categoriaNormalizada: normalizarTexto(produto.categoria || ''),
  idString: produto.id.toString()
}));

// ===============================
// CRIA ITEM DO CATÁLOGO
// ===============================
function criarItemProduto(produto) {
  const listItem = criarElemento('li', 'produto-item');
  listItem.id = `produto-${produto.id}`;
  listItem.setAttribute('aria-label', `Detalhes do produto ${produto.nome}`);

  const link = criarElemento('a', 'produto-link');
  link.href = `detalhes.html?id=${produto.id}`;

  const imagem = document.createElement('img');
  imagem.src = (produto.imagens && produto.imagens.length)
    ? produto.imagens[0]
    : produto.imagem;
  imagem.alt = `Imagem do ${produto.nome}`;
  imagem.loading = 'lazy';
  imagem.className = 'produto-imagem';

  const nome = criarElemento('h2', 'produto-nome', produto.nome);
  const preco = criarElemento('p', 'produto-preco', produto.preco);
  const marca = criarElemento('p', 'produto-marca', `Marca: ${produto.marca}`);

  link.append(imagem, nome, preco, marca);
  listItem.appendChild(link);

  return listItem;
}

// ===============================
// RENDERIZA PRODUTOS
// ===============================
function renderizarProdutos(lista) {
  listaProdutos.innerHTML = '';

  if (lista.length === 0) {
    mensagemStatus.style.display = 'block';
    listaProdutos.setAttribute('aria-busy', 'false');
    return;
  }

  mensagemStatus.style.display = 'none';

  const fragmento = document.createDocumentFragment();
  lista.forEach(produto => {
    fragmento.appendChild(criarItemProduto(produto));
  });

  listaProdutos.appendChild(fragmento);
  listaProdutos.setAttribute('aria-busy', 'false');
}

// ===============================
// FILTRO PRINCIPAL (CORRETO)
// ===============================
function filtrarProdutos(termo = '') {
  const termoNormalizado = normalizarTexto(termo);
  if (!termoNormalizado) return produtos;

  const idsEncontrados = new Set(
    produtosNormalizados
      .filter(p =>
        p.nomeNormalizado.includes(termoNormalizado) ||
        p.marcaNormalizada.includes(termoNormalizado) ||
        p.categoriaNormalizada.includes(termoNormalizado) ||
        p.idString.includes(termoNormalizado)
      )
      .map(p => p.id)
  );

  return produtos.filter(produto => idsEncontrados.has(produto.id));
}

// ===============================
// ATUALIZA SUGESTÕES
// ===============================
function atualizarSugestoes(termo = '') {
  sugestoesPesquisa.innerHTML = '';

  const termoNormalizado = termo.trim();
  if (termoNormalizado.length < 2) {
    sugestoesPesquisa.style.display = 'none';
    return;
  }

  const termoBusca = normalizarTexto(termoNormalizado);

  const resultados = produtosNormalizados
    .filter(p => p.nomeNormalizado.includes(termoBusca))
    .slice(0, 5);

  resultados.forEach(produto => {
    const itemSugestao = criarElemento(
      'div',
      'sugestao-item',
      produto.nome
    );

    itemSugestao.setAttribute('role', 'option');
    itemSugestao.tabIndex = 0;

    const selecionarProduto = () => {
      campoPesquisa.value = produto.nome;
      formPesquisa.requestSubmit();
    };

    itemSugestao.addEventListener('click', selecionarProduto);
    itemSugestao.addEventListener('keydown', e => {
      if (e.key === 'Enter') selecionarProduto();
    });

    sugestoesPesquisa.appendChild(itemSugestao);
  });

  sugestoesPesquisa.style.display =
    resultados.length > 0 ? 'block' : 'none';
}

// ===============================
// EVENTOS
// ===============================
formPesquisa.addEventListener('submit', event => {
  event.preventDefault();

  listaProdutos.setAttribute('aria-busy', 'true');
  sugestoesPesquisa.innerHTML = '';
  sugestoesPesquisa.style.display = 'none';

  const termo = campoPesquisa.value;
  const produtosFiltrados = filtrarProdutos(termo);

  renderizarProdutos(produtosFiltrados);
});

document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos(produtos);

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');

  if (q) {
    campoPesquisa.value = q;
    formPesquisa.requestSubmit();
  }
});

campoPesquisa.addEventListener('input', () => {
  atualizarSugestoes(campoPesquisa.value);
});

campoPesquisa.addEventListener('focus', () => {
  if (campoPesquisa.value.length >= 2) {
    atualizarSugestoes(campoPesquisa.value);
  }
});

campoPesquisa.addEventListener('blur', () => {
  setTimeout(() => {
    sugestoesPesquisa.style.display = 'none';
  }, 150);
});