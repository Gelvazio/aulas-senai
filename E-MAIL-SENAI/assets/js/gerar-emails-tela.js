/** gerar-emails-tela.js — Interface da geração de endereços a partir das listas. */

import { exigirLogin } from './api.js';
import { LISTAS_EMAIL } from '../../LISTAS-EMAIL.js';
import {
  FORMATOS,
  gerarParaTodas,
  resumoDaGeracao,
  paraCsvConferencia,
  gerarEmailsDeTeste,
} from './gerador-emails.js';

const $ = (id) => document.getElementById(id);

let resultado = null;

(async function iniciar() {
  if (!(await exigirLogin())) return;
  montarSeletores();
  registrarEventos();
})();

// -----------------------------------------------------------------------------
// Seletores
// -----------------------------------------------------------------------------

function montarSeletores() {
  $('formato').innerHTML = Object.entries(FORMATOS)
    .map(([chave, f]) => `<option value="${chave}">${escapar(f.rotulo)}</option>`)
    .join('');

  $('lista').innerHTML =
    '<option value="">Todas as listas</option>' +
    LISTAS_EMAIL.map(
      (l) =>
        `<option value="${escapar(l.id)}">${escapar(l.unidade)} — ${escapar(l.unidadeCurricular)} (${l.alunos.length})</option>`
    ).join('');

  atualizarExemplo();
}

function atualizarExemplo() {
  const formato = FORMATOS[$('formato').value];
  const dominio = $('dominio').value.trim() || 'aluno.senai.br';
  $('exemploFormato').textContent = formato
    ? `Ex.: ${formato.exemplo}@${dominio}`
    : '—';
}

// -----------------------------------------------------------------------------
// Geração
// -----------------------------------------------------------------------------

function gerar() {
  const dominio = $('dominio').value.trim();
  if (!dominio) return avisar('Informe o domínio institucional.', 'erro');

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(dominio)) {
    return avisar(`"${dominio}" não parece um domínio válido.`, 'erro');
  }

  const idLista = $('lista').value;
  const listas = idLista ? LISTAS_EMAIL.filter((l) => l.id === idLista) : LISTAS_EMAIL;

  try {
    resultado = gerarParaTodas(listas, { dominio, formato: $('formato').value });
    renderizar();
    $('painelResultado').style.display = '';
  } catch (erro) {
    avisar(erro.message, 'erro');
  }
}

function renderizar() {
  const r = resumoDaGeracao(resultado);

  $('metricas').innerHTML = `
    <div class="metrica">
      <div class="metrica__valor">${r.total}</div>
      <div class="metrica__rotulo">Alunos</div>
    </div>
    <div class="metrica metrica--ok">
      <div class="metrica__valor">${r.jaTinham}</div>
      <div class="metrica__rotulo">Já tinham e-mail</div>
    </div>
    <div class="metrica metrica--pendente">
      <div class="metrica__valor">${r.gerados}</div>
      <div class="metrica__rotulo">Gerados</div>
    </div>
    <div class="metrica metrica--erro">
      <div class="metrica__valor">${r.homonimos}</div>
      <div class="metrica__rotulo">Homônimos</div>
    </div>
    <div class="metrica metrica--pendente">
      <div class="metrica__valor">${r.aConferir}</div>
      <div class="metrica__rotulo">A conferir</div>
    </div>`;

  $('corpoPrevia').innerHTML = resultado
    .flatMap((bloco) =>
      bloco.linhas.map(
        (l) => `
        <tr class="${l.colidiu ? 'prev-colisao' : ''}">
          <td><small>${escapar(bloco.lista)}</small></td>
          <td>${l.n}</td>
          <td>${escapar(l.nome)}</td>
          <td class="prev-gerado">${escapar(l.emailGerado || '—')}</td>
          <td>${
            l.verificado
              ? '<span class="badge badge--ok">Já existia</span>'
              : l.colidiu
                ? '<span class="badge badge--erro">Homônimo — revisar</span>'
                : '<span class="badge tag-conferir">A conferir</span>'
          }</td>
        </tr>`
      )
    )
    .join('');
}

// -----------------------------------------------------------------------------
// Saídas
// -----------------------------------------------------------------------------

function baixarCsv() {
  if (!resultado) return;
  baixar(
    paraCsvConferencia(resultado),
    `conferencia-emails-${new Date().toISOString().slice(0, 10)}.csv`,
    'text/csv;charset=utf-8'
  );
  avisar('CSV baixado. Envie para a secretaria conferir antes de importar.', 'ok');
}

/** Monta o trecho pronto para colar em LISTAS-EMAIL.js. */
async function copiarParaJs() {
  if (!resultado) return;

  const trecho = resultado
    .map((bloco) => {
      const linhas = bloco.linhas
        .map(
          (l) =>
            `      { n: ${String(l.n).padEnd(2)}, nome: ${JSON.stringify(l.nome).padEnd(42)}, email: ${JSON.stringify(l.emailGerado || '')} },`
        )
        .join('\n');
      return `  // ${bloco.lista}\n    alunos: [\n${linhas}\n    ],`;
    })
    .join('\n\n');

  try {
    await navigator.clipboard.writeText(trecho);
    avisar('Trecho copiado. Cole no LISTAS-EMAIL.js — e confira antes de sincronizar.', 'ok');
  } catch {
    baixar(trecho, 'alunos-com-emails.txt', 'text/plain;charset=utf-8');
    avisar('Não consegui usar a área de transferência; baixei como arquivo .txt.', 'info');
  }
}

function gerarTeste() {
  const email = $('seuEmail').value.trim();
  if (!email) return avisar('Informe seu e-mail.', 'erro');

  const idLista = $('lista').value;
  const listas = idLista ? LISTAS_EMAIL.filter((l) => l.id === idLista) : LISTAS_EMAIL;

  try {
    const linhas = listas.flatMap((l) =>
      gerarEmailsDeTeste(l, email).map((x) => `${x.nome};${x.email}`)
    );
    baixar(
      '﻿nome;email_teste\n' + linhas.join('\n'),
      'emails-de-teste.csv',
      'text/csv;charset=utf-8'
    );
    avisar(
      `${linhas.length} endereço(s) de teste gerados — todos caem na sua caixa. ` +
        'Nenhum aluno é atingido.',
      'ok'
    );
  } catch (erro) {
    avisar(erro.message, 'erro');
  }
}

// -----------------------------------------------------------------------------
// Eventos e utilitários
// -----------------------------------------------------------------------------

function registrarEventos() {
  $('btnGerar').addEventListener('click', gerar);
  $('btnCsv').addEventListener('click', baixarCsv);
  $('btnJs').addEventListener('click', copiarParaJs);
  $('btnTeste').addEventListener('click', gerarTeste);
  $('formato').addEventListener('change', atualizarExemplo);
  $('dominio').addEventListener('input', atualizarExemplo);
}

function baixar(conteudo, nome, tipo) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
  const link = document.createElement('a');
  link.href = url;
  link.download = nome;
  link.click();
  URL.revokeObjectURL(url);
}

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
  timer = setTimeout(() => { aviso.className = 'aviso'; }, 9000);
}
