import { displaySignupPage } from "./signup";
import { login } from "../utils/requests";
import { displayProductsPage } from "./productsPage";
import { getUserData } from "../utils/requests";

function createLoginPage() {
  return `
      <div id="login-page">
      <img
        id="logo"
        src="https://cdn-icons-png.flaticon.com/512/5166/5166970.png"
        alt=""
      />
      <h1>Seja bem-vindo de volta</h1>
      <h2>Faça login para acessar o estoque</h2>
      <div class="line"></div>
      <label for="email-login">Endereço de e-mail</label>
      <input
        type="email"
        id="email-login"
        placeholder="Insira seu endereço de e-mail"
      />
      <label for="password-login">Senha</label>
      <input
        type="password"
        id="password-login"
        placeholder="Insira sua senha"
      />
      <div class="line"></div>
      <button id="login-button">Entrar</button>
      <button id="go-signup-button">
        Não tem uma conta? <span>Criar conta</span>
      </button>
    </div>
  `;
}

export function displayLoginPage(parent) {
  parent.innerHTML = "";
  parent.innerHTML = createLoginPage();

  // Limpar o token sempre que a tela de login for carregada
  localStorage.removeItem("authToken");

  const goToSignupButton = document.getElementById("go-signup-button");
  const loginButton = document.getElementById("login-button");
  const emailInput = document.getElementById("email-login");
  const passwordInput = document.getElementById("password-login");

  goToSignupButton.addEventListener("click", () => displaySignupPage(parent));

  loginButton.addEventListener("click", async () => {
    if (emailInput.value === "") {
      return;
    }
    if (passwordInput.value === "") {
      return;
    }

    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;

    const userObject = {
      email: userEmail,
      password: userPassword,
    };

    loginButton.disabled = true;
    loginButton.textContent = "Aguarde...";

    try {
      const response = await login(userObject);
      const token = response?.token;

      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token saved to localStorage:", token);
        const currentUserData = await getUserData(emailInput.value);
        displayProductsPage(parent, currentUserData);
      } else {
        console.error("Token not found in login response");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      loginButton.textContent = "Login";
      loginButton.disabled = false;
    }
  });
}
