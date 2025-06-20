  // Tema claro/escuro
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  toggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    toggle.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';
  });

// ==== Lógica do carrinho ====

    const entrega = 5.00;

    function atualizarTotais() {
        const itens = document.querySelectorAll('.produto-item');
        let subtotal = 0;

        itens.forEach(item => {
            const precoUnitarioTexto = item.querySelector('.produto-preco small').textContent;
            const precoUnitario = parseFloat(precoUnitarioTexto.replace(/[^\d,]/g, '').replace(',', '.'));
            const quantidade = parseInt(item.querySelector('.produto-controle span').textContent);
            const totalItem = precoUnitario * quantidade;

            // Atualiza total do item
            item.querySelector('.produto-preco p strong').textContent = `Total: R$${totalItem.toFixed(2).replace('.', ',')}`;
            subtotal += totalItem;
        });

        // Atualiza resumo
        document.querySelector('.valores').innerHTML = `
            <p>Subtotal: <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span></p>
            <p>Entrega: <span>R$ ${entrega.toFixed(2).replace('.', ',')}</span></p>
            <p><strong>Total: <span>R$ ${(subtotal + entrega).toFixed(2).replace('.', ',')}</span></strong></p>
        `;
    }

    function adicionarEventos() {
        document.querySelectorAll('.produto-controle').forEach(controle => {
            const spanQtd = controle.querySelector('span');
            const btnMais = controle.querySelectorAll('button')[1];
            const btnMenos = controle.querySelectorAll('button')[0];

            btnMais.addEventListener('click', () => {
                spanQtd.textContent = parseInt(spanQtd.textContent) + 1;
                atualizarTotais();
            });

            btnMenos.addEventListener('click', () => {
                const novaQtd = parseInt(spanQtd.textContent) - 1;
                if (novaQtd >= 1) {
                    spanQtd.textContent = novaQtd;
                    atualizarTotais();
                }
            });
        });
    }

    atualizarTotais();
    adicionarEventos();

    // ==== Finalizar Pedido ====

    const form = document.querySelector('.resumo-pedido form');
    const botaoFinalizar = form.querySelector('button[type="submit"]');

    const mensagemSucesso = document.createElement('p');
    mensagemSucesso.textContent = 'Pedido Realizado';
    mensagemSucesso.style.color = 'green';
    mensagemSucesso.style.marginTop = '10px';
    mensagemSucesso.style.display = 'none'; // Escondida inicialmente
    form.appendChild(mensagemSucesso);

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita o envio real do formulário

        const rua = document.getElementById('rua').value.trim();
        const numero = document.getElementById('numero').value.trim();
        const bairro = document.getElementById('bairro').value.trim();
        const pagamentoSelecionado = form.querySelector('input[name="pagamento"]:checked');

        if (rua && numero && bairro && pagamentoSelecionado) {
            mensagemSucesso.style.display = 'block';
        } else {
            mensagemSucesso.style.display = 'none';
            alert('Por favor, preencha todos os campos e selecione uma forma de pagamento.');
        }
    });

// ==== Painel do Usuário ====

const usuarioCadastrado = JSON.parse(localStorage.getItem("usuarioCadastrado"));
const painel = document.createElement("div");
painel.classList.add("painel-usuario");
document.body.appendChild(painel);

// Função para montar o painel
function montarPainel() {
  painel.innerHTML = "";

  if (usuarioCadastrado) {
    painel.innerHTML = `
      <p><strong>Nome:</strong> ${usuarioCadastrado.nome}</p>
      <p><strong>Telefone:</strong> ${usuarioCadastrado.telefone}</p>
      <p><strong>Email:</strong> ${usuarioCadastrado.email}</p>
      <button id="btn-sair">Sair</button>
    `;

    document.getElementById("btn-sair").addEventListener("click", () => {
      localStorage.removeItem("usuarioCadastrado");
      alert("Você saiu da conta.");
      location.reload();
    });
  } else {
    painel.innerHTML = `
      <p><strong>Olá, visitante!</strong></p>
      <button id="btn-login">Login</button>
      <button id="btn-cadastro">Cadastrar</button>
    `;

    document.getElementById("btn-login").addEventListener("click", () => {
      window.location.href = "login.html";
    });

    document.getElementById("btn-cadastro").addEventListener("click", () => {
      window.location.href = "cadastro.html";
    });
  }
}

// Alternar visibilidade do painel ao clicar no ícone 👤
const iconeUsuario = document.getElementById("usuario");
iconeUsuario.id = "icone-usuario"; // adiciona id para facilitar
iconeUsuario.addEventListener("click", () => {
  painel.classList.toggle("mostrar");
});

montarPainel(); // monta ao carregar

//

let ultimoItemRemovido = null;
let posicaoItemRemovido = null;

// Cria botão de desfazer e insere no carrinho
const botaoDesfazer = document.createElement('button');
botaoDesfazer.textContent = 'Desfazer';
botaoDesfazer.style.backgroundColor = '#410d06';
botaoDesfazer.style.color = '#fff';
botaoDesfazer.style.border = 'none';
botaoDesfazer.style.padding = '10px 20px';
botaoDesfazer.style.marginTop = '15px';
botaoDesfazer.style.borderRadius = '10px';
botaoDesfazer.style.cursor = 'pointer';
botaoDesfazer.style.display = 'none';
document.querySelector('.carrinho-produtos').appendChild(botaoDesfazer);

// Função para aplicar eventos novamente ao restaurar
function reaplicarEventos(item) { 
  const btnRemover = item.querySelector('.produto-controle a');
  btnRemover.addEventListener('click', (e) => {
    e.preventDefault();
    ultimoItemRemovido = item;
    posicaoItemRemovido = Array.from(item.parentNode.children).indexOf(item);
    item.remove();
    atualizarTotais();
    botaoDesfazer.style.display = 'inline-block';
  });
}

// Ativa o botão remover para todos os itens
function ativarRemocao() {
  document.querySelectorAll('.produto-item').forEach(item => {
    reaplicarEventos(item); // já reaproveita a lógica
  });
}

// Botão Desfazer
botaoDesfazer.addEventListener('click', () => {
  if (ultimoItemRemovido) {
    const carrinho = document.querySelector('.carrinho-produtos');
    const itens = carrinho.querySelectorAll('.produto-item');

    // Inserir item de volta na mesma posição
    if (posicaoItemRemovido >= itens.length) {
      carrinho.insertBefore(ultimoItemRemovido, carrinho.lastElementChild);
    } else {
      carrinho.insertBefore(ultimoItemRemovido, itens[posicaoItemRemovido]);
    }

    reaplicarEventos(ultimoItemRemovido);
    atualizarTotais();
    ultimoItemRemovido = null;
    botaoDesfazer.style.display = 'none';
  }
});

ativarRemocao(); // ativar ao carregar
