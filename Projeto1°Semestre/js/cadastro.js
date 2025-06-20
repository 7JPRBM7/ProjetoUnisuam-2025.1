document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector(".formulario-cadastro");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Pega os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Cria um objeto com os dados do usuário
    const usuario = {
      nome: nome,
      telefone: telefone,
      email: email,
      senha: senha,
    };

    // Salva no localStorage
    localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));

    // Mostra mensagem de sucesso
    alert("Cadastro realizado com sucesso!");

    setTimeout(function () {
      window.location.href = "login.html";
    }, 500); // 1000 milissegundos = 1 segundos
  });
});
