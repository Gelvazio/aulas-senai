const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  VerticalAlign, convertMillimetersToTwip
} = require("docx");

const BORDO = "4A0E2A", BORDO2 = "7A2247";
const AMBAR = "FFB300", AMBAR_E = "9C6500", AMBAR_BG = "FFF6E2";
const VERDE = "2E7D4F", VERDE_BG = "EAF6EF";
const AZUL = "1B6CA8", AZUL_BG = "EDF5FB";
const CINZA_BG = "F4F1F2", CINZA_LN = "CFC6CA";
const TEXTO = "1A1A1A";

const MG = convertMillimetersToTwip(14);
const LARG = 11906 - MG * 2;            // 10318 dxa
const COL = Math.floor(LARG / 2) - 60;  // duas colunas

const r = (t, o = {}) => new TextRun({
  text: t, bold: o.b, italics: o.i, size: o.size || 20,
  color: o.color || TEXTO, font: o.font || "Calibri"
});

const p = (t, o = {}) => new Paragraph({
  alignment: o.align || AlignmentType.LEFT,
  spacing: { after: o.after === undefined ? 50 : o.after, line: o.line || 250, before: o.before || 0 },
  indent: o.indent,
  children: [r(t, o)]
});

const semBorda = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
};

const bordas = (c, sz = 4) => ({
  top: { style: BorderStyle.SINGLE, size: sz, color: c },
  bottom: { style: BorderStyle.SINGLE, size: sz, color: c },
  left: { style: BorderStyle.SINGLE, size: sz, color: c },
  right: { style: BorderStyle.SINGLE, size: sz, color: c },
  insideHorizontal: { style: BorderStyle.SINGLE, size: sz, color: c },
  insideVertical: { style: BorderStyle.SINGLE, size: sz, color: c }
});

// título de seção numerado
const secao = (num, texto, cor) => new Paragraph({
  spacing: { before: 0, after: 70 },
  children: [
    r(num + "  ", { b: true, size: 24, color: cor }),
    r(texto, { b: true, size: 22, color: cor })
  ]
});

const item = (t, cor) => new Paragraph({
  spacing: { after: 45, line: 250 },
  indent: { left: 200, hanging: 200 },
  children: [r("▪  ", { b: true, color: cor, size: 20 }), r(t, { size: 20 })]
});

// bloco colorido reutilizável
function bloco(largura, corBorda, corFundo, filhos) {
  return new TableCell({
    width: { size: largura, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: corFundo, color: "auto" },
    margins: { top: 130, bottom: 130, left: 170, right: 150 },
    verticalAlign: VerticalAlign.TOP,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: corBorda },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: corBorda },
      left: { style: BorderStyle.SINGLE, size: 18, color: corBorda },
      right: { style: BorderStyle.SINGLE, size: 4, color: corBorda }
    },
    children: filhos
  });
}

const filhos = [];

// ---------------- CABEÇALHO ----------------
filhos.push(new Table({
  columnWidths: [LARG], width: { size: LARG, type: WidthType.DXA }, borders: semBorda,
  rows: [new TableRow({ children: [new TableCell({
    width: { size: LARG, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: BORDO, color: "auto" },
    margins: { top: 140, bottom: 140, left: 200, right: 200 },
    children: [
      p("RIO DO SUL MAIS TECH  ·  SENAI  ·  PREFEITURA DE RIO DO SUL", { size: 16, color: "E7C9D8", b: true, after: 40 }),
      p("PESQUISA DE CARREIRAS — RELATÓRIO NO WORD", { size: 32, color: "FFFFFF", b: true, after: 40 }),
      p("Exploração de Carreiras Industriais e Tecnológicas  ·  04/09/2026  ·  Individual  ·  Vale 10,0",
        { size: 18, color: "FFD98A" })
    ]
  })] })]
}));

filhos.push(new Paragraph({ spacing: { after: 90 }, children: [r("", { size: 8 })] }));

// ---------------- IDENTIFICAÇÃO ----------------
filhos.push(new Table({
  columnWidths: [Math.round(LARG * 0.56), LARG - Math.round(LARG * 0.56)],
  width: { size: LARG, type: WidthType.DXA }, borders: bordas(CINZA_LN),
  rows: [new TableRow({ children: [
    new TableCell({
      width: { size: Math.round(LARG * 0.56), type: WidthType.DXA },
      margins: { top: 90, bottom: 90, left: 150, right: 120 },
      children: [p("Nome: ______________________________________________", { size: 20 })]
    }),
    new TableCell({
      width: { size: LARG - Math.round(LARG * 0.56), type: WidthType.DXA },
      margins: { top: 90, bottom: 90, left: 150, right: 120 },
      children: [p("Turma: ______________   Polo: ______________", { size: 20 })]
    })
  ] })]
}));

filhos.push(new Paragraph({ spacing: { after: 110 }, children: [r("", { size: 8 })] }));

// ---------------- DUAS COLUNAS ----------------
const colEsq = [
  secao("1", "O QUE FAZER", AZUL),
  item("Escolha DUAS carreiras: uma da indústria (mecânica, elétrica, automação, mecatrônica, segurança do trabalho) e uma de TI (programação, dados, redes, cibersegurança).", AZUL),
  item("Pesquise no computador em 3 sites confiáveis. Copie os endereços num bloco de notas enquanto lê.", AZUL),
  item("Escreva o relatório no Word com as suas palavras — não cole texto pronto da internet.", AZUL),
  item("Salve, confira e entregue (item 4).", AZUL),
  new Paragraph({ spacing: { after: 140 }, children: [r("", { size: 6 })] }),
  secao("2", "O QUE O RELATÓRIO PRECISA TER", VERDE),
  item("Capa: escola, título, seu nome, turma, professor e data.", VERDE),
  item("Carreira 1 e Carreira 2 — para cada uma: o que faz, formação necessária, onde se trabalha, salário inicial.", VERDE),
  item("Comparação: uma tabela com as duas carreiras lado a lado.", VERDE),
  item("Indústria 4.0: como a tecnologia está mudando essas duas profissões.", VERDE),
  item("Meu plano: qual das duas combina mais comigo e o que farei nos próximos anos.", VERDE),
  item("Fontes: lista dos 3 sites usados.", VERDE),
  new Paragraph({ spacing: { after: 60 }, children: [r("Mínimo de 2 páginas, sem contar a capa.", { size: 19, i: true, color: "5E585B" })] })
];

const colDir = [
  secao("3", "FORMATAÇÃO NO WORD", AMBAR_E),
  item("Fonte Calibri ou Arial 12, texto justificado (Ctrl+J).", AMBAR_E),
  item("Títulos com o estilo Título 1 (Página Inicial ▸ Estilos).", AMBAR_E),
  item("Número de página no rodapé (Inserir ▸ Número de Página).", AMBAR_E),
  item("Uma tabela (Inserir ▸ Tabela) e uma imagem com legenda.", AMBAR_E),
  item("Uma lista com marcadores.", AMBAR_E),
  item("Corretor ortográfico antes de entregar (tecla F7).", AMBAR_E),
  new Paragraph({ spacing: { after: 140 }, children: [r("", { size: 6 })] }),
  secao("4", "COMO CITAR AS FONTES", BORDO2),
  new Paragraph({ spacing: { after: 60, line: 250 }, children: [r("No meio do texto, depois de um dado:", { size: 20 })] }),
  new Paragraph({
    spacing: { after: 90, line: 250 }, indent: { left: 200 },
    children: [r("“O salário inicial é de R$ 3.000 (FIESC, 2024).”", { size: 20, i: true, color: BORDO2 })]
  }),
  new Paragraph({ spacing: { after: 60, line: 250 }, children: [r("No final, na lista de fontes:", { size: 20 })] }),
  new Paragraph({
    spacing: { after: 60, line: 250 }, indent: { left: 200 },
    children: [r("FIESC. Indústria em números. Disponível em: fiesc.com.br. Acesso em: 4 set. 2026.", { size: 19, i: true, color: BORDO2 })]
  }),
  new Paragraph({
    spacing: { after: 0, line: 250 },
    children: [r("Sites sugeridos: senai.br · sc.senai.br · fiesc.com.br · portaldaindustria.com.br", { size: 19, color: "5E585B" })]
  })
];

filhos.push(new Table({
  columnWidths: [COL, LARG - COL], width: { size: LARG, type: WidthType.DXA }, borders: semBorda,
  rows: [new TableRow({ children: [
    bloco(COL, AZUL, AZUL_BG, colEsq),
    bloco(LARG - COL, AMBAR, AMBAR_BG, colDir)
  ] })]
}));

filhos.push(new Paragraph({ spacing: { after: 130 }, children: [r("", { size: 8 })] }));

// ---------------- ENTREGA ----------------
filhos.push(new Table({
  columnWidths: [LARG], width: { size: LARG, type: WidthType.DXA }, borders: semBorda,
  rows: [new TableRow({ children: [bloco(LARG, VERDE, VERDE_BG, [
    secao("5", "COMO ENTREGAR", VERDE),
    new Paragraph({
      spacing: { after: 70, line: 250 },
      children: [r("1) Salve o arquivo com este nome: ", { size: 20 }),
                 r("TURMA_SEUNOME_CARREIRAS.docx", { size: 20, b: true, color: BORDO, font: "Consolas" }),
                 r("   (exemplo: 9A_ANA-SOUZA_CARREIRAS.docx)", { size: 19, i: true, color: "5E585B" })]
    }),
    new Paragraph({
      spacing: { after: 70, line: 250 },
      children: [r("2) Copie o arquivo para a pasta do laboratório: ", { size: 20 }),
                 r("_____________________________________________", { size: 20, color: BORDO2 })]
    }),
    new Paragraph({
      spacing: { after: 0, line: 250 },
      children: [r("3) Se terminar em casa, envie pelo link/QR Code que o professor passou em aula. Prazo: até o fim da aula de 04/09/2026.", { size: 20 })]
    })
  ])] })]
}));

filhos.push(new Paragraph({ spacing: { after: 120 }, children: [r("", { size: 8 })] }));

// ---------------- AVALIAÇÃO ----------------
const notas = [
  ["Conteúdo das duas carreiras", "4,0"],
  ["Comparação + Indústria 4.0", "2,0"],
  ["Plano pessoal", "1,5"],
  ["Fontes citadas", "1,5"],
  ["Formatação e entrega", "1,0"]
];
const wNome = Math.round(LARG / 5);
filhos.push(new Table({
  columnWidths: notas.map((_, i) => i === 4 ? LARG - wNome * 4 : wNome),
  width: { size: LARG, type: WidthType.DXA }, borders: bordas(CINZA_LN),
  rows: [
    new TableRow({ children: notas.map((n, i) => new TableCell({
      width: { size: i === 4 ? LARG - wNome * 4 : wNome, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: BORDO, color: "auto" },
      margins: { top: 70, bottom: 70, left: 90, right: 90 },
      children: [p(n[0], { size: 18, b: true, color: "FFFFFF", align: AlignmentType.CENTER, after: 0 })]
    })) }),
    new TableRow({ children: notas.map((n, i) => new TableCell({
      width: { size: i === 4 ? LARG - wNome * 4 : wNome, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: CINZA_BG, color: "auto" },
      margins: { top: 70, bottom: 70, left: 90, right: 90 },
      children: [p(n[1], { size: 22, b: true, color: BORDO, align: AlignmentType.CENTER, after: 0 })]
    })) })
  ]
}));

filhos.push(new Paragraph({
  spacing: { before: 130, after: 0 },
  alignment: AlignmentType.CENTER,
  border: { top: { style: BorderStyle.SINGLE, size: 6, color: AMBAR, space: 5 } },
  children: [r("Copiar texto da internet ou de IA sem citar a fonte zera o item “Fontes citadas”. Escreva com as suas palavras.",
    { size: 19, b: true, color: BORDO })]
}));

// =======================================================================
const doc = new Document({
  creator: "SENAI — Rio do Sul Mais Tech",
  title: "Atividade simplificada — Pesquisa de Carreiras",
  description: "Atividade de uma página: pesquisa no computador e relatório no Word",
  styles: { default: { document: { run: { font: "Calibri", size: 20, color: TEXTO } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: MG, right: MG, bottom: MG, left: MG }
      }
    },
    children: filhos
  }]
});

const destino = process.argv[2];
Packer.toBuffer(doc).then(buf => {
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, buf);
  console.log("OK ->", destino, (buf.length / 1024).toFixed(1) + " KB");
});
