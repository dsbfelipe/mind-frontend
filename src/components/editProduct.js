import {
  getProduct,
  getProductImage,
  updateProduct,
  uploadProductPicture,
} from "../utils/requests";
import { displayProductsPage } from "./productsPage";

export async function displayEditProduct(parent, product, currentUserData) {
  const selectedProduct = await getProduct(product);
  const productPicture = await getProductImage(product);

  parent.innerHTML = "";
  parent.innerHTML = `
  <div id="edit-product">
      <h1>Editar produto</h1>
      <div class="line"></div>
      <div id="edit-picture">
        <img
          src="${productPicture}"
          alt=""
          id="product-picture"
        />
        <input type="file" class="file-input" id="edit-product-picture" />
      </div>
      <label for="edit-name">Nome do produto</label>
      <input type="text" id="edit-name" value="${selectedProduct.name}" />
      <label for="edit-name">Descrição do produto</label>
      <input type="text" id="edit-description" value="${selectedProduct.description}" />
      <label for="edit-name">Quantidade disponível</label>
      <input type="number" id="edit-quantity" value="${selectedProduct.amount}" />
      <label for="edit-name">Valor do produto</label>
      <input type="number" id="edit-value" value="${selectedProduct.value}" />
      <div class="line"></div>
      <button class="save-button">Salvar</button>
  </div>`;

  const productNameInput = document.getElementById("edit-name");
  const productDescriptionInput = document.getElementById("edit-description");
  const productAmountInput = document.getElementById("edit-quantity");
  const productValueInput = document.getElementById("edit-value");
  const productImageInput = document.getElementById("edit-product-picture");
  const saveButton = document.querySelector(".save-button");

  saveButton.addEventListener("click", async () => {
    if (productImageInput.files.length > 0) {
      await uploadProductPicture(product, productImageInput);
    }

    const productInfo = {
      name: productNameInput.value,
      description: productDescriptionInput.value,
      value: productValueInput.value,
      amount: productAmountInput.value,
    };

    await updateProduct(product, productInfo);
    displayProductsPage(parent, currentUserData);
  });
}
