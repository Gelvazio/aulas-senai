const PptxGenJS = require("pptxgenjs");
const path = require("path");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_16x9";

// Paleta
const COR_LARANJA = "E65100";
const COR_AMARELO = "FFD600";
const COR_FUNDO = "FFF8E1";
const COR_TEXTO = "212121";
const COR_BRANCO = "FFFFFF";
const COR_ALERTA = "B71C1C";
const COR_ALERTA_BG = "FFEBEE";
const RODAPE = "Rio do Sul Mais Tech  ·  SENAI  ·  UC: Noções de Eletricidade";

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────
function addRodape(slide) {
  slide.addText(RODAPE, {
    x: 0, y: 6.8, w: "100%", h: 0.35,
    fontSize: 9, color: COR_BRANCO, bold: false,
    align: "center",
    fill: { color: COR_LARANJA },
  });
}

function slideApresentacao(titulo, subtitulo, opts = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: COR_FUNDO };
  // Barra superior
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 1.1, fill: { color: COR_LARANJA } });
  // Acento amarelo
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 1.1, w: "100%", h: 0.1, fill: { color: COR_AMARELO } });
  slide.addText(titulo, {
    x: 0.4, y: 0.1, w: 9.2, h: 0.9,
    fontSize: opts.titleSize || 30, bold: true, color: COR_BRANCO,
    align: "center", valign: "middle",
  });
  if (subtitulo) {
    slide.addText(subtitulo, {
      x: 0.4, y: 1.3, w: 9.2, h: 5.3,
      fontSize: opts.subSize || 18, color: COR_TEXTO,
      align: opts.align || "center", valign: "top",
      wrap: true,
    });
  }
  addRodape(slide);
  return slide;
}

function slideConteudo(titulo, bullets, opts = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: COR_FUNDO };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.85, fill: { color: COR_LARANJA } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0.85, w: "100%", h: 0.07, fill: { color: COR_AMARELO } });
  slide.addText(titulo, {
    x: 0.3, y: 0.05, w: 9.4, h: 0.75,
    fontSize: 22, bold: true, color: COR_BRANCO,
    align: "left", valign: "middle",
  });
  const bodyH = opts.alertaTexto ? 4.2 : 5.5;
  slide.addText(bullets.map(b => ({
    text: b.text,
    options: {
      bullet: b.bullet !== false ? { type: "bullet", characterCode: b.bullet === "num" ? undefined : "2022", indent: b.indent || 15 } : false,
      fontSize: b.size || 15,
      bold: b.bold || false,
      color: b.color || COR_TEXTO,
      breakLine: true,
      paraSpaceBefore: b.space || 4,
    }
  })), {
    x: 0.4, y: 1.0, w: 9.2, h: bodyH,
    valign: "top", wrap: true,
  });
  if (opts.alertaTexto) {
    slide.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.4, w: 9.2, h: 1.1, fill: { color: COR_ALERTA_BG }, line: { color: COR_ALERTA, width: 2 } });
    slide.addText(opts.alertaTexto, {
      x: 0.5, y: 5.45, w: 9.0, h: 1.0,
      fontSize: 13, bold: true, color: COR_ALERTA,
      align: "left", valign: "middle", wrap: true,
    });
  }
  addRodape(slide);
  return slide;
}

function slideDois(titulo, col1titulo, col1bullets, col2titulo, col2bullets) {
  const slide = pptx.addSlide();
  slide.background = { color: COR_FUNDO };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.85, fill: { color: COR_LARANJA } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0.85, w: "100%", h: 0.07, fill: { color: COR_AMARELO } });
  slide.addText(titulo, {
    x: 0.3, y: 0.05, w: 9.4, h: 0.75,
    fontSize: 22, bold: true, color: COR_BRANCO,
    align: "left", valign: "middle",
  });
  // Coluna 1
  slide.addText(col1titulo, { x: 0.3, y: 1.0, w: 4.5, h: 0.4, fontSize: 14, bold: true, color: COR_LARANJA });
  slide.addText(col1bullets.map(b => ({ text: b, options: { bullet: { type: "bullet" }, fontSize: 13, color: COR_TEXTO, breakLine: true, paraSpaceBefore: 5 } })),
    { x: 0.3, y: 1.4, w: 4.5, h: 5.0, valign: "top", wrap: true });
  // Divider
  slide.addShape(pptx.ShapeType.line, { x: 4.95, y: 1.0, w: 0, h: 5.5, line: { color: COR_AMARELO, width: 2 } });
  // Coluna 2
  slide.addText(col2titulo, { x: 5.1, y: 1.0, w: 4.5, h: 0.4, fontSize: 14, bold: true, color: COR_LARANJA });
  slide.addText(col2bullets.map(b => ({ text: b, options: { bullet: { type: "bullet" }, fontSize: 13, color: COR_TEXTO, breakLine: true, paraSpaceBefore: 5 } })),
    { x: 5.1, y: 1.4, w: 4.5, h: 5.0, valign: "top", wrap: true });
  addRodape(slide);
  return slide;
}

// ══════════════════════════════════════════════
// SLIDES 1–15  (apresentação existente)
// ══════════════════════════════════════════════

// Slide 1 — Capa
{
  const slide = pptx.addSlide();
  slide.background = { color: COR_LARANJA };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 4.5, w: "100%", h: 0.12, fill: { color: COR_AMARELO } });
  slide.addText("⚡ NOÇÕES DE ELETRICIDADE\nE CIRCUITOS BÁSICOS", {
    x: 0.5, y: 0.7, w: 9.0, h: 2.5,
    fontSize: 38, bold: true, color: COR_BRANCO,
    align: "center", valign: "middle",
  });
  slide.addText("Rio do Sul Mais Tech  ·  SENAI / Prefeitura Municipal de Rio do Sul", {
    x: 0.5, y: 3.3, w: 9.0, h: 0.5,
    fontSize: 14, color: COR_AMARELO, align: "center",
  });
  slide.addText("Carga Horária: 36h  ·  Módulo Único  ·  Área: Eletroeletrônica", {
    x: 0.5, y: 3.9, w: 9.0, h: 0.4,
    fontSize: 13, color: COR_BRANCO, align: "center",
  });
  addRodape(slide);
}

// Slide 2 — Apresentação
slideApresentacao(
  "Bem-vindo(a) ao Mundo da Eletricidade!",
  "Você acorda e liga a luz. Carrega o celular. Usa o micro-ondas. Liga a televisão...\n\nTudo isso funciona graças à ELETRICIDADE!\n\nNesta UC você vai descobrir COMO e POR QUÊ isso funciona, e aprender a trabalhar com eletricidade de forma segura.",
  { subSize: 17 }
);

// Slide 3 — Objetivo
slideConteudo("Objetivo da UC", [
  { text: "Proporcionar conhecimento fundamental sobre os princípios da eletricidade e conceitos essenciais para:", bold: true, bullet: false },
  { text: "Compreender, analisar e construir circuitos elétricos simples" },
  { text: "Utilizar instrumentos de medição elétrica com segurança" },
  { text: "Interpretar e executar diagramas elétricos" },
  { text: "Aplicar normas de segurança (NR 10) e EPIs" },
  { text: "Realizar diagnóstico de falhas em circuitos" },
  { text: "Desenvolver habilidades práticas e senso crítico de segurança", bold: true },
]);

// Slide 4 — Capacidades Técnicas
slideConteudo("Capacidades Técnicas", [
  { text: "Aplicar normas técnicas e segurança em atividades com eletricidade" },
  { text: "Identificar grandezas elétricas: tensão, corrente, resistência e potência" },
  { text: "Identificar e utilizar instrumentos de medição elétrica" },
  { text: "Identificar componentes e equipamentos de circuitos elétricos" },
  { text: "Interpretar e executar diagramas elétricos simples" },
  { text: "Realizar montagem de circuitos elétricos básicos" },
  { text: "Aplicar técnicas de diagnóstico de falhas em circuitos" },
  { text: "Aplicar NR 10, EPI e EPC em situações reais" },
]);

// Slide 5 — Percurso de Aprendizagem parte 1
slideConteudo("Percurso de Aprendizagem (Encontros 1–9)", [
  { text: "Encontro 1 — O que é eletricidade? Átomos, elétrons e cargas elétricas (2h)", size: 14 },
  { text: "Encontro 2 — Grandezas elétricas: Tensão (V) e Corrente (A) (2h)", size: 14 },
  { text: "Encontro 3 — Grandezas elétricas: Resistência (Ω) e Potência (W) (2h)", size: 14 },
  { text: "Encontro 4 — Lei de Ohm: a equação que explica tudo (2h)", size: 14 },
  { text: "Encontro 5 — Instrumentos de medição: voltímetro, amperímetro e multímetro (2h)", size: 14 },
  { text: "Encontro 6 — Circuitos em série e em paralelo (2h)", size: 14 },
  { text: "Encontro 7 — Diagramas elétricos: aprendendo a ler e desenhar (2h)", size: 14 },
  { text: "Encontro 8 — Condutores, isolantes e fios elétricos (2h)", size: 14 },
  { text: "Encontro 9 — Interruptores simples e paralelo (three-way) (2h)", size: 14 },
]);

// Slide 6 — Percurso de Aprendizagem parte 2
slideConteudo("Percurso de Aprendizagem (Encontros 10–18)", [
  { text: "Encontro 10 — Tomadas, plugues e padrão ABNT (2h)", size: 14 },
  { text: "Encontro 11 — Tipos de lâmpadas: do incandescente ao LED (2h)", size: 14 },
  { text: "Encontro 12 — Automação residencial: fotocélula, sensor de presença e timer (2h)", size: 14 },
  { text: "Encontro 13 — Proteção elétrica: disjuntores e dispositivos DR (2h)", size: 14 },
  { text: "Encontro 14 — Motores, ventiladores e moto-bombas: conceitos básicos (2h)", size: 14 },
  { text: "Encontro 15 — Diagnóstico de falhas em circuitos elétricos (2h)", size: 14 },
  { text: "Encontro 16 — Segurança do trabalho: NR 10, EPI e EPC (2h)", size: 14 },
  { text: "Encontro 17 — Primeiros socorros em acidentes elétricos e prevenção de incêndios (2h)", size: 14 },
  { text: "Encontro 18 — Projeto integrador: montagem e apresentação de circuito (2h)", size: 14 },
]);

// Slide 7 — Metodologia
slideConteudo("Como Vamos Aprender?", [
  { text: "Aulas expositivas dialogadas com exemplos do cotidiano" },
  { text: "Atividades práticas de montagem de circuitos simples" },
  { text: "Simuladores virtuais: Tinkercad Circuits e Falstad Circuit Simulator" },
  { text: "Visitas técnicas ou vídeos de instalações reais" },
  { text: "Projetos integradores em grupo" },
  { text: "Avaliações formativas e práticas" },
  { text: "", bullet: false },
  { text: "Você vai colocar a mão na massa!", bold: true, color: COR_LARANJA, bullet: false },
]);

// Slide 8 — Avaliação
slideConteudo("Como Você Será Avaliado?", [
  { text: "Avaliação Teórica", bold: true, size: 16 },
  { text: "Provas e testes escritos sobre grandezas, segurança e instalações", indent: 25, size: 14 },
  { text: "Avaliação Prática", bold: true, size: 16, space: 10 },
  { text: "Montagem de circuitos, uso do multímetro, interpretação de diagramas", indent: 25, size: 14 },
  { text: "Participação e Atitude", bold: true, size: 16, space: 10 },
  { text: "Postura de segurança, trabalho em equipe, organização", indent: 25, size: 14 },
]);

// Slide 9 — Materiais e Recursos
slideConteudo("Materiais e Recursos", [
  { text: "Apostila do Aluno — seu guia para os 18 encontros" },
  { text: "Kit de bancada — fios, lâmpadas, interruptores, tomadas, multímetro" },
  { text: "Simulador Tinkercad Circuits (gratuito, online, sem instalação)" },
  { text: "Simulador Falstad Circuit (gratuito, online)" },
  { text: "Vídeos demonstrativos e materiais complementares" },
  { text: "Normas: ABNT NBR 5410, NBR 14136 e NR 10 (disponíveis digitalmente)" },
]);

// Slide 10 — Blocos de Conteúdo
slideConteudo("Blocos de Conteúdo da UC", [
  { text: "BLOCO 1 — Fundamentos da Eletricidade", bold: true, color: COR_LARANJA, bullet: false, size: 16 },
  { text: "Grandezas, Lei de Ohm, instrumentos de medição, circuitos", indent: 20, size: 14 },
  { text: "BLOCO 2 — Circuitos e Instalações", bold: true, color: COR_LARANJA, bullet: false, size: 16, space: 8 },
  { text: "Condutores, interruptores, tomadas, lâmpadas, automação, proteção", indent: 20, size: 14 },
  { text: "BLOCO 3 — Segurança Elétrica", bold: true, color: COR_LARANJA, bullet: false, size: 16, space: 8 },
  { text: "NR 10, EPI, EPC, primeiros socorros, prevenção de incêndios", indent: 20, size: 14 },
  { text: "BLOCO 4 — Diagnóstico de Falhas", bold: true, color: COR_LARANJA, bullet: false, size: 16, space: 8 },
  { text: "Inspeção visual, testes com multímetro, técnicas de localização", indent: 20, size: 14 },
]);

// Slide 11 — Por que eletricidade é importante?
slideConteudo("Por que Estudar Eletricidade?", [
  { text: "É um dos conhecimentos mais úteis e práticos do dia a dia" },
  { text: "Profissão em alta demanda: eletricistas são sempre necessários" },
  { text: "Base para áreas como automação, TI, robótica, energia solar" },
  { text: "Entender eletricidade torna você mais seguro em casa e no trabalho" },
  { text: "Permite economizar energia e tomar decisões inteligentes de consumo" },
  { text: "", bullet: false },
  { text: "No Brasil, acidentes elétricos causam +500 mortes por ano — conhecimento salva vidas!", bold: true, color: COR_ALERTA, bullet: false, size: 14 },
]);

// Slide 12 — Regras de Segurança da UC
slideConteudo("Regras de Segurança — Nossa UC", [
  { text: "NUNCA toque em partes energizadas sem orientação do professor", bold: true, color: COR_ALERTA },
  { text: "NUNCA realize ligações ou desligamentos sem autorização" },
  { text: "Informe imediatamente qualquer fio solto, cheiro ou faísca" },
  { text: "Use os EPIs fornecidos sempre que solicitado" },
  { text: "Mantenha a bancada organizada — fios soltos causam acidentes" },
  { text: "Em caso de dúvida: PARE e PERGUNTE ao professor" },
  { text: "", bullet: false },
  { text: "⚠  A segurança vem primeiro — sempre!", bold: true, color: COR_LARANJA, bullet: false, size: 16 },
]);

// Slide 13 — O que você vai conseguir fazer ao final?
slideConteudo("Ao Final desta UC você será capaz de...", [
  { text: "Explicar o que é eletricidade, tensão, corrente, resistência e potência" },
  { text: "Usar um multímetro para medir grandezas elétricas" },
  { text: "Montar circuitos elétricos simples e interpretar seus diagramas" },
  { text: "Instalar interruptores, tomadas e lâmpadas com segurança" },
  { text: "Identificar e selecionar o tipo correto de disjuntor e DR" },
  { text: "Aplicar as regras da NR 10 e usar os EPIs adequados" },
  { text: "Realizar diagnóstico básico de falhas em circuitos elétricos" },
  { text: "Agir corretamente em caso de acidente elétrico ou incêndio" },
]);

// Slide 14 — Dicas de Estudo
slideConteudo("Dicas para Aprender Bem", [
  { text: "Relacione o conteúdo com o que você vê em casa e no cotidiano" },
  { text: "Anote suas dúvidas e traga para o próximo encontro" },
  { text: "Pratique no simulador Tinkercad — é gratuito e muito didático" },
  { text: "Observe as instalações elétricas ao seu redor com olhos de técnico" },
  { text: "Leia a apostila antes de cada encontro — 15 minutos já ajudam" },
  { text: "Trabalhe em equipe: quem ensina aprende duas vezes" },
  { text: "", bullet: false },
  { text: "Tinkercad: tinkercad.com  |  Falstad: falstad.com/circuit", bold: true, color: COR_LARANJA, bullet: false, size: 13 },
]);

// Slide 15 — Vamos começar!
{
  const slide = pptx.addSlide();
  slide.background = { color: COR_LARANJA };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 3.5, w: "100%", h: 0.12, fill: { color: COR_AMARELO } });
  slide.addText("Vamos Começar?", {
    x: 0.5, y: 1.0, w: 9.0, h: 1.5,
    fontSize: 44, bold: true, color: COR_BRANCO, align: "center",
  });
  slide.addText("A eletricidade está em tudo ao seu redor.\nAgora você vai entender como ela funciona.", {
    x: 0.5, y: 2.8, w: 9.0, h: 1.2,
    fontSize: 18, color: COR_AMARELO, align: "center",
  });
  slide.addText("⚡  Bem-vindo(a) ao Mundo da Eletricidade!", {
    x: 0.5, y: 4.2, w: 9.0, h: 0.8,
    fontSize: 22, bold: true, color: COR_BRANCO, align: "center",
  });
  addRodape(slide);
}

// ══════════════════════════════════════════════
// SLIDES 16+  (CONTEÚDO)
// ══════════════════════════════════════════════

// ── BLOCO: Fundamentos da Eletricidade ──

// Slide 16 — Separador Bloco 1
{
  const slide = pptx.addSlide();
  slide.background = { color: COR_AMARELO };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.12, fill: { color: COR_LARANJA } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.0 - 0.12, w: "100%", h: 0.12, fill: { color: COR_LARANJA } });
  slide.addText("BLOCO 1", {
    x: 0, y: 1.5, w: "100%", h: 0.7,
    fontSize: 22, bold: true, color: COR_LARANJA, align: "center",
  });
  slide.addText("Fundamentos da\nEletricidade", {
    x: 0, y: 2.2, w: "100%", h: 2.5,
    fontSize: 42, bold: true, color: COR_LARANJA, align: "center",
  });
  slide.addText("Grandezas · Lei de Ohm · Instrumentos de Medição", {
    x: 0, y: 4.9, w: "100%", h: 0.6,
    fontSize: 16, color: COR_TEXTO, align: "center",
  });
  addRodape(slide);
}

// Slide 17 — O que é eletricidade?
slideConteudo("O que é Eletricidade?", [
  { text: "Tudo é formado por ÁTOMOS — e o átomo tem:", bold: true, bullet: false, size: 16 },
  { text: "Prótons (+) — núcleo | Nêutrons (neutros) — núcleo | Elétrons (−) — órbitas externas", indent: 20, size: 14 },
  { text: "", bullet: false },
  { text: "Corrente elétrica = movimento organizado de elétrons livres em um condutor", bold: true, color: COR_LARANJA, bullet: false },
  { text: "", bullet: false },
  { text: "Aplicações no cotidiano:", bold: true, bullet: false, size: 16 },
  { text: "Iluminação, carregamento de dispositivos, eletrodomésticos, motores, computadores, internet, hospitais, indústrias..." },
  { text: "", bullet: false },
  { text: "Corrente Contínua (CC/DC): flui em um sentido — pilhas, baterias" },
  { text: "Corrente Alternada (CA/AC): inverte o sentido 60× por segundo — rede elétrica doméstica" },
]);

// Slide 18 — Grandezas elétricas
slideConteudo("Grandezas Elétricas: V · A · Ω · W", [
  { text: "TENSÃO (V) — Volt", bold: true, color: COR_LARANJA, bullet: false, size: 16 },
  { text: "\"Pressão\" que empurra os elétrons. Pilha = 1,5 V | Tomada = 127 V ou 220 V", indent: 20, size: 14 },
  { text: "CORRENTE (A) — Ampère", bold: true, color: COR_LARANJA, bullet: false, size: 16, space: 8 },
  { text: "Quantidade de elétrons que passa pelo fio. LED = 20 mA | Chuveiro = ~30 A", indent: 20, size: 14 },
  { text: "RESISTÊNCIA (Ω) — Ohm", bold: true, color: COR_LARANJA, bullet: false, size: 16, space: 8 },
  { text: "Oposição à passagem da corrente. Fio mais grosso = menos resistência.", indent: 20, size: 14 },
  { text: "POTÊNCIA (W) — Watt", bold: true, color: COR_LARANJA, bullet: false, size: 16, space: 8 },
  { text: "Energia transformada por segundo. LED = 8 W | Chuveiro = 5.500 W | Fórmula: P = V × I", indent: 20, size: 14 },
]);

// Slide 19 — Lei de Ohm
slideConteudo("Lei de Ohm — V = R × I", [
  { text: "Georg Simon Ohm (1827): tensão é proporcional à corrente que passa pelo resistor.", bullet: false, size: 15 },
  { text: "", bullet: false },
  { text: "As três formas da Lei de Ohm:", bold: true, bullet: false, size: 16, color: COR_LARANJA },
  { text: "V = R × I   (calcular tensão)", size: 16, bold: true },
  { text: "R = V ÷ I   (calcular resistência)", size: 16, bold: true },
  { text: "I = V ÷ R   (calcular corrente)", size: 16, bold: true },
  { text: "", bullet: false },
  { text: "Exemplo prático:", bold: true, bullet: false, size: 15 },
  { text: "Resistor de 100 Ω ligado a 12 V  →  I = 12 ÷ 100 = 0,12 A = 120 mA", indent: 20, size: 14 },
  { text: "Chuveiro: 220 V, 30 A  →  R = 220 ÷ 30 = 7,3 Ω  →  P = 220 × 30 = 6.600 W", indent: 20, size: 14 },
],
{
  alertaTexto: "⚠  Com pele molhada (1.000 Ω) e 220 V:  I = 220 ÷ 1.000 = 220 mA — muito acima do limite seguro de 10 mA! RISCO DE MORTE.",
});

// Slide 20 — Instrumentos de medida
slideConteudo("Instrumentos de Medida Elétrica", [
  { text: "VOLTÍMETRO", bold: true, color: COR_LARANJA, bullet: false, size: 15 },
  { text: "Mede tensão (V) · Conectado em PARALELO com o componente", indent: 20, size: 13 },
  { text: "AMPERÍMETRO", bold: true, color: COR_LARANJA, bullet: false, size: 15, space: 6 },
  { text: "Mede corrente (A) · Conectado em SÉRIE no circuito", indent: 20, size: 13 },
  { text: "OHMÍMETRO", bold: true, color: COR_LARANJA, bullet: false, size: 15, space: 6 },
  { text: "Mede resistência (Ω) · NUNCA usar com circuito energizado", indent: 20, size: 13 },
  { text: "WATTÍMETRO", bold: true, color: COR_LARANJA, bullet: false, size: 15, space: 6 },
  { text: "Mede potência (W) · Usado em instalações e painéis elétricos", indent: 20, size: 13 },
  { text: "MULTÍMETRO", bold: true, color: COR_LARANJA, bullet: false, size: 15, space: 6 },
  { text: "Reúne voltímetro + amperímetro + ohmímetro em um único aparelho — o mais usado!", indent: 20, size: 13, bold: true },
]);

// Slide 21 — Como usar o multímetro
slideConteudo("Como Usar o Multímetro", [
  { text: "1. Medir TENSÃO (V~CA ou V=CC):", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "Selecione V~ ou V= → faixa acima do esperado → ponteira preta no COM, vermelha no VΩ → toque em paralelo → leia o display", indent: 20, size: 13 },
  { text: "2. Medir CORRENTE (A):", bold: true, bullet: false, size: 15, color: COR_LARANJA, space: 6 },
  { text: "Selecione A → insira o instrumento em SÉRIE (abra o circuito, passe a corrente pelo multímetro)", indent: 20, size: 13 },
  { text: "3. Medir RESISTÊNCIA (Ω):", bold: true, bullet: false, size: 15, color: COR_LARANJA, space: 6 },
  { text: "DESLIGUE o circuito → selecione Ω → toque nos terminais do componente → leia o display", indent: 20, size: 13 },
  { text: "CUIDADOS ESSENCIAIS:", bold: true, bullet: false, size: 14, space: 6 },
  { text: "Comece sempre pela faixa mais alta · Nunca meça Ω com circuito energizado · Verifique os bornes corretos antes de medir", indent: 20, size: 13, color: COR_ALERTA },
]);

// ── BLOCO: Circuitos e Instalações ──

// Slide 22 — Separador Bloco 2
{
  const slide = pptx.addSlide();
  slide.background = { color: COR_LARANJA };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.12, fill: { color: COR_AMARELO } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.0 - 0.12, w: "100%", h: 0.12, fill: { color: COR_AMARELO } });
  slide.addText("BLOCO 2", {
    x: 0, y: 1.5, w: "100%", h: 0.7,
    fontSize: 22, bold: true, color: COR_AMARELO, align: "center",
  });
  slide.addText("Circuitos e\nInstalações", {
    x: 0, y: 2.2, w: "100%", h: 2.5,
    fontSize: 42, bold: true, color: COR_BRANCO, align: "center",
  });
  slide.addText("Série · Paralelo · Condutores · Interruptores · Tomadas · Lâmpadas · Proteção", {
    x: 0, y: 4.9, w: "100%", h: 0.6,
    fontSize: 14, color: COR_AMARELO, align: "center",
  });
  addRodape(slide);
}

// Slide 23 — Série x Paralelo
slideDois(
  "Circuitos em Série e em Paralelo",
  "⚡ SÉRIE",
  [
    "Corrente igual em todos",
    "Tensão dividida entre os componentes",
    "Resistência total = soma das resistências",
    "Se um falha → tudo para",
    "Uso: dimmer, pisca-pisca antigo",
    "",
    "Ex: 3 resistores 10Ω+20Ω+30Ω = 60Ω",
    "I = 120 ÷ 60 = 2 A (igual em todos)",
  ],
  "⚡ PARALELO",
  [
    "Tensão igual em todos",
    "Corrente dividida entre os ramos",
    "Resistência total MENOR que a menor",
    "Se um falha → os outros continuam",
    "Uso: tomadas residenciais",
    "",
    "Ex: 2 resistores 100Ω em paralelo",
    "Req = 50 Ω | Itotal = 220 ÷ 50 = 4,4 A",
  ]
);

// Slide 24 — Condutores e Isolantes
slideConteudo("Condutores e Isolantes Elétricos", [
  { text: "CONDUTORES", bold: true, color: COR_LARANJA, bullet: false, size: 16 },
  { text: "Permitem a passagem da corrente com baixa resistência", indent: 20, size: 14 },
  { text: "Exemplos: cobre, alumínio, ouro, prata, água salgada", indent: 20, size: 14 },
  { text: "ISOLANTES", bold: true, color: COR_LARANJA, bullet: false, size: 16, space: 8 },
  { text: "Bloqueiam ou dificultam muito a passagem de corrente", indent: 20, size: 14 },
  { text: "Exemplos: borracha, PVC, vidro, madeira seca, cerâmica", indent: 20, size: 14 },
  { text: "", bullet: false },
  { text: "Seção dos fios (bitola) — ABNT NBR 5410:", bold: true, bullet: false, size: 15 },
  { text: "1,5 mm² → 15 A (iluminação) | 2,5 mm² → 20 A (tomadas gerais) | 6 mm² → 32 A (chuveiro)" },
],
{
  alertaTexto: "⚠  NUNCA substitua um fio por outro de seção menor! Fio subdimensionado aquece, derrete o isolamento e CAUSA INCÊNDIO.",
});

// Slide 25 — Emendas de condutores
slideConteudo("Emendas de Condutores", [
  { text: "Uma emenda mal feita é causa frequente de problemas elétricos e incêndios.", bold: true, bullet: false, color: COR_ALERTA, size: 15 },
  { text: "", bullet: false },
  { text: "Como realizar uma emenda correta (passo a passo):", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "1. Retire o isolamento de 4 a 5 cm de cada fio com alicate de desencapar" },
  { text: "2. Limpe os fios com lixa fina se necessário" },
  { text: "3. Cruze os fios e torça firmemente com alicate de pressão" },
  { text: "4. Cubra completamente com fita isolante (sobreponha as camadas)" },
  { text: "5. NUNCA deixe partes metálicas expostas — inspecione antes de fechar" },
  { text: "", bullet: false },
  { text: "Cores dos fios (NBR 5410): PRETO/VERMELHO = fase | AZUL CLARO = neutro | VERDE/VERDE-AMARELO = terra", size: 13, bold: true },
]);

// Slide 26 — Interruptores
slideDois(
  "Interruptores: Simples e Paralelo (Three-Way)",
  "🔲 SIMPLES",
  [
    "Controla uma lâmpada de 1 ponto",
    "Abre/fecha o circuito (ON/OFF)",
    "Sempre instalado no fio FASE",
    "(nunca no neutro — por segurança!)",
    "",
    "Ligação:",
    "FASE → Interruptor → Lâmpada → NEUTRO",
    "",
    "Uso: quartos, salas, banheiros",
  ],
  "🔀 PARALELO (3 VIAS)",
  [
    "Controla uma lâmpada de 2 pontos",
    "Muito usado em corredores e escadas",
    "Cada interruptor tem 3 terminais:",
    "1 comum (C) + 2 travellers (T1, T2)",
    "",
    "Acende quando os dois interruptores",
    "estão na mesma posição (T1/T1 ou T2/T2)",
    "",
    "Mudar qualquer um → altera o estado",
  ]
);

// Slide 27 — Tomadas
slideConteudo("Tomadas: Uso Geral e Específico — NBR 14136", [
  { text: "Padrão único brasileiro desde 2013 (NBR 14136):", bold: true, bullet: false, size: 16, color: COR_LARANJA },
  { text: "", bullet: false },
  { text: "TUG — Tomada de Uso Geral (10 A)", bold: true, size: 15 },
  { text: "3 pinos redondos menores | TV, carregador, luminária, computador", indent: 20, size: 14 },
  { text: "TUE — Tomada de Uso Específico (20 A)", bold: true, size: 15, space: 8 },
  { text: "3 pinos redondos maiores | Chuveiro, fogão elétrico, ar-condicionado", indent: 20, size: 14 },
  { text: "", bullet: false },
  { text: "O pino central (TERRA — verde-amarelo):", bold: true, bullet: false, size: 14 },
  { text: "Conecta o aparelho ao aterramento. Em falha de isolamento, a corrente escapa pelo terra — protegendo o usuário de choque.", indent: 20, size: 13 },
]);

// Slide 28 — Fotocélula e Sensor de Presença
slideDois(
  "Fotocélula e Sensor de Presença — Como Funcionam",
  "☀ FOTOCÉLULA",
  [
    "Sensor fotoelétrico — detecta luminosidade",
    "",
    "De dia (muita luz): circuito aberto → lâmpada apagada",
    "À noite (pouca luz): circuito fechado → lâmpada acesa",
    "",
    "Aplicações: postes de rua, jardins, fachadas, calçadas",
    "",
    "Vantagem: automatiza sem intervenção manual — economiza energia",
  ],
  "👤 SENSOR DE PRESENÇA (PIR)",
  [
    "Detecta calor infravermelho do corpo humano",
    "",
    "Alguém entra no campo de visão → detecta variação de temperatura → liga a lâmpada",
    "Sem movimento por X segundos → desliga automaticamente",
    "",
    "Aplicações: corredores, garagens, banheiros, entradas de prédios",
    "",
    "Vantagem: lâmpada acende só quando necessário — economia e segurança",
  ]
);

// Slide 29 — Tipos de lâmpadas
slideConteudo("Tipos de Lâmpadas — Comparativo de Eficiência", [
  { text: "INCANDESCENTE", bold: true, color: COR_TEXTO, bullet: false, size: 14 },
  { text: "60 W para 800 lm | Vida útil: ~1.000 h | 95% da energia vira CALOR | Proibida desde 2013", indent: 20, size: 12 },
  { text: "FLUORESCENTE", bold: true, color: COR_TEXTO, bullet: false, size: 14, space: 5 },
  { text: "15 W para 800 lm | Vida útil: ~10.000 h | Contém mercúrio — descarte especial obrigatório!", indent: 20, size: 12 },
  { text: "VAPOR DE SÓDIO / MERCÚRIO", bold: true, color: COR_TEXTO, bullet: false, size: 14, space: 5 },
  { text: "Alta eficiência para iluminação pública | Cor amarelada (sódio) | Contém Hg (mercúrio)", indent: 20, size: 12 },
  { text: "LED  ⭐ MELHOR ESCOLHA", bold: true, color: COR_LARANJA, bullet: false, size: 15, space: 5 },
  { text: "8 W para 800 lm | Vida útil: até 50.000 h | Sem mercúrio | Disponível em luz quente, neutra e fria (Kelvin)", indent: 20, size: 12 },
  { text: "", bullet: false },
  { text: "LED usa 87% menos energia que incandescente e dura 25× mais!", bold: true, bullet: false, color: COR_LARANJA, size: 13 },
]);

// Slide 30 — Disjuntores e DR
slideDois(
  "Disjuntores Termomagnéticos e DR — Função e Uso",
  "🔧 DISJUNTOR",
  [
    "Protege contra SOBRECARGA e CURTO-CIRCUITO",
    "",
    "Elemento bimetálico (térmico): sobrecarga → aquece → desliga (lento)",
    "Eletroímã (magnético): curto → desliga instantaneamente (rápido)",
    "",
    "Pode ser religado após correção do problema!",
    "(substitui o fusível que queimava e era descartado)",
    "",
    "Especificação: corrente nominal (ex: 20 A), tensão (250 V), polos",
  ],
  "⚡ DR (Diferencial Residual)",
  [
    "Protege contra CHOQUE ELÉTRICO e FUGA DE CORRENTE",
    "",
    "Compara corrente que entra (fase) com a que sai (neutro)",
    "Se houver diferença → corrente escapou pelo corpo ou isolamento → desliga em 30 ms!",
    "",
    "Corrente de disparo: 30 mA",
    "(acima de 30 mA → risco de fibrilação cardíaca)",
    "",
    "DPDI = Disjuntor + DR integrados — solução mais completa",
  ]
);

// ── BLOCO: Segurança Elétrica ──

// Slide 31 — Separador Bloco 3
{
  const slide = pptx.addSlide();
  slide.background = { color: COR_ALERTA };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.12, fill: { color: COR_AMARELO } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.0 - 0.12, w: "100%", h: 0.12, fill: { color: COR_AMARELO } });
  slide.addText("BLOCO 3", {
    x: 0, y: 1.5, w: "100%", h: 0.7,
    fontSize: 22, bold: true, color: COR_AMARELO, align: "center",
  });
  slide.addText("Segurança\nElétrica", {
    x: 0, y: 2.2, w: "100%", h: 2.5,
    fontSize: 42, bold: true, color: COR_BRANCO, align: "center",
  });
  slide.addText("NR 10 · EPI · EPC · Primeiros Socorros · Prevenção de Incêndios", {
    x: 0, y: 4.9, w: "100%", h: 0.6,
    fontSize: 14, color: COR_AMARELO, align: "center",
  });
  addRodape(slide);
}

// Slide 32 — Segurança do trabalho em eletricidade
slideConteudo("Segurança do Trabalho em Eletricidade — Regras Básicas", [
  { text: "Acidente do trabalho: evento durante ou em função do trabalho que causa lesão, doença, incapacidade ou morte.", bullet: false, size: 14 },
  { text: "", bullet: false },
  { text: "Causas:", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "Ato inseguro: comportamento inadequado (mexer em fio energizado, improvisar gambiarras)" },
  { text: "Condição insegura: ambiente com problemas (instalação deteriorada, falta de sinalização)" },
  { text: "", bullet: false },
  { text: "Fatores de risco em eletricidade:", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "Físico: choque elétrico, arco elétrico, calor excessivo, ruído de motores" },
  { text: "Ergonômico: postura inadequada, trabalho em altura" },
  { text: "Acidente: queda, contato com partes vivas, curto-circuito" },
],
{
  alertaTexto: "⚠  No Brasil, acidentes elétricos causam mais de 500 mortes por ano. Todo acidente tem causa — e pode ser evitado!",
});

// Slide 33 — NR 10
slideConteudo("NR 10 — O que é e Por que Importa", [
  { text: "Norma Regulamentadora 10 (MTE): estabelece requisitos mínimos de segurança para trabalhadores que interagem com instalações elétricas.", bullet: false, size: 14 },
  { text: "", bullet: false },
  { text: "5 passos para desenergizar uma instalação (LOTO — Lock Out / Tag Out):", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "1. DESLIGAR — abrir os circuitos (interruptor, disjuntor)" },
  { text: "2. BLOQUEAR/CADEADEAR — impedir o religamento acidental" },
  { text: "3. SINALIZAR — afixar placa: \"Não ligue — homem trabalhando\"" },
  { text: "4. TESTAR com voltímetro — confirmar que está sem tensão" },
  { text: "5. ATERRAR e curto-circuitar — proteção contra re-energização acidental" },
],
{
  alertaTexto: "⚠  NR 10: Instalações ENERGIZADAS só podem ser manipuladas por profissional habilitado (com certificação NR 10) usando EPIs adequados!",
});

// Slide 34 — EPI para eletricidade
slideConteudo("EPI para Eletricidade — Equipamentos de Proteção Individual", [
  { text: "Luvas isolantes de borracha", bold: true, size: 15 },
  { text: "Proteção das mãos contra choque elétrico — verificar classe de tensão antes do uso", indent: 25, size: 13 },
  { text: "Óculos de proteção", bold: true, size: 15, space: 6 },
  { text: "Proteção contra arco elétrico, faíscas e partículas voláteis", indent: 25, size: 13 },
  { text: "Calçados isolantes (botas de borracha)", bold: true, size: 15, space: 6 },
  { text: "Isolamento dos pés em relação ao solo — especificação mínima Classe I", indent: 25, size: 13 },
  { text: "Capacete de segurança com carneira dielétrica", bold: true, size: 15, space: 6 },
  { text: "Proteção da cabeça em trabalhos em altura ou risco de arco elétrico", indent: 25, size: 13 },
  { text: "Cinto de segurança / Manga isolante", bold: true, size: 15, space: 6 },
  { text: "Para trabalho em postes, painéis e altura; manga protege os braços contra arco", indent: 25, size: 13 },
],
{
  alertaTexto: "⚠  EPI com defeito ou fora do prazo de validade NÃO PROTEGE. Inspecione antes de cada uso e substitua imediatamente se danificado.",
});

// Slide 35 — EPC
slideConteudo("EPC — Equipamentos de Proteção Coletiva", [
  { text: "EPC protege TODOS no ambiente — não depende de ação individual.", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "", bullet: false },
  { text: "Tapete isolante de borracha", bold: true, size: 15 },
  { text: "Isola o operador do piso durante trabalho em painéis e quadros elétricos", indent: 25, size: 13 },
  { text: "Bastão de aterramento portátil", bold: true, size: 15, space: 6 },
  { text: "Aterra a instalação antes de trabalhar — neutraliza cargas residuais", indent: 25, size: 13 },
  { text: "Cone de sinalização / Fita zebrada", bold: true, size: 15, space: 6 },
  { text: "Delimita e sinaliza a área de risco, impedindo acesso de terceiros", indent: 25, size: 13 },
  { text: "Tela / grade de proteção", bold: true, size: 15, space: 6 },
  { text: "Barreira física entre a área energizada e o público em geral", indent: 25, size: 13 },
  { text: "", bullet: false },
  { text: "EPI protege o indivíduo | EPC protege o coletivo — ambos são obrigatórios!", bold: true, bullet: false, size: 13, color: COR_LARANJA },
]);

// Slide 36 — Acidente do trabalho
slideConteudo("Conceito de Acidente do Trabalho", [
  { text: "Definição legal: qualquer evento ocorrido durante ou em função do exercício do trabalho que provoque:", bullet: false, size: 15 },
  { text: "Lesão corporal" },
  { text: "Perturbação funcional" },
  { text: "Doença ocupacional" },
  { text: "Incapacidade temporária ou permanente para o trabalho" },
  { text: "Morte" },
  { text: "", bullet: false },
  { text: "Consequências do acidente:", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "Para o trabalhador: dor, cicatrizes, incapacidade, perda de renda" },
  { text: "Para a empresa: prejuízos, processos, paralisação de atividades" },
  { text: "Para a família: trauma emocional e financeiro" },
  { text: "", bullet: false },
  { text: "Prevenção = conhecimento + atitude + equipamento correto.", bold: true, bullet: false, color: COR_LARANJA, size: 14 },
]);

// Slide 37 — Primeiros socorros em acidentes elétricos
slideConteudo("Primeiros Socorros em Acidentes Elétricos", [
  { text: "REGRA #1: Nunca toque na vítima sem ter certeza que a fonte está DESLIGADA!", bold: true, color: COR_ALERTA, bullet: false, size: 15 },
  { text: "", bullet: false },
  { text: "1. DESLIGUE a fonte de energia (disjuntor, interruptor, tomada)" },
  { text: "2. Se não conseguir desligar → use objeto ISOLANTE (cabo de madeira, corda seca) para afastar a vítima — NUNCA com as mãos" },
  { text: "3. Ligue SAMU (192) ou Bombeiros (193) IMEDIATAMENTE" },
  { text: "4. Verifique consciência: chame a vítima, toque nos ombros" },
  { text: "5. Se inconsciente/sem respiração → inicie RCP:", bold: true },
  { text: "30 compressões no centro do tórax (forte e rápido, ~100/min) + 2 ventilações de resgate", indent: 25, size: 13 },
  { text: "Repita até o socorro chegar", indent: 25, size: 13 },
  { text: "6. Se consciente → mantenha deitada, aquecida e calma até o socorro" },
]);

// Slide 38 — Prevenção e combate a incêndios
slideConteudo("Prevenção e Combate a Incêndios Elétricos", [
  { text: "Triângulo do Fogo: Calor + Combustível + Comburente (O₂) → Retire um dos três e o fogo se apaga.", bullet: false, size: 14 },
  { text: "", bullet: false },
  { text: "Classes de incêndio:", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "Classe A — sólidos (madeira, papel): extintor de água, espuma ou ABC" },
  { text: "Classe B — líquidos inflamáveis (gasolina, óleo): CO₂, pó químico, espuma" },
  { text: "Classe C — equipamentos ELÉTRICOS ENERGIZADOS: CO₂ ou pó ABC" },
  { text: "Classe K — óleos de cozinha: extintor K específico" },
  { text: "", bullet: false },
  { text: "Como usar o extintor — método PASS:", bold: true, bullet: false, size: 14 },
  { text: "P — Puxe o pino | A — Aponte para a BASE do fogo | S — Segure e pressione | S — Sacuda de lado a lado", indent: 20, size: 13 },
],
{
  alertaTexto: "⚠  NUNCA use água em incêndio elétrico (Classe C)! A água conduz eletricidade e pode causar choque fatal no operador do extintor.",
});

// ── BLOCO: Diagnóstico de Falhas ──

// Slide 39 — Separador Bloco 4
{
  const slide = pptx.addSlide();
  slide.background = { color: COR_FUNDO };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.12, fill: { color: COR_LARANJA } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0.12, w: "100%", h: 0.08, fill: { color: COR_AMARELO } });
  slide.addText("BLOCO 4", {
    x: 0, y: 1.5, w: "100%", h: 0.7,
    fontSize: 22, bold: true, color: COR_LARANJA, align: "center",
  });
  slide.addText("Diagnóstico\nde Falhas", {
    x: 0, y: 2.2, w: "100%", h: 2.5,
    fontSize: 42, bold: true, color: COR_LARANJA, align: "center",
  });
  slide.addText("Inspeção Visual · Testes com Multímetro · Comparação · Análise de Sintomas", {
    x: 0, y: 4.9, w: "100%", h: 0.6,
    fontSize: 14, color: COR_TEXTO, align: "center",
  });
  addRodape(slide);
}

// Slide 40 — Técnicas de diagnóstico
slideConteudo("Técnicas de Diagnóstico Elétrico", [
  { text: "Diagnóstico correto economiza tempo, material e evita substituições desnecessárias.", bullet: false, size: 14 },
  { text: "", bullet: false },
  { text: "As 4 técnicas principais:", bold: true, bullet: false, size: 15, color: COR_LARANJA },
  { text: "1. Inspeção Visual — primeiro passo, muitas vezes suficiente" },
  { text: "2. Diagnóstico por Teste — uso sistemático do multímetro" },
  { text: "3. Diagnóstico por Comparação com Componente — substituir o suspeito" },
  { text: "4. Diagnóstico por Comparação com Equipamento em funcionamento — medir e comparar" },
  { text: "", bullet: false },
  { text: "Análise de sintomas antes de abrir qualquer coisa:", bold: true, bullet: false, size: 14 },
  { text: "Nada funciona → disjuntor desarmado, falta de energia, fusível" },
  { text: "Disjuntor desarma sempre → sobrecarga ou curto-circuito" },
  { text: "DR desliga sempre → fuga de corrente, isolamento deteriorado" },
  { text: "Cheiro de queimado → sobrecarga, componente com curto interno" },
]);

// Slide 41 — Inspeção visual
slideConteudo("Inspeção Visual — O que Observar", [
  { text: "Regra de ouro: SEMPRE comece pela inspeção visual antes de usar qualquer instrumento.", bold: true, bullet: false, color: COR_LARANJA, size: 15 },
  { text: "", bullet: false },
  { text: "O que verificar:", bold: true, bullet: false, size: 15 },
  { text: "Componentes visivelmente queimados (manchas pretas, fumaça, odor de queimado)" },
  { text: "Fios soltos ou com isolamento danificado" },
  { text: "Mau contato nas conexões e bornes" },
  { text: "Disjuntor ou DR em posição desarmada (posição intermediária ou OFF)" },
  { text: "Carga corretamente ligada ao circuito" },
  { text: "Sinais de umidade ou corrosão nos contatos" },
  { text: "", bullet: false },
  { text: "Custo zero e resolução rápida — a maioria dos problemas é visível!", bold: true, bullet: false, color: COR_LARANJA, size: 13 },
]);

// Slide 42 — Diagnóstico por comparação e por teste
slideDois(
  "Diagnóstico por Comparação e por Teste",
  "🔄 POR COMPARAÇÃO",
  [
    "Com COMPONENTE:",
    "→ Substitua o componente suspeito por um idêntico em bom estado",
    "→ Problema sumiu = componente defeituoso",
    "→ Problema persiste = buscar outra causa",
    "",
    "Com EQUIPAMENTO em funcionamento:",
    "→ Meça os valores (tensão, corrente, resistência) no defeituoso",
    "→ Compare com os valores do equipamento bom",
    "→ Divergência aponta o componente com falha",
  ],
  "🔍 POR TESTE (Multímetro)",
  [
    "Método sistemático — do início ao fim:",
    "",
    "1. Verifique a tensão na ENTRADA do circuito (está presente?)",
    "2. Verifique APÓS CADA componente",
    "3. Onde a tensão \"some\" = DEFEITO",
    "",
    "Teste de continuidade:",
    "→ beep = conduz = sem quebra",
    "→ sem beep = fio partido ou componente aberto",
    "",
    "Teste de resistência:",
    "→ compare com o valor esperado",
  ]
);

// ── SLIDE FINAL ──

// Slide 43 — Síntese Final
{
  const slide = pptx.addSlide();
  slide.background = { color: COR_LARANJA };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 2.6, w: "100%", h: 0.08, fill: { color: COR_AMARELO } });
  slide.addText("O que Aprendemos nesta UC", {
    x: 0.3, y: 0.15, w: 9.4, h: 0.75,
    fontSize: 26, bold: true, color: COR_BRANCO, align: "center",
  });
  slide.addText([
    { text: "⚡ Eletricidade: movimento de elétrons — tensão, corrente, resistência, potência e Lei de Ohm\n", options: { fontSize: 13, color: COR_BRANCO, bold: false } },
    { text: "🔧 Instrumentos: voltímetro, amperímetro, ohmímetro, wattímetro e multímetro\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "⚡ Circuitos: série (corrente igual) e paralelo (tensão igual) — aplicações residenciais\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "🏠 Instalações: condutores, emendas, interruptores, tomadas NBR 14136, lâmpadas LED\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "🤖 Automação: fotocélula (luminosidade) e sensor PIR (presença) economizam energia\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "🛡 Proteção: disjuntor (sobrecarga/curto) + DR (choque) = instalação segura\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "⚠ Segurança: NR 10, EPI, EPC — desenergize, bloqueie, sinalize, teste antes de trabalhar\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "🚑 Emergência: desligue, ligue SAMU 192, RCP 30+2 — nunca toque sem desligar!\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "🔥 Incêndio Classe C: use CO₂ ou pó ABC — NUNCA água em elétrico\n", options: { fontSize: 13, color: COR_BRANCO } },
    { text: "🔍 Diagnóstico: inspecione visualmente → teste com multímetro → substitua e compare", options: { fontSize: 13, color: COR_AMARELO, bold: true } },
  ], {
    x: 0.4, y: 2.75, w: 9.2, h: 3.9,
    valign: "top", wrap: true,
  });
  slide.addText("Rio do Sul Mais Tech · SENAI · ⚡ Parabéns pela conclusão da UC!", {
    x: 0, y: 6.8, w: "100%", h: 0.35,
    fontSize: 11, color: COR_BRANCO, bold: true, align: "center",
    fill: { color: COR_AMARELO },
  });
}

// ── SALVAR ──
const outPath = path.join(__dirname, "Slides_Nocoes_Eletricidade_Circuitos_Basicos.pptx");
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log("PPTX gerado com sucesso:", outPath);
}).catch(err => {
  console.error("Erro ao gerar PPTX:", err);
  process.exit(1);
});
