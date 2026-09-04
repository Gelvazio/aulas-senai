/** dashboard.js — Dashboard de contatos: CRUD, filtros, importação e sync Resend. */

import {
  Auth, Db, Sessao, exigirLogin, sincronizarResend, testarResend, usuarioAtual,
} from './api.js';
import { STATUS_SYNC } from './config.js';

const $ = (id) => document.getElementById(id);

const TABELA = 'email_contato';

let contatos = [];
let unidades = [];

// -----------------------------------------------------------------------------
// Inicialização
// -----------------------------------------------------------------------------

(async function iniciar() {
  if (!(await exigirLogin())) return;

  await carregarUsuario();
  await carregarUnidades();
  await carregarContatos();
  registrarEventos();
})();

async function carregarUsuario() {
  try {
    const usuario = await usuarioAtual();
    $('usuarioNome').textContent =
      usuario?.user_metadata?.nome || usuario?.email || '';
  } catch {
    $('usuarioNome').textContent = '';
  }
}

async function carregarUnidades() {
  try {
    unidades = (await Db.selecionar('unidade', '?select=id,descricao&order=descricao')) || [];
  } catch {
    unidades = [];
  }

  const opcoes = unidades
    .map((u) => `<option value="${u.id}">${escapar(u.descricao)}</option>`)
    .join('');

  $('cUnidade').insertAdjacentHTML('beforeend', opcoes);
  $('fUnidade').insertAdjacentHTML('beforeend', opcoes);
}

async function carregarContatos() {
  const corpo = $('corpoTabela');
  corpo.innerHTML = '<tr><td colspan="7" class="carregando">Carregando…</td></tr>';

  try {
    contatos = (await Db.selecionar(TABELA, '?select=*&order=nome')) || [];
    preencherFiltroTurmas();
    renderizar();
    atualizarMetricas();
  } catch (erro) {
    if (erro.naoAutenticado) return window.location.replace('index.html');
    corpo.innerHTML = `<tr><td colspan="7" class="tabela__vazio">Erro ao carregar: ${escapar(erro.message)}</td></tr>`;
  }
}

// -----------------------------------------------------------------------------
// Renderização
// -----------------------------------------------------------------------------

function filtrados() {
  const busca = $('fBusca').value.trim().toLowerCase();
  const unidadeId = $('fUnidade').value;
  const turma = $('fTurma').value;
  const status = $('fStatus').value;

  return contatos.filter((c) => {
    if (busca && !`${c.nome} ${c.email}`.toLowerCase().includes(busca)) return false;
    if (unidadeId && String(c.unidade_id) !== unidadeId) return false;
    if (turma && (c.codigo_turma || '') !== turma) return false;
    if (status && c.status_sync !== status) return false;
    return true;
  });
}

function renderizar() {
  const lista = filtrados();
  const corpo = $('corpoTabela');

  if (!lista.length) {
    corpo.innerHTML =
      '<tr><td colspan="7" class="tabela__vazio">Nenhum contato encontrado. Cadastre um novo ou importe das listas de presença.</td></tr>';
    return;
  }

  corpo.innerHTML = lista
    .map((c) => {
      const status = STATUS_SYNC[c.status_sync] || STATUS_SYNC.PENDENTE;
      const unidade = unidades.find((u) => u.id === c.unidade_id);
      return `
        <tr>
          <td>${escapar(c.nome)}</td>
          <td>${escapar(c.email)}</td>
          <td>${escapar(unidade?.descricao || c.unidade_descricao || '—')}</td>
          <td>${escapar(c.turma || '—')}${c.codigo_turma ? ` <small>(${escapar(c.codigo_turma)})</small>` : ''}</td>
          <td>${escapar(c.unidade_curricular || '—')}</td>
          <td><span class="badge ${status.classe}" title="${escapar(c.erro_sync || '')}">${status.rotulo}</span></td>
          <td>
            <div class="tabela__acoes">
              <button class="btn btn--secundario btn--pequeno" data-editar="${c.id}">Editar</button>
              <button class="btn btn--perigo btn--pequeno" data-excluir="${c.id}">Excluir</button>
            </div>
          </td>
        </tr>`;
    })
    .join('');
}

function atualizarMetricas() {
  $('mTotal').textContent = contatos.length;
  $('mSincronizados').textContent = contatos.filter((c) => c.status_sync === 'SINCRONIZADO').length;
  $('mPendentes').textContent = contatos.filter((c) => c.status_sync === 'PENDENTE').length;
  $('mErros').textContent = contatos.filter((c) => c.status_sync === 'ERRO').length;
  $('mTurmas').textContent = new Set(contatos.map((c) => c.codigo_turma).filter(Boolean)).size;
}

function preencherFiltroTurmas() {
  const seletor = $('fTurma');
  const atual = seletor.value;
  const turmas = [...new Set(contatos.map((c) => c.codigo_turma).filter(Boolean))].sort();

  seletor.innerHTML =
    '<option value="">Todas</option>' +
    turmas
      .map((codigo) => {
        const exemplo = contatos.find((c) => c.codigo_turma === codigo);
        const rotulo = exemplo?.turma ? `${exemplo.turma} (${codigo})` : codigo;
        return `<option value="${escapar(codigo)}">${escapar(rotulo)}</option>`;
      })
      .join('');

  seletor.value = atual;
}

// -----------------------------------------------------------------------------
// Modal de contato
// -----------------------------------------------------------------------------

function abrirModal(contato = null) {
  $('modalTitulo').textContent = contato ? 'Editar contato' : 'Novo contato';
  $('cId').value = contato?.id || '';
  $('cNome').value = contato?.nome || '';
  $('cEmail').value = contato?.email || '';
  $('cUnidade').value = contato?.unidade_id || '';
  $('cTurno').value = contato?.turno || '';
  $('cTurma').value = contato?.turma || '';
  $('cCodigoTurma').value = contato?.codigo_turma || '';
  $('cUc').value = contato?.unidade_curricular || '';
  $('cCurso').value = contato?.curso || '';
  $('cObservacao').value = contato?.observacao || '';

  esconder($('avisoModal'));
  $('modalContato').classList.add('modal--aberto');
  $('cNome').focus();
}

function fecharModal() {
  $('modalContato').classList.remove('modal--aberto');
}

async function salvarContato(evento) {
  evento.preventDefault();

  const id = $('cId').value;
  const unidadeId = $('cUnidade').value;
  const unidade = unidades.find((u) => String(u.id) === unidadeId);

  const registro = {
    nome: $('cNome').value.trim(),
    email: $('cEmail').value.trim().toLowerCase(),
    unidade_id: unidadeId ? Number(unidadeId) : null,
    unidade_descricao: unidade?.descricao || null,
    turno: $('cTurno').value || null,
    turma: $('cTurma').value.trim() || null,
    codigo_turma: $('cCodigoTurma').value.trim() || null,
    unidade_curricular: $('cUc').value.trim() || null,
    curso: $('cCurso').value.trim() || null,
    observacao: $('cObservacao').value.trim() || null,
  };

  const botao = $('btnSalvar');
  botao.disabled = true;
  botao.textContent = 'Salvando…';

  try {
    if (id) {
      await Db.atualizar(TABELA, `id=eq.${id}`, registro);
    } else {
      await Db.inserir(TABELA, { ...registro, origem: 'CADASTRO_MANUAL', status_sync: 'PENDENTE' });
    }
    fecharModal();
    await carregarContatos();
    avisar(id ? 'Contato atualizado.' : 'Contato cadastrado.', 'ok');
  } catch (erro) {
    const duplicado = /duplicate key|unique/i.test(erro.message);
    mostrar(
      $('avisoModal'),
      duplicado ? 'Este e-mail já está cadastrado nesta turma.' : erro.message,
      'erro'
    );
  } finally {
    botao.disabled = false;
    botao.textContent = 'Salvar';
  }
}

async function excluirContato(id) {
  const contato = contatos.find((c) => String(c.id) === String(id));
  if (!contato) return;
  if (!confirm(`Excluir o contato "${contato.nome}" (${contato.email})?`)) return;

  try {
    await Db.remover(TABELA, `id=eq.${id}`);
    await carregarContatos();
    avisar('Contato excluído.', 'ok');
  } catch (erro) {
    avisar(erro.message, 'erro');
  }
}

// -----------------------------------------------------------------------------
// Importação das listas de presença (LISTAS-EMAIL.js)
// -----------------------------------------------------------------------------

async function importarDasListas() {
  let listas;
  try {
    ({ LISTAS_EMAIL: listas } = await import('../../LISTAS-EMAIL.js'));
  } catch {
    return avisar('Não foi possível ler LISTAS-EMAIL.js. Sirva o projeto por HTTP (veja o README).', 'erro');
  }

  const prontos = [];
  let semEmail = 0;

  for (const lista of listas) {
    const unidade = unidades.find((u) =>
      u.descricao.toUpperCase().includes(lista.unidade.toUpperCase().split(' ')[0])
    );

    for (const aluno of lista.alunos) {
      if (!aluno.email) { semEmail += 1; continue; }
      prontos.push({
        nome: aluno.nome,
        email: aluno.email.trim().toLowerCase(),
        unidade_id: unidade?.id || null,
        unidade_descricao: unidade?.descricao || lista.unidade,
        turno: lista.turno,
        turma: lista.turma,
        codigo_turma: lista.codigoTurma,
        unidade_curricular: lista.unidadeCurricular,
        curso: lista.curso,
        origem: lista.origem,
        status_sync: 'PENDENTE',
      });
    }
  }

  if (!prontos.length) {
    return avisar(
      `Nenhum e-mail preenchido em LISTAS-EMAIL.js (${semEmail} aluno(s) sem e-mail). ` +
        'As listas de presença trazem apenas nome e CPF — preencha os e-mails no arquivo primeiro.',
      'info'
    );
  }

  if (!confirm(`Importar ${prontos.length} contato(s)? Duplicados na mesma turma são ignorados.`)) return;

  let inseridos = 0;
  let ignorados = 0;

  for (const registro of prontos) {
    try {
      await Db.inserir(TABELA, registro);
      inseridos += 1;
    } catch {
      ignorados += 1;
    }
  }

  await carregarContatos();
  avisar(
    `Importação concluída: ${inseridos} inserido(s), ${ignorados} ignorado(s)` +
      (semEmail ? `, ${semEmail} sem e-mail no arquivo.` : '.'),
    'ok'
  );
}

// -----------------------------------------------------------------------------
// Importação / exportação CSV
// -----------------------------------------------------------------------------

function lerLinhaCsv(linha) {
  const celulas = [];
  let atual = '';
  let dentroDeAspas = false;

  for (let i = 0; i < linha.length; i += 1) {
    const caractere = linha[i];
    if (caractere === '"') {
      if (dentroDeAspas && linha[i + 1] === '"') { atual += '"'; i += 1; }
      else dentroDeAspas = !dentroDeAspas;
    } else if (caractere === ',' && !dentroDeAspas) {
      celulas.push(atual); atual = '';
    } else {
      atual += caractere;
    }
  }
  celulas.push(atual);
  return celulas.map((c) => c.trim());
}

async function importarCsv(arquivo) {
  const texto = await arquivo.text();
  const linhas = texto.split(/\r?\n/).filter((l) => l.trim());
  if (linhas.length < 2) return avisar('CSV vazio ou sem linhas de dados.', 'erro');

  const cabecalho = lerLinhaCsv(linhas[0]).map((c) => c.toLowerCase());
  const indice = (nome) => cabecalho.indexOf(nome);

  const iEmail = indice('email');
  if (iEmail === -1) return avisar('O CSV precisa ter uma coluna "email".', 'erro');

  const iNome = indice('nome');
  const iFirst = indice('first_name');
  const iLast = indice('last_name');

  let inseridos = 0;
  let ignorados = 0;

  for (const linha of linhas.slice(1)) {
    const celulas = lerLinhaCsv(linha);
    const email = (celulas[iEmail] || '').toLowerCase();
    if (!email) { ignorados += 1; continue; }

    const nome =
      (iNome !== -1 && celulas[iNome]) ||
      [celulas[iFirst], celulas[iLast]].filter(Boolean).join(' ') ||
      email.split('@')[0];

    const unidadeDescricao = iValor(celulas, indice('unidade'));
    const unidade = unidades.find((u) => u.descricao.toUpperCase() === (unidadeDescricao || '').toUpperCase());

    try {
      await Db.inserir(TABELA, {
        nome,
        email,
        unidade_id: unidade?.id || null,
        unidade_descricao: unidadeDescricao,
        turno: iValor(celulas, indice('turno')),
        turma: iValor(celulas, indice('turma')),
        codigo_turma: iValor(celulas, indice('codigo_turma')),
        unidade_curricular: iValor(celulas, indice('unidade_curricular')),
        curso: iValor(celulas, indice('curso')),
        origem: `CSV: ${arquivo.name}`,
        status_sync: 'PENDENTE',
      });
      inseridos += 1;
    } catch {
      ignorados += 1;
    }
  }

  await carregarContatos();
  avisar(`CSV importado: ${inseridos} inserido(s), ${ignorados} ignorado(s).`, 'ok');
}

const iValor = (celulas, indice) => (indice === -1 ? null : celulas[indice] || null);

function exportarCsv() {
  const lista = filtrados();
  if (!lista.length) return avisar('Nada para exportar com os filtros atuais.', 'info');

  const colunas = [
    'email', 'first_name', 'last_name', 'unidade',
    'turno', 'turma', 'codigo_turma', 'unidade_curricular', 'curso',
  ];

  const escaparCsv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

  const linhas = lista.map((c) =>
    [
      c.email, c.first_name, c.last_name,
      unidades.find((u) => u.id === c.unidade_id)?.descricao || c.unidade_descricao,
      c.turno, c.turma, c.codigo_turma, c.unidade_curricular, c.curso,
    ].map(escaparCsv).join(',')
  );

  const csv = [colunas.join(','), ...linhas].join('\n');
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `contatos-senai-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// -----------------------------------------------------------------------------
// Sincronização com o Resend
// -----------------------------------------------------------------------------

async function sincronizar() {
  const pendentes = contatos.filter((c) => c.status_sync !== 'SINCRONIZADO' && c.ativo);

  if (!pendentes.length) return avisar('Nenhum contato pendente de sincronização.', 'info');
  if (!confirm(`Enviar ${pendentes.length} contato(s) para o Resend?`)) return;

  const botao = $('btnSincronizar');
  botao.disabled = true;
  botao.textContent = 'Sincronizando…';

  try {
    const resultado = await sincronizarResend(pendentes.map((c) => c.id));
    await carregarContatos();
    avisar(
      `Sincronização concluída: ${resultado.sincronizados} enviado(s), ${resultado.erros} com erro.`,
      resultado.erros ? 'info' : 'ok'
    );
  } catch (erro) {
    const semChave = /Vault|RESEND_/i.test(erro.message);
    avisar(
      semChave
        ? 'Chave do Resend ainda não cadastrada no Vault. Veja a seção "Cadastrar a chave" no CLAUDE.md.'
        : `Falha ao sincronizar: ${erro.message}`,
      'erro'
    );
  } finally {
    botao.disabled = false;
    botao.textContent = 'Sincronizar com o Resend';
  }
}

async function testarConexao() {
  const botao = $('btnTestar');
  botao.disabled = true;
  botao.textContent = 'Testando…';

  try {
    const etapas = await testarResend();
    const falhou = etapas.find((e) => !e.ok);
    const resumo = etapas.map((e) => `${e.ok ? '✅' : '❌'} ${e.etapa}: ${e.detalhe}`).join('\n');

    avisar(resumo, falhou ? 'erro' : 'ok');
  } catch (erro) {
    avisar(`Falha no teste: ${erro.message}`, 'erro');
  } finally {
    botao.disabled = false;
    botao.textContent = 'Testar conexão';
  }
}

// -----------------------------------------------------------------------------
// Eventos
// -----------------------------------------------------------------------------

function registrarEventos() {
  $('btnNovo').addEventListener('click', () => abrirModal());
  $('btnRecarregar').addEventListener('click', carregarContatos);
  $('btnImportarListas').addEventListener('click', importarDasListas);
  $('btnExportar').addEventListener('click', exportarCsv);
  $('btnSincronizar').addEventListener('click', sincronizar);
  $('btnTestar').addEventListener('click', testarConexao);

  $('btnImportarCsv').addEventListener('click', () => $('arquivoCsv').click());
  $('arquivoCsv').addEventListener('change', (evento) => {
    const arquivo = evento.target.files?.[0];
    if (arquivo) importarCsv(arquivo).catch((e) => avisar(e.message, 'erro'));
    evento.target.value = '';
  });

  $('formContato').addEventListener('submit', salvarContato);
  $('modalFechar').addEventListener('click', fecharModal);
  $('btnCancelar').addEventListener('click', fecharModal);
  $('modalContato').addEventListener('click', (e) => {
    if (e.target === $('modalContato')) fecharModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });

  $('corpoTabela').addEventListener('click', (evento) => {
    const editar = evento.target.dataset.editar;
    const excluir = evento.target.dataset.excluir;
    if (editar) abrirModal(contatos.find((c) => String(c.id) === editar));
    if (excluir) excluirContato(excluir);
  });

  ['fBusca', 'fUnidade', 'fTurma', 'fStatus'].forEach((id) => {
    $(id).addEventListener('input', renderizar);
  });

  $('btnLimparFiltros').addEventListener('click', () => {
    ['fBusca', 'fUnidade', 'fTurma', 'fStatus'].forEach((id) => { $(id).value = ''; });
    renderizar();
  });

  $('btnSair').addEventListener('click', async () => {
    await Auth.sair();
    window.location.replace('index.html');
  });
}

// -----------------------------------------------------------------------------
// Utilitários
// -----------------------------------------------------------------------------

function escapar(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}

function mostrar(elemento, mensagem, tipo) {
  elemento.textContent = mensagem;
  elemento.className = `aviso aviso--visivel aviso--${tipo}`;
}

function esconder(elemento) {
  elemento.className = 'aviso';
}

let timerAviso;
function avisar(mensagem, tipo = 'info') {
  mostrar($('aviso'), mensagem, tipo);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => esconder($('aviso')), 8000);
}

// Sessão encerrada em outra aba
window.addEventListener('storage', () => {
  if (!Sessao.ler()) window.location.replace('index.html');
});
