document.addEventListener('DOMContentLoaded', function () {
  // Tema claro/escuro
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  toggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    toggle.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';
  });

  // Painel do usuário
  const iconeUsuario = document.getElementById('usuario');
  const painel = document.getElementById('painel-usuario');

  iconeUsuario.addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioCadastrado'));
    painel.classList.toggle('mostrar');

    if (painel.classList.contains('mostrar')) {
      if (usuario) {
        painel.innerHTML = `
          <p><strong>Olá, ${usuario.nome}!</strong></p>
          <p>Tel.:  ${usuario.telefone}</p>
          <p>E-mail:  ${usuario.email}</p>
          <button id="logout-btn">Sair da conta</button>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => {
          localStorage.removeItem('usuarioCadastrado');
          alert('Você saiu da conta.');
          location.reload(); // recarrega a página
        });
      } else {
        painel.innerHTML = `
          <p><strong>Olá, visitante!</strong></p>
          <button onclick="window.location.href='login.html'">Fazer Login</button>
          <button onclick="window.location.href='cadastro.html'">Cadastrar</button>
        `;
      }
    }
  });
});
