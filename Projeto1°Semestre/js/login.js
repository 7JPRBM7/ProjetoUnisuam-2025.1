document.addEventListener("DOMContentLoaded", function () {
  const formularioLogin = document.querySelector(".formulario-login");

  formularioLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    if (
      usuarioSalvo &&
      emailDigitado === usuarioSalvo.email &&
      senhaDigitada === usuarioSalvo.senha
    ) {
      alert("Login realizado com sucesso! Bem-vindo, " + usuarioSalvo.nome + "!");

    
      setTimeout(function () {
        window.location.href = "home.html";
      }, 500);
    } else {
      alert("Email ou senha incorretos. Tente novamente.");
    }
  });
});
