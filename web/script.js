let carrinho = [];

fetch("http://localhost:3000/products")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("produtos");

    data.forEach(produto => {
      container.innerHTML += `
        <div class="produto">
          <h2>${produto.nome}</h2>
          <p>Preço: R$ ${produto.preco}</p>
          <button onclick="comprar(${produto.id})">
            Comprar
          </button>
        </div>
      `;
    });

  });

function comprar(id) {
  const existe = carrinho.find(item => item === id);

  if (!existe) {
    carrinho.push(id);
  }

  console.log("Carrinho:", carrinho);
  alert("Itens no carrinho: " + carrinho.length);
}