import defaultPicture from "../../public/images/default-picture.png";
import { addProduct } from "../utils/requests";

export async function displayAddProduct(parent, product, currentUserData) {
  parent.innerHTML = "";
  parent.innerHTML = `
  <div id="edit-product">
<h1>Adicionar um novo produto</h1>
<div class="line"></div>

<label for="edit-name">Nome do produto</label>
<input
  type="text"
  id="edit-name"
  placeholder="Insira o nome do produto"
/>
<label for="edit-name">Descrição do produto</label>
<input
  type="text"
  id="edit-description"
  placeholder="Insira a descrição do produto"
/>
<label for="edit-name">Quantidade disponível</label>
<input
  type="number"
  id="edit-quantity"
  placeholder="Insira a quantidade disponível"
/>
<label for="edit-name">Valor do produto</label>
<input
  type="number"
  id="edit-value"
  placeholder="Insira o valor do produto"
/>
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
    const productInfo = {
      name: productNameInput.value,
      description: productDescriptionInput.value,
      value: Number(productValueInput.value),
      amount: parseInt(productAmountInput.value),
    };

    await addProduct(productInfo);
    displayProductsPage(parent, currentUserData);
  });
}
