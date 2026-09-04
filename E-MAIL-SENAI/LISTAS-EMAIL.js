/**
 * LISTAS-EMAIL.js
 * -----------------------------------------------------------------------------
 * Base de contatos dos alunos por UNIDADE / TURMA / UNIDADE CURRICULAR.
 *
 * Origem dos dados: PDFs de LISTA DE PRESENÇA (Sistema FIESC - SENAI) em LISTAS/
 *   - CEPLAS-MATUTINO-2026-02.pdf
 *   - CEPLAS-VESPERTINO-2026-02.pdf
 *   - ROBERTO-MACHADO-MATUTINO-2026-02.pdf
 *
 * ⚠️ ATENÇÃO — E-MAILS PENDENTES
 * As listas de presença NÃO trazem endereços de e-mail (só Nome e CPF).
 * Todos os campos `email` estão vazios ("") e devem ser preenchidos antes de
 * qualquer envio. Use `validarListas()` para conferir o que falta.
 *
 * ⚠️ LGPD — o CPF presente nos PDFs foi deliberadamente OMITIDO deste arquivo.
 * Não adicione CPF aqui: este arquivo é versionado no Git.
 *
 * Última atualização: 03-09-2026
 */

// -----------------------------------------------------------------------------
// UNIDADES / TURMAS
// -----------------------------------------------------------------------------

export const LISTAS_EMAIL = [
  {
    id: 'CEPLAS-MATUTINO-2026-02',
    unidade: 'CEPLAS',
    turno: 'Matutino',
    turma: 'QA LBTSN 2026/1 M2',
    codigoTurma: '124402',
    periodo: '2026/02',
    unidadeCurricular: 'Introdução a comunicação oral e escrita para o mundo do trabalho',
    pastaUC: 'INTRODUCAO_COMUNICACAO_ORAL_ESCRITA',
    curso: 'FICHA-PRODUTO-MAIS-TECH',
    origem: 'LISTAS/CEPLAS-MATUTINO-2026-02.pdf',
    alunos: [
      { n: 1,  nome: 'Bianca Laiza Prado dos Santos',        email: '' },
      { n: 2,  nome: 'Bianca Pamela Coa Diaz',               email: '' },
      { n: 3,  nome: 'Cesar David Perez Gutierrez',          email: '' },
      { n: 4,  nome: 'Christell Alexandra Salazar Ortiz',    email: '' },
      { n: 5,  nome: 'Heloise Felipe Laurentino',            email: '' },
      { n: 6,  nome: 'Israel Gelzleichter Pimentel',         email: '' },
      { n: 7,  nome: 'Izabelly Cristinne dos Santos Lima',   email: '' },
      { n: 8,  nome: 'Jesus David Paraguan Velasquez',       email: '' },
      { n: 9,  nome: 'Jhomar de Jesus Alexander Leon Penaloza', email: '' },
      { n: 10, nome: 'Kamilly Iasmim Ribeiro de Oliveira',   email: '' },
      { n: 11, nome: 'Kauan Victor da Cunha Costa',          email: '' },
      { n: 12, nome: 'Leandro Jorel Rodrigues Borges',       email: '' },
      { n: 13, nome: 'Leticia Lehnert Rodrigues',            email: '' },
      { n: 14, nome: 'Lohan Steinbach da Cruz',              email: '' },
      { n: 15, nome: 'Yeismir Abraham Munoz Vina',           email: '' },
    ],
  },

  {
    id: 'CEPLAS-VESPERTINO-2026-02',
    unidade: 'CEPLAS',
    turno: 'Vespertino',
    turma: 'QA LBTSN 2026/1 M2',
    codigoTurma: '124402',
    periodo: '2026/02',
    unidadeCurricular: 'Competências Socioemocionais e Empreendedorismo',
    pastaUC: 'COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO',
    curso: 'FICHA-PRODUTO-MAIS-TECH',
    origem: 'LISTAS/CEPLAS-VESPERTINO-2026-02.pdf',
    // NOTA: mesma turma (124402) e mesmos 15 alunos da lista matutina.
    // A diferença entre os dois PDFs é apenas a Unidade Curricular.
    alunos: [
      { n: 1,  nome: 'Bianca Laiza Prado dos Santos',        email: '' },
      { n: 2,  nome: 'Bianca Pamela Coa Diaz',               email: '' },
      { n: 3,  nome: 'Cesar David Perez Gutierrez',          email: '' },
      { n: 4,  nome: 'Christell Alexandra Salazar Ortiz',    email: '' },
      { n: 5,  nome: 'Heloise Felipe Laurentino',            email: '' },
      { n: 6,  nome: 'Israel Gelzleichter Pimentel',         email: '' },
      { n: 7,  nome: 'Izabelly Cristinne dos Santos Lima',   email: '' },
      { n: 8,  nome: 'Jesus David Paraguan Velasquez',       email: '' },
      { n: 9,  nome: 'Jhomar de Jesus Alexander Leon Penaloza', email: '' },
      { n: 10, nome: 'Kamilly Iasmim Ribeiro de Oliveira',   email: '' },
      { n: 11, nome: 'Kauan Victor da Cunha Costa',          email: '' },
      { n: 12, nome: 'Leandro Jorel Rodrigues Borges',       email: '' },
      { n: 13, nome: 'Leticia Lehnert Rodrigues',            email: '' },
      { n: 14, nome: 'Lohan Steinbach da Cruz',              email: '' },
      { n: 15, nome: 'Yeismir Abraham Munoz Vina',           email: '' },
    ],
  },

  {
    id: 'ROBERTO-MACHADO-MATUTINO-2026-02',
    unidade: 'Roberto Machado',
    turno: 'Matutino',
    turma: 'QA LBTSN 2026/1 M1',
    codigoTurma: '124401',
    periodo: '2026/02',
    unidadeCurricular: 'Fundamentos da Tecnologia e Programação',
    pastaUC: 'FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO',
    curso: 'FICHA-PRODUTO-MAIS-TECH',
    origem: 'LISTAS/ROBERTO-MACHADO-MATUTINO-2026-02.pdf',
    alunos: [
      { n: 1, nome: 'Ânjuli Rahn Miranda Fagundes',  email: '' },
      { n: 2, nome: 'Brayan Pierry Constante Rocha', email: '' },
      { n: 3, nome: 'Gabriel Machado Jacinto',       email: '' },
      { n: 4, nome: 'Isabella Arceno da Sila',       email: '' },
      { n: 5, nome: 'Juan Elias Palmares Lozada',    email: '' },
      { n: 6, nome: 'Ketlyn Rosa Poepken',           email: '' },
      { n: 7, nome: 'Leandro Ferrari dos Santos',    email: '' },
      { n: 8, nome: 'Mikaias Tamanini',              email: '' },
    ],
  },
];

// -----------------------------------------------------------------------------
// FUNÇÕES AUXILIARES
// -----------------------------------------------------------------------------

/** Separa o nome completo em first_name e last_name (padrão Resend). */
export function separarNome(nomeCompleto) {
  const partes = nomeCompleto.trim().split(/\s+/);
  return {
    first_name: partes[0],
    last_name: partes.slice(1).join(' '),
  };
}

/** Retorna todos os alunos de todas as listas, achatados e com o contexto da turma. */
export function todosOsContatos() {
  return LISTAS_EMAIL.flatMap((lista) =>
    lista.alunos.map((aluno) => ({
      ...aluno,
      ...separarNome(aluno.nome),
      unidade: lista.unidade,
      turno: lista.turno,
      turma: lista.turma,
      codigoTurma: lista.codigoTurma,
      unidadeCurricular: lista.unidadeCurricular,
      curso: lista.curso,
      listaId: lista.id,
    }))
  );
}

/** Busca uma lista pelo id. */
export function listaPorId(id) {
  return LISTAS_EMAIL.find((lista) => lista.id === id);
}

/** Filtra listas por nome da unidade (CEPLAS, Roberto Machado...). */
export function listasPorUnidade(unidade) {
  const alvo = unidade.trim().toLowerCase();
  return LISTAS_EMAIL.filter((lista) => lista.unidade.toLowerCase() === alvo);
}

/**
 * Converte uma lista para o formato de contatos do Resend (Audience).
 * Alunos sem e-mail preenchido são descartados.
 */
export function paraContatosResend(listaId) {
  const lista = listaPorId(listaId);
  if (!lista) throw new Error(`Lista não encontrada: ${listaId}`);

  return lista.alunos
    .filter((aluno) => aluno.email)
    .map((aluno) => ({
      email: aluno.email,
      ...separarNome(aluno.nome),
      unsubscribed: false,
      // propriedades customizadas
      unidade: lista.unidade,
      turno: lista.turno,
      turma: lista.turma,
      codigo_turma: lista.codigoTurma,
      unidade_curricular: lista.unidadeCurricular,
      curso: lista.curso,
    }));
}

/** Gera o CSV de importação do Resend para uma lista. */
export function paraCSV(listaId) {
  const contatos = paraContatosResend(listaId);
  const colunas = [
    'email', 'first_name', 'last_name',
    'unidade', 'turno', 'turma', 'codigo_turma', 'unidade_curricular', 'curso',
  ];
  const escapar = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const linhas = contatos.map((c) => colunas.map((k) => escapar(c[k])).join(','));
  return [colunas.join(','), ...linhas].join('\n');
}

/**
 * Diagnóstico das listas: quantos e-mails faltam, duplicados e formatos inválidos.
 * Rode antes de qualquer importação ou envio.
 */
export function validarListas() {
  const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const vistos = new Map();
  const relatorio = [];

  for (const lista of LISTAS_EMAIL) {
    const semEmail = [];
    const invalidos = [];
    const duplicados = [];

    for (const aluno of lista.alunos) {
      const email = (aluno.email || '').trim().toLowerCase();
      if (!email) { semEmail.push(aluno.nome); continue; }
      if (!RE_EMAIL.test(email)) { invalidos.push(`${aluno.nome} <${aluno.email}>`); continue; }
      if (vistos.has(email)) duplicados.push(`${aluno.nome} (já em ${vistos.get(email)})`);
      else vistos.set(email, lista.id);
    }

    relatorio.push({
      lista: lista.id,
      unidade: lista.unidade,
      unidadeCurricular: lista.unidadeCurricular,
      total: lista.alunos.length,
      comEmail: lista.alunos.length - semEmail.length - invalidos.length,
      semEmail,
      invalidos,
      duplicados,
      pronta: semEmail.length === 0 && invalidos.length === 0 && duplicados.length === 0,
    });
  }

  return relatorio;
}

/** Resumo geral das listas. */
export function resumo() {
  const totalAlunos = LISTAS_EMAIL.reduce((s, l) => s + l.alunos.length, 0);
  const comEmail = todosOsContatos().filter((a) => a.email).length;
  return {
    listas: LISTAS_EMAIL.length,
    unidades: [...new Set(LISTAS_EMAIL.map((l) => l.unidade))],
    totalAlunos,
    comEmail,
    semEmail: totalAlunos - comEmail,
  };
}

export default LISTAS_EMAIL;
