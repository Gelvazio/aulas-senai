/** links-turmas.js — Administra os links de autocadastro e projeta o QR Code. */

import { Db, exigirLogin } from './api.js';

const $ = (id) => document.getElementById(id);

const TABELA = 'email_turma_link';

let links = [];

(async function iniciar() {
  if (!(await exigirLogin())) return;
  await carregar();
  registrarEventos();
})();

// -----------------------------------------------------------------------------
// Dados
// -----------------------------------------------------------------------------

async function carregar() {
  const corpo = $('corpoTabela');
  corpo.innerHTML = '<tr><td colspan="6" class="carregando">Carregando…</td></tr>';

  try {
    links = (await Db.selecionar(TABELA, '?select=*&order=unidade_curricular')) || [];
    renderizar();
  } catch (erro) {
    if (erro.naoAutenticado) return window.location.replace('index.html');
    corpo.innerHTML = `<tr><td colspan="6" class="tabela__vazio">Erro: ${escapar(erro.message)}</td></tr>`;
  }
}

/** URL pública do cadastro, derivada da localização atual. */
function urlDoLink(token) {
  return new URL(`cadastro-aluno.html?t=${token}`, window.location.href).href;
}

function renderizar() {
  const corpo = $('corpoTabela');

  if (!links.length) {
    corpo.innerHTML =
      '<tr><td colspan="6" class="tabela__vazio">Nenhum link cadastrado.</td></tr>';
    return;
  }

  corpo.innerHTML = links
    .map((l) => {
      const url = urlDoLink(l.token);
      const lotado = l.total_cadastros >= l.limite;
      const situacao = !l.ativo
        ? '<span class="badge badge--erro">Desativado</span>'
        : lotado
          ? '<span class="badge badge--pendente">Limite atingido</span>'
          : '<span class="badge badge--ok">Ativo</span>';

      return `
        <tr>
          <td>${escapar(l.unidade_curricular || '—')}</td>
          <td>${escapar(l.turma || '—')}<br /><small>${escapar(l.unidade_descricao || '')} · ${escapar(l.turno || '')}</small></td>
          <td><span class="link-url">${escapar(url)}</span></td>
          <td>${l.total_cadastros} / ${l.limite}</td>
          <td>${situacao}</td>
          <td>
            <div class="tabela__acoes">
              <button class="btn btn--pequeno" data-qr="${l.token}">Projetar</button>
              <button class="btn btn--secundario btn--pequeno" data-copiar="${l.token}">Copiar</button>
              <button class="btn ${l.ativo ? 'btn--perigo' : 'btn--verde'} btn--pequeno"
                      data-alternar="${l.token}">${l.ativo ? 'Desativar' : 'Reativar'}</button>
            </div>
          </td>
        </tr>`;
    })
    .join('');
}

// -----------------------------------------------------------------------------
// Ações
// -----------------------------------------------------------------------------

async function alternarAtivo(token) {
  const link = links.find((l) => l.token === token);
  if (!link) return;

  try {
    await Db.atualizar(TABELA, `token=eq.${token}`, { ativo: !link.ativo });
    await carregar();
    avisar(link.ativo ? 'Link desativado.' : 'Link reativado.', 'ok');
  } catch (erro) {
    avisar(erro.message, 'erro');
  }
}

async function copiar(token) {
  const url = urlDoLink(token);
  try {
    await navigator.clipboard.writeText(url);
    avisar('Link copiado.', 'ok');
  } catch {
    avisar(url, 'info');
  }
}

function projetar(token) {
  const link = links.find((l) => l.token === token);
  if (!link) return;

  const url = urlDoLink(token);

  $('qrUc').textContent = link.unidade_curricular || '';
  $('qrTurma').textContent =
    `${link.unidade_descricao || ''} · ${link.turma || ''} · ${link.turno || ''}`;
  $('qrUrl').textContent = url;

  const alvo = $('qrImagem');
  alvo.innerHTML = '';

  if (typeof window.QRCode === 'function') {
    // eslint-disable-next-line no-new
    new window.QRCode(alvo, { text: url, width: 340, height: 340 });
  } else {
    // sem internet: o link em texto já resolve, o aluno digita
    alvo.innerHTML =
      '<p style="padding:40px 10px;color:var(--cinza-texto)">' +
      'QR Code indisponível offline.<br />Peça para digitarem o endereço abaixo.</p>';
  }

  $('modalQr').classList.add('modal--aberto');
}

// -----------------------------------------------------------------------------
// Eventos
// -----------------------------------------------------------------------------

function registrarEventos() {
  $('btnRecarregar').addEventListener('click', carregar);

  $('corpoTabela').addEventListener('click', (evento) => {
    const { qr, copiar: tokenCopiar, alternar } = evento.target.dataset;
    if (qr) projetar(qr);
    if (tokenCopiar) copiar(tokenCopiar);
    if (alternar) alternarAtivo(alternar);
  });

  $('qrFechar').addEventListener('click', fecharModal);
  $('modalQr').addEventListener('click', (e) => {
    if (e.target === $('modalQr')) fecharModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });

  $('qrCopiar').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText($('qrUrl').textContent);
      avisar('Link copiado.', 'ok');
    } catch {
      avisar('Copie manualmente o endereço mostrado.', 'info');
    }
  });

  $('qrImprimir').addEventListener('click', () => window.print());
}

function fecharModal() {
  $('modalQr').classList.remove('modal--aberto');
}

// -----------------------------------------------------------------------------
// Utilitários
// -----------------------------------------------------------------------------

function escapar(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}

let timer;
function avisar(mensagem, tipo = 'info') {
  const aviso = $('aviso');
  aviso.textContent = mensagem;
  aviso.className = `aviso aviso--visivel aviso--${tipo}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  clearTimeout(timer);
  timer = setTimeout(() => { aviso.className = 'aviso'; }, 7000);
}
