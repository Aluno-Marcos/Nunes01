// script-detalhe.js

// 1. Configuração Global
const TELEFONE_LOJA = "5561982756071"; // Número fixo da FB Móveis

/**
 * Obtém o ID do produto da URL (?id=2001)
 */
function obterIdProdutoDaUrl() {
    const params = new URLSearchParams(window.location.search);
    const idString = params.get('id');
    if (!idString) return null;
    const idNumero = parseInt(idString, 10);
    return (isNaN(idNumero) || idNumero <= 0) ? null : idNumero;
}

/**
 * Renderiza os detalhes do produto na página
 */
function renderizarDetalhes(produto) {
    // Mapeamento de Elementos
    const nomeEl = document.getElementById('nome-produto');
    const precoEl = document.getElementById('preco-produto');
    const descEl = document.getElementById('descricao-produto');
    const specsListaEl = document.getElementById('lista-especificacoes');
    const imgPrincipalEl = document.getElementById('imagem-produto');
    const linkWhatsEl = document.getElementById('whatsapp-link');
    const btnShare = document.getElementById('compartilhar-btn');
    const thumbsContainer = document.getElementById('thumbnails');

    // 1. Textos Básicos
    document.title = `${produto.nome} | FB Móveis`;
    nomeEl.textContent = produto.nome;
    precoEl.textContent = produto.preco;
    descEl.textContent = produto.descricao;

    // 2. Galeria de Imagens
    const imagens = Array.isArray(produto.imagens) ? produto.imagens : [produto.imagem];
    
    function mudarImagem(index) {
        imgPrincipalEl.src = imagens[index];
        imgPrincipalEl.alt = `Imagem de ${produto.nome}`;
        // Atualiza classe ativa nas miniaturas
        const todasThumbs = thumbsContainer.querySelectorAll('img');
        todasThumbs.forEach((img, i) => img.classList.toggle('active', i === index));
    }

    thumbsContainer.innerHTML = '';
    imagens.forEach((url, i) => {
        const thumb = document.createElement('img');
        thumb.src = url;
        thumb.alt = `Miniatura ${i + 1}`;
        thumb.addEventListener('click', () => mudarImagem(i));
        thumbsContainer.appendChild(thumb);
    });

    mudarImagem(0); // Inicia com a primeira foto

    // 3. Especificações Técnicas
    specsListaEl.innerHTML = '';
    // Adiciona a Marca (que está fora do array de specs no JSON)
    const liMarca = document.createElement('li');
    liMarca.innerHTML = `<strong>Marca:</strong> ${produto.marca}`;
    specsListaEl.appendChild(liMarca);

    // Adiciona o restante das especificações do array
    if (produto.especificacoes) {
        produto.especificacoes.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            specsListaEl.appendChild(li);
        });
    }

    // 4. Link do WhatsApp (Usando a constante global)
    const msg = encodeURIComponent(`Olá! Vi o ${produto.nome} (ID: ${produto.id}) no site e gostaria de mais informações.`);
    linkWhatsEl.href = `https://wa.me/${TELEFONE_LOJA}?text=${msg}`;

    // 5. Botão Compartilhar
    if (navigator.share) {
        btnShare.addEventListener('click', () => {
            navigator.share({
                title: produto.nome,
                text: `Olha esse móvel na FB Móveis: ${produto.nome}`,
                url: window.location.href
            });
        });
    } else {
        btnShare.style.display = 'none';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const id = obterIdProdutoDaUrl();
    // produtosData vem do seu arquivo produto.js
    const produto = produtosData.find(p => p.id === id);

    if (produto) {
        renderizarDetalhes(produto);
    } else {
        document.getElementById('detalhes-produto-container').innerHTML = 
            '<h2>Produto não encontrado</h2><p>Verifique o link ou retorne à página inicial.</p>';
    }
});