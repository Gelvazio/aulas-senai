/**
 * cadastro-aluno.js — Página pública de autocadastro.
 *
 * O aluno NÃO faz login. Usa a anon key apenas para chamar duas funções RPC:
 *   turma_do_link()        → rótulos da turma, para ele confirmar que é a dele
 *   registrar_email_aluno() → grava nome e e-mail
 *
 * A anon key não lê `email_contato`: quem abrir esta página não enxerga
 * nenhum dado dos colegas.
 */

import { CONFIG } from './config.js';

const $ = (id) => document.getElementById(id);

const token = new URLSearchParams(window.location.search).get('t');

// -----------------------------------------------------------------------------
// Chamada RPC anônima
// -----------------------------------------------------------------------------

async function rpc(funcao, parametros) {
  const resposta = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/rpc/${funcao}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: CONFIG.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(parametros),
  });

  if (!resposta.ok) throw new Error('Não foi possível falar com o servidor.');
  return resposta.json();
}

// -----------------------------------------------------------------------------
// Inicialização
// -----------------------------------------------------------------------------

(async function iniciar() {
  if (!token) return mostrarInvalido('Link incompleto. Peça o link correto ao professor.');

  try {
    const turma = await rpc('turma_do_link', { p_token: token });

    if (!turma?.ok) return mostrarInvalido(turma?.mensagem);

    $('turmaBox').innerHTML = `
      Você está se cadastrando em:<br />
      <strong>${escapar(turma.unidade_curricular)}</strong><br />
      ${escapar(turma.unidade)} — ${escapar(turma.turma)} (${escapar(turma.turno)})`;

    $('carregando').classList.add('oculto');
    $('formCadastro').classList.remove('oculto');
    $('nome').focus();
  } catch (erro) {
    mostrarInvalido(erro.message);
  }
})();

// -----------------------------------------------------------------------------
// Envio
// -----------------------------------------------------------------------------

$('formCadastro').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  esconderAviso();

  const botao = $('btnEnviar');
  botao.disabled = true;
  botao.textContent = 'Enviando…';

  try {
    const retorno = await rpc('registrar_email_aluno', {
      p_token: token,
      p_nome: $('nome').value,
      p_email: $('email').value,
    });

    if (!retorno?.ok) {
      avisar(retorno?.mensagem || 'Não foi possível cadastrar.', 'erro');
      return;
    }

    $('msgSucesso').textContent =
      `${$('nome').value.trim().split(/\s+/)[0]}, seu e-mail foi registrado na turma.`;
    $('formCadastro').classList.add('oculto');
    $('sucesso').classList.remove('oculto');
  } catch (erro) {
    avisar(erro.message, 'erro');
  } finally {
    botao.disabled = false;
    botao.textContent = 'Cadastrar meu e-mail';
  }
});

// Permite usar o mesmo aparelho para o próximo aluno da fila
$('btnOutro').addEventListener('click', () => {
  $('formCadastro').reset();
  $('sucesso').classList.add('oculto');
  $('formCadastro').classList.remove('oculto');
  esconderAviso();
  $('nome').focus();
});

// -----------------------------------------------------------------------------
// Estados e utilitários
// -----------------------------------------------------------------------------

function mostrarInvalido(mensagem) {
  $('carregando').classList.add('oculto');
  $('formCadastro').classList.add('oculto');
  $('invalido').classList.remove('oculto');
  if (mensagem) $('msgInvalido').textContent = mensagem;
}

function avisar(mensagem, tipo = 'info') {
  const aviso = $('aviso');
  aviso.textContent = mensagem;
  aviso.className = `aviso aviso--visivel aviso--${tipo}`;
}

function esconderAviso() {
  $('aviso').className = 'aviso';
}

function escapar(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}
