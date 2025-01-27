function createProductsPage() {
  return `
        <div id="products-page">
      <header>
        <h3>Seja bem vindo, Fulano</h3>
        <h1>Gerenciador de estoque</h1>
        <button id="add-product">Adicionar novo produto</button>
      </header>
      <main id="products">
        <h3>Clique nos produtos para editar</h3>
        <div class="line"></div>
        <div class="product">
          <img
            class="product-image"
            src="https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/vvgznbnu/33381.jpg"
            alt=""
          />
          <div class="product-info">
            <p class="product-name">Fone de ouvido</p>
            <p class="product-description">
              Fone de ouvido muito bom para ouvir música
            </p>
            <p class="product-quantity">5pcs</p>
          </div>
          <p class="product-value">R$50,00</p>
        </div>
      </main>
    </div>
  `;
}

export function displayProductsPage(parent) {
  parent.innerHTML = "";
  parent.innerHTML = createProductsPage();
}
