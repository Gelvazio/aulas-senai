/**
 * criar-contas-purelymail.js
 * -----------------------------------------------------------------------------
 * Cria em lote as caixas de e-mail dos alunos no Purelymail.
 *
 * Não é servidor: é um script administrativo de uso único, rodado por você na
 * sua máquina. O app continua sendo HTML/CSS/JS puro no navegador.
 *
 * Node puro, sem dependência nenhuma. Requer Node 18+ (usa fetch nativo).
 *
 * ─── COMO USAR ───────────────────────────────────────────────────────────────
 *
 *   1. Pegue o token: purelymail.com → Account → "Refresh API Key" → copie
 *
 *   2. Coloque no .env do projeto (o arquivo está no .gitignore):
 *        PURELYMAIL_API_TOKEN=seu_token_aqui
 *
 *   3. Simule primeiro — não cria nada, só mostra o que faria:
 *        node scripts/criar-contas-purelymail.js --dominio seudominio.com.br
 *
 *   4. Conferido, execute de verdade:
 *        node scripts/criar-contas-purelymail.js --dominio seudominio.com.br --executar
 *
 * As senhas geradas saem em LISTAS/CREDENCIAIS.csv — arquivo sensível,
 * já coberto pelo .gitignore. Entregue e apague.
 * ---------------------------------------------------------------------------
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomInt } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://purelymail.com/api/v0/';

const ENTRADA = join(RAIZ, 'LISTAS', 'CONTAS-A-CRIAR.csv');
const SAIDA = join(RAIZ, 'LISTAS', 'CREDENCIAIS.csv');

// -----------------------------------------------------------------------------
// Argumentos e configuração
// -----------------------------------------------------------------------------

const args = process.argv.slice(2);
const valorDe = (nome) => {
  const i = args.indexOf(nome);
  return i !== -1 ? args[i + 1] : null;
};

const DOMINIO = valorDe('--dominio');
const EXECUTAR = args.includes('--executar');

/** Lê o token do .env sem depender de biblioteca. */
function lerToken() {
  if (process.env.PURELYMAIL_API_TOKEN) return process.env.PURELYMAIL_API_TOKEN;

  const env = join(RAIZ, '.env');
  if (!existsSync(env)) return null;

  for (const linha of readFileSync(env, 'utf8').split(/\r?\n/)) {
    const m = linha.match(/^\s*PURELYMAIL_API_TOKEN\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, '');
  }
  return null;
}

// -----------------------------------------------------------------------------
// Senhas
// -----------------------------------------------------------------------------

/**
 * Senha legível em voz alta e digitável por adolescente em sala:
 * sem caracteres ambíguos (l/1/I, O/0), sílabas pronunciáveis.
 */
function gerarSenha() {
  const consoantes = 'bcdfghjkmnpqrstvwxz';
  const vogais = 'aeuy';
  let s = '';
  for (let i = 0; i < 3; i += 1) {
    s += consoantes[randomInt(consoantes.length)];
    s += vogais[randomInt(vogais.length)];
  }
  return `${s}-${randomInt(1000, 9999)}`;
}

// -----------------------------------------------------------------------------
// CSV
// -----------------------------------------------------------------------------

function lerLinhaCsv(linha) {
  const celulas = [];
  let atual = '';
  let aspas = false;

  for (let i = 0; i < linha.length; i += 1) {
    const c = linha[i];
    if (c === '"') {
      if (aspas && linha[i + 1] === '"') { atual += '"'; i += 1; }
      else aspas = !aspas;
    } else if (c === ',' && !aspas) {
      celulas.push(atual); atual = '';
    } else {
      atual += c;
    }
  }
  celulas.push(atual);
  return celulas.map((c) => c.trim());
}

function lerContatos() {
  if (!existsSync(ENTRADA)) {
    throw new Error(`Arquivo não encontrado: ${ENTRADA}`);
  }

  const texto = readFileSync(ENTRADA, 'utf8').replace(/^﻿/, '');
  const linhas = texto.split(/\r?\n/).filter((l) => l.trim());
  const cabecalho = lerLinhaCsv(linhas[0]).map((c) => c.toLowerCase());

  const iNome = cabecalho.indexOf('nome');
  const iEmail = cabecalho.indexOf('email');
  if (iEmail === -1) throw new Error('O CSV precisa ter a coluna "email".');

  return linhas.slice(1).map((linha) => {
    const c = lerLinhaCsv(linha);
    return { nome: iNome !== -1 ? c[iNome] : '', email: c[iEmail].toLowerCase() };
  });
}

const escaparCsv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

async function criarUsuario(token, { userName, domainName, password }) {
  const resposta = await fetch(`${API}createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Purelymail-Api-Token': token,
    },
    body: JSON.stringify({
      userName,
      domainName,
      password,
      enablePasswordReset: false,
      enableSearchIndexing: true,
      sendWelcomeEmail: false,
    }),
  });

  const corpo = await resposta.json().catch(() => ({}));

  // A API responde { type: "success" } ou { type: "error", ... }
  if (!resposta.ok || corpo.type === 'error') {
    const detalhe =
      corpo.message ||
      (Array.isArray(corpo.errors) ? corpo.errors.join('; ') : null) ||
      `HTTP ${resposta.status}`;
    throw new Error(detalhe);
  }

  return corpo;
}

// -----------------------------------------------------------------------------
// Execução
// -----------------------------------------------------------------------------

async function principal() {
  if (!DOMINIO) {
    console.error('\n  Falta o domínio.\n');
    console.error('  node scripts/criar-contas-purelymail.js --dominio seudominio.com.br\n');
    process.exit(1);
  }

  const token = lerToken();
  if (!token && EXECUTAR) {
    console.error('\n  PURELYMAIL_API_TOKEN não encontrado.');
    console.error('  Adicione ao .env do projeto ou exporte como variável de ambiente.\n');
    process.exit(1);
  }

  const contatos = lerContatos();

  console.log(`\n  Domínio ....... ${DOMINIO}`);
  console.log(`  Contas ........ ${contatos.length}`);
  console.log(`  Modo .......... ${EXECUTAR ? 'EXECUTAR (cria de verdade)' : 'SIMULAÇÃO (não cria nada)'}\n`);

  const resultados = [];
  let ok = 0;
  let falhas = 0;

  for (const [i, contato] of contatos.entries()) {
    // o CSV pode vir com domínio-placeholder; o --dominio manda
    const userName = contato.email.split('@')[0];
    const email = `${userName}@${DOMINIO}`;
    const senha = gerarSenha();
    const posicao = String(i + 1).padStart(2);

    if (!EXECUTAR) {
      console.log(`  ${posicao}. [simulado] ${email.padEnd(38)} ${senha}`);
      resultados.push({ ...contato, email, senha, status: 'SIMULADO' });
      continue;
    }

    try {
      await criarUsuario(token, { userName, domainName: DOMINIO, password: senha });
      console.log(`  ${posicao}. ✓ ${email.padEnd(38)} ${senha}`);
      resultados.push({ ...contato, email, senha, status: 'CRIADA' });
      ok += 1;
    } catch (erro) {
      console.log(`  ${posicao}. ✗ ${email.padEnd(38)} ${erro.message}`);
      resultados.push({ ...contato, email, senha: '', status: `ERRO: ${erro.message}` });
      falhas += 1;
    }

    // respiro entre chamadas, para não esbarrar em limite de taxa
    await new Promise((r) => setTimeout(r, 400));
  }

  const csv =
    '﻿' +
    ['nome,email,senha,status',
      ...resultados.map((r) =>
        [r.nome, r.email, r.senha, r.status].map(escaparCsv).join(',')
      )].join('\n');

  writeFileSync(SAIDA, csv, 'utf8');

  console.log(`\n  ${EXECUTAR ? `Criadas: ${ok} · Falhas: ${falhas}` : 'Simulação concluída — nada foi criado.'}`);
  console.log(`  Arquivo: ${SAIDA}\n`);

  if (EXECUTAR && ok > 0) {
    console.log('  ⚠️  CREDENCIAIS.csv contém senhas em texto puro.');
    console.log('     Entregue aos alunos, peça a troca no primeiro acesso e apague o arquivo.\n');
  }
}

principal().catch((erro) => {
  console.error(`\n  Erro: ${erro.message}\n`);
  process.exit(1);
});
