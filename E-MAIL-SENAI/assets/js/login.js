/** login.js — Tela de acesso: entrar, criar conta e recuperar senha. */

import { Auth } from './api.js';

const $ = (id) => document.getElementById(id);

const abaEntrar = $('abaEntrar');
const abaCadastrar = $('abaCadastrar');
const formEntrar = $('formEntrar');
const formCadastrar = $('formCadastrar');
const aviso = $('aviso');

// Se já houver sessão válida, vai direto para o dashboard.
Auth.token().then((token) => {
  if (token) window.location.replace('dashboard.html');
});

// -----------------------------------------------------------------------------
// Alternância de abas
// -----------------------------------------------------------------------------

function trocarAba(destino) {
  const entrando = destino === 'entrar';
  abaEntrar.classList.toggle('auth__aba--ativa', entrando);
  abaCadastrar.classList.toggle('auth__aba--ativa', !entrando);
  formEntrar.classList.toggle('oculto', !entrando);
  formCadastrar.classList.toggle('oculto', entrando);
  esconderAviso();
}

abaEntrar.addEventListener('click', () => trocarAba('entrar'));
abaCadastrar.addEventListener('click', () => trocarAba('cadastrar'));

// -----------------------------------------------------------------------------
// Avisos
// -----------------------------------------------------------------------------

function mostrarAviso(mensagem, tipo = 'erro') {
  aviso.textContent = mensagem;
  aviso.className = `aviso aviso--visivel aviso--${tipo}`;
}

function esconderAviso() {
  aviso.className = 'aviso';
}

function ocupado(botao, estaOcupado, textoOriginal) {
  botao.disabled = estaOcupado;
  botao.textContent = estaOcupado ? 'Aguarde…' : textoOriginal;
}

// -----------------------------------------------------------------------------
// Entrar
// -----------------------------------------------------------------------------

formEntrar.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  esconderAviso();

  const botao = $('btnEntrar');
  ocupado(botao, true);

  try {
    await Auth.entrar({
      email: $('loginEmail').value,
      senha: $('loginSenha').value,
    });
    window.location.replace('dashboard.html');
  } catch (erro) {
    mostrarAviso(erro.message);
    ocupado(botao, false, 'Entrar');
  }
});

// -----------------------------------------------------------------------------
// Criar conta
// -----------------------------------------------------------------------------

formCadastrar.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  esconderAviso();

  const senha = $('cadSenha').value;
  const confirmacao = $('cadSenha2').value;

  if (senha !== confirmacao) {
    mostrarAviso('As senhas não conferem.');
    return;
  }

  const botao = $('btnCadastrar');
  ocupado(botao, true);

  try {
    const resultado = await Auth.cadastrar({
      nome: $('cadNome').value,
      email: $('cadEmail').value,
      senha,
    });

    if (resultado.access_token) {
      window.location.replace('dashboard.html');
      return;
    }

    mostrarAviso(
      'Conta criada. Verifique seu e-mail para confirmar o cadastro e depois faça login.',
      'ok'
    );
    formCadastrar.reset();
    ocupado(botao, false, 'Criar conta');
  } catch (erro) {
    mostrarAviso(erro.message);
    ocupado(botao, false, 'Criar conta');
  }
});

// -----------------------------------------------------------------------------
// Recuperar senha
// -----------------------------------------------------------------------------

$('btnEsqueci').addEventListener('click', async () => {
  const email = $('loginEmail').value.trim();

  if (!email) {
    mostrarAviso('Informe seu e-mail no campo acima para receber o link de recuperação.', 'info');
    $('loginEmail').focus();
    return;
  }

  const botao = $('btnEsqueci');
  botao.disabled = true;
  botao.textContent = 'Enviando…';

  try {
    await Auth.recuperarSenha(email);
    mostrarAviso(
      `Se ${email} estiver cadastrado, o link de redefinição chegará em instantes. ` +
        'Confira também a caixa de spam — o link vale por tempo limitado e só pode ser usado uma vez.',
      'ok'
    );
  } catch (erro) {
    mostrarAviso(erro.message);
  } finally {
    botao.disabled = false;
    botao.textContent = 'Esqueci minha senha';
  }
});
