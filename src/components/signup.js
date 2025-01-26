import { displayLoginPage } from "./login";

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
  goToLoginButton.addEventListener("click", () => displayLoginPage(parent));
}
