const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Paleta
const COR = {
  PRIMARY: '1B4332',
  SECONDARY: '2D6A4F',
  ACCENT: 'F4A261',
  LIGHT: 'F0FFF4',
  DARK: '0A1F14',
  WHITE: 'FFFFFF',
  MUTED: 'A8D5B5',
  CARD: '234D3C',
};

const W = 10;
const H = 5.625;

function addBg(slide, color) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color } });
}

function addTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.5,
    y: opts.y ?? 0.3,
    w: opts.w ?? 9,
    h: opts.h ?? 0.9,
    fontSize: opts.fontSize ?? 36,
    bold: true,
    color: opts.color ?? COR.LIGHT,
    fontFace: 'Calibri',
    align: opts.align ?? 'left',
    valign: 'middle',
    margin: 0,
  });
}

function addBody(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.5,
    y: opts.y ?? 1.3,
    w: opts.w ?? 9,
    h: opts.h ?? 3.8,
    fontSize: opts.fontSize ?? 15,
    color: opts.color ?? COR.LIGHT,
    fontFace: 'Calibri',
    align: 'left',
    valign: 'top',
    margin: opts.margin ?? 4,
    ...opts,
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0, y: H - 0.38, w: W, h: 0.35,
    fontSize: 10, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle',
    fill: { color: COR.DARK },
    margin: 0,
  });
}

function addCard(slide, x, y, w, h, title, body, accent) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: COR.CARD },
    rectRadius: 0.12,
    line: { color: accent ?? COR.ACCENT, width: 2 },
  });
  slide.addText(title, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.38,
    fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  slide.addText(body, {
    x: x + 0.15, y: y + 0.52, w: w - 0.3, h: h - 0.65,
    fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0,
  });
}

// ── SLIDE 1 — CAPA ──────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  // Faixa de acento superior
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  // Bloco central
  s.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.1, w: 9, h: 3.2, fill: { color: COR.CARD } });
  s.addText('Reforço de Linguagens', {
    x: 0.7, y: 1.25, w: 8.6, h: 1.1,
    fontSize: 44, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addText('RIO DO SUL MAIS TECH · SENAI · Iniciação Profissional', {
    x: 0.7, y: 2.4, w: 8.6, h: 0.6,
    fontSize: 18, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addShape(pres.ShapeType.rect, { x: 0.7, y: 3.1, w: 2.5, h: 0.06, fill: { color: COR.ACCENT } });
  s.addText('Prefeitura Municipal de Rio do Sul', {
    x: 0.7, y: 3.25, w: 8.6, h: 0.45,
    fontSize: 14, color: COR.MUTED, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  s.addText('Carga Horária: 63h  |  Modalidade: Presencial', {
    x: 0.7, y: 3.75, w: 8.6, h: 0.4,
    fontSize: 12, color: COR.MUTED, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 2 — VISUAL INSTITUCIONAL ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  // Dois painéis
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0.12, w: 4.5, h: H - 0.5, fill: { color: COR.PRIMARY } });
  s.addText('📚', { x: 1.2, y: 0.8, w: 2, h: 2, fontSize: 96, align: 'center', valign: 'middle' });
  s.addText('Ler · Escrever · Comunicar', {
    x: 0.15, y: 3.0, w: 4.2, h: 0.7,
    fontSize: 16, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Desenvolvendo habilidades\nde linguagem para a vida,\no estudo e o trabalho.', {
    x: 0.15, y: 3.75, w: 4.2, h: 1.1,
    fontSize: 13, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'top', margin: 0,
  });
  // Painel direito
  s.addText('Programa Rio do Sul Mais Tech', {
    x: 4.8, y: 0.5, w: 4.9, h: 0.7,
    fontSize: 22, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  const items = [
    ['🏫', 'SENAI — Serviço Nacional de Aprendizagem Industrial'],
    ['🏙️', 'Prefeitura Municipal de Rio do Sul'],
    ['🎓', 'Iniciação Profissional para jovens do 8° e 9° ano'],
    ['🌱', 'Formação técnica, cidadã e humana'],
  ];
  items.forEach(([ico, txt], i) => {
    s.addText(ico, { x: 4.8, y: 1.4 + i * 0.8, w: 0.5, h: 0.6, fontSize: 20, align: 'center', valign: 'middle' });
    s.addText(txt, {
      x: 5.35, y: 1.4 + i * 0.8, w: 4.3, h: 0.6,
      fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 3 — IDENTIFICAÇÃO DA UC ──────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Identificação da Unidade Curricular', { y: 0.2, fontSize: 30 });
  const dados = [
    ['UC', 'Reforço de Linguagens'],
    ['Módulo', 'Único'],
    ['CH Total', '63 horas'],
    ['CH Presencial', '63 horas'],
    ['Público-alvo', '8° e 9° ano do Ensino Fundamental (12–15 anos)'],
    ['Modalidade', 'Presencial — LabTEC'],
    ['Programa', 'Rio do Sul Mais Tech — SENAI / Prefeitura Municipal de Rio do Sul'],
  ];
  dados.forEach(([label, valor], i) => {
    const y = 1.15 + i * 0.57;
    s.addShape(pres.ShapeType.rect, { x: 0.4, y, w: 2.5, h: 0.48, fill: { color: COR.SECONDARY } });
    s.addText(label, {
      x: 0.4, y, w: 2.5, h: 0.48,
      fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addShape(pres.ShapeType.rect, { x: 2.95, y, w: 6.65, h: 0.48, fill: { color: COR.CARD } });
    s.addText(valor, {
      x: 2.95, y, w: 6.65, h: 0.48,
      fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 8,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 4 — APRESENTAÇÃO DO PROFESSOR ────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Apresentação do Professor', { y: 0.2, fontSize: 30 });
  // Avatar placeholder
  s.addShape(pres.ShapeType.ellipse, { x: 0.5, y: 1.1, w: 2.4, h: 2.4, fill: { color: COR.CARD }, line: { color: COR.ACCENT, width: 3 } });
  s.addText('👤', { x: 0.5, y: 1.1, w: 2.4, h: 2.4, fontSize: 72, align: 'center', valign: 'middle' });
  const cards = [
    ['Nome', '[Nome do Professor]'],
    ['Formação', '[Formação Acadêmica]'],
    ['Experiência', '[Área de atuação e anos de experiência]'],
    ['Contato', '[E-mail ou canal de comunicação]'],
  ];
  cards.forEach(([label, val], i) => {
    const y = 1.1 + i * 0.82;
    s.addShape(pres.ShapeType.roundRect, { x: 3.2, y, w: 6.3, h: 0.7, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(label + ': ', {
      x: 3.35, y: y + 0.05, w: 1.5, h: 0.6,
      fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(val, {
      x: 4.65, y: y + 0.05, w: 4.7, h: 0.6,
      fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 5 — DINÂMICA: AVIÃO DE PAPEL ─────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Dinâmica de Apresentação da Turma', { y: 0.2, fontSize: 28 });
  s.addText('✈️', { x: 3.5, y: 0.95, w: 3, h: 2.0, fontSize: 100, align: 'center', valign: 'middle' });
  s.addText('Avião de Papel', {
    x: 0.5, y: 2.95, w: 9, h: 0.55,
    fontSize: 24, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const passos = [
    '1. Pegue um papel e escreva: nome, idade, escola e algo sobre você',
    '2. Dobre o papel em formato de avião de papel',
    '3. Ao sinal, todos lançam o avião ao mesmo tempo',
    '4. Quem pegar um avião, lê em voz alta as informações do colega',
  ];
  s.addText(passos.join('\n'), {
    x: 0.5, y: 3.55, w: 9, h: 1.65,
    fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0,
    lineSpacingMultiple: 1.3,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 6 — PLANO DE ENSINO ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Plano de Ensino', { y: 0.2, fontSize: 30 });
  const modulos = [
    ['Módulo 1', 'Leitura e Compreensão Textual', '15h'],
    ['Módulo 2', 'Produção Textual', '12h'],
    ['Módulo 3', 'Gramática Aplicada', '12h'],
    ['Módulo 4', 'Comunicação Oral', '12h'],
    ['Módulo 5', 'Autonomia e Estratégias de Estudo', '12h'],
  ];
  modulos.forEach(([mod, tema, ch], i) => {
    const y = 1.1 + i * 0.77;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 1.6, h: 0.62, fill: { color: COR.ACCENT }, rectRadius: 0.08 });
    s.addText(mod, {
      x: 0.4, y, w: 1.6, h: 0.62,
      fontSize: 11, bold: true, color: COR.DARK, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
    s.addShape(pres.ShapeType.roundRect, { x: 2.1, y, w: 6.1, h: 0.62, fill: { color: COR.CARD }, rectRadius: 0.08 });
    s.addText(tema, {
      x: 2.25, y, w: 5.1, h: 0.62,
      fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addShape(pres.ShapeType.roundRect, { x: 8.25, y, w: 1.35, h: 0.62, fill: { color: COR.PRIMARY }, rectRadius: 0.08 });
    s.addText(ch, {
      x: 8.25, y, w: 1.35, h: 0.62,
      fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: H - 0.75, w: 9.2, h: 0.3, fill: { color: COR.PRIMARY } });
  s.addText('Total: 63 horas  |  ~31 encontros de 2h  |  Local: LabTEC', {
    x: 0.4, y: H - 0.75, w: 9.2, h: 0.3,
    fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 7 — CAPACIDADES TÉCNICAS ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Capacidades Técnicas', { y: 0.2, fontSize: 30 });
  const caps = [
    ['📋', 'Organizar informações de forma clara e coerente'],
    ['📖', 'Desenvolver autonomia de estudo com estratégias de leitura e escrita'],
    ['🧠', 'Aplicar pensamento crítico na análise de textos'],
    ['🤝', 'Trabalhar em grupo em leitura, produção textual e debates'],
    ['💬', 'Comunicar-se de forma assertiva, respeitando diferentes opiniões'],
    ['📅', 'Cumprir prazos e entregar atividades conforme orientações'],
  ];
  const cols = [[0, 1, 2], [3, 4, 5]];
  cols.forEach((idxs, col) => {
    idxs.forEach((idx, row) => {
      const [ico, txt] = caps[idx];
      const x = 0.4 + col * 4.85;
      const y = 1.1 + row * 1.32;
      s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.18, fill: { color: COR.CARD }, rectRadius: 0.1 });
      s.addText(ico, { x: x + 0.1, y: y + 0.1, w: 0.8, h: 0.98, fontSize: 26, align: 'center', valign: 'middle' });
      s.addText(txt, {
        x: x + 0.98, y: y + 0.1, w: 3.35, h: 0.98,
        fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
        align: 'left', valign: 'middle', margin: 0,
      });
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 8 — CAPACIDADES SOCIOEMOCIONAIS ──────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Capacidades Socioemocionais', { y: 0.2, fontSize: 30 });
  const items = [
    ['🎯', 'Responsabilidade', 'Assumir compromisso com a própria aprendizagem e com o grupo'],
    ['💪', 'Persistência', 'Superar dificuldades sem desistir diante de desafios linguísticos'],
    ['🌐', 'Colaboração', 'Contribuir ativamente em trabalhos em equipe e projetos coletivos'],
    ['🌈', 'Respeito à Diversidade', 'Valorizar diferentes modos de se expressar e comunicar'],
    ['👂', 'Escuta Ativa', 'Ouvir com atenção e interesse os colegas e o professor'],
  ];
  items.forEach(([ico, titulo, desc], i) => {
    const y = 1.1 + i * 0.83;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.73, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(ico, { x: 0.5, y: y + 0.05, w: 0.65, h: 0.63, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(titulo, {
      x: 1.2, y: y + 0.05, w: 2.4, h: 0.63,
      fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(desc, {
      x: 3.65, y: y + 0.05, w: 5.8, h: 0.63,
      fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 9 — CONHECIMENTOS: LEITURA E INTERPRETAÇÃO ──────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Leitura e Interpretação Textual', { y: 0.2, fontSize: 28 });
  s.addText('Módulo 1 · 15 horas', {
    x: 0.5, y: 1.05, w: 4, h: 0.4,
    fontSize: 13, color: COR.ACCENT, fontFace: 'Calibri', bold: true,
    align: 'left', valign: 'middle', margin: 0,
  });
  const conteudos = [
    { ico: '🔍', t: 'Compreensão Global', d: 'Identificar a mensagem central e os elementos essenciais de um texto.' },
    { ico: '💡', t: 'Tema e Ideia Principal', d: 'Distinguir o assunto geral da tese ou ideia central defendida.' },
    { ico: '🎯', t: 'Intenção Comunicativa', d: 'Reconhecer o propósito do autor: informar, persuadir, narrar, descrever.' },
    { ico: '📝', t: 'Leitura Detalhada', d: 'Explorar nuances, inferências e informações explícitas e implícitas.' },
  ];
  conteudos.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.55 + row * 1.7;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.55, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(c.ico, { x: x + 0.15, y: y + 0.15, w: 0.7, h: 0.65, fontSize: 28, align: 'center', valign: 'middle' });
    s.addText(c.t, {
      x: x + 0.92, y: y + 0.12, w: 3.4, h: 0.45,
      fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'left', valign: 'middle', margin: 0,
    });
    s.addText(c.d, {
      x: x + 0.92, y: y + 0.58, w: 3.4, h: 0.88,
      fontSize: 11.5, color: COR.LIGHT, fontFace: 'Calibri',
      align: 'left', valign: 'top', margin: 0,
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 10 — CONHECIMENTOS: PRODUÇÃO TEXTUAL ─────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Produção Textual', { y: 0.2, fontSize: 30 });
  s.addText('Módulo 2 · 12 horas', {
    x: 0.5, y: 1.05, w: 4, h: 0.4,
    fontSize: 13, color: COR.ACCENT, fontFace: 'Calibri', bold: true,
    align: 'left', valign: 'middle', margin: 0,
  });
  // Fluxo de produção
  const etapas = ['✏️\nPlanejar', '📄\nRedigir', '🔄\nRevisar', '📢\nPublicar'];
  etapas.forEach((txt, i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.55, w: 2.1, h: 1.15, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(txt, {
      x, y: 1.55, w: 2.1, h: 1.15,
      fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
      align: 'center', valign: 'middle', margin: 0,
    });
    if (i < 3) s.addText('→', { x: x + 2.12, y: 1.85, w: 0.18, h: 0.55, fontSize: 18, color: COR.ACCENT, align: 'center', valign: 'middle', margin: 0 });
  });
  const temas = [
    ['🔗', 'Coesão Textual', 'Uso de conectivos, pronomes e referências para encadear ideias.'],
    ['💡', 'Coerência', 'Organização lógica e progressão temática do texto.'],
    ['¶', 'Paragrafação', 'Divisão em parágrafos com unidade temática e progressão.'],
    ['📐', 'Organização de Ideias', 'Introdução, desenvolvimento e conclusão bem estruturados.'],
  ];
  temas.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 2.85 + row * 1.1;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 0.95, fill: { color: COR.PRIMARY }, rectRadius: 0.1 });
    s.addText(t[0], { x: x + 0.12, y, w: 0.65, h: 0.95, fontSize: 20, align: 'center', valign: 'middle' });
    s.addText(t[1], { x: x + 0.82, y: y + 0.06, w: 3.55, h: 0.33, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(t[2], { x: x + 0.82, y: y + 0.4, w: 3.55, h: 0.5, fontSize: 11, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 11 — CONHECIMENTOS: GRAMÁTICA E ORALIDADE ───────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Gramática Aplicada e Oralidade', { y: 0.2, fontSize: 28 });
  // Coluna esquerda
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.1, w: 4.45, h: 3.95, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('📌 Gramática — Módulo 3 · 12h', {
    x: 0.6, y: 1.18, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  const gram = [
    '• Pontuação e seu papel comunicativo',
    '• Vírgula, ponto, ponto e vírgula',
    '• Concordância verbal',
    '• Concordância nominal',
    '• Regência verbal básica',
    '• Ortografia e acentuação',
  ];
  s.addText(gram.join('\n'), {
    x: 0.6, y: 1.68, w: 4.1, h: 3.2,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  // Coluna direita
  s.addShape(pres.ShapeType.roundRect, { x: 5.15, y: 1.1, w: 4.45, h: 3.95, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('🎤 Comunicação Oral — Módulo 4 · 12h', {
    x: 5.35, y: 1.18, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  const oral = [
    '• Técnicas de debate e argumentação',
    '• Apresentação oral com clareza',
    '• Postura, voz e contato visual',
    '• Escuta ativa e respeito ao turno',
    '• Linguagem formal e informal',
    '• Seminário e exposição de ideias',
  ];
  s.addText(oral.join('\n'), {
    x: 5.35, y: 1.68, w: 4.1, h: 3.2,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 12 — COMBINADOS / REGRAS ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Nossos Combinados', { y: 0.2, fontSize: 30 });
  const regras = [
    ['📵', 'Celular', 'Guardado durante as aulas, salvo quando autorizado para pesquisa.'],
    ['⏰', 'Pontualidade', 'Chegar no horário é respeitar a si mesmo e aos colegas.'],
    ['🤐', 'Respeito', 'Ouvir o outro sem interromper, valorizar todas as opiniões.'],
    ['📚', 'Participação', 'Engajar-se nas atividades, fazer perguntas, colaborar.'],
    ['📝', 'Prazos', 'Entregar atividades dentro do prazo combinado.'],
    ['🤝', 'Cooperação', 'Ajudar os colegas e aprender junto — a turma é uma equipe.'],
  ];
  regras.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.85;
    const y = 1.1 + row * 1.35;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.2, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(r[0], { x: x + 0.1, y, w: 0.85, h: 1.2, fontSize: 28, align: 'center', valign: 'middle' });
    s.addText(r[1], { x: x + 1.0, y: y + 0.1, w: 3.35, h: 0.38, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(r[2], { x: x + 1.0, y: y + 0.5, w: 3.35, h: 0.62, fontSize: 11.5, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 13 — SISTEMA DE AVALIAÇÃO ────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Sistema de Avaliação', { y: 0.2, fontSize: 30 });
  const avals = [
    { label: 'Atividades Práticas', peso: '40%', desc: 'Exercícios de leitura, escrita e oralidade realizados durante os módulos', ico: '✏️' },
    { label: 'Projeto Final', peso: '35%', desc: 'Texto de opinião sobre tecnologia e mercado de trabalho + apresentação oral', ico: '🏆' },
    { label: 'Participação', peso: '25%', desc: 'Engajamento, colaboração, respeito e frequência nas aulas', ico: '🙌' },
  ];
  avals.forEach((a, i) => {
    const y = 1.15 + i * 1.38;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 1.22, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(a.ico, { x: 0.5, y, w: 0.9, h: 1.22, fontSize: 30, align: 'center', valign: 'middle' });
    s.addText(a.label, { x: 1.45, y: y + 0.1, w: 5.2, h: 0.42, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(a.desc, { x: 1.45, y: y + 0.55, w: 5.2, h: 0.58, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
    s.addShape(pres.ShapeType.roundRect, { x: 7.8, y: y + 0.26, w: 1.6, h: 0.7, fill: { color: COR.ACCENT }, rectRadius: 0.1 });
    s.addText(a.peso, { x: 7.8, y: y + 0.26, w: 1.6, h: 0.7, fontSize: 22, bold: true, color: COR.DARK, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
  });
  s.addText('Média para aprovação: ≥ 6,0 pontos', {
    x: 0.4, y: H - 0.72, w: 9.2, h: 0.3,
    fontSize: 12, bold: true, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 14 — AVALIAÇÃO DE COMPORTAMENTO ──────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Avaliação de Comportamento', { y: 0.2, fontSize: 30 });
  const criterios = [
    ['🎯', 'Responsabilidade', 'Cumprir tarefas, prazos e compromissos assumidos'],
    ['🤝', 'Trabalho em Equipe', 'Colaborar, respeitar e contribuir com o grupo'],
    ['👂', 'Postura em Aula', 'Atenção, participação e respeito ao professor e colegas'],
    ['💬', 'Comunicação', 'Expressar-se com clareza, respeito e assertividade'],
    ['🔄', 'Autoavaliação', 'Refletir sobre o próprio desenvolvimento e propor melhorias'],
  ];
  criterios.forEach((c, i) => {
    const y = 1.1 + i * 0.83;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.73, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(c[0], { x: 0.5, y, w: 0.65, h: 0.73, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(c[1], { x: 1.2, y, w: 2.8, h: 0.73, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(c[2], { x: 4.05, y, w: 5.4, h: 0.73, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  s.addText('A avaliação de comportamento compõe 25% da nota final (Participação).', {
    x: 0.4, y: H - 0.72, w: 9.2, h: 0.3,
    fontSize: 11, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ── SLIDE 15 — SITUAÇÃO DE APRENDIZAGEM ────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Situação de Aprendizagem', { y: 0.2, fontSize: 30 });
  // Destaque do projeto
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 1.05, fill: { color: COR.ACCENT }, rectRadius: 0.14 });
  s.addText('💡 Projeto: "Tecnologia e Mercado de Trabalho"', {
    x: 0.55, y: 1.05, w: 8.9, h: 1.05,
    fontSize: 20, bold: true, color: COR.DARK, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 8,
  });
  const etapas = [
    ['1', '🔎 Pesquisar', 'Investigar como a tecnologia transforma o mercado de trabalho atual.'],
    ['2', '✍️ Produzir', 'Redigir um texto de opinião argumentativo, com posição clara e fundamentada.'],
    ['3', '🔄 Revisar', 'Aplicar conhecimentos de gramática, coesão e coerência ao texto.'],
    ['4', '🎤 Apresentar', 'Expor o texto oralmente para a turma, praticando a comunicação.'],
  ];
  etapas.forEach((e, i) => {
    const y = 2.2 + i * 0.77;
    s.addShape(pres.ShapeType.ellipse, { x: 0.4, y: y + 0.05, w: 0.6, h: 0.6, fill: { color: COR.SECONDARY } });
    s.addText(e[0], { x: 0.4, y: y + 0.05, w: 0.6, h: 0.6, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s.addShape(pres.ShapeType.roundRect, { x: 1.1, y, w: 8.5, h: 0.7, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(e[1], { x: 1.2, y, w: 2.0, h: 0.7, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(e[2], { x: 3.2, y, w: 6.3, h: 0.7, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech — SENAI | Prefeitura Municipal de Rio do Sul');
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDES DE CONTEÚDO — MÓDULO 1: LEITURA E COMPREENSÃO TEXTUAL
// ══════════════════════════════════════════════════════════════════════════════

// ── SLIDE 16 — Divisor Módulo 1 ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 2.0, w: W, h: 1.6, fill: { color: COR.SECONDARY } });
  s.addText('MÓDULO 1', {
    x: 0.5, y: 0.5, w: 9, h: 0.7,
    fontSize: 18, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Leitura e Compreensão Textual', {
    x: 0.5, y: 2.05, w: 9, h: 1.0,
    fontSize: 38, bold: true, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Carga horária: 15 horas', {
    x: 0.5, y: 3.7, w: 9, h: 0.5,
    fontSize: 16, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 17 — Tipos de Texto ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Tipos de Texto', { fontSize: 30 });
  const tipos = [
    ['📖', 'Narrativo', 'Conta uma história com personagens, tempo e lugar. Ex: conto, crônica, notícia.'],
    ['🖼️', 'Descritivo', 'Descreve pessoas, lugares ou objetos com detalhes. Ex: anúncio, laudo, cardápio.'],
    ['💬', 'Argumentativo', 'Defende uma ideia com argumentos. Ex: artigo de opinião, editorial, redação.'],
    ['📋', 'Instrucional', 'Orienta como fazer algo passo a passo. Ex: receita, bula, manual, tutorial.'],
  ];
  tipos.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.1 + row * 1.9;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.75, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(t[0], { x: x + 0.12, y: y + 0.15, w: 0.75, h: 0.75, fontSize: 28, align: 'center', valign: 'middle' });
    s.addText(t[1], { x: x + 0.95, y: y + 0.12, w: 3.4, h: 0.45, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(t[2], { x: x + 0.95, y: y + 0.6, w: 3.4, h: 1.0, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 18 — Leitura Global e Detalhada ───────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Leitura Global e Leitura Detalhada', { fontSize: 28 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.1, w: 4.4, h: 3.9, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('🌍 Leitura Global', { x: 0.55, y: 1.2, w: 4.1, h: 0.45, fontSize: 15, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  s.addText('• Leia o texto inteiro sem parar\n• Identifique o assunto geral\n• Perceba o contexto e o tipo de texto\n• Responda: "De que trata este texto?"\n• Não se preocupe com cada palavra', {
    x: 0.55, y: 1.7, w: 4.1, h: 3.1,
    fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  s.addShape(pres.ShapeType.roundRect, { x: 5.2, y: 1.1, w: 4.4, h: 3.9, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('🔬 Leitura Detalhada', { x: 5.35, y: 1.2, w: 4.1, h: 0.45, fontSize: 15, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  s.addText('• Releia trecho por trecho\n• Sublinhe palavras-chave\n• Identifique dados, fatos e opiniões\n• Anote o que não entendeu\n• Busque o sentido das palavras no contexto', {
    x: 5.35, y: 1.7, w: 4.1, h: 3.1,
    fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 19 — Identificando o Tema ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Identificando o Tema de um Texto', { fontSize: 28 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.9, fill: { color: COR.ACCENT }, rectRadius: 0.12 });
  s.addText('Tema = o assunto de que o texto trata, em uma expressão curta', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.9,
    fontSize: 16, bold: true, color: COR.DARK, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const dicas = [
    ['🔑', 'Pergunte: "Do que este texto fala?"', 'A resposta em poucas palavras é o tema. Ex: "desigualdade social", "uso de celulares na escola".'],
    ['📌', 'Título como pista', 'O título geralmente aponta o tema. Mas cuidado — ele pode ser metafórico.'],
    ['🔄', 'Palavras que se repetem', 'Termos que aparecem várias vezes costumam indicar o tema central do texto.'],
    ['✂️', 'Fuja da armadilha', 'Tema ≠ ideia principal. O tema é amplo; a ideia principal é o ponto de vista sobre ele.'],
  ];
  dicas.forEach((d, i) => {
    const y = 2.05 + i * 0.83;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.73, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(d[0], { x: 0.5, y, w: 0.7, h: 0.73, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(d[1], { x: 1.25, y: y + 0.04, w: 3.0, h: 0.65, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(d[2], { x: 4.3, y: y + 0.04, w: 5.15, h: 0.65, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 20 — Ideia Principal ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Encontrando a Ideia Principal', { fontSize: 28 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.85, fill: { color: COR.SECONDARY }, rectRadius: 0.1 });
  s.addText('A ideia principal é o que o autor QUER DIZER sobre o tema — a mensagem central do texto.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.85,
    fontSize: 14, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const blocos = [
    ['🎯', 'Como identificar', '• Geralmente está no 1º ou último parágrafo\n• É a afirmação mais importante\n• As demais ideias servem para explicá-la ou comprová-la'],
    ['⚠️', 'Cuidado com ideias secundárias', '• Exemplos, dados e detalhes complementam, mas não são a ideia principal\n• Pergunte: "Se eu tirar esta frase, o texto perde o sentido?"'],
    ['✅', 'Técnica prática', '• Leia o texto e escreva uma frase resumindo o que o autor defende\n• Essa frase é a ideia principal'],
  ];
  blocos.forEach((b, i) => {
    const y = 2.0 + i * 1.12;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 1.0, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(b[0], { x: 0.5, y, w: 0.7, h: 1.0, fontSize: 24, align: 'center', valign: 'middle' });
    s.addText(b[1], { x: 1.25, y: y + 0.05, w: 2.2, h: 0.9, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(b[2], { x: 3.5, y: y + 0.05, w: 5.95, h: 0.9, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.4 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 21 — Intenção Comunicativa ────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Intenção Comunicativa', { fontSize: 30 });
  s.addText('Por que este texto foi escrito?', {
    x: 0.5, y: 1.05, w: 9, h: 0.45,
    fontSize: 15, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0, italics: true,
  });
  const intencoes = [
    ['📰', 'Informar', 'Apresentar fatos, dados e acontecimentos de forma objetiva.', 'Notícia, relatório, artigo científico'],
    ['💡', 'Persuadir', 'Convencer o leitor a aceitar um ponto de vista ou tomar uma atitude.', 'Artigo de opinião, propaganda, discurso'],
    ['📜', 'Narrar', 'Contar uma história, real ou fictícia, com sequência de eventos.', 'Conto, crônica, relato pessoal'],
    ['🔧', 'Instruir', 'Orientar como realizar uma tarefa ou seguir um procedimento.', 'Receita, tutorial, manual, bula'],
    ['🎭', 'Entreter', 'Provocar prazer estético, humor ou emoção no leitor.', 'Poema, piada, crônica humorística'],
  ];
  intencoes.forEach((t, i) => {
    const y = 1.6 + i * 0.77;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.67, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(t[0], { x: 0.5, y, w: 0.6, h: 0.67, fontSize: 20, align: 'center', valign: 'middle' });
    s.addText(t[1], { x: 1.15, y, w: 1.8, h: 0.67, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(t[2], { x: 3.0, y, w: 3.8, h: 0.67, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(t[3], { x: 6.85, y, w: 2.65, h: 0.67, fontSize: 10.5, color: COR.MUTED, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0, italics: true });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 22 — Inferências ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Fazendo Inferências — Ler nas Entrelinhas', { fontSize: 26 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.85, fill: { color: COR.ACCENT }, rectRadius: 0.1 });
  s.addText('Inferir = deduzir informações que NÃO estão escritas, mas que o texto sugere', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.85,
    fontSize: 15, bold: true, color: COR.DARK, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 2.0, w: 9.2, h: 1.15, fill: { color: COR.CARD }, rectRadius: 0.1 });
  s.addText('Exemplo:', { x: 0.6, y: 2.08, w: 1.3, h: 0.3, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  s.addText('"Ela entrou na sala, jogou a mochila no chão e cruzou os braços."\nO texto não diz que ela está brava — mas podemos INFERIR que sim, pelos gestos.', {
    x: 0.6, y: 2.38, w: 8.9, h: 0.72,
    fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri', italics: true,
    align: 'left', valign: 'top', margin: 0,
  });
  const dicas = [
    ['🧩', 'Use o contexto', 'Considere o tipo de texto, quem escreveu e para quem.'],
    ['🔍', 'Observe os detalhes', 'Palavras de conotação, ironia, tom e vocabulário escolhido.'],
    ['🤔', 'Pergunte-se', '"O que o autor NÃO disse, mas deixou implícito?"'],
  ];
  dicas.forEach((d, i) => {
    const y = 3.3 + i * 0.75;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.65, fill: { color: COR.SECONDARY }, rectRadius: 0.1 });
    s.addText(d[0], { x: 0.5, y, w: 0.6, h: 0.65, fontSize: 18, align: 'center', valign: 'middle' });
    s.addText(d[1], { x: 1.15, y, w: 2.2, h: 0.65, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(d[2], { x: 3.4, y, w: 5.95, h: 0.65, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDES DE CONTEÚDO — MÓDULO 2: PRODUÇÃO TEXTUAL
// ══════════════════════════════════════════════════════════════════════════════

// ── SLIDE 23 — Divisor Módulo 2 ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 2.0, w: W, h: 1.6, fill: { color: COR.PRIMARY } });
  s.addText('MÓDULO 2', {
    x: 0.5, y: 0.5, w: 9, h: 0.7,
    fontSize: 18, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Produção Textual', {
    x: 0.5, y: 2.05, w: 9, h: 1.0,
    fontSize: 40, bold: true, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Carga horária: 12 horas', {
    x: 0.5, y: 3.7, w: 9, h: 0.5,
    fontSize: 16, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 24 — O que é um Parágrafo ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'O que é um Parágrafo?', { fontSize: 30 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.85, fill: { color: COR.SECONDARY }, rectRadius: 0.1 });
  s.addText('Um parágrafo é uma unidade de texto que desenvolve UMA ideia central, de forma clara e coesa.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.85,
    fontSize: 14, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const partes = [
    ['1', 'Frase-tópico', 'Apresenta a ideia central do parágrafo. Geralmente é a primeira frase.'],
    ['2', 'Desenvolvimento', 'Explica, detalha ou argumenta sobre a ideia da frase-tópico com dados, exemplos ou comparações.'],
    ['3', 'Conclusão parcial', 'Fecha a ideia do parágrafo, podendo criar uma transição para o próximo.'],
  ];
  partes.forEach((p, i) => {
    const y = 2.0 + i * 1.1;
    s.addShape(pres.ShapeType.ellipse, { x: 0.4, y: y + 0.1, w: 0.75, h: 0.75, fill: { color: COR.ACCENT } });
    s.addText(p[0], { x: 0.4, y: y + 0.1, w: 0.75, h: 0.75, fontSize: 18, bold: true, color: COR.DARK, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s.addShape(pres.ShapeType.roundRect, { x: 1.25, y, w: 8.35, h: 0.95, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(p[1], { x: 1.4, y: y + 0.05, w: 2.4, h: 0.42, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(p[2], { x: 1.4, y: y + 0.48, w: 8.05, h: 0.42, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 25 — Paragrafação ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Paragrafação — Como Organizar Ideias', { fontSize: 27 });
  const regras = [
    ['🔁', 'Uma ideia por parágrafo', 'Não misture dois assuntos diferentes no mesmo parágrafo. Mude de parágrafo ao mudar de ideia.'],
    ['📏', 'Tamanho adequado', 'Evite parágrafos de uma linha (raso) ou de uma página inteira (sobrecarregado). Entre 4 e 8 linhas é ideal.'],
    ['🔗', 'Parágrafos conectados', 'Use conectivos e referências para criar ligação entre os parágrafos (além disso, por outro lado, em contrapartida...).'],
    ['🗂️', 'Estrutura do texto', 'Introdução (apresenta) → Desenvolvimento (aprofunda) → Conclusão (fecha). Cada parte pode ter 1 ou mais parágrafos.'],
  ];
  regras.forEach((r, i) => {
    const y = 1.1 + i * 1.07;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.95, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(r[0], { x: 0.5, y, w: 0.7, h: 0.95, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(r[1], { x: 1.25, y: y + 0.04, w: 2.8, h: 0.42, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(r[2], { x: 1.25, y: y + 0.47, w: 8.15, h: 0.44, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 26 — Coesão Textual ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Coesão Textual — Conectivos e Pronomes', { fontSize: 26 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.75, fill: { color: COR.SECONDARY }, rectRadius: 0.1 });
  s.addText('Coesão é a ligação entre as partes do texto — é o que faz as frases e parágrafos formarem um TODO coerente.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.75,
    fontSize: 13.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const tipos = [
    ['Adição', 'além disso, também, e, ainda'],
    ['Oposição', 'mas, porém, no entanto, contudo'],
    ['Causa/Efeito', 'porque, portanto, logo, assim'],
    ['Tempo', 'então, depois, antes, quando, enquanto'],
    ['Explicação', 'ou seja, isto é, em outras palavras'],
    ['Conclusão', 'enfim, por fim, concluindo, em suma'],
  ];
  s.addText('Principais conectivos por função:', {
    x: 0.4, y: 1.88, w: 9.2, h: 0.38,
    fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  tipos.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 2.3 + row * 0.97;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 0.82, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(t[0], { x: x + 0.12, y: y + 0.04, w: 2.0, h: 0.35, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(t[1], { x: x + 0.12, y: y + 0.4, w: 4.2, h: 0.35, fontSize: 12, color: COR.MUTED, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0, italics: true });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 27 — Coerência Textual ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Coerência Textual — Sentido e Lógica', { fontSize: 27 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.75, fill: { color: COR.PRIMARY }, rectRadius: 0.1 });
  s.addText('Coerência é o sentido global do texto — as ideias devem ser compatíveis e encadeadas de forma lógica.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.75,
    fontSize: 13.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.9, w: 4.4, h: 3.1, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('✅ Texto coerente', { x: 0.55, y: 2.0, w: 4.1, h: 0.38, fontSize: 14, bold: true, color: 'A8D5B5', fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  s.addText('• Ideias não se contradizem\n• Tem progressão temática\n• Respeita fatos e a realidade\n• Mantém o mesmo ponto de vista\n• Adapta a linguagem ao público e contexto', {
    x: 0.55, y: 2.42, w: 4.1, h: 2.5,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  s.addShape(pres.ShapeType.roundRect, { x: 5.2, y: 1.9, w: 4.4, h: 3.1, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('❌ Erros de coerência', { x: 5.35, y: 2.0, w: 4.1, h: 0.38, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  s.addText('• Afirmar e negar a mesma coisa\n• Mudar de assunto sem transição\n• Incluir informações sem relação\n• Usar linguagem incompatível\n• Saltar etapas sem explicação', {
    x: 5.35, y: 2.42, w: 4.1, h: 2.5,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.5,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 28 — Revisão e Reescrita ──────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Revisão e Reescrita de Textos', { fontSize: 28 });
  const etapas = [
    ['1ª', '📖 Leia em voz alta', 'Ouvir o próprio texto ajuda a perceber erros de fluência, repetição e sentido.'],
    ['2ª', '📌 Verifique a estrutura', 'O texto tem introdução, desenvolvimento e conclusão? As ideias estão organizadas?'],
    ['3ª', '🔗 Cheque a coesão', 'Os conectivos estão adequados? Os pronomes têm referência clara?'],
    ['4ª', '📐 Revise a gramática', 'Concordância, pontuação, ortografia — cuide dos detalhes.'],
    ['5ª', '✂️ Elimine excessos', 'Retire repetições, palavras desnecessárias e trechos que não contribuem.'],
  ];
  etapas.forEach((e, i) => {
    const y = 1.1 + i * 0.87;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 0.75, h: 0.75, fill: { color: COR.ACCENT }, rectRadius: 0.1 });
    s.addText(e[0], { x: 0.4, y, w: 0.75, h: 0.75, fontSize: 11, bold: true, color: COR.DARK, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s.addShape(pres.ShapeType.roundRect, { x: 1.25, y, w: 8.35, h: 0.75, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(e[1], { x: 1.4, y: y + 0.04, w: 2.8, h: 0.35, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(e[2], { x: 1.4, y: y + 0.4, w: 8.05, h: 0.3, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 29 — Produção de Texto: Passo a Passo ─────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Produção de Texto: Passo a Passo', { fontSize: 28 });
  const passos = [
    ['✏️', 'Planejamento', 'Qual é o tema? Para quem vou escrever? Qual é meu objetivo? Quais ideias vou usar?'],
    ['📝', 'Rascunho', 'Escreva livremente sua primeira versão. Não se preocupe com a perfeição agora.'],
    ['🔄', 'Revisão', 'Releia com olhar crítico: estrutura, coesão, coerência, gramática.'],
    ['✅', 'Versão final', 'Passe a limpo o texto revisado. Leia uma última vez antes de entregar.'],
  ];
  passos.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.1 + row * 1.85;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.7, fill: { color: COR.CARD }, rectRadius: 0.12 });
    s.addText(p[0], { x: x + 0.15, y: y + 0.15, w: 0.7, h: 0.7, fontSize: 28, align: 'center', valign: 'middle' });
    s.addText(p[1], { x: x + 0.95, y: y + 0.12, w: 3.4, h: 0.45, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(p[2], { x: x + 0.95, y: y + 0.6, w: 3.4, h: 1.0, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDES DE CONTEÚDO — MÓDULO 3: GRAMÁTICA APLICADA
// ══════════════════════════════════════════════════════════════════════════════

// ── SLIDE 30 — Divisor Módulo 3 ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 2.0, w: W, h: 1.6, fill: { color: COR.SECONDARY } });
  s.addText('MÓDULO 3', {
    x: 0.5, y: 0.5, w: 9, h: 0.7,
    fontSize: 18, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Gramática Aplicada', {
    x: 0.5, y: 2.05, w: 9, h: 1.0,
    fontSize: 40, bold: true, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Carga horária: 12 horas', {
    x: 0.5, y: 3.7, w: 9, h: 0.5,
    fontSize: 16, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 31 — Pontuação ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Pontuação e seu Uso Comunicativo', { fontSize: 27 });
  const pontos = [
    ['.', 'Ponto final', 'Encerra uma frase declarativa ou imperativa. Marca pausa longa.'],
    [',', 'Vírgula', 'Separa termos, orações, apostos, vocativos e adjuntos adverbiais deslocados. Não separa sujeito do verbo.'],
    [';', 'Ponto e vírgula', 'Separa orações coordenadas longas ou itens de uma enumeração.'],
    [':', 'Dois pontos', 'Introduz enumeração, citação, explicação ou conclusão.'],
    ['?', 'Interrogação', 'Indica pergunta direta.'],
    ['!', 'Exclamação', 'Indica emoção forte: surpresa, admiração, ordem enfática.'],
  ];
  pontos.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.1 + row * 1.42;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.28, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.12, y: y + 0.24, w: 0.72, h: 0.72, fill: { color: COR.ACCENT } });
    s.addText(p[0], { x: x + 0.12, y: y + 0.24, w: 0.72, h: 0.72, fontSize: 22, bold: true, color: COR.DARK, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s.addText(p[1], { x: x + 0.95, y: y + 0.1, w: 3.4, h: 0.38, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(p[2], { x: x + 0.95, y: y + 0.5, w: 3.4, h: 0.72, fontSize: 11.5, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 32 — Concordância Verbal ──────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Concordância Verbal — Sujeito e Verbo', { fontSize: 26 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.75, fill: { color: COR.SECONDARY }, rectRadius: 0.1 });
  s.addText('O verbo deve concordar em número e pessoa com o sujeito da oração.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.75,
    fontSize: 14, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const casos = [
    ['Sujeito simples', '"Os alunos estudaram muito." → verbo no plural.', '"A professora explicou." → verbo no singular.'],
    ['Sujeito composto', '"Pedro e Ana chegaram juntos." → verbo no plural.', '"Coragem e determinação fazem a diferença."'],
    ['Sujeito coletivo', '"A turma foi ao laboratório." → singular (o coletivo é singular).', '"A maioria dos alunos passou." → singular.'],
    ['Cuidado com expressões', '"Um dos alunos chegou atrasado." → singular.', '"Mais de um aluno faltou." → singular.'],
  ];
  casos.forEach((c, i) => {
    const y = 1.9 + i * 0.9;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.78, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(c[0], { x: 0.55, y: y + 0.04, w: 2.5, h: 0.36, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(c[1], { x: 0.55, y: y + 0.41, w: 4.3, h: 0.3, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0, italics: true });
    s.addText(c[2], { x: 4.9, y: y + 0.41, w: 4.55, h: 0.3, fontSize: 12, color: COR.MUTED, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0, italics: true });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 33 — Concordância Nominal ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Concordância Nominal — Substantivo e Adjetivo', { fontSize: 24 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.7, fill: { color: COR.PRIMARY }, rectRadius: 0.1 });
  s.addText('Adjetivos, artigos, pronomes e numerais concordam em gênero (m./f.) e número (sing./plur.) com o substantivo.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.7,
    fontSize: 13, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const exemplos = [
    ['✅ Correto', '❌ Errado'],
    ['"As alunas dedicadas passaram."', '"As alunas dedicado passou."'],
    ['"Um livro interessante."', '"Uma livro interessante."'],
    ['"Os jovens estavam animados."', '"Os jovens estava animado."'],
    ['"A menina ficou satisfeita."', '"A menina ficou satisfeito."'],
  ];
  exemplos.forEach((e, i) => {
    const y = 1.85 + i * 0.72;
    const isBold = i === 0;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 4.4, h: 0.62, fill: { color: i === 0 ? COR.SECONDARY : COR.CARD }, rectRadius: 0.08 });
    s.addShape(pres.ShapeType.roundRect, { x: 5.2, y, w: 4.4, h: 0.62, fill: { color: i === 0 ? COR.SECONDARY : COR.CARD }, rectRadius: 0.08 });
    s.addText(e[0], { x: 0.4, y, w: 4.4, h: 0.62, fontSize: isBold ? 13 : 12, bold: isBold, color: isBold ? COR.ACCENT : 'A8D5B5', fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0, italics: !isBold });
    s.addText(e[1], { x: 5.2, y, w: 4.4, h: 0.62, fontSize: isBold ? 13 : 12, bold: isBold, color: isBold ? COR.ACCENT : COR.ACCENT, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0, italics: !isBold });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 34 — Erros Comuns ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Erros Comuns que Mudam o Sentido', { fontSize: 27 });
  const erros = [
    ['⚠️', 'Falta de vírgula', '"Não, espere." ≠ "Não espere." — a vírgula muda completamente o sentido!'],
    ['⚠️', 'Mal posicionado', '"Ele quase perdeu tudo." ≠ "Ele perdeu quase tudo." — a posição do advérbio importa.'],
    ['⚠️', 'Pronome ambíguo', '"Pedro disse ao João que ele estava errado." — quem estava errado? Ambiguidade!'],
    ['⚠️', 'Dupla negação', '"Não fiz nada." (correto no PT-BR) ≠ "Não fiz nenhuma coisa." — mesma ideia, formas diferentes.'],
    ['⚠️', 'Concordância errada', '"Fazem dois anos que não te vejo." (errado) → "Faz dois anos que não te vejo." (correto)'],
  ];
  erros.forEach((e, i) => {
    const y = 1.1 + i * 0.88;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.77, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(e[0], { x: 0.5, y, w: 0.65, h: 0.77, fontSize: 20, align: 'center', valign: 'middle' });
    s.addText(e[1], { x: 1.2, y, w: 2.4, h: 0.77, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(e[2], { x: 3.65, y, w: 5.8, h: 0.77, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0, italics: true });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 35 — Exercícios Práticos Gramática ─────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Exercícios Práticos Contextualizados', { fontSize: 27 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.08, w: 9.2, h: 0.7, fill: { color: COR.PRIMARY }, rectRadius: 0.1 });
  s.addText('Corrija as frases abaixo, identificando e justificando o erro:', {
    x: 0.55, y: 1.08, w: 8.9, h: 0.7,
    fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'left', valign: 'middle', margin: 0,
  });
  const exercicios = [
    '1. "Os menino chegou tarde na escola."',
    '2. "A professoras explicaram o conteúdo muito bem."',
    '3. "Eu e ele fomos na festa ontem."',
    '4. "Existem muita informação na internet."',
    '5. "Ela saiu sem falar com ninguém não."',
  ];
  s.addText(exercicios.join('\n'), {
    x: 0.5, y: 1.88, w: 9, h: 3.2,
    fontSize: 14, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.6,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDES DE CONTEÚDO — MÓDULO 4: COMUNICAÇÃO ORAL
// ══════════════════════════════════════════════════════════════════════════════

// ── SLIDE 36 — Divisor Módulo 4 ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 2.0, w: W, h: 1.6, fill: { color: COR.PRIMARY } });
  s.addText('MÓDULO 4', {
    x: 0.5, y: 0.5, w: 9, h: 0.7,
    fontSize: 18, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Comunicação Oral', {
    x: 0.5, y: 2.05, w: 9, h: 1.0,
    fontSize: 40, bold: true, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Carga horária: 12 horas', {
    x: 0.5, y: 3.7, w: 9, h: 0.5,
    fontSize: 16, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 37 — Fala vs. Escrita ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Fala vs. Escrita — Diferenças de Registro', { fontSize: 26 });
  const comparativo = [
    ['Aspecto', 'Linguagem Oral', 'Linguagem Escrita'],
    ['Planejamento', 'Espontânea, imediata', 'Planejada e revisada'],
    ['Suporte', 'Voz, gestos, expressão', 'Texto impresso ou digital'],
    ['Gramática', 'Mais flexível', 'Mais formal e normativa'],
    ['Recursos', 'Tom, volume, pausa', 'Pontuação, formatação'],
    ['Contexto', 'Compartilhado (face a face)', 'Precisa ser explicado no texto'],
  ];
  comparativo.forEach((row, i) => {
    const y = 1.05 + i * 0.73;
    const bg = i === 0 ? COR.ACCENT : (i % 2 === 0 ? COR.CARD : COR.SECONDARY);
    const tc = i === 0 ? COR.DARK : COR.LIGHT;
    [0, 1, 2].forEach((col) => {
      const widths = [2.0, 3.5, 3.5];
      const xs = [0.4, 2.45, 6.0];
      s.addShape(pres.ShapeType.rect, { x: xs[col], y, w: widths[col], h: 0.63, fill: { color: bg } });
      s.addText(row[col], {
        x: xs[col] + 0.08, y, w: widths[col] - 0.16, h: 0.63,
        fontSize: i === 0 ? 13 : 12, bold: i === 0, color: tc,
        fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0,
      });
    });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 38 — Como Participar de um Debate ─────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Como Participar de um Debate', { fontSize: 28 });
  const dicas = [
    ['📋', 'Prepare-se', 'Pesquise o tema antes. Conheça argumentos a favor E contra.'],
    ['🗣️', 'Defenda com argumentos', 'Use fatos, dados, exemplos — não apenas opiniões pessoais.'],
    ['👂', 'Ouça para responder', 'Escute o que o outro diz antes de falar. Refute com lógica, não com emoção.'],
    ['🤝', 'Respeite o turno', 'Aguarde a vez de falar. Não interrompa o outro participante.'],
    ['🔄', 'Saiba ceder', 'Se o argumento do outro for melhor, reconheça. Isso demonstra maturidade intelectual.'],
    ['📢', 'Fale com clareza', 'Organize sua fala: apresente a tese, argumente e conclua.'],
  ];
  dicas.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.85;
    const y = 1.1 + row * 1.38;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.22, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(d[0], { x: x + 0.1, y, w: 0.75, h: 1.22, fontSize: 24, align: 'center', valign: 'middle' });
    s.addText(d[1], { x: x + 0.9, y: y + 0.1, w: 3.45, h: 0.38, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(d[2], { x: x + 0.9, y: y + 0.5, w: 3.45, h: 0.65, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 39 — Apresentação Oral ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Apresentação Oral — Estrutura e Dicas', { fontSize: 27 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.1, w: 4.4, h: 3.9, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('📋 Estrutura', { x: 0.55, y: 1.18, w: 4.1, h: 0.4, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  s.addText('1. Abertura\n   Cumprimente e apresente o tema.\n\n2. Desenvolvimento\n   Apresente suas ideias com ordem e clareza.\n\n3. Conclusão\n   Retome o ponto principal e finalize.', {
    x: 0.55, y: 1.62, w: 4.1, h: 3.2,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.4,
  });
  s.addShape(pres.ShapeType.roundRect, { x: 5.2, y: 1.1, w: 4.4, h: 3.9, fill: { color: COR.CARD }, rectRadius: 0.12 });
  s.addText('💡 Dicas Práticas', { x: 5.35, y: 1.18, w: 4.1, h: 0.4, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  s.addText('• Treine em voz alta antes\n• Fale devagar e com clareza\n• Mantenha contato visual\n• Controle o nervosismo: respire fundo\n• Use gestos naturais\n• Não leia o texto — fale de memória\n• Respeite o tempo combinado', {
    x: 5.35, y: 1.62, w: 4.1, h: 3.2,
    fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.4,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 40 — Argumentação ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Argumentação — Como Defender uma Ideia', { fontSize: 26 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.75, fill: { color: COR.PRIMARY }, rectRadius: 0.1 });
  s.addText('Argumentar = apresentar razões consistentes para defender uma tese ou ponto de vista.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.75,
    fontSize: 14, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const tipos = [
    ['📊', 'Argumento por dados', 'Use estatísticas, pesquisas e fatos verificáveis. Ex: "Segundo o IBGE, 30% dos jovens..."'],
    ['🧠', 'Argumento por autoridade', 'Cite especialistas ou instituições reconhecidas. Ex: "Segundo a OMS..."'],
    ['🌍', 'Argumento por exemplos', 'Apresente casos concretos que ilustrem sua tese.'],
    ['🔄', 'Argumento por comparação', 'Compare situações similares para reforçar seu ponto.'],
  ];
  tipos.forEach((t, i) => {
    const y = 1.9 + i * 0.87;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.77, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(t[0], { x: 0.5, y, w: 0.65, h: 0.77, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(t[1], { x: 1.2, y, w: 2.7, h: 0.77, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(t[2], { x: 3.95, y, w: 5.5, h: 0.77, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 41 — Escuta Ativa ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Escuta Ativa e Respeito à Fala do Outro', { fontSize: 26 });
  s.addText('Escuta ativa é ouvir com ATENÇÃO e INTENÇÃO — não apenas aguardar a vez de falar.', {
    x: 0.5, y: 1.05, w: 9, h: 0.55,
    fontSize: 14, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0, italics: true,
  });
  const atitudes = [
    ['👀', 'Olhe para quem fala', 'Mostre que você está presente e atento.'],
    ['🤐', 'Não interrompa', 'Aguarde o interlocutor terminar antes de responder.'],
    ['📝', 'Tome notas mentais', 'Identifique os pontos principais do que está sendo dito.'],
    ['❓', 'Faça perguntas', 'Perguntas pertinentes mostram que você ouviu com atenção.'],
    ['🤝', 'Respeite as diferenças', 'Você pode discordar sem desrespeitar. Opiniões diferentes enriquecem o diálogo.'],
  ];
  atitudes.forEach((a, i) => {
    const y = 1.7 + i * 0.78;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.67, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(a[0], { x: 0.5, y, w: 0.65, h: 0.67, fontSize: 20, align: 'center', valign: 'middle' });
    s.addText(a[1], { x: 1.2, y, w: 2.5, h: 0.67, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(a[2], { x: 3.75, y, w: 5.7, h: 0.67, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDES DE CONTEÚDO — MÓDULO 5: AUTONOMIA E ESTRATÉGIAS DE ESTUDO
// ══════════════════════════════════════════════════════════════════════════════

// ── SLIDE 42 — Divisor Módulo 5 ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 2.0, w: W, h: 1.6, fill: { color: COR.SECONDARY } });
  s.addText('MÓDULO 5', {
    x: 0.5, y: 0.5, w: 9, h: 0.7,
    fontSize: 18, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Autonomia e Estratégias de Estudo', {
    x: 0.5, y: 2.05, w: 9, h: 1.0,
    fontSize: 32, bold: true, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Carga horária: 12 horas', {
    x: 0.5, y: 3.7, w: 9, h: 0.5,
    fontSize: 16, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 43 — Gêneros Textuais ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Gêneros Textuais no Cotidiano', { fontSize: 28 });
  const generos = [
    ['📰', 'Notícia', 'Informa sobre fatos reais de forma objetiva. Tem título, lide e corpo.'],
    ['😄', 'Charge', 'Texto visual (desenho) que critica ou satiriza situações da realidade.'],
    ['🎭', 'Poema', 'Texto literário com ritmo, rima e linguagem conotativa para expressar sentimentos.'],
    ['📧', 'E-mail', 'Comunicação escrita digital com assunto, destinatário, mensagem e assinatura.'],
    ['📄', 'Resumo', 'Síntese de um texto maior, mantendo as ideias principais com linguagem objetiva.'],
  ];
  generos.forEach((g, i) => {
    const y = 1.1 + i * 0.87;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.77, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(g[0], { x: 0.5, y, w: 0.65, h: 0.77, fontSize: 22, align: 'center', valign: 'middle' });
    s.addText(g[1], { x: 1.2, y, w: 1.8, h: 0.77, fontSize: 13, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(g[2], { x: 3.05, y, w: 6.4, h: 0.77, fontSize: 12.5, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 44 — Leitura Crítica ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Leitura Crítica — Questionar o que Lemos', { fontSize: 26 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.78, fill: { color: COR.SECONDARY }, rectRadius: 0.1 });
  s.addText('Ler criticamente = não aceitar o texto passivamente, mas questionar, analisar e avaliar a informação.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.78,
    fontSize: 13.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const perguntas = [
    ['🔍', 'Quem escreveu?', 'Qual é a credibilidade da fonte? Qual é o interesse do autor?'],
    ['📅', 'Quando foi escrito?', 'A informação ainda é atual? O contexto mudou?'],
    ['💰', 'Qual é o interesse?', 'O texto tem intenção comercial, política ou ideológica?'],
    ['📊', 'Há evidências?', 'Os dados e argumentos são verificáveis? De onde vêm?'],
    ['🌐', 'Que vozes estão ausentes?', 'Que perspectivas o texto ignora ou silencia?'],
  ];
  perguntas.forEach((p, i) => {
    const y = 1.93 + i * 0.73;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.63, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(p[0], { x: 0.5, y, w: 0.6, h: 0.63, fontSize: 18, align: 'center', valign: 'middle' });
    s.addText(p[1], { x: 1.15, y, w: 2.5, h: 0.63, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(p[2], { x: 3.7, y, w: 5.75, h: 0.63, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 45 — Como Fazer um Resumo ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.SECONDARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Como Fazer um Resumo', { fontSize: 30 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.4, y: 1.05, w: 9.2, h: 0.7, fill: { color: COR.PRIMARY }, rectRadius: 0.1 });
  s.addText('Resumo ≠ cópia. Um bom resumo captura as ideias principais com suas PRÓPRIAS palavras.', {
    x: 0.55, y: 1.05, w: 8.9, h: 0.7,
    fontSize: 13.5, color: COR.LIGHT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  const passos = [
    ['1', 'Leitura global', 'Leia o texto inteiro para entender o assunto geral.'],
    ['2', 'Identifique os tópicos', 'Anote o tema de cada parágrafo ou seção.'],
    ['3', 'Elimine o secundário', 'Corte exemplos, repetições e detalhes não essenciais.'],
    ['4', 'Escreva com suas palavras', 'Não copie frases do texto — reformule as ideias.'],
    ['5', 'Revise', 'O resumo deve ser coerente e independente do texto original.'],
  ];
  passos.forEach((p, i) => {
    const y = 1.85 + i * 0.74;
    s.addShape(pres.ShapeType.roundRect, { x: 0.4, y, w: 9.2, h: 0.64, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addShape(pres.ShapeType.ellipse, { x: 0.45, y: y + 0.07, w: 0.5, h: 0.5, fill: { color: COR.ACCENT } });
    s.addText(p[0], { x: 0.45, y: y + 0.07, w: 0.5, h: 0.5, fontSize: 14, bold: true, color: COR.DARK, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s.addText(p[1], { x: 1.05, y: y + 0.04, w: 2.4, h: 0.3, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(p[2], { x: 1.05, y: y + 0.35, w: 8.0, h: 0.25, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 46 — Estratégias de Leitura para Provas ───────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  addTitle(s, 'Estratégias de Leitura para Provas e Avaliações', { fontSize: 24 });
  const estrategias = [
    ['📖', 'Leia o enunciado com calma', 'Identifique o que a questão realmente pede antes de ler o texto.'],
    ['🔍', 'Sublinhe palavras-chave', 'Marque termos importantes no texto e na questão.'],
    ['❓', 'Atenção ao que a questão pede', 'EXPLÍCITO? IMPLÍCITO? TEMA? IDEIA PRINCIPAL? Cada um exige uma leitura diferente.'],
    ['⏱️', 'Gerencie o tempo', 'Não trave em uma questão difícil. Passe para a próxima e volte depois.'],
    ['🧩', 'Elimine alternativas erradas', 'Em questões de múltipla escolha, comece descartando o que claramente está errado.'],
    ['🔄', 'Revise antes de entregar', 'Reserve tempo para reler suas respostas e corrigir possíveis equívocos.'],
  ];
  estrategias.forEach((e, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.85;
    const y = 1.1 + row * 1.38;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.5, h: 1.22, fill: { color: COR.CARD }, rectRadius: 0.1 });
    s.addText(e[0], { x: x + 0.1, y, w: 0.75, h: 1.22, fontSize: 24, align: 'center', valign: 'middle' });
    s.addText(e[1], { x: x + 0.92, y: y + 0.1, w: 3.43, h: 0.38, fontSize: 12, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'left', valign: 'middle', margin: 0 });
    s.addText(e[2], { x: x + 0.92, y: y + 0.5, w: 3.43, h: 0.65, fontSize: 11.5, color: COR.LIGHT, fontFace: 'Calibri', align: 'left', valign: 'top', margin: 0 });
  });
  addFooter(s, 'Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens');
}

// ── SLIDE 47 — Slide Final: Síntese ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBg(s, COR.PRIMARY);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.12, fill: { color: COR.ACCENT } });
  // Faixa inferior
  s.addShape(pres.ShapeType.rect, { x: 0, y: H - 0.95, w: W, h: 0.95, fill: { color: COR.SECONDARY } });
  s.addText('Ler e escrever bem abre portas.', {
    x: 0.5, y: 0.4, w: 9, h: 0.9,
    fontSize: 36, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addShape(pres.ShapeType.rect, { x: 1.5, y: 1.4, w: 7, h: 0.06, fill: { color: COR.ACCENT } });
  const pilares = [
    ['📖', 'Leitura', 'Compreender o mundo\nao seu redor'],
    ['✍️', 'Escrita', 'Expressar suas ideias\ncom clareza'],
    ['🗣️', 'Oralidade', 'Comunicar-se com\nconfiança e respeito'],
    ['🧠', 'Autonomia', 'Aprender a aprender\nao longo da vida'],
  ];
  pilares.forEach((p, i) => {
    const x = 0.5 + i * 2.35;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.55, w: 2.2, h: 2.8, fill: { color: COR.CARD }, rectRadius: 0.14 });
    s.addText(p[0], { x, y: 1.65, w: 2.2, h: 0.75, fontSize: 34, align: 'center', valign: 'middle' });
    s.addText(p[1], { x, y: 2.45, w: 2.2, h: 0.42, fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s.addText(p[2], { x, y: 2.9, w: 2.2, h: 1.38, fontSize: 12, color: COR.LIGHT, fontFace: 'Calibri', align: 'center', valign: 'top', margin: 0 });
  });
  s.addText('Rio do Sul Mais Tech · SENAI · UC: Reforço de Linguagens', {
    x: 0.5, y: H - 0.88, w: 9, h: 0.52,
    fontSize: 14, bold: true, color: COR.ACCENT, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('Juntos, somos mais!', {
    x: 0.5, y: H - 0.42, w: 9, h: 0.35,
    fontSize: 11, color: COR.MUTED, fontFace: 'Calibri',
    align: 'center', valign: 'middle', margin: 0, italics: true,
  });
}

// ── SALVAR ──────────────────────────────────────────────────────────────────
const outputPath = 'C:/fontes/professor-senai/sistema/FICHA-PRODUTO-MAIS-TECH/REFORCO_LINGUAGENS/Slides_Reforco_Linguagens.pptx';
pres.writeFile({ fileName: outputPath })
  .then(() => console.log('PPTX gerado:', outputPath))
  .catch(e => { console.error(e); process.exit(1); });
