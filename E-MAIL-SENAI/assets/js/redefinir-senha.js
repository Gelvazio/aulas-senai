/**
 * redefinir-senha.js — Tela alcançada pelo link enviado por e-mail.
 *
 * O Supabase devolve o token no FRAGMENTO da URL (#access_token=...&type=recovery).
 * Fragmento não é enviado ao servidor, então o token não aparece em log algum.
 * Aqui ele é lido, usado para gravar a nova senha e imediatamente descartado.
 */

import { Auth } from './api.js';
import { CONFIG } from './config.js';

const $ = (id) => document.getElementById(id);

let tokenRecuperacao = null;

// -----------------------------------------------------------------------------
// Leitura do token vindo no link
// -----------------------------------------------------------------------------

function lerParametrosDoLink() {
  // O token vem no hash; alguns fluxos de erro vêm na query string.
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const query = new URLSearchParams(window.location.search);

  return {
    accessToken: hash.get('access_token'),
    tipo: hash.get('type'),
    erro: hash.get('error') || query.get('error'),
    erroDescricao: hash.get('error_description') || query.get('error_description'),
  };
}

/** Apaga o token da barra de endereços para não ficar no histórico. */
function limparUrl() {
  history.replaceState(null, '', window.location.pathname);
}

async function identificarUsuario(accessToken) {
  const resposta = await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: CONFIG.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!resposta.ok) throw new Error('Token inválido ou expirado.');
  return resposta.json();
}

// -----------------------------------------------------------------------------
// Inicialização
// -----------------------------------------------------------------------------

(async function iniciar() {
  const { accessToken, tipo, erro, erroDescricao } = lerParametrosDoLink();
  limparUrl();

  if (erro) {
    mostrarLinkInvalido(erroDescricao || erro);
    return;
  }

  if (!accessToken) {
    mostrarLinkInvalido(
      'Abra esta página pelo link enviado ao seu e-mail — ela não funciona sozinha.'
    );
    return;
  }

  if (tipo && tipo !== 'recovery') {
    mostrarLinkInvalido('Este link não é de redefinição de senha.');
    return;
  }

  try {
    const usuario = await identificarUsuario(accessToken);
    tokenRecuperacao = accessToken;

    $('emailAlvo').textContent = usuario.email || '(conta identificada)';
    $('verificando').classList.add('oculto');
    $('formSenha').classList.remove('oculto');
    $('novaSenha').focus();
  } catch {
    mostrarLinkInvalido();
  }
})();

function mostrarLinkInvalido(mensagem) {
  $('verificando').classList.add('oculto');
  $('formSenha').classList.add('oculto');
  $('linkInvalido').classList.remove('oculto');
  if (mensagem) avisar(mensagem, 'erro');
}

// -----------------------------------------------------------------------------
// Gravação da nova senha
// -----------------------------------------------------------------------------

$('formSenha').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  esconderAviso();

  const senha = $('novaSenha').value;
  const confirmacao = $('novaSenha2').value;

  if (senha !== confirmacao) {
    avisar('As senhas não conferem.', 'erro');
    $('novaSenha2').focus();
    return;
  }

  if (senha.length < 6) {
    avisar('A senha deve ter no mínimo 6 caracteres.', 'erro');
    return;
  }

  const botao = $('btnSalvar');
  botao.disabled = true;
  botao.textContent = 'Salvando…';

  try {
    await Auth.definirNovaSenha({ accessToken: tokenRecuperacao, senha });

    // token queimado: não deve sobrar em memória
    tokenRecuperacao = null;

    $('formSenha').classList.add('oculto');
    avisar('Senha alterada. Redirecionando para o login…', 'ok');
    setTimeout(() => window.location.replace('index.html'), 2500);
  } catch (erro) {
    avisar(erro.message, 'erro');
    botao.disabled = false;
    botao.textContent = 'Salvar nova senha';
  }
});

// -----------------------------------------------------------------------------
// Avisos
// -----------------------------------------------------------------------------

function avisar(mensagem, tipo = 'info') {
  const aviso = $('aviso');
  aviso.textContent = mensagem;
  aviso.className = `aviso aviso--visivel aviso--${tipo}`;
}

function esconderAviso() {
  $('aviso').className = 'aviso';
}
