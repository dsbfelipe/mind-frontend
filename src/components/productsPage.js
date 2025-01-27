import { getProductImage, getProducts } from "../utils/requests";
import { displayAddProduct } from "./addProduct";
import { displayEditProduct } from "./editProduct";

function createProductsPage(currentUserData) {
  return `
    <div id="products-page">
      <header>
        <h3>Seja bem vindo, ${currentUserData.name.split(" ")[0]}</h3>
        <h1>Gerenciador de estoque</h1>
        <button id="add-product">Adicionar novo produto</button>
      </header>
      <main id="products">
        <h3>Clique nos produtos para editar</h3>
        <div class="line"></div>

      </main>
    </div>
  `;
}

export function displayProductsPage(parent, currentUserData) {
  parent.innerHTML = "";
  parent.innerHTML = createProductsPage(currentUserData);

  const productsContainer = document.getElementById("products");
  const addProductButton = document.getElementById("add-product");

  addProductButton.addEventListener("click", () => {
    displayAddProduct(parent, currentUserData);
  });

  displayProductsList(productsContainer, currentUserData);
}

async function displayProductsList(parent, currentUserData) {
  const products = await getProducts();

  console.log(products);

  products.forEach(async (product) => {
    const productImage = await getProductImage(product.name);
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.dataset.name = product.name;

    productElement.innerHTML = `
      <img
        class="product-image"
        src="${productImage}"
        alt=""
      />
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-description">
          ${product.description}
        </p>
        <p class="product-quantity">${product.amount}pcs</p>
      </div>
      <p class="product-value">R$${product.value}</p>
    `;

    // Adicionando event listener para capturar o clique no produto
    productElement.addEventListener("click", () => {
      const content = document.getElementById("content");
      const selectedProductName = productElement.dataset.name;
      console.log(`Produto selecionado: ${selectedProductName}`);
      let selectedProduct;
      selectedProduct = selectedProductName;
      displayEditProduct(content, selectedProduct, currentUserData);
    });

    parent.appendChild(productElement);
  });
}
