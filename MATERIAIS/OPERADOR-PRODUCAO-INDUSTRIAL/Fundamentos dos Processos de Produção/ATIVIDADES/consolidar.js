const { Document, Packer, Paragraph, TextRun, PageBreak } = require("docx");
const fs = require("fs");

const doc = new Document({
  sections: [{
    children: [
      new Paragraph({ text: "ATIVIDADE CONSOLIDADA — Ferramentas da Qualidade", bold: true, size: 32 }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "Curso: Operador de Produção Industrial — 860h" }),
      new Paragraph({ text: "Unidade Curricular: Fundamentos dos Processos de Produção" }),
      new Paragraph({ text: "Consolidação de 3 Atividades Práticas" }),
      new Paragraph({ text: "" }),
      new PageBreak(),
      new Paragraph({ text: "ATIVIDADE 1 — Checklist de Qualidade", bold: true, size: 24 }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "Missão Técnica: Estruturar um checklist operacional para monitorar linha de produção industrial, evitando defeitos antes que os produtos cheguem ao cliente." }),
      new Paragraph({ text: "" }),
      new PageBreak(),
      new Paragraph({ text: "ATIVIDADE 2 — Planejamento da Qualidade", bold: true, size: 24 }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "Missão Técnica: Modelar um plano de controle metrológico, avaliar riscos de variabilidade, projetar investigação de causa raiz e formular critérios de auditoria 5S." }),
      new Paragraph({ text: "" }),
      new PageBreak(),
      new Paragraph({ text: "ATIVIDADE 3 — Ferramentas da Qualidade", bold: true, size: 24 }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "Missão: Aplicar as 13 ferramentas de qualidade estudadas: Fluxograma, PDCA, Cronograma, Plano de Ação, Ishikawa, Cartas de Controle, Brainstorming, Folha de Verificação, Gráficos, Histogramas, Pareto, 5S e KAIZEN." }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("ATIVIDADE-FERRAMENTAS-DE-QUALIDADE.docx", buffer);
  console.log("✅ Documento criado: ATIVIDADE-FERRAMENTAS-DE-QUALIDADE.docx");
}).catch(err => console.error("Erro:", err));
