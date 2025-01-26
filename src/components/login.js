import { displaySignupPage } from "./signup";

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

  const goToSignupButton = document.getElementById("go-signup-button");
  goToSignupButton.addEventListener("click", () => displaySignupPage(parent));
}
