/**
 * gerador-emails.js — Deriva endereços a partir dos nomes das listas de presença.
 *
 * ⚠️ LEIA ANTES DE USAR
 * Isto NÃO adivinha o e-mail de ninguém: apenas aplica um PADRÃO institucional
 * conhecido (ex.: primeiro.ultimo@aluno.senai.br) ao nome do aluno.
 *
 * Um endereço derivado é uma HIPÓTESE até alguém confirmar. Enviar para
 * hipóteses tem dois custos reais:
 *   1. Bounce — endereço inexistente derruba a reputação do domínio no Resend
 *      e passa a prejudicar a entrega das mensagens legítimas.
 *   2. Vazamento — se o endereço existir e for de OUTRA pessoa, dados do aluno
 *      vão parar com um estranho. Isso é incidente de LGPD.
 *
 * Por isso todo endereço gerado nasce com `verificado: false` e a função
 * `paraImportacao()` se recusa a entregar não verificados por padrão.
 */

// -----------------------------------------------------------------------------
// Normalização de nomes
// -----------------------------------------------------------------------------

/** Partículas que não entram na composição do endereço. */
const PARTICULAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'di', 'du', 'del', 'la']);

/** Remove acentos, cedilha e qualquer caractere fora de [a-z0-9]. */
export function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')                 // separa letra e acento
    .replace(/[̀-ͯ]/g, '') // remove os acentos combinantes
    .replace(/[^a-zA-Z0-9\s]/g, '')   // remove hífen, apóstrofo etc.
    .trim()
    .toLowerCase();
}

/** Quebra o nome em partes úteis, descartando partículas. */
export function partesDoNome(nomeCompleto) {
  const partes = normalizar(nomeCompleto).split(/\s+/).filter(Boolean);
  const uteis = partes.filter((p) => !PARTICULAS.has(p));
  // se sobrou nada (nome só de partículas), devolve o original
  return uteis.length ? uteis : partes;
}

// -----------------------------------------------------------------------------
// Padrões suportados
// -----------------------------------------------------------------------------

export const FORMATOS = {
  'primeiro.ultimo': {
    rotulo: 'primeiro.ultimo',
    exemplo: 'anjuli.fagundes',
    montar: (p) => (p.length > 1 ? `${p[0]}.${p[p.length - 1]}` : p[0]),
  },
  'primeiro.segundo': {
    rotulo: 'primeiro.segundo',
    exemplo: 'anjuli.rahn',
    montar: (p) => (p.length > 1 ? `${p[0]}.${p[1]}` : p[0]),
  },
  'inicial+ultimo': {
    rotulo: 'inicial + ultimo',
    exemplo: 'afagundes',
    montar: (p) => (p.length > 1 ? `${p[0][0]}${p[p.length - 1]}` : p[0]),
  },
  'primeiro_ultimo': {
    rotulo: 'primeiro_ultimo',
    exemplo: 'anjuli_fagundes',
    montar: (p) => (p.length > 1 ? `${p[0]}_${p[p.length - 1]}` : p[0]),
  },
  'primeiroultimo': {
    rotulo: 'primeiroultimo (sem separador)',
    exemplo: 'anjulifagundes',
    montar: (p) => (p.length > 1 ? `${p[0]}${p[p.length - 1]}` : p[0]),
  },
  completo: {
    rotulo: 'nome completo com pontos',
    exemplo: 'anjuli.rahn.miranda.fagundes',
    montar: (p) => p.join('.'),
  },
};

// -----------------------------------------------------------------------------
// Geração
// -----------------------------------------------------------------------------

/**
 * Gera o endereço de um nome.
 * @param {string} nome        nome completo do aluno
 * @param {string} dominio     ex.: 'aluno.senai.br' (sem @)
 * @param {string} formato     chave de FORMATOS
 * @param {Set<string>} usados endereços já atribuídos, para desempate
 */
export function gerarEmail(nome, dominio, formato = 'primeiro.ultimo', usados = new Set()) {
  const regra = FORMATOS[formato];
  if (!regra) throw new Error(`Formato desconhecido: ${formato}`);

  const partes = partesDoNome(nome);
  if (!partes.length) return null;

  const base = regra.montar(partes);
  const limpo = String(dominio).replace(/^@+/, '').trim().toLowerCase();

  // homônimos recebem sufixo numérico
  let local = base;
  let n = 1;
  while (usados.has(`${local}@${limpo}`)) {
    n += 1;
    local = `${base}${n}`;
  }

  const email = `${local}@${limpo}`;
  usados.add(email);
  return email;
}

/**
 * Gera os endereços de uma lista inteira.
 * Não altera nada: devolve uma prévia para conferência.
 *
 * @returns {{ n, nome, emailAtual, emailGerado, colidiu, verificado }[]}
 */
export function gerarParaLista(lista, { dominio, formato = 'primeiro.ultimo', sobrescrever = false } = {}) {
  if (!dominio) throw new Error('Informe o domínio (ex.: aluno.senai.br).');

  const usados = new Set(
    lista.alunos.map((a) => (a.email || '').toLowerCase()).filter(Boolean)
  );

  return lista.alunos.map((aluno) => {
    const jaTem = Boolean(aluno.email);
    const manter = jaTem && !sobrescrever;

    const gerado = manter ? aluno.email : gerarEmail(aluno.nome, dominio, formato, usados);
    const base = gerado ? gerado.split('@')[0].replace(/\d+$/, '') : '';

    return {
      n: aluno.n,
      nome: aluno.nome,
      emailAtual: aluno.email || '',
      emailGerado: gerado,
      // sufixo numérico indica homônimo — merece conferência humana
      colidiu: Boolean(gerado && gerado.split('@')[0] !== base),
      // e-mail que já existia é tratado como confirmado; gerado, não
      verificado: manter,
    };
  });
}

/** Gera para todas as listas de uma vez. */
export function gerarParaTodas(listas, opcoes) {
  return listas.map((lista) => ({
    lista: lista.id,
    unidade: lista.unidade,
    unidadeCurricular: lista.unidadeCurricular,
    linhas: gerarParaLista(lista, opcoes),
  }));
}

// -----------------------------------------------------------------------------
// Saídas
// -----------------------------------------------------------------------------

/**
 * Trava de segurança: só entrega endereços marcados como verificados.
 * Passe `permitirNaoVerificados: true` conscientemente — e assuma o risco
 * de bounce e de envio para a pessoa errada.
 */
export function paraImportacao(resultado, { permitirNaoVerificados = false } = {}) {
  const linhas = resultado.flatMap((bloco) =>
    bloco.linhas.map((linha) => ({ ...linha, lista: bloco.lista }))
  );

  const pendentes = linhas.filter((l) => !l.verificado);

  if (pendentes.length && !permitirNaoVerificados) {
    throw new Error(
      `${pendentes.length} endereço(s) ainda não foram conferidos. ` +
        'Confirme com a secretaria antes de importar, ou chame com ' +
        '{ permitirNaoVerificados: true } assumindo o risco de bounce.'
    );
  }

  return linhas.filter((l) => l.emailGerado);
}

/** CSV de conferência — mande para a secretaria validar antes de qualquer envio. */
export function paraCsvConferencia(resultado) {
  const colunas = ['lista', 'n', 'nome', 'email_sugerido', 'email_correto', 'confere'];
  const escapar = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

  const linhas = resultado.flatMap((bloco) =>
    bloco.linhas.map((l) =>
      [bloco.lista, l.n, l.nome, l.emailGerado, '', ''].map(escapar).join(',')
    )
  );

  // BOM para o Excel abrir com acentuação correta
  return '﻿' + [colunas.join(','), ...linhas].join('\n');
}

/** Endereços de teste seguros: usam sub-endereçamento do seu próprio e-mail. */
export function gerarEmailsDeTeste(lista, seuEmail) {
  const [local, dominio] = String(seuEmail).split('@');
  if (!dominio) throw new Error('Informe um e-mail válido (ex.: voce@gmail.com).');

  return lista.alunos.map((aluno) => ({
    n: aluno.n,
    nome: aluno.nome,
    // tudo cai na SUA caixa; nenhum estranho é atingido
    email: `${local}+${partesDoNome(aluno.nome)[0]}${aluno.n}@${dominio}`,
  }));
}

/** Diagnóstico da prévia, antes de decidir importar. */
export function resumoDaGeracao(resultado) {
  const linhas = resultado.flatMap((b) => b.linhas);
  return {
    total: linhas.length,
    jaTinham: linhas.filter((l) => l.emailAtual).length,
    gerados: linhas.filter((l) => !l.emailAtual && l.emailGerado).length,
    homonimos: linhas.filter((l) => l.colidiu).length,
    verificados: linhas.filter((l) => l.verificado).length,
    aConferir: linhas.filter((l) => !l.verificado).length,
  };
}
