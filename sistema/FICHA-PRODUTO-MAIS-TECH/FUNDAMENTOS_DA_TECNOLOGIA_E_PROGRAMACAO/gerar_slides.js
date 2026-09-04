const pptxgen = require('pptxgenjs');

const OUT = 'C:\\fontes\\professor-senai\\sistema\\FICHA-PRODUTO-MAIS-TECH\\FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO\\Slides_Fundamentos_Tecnologia_Programacao.pptx';

const AZUL = '0B3D91';
const CIANO = '00E5FF';
const FUNDO = 'E8F4FD';
const BRANCO = 'FFFFFF';
const CINZA = '444444';
const FOOTER = 'Rio do Sul Mais Tech Â· SENAI Â· UC: Fundamentos da Tecnologia e ProgramaÃ§Ã£o';

function addFooter(slide) {
  slide.addText(FOOTER, {
    x: 0.3, y: 5.3, w: 9.4, h: 0.25,
    fontSize: 9, color: '666666', align: 'center', italic: true
  });
}

function addContentSlide(pres, title, bodyFn) {
  const slide = pres.addSlide();
  slide.background = { color: FUNDO };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  slide.addText(title, {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9,
    fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  bodyFn(slide);
  addFooter(slide);
  return slide;
}

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Slide 1 â€” Capa
{
  const s = pres.addSlide();
  s.background = { color: AZUL };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 2.4, w: 10, h: 0.08, fill: { color: CIANO } });
  s.addText('Fundamentos da Tecnologia\ne ProgramaÃ§Ã£o', {
    x: 0.5, y: 0.7, w: 9, h: 1.8,
    fontSize: 38, bold: true, color: BRANCO, align: 'center', valign: 'middle'
  });
  s.addText('Rio do Sul Mais Tech Â· SENAI', {
    x: 0.5, y: 2.6, w: 9, h: 0.7,
    fontSize: 22, color: CIANO, align: 'center', bold: true
  });
  s.addText('Prefeitura Municipal de Rio do Sul', {
    x: 0.5, y: 3.3, w: 9, h: 0.5,
    fontSize: 16, color: BRANCO, align: 'center'
  });
  s.addText('IniciaÃ§Ã£o Profissional Â· SENAI', {
    x: 0.5, y: 4.8, w: 9, h: 0.4,
    fontSize: 13, color: '9ECFFF', align: 'center', italic: true
  });
}

// Slide 2 â€” Visual institucional
{
  const s = pres.addSlide();
  s.background = { color: AZUL };
  s.addShape(pres.ShapeType.rect, { x: 1, y: 1.2, w: 8, h: 3.2, fill: { color: '0A2F6E' } });
  s.addText('RIO DO SUL\nMAIS TECH', {
    x: 1, y: 1.3, w: 8, h: 1.8,
    fontSize: 48, bold: true, color: BRANCO, align: 'center', valign: 'middle'
  });
  s.addText('SENAI Â· Prefeitura Municipal de Rio do Sul', {
    x: 1, y: 3.2, w: 8, h: 0.8,
    fontSize: 18, color: CIANO, align: 'center'
  });
  s.addText('Tecnologia que transforma vidas', {
    x: 1, y: 4.8, w: 8, h: 0.5,
    fontSize: 14, color: '9ECFFF', align: 'center', italic: true
  });
}

// Slide 3 â€” IdentificaÃ§Ã£o da UC
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('IdentificaÃ§Ã£o da Unidade Curricular', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9,
    fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  const items = [
    ['UC:', 'Fundamentos da Tecnologia e ProgramaÃ§Ã£o'],
    ['Carga HorÃ¡ria:', '33 horas presenciais'],
    ['Modalidade:', 'Presencial'],
    ['Encontros:', '~17 encontros de 2h'],
    ['Programa:', 'Rio do Sul Mais Tech â€” SENAI'],
    ['PÃºblico:', 'Alunos do 8Â° e 9Â° ano (12â€“15 anos)'],
  ];
  items.forEach(([label, value], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.3 + i * 0.65, w: 9.2, h: 0.55, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(label, { x: 0.5, y: 1.32 + i * 0.65, w: 2.5, h: 0.5, fontSize: 14, bold: true, color: AZUL });
    s.addText(value, { x: 3.1, y: 1.32 + i * 0.65, w: 6.4, h: 0.5, fontSize: 14, color: CINZA });
  });
  addFooter(s);
}

// Slide 4 â€” ApresentaÃ§Ã£o do Professor
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('ApresentaÃ§Ã£o do Professor', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  s.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.3, w: 9, h: 3.8, fill: { color: BRANCO } });
  const campos = [
    ['Nome:', '[Nome do Professor]'],
    ['FormaÃ§Ã£o:', '[Ãrea de FormaÃ§Ã£o]'],
    ['ExperiÃªncia:', '[Anos de experiÃªncia / Ã¡rea de atuaÃ§Ã£o]'],
    ['Contato:', '[E-mail ou canal de comunicaÃ§Ã£o]'],
    ['Curiosidade:', '[Uma curiosidade sobre vocÃª ou sua Ã¡rea]'],
  ];
  campos.forEach(([label, val], i) => {
    s.addText(label, { x: 0.7, y: 1.5 + i * 0.68, w: 2.2, h: 0.55, fontSize: 15, bold: true, color: AZUL });
    s.addText(val, { x: 2.9, y: 1.5 + i * 0.68, w: 6.4, h: 0.55, fontSize: 15, color: CINZA, italic: true });
  });
  addFooter(s);
}

// Slide 5 â€” DinÃ¢mica AviÃ£o de Papel
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('DinÃ¢mica: AviÃ£o de Papel', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  s.addText('Como funciona?', { x: 0.4, y: 1.2, w: 9, h: 0.45, fontSize: 18, bold: true, color: AZUL });
  const steps = [
    '1.  Cada aluno recebe uma folha de papel',
    '2.  Escreva: nome, uma habilidade que tem e uma expectativa do curso',
    '3.  Dobre a folha em formato de aviÃ£o de papel',
    '4.  Ao sinal do professor, todos lanÃ§am os aviÃµes ao mesmo tempo',
    '5.  Cada um pega um aviÃ£o do chÃ£o e lÃª em voz alta para a turma',
    '6.  Descobrimos os talentos e as expectativas da turma!',
  ];
  steps.forEach((step, i) => {
    s.addText(step, {
      x: 0.5, y: 1.75 + i * 0.58, w: 9, h: 0.5,
      fontSize: 15, color: CINZA,
      bullet: false
    });
  });
  s.addText('Objetivo: conhecer a turma de forma leve e descontraÃ­da!', {
    x: 0.4, y: 5.05, w: 9.2, h: 0.35,
    fontSize: 13, color: AZUL, italic: true, bold: true
  });
  addFooter(s);
}

// Slide 6 â€” Plano de Ensino
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Plano de Ensino', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  const info = [
    ['Carga HorÃ¡ria Total', '33 horas presenciais'],
    ['NÃºmero de Encontros', '~17 encontros'],
    ['DuraÃ§Ã£o de cada encontro', '2 horas'],
    ['Dias da semana', 'Segunda a sexta-feira'],
    ['Local', 'LabTEC (polo do aluno)'],
    ['Forma de avaliaÃ§Ã£o', 'FrequÃªncia â‰¥ 75% + Nota â‰¥ 7'],
  ];
  info.forEach(([label, val], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.3 + i * 0.65, w: 4.3, h: 0.55, fill: { color: AZUL } });
    s.addShape(pres.ShapeType.rect, { x: 4.75, y: 1.3 + i * 0.65, w: 4.85, h: 0.55, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(label, { x: 0.5, y: 1.32 + i * 0.65, w: 4.1, h: 0.5, fontSize: 13, bold: true, color: BRANCO });
    s.addText(val, { x: 4.85, y: 1.32 + i * 0.65, w: 4.6, h: 0.5, fontSize: 13, color: CINZA });
  });
  addFooter(s);
}

// Slide 7 â€” Capacidades TÃ©cnicas
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Capacidades TÃ©cnicas', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  const caps = [
    'Entender o funcionamento de computadores, sistemas operacionais e redes bÃ¡sicas',
    'Aplicar lÃ³gica sequencial para resolver problemas do cotidiano',
    'Criar algoritmos simples usando estruturas de sequÃªncia, decisÃ£o e repetiÃ§Ã£o',
    'Identificar os conceitos de entrada, processamento e saÃ­da de dados',
    'Utilizar ferramentas digitais (Google Workspace) com produtividade',
    'Pensar criativamente com tecnologia usando o Scratch',
    'Adotar postura Ã©tica e responsÃ¡vel no ambiente digital',
  ];
  caps.forEach((cap, i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.58, w: 0.45, h: 0.45, fill: { color: CIANO } });
    s.addText((i + 1).toString(), { x: 0.4, y: 1.27 + i * 0.58, w: 0.45, h: 0.42, fontSize: 14, bold: true, color: AZUL, align: 'center' });
    s.addText(cap, { x: 0.95, y: 1.27 + i * 0.58, w: 8.7, h: 0.48, fontSize: 13, color: CINZA });
  });
  addFooter(s);
}

// Slide 8 â€” Capacidades Socioemocionais
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Capacidades Socioemocionais', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  const cards = [
    ['Curiosidade', 'Fazer perguntas, explorar e investigar sem medo de errar'],
    ['PersistÃªncia', 'Tentar de novo quando o cÃ³digo nÃ£o funciona na primeira vez'],
    ['ColaboraÃ§Ã£o', 'Trabalhar em equipe, compartilhar soluÃ§Ãµes e ajudar colegas'],
    ['Responsabilidade\nDigital', 'Usar a internet e a tecnologia de forma Ã©tica e segura'],
  ];
  cards.forEach(([title, desc], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.3 + row * 1.9;
    s.addShape(pres.ShapeType.rect, { x, y, w: 4.5, h: 1.7, fill: { color: col === 0 ? '1A5276' : '0B3D91' } });
    s.addText(title, { x: x + 0.15, y: y + 0.1, w: 4.2, h: 0.5, fontSize: 16, bold: true, color: CIANO });
    s.addText(desc, { x: x + 0.15, y: y + 0.6, w: 4.2, h: 0.9, fontSize: 13, color: BRANCO });
  });
  addFooter(s);
}

// Slide 9 â€” Conhecimentos I
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Conhecimentos I â€” Tecnologia e Cidadania Digital', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 22, bold: true, color: BRANCO, valign: 'middle'
  });
  const topics = [
    ['Tecnologia no cotidiano', 'Celular, streaming, apps, wearables â€” tecnologia estÃ¡ em todo lugar'],
    ['EvoluÃ§Ã£o dos computadores', 'De salas enormes nos anos 1940 ao dispositivo de bolso atual'],
    ['Cidadania digital', 'Direitos, deveres e pegada digital na internet'],
    ['Fake News', 'Como identificar notÃ­cias falsas e verificar fontes confiÃ¡veis'],
    ['Cyberbullying', 'O que Ã©, como age e como denunciar com seguranÃ§a'],
  ];
  topics.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.8, w: 9.2, h: 0.7, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(title, { x: 0.6, y: 1.3 + i * 0.8, w: 3.0, h: 0.6, fontSize: 14, bold: true, color: AZUL });
    s.addText(desc, { x: 3.7, y: 1.3 + i * 0.8, w: 5.7, h: 0.6, fontSize: 13, color: CINZA });
  });
  addFooter(s);
}

// Slide 10 â€” Conhecimentos II
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Conhecimentos II â€” Hardware, Software e OrganizaÃ§Ã£o', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 22, bold: true, color: BRANCO, valign: 'middle'
  });
  const topics = [
    ['Hardware vs Software', 'Componentes fÃ­sicos (o que vocÃª toca) vs programas (o que vocÃª usa)'],
    ['Sistemas Operacionais', 'Windows, Linux, ChromeOS â€” diferenÃ§as e onde cada um Ã© usado'],
    ['Componentes do PC', 'CPU, RAM, HD/SSD, placa-mÃ£e, GPU â€” funÃ§Ã£o de cada um'],
    ['OrganizaÃ§Ã£o de Arquivos', 'Pastas, criar, copiar, renomear e excluir arquivos com seguranÃ§a'],
    ['Atalhos do Teclado', 'Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+X â€” produtividade na prÃ¡tica'],
  ];
  topics.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.8, w: 9.2, h: 0.7, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(title, { x: 0.6, y: 1.3 + i * 0.8, w: 3.2, h: 0.6, fontSize: 14, bold: true, color: AZUL });
    s.addText(desc, { x: 3.9, y: 1.3 + i * 0.8, w: 5.5, h: 0.6, fontSize: 13, color: CINZA });
  });
  addFooter(s);
}

// Slide 11 â€” Conhecimentos III
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Conhecimentos III â€” Google, Internet e Scratch', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 22, bold: true, color: BRANCO, valign: 'middle'
  });
  const topics = [
    ['Google Docs', 'CriaÃ§Ã£o e ediÃ§Ã£o de textos colaborativos na nuvem'],
    ['Google Slides', 'ApresentaÃ§Ãµes digitais acessÃ­veis de qualquer dispositivo'],
    ['Google Sheets', 'Planilhas para organizar dados e fazer cÃ¡lculos simples'],
    ['Internet Segura', 'Navegadores, senhas fortes, privacidade e golpes online'],
    ['Scratch', 'ProgramaÃ§Ã£o visual com blocos para criar animaÃ§Ãµes e jogos'],
  ];
  topics.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.8, w: 9.2, h: 0.7, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(title, { x: 0.6, y: 1.3 + i * 0.8, w: 2.8, h: 0.6, fontSize: 14, bold: true, color: AZUL });
    s.addText(desc, { x: 3.5, y: 1.3 + i * 0.8, w: 5.9, h: 0.6, fontSize: 13, color: CINZA });
  });
  addFooter(s);
}

// Slide 12 â€” Combinados
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Combinados da Turma', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  const combinados = [
    'Respeitar colegas, professor e o espaÃ§o do LabTEC',
    'Chegar no horÃ¡rio â€” pontualidade Ã© essencial',
    'Celular: apenas quando autorizado pelo professor para a atividade',
    'Participar ativamente das atividades e dinÃ¢micas',
    'Cuidar dos equipamentos com responsabilidade',
    'Expressar dÃºvidas sem medo â€” toda pergunta Ã© vÃ¡lida!',
  ];
  combinados.forEach((c, i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.67, w: 0.42, h: 0.42, fill: { color: CIANO } });
    s.addText('âœ“', { x: 0.4, y: 1.27 + i * 0.67, w: 0.42, h: 0.38, fontSize: 14, bold: true, color: AZUL, align: 'center' });
    s.addText(c, { x: 0.92, y: 1.28 + i * 0.67, w: 8.7, h: 0.48, fontSize: 14, color: CINZA });
  });
  addFooter(s);
}

// Slide 13 â€” AvaliaÃ§Ã£o
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('Sistema de AvaliaÃ§Ã£o', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  const notas = [
    ['Nota 1', 'NÃ£o atingiu os objetivos esperados', 'E85D04'],
    ['Nota 2', 'Atingiu parcialmente os objetivos', 'F4A261'],
    ['Nota 3', 'Atingiu os objetivos com qualidade', '2A9D8F'],
    ['Nota 4', 'Superou os objetivos com destaque', '1A7431'],
  ];
  notas.forEach(([nota, desc, cor], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.3 + i * 0.8, w: 1.3, h: 0.65, fill: { color: cor } });
    s.addText(nota, { x: 0.4, y: 1.32 + i * 0.8, w: 1.3, h: 0.6, fontSize: 16, bold: true, color: BRANCO, align: 'center' });
    s.addText(desc, { x: 1.85, y: 1.34 + i * 0.8, w: 7.8, h: 0.6, fontSize: 14, color: CINZA });
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 4.55, w: 9.2, h: 0.55, fill: { color: '1A5276' } });
  s.addText('AprovaÃ§Ã£o: FrequÃªncia â‰¥ 75% E Nota â‰¥ 7', {
    x: 0.4, y: 4.57, w: 9.2, h: 0.5, fontSize: 15, bold: true, color: BRANCO, align: 'center'
  });
  addFooter(s);
}

// Slide 14 â€” Comportamento
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('AvaliaÃ§Ã£o de Comportamento e Atitude', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 24, bold: true, color: BRANCO, valign: 'middle'
  });
  s.addText('O comportamento faz parte da sua formaÃ§Ã£o profissional.', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.45, fontSize: 15, italic: true, color: AZUL
  });
  const items = [
    'Pontualidade e comprometimento com os encontros',
    'Respeito com colegas e com o espaÃ§o do LabTEC',
    'ParticipaÃ§Ã£o ativa nas atividades e dinÃ¢micas',
    'Responsabilidade com os equipamentos e materiais',
    'Postura Ã©tica no uso da tecnologia e da internet',
  ];
  items.forEach((item, i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.8 + i * 0.7, w: 9.2, h: 0.6, fill: { color: i % 2 === 0 ? 'EBF5FB' : BRANCO } });
    s.addText('â†’  ' + item, { x: 0.6, y: 1.83 + i * 0.7, w: 8.8, h: 0.52, fontSize: 14, color: CINZA });
  });
  addFooter(s);
}

// Slide 15 â€” SituaÃ§Ã£o de Aprendizagem
{
  const s = pres.addSlide();
  s.background = { color: FUNDO };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: AZUL } });
  s.addText('SituaÃ§Ã£o de Aprendizagem', {
    x: 0.3, y: 0.1, w: 9.4, h: 0.9, fontSize: 26, bold: true, color: BRANCO, valign: 'middle'
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.2, w: 9.2, h: 3.8, fill: { color: '1A3A5C' } });
  s.addText('Projeto Final: AnimaÃ§Ã£o ou Jogo no Scratch', {
    x: 0.6, y: 1.35, w: 8.8, h: 0.6, fontSize: 20, bold: true, color: CIANO
  });
  s.addText(
    'Criar uma animaÃ§Ã£o ou jogo no Scratch contando sua histÃ³ria de vida,\num desafio do seu bairro ou uma mensagem para o mundo.',
    { x: 0.6, y: 2.0, w: 8.8, h: 0.9, fontSize: 15, color: BRANCO }
  );
  s.addText('O projeto deve incluir:', { x: 0.6, y: 3.0, w: 8.8, h: 0.4, fontSize: 14, bold: true, color: CIANO });
  const itens = ['Personagem animado com movimentos e sons', 'Pelo menos uma estrutura de decisÃ£o (se/entÃ£o)', 'Uma mensagem clara para quem assistir'];
  itens.forEach((item, i) => {
    s.addText('â€¢ ' + item, { x: 0.8, y: 3.45 + i * 0.38, w: 8.4, h: 0.36, fontSize: 13, color: BRANCO });
  });
  addFooter(s);
}

// ===== SLIDES DE CONTEÃšDO PEDAGÃ“GICO (16â€“33) =====

// Slide 16 â€” O que Ã© Tecnologia?
addContentSlide(pres, 'O que Ã© Tecnologia?', (s) => {
  s.addText('Tecnologia Ã© o uso do conhecimento para criar ferramentas, sistemas\ne soluÃ§Ãµes que facilitam a vida das pessoas.', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.8, fontSize: 15, color: CINZA, italic: true
  });
  const exemplos = [
    ['Celular', 'ComunicaÃ§Ã£o, entretenimento, cÃ¢mera, GPS e muito mais'],
    ['Streaming', 'Netflix, Spotify â€” conteÃºdo sob demanda, qualquer hora'],
    ['Apps de entrega', 'Pedir comida, transporte, compras com um toque'],
    ['Redes sociais', 'Conectar pessoas, compartilhar ideias e criar conteÃºdo'],
    ['Games', 'Entretenimento, raciocÃ­nio lÃ³gico e atÃ© profissÃ£o!'],
  ];
  exemplos.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 2.1 + i * 0.63, w: 9.2, h: 0.55, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(title, { x: 0.6, y: 2.13 + i * 0.63, w: 2.4, h: 0.48, fontSize: 14, bold: true, color: AZUL });
    s.addText(desc, { x: 3.1, y: 2.13 + i * 0.63, w: 6.3, h: 0.48, fontSize: 13, color: CINZA });
  });
});

// Slide 17 â€” EvoluÃ§Ã£o dos Computadores
addContentSlide(pres, 'EvoluÃ§Ã£o dos Computadores', (s) => {
  const timeline = [
    ['1940s', 'ENIAC â€” ocupava uma sala inteira, pesava 30 toneladas'],
    ['1970s', 'Computadores pessoais surgem (Apple I, IBM PC)'],
    ['1990s', 'Internet chega ao pÃºblico; Windows 95 populariza o PC'],
    ['2000s', 'Laptops, pen drives, cÃ¢meras digitais, MP3'],
    ['2010s', 'Smartphones dominam; nuvem, apps e redes sociais explodem'],
    ['Hoje', 'IA, wearables, realidade aumentada â€” computaÃ§Ã£o em todo lugar'],
  ];
  timeline.forEach(([ano, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.67, w: 1.2, h: 0.55, fill: { color: AZUL } });
    s.addText(ano, { x: 0.4, y: 1.27 + i * 0.67, w: 1.2, h: 0.5, fontSize: 13, bold: true, color: BRANCO, align: 'center' });
    s.addShape(pres.ShapeType.rect, { x: 1.65, y: 1.25 + i * 0.67, w: 8, h: 0.55, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(desc, { x: 1.8, y: 1.27 + i * 0.67, w: 7.7, h: 0.5, fontSize: 13, color: CINZA });
  });
});

// Slide 18 â€” Cidadania Digital
addContentSlide(pres, 'Cidadania Digital', (s) => {
  s.addText('Ser cidadÃ£o digital Ã© exercer seus direitos e responsabilidades na internet.', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.5, fontSize: 15, color: CINZA, italic: true
  });
  s.addText('Direitos:', { x: 0.4, y: 1.8, w: 4.4, h: 0.4, fontSize: 16, bold: true, color: AZUL });
  s.addText('Responsabilidades:', { x: 5.0, y: 1.8, w: 4.6, h: 0.4, fontSize: 16, bold: true, color: AZUL });
  const direitos = ['Privacidade online', 'Acesso Ã  informaÃ§Ã£o', 'Liberdade de expressÃ£o (com limites)', 'SeguranÃ§a dos dados pessoais'];
  const resp = ['Respeitar os outros na internet', 'Verificar antes de compartilhar', 'Proteger senhas e dados pessoais', 'Denunciar conteÃºdo prejudicial'];
  direitos.forEach((d, i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 2.3 + i * 0.65, w: 4.4, h: 0.55, fill: { color: 'D6EAF8' } });
    s.addText('â€¢ ' + d, { x: 0.55, y: 2.33 + i * 0.65, w: 4.1, h: 0.48, fontSize: 13, color: CINZA });
  });
  resp.forEach((r, i) => {
    s.addShape(pres.ShapeType.rect, { x: 5.0, y: 2.3 + i * 0.65, w: 4.6, h: 0.55, fill: { color: 'EBF5FB' } });
    s.addText('â€¢ ' + r, { x: 5.15, y: 2.33 + i * 0.65, w: 4.3, h: 0.48, fontSize: 13, color: CINZA });
  });
  s.addText('Sua pegada digital Ã© permanente â€” pense antes de postar!', {
    x: 0.4, y: 5.0, w: 9.2, h: 0.35, fontSize: 13, bold: true, color: AZUL, italic: true
  });
});

// Slide 19 â€” Fake News e Cyberbullying
addContentSlide(pres, 'Fake News e Cyberbullying', (s) => {
  s.addText('Como identificar Fake News:', { x: 0.4, y: 1.2, w: 9, h: 0.4, fontSize: 16, bold: true, color: AZUL });
  const fn = [
    '1. Verifique a fonte â€” Ã© um site confiÃ¡vel e reconhecido?',
    '2. Confira a data â€” a notÃ­cia Ã© atual ou antiga?',
    '3. Pesquise em outros portais â€” outros veÃ­culos confirmam?',
    '4. Cuidado com tÃ­tulos exagerados e sensacionalistas',
  ];
  fn.forEach((f, i) => {
    s.addText(f, { x: 0.5, y: 1.65 + i * 0.5, w: 9, h: 0.45, fontSize: 13, color: CINZA });
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 3.7, w: 9.2, h: 0.04, fill: { color: CIANO } });
  s.addText('O que Ã© Cyberbullying?', { x: 0.4, y: 3.85, w: 9, h: 0.4, fontSize: 16, bold: true, color: AZUL });
  s.addText('SÃ£o agressÃµes, humilhaÃ§Ãµes ou assÃ©dio praticados pela internet ou celular. Afeta a saÃºde mental e Ã© crime no Brasil (Lei 13.185/2015).', {
    x: 0.5, y: 4.3, w: 9, h: 0.6, fontSize: 13, color: CINZA
  });
  s.addText('Como agir: nÃ£o responda, salve evidÃªncias, conte para um adulto de confianÃ§a e denuncie.', {
    x: 0.5, y: 4.95, w: 9, h: 0.35, fontSize: 12, color: 'C0392B', bold: true
  });
});

// Slide 20 â€” SeguranÃ§a na Internet
addContentSlide(pres, 'SeguranÃ§a na Internet', (s) => {
  const dicas = [
    ['Senhas Fortes', 'Use letras, nÃºmeros e sÃ­mbolos. Nunca repita a mesma senha. Ex: Minha@Senha2026!'],
    ['VÃ­rus e Malware', 'NÃ£o baixe arquivos desconhecidos. Mantenha o antivÃ­rus atualizado.'],
    ['Privacidade', 'NÃ£o compartilhe endereÃ§o, escola ou rotina com desconhecidos online.'],
    ['Golpes Online', 'Desconfie de prÃªmios, promoÃ§Ãµes impossÃ­veis e links suspeitos.'],
    ['Wi-Fi PÃºblico', 'Evite fazer login em contas bancÃ¡rias ou pessoais em redes pÃºblicas.'],
  ];
  dicas.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.8, w: 9.2, h: 0.7, fill: { color: i % 2 === 0 ? 'EBF5FB' : BRANCO } });
    s.addText(title, { x: 0.6, y: 1.3 + i * 0.8, w: 2.6, h: 0.6, fontSize: 14, bold: true, color: AZUL });
    s.addText(desc, { x: 3.3, y: 1.3 + i * 0.8, w: 6.1, h: 0.6, fontSize: 12, color: CINZA });
  });
});

// Slide 21 â€” Hardware vs Software
addContentSlide(pres, 'Hardware vs Software', (s) => {
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.2, w: 4.5, h: 3.8, fill: { color: AZUL } });
  s.addShape(pres.ShapeType.rect, { x: 5.1, y: 1.2, w: 4.5, h: 3.8, fill: { color: '1A3A5C' } });
  s.addText('HARDWARE', { x: 0.4, y: 1.25, w: 4.5, h: 0.55, fontSize: 18, bold: true, color: CIANO, align: 'center' });
  s.addText('SOFTWARE', { x: 5.1, y: 1.25, w: 4.5, h: 0.55, fontSize: 18, bold: true, color: CIANO, align: 'center' });
  s.addText('O que vocÃª toca\ne vÃª fisicamente', { x: 0.5, y: 1.85, w: 4.2, h: 0.7, fontSize: 13, color: BRANCO, align: 'center', italic: true });
  s.addText('Os programas que\nvocÃª usa', { x: 5.2, y: 1.85, w: 4.2, h: 0.7, fontSize: 13, color: BRANCO, align: 'center', italic: true });
  const hw = ['Monitor', 'Teclado e mouse', 'CPU (processador)', 'MemÃ³ria RAM', 'HD / SSD'];
  const sw = ['Windows / Linux', 'Google Chrome', 'Word / Google Docs', 'Spotify / Netflix', 'Scratch / Jogos'];
  hw.forEach((h, i) => {
    s.addText('â€¢ ' + h, { x: 0.6, y: 2.65 + i * 0.45, w: 4.0, h: 0.4, fontSize: 13, color: BRANCO });
  });
  sw.forEach((s2, i) => {
    s.addText('â€¢ ' + s2, { x: 5.25, y: 2.65 + i * 0.45, w: 4.0, h: 0.4, fontSize: 13, color: BRANCO });
  });
});

// Slide 22 â€” Componentes do Computador
addContentSlide(pres, 'Componentes do Computador', (s) => {
  const comps = [
    ['CPU (Processador)', 'O "cÃ©rebro" do computador â€” executa todos os cÃ¡lculos e instruÃ§Ãµes'],
    ['MemÃ³ria RAM', 'A "memÃ³ria de trabalho" â€” guarda o que estÃ¡ sendo usado agora'],
    ['HD / SSD', 'O "armÃ¡rio" â€” guarda seus arquivos e programas permanentemente'],
    ['Placa-mÃ£e', 'A "espinha dorsal" â€” conecta todos os componentes entre si'],
    ['GPU (Placa de vÃ­deo)', 'Processa imagens, vÃ­deos e grÃ¡ficos para a tela'],
    ['Fonte de alimentaÃ§Ã£o', 'Converte energia elÃ©trica em tensÃ£o adequada para o PC'],
  ];
  comps.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.67, w: 9.2, h: 0.58, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(title, { x: 0.6, y: 1.28 + i * 0.67, w: 3.2, h: 0.52, fontSize: 13, bold: true, color: AZUL });
    s.addText(desc, { x: 3.9, y: 1.28 + i * 0.67, w: 5.5, h: 0.52, fontSize: 12, color: CINZA });
  });
});

// Slide 23 â€” Sistemas Operacionais
addContentSlide(pres, 'Sistemas Operacionais', (s) => {
  s.addText('O sistema operacional Ã© o programa que gerencia todos os outros programas e recursos do computador.', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.6, fontSize: 14, color: CINZA, italic: true
  });
  const sos = [
    ['Windows', '1A5276', 'O mais popular no mundo. Usado em casa, escolas e empresas. Interface familiar com menus e janelas.'],
    ['Linux', '145A32', 'Gratuito e de cÃ³digo aberto. Muito usado em servidores, programaÃ§Ã£o e sistemas embarcados.'],
    ['ChromeOS', 'B7410E', 'Sistema do Google para Chromebooks. Simples, rÃ¡pido e integrado ao Google Workspace.'],
  ];
  sos.forEach(([so, cor, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.9 + i * 1.1, w: 2.2, h: 0.9, fill: { color: cor } });
    s.addText(so, { x: 0.4, y: 1.93 + i * 1.1, w: 2.2, h: 0.84, fontSize: 16, bold: true, color: BRANCO, align: 'center', valign: 'middle' });
    s.addShape(pres.ShapeType.rect, { x: 2.7, y: 1.9 + i * 1.1, w: 6.9, h: 0.9, fill: { color: i % 2 === 0 ? 'EBF5FB' : BRANCO } });
    s.addText(desc, { x: 2.85, y: 1.93 + i * 1.1, w: 6.6, h: 0.84, fontSize: 13, color: CINZA, valign: 'middle' });
  });
});

// Slide 24 â€” OrganizaÃ§Ã£o de Arquivos
addContentSlide(pres, 'OrganizaÃ§Ã£o de Arquivos e Pastas', (s) => {
  s.addText('Manter arquivos organizados Ã© tÃ£o importante quanto fazer o trabalho!', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.45, fontSize: 14, color: CINZA, italic: true
  });
  const ops = [
    ['Criar pasta', 'BotÃ£o direito â†’ Nova pasta | Organiza arquivos por tema ou matÃ©ria'],
    ['Copiar (Ctrl+C)', 'Copia o arquivo â€” o original permanece no lugar'],
    ['Recortar (Ctrl+X)', 'Move o arquivo â€” ele sai do lugar original'],
    ['Colar (Ctrl+V)', 'Coloca o arquivo copiado/recortado no novo local'],
    ['Renomear (F2)', 'Muda o nome do arquivo para algo descritivo'],
    ['Excluir (Delete)', 'Manda para a lixeira â€” pode ser recuperado depois'],
    ['Desfazer (Ctrl+Z)', 'Volta a Ãºltima aÃ§Ã£o â€” seu melhor amigo ao errar!'],
  ];
  ops.forEach(([op, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.7 + i * 0.52, w: 2.6, h: 0.45, fill: { color: AZUL } });
    s.addText(op, { x: 0.4, y: 1.72 + i * 0.52, w: 2.6, h: 0.4, fontSize: 12, bold: true, color: BRANCO, align: 'center' });
    s.addText(desc, { x: 3.1, y: 1.72 + i * 0.52, w: 6.5, h: 0.4, fontSize: 12, color: CINZA });
  });
});

// Slide 25 â€” Ferramentas Google
addContentSlide(pres, 'Ferramentas Google Workspace', (s) => {
  const tools = [
    ['Google Docs', '1155CC', 'Criar e editar textos. Use para redaÃ§Ãµes, relatÃ³rios e trabalhos. Salva automaticamente na nuvem.'],
    ['Google Slides', 'D14836', 'Criar apresentaÃ§Ãµes. Ideal para apresentar projetos. Acesse de qualquer dispositivo.'],
    ['Google Sheets', '0F9D58', 'Organizar dados em planilhas. Use para listas, tabelas e cÃ¡lculos simples.'],
    ['Google Drive', 'F4B400', 'Armazenar todos os seus arquivos na nuvem. 15GB gratuitos disponÃ­veis.'],
  ];
  tools.forEach(([tool, cor, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 1.0, w: 2.8, h: 0.85, fill: { color: cor } });
    s.addText(tool, { x: 0.4, y: 1.28 + i * 1.0, w: 2.8, h: 0.79, fontSize: 15, bold: true, color: BRANCO, align: 'center', valign: 'middle' });
    s.addShape(pres.ShapeType.rect, { x: 3.3, y: 1.25 + i * 1.0, w: 6.3, h: 0.85, fill: { color: i % 2 === 0 ? 'EBF5FB' : BRANCO } });
    s.addText(desc, { x: 3.45, y: 1.28 + i * 1.0, w: 6.0, h: 0.79, fontSize: 13, color: CINZA, valign: 'middle' });
  });
});

// Slide 26 â€” Pesquisa Inteligente
addContentSlide(pres, 'Pesquisa Inteligente na Internet', (s) => {
  s.addText('Operadores de Busca AvanÃ§ada:', { x: 0.4, y: 1.2, w: 9, h: 0.4, fontSize: 16, bold: true, color: AZUL });
  const ops = [
    ['"frase exata"', 'Busca exatamente essa frase â€” ex: "aquecimento global"'],
    ['site:dominio.com', 'Busca apenas em um site â€” ex: site:senai.br cursos'],
    ['filetype:pdf', 'Busca arquivos de um tipo â€” ex: filetype:pdf reciclagem'],
    ['-palavra', 'Exclui um termo â€” ex: python -cobra (a linguagem, nÃ£o o rÃ©ptil!)'],
  ];
  ops.forEach(([op, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.7 + i * 0.7, w: 2.9, h: 0.6, fill: { color: AZUL } });
    s.addText(op, { x: 0.4, y: 1.73 + i * 0.7, w: 2.9, h: 0.54, fontSize: 13, bold: true, color: CIANO, align: 'center', valign: 'middle' });
    s.addText(desc, { x: 3.4, y: 1.73 + i * 0.7, w: 6.2, h: 0.54, fontSize: 13, color: CINZA });
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 4.5, w: 9.2, h: 0.5, fill: { color: 'D6EAF8' } });
  s.addText('Avalie as fontes: verifique autor, data, instituiÃ§Ã£o e compare com outras referÃªncias!', {
    x: 0.55, y: 4.52, w: 8.9, h: 0.46, fontSize: 13, color: AZUL, bold: true
  });
});

// Slide 27 â€” Pensamento Computacional
addContentSlide(pres, 'Pensamento Computacional', (s) => {
  s.addText('Exemplo: Como fazer um sanduÃ­che?', { x: 0.4, y: 1.2, w: 9.2, h: 0.4, fontSize: 14, italic: true, color: CINZA });
  const pilares = [
    ['DecomposiÃ§Ã£o', '0B3D91', 'Dividir o problema em partes menores. Ex: separar pÃ£o, recheio, montar, servir'],
    ['Reconhecimento\nde PadrÃµes', '1A5276', 'Identificar semelhanÃ§as. Ex: sempre comeÃ§a e termina com pÃ£o'],
    ['AbstraÃ§Ã£o', '0A7E52', 'Focar no essencial. Ex: nÃ£o importa a marca do pÃ£o â€” sÃ³ que Ã© pÃ£o'],
    ['Algoritmo', 'B7410E', 'Criar a sequÃªncia de passos. Ex: 1. Pegar pÃ£o 2. Colocar recheio 3. Fechar 4. Servir'],
  ];
  pilares.forEach(([title, cor, desc], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.7 + row * 1.7;
    s.addShape(pres.ShapeType.rect, { x, y, w: 4.5, h: 1.55, fill: { color: cor } });
    s.addText(title, { x: x + 0.1, y: y + 0.08, w: 4.3, h: 0.55, fontSize: 15, bold: true, color: CIANO });
    s.addText(desc, { x: x + 0.1, y: y + 0.65, w: 4.3, h: 0.78, fontSize: 12, color: BRANCO });
  });
});

// Slide 28 â€” Algoritmos
addContentSlide(pres, 'Algoritmos', (s) => {
  s.addText('Um algoritmo Ã© uma sequÃªncia de passos para resolver um problema.', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.45, fontSize: 14, italic: true, color: CINZA
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.72, w: 2.8, h: 0.65, fill: { color: '0A7E52' } });
  s.addText('ENTRADA', { x: 0.4, y: 1.75, w: 2.8, h: 0.59, fontSize: 15, bold: true, color: BRANCO, align: 'center' });
  s.addShape(pres.ShapeType.rect, { x: 3.6, y: 1.72, w: 2.8, h: 0.65, fill: { color: AZUL } });
  s.addText('PROCESSAMENTO', { x: 3.6, y: 1.75, w: 2.8, h: 0.59, fontSize: 13, bold: true, color: BRANCO, align: 'center' });
  s.addShape(pres.ShapeType.rect, { x: 6.8, y: 1.72, w: 2.8, h: 0.65, fill: { color: 'B7410E' } });
  s.addText('SAÃDA', { x: 6.8, y: 1.75, w: 2.8, h: 0.59, fontSize: 15, bold: true, color: BRANCO, align: 'center' });
  s.addText('Exemplo: Calcular a mÃ©dia de notas', { x: 0.4, y: 2.55, w: 9, h: 0.4, fontSize: 14, bold: true, color: AZUL });
  const estruturas = [
    ['SequÃªncia', 'Passos executados um apÃ³s o outro. Ex: Acordar â†’ tomar cafÃ© â†’ ir Ã  escola'],
    ['DecisÃ£o (SE/ENTÃƒO)', 'SE nota â‰¥ 7 ENTÃƒO "aprovado" SENÃƒO "recuperaÃ§Ã£o"'],
    ['RepetiÃ§Ã£o (LOOP)', 'ENQUANTO tiver itens na lista, some a nota ao total'],
  ];
  estruturas.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 3.1 + i * 0.72, w: 2.6, h: 0.62, fill: { color: i === 0 ? '0A7E52' : i === 1 ? AZUL : 'B7410E' } });
    s.addText(title, { x: 0.4, y: 3.12 + i * 0.72, w: 2.6, h: 0.58, fontSize: 12, bold: true, color: BRANCO, align: 'center', valign: 'middle' });
    s.addText(desc, { x: 3.1, y: 3.12 + i * 0.72, w: 6.5, h: 0.58, fontSize: 12, color: CINZA });
  });
});

// Slide 29 â€” Fluxogramas
addContentSlide(pres, 'Fluxogramas', (s) => {
  s.addText('Fluxograma Ã© uma representaÃ§Ã£o visual de um algoritmo usando sÃ­mbolos padronizados.', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.45, fontSize: 14, color: CINZA, italic: true
  });
  const simbolos = [
    ['Oval', 'InÃ­cio / Fim do algoritmo'],
    ['RetÃ¢ngulo', 'Processo / AÃ§Ã£o a executar'],
    ['Losango', 'DecisÃ£o (pergunta SIM/NÃƒO)'],
    ['Seta', 'Fluxo / direÃ§Ã£o do algoritmo'],
  ];
  simbolos.forEach(([simb, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.8 + i * 0.68, w: 2.3, h: 0.58, fill: { color: AZUL } });
    s.addText(simb, { x: 0.4, y: 1.82 + i * 0.68, w: 2.3, h: 0.53, fontSize: 14, bold: true, color: BRANCO, align: 'center' });
    s.addText(desc, { x: 2.85, y: 1.82 + i * 0.68, w: 6.8, h: 0.53, fontSize: 14, color: CINZA });
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 4.55, w: 9.2, h: 0.65, fill: { color: 'D6EAF8' } });
  s.addText('Exemplo: VocÃª tem dinheiro? â†’ SIM â†’ Comprar lanche â†’ FIM | NÃƒO â†’ Buscar na mochila â†’ FIM', {
    x: 0.55, y: 4.57, w: 8.9, h: 0.6, fontSize: 12, color: AZUL
  });
});

// Slide 30 â€” Scratch IntroduÃ§Ã£o
addContentSlide(pres, 'Scratch â€” IntroduÃ§Ã£o Ã  ProgramaÃ§Ã£o Visual', (s) => {
  s.addText('O Scratch Ã© uma linguagem de programaÃ§Ã£o visual baseada em blocos, desenvolvida pelo MIT para iniciantes.', {
    x: 0.4, y: 1.2, w: 9.2, h: 0.6, fontSize: 14, color: CINZA, italic: true
  });
  const partes = [
    ['Palco', 'A Ã¡rea onde a animaÃ§Ã£o ou jogo acontece â€” o "cenÃ¡rio"'],
    ['Personagem (Sprite)', 'O ator que se move e executa as aÃ§Ãµes do programa'],
    ['Blocos de CÃ³digo', 'PeÃ§as coloridas que se encaixam para criar comandos'],
    ['Categorias de Blocos', 'Movimento, AparÃªncia, Som, Eventos, Controle, Sensores, Operadores, VariÃ¡veis'],
  ];
  partes.forEach(([title, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.9 + i * 0.83, w: 9.2, h: 0.73, fill: { color: i % 2 === 0 ? 'D6EAF8' : BRANCO } });
    s.addText(title, { x: 0.6, y: 1.93 + i * 0.83, w: 2.8, h: 0.66, fontSize: 14, bold: true, color: AZUL });
    s.addText(desc, { x: 3.5, y: 1.93 + i * 0.83, w: 5.9, h: 0.66, fontSize: 13, color: CINZA });
  });
  s.addText('Acesse em: scratch.mit.edu (gratuito, sem cadastro para experimentar)', {
    x: 0.4, y: 5.22, w: 9.2, h: 0.32, fontSize: 12, color: AZUL, italic: true
  });
});

// Slide 31 â€” Scratch Movimentos e Eventos
addContentSlide(pres, 'Scratch â€” Movimentos e Eventos', (s) => {
  const blocos = [
    ['Quando bandeira clicada', '228B22', 'Inicia o programa ao clicar na bandeira verde'],
    ['Mova N passos', '4169E1', 'Move o personagem N passos na direÃ§Ã£o atual'],
    ['Gire N graus', '4169E1', 'Rotaciona o personagem para a direita ou esquerda'],
    ['VÃ¡ para posiÃ§Ã£o x:N y:N', '4169E1', 'Teletransporta o sprite para uma posiÃ§Ã£o especÃ­fica'],
    ['Toque no som', 'CC5500', 'Reproduz um efeito sonoro ou mÃºsica'],
    ['Quando tecla pressionada', '228B22', 'Reage a uma tecla do teclado â€” Ãºtil para controlar jogos'],
  ];
  blocos.forEach(([bloco, cor, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.25 + i * 0.67, w: 3.2, h: 0.57, fill: { color: cor } });
    s.addText(bloco, { x: 0.45, y: 1.27 + i * 0.67, w: 3.1, h: 0.52, fontSize: 12, bold: true, color: BRANCO, valign: 'middle' });
    s.addText(desc, { x: 3.7, y: 1.27 + i * 0.67, w: 5.9, h: 0.52, fontSize: 13, color: CINZA });
  });
});

// Slide 32 â€” Scratch CondiÃ§Ãµes e RepetiÃ§Ãµes
addContentSlide(pres, 'Scratch â€” CondiÃ§Ãµes e RepetiÃ§Ãµes', (s) => {
  s.addText('Estruturas de Controle no Scratch:', { x: 0.4, y: 1.2, w: 9.2, h: 0.4, fontSize: 16, bold: true, color: AZUL });
  const estruturas = [
    ['SE / ENTÃƒO', 'FFAB00', 'Se tocar na borda â†’ diga "Oops!"'],
    ['SE / ENTÃƒO / SENÃƒO', 'FF6D00', 'Se pontos > 10 â†’ prÃ³xima fase, senÃ£o â†’ mostrar dica'],
    ['Repita N vezes', 'E65100', 'Repita 10 vezes â†’ mova 10 passos â†’ gire 36 graus (faz cÃ­rculo!)'],
    ['Repita sempre', 'BF360C', 'MantÃ©m o personagem seguindo o mouse para sempre'],
  ];
  estruturas.forEach(([title, cor, desc], i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.7 + i * 0.87, w: 2.8, h: 0.72, fill: { color: cor } });
    s.addText(title, { x: 0.45, y: 1.73 + i * 0.87, w: 2.7, h: 0.66, fontSize: 14, bold: true, color: BRANCO, valign: 'middle', align: 'center' });
    s.addShape(pres.ShapeType.rect, { x: 3.3, y: 1.7 + i * 0.87, w: 6.3, h: 0.72, fill: { color: i % 2 === 0 ? 'FFF8E1' : BRANCO } });
    s.addText(desc, { x: 3.45, y: 1.73 + i * 0.87, w: 6.0, h: 0.66, fontSize: 13, color: CINZA, valign: 'middle' });
  });
  s.addShape(pres.ShapeType.rect, { x: 0.4, y: 5.15, w: 9.2, h: 0.42, fill: { color: 'E8F4FD' } });
  s.addText('Mini desafio: FaÃ§a o personagem andar e voltar 5 vezes usando "repita"!', {
    x: 0.55, y: 5.17, w: 8.9, h: 0.38, fontSize: 13, color: AZUL, bold: true
  });
});

// Slide 33 â€” SÃ­ntese Final
{
  const s = pres.addSlide();
  s.background = { color: AZUL };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 1.0, w: 10, h: 0.06, fill: { color: CIANO } });
  s.addText('O que aprendemos nesta UC?', {
    x: 0.5, y: 0.1, w: 9, h: 0.85, fontSize: 30, bold: true, color: BRANCO, align: 'center'
  });
  const aprendizagens = [
    'Tecnologia transforma vidas e estÃ¡ em tudo ao nosso redor',
    'Hardware Ã© o fÃ­sico; software Ã© o programa â€” cada um tem seu papel',
    'Ser cidadÃ£o digital exige responsabilidade e senso crÃ­tico',
    'Pensamento computacional ajuda a resolver qualquer problema',
    'Algoritmos, fluxogramas e Scratch sÃ£o as bases da programaÃ§Ã£o',
    'A internet Ã© poderosa â€” use-a com seguranÃ§a e Ã©tica',
  ];
  aprendizagens.forEach((item, i) => {
    s.addShape(pres.ShapeType.rect, { x: 0.4, y: 1.15 + i * 0.62, w: 0.42, h: 0.42, fill: { color: CIANO } });
    s.addText((i + 1).toString(), { x: 0.4, y: 1.17 + i * 0.62, w: 0.42, h: 0.38, fontSize: 13, bold: true, color: AZUL, align: 'center' });
    s.addText(item, { x: 0.95, y: 1.18 + i * 0.62, w: 8.7, h: 0.48, fontSize: 14, color: BRANCO });
  });
  s.addText('ParabÃ©ns! VocÃª deu os primeiros passos no mundo da tecnologia!', {
    x: 0.5, y: 5.0, w: 9, h: 0.4, fontSize: 15, bold: true, color: CIANO, align: 'center', italic: true
  });
}

pres.writeFile({ fileName: OUT })
  .then(() => console.log('PPTX gerado com sucesso: ' + OUT))
  .catch(err => { console.error('Erro:', err); process.exit(1); });

