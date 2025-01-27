import { displayLoginPage } from "./login";
import { displayProductsPage } from "./productsPage";
import { createUser } from "../utils/requests";
import { getUserData } from "../utils/requests";

function createSignupPage() {
  return `
      <div id="signup-page">
      <img
        id="logo"
        src="https://cdn-icons-png.flaticon.com/512/5166/5166970.png"
        alt=""
      />
      <h1>Registre-se</h1>
      <h2>Crie sua conta para acessar o estoque</h2>
      <div class="line"></div>
      <label for="name-signup">Nome</label>
      <input type="text" id="name-signup" placeholder="Insira seu nome" />
      <label for="email-signup">Endereço de e-mail</label>

      <input
        type="email"
        id="email-signup"
        placeholder="Insira seu endereço de e-mail"
      />
      <label for="password-signup">Senha</label>
      <input
        type="password"
        id="password-signup"
        placeholder="Insira sua senha"
      />
      <div class="line"></div>
      <button id="signup-button">Criar conta</button>
      <button id="go-login-button">
        Já tem uma conta? <span>Fazer login</span>
      </button>
    </div>
  `;
}

export function displaySignupPage(parent) {
  parent.innerHTML = "";
  parent.innerHTML = createSignupPage();

  const goToLoginButton = document.getElementById("go-login-button");
  const nameInput = document.getElementById("name-signup");
  const emailInput = document.getElementById("email-signup");
  const passwordInput = document.getElementById("password-signup");
  const signupButton = document.getElementById("signup-button");

  goToLoginButton.addEventListener("click", () => displayLoginPage(parent));

  signupButton.addEventListener("click", async () => {
    const newUserName = nameInput.value;
    const newUserEmail = emailInput.value;
    const newUserPassword = passwordInput.value;

    const newUserData = {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
    };

    signupButton.disabled = true;
    signupButton.textContent = "Aguarde...";

    try {
      await createUser(newUserData);

      const currentUserData = await getUserData(newUserEmail);
      localStorage.setItem("currentUser", JSON.stringify(currentUserData));
      displayProductsPage(parent, currentUserData);
    } catch (error) {
      console.error("Error during signup process:", error);
    } finally {
      signupButton.disabled = false;
      signupButton.textContent = "Criar Conta";
    }
  });
}
