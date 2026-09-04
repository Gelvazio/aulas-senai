const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, Header, Footer, PageNumber, LevelFormat, ImageRun,
  ExternalHyperlink, TableOfContents, VerticalAlign, convertMillimetersToTwip
} = require("docx");
const { ENCONTROS } = require("./conteudo_apostila.js");

const IMG = path.join(__dirname, "img");

// ---------------- paleta ----------------
const BORDO = "4A0E2A";
const BORDO2 = "7A2247";
const AMBAR = "FFB300";
const AMBAR_E = "B37400";
const AMBAR_BG = "FFF4DC";
const AZUL = "1B6CA8", AZUL_BG = "EAF4FC";
const VERDE = "2E9E5B", VERDE_BG = "E7F7EE";
const ROXO = "6A3D9A", ROXO_BG = "F0EAF9";
const VERM = "B3003C", VERM_BG = "FDECEF";
const CINZA_BG = "F4F1F2", CINZA_LN = "D9D2D5";
const TEXTO = "1A1A1A", CINZA_TX = "5E585B";

// ---------------- página A4 / margens ABNT ----------------
const M_ESQ = convertMillimetersToTwip(25);
const M_DIR = convertMillimetersToTwip(20);
const M_SUP = convertMillimetersToTwip(22);
const M_INF = convertMillimetersToTwip(18);
const LARG = 11906 - M_ESQ - M_DIR;          // 9354 dxa
const LARG_PX = Math.round((LARG / 1440) * 96); // ~624 px

// ---------------- helpers de texto ----------------
const run = (t, o = {}) => new TextRun({
  text: t, bold: o.b, italics: o.i, size: o.size || 22,
  color: o.color || TEXTO, font: o.font || "Calibri",
  underline: o.u ? {} : undefined, allCaps: o.caps
});

const P = (t, o = {}) => new Paragraph({
  alignment: o.align || AlignmentType.JUSTIFIED,
  spacing: { after: o.after === undefined ? 140 : o.after, line: o.line || 300, before: o.before || 0 },
  indent: o.indent,
  children: [run(t, o)]
});

const H1 = (t, o = {}) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  pageBreakBefore: !!o.novaPagina,
  spacing: { before: o.before === undefined ? 0 : o.before, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 14, color: AMBAR, space: 5 } },
  children: [run(t, { b: true, size: 32, color: BORDO })]
});

const H2 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 300, after: 140 },
  children: [run(t, { b: true, size: 26, color: BORDO2 })]
});

const H3 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 220, after: 100 },
  children: [run(t, { b: true, size: 23, color: AMBAR_E })]
});

const LI = (t, ref = "marc", lvl = 0) => new Paragraph({
  numbering: { reference: ref, level: lvl },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 70, line: 290 },
  children: [run(t)]
});

const link = (t, url) => new ExternalHyperlink({
  link: url, children: [run(t, { color: "0B57D0", u: true })]
});

const vazio = (n = 120) => new Paragraph({ spacing: { after: n }, children: [run("", { size: 12 })] });

// ---------------- tabelas ----------------
const cellP = (t, o = {}) => new Paragraph({
  alignment: o.align || AlignmentType.LEFT,
  spacing: { before: 60, after: 60, line: 260 },
  children: [run(t, { b: o.b, size: o.size || 20, color: o.color })]
});

const cel = (children, w, o = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined,
  verticalAlign: VerticalAlign.CENTER,
  margins: { top: 70, bottom: 70, left: 110, right: 110 },
  children: Array.isArray(children) ? children : [children]
});

const bordas = (cor) => ({
  top: { style: BorderStyle.SINGLE, size: 4, color: cor },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: cor },
  left: { style: BorderStyle.SINGLE, size: 4, color: cor },
  right: { style: BorderStyle.SINGLE, size: 4, color: cor },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: cor },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: cor }
});

function TAB(pcts, header, linhas) {
  const ws = pcts.map(p => Math.round(LARG * p / 100));
  ws[ws.length - 1] = LARG - ws.slice(0, -1).reduce((a, b) => a + b, 0);
  const rows = [];
  if (header) {
    rows.push(new TableRow({
      tableHeader: true,
      children: header.map((t, i) => cel(cellP(t, { b: true, color: "FFFFFF", align: AlignmentType.CENTER }), ws[i], { fill: BORDO }))
    }));
  }
  linhas.forEach((ln, idx) => {
    rows.push(new TableRow({
      children: ln.map((c, i) => cel(
        typeof c === "string" ? cellP(c, { b: !header && i === 0 }) : c,
        ws[i], { fill: idx % 2 === 1 ? CINZA_BG : undefined }
      ))
    }));
  });
  return new Table({
    columnWidths: ws, width: { size: LARG, type: WidthType.DXA },
    borders: bordas(CINZA_LN), rows
  });
}

// ---------------- caixas de destaque ----------------
const ESTILOS = {
  exemplo:   { fill: AZUL_BG,  borda: AZUL,    tit: AZUL,    ico: "🔎" },
  sabia:     { fill: AMBAR_BG, borda: AMBAR,   tit: AMBAR_E, ico: "💡" },
  mito:      { fill: ROXO_BG,  borda: ROXO,    tit: ROXO,    ico: "⚖️" },
  atividade: { fill: VERDE_BG, borda: VERDE,   tit: VERDE,   ico: "✏️" },
  desafio:   { fill: AMBAR_BG, borda: AMBAR_E, tit: AMBAR_E, ico: "🎯" },
  sintese:   { fill: CINZA_BG, borda: BORDO,   tit: BORDO,   ico: "📌" },
  atencao:   { fill: VERM_BG,  borda: VERM,    tit: VERM,    ico: "⚠️" },
  reflexao:  { fill: ROXO_BG,  borda: ROXO,    tit: ROXO,    ico: "💭" },
  alem:      { fill: CINZA_BG, borda: CINZA_LN, tit: BORDO2, ico: "🔗" }
};

function BOX(tipo, titulo, linhas) {
  const e = ESTILOS[tipo] || ESTILOS.sintese;
  const filhos = [new Paragraph({
    spacing: { after: 110 },
    children: [run(e.ico + "  ", { size: 22 }), run(titulo, { b: true, size: 22, color: e.tit })]
  })];
  linhas.forEach((t, i) => filhos.push(new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: i === linhas.length - 1 ? 0 : 90, line: 290 },
    children: [run(t, { size: 21, color: "3A3336" })]
  })));
  return new Table({
    columnWidths: [LARG], width: { size: LARG, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: e.borda },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: e.borda },
      left: { style: BorderStyle.SINGLE, size: 22, color: e.borda },
      right: { style: BorderStyle.SINGLE, size: 6, color: e.borda },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
    },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: LARG, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: e.fill, color: "auto" },
        margins: { top: 140, bottom: 140, left: 200, right: 160 },
        children: filhos
      })]
    })]
  });
}

// ---------------- imagens ----------------
const dimensoesPng = (buf) => ({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) });

function IMAGEM(arquivo, larguraPx = LARG_PX) {
  const buf = fs.readFileSync(path.join(IMG, arquivo));
  const { w, h } = dimensoesPng(buf);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 60 },
    children: [new ImageRun({
      type: "png", data: buf,
      transformation: { width: larguraPx, height: Math.round(larguraPx * h / w) }
    })]
  });
}

const LEGENDA = (t) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [run(t, { size: 18, i: true, color: CINZA_TX })]
});

const COD = (t) => new Table({
  columnWidths: [LARG], width: { size: LARG, type: WidthType.DXA },
  borders: bordas("2B2B2B"),
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: LARG, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: "1E1E1E", color: "auto" },
      margins: { top: 140, bottom: 140, left: 200, right: 160 },
      children: t.split("\n").map(ln => new Paragraph({
        spacing: { after: 40 },
        children: [run(ln, { font: "Consolas", size: 20, color: "9CDCFE" })]
      }))
    })]
  })]
});

// ---------------- renderizador de blocos ----------------
function render(blocos) {
  const out = [];
  for (const b of blocos) {
    switch (b[0]) {
      case "h2": out.push(H2(b[1])); break;
      case "h3": out.push(H3(b[1])); break;
      case "p": out.push(P(b[1])); break;
      case "li": b[1].forEach(t => out.push(LI(t, "marc"))); out.push(vazio(60)); break;
      case "num": b[1].forEach(t => out.push(LI(t, "num"))); out.push(vazio(60)); break;
      case "img": out.push(IMAGEM(b[1])); out.push(LEGENDA(b[2])); break;
      case "box": out.push(BOX(b[1], b[2], b[3])); out.push(vazio(160)); break;
      case "tab": out.push(vazio(60)); out.push(TAB(b[1], b[2], b[3])); out.push(vazio(160)); break;
      case "cod": out.push(vazio(60)); out.push(COD(b[1])); out.push(vazio(160)); break;
      case "linha": out.push(vazio(120)); break;
    }
  }
  return out;
}

// =======================================================================
//  MONTAGEM DO DOCUMENTO
// =======================================================================
const doc0 = [];

// ---------- CAPA ----------
doc0.push(IMAGEM("01_capa.png", LARG_PX));
doc0.push(vazio(240));
doc0.push(TAB([32, 68], null, [
  ["Unidade Curricular", "Exploração de Carreiras Industriais e Tecnológicas"],
  ["Carga horária", "36 horas presenciais — 18 encontros de 2 horas"],
  ["Programa", "Rio do Sul Mais Tech — Iniciação Profissional"],
  ["Instituição", "SENAI / Prefeitura Municipal de Rio do Sul"],
  ["Público-alvo", "Alunos do 8º e 9º ano do Ensino Fundamental (12 a 15 anos)"],
  ["Material", "Apostila do Aluno — edição ilustrada"]
]));
doc0.push(vazio(400));
doc0.push(BOX("sintese", "ESTA APOSTILA É SUA", [
  "Nome: _________________________________________________________________________",
  "Turma: ______________________   Polo (LabTEC): ______________________________",
  "Professor: ____________________________________________________________________"
]));

// ---------- SUMÁRIO ----------
doc0.push(new Paragraph({ children: [new PageBreak()] }));
doc0.push(H1("Sumário"));
doc0.push(P("Este sumário é automático. No Word, clique com o botão direito sobre ele e escolha “Atualizar campo” para renumerar as páginas.",
  { i: true, size: 20, color: CINZA_TX }));
doc0.push(new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-2" }));

// ---------- ABERTURA ----------
doc0.push(H1("Sobre este material", { novaPagina: true }));
doc0.push(P("Esta apostila foi criada especialmente para você, que está dando os primeiros passos na jornada de descoberta do seu futuro profissional. Aqui você vai encontrar textos, ilustrações, exemplos reais, atividades, dinâmicas e reflexões que vão te ajudar a conhecer o mundo do trabalho industrial e tecnológico — e a descobrir o seu lugar nele."));
doc0.push(P("Não existe resposta certa ou errada nesta jornada. O que existe é curiosidade, autoconhecimento e vontade de crescer. E isso você já tem!"));

doc0.push(H2("Quem você quer ser?"));
doc0.push(P("Você já parou para imaginar como estará daqui a 10 anos? Onde vai trabalhar? O que vai criar, construir ou resolver? O mundo está mudando muito rápido — e as profissões estão mudando junto. Hoje existem carreiras incríveis nas áreas industrial e tecnológica que poucos jovens conhecem. E é exatamente isso que vamos explorar juntos nesta Unidade Curricular."));
doc0.push(P("Seja curioso. Seja ousado. Pergunte muito. Esta apostila é um mapa — e você é o explorador."));

doc0.push(H2("Como esta apostila está organizada"));
doc0.push(P("São 18 encontros de 2 horas cada, totalizando 36 horas de aprendizagem, agrupados em quatro etapas:"));
doc0.push(IMAGEM("19_trilha.png"));
doc0.push(LEGENDA("Figura A — A sua trilha nesta Unidade Curricular, do autoconhecimento ao projeto final."));

doc0.push(H2("Os selos que aparecem nas páginas"));
doc0.push(P("Ao longo dos encontros, você vai encontrar caixas coloridas. Cada uma tem uma função:"));
doc0.push(vazio(60));
doc0.push(TAB([26, 74], ["Selo", "O que significa"], [
  ["🔎 EXEMPLO REAL", "Um caso concreto do mundo do trabalho, para você ver a teoria acontecendo"],
  ["💡 VOCÊ SABIA?", "Uma curiosidade que ajuda a fixar o conteúdo"],
  ["⚖️ MITO × VERDADE", "Uma crença comum confrontada com o que os dados mostram"],
  ["⚠️ ATENÇÃO", "Segurança, cuidados e informações que não podem passar batido"],
  ["✏️ ATIVIDADE", "A tarefa principal do encontro, feita em aula"],
  ["🎯 MINI-DESAFIO", "Uma missão curta para fazer fora da aula, durante a semana"],
  ["💭 PARA PENSAR", "Uma pergunta sem resposta pronta, para refletir"],
  ["📌 SÍNTESE", "O resumo do encontro em poucas linhas"]
]));
doc0.push(vazio(200));

doc0.push(H2("Objetivo da Unidade Curricular"));
doc0.push(P("Ao concluir esta Unidade Curricular, você será capaz de:"));
["Identificar carreiras nas áreas industrial e tecnológica.",
 "Compreender as mudanças do mercado de trabalho e as tendências do futuro.",
 "Conhecer seus próprios interesses e habilidades.",
 "Dar os primeiros passos no planejamento da sua vida profissional.",
 "Construir um currículo básico e um perfil profissional inicial."
].forEach(t => doc0.push(LI(t)));

doc0.push(H2("Percurso de aprendizagem"));
doc0.push(vazio(60));
doc0.push(TAB([12, 62, 26], ["Encontro", "Tema", "Etapa"],
  ENCONTROS.map(e => [
    cellP(String(e.n), { align: AlignmentType.CENTER, b: true }),
    cellP(`${e.icone}  ${e.titulo}`),
    cellP(e.tema, { align: AlignmentType.CENTER, color: BORDO2, b: true })
  ]).concat([[
    cellP("TOTAL", { b: true, align: AlignmentType.CENTER }),
    cellP("18 encontros de 2 horas", { b: true }),
    cellP("36 horas", { b: true, align: AlignmentType.CENTER })
  ]])
));

// ---------- ENCONTROS ----------
ENCONTROS.forEach(e => {
  doc0.push(H1(`Encontro ${e.n} — ${e.titulo}`, { novaPagina: true }));
  doc0.push(TAB([34, 33, 33], null, [[
    cellP(`${e.icone}  Encontro ${e.n}`, { b: true, color: BORDO, align: AlignmentType.CENTER }),
    cellP(`Duração: ${e.ch}`, { align: AlignmentType.CENTER }),
    cellP(`Etapa: ${e.tema}`, { align: AlignmentType.CENTER, color: BORDO2, b: true })
  ]]));
  doc0.push(vazio(180));
  doc0.push(H2("Objetivos do encontro"));
  e.objetivos.forEach(o => doc0.push(LI(o)));
  doc0.push(vazio(80));
  render(e.blocos).forEach(x => doc0.push(x));
});

// ---------- GLOSSÁRIO ----------
doc0.push(H1("Glossário", { novaPagina: true }));
doc0.push(P("As palavras que mais aparecem nesta apostila — e que você vai ouvir muito no mundo do trabalho."));
doc0.push(vazio(60));
doc0.push(TAB([26, 74], ["Termo", "Definição"], [
  ["Automação", "Uso de máquinas e sistemas para realizar tarefas sem intervenção humana direta"],
  ["Big Data", "Conjuntos de dados extremamente grandes que exigem ferramentas especiais para processamento"],
  ["Cibersegurança", "Conjunto de práticas para proteger sistemas, redes e dados digitais contra ataques"],
  ["CLP", "Controlador Lógico Programável — o “cérebro” das máquinas industriais automatizadas"],
  ["Cobot", "Robô colaborativo, projetado para trabalhar junto com humanos com segurança"],
  ["Elevator pitch", "Apresentação pessoal rápida e impactante, de 30 a 60 segundos"],
  ["EPI", "Equipamento de Proteção Individual — capacete, luva, óculos, protetor auricular e afins"],
  ["Hard skills", "Habilidades técnicas mensuráveis e aprendidas formalmente"],
  ["Indústria 4.0", "Quarta Revolução Industrial, marcada pela integração de tecnologias digitais na produção"],
  ["IoT", "Internet das Coisas — objetos e máquinas conectados à internet"],
  ["Jovem Aprendiz", "Programa legal que permite a jovens de 14 a 24 anos trabalhar com carteira assinada e estudar"],
  ["LGPD", "Lei Geral de Proteção de Dados (nº 13.709/2018), que regula o uso de dados pessoais no Brasil"],
  ["Machine Learning", "Subcampo da IA em que algoritmos aprendem com dados sem serem explicitamente programados"],
  ["Mecatrônica", "Área que integra mecânica, eletrônica, computação e controle"],
  ["Networking", "Construção e manutenção de relacionamentos profissionais"],
  ["NR-10", "Norma Regulamentadora de segurança em instalações e serviços com eletricidade"],
  ["SCADA", "Sistema de Supervisão e Aquisição de Dados, que monitora e controla processos industriais"],
  ["Soft skills", "Habilidades comportamentais e interpessoais (comunicação, liderança, colaboração)"],
  ["Tecnólogo", "Curso de educação superior de curta duração (2 a 3 anos) focado em uma área específica"]
]));

// ---------- ANEXOS ----------
doc0.push(H1("Anexo I — Fichas para preencher", { novaPagina: true }));
doc0.push(P("Use estas fichas ao longo da UC. Elas alimentam diretamente o seu projeto final."));

doc0.push(H2("Ficha 1 — Meu mapa de habilidades (Encontro 10)"));
doc0.push(vazio(60));
doc0.push(TAB([22, 39, 39], ["Categoria", "O que eu TENHO", "O que eu QUERO desenvolver"], [
  ["Hard Skills", "\n\n", "\n\n"], ["Soft Skills", "\n\n", "\n\n"],
  ["Interesses", "\n\n", "\n\n"], ["Valores", "\n\n", "\n\n"]
]));
doc0.push(vazio(200));

doc0.push(H2("Ficha 2 — Meu plano em três horizontes (Encontro 11)"));
doc0.push(vazio(60));
doc0.push(TAB([24, 76], ["Horizonte", "Meus marcos (mínimo 3 em cada linha)"], [
  ["Curto prazo\n1 a 2 anos", "\n\n"], ["Médio prazo\n3 a 5 anos", "\n\n"], ["Longo prazo\n5 a 10 anos", "\n\n"]
]));
doc0.push(vazio(200));

doc0.push(H2("Ficha 3 — Duas carreiras que quero investigar"));
doc0.push(vazio(60));
doc0.push(TAB([28, 36, 36], ["Item", "Carreira industrial", "Carreira de TI"], [
  ["Nome da carreira", " ", " "], ["O que faz no dia a dia", "\n", "\n"],
  ["Formação necessária", "\n", "\n"], ["Onde se trabalha", "\n", "\n"],
  ["Faixa salarial inicial", " ", " "], ["Fonte da informação", "\n", "\n"],
  ["Por que me interessa", "\n", "\n"]
]));
doc0.push(vazio(200));

doc0.push(H2("Ficha 4 — Meus três próximos passos"));
doc0.push(P("Escreva ações que você consiga começar nos próximos 30 dias. Quanto mais específico, maior a chance de acontecer."));
doc0.push(vazio(60));
doc0.push(TAB([8, 56, 18, 18], ["Nº", "Ação concreta", "Até quando", "Feito?"], [
  ["1", "\n", " ", "(   )"], ["2", "\n", " ", "(   )"], ["3", "\n", " ", "(   )"]
]));

// ---------- REFERÊNCIAS ----------
doc0.push(H1("Referências e onde aprender mais", { novaPagina: true }));
doc0.push(H2("Livros e publicações"));
doc0.push(P("SCHWAB, Klaus. A Quarta Revolução Industrial. São Paulo: Edipro, 2016.", { indent: { left: 400, hanging: 400 } }));
doc0.push(P("HARARI, Yuval Noah. 21 Lições para o Século 21. São Paulo: Companhia das Letras, 2018.", { indent: { left: 400, hanging: 400 } }));
doc0.push(P("SENAI. Departamento Nacional. Mapa do Trabalho Industrial 2022–2025. Brasília: SENAI, 2022.", { indent: { left: 400, hanging: 400 } }));
doc0.push(P("FÓRUM ECONÔMICO MUNDIAL. The Future of Jobs Report 2023. Genebra: WEF, 2023.", { indent: { left: 400, hanging: 400 } }));
doc0.push(P("BRASIL. Lei nº 13.709, de 14 de agosto de 2018 — Lei Geral de Proteção de Dados Pessoais (LGPD).", { indent: { left: 400, hanging: 400 } }));

doc0.push(H2("Sites e plataformas"));
[["SENAI Santa Catarina — cursos técnicos da região", "https://sc.senai.br"],
 ["Mundo SENAI — conteúdos e trilhas de aprendizagem", "https://mundosenai.com.br"],
 ["Portal da Indústria / CNI — Indústria 4.0", "https://www.portaldaindustria.com.br"],
 ["FIESC — a indústria catarinense", "https://fiesc.com.br"],
 ["Khan Academy — matemática e ciências, gratuito", "https://pt.khanacademy.org"],
 ["Coursera — cursos com certificado", "https://www.coursera.org"],
 ["Guia de Profissões FUVEST", "https://www.fuvest.br"],
 ["Replit — programar direto no navegador", "https://replit.com"],
 ["Scratch — programação em blocos", "https://scratch.mit.edu"]
].forEach(([nome, url]) => doc0.push(new Paragraph({
  numbering: { reference: "marc", level: 0 },
  spacing: { after: 80, line: 290 },
  children: [run(nome + " — "), link(url, url)]
})));

doc0.push(H2("Canais recomendados"));
[["Fabio Akita", "tecnologia e carreira em TI"],
 ["Código Fonte TV", "programação e tecnologia"],
 ["Manual do Mundo", "ciência e engenharia aplicadas ao dia a dia"],
 ["Canal do SENAI", "formação técnica e profissional"]
].forEach(([n, d]) => doc0.push(LI(`${n} — ${d}`)));

doc0.push(vazio(300));
doc0.push(BOX("sintese", "CRÉDITOS", [
  "Material pedagógico desenvolvido para o Programa Rio do Sul Mais Tech — SENAI / Prefeitura Municipal de Rio do Sul.",
  "Unidade Curricular: Exploração de Carreiras Industriais e Tecnológicas (36 horas).",
  "Ilustrações originais produzidas para esta edição.",
  "Proibida a reprodução comercial sem autorização."
]));

// =======================================================================
const doc = new Document({
  creator: "SENAI — Rio do Sul Mais Tech",
  title: "Apostila — Exploração de Carreiras Industriais e Tecnológicas",
  description: "Apostila do aluno ilustrada, 36 horas, 18 encontros",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22, color: TEXTO } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 32, bold: true, color: BORDO } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 26, bold: true, color: BORDO2 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 23, bold: true, color: AMBAR_E } }
    ]
  },
  numbering: {
    config: [
      { reference: "marc", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "●", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 500, hanging: 250 } }, run: { color: AMBAR } } },
        { level: 1, format: LevelFormat.BULLET, text: "○", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1000, hanging: 250 } }, run: { color: AMBAR } } }
      ]},
      { reference: "num", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 560, hanging: 300 } }, run: { bold: true, color: BORDO } } }
      ]}
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: M_SUP, right: M_DIR, bottom: M_INF, left: M_ESQ }
      },
      titlePage: true
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT, spacing: { after: 60 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: AMBAR, space: 3 } },
        children: [run("Exploração de Carreiras Industriais e Tecnológicas  ·  Rio do Sul Mais Tech · SENAI",
          { size: 16, color: BORDO2 })]
      })] }),
      first: new Header({ children: [new Paragraph({ children: [] })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: CINZA_LN, space: 3 } },
        children: [
          run("Apostila do Aluno  ·  36 horas    |    Página ", { size: 16, color: "666666" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "666666", font: "Calibri", bold: true }),
          run(" de ", { size: 16, color: "666666" }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: "666666", font: "Calibri", bold: true })
        ]
      })] }),
      first: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [run("SENAI · Prefeitura Municipal de Rio do Sul · Rio do Sul — Santa Catarina",
          { size: 16, color: "666666" })]
      })] })
    },
    children: doc0
  }]
});

const destino = process.argv[2];
Packer.toBuffer(doc).then(buf => {
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, buf);
  console.log("OK ->", destino, (buf.length / 1024 / 1024).toFixed(2) + " MB");
});
