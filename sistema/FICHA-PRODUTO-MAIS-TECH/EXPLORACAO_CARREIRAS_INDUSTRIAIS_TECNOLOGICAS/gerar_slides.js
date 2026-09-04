const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_16x9';

const BORDO = '7B1D4E';
const AMBAR = 'FFB300';
const FUNDO = 'FFF0F5';
const BRANCO = 'FFFFFF';
const CINZA = '555555';
const FOOTER_TEXT = 'Rio do Sul Mais Tech · SENAI · UC: Exploração de Carreiras';

function addFooter(slide) {
  slide.addText(FOOTER_TEXT, {
    x: 0, y: 6.8, w: '100%', h: 0.3,
    fontSize: 9, color: BRANCO, bold: false,
    fill: { color: BORDO },
    align: 'center', valign: 'middle',
  });
}

function titleSlide(title, subtitle) {
  const s = pptx.addSlide();
  s.background = { color: BORDO };
  s.addText(title, {
    x: 0.8, y: 1.2, w: 8.4, h: 1.8,
    fontSize: 36, bold: true, color: BRANCO, align: 'center',
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.8, y: 3.0, w: 8.4, h: 0.8,
      fontSize: 20, color: AMBAR, align: 'center',
    });
  }
  s.addText(FOOTER_TEXT, {
    x: 0, y: 6.8, w: '100%', h: 0.3,
    fontSize: 9, color: BRANCO, fill: { color: '5A1438' }, align: 'center', valign: 'middle',
  });
  return s;
}

function sectionSlide(title) {
  const s = pptx.addSlide();
  s.background = { color: AMBAR };
  s.addText(title, {
    x: 0.8, y: 2.2, w: 8.4, h: 1.8,
    fontSize: 34, bold: true, color: BORDO, align: 'center',
  });
  s.addText(FOOTER_TEXT, {
    x: 0, y: 6.8, w: '100%', h: 0.3,
    fontSize: 9, color: BORDO, fill: { color: 'E6A000' }, align: 'center', valign: 'middle',
  });
  return s;
}

function contentSlide(title, bullets) {
  const s = pptx.addSlide();
  s.background = { color: FUNDO };
  s.addText(title, {
    x: 0.5, y: 0.25, w: 9, h: 0.75,
    fontSize: 22, bold: true, color: BORDO,
    fill: { color: FUNDO }, border: { type: 'none' },
  });
  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.05, w: 9, h: 0.05, fill: { color: AMBAR }, line: { color: AMBAR } });

  const items = bullets.map(b => ({
    text: b,
    options: { bullet: { type: 'bullet' }, fontSize: 17, color: CINZA, paraSpaceBefore: 6 },
  }));

  s.addText(items, {
    x: 0.5, y: 1.2, w: 9, h: 5.4,
    valign: 'top',
  });

  addFooter(s);
  return s;
}

function twoColSlide(title, col1title, col1bullets, col2title, col2bullets) {
  const s = pptx.addSlide();
  s.background = { color: FUNDO };
  s.addText(title, {
    x: 0.4, y: 0.2, w: 9.2, h: 0.7,
    fontSize: 22, bold: true, color: BORDO,
  });
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 0.95, w: 9.2, h: 0.06, fill: { color: AMBAR }, line: { color: AMBAR } });

  // Col 1
  s.addText(col1title, { x: 0.4, y: 1.1, w: 4.4, h: 0.5, fontSize: 15, bold: true, color: BORDO });
  const c1 = col1bullets.map(b => ({ text: b, options: { bullet: { type: 'bullet' }, fontSize: 15, color: CINZA, paraSpaceBefore: 4 } }));
  s.addText(c1, { x: 0.4, y: 1.65, w: 4.4, h: 4.9, valign: 'top' });

  // Col 2
  s.addText(col2title, { x: 5.2, y: 1.1, w: 4.4, h: 0.5, fontSize: 15, bold: true, color: BORDO });
  const c2 = col2bullets.map(b => ({ text: b, options: { bullet: { type: 'bullet' }, fontSize: 15, color: CINZA, paraSpaceBefore: 4 } }));
  s.addText(c2, { x: 5.2, y: 1.65, w: 4.4, h: 4.9, valign: 'top' });

  addFooter(s);
  return s;
}

// ─── SLIDES 1–15: APRESENTAÇÃO ───────────────────────────────────────────────

// 1. Capa
titleSlide('Exploração de Carreiras\nIndustriais e Tecnológicas', 'Rio do Sul Mais Tech · SENAI');

// 2. Sobre o Programa
contentSlide('Rio do Sul Mais Tech', [
  'Parceria: SENAI + Prefeitura Municipal de Rio do Sul',
  'Público-alvo: alunos do 8º e 9º ano do Ensino Fundamental (12–15 anos)',
  'Objetivo: preparar jovens para o mundo do trabalho industrial e tecnológico',
  'Carga horária: 36 horas — 18 encontros de 2 horas',
  'Metodologia ativa: dinâmicas, pesquisas, debates, projeto final',
]);

// 3. O que você vai aprender aqui
contentSlide('O Que Você Vai Aprender', [
  'Identificar carreiras nas áreas industrial e tecnológica',
  'Compreender as mudanças do mercado de trabalho e as tendências do futuro',
  'Conhecer seus próprios interesses e habilidades',
  'Dar os primeiros passos no planejamento da sua vida profissional',
  'Construir um currículo básico e um perfil profissional inicial',
]);

// 4. Percurso de aprendizagem I
contentSlide('Percurso de Aprendizagem — Parte 1', [
  'Encontro 1 — Quem sou eu? Autoconhecimento inicial',
  'Encontro 2 — O mundo do trabalho: ontem, hoje e amanhã',
  'Encontro 3 — Indústria 4.0: a revolução que está acontecendo agora',
  'Encontro 4 — Automação, robôs e IA: o futuro já chegou?',
  'Encontro 5 — Carreiras industriais I: mecânica e eletrotécnica',
  'Encontro 6 — Carreiras industriais II: automação e mecatrônica',
  'Encontro 7 — Carreiras em TI I: desenvolvimento de software',
  'Encontro 8 — Carreiras em TI II: dados, IA e segurança da informação',
  'Encontro 9 — Profissões do futuro: o que ainda não existe',
]);

// 5. Percurso de aprendizagem II
contentSlide('Percurso de Aprendizagem — Parte 2', [
  'Encontro 10 — Mapa de habilidades e interesses',
  'Encontro 11 — Planejamento de carreira: da escola ao mercado',
  'Encontro 12 — Currículo para jovens: como montar o seu',
  'Encontro 13 — LinkedIn e redes profissionais',
  'Encontro 14 — Networking: construindo conexões',
  'Encontro 15 — Entrevista simulada: como se apresentar',
  'Encontro 16 — SENAI: caminhos de formação técnica',
  'Encontro 17 — Projeto final: meu mapa de carreira',
  'Encontro 18 — Apresentações e encerramento',
]);

// 6. Avaliação
contentSlide('Como Você Será Avaliado', [
  'Participação em atividades e dinâmicas — 30%',
  'Mapa de carreira individual (projeto final) — 40%',
  'Currículo e perfil profissional inicial — 30%',
  '',
  'A avaliação é contínua e formativa',
  'O que importa: seu processo de autoconhecimento e engajamento',
  'Não existe resposta certa ou errada nesta jornada',
]);

// 7. Por que explorar carreiras agora?
contentSlide('Por Que Explorar Carreiras Agora?', [
  'O mercado de trabalho está mudando mais rápido do que nunca',
  'Profissões que existem hoje não existiam há 10 anos',
  'Profissões do futuro ainda nem foram inventadas',
  'Quem se prepara cedo tem enorme vantagem',
  'Autoconhecimento + conhecimento do mercado = escolhas mais conscientes',
  'Você não precisa decidir agora — precisa começar a explorar',
]);

// 8. O mundo está mudando
contentSlide('O Mundo Está Mudando — E Rápido', [
  'Quarta Revolução Industrial: fusão do físico, digital e biológico',
  'Inteligência Artificial aprende, decide e cria como seres humanos',
  'Internet das Coisas (IoT): máquinas e objetos conectados',
  'Big Data: volume de dados que dobra a cada 2 anos',
  'Automação: robôs fazem tarefas repetitivas com mais precisão',
  'O profissional do futuro: sabe trabalhar COM a tecnologia, não contra ela',
]);

// 9. Carreiras industriais — visão geral
contentSlide('Carreiras Industriais — Visão Geral', [
  'Santa Catarina é um dos estados mais industrializados do Brasil',
  'Metalmecânica, têxtil, alimentícia, plásticos, papel e celulose, farmacêutica',
  'Alta demanda por técnicos qualificados em toda a região',
  'Principais perfis: mecânica, eletrotécnica, automação, mecatrônica, segurança',
  'Formação técnica no SENAI é porta de entrada para a indústria',
  'Salários competitivos mesmo sem graduação universitária',
]);

// 10. Carreiras em TI — visão geral
contentSlide('Carreiras em Tecnologia (TI) — Visão Geral', [
  'Mercado de TI é um dos que mais cresce no mundo',
  'Brasil tem déficit de mais de 500 mil profissionais de TI',
  'Trabalho remoto e internacional são realidade comum',
  'Principais perfis: desenvolvimento, dados, segurança, suporte, análise de sistemas',
  'Formação: cursos técnicos, bootcamps, graduação — cada caminho tem espaço',
  'Salários entre os mais altos do mercado brasileiro',
]);

// 11. Planejamento de carreira
contentSlide('Planejamento de Carreira — Por Onde Começo?', [
  '1. Autoconhecimento — O que eu gosto? O que eu faço bem?',
  '2. Exploração — Quais profissões existem? Como é o dia a dia delas?',
  '3. Formação — Qual caminho formativo preciso trilhar?',
  '4. Primeiros passos — Jovem aprendiz, estágio, cursos complementares',
  '5. Rede de contatos — Quem pode me ajudar nessa jornada?',
  '6. Ajuste contínuo — Carreira não é uma linha reta. É uma construção.',
]);

// 12. O papel do SENAI
contentSlide('O SENAI na Sua Trajetória', [
  'SENAI: maior rede de educação profissional da América Latina',
  'Cursos técnicos com duração de 1 a 2 anos',
  'Laboratórios modernos, equipamentos de última geração',
  'Professores que são profissionais da indústria',
  'Alta taxa de empregabilidade — muitos alunos são contratados antes de se formar',
  'Parceria direta com indústrias da região para estágios e vagas',
  'Rio do Sul Mais Tech: primeiro contato com o universo SENAI',
]);

// 13. O que as empresas buscam hoje
contentSlide('O Que as Empresas Mais Valorizam Hoje', [
  'Comunicação clara e objetiva (oral e escrita)',
  'Trabalho em equipe e colaboração',
  'Adaptabilidade e disposição para aprender',
  'Raciocínio lógico e resolução de problemas',
  'Conhecimento em tecnologia (mesmo que básico)',
  'Pontualidade, responsabilidade e postura profissional',
  'Criatividade e capacidade de inovação',
]);

// 14. Curiosidades
contentSlide('Você Sabia? — Fatos sobre o Mercado de Trabalho', [
  '65% das crianças de hoje vão trabalhar em profissões que ainda não existem (Dell Technologies)',
  'O Brasil tem mais de 1 milhão de vagas abertas na indústria que não encontram candidatos qualificados',
  'Um técnico do SENAI pode ganhar mais do que muitos universitários recém-formados',
  'O mercado de cibersegurança vai crescer 35% ao ano até 2031 (Bureau of Labor Statistics, EUA)',
  'Santa Catarina é o 4º estado que mais emprega na indústria no Brasil',
  'Programadores brasileiros são contratados por empresas do Vale do Silício remotamente',
]);

// 15. Dinâmica de abertura — Quem Você Quer Ser
contentSlide('Dinâmica — Quem Você Quer Ser?', [
  'Pegue uma folha de papel e responda:',
  '   → O que você sabe fazer bem?',
  '   → O que você adora fazer (dentro ou fora da escola)?',
  '   → Qual profissional você admira? Por quê?',
  '   → Onde você se imagina trabalhando daqui a 10 anos?',
  '',
  'Compartilhe com um colega. Depois, quem quiser, compartilha com a turma.',
  'Não existe resposta certa. Existe a sua resposta.',
]);

// ─── SLIDES 16+: CONTEÚDO ────────────────────────────────────────────────────

// BLOCO 1 — O Mundo do Trabalho Hoje
sectionSlide('BLOCO 1\nO Mundo do Trabalho Hoje');

// 16
contentSlide('O Que Mudou no Mercado de Trabalho nos Últimos 10 Anos?', [
  'Smartphones tornaram-se ferramenta de trabalho central',
  'Trabalho remoto saiu do papel e virou realidade de massa (pós-pandemia)',
  'Plataformas digitais criaram a "economia de gigs" (Uber, iFood, 99freelas)',
  'Inteligência Artificial começou a automatizar tarefas cognitivas',
  'Soft skills (comunicação, empatia, adaptabilidade) tornaram-se diferenciais reais',
  'Aprendizado contínuo (lifelong learning) deixou de ser opcional',
  'Fronteiras geográficas do emprego foram quebradas pelo trabalho digital',
]);

// 17
contentSlide('Indústria 4.0 — Automação, IA, IoT e Big Data', [
  'IoT (Internet das Coisas): máquinas conectadas que trocam dados em tempo real',
  'Big Data: análise de bilhões de dados para decisões mais precisas e rápidas',
  'Inteligência Artificial: sistemas que aprendem e tomam decisões',
  'Automação robótica: robôs substituem tarefas repetitivas e perigosas',
  'Manufatura aditiva (impressão 3D): protótipos e peças criados digitalmente',
  'Computação em nuvem: acesso a recursos computacionais de qualquer lugar',
  'Cibersegurança industrial: proteção dos sistemas conectados das fábricas',
]);

// 18
contentSlide('Profissões Que Existem Hoje — Que Não Existiam Antes', [
  'Desenvolvedor de aplicativos mobile (smartphones existem há menos de 20 anos)',
  'Cientista de dados / Analista de Big Data',
  'Especialista em segurança da informação / Ethical Hacker',
  'Gestor de redes sociais (Social Media Manager)',
  'Especialista em experiência do usuário (UX Designer)',
  'Engenheiro de machine learning / IA',
  'Criador de conteúdo digital (YouTuber, streamer, influenciador)',
  'Técnico em automação industrial com CLPs e robótica colaborativa',
]);

// 19
contentSlide('Profissões do Futuro — O Que Vem Por Aí?', [
  'Engenheiro de cidades inteligentes (Smart Cities)',
  'Especialista em interfaces cérebro-máquina',
  'Designer de realidade aumentada e metaverso industrial',
  'Consultor de ética em Inteligência Artificial',
  'Técnico em impressão 4D e bioimpressão',
  'Especialista em colonização espacial e mineração de asteroides',
  'Curador de dados pessoais (gestão da identidade digital)',
  'Arquiteto de sistemas quânticos de computação',
]);

// 20
contentSlide('Habilidades Mais Valorizadas Pelas Empresas Hoje', [
  'Pensamento crítico e resolução de problemas complexos',
  'Criatividade e inovação',
  'Inteligência emocional e empatia',
  'Trabalho em equipe e colaboração interdisciplinar',
  'Adaptabilidade e aprendizado contínuo (lifelong learning)',
  'Literacia digital — uso de ferramentas tecnológicas diversas',
  'Comunicação clara em ambientes presenciais e digitais',
  'Gestão do tempo e automotivação (especialmente no trabalho remoto)',
]);

// BLOCO 2 — Carreiras Industriais
sectionSlide('BLOCO 2\nCarreiras Industriais');

// 21
contentSlide('Panorama da Indústria em Santa Catarina e no Brasil', [
  'Santa Catarina: 4º estado que mais emprega na indústria no Brasil',
  'Principais setores: metal-mecânico, têxtil, alimentício, plásticos, papel/celulose',
  'Rio do Sul e região: forte presença de indústrias de médio porte',
  'Brasil tem déficit de técnicos industriais qualificados — oportunidade!',
  'Indústria 4.0 aumenta a demanda por profissionais com formação técnica sólida',
  'Salário médio técnico industrial: R$ 2.500 a R$ 6.000 (varia por função e região)',
  'Possibilidade de crescimento para cargos de liderança e engenharia',
]);

// 22
twoColSlide('Principais Funções Industriais',
  'Técnico de Mecânica Industrial', [
    'Monta, ajusta e calibra máquinas',
    'Realiza manutenção preventiva e corretiva',
    'Interpreta desenhos técnicos',
    'Salário: R$ 2.500 – R$ 4.500',
    'Setores: metalúrgica, alimentos, têxtil, automotivo',
  ],
  'Técnico em Eletrotécnica', [
    'Instala e mantém sistemas elétricos industriais',
    'Lê projetos elétricos',
    'Aplica normas NR-10 (segurança elétrica)',
    'Salário: R$ 2.800 – R$ 5.000',
    'Setores: indústrias, data centers, energia',
  ]
);

// 23
twoColSlide('Principais Funções Industriais (cont.)',
  'Técnico em Automação Industrial', [
    'Programa CLPs (cérebros das máquinas)',
    'Instala sensores e sistemas SCADA',
    'Mantém redes industriais',
    'Salário: R$ 3.000 – R$ 6.000',
    'Alta demanda na Indústria 4.0',
  ],
  'Técnico em Mecatrônica', [
    'Une mecânica + eletrônica + computação',
    'Projeta e mantém robôs industriais',
    'Programa microcontroladores (Arduino)',
    'Salário: R$ 3.500 – R$ 7.000',
    'Perfil muito disputado pelas indústrias',
  ]
);

// 24
contentSlide('Formação para a Indústria — Caminhos e Certificações', [
  'Curso técnico SENAI (1 a 2 anos): porta de entrada mais rápida',
  'Técnico concomitante: fazer junto com o Ensino Médio',
  'Técnico subsequente: após terminar o Ensino Médio',
  'Tecnólogo (2–3 anos): ensino superior tecnológico — especialização prática',
  'Graduação em Engenharia (5 anos): para quem quer ir mais fundo',
  'Certificações complementares: NR-10, NR-12, NR-33, CREA',
  'Cursos de curta duração SENAI: atualização e especialização constante',
]);

// 25
contentSlide('SENAI — Porta de Entrada para a Indústria', [
  'Maior rede de educação profissional da América Latina',
  'Mais de 500 unidades no Brasil — incluindo Rio do Sul',
  'Laboratórios com equipamentos idênticos aos usados na indústria',
  'Professores que são profissionais ativos do setor',
  'Parcerias com empresas: estágios e contratações diretas',
  'Taxa de empregabilidade acima de 80% para alunos formados',
  'Programas de bolsa e gratuidade para famílias de baixa renda (SENAI Gratuidade Social)',
]);

// BLOCO 3 — Carreiras em Tecnologia
sectionSlide('BLOCO 3\nCarreiras em Tecnologia (TI)');

// 26
contentSlide('Desenvolvedor de Software', [
  'Cria programas, sistemas, sites e aplicativos',
  'Front-end: tudo que o usuário vê (HTML, CSS, JavaScript, React)',
  'Back-end: tudo que acontece "por baixo" (Python, Java, Node.js, bancos de dados)',
  'Mobile: aplicativos para Android e iOS (Flutter, Kotlin, Swift)',
  'Full-stack: domina front-end e back-end',
  'Salário médio Brasil: R$ 5.000 – R$ 15.000 (varia por nível e especialização)',
  'Trabalho remoto e internacional são muito comuns',
]);

// 27
contentSlide('Analista de Sistemas', [
  'Analisa as necessidades de uma empresa e transforma em soluções tecnológicas',
  'Faz a ponte entre o cliente/usuário e a equipe técnica de desenvolvimento',
  'Cria documentação de requisitos, fluxogramas e especificações de sistemas',
  'Testa sistemas antes de entrarem em produção (QA — Quality Assurance)',
  'Trabalha em empresas de software, bancos, indústrias, governo',
  'Formação: curso técnico, tecnólogo, graduação em Sistemas de Informação / Ciência da Computação',
  'Salário médio: R$ 4.500 – R$ 10.000',
]);

// 28
contentSlide('Suporte Técnico e Infraestrutura', [
  'Garante que computadores, redes e servidores funcionem corretamente',
  'Suporte N1: atendimento direto ao usuário (resolver problemas básicos)',
  'Suporte N2/N3: problemas mais complexos, configuração de servidores',
  'Administrador de redes: cuida da rede de computadores das empresas',
  'Técnico em cloud: mantém serviços na nuvem (AWS, Azure, Google Cloud)',
  'Porta de entrada acessível na área de TI — muitos profissionais começam aqui',
  'Salário médio: R$ 2.500 – R$ 6.000 (evolui com certificações)',
]);

// 29
contentSlide('Segurança da Informação / Cibersegurança', [
  'Protege sistemas, redes e dados de empresas contra ataques e invasões',
  'Ethical Hacker (Pentester): testa sistemas para encontrar vulnerabilidades',
  'Analista SOC: monitora ameaças em tempo real num centro de operações de segurança',
  'Área que mais cresce no mundo: ataques cibernéticos crescem 38% ao ano',
  'Cada empresa digital precisa de profissionais de segurança',
  'Certificações valorizadas: CompTIA Security+, CEH, CISSP',
  'Salário médio: R$ 6.000 – R$ 20.000 (especialistas são raros e bem pagos)',
]);

// 30
contentSlide('Análise de Dados / Ciência de Dados', [
  'Coleta, processa e analisa grandes volumes de dados para gerar insights',
  'Analista de dados: transforma dados em relatórios e dashboards',
  'Cientista de dados: cria modelos preditivos com machine learning',
  'Engenheiro de dados: constrói pipelines e infraestrutura de dados',
  'Ferramentas: Python, R, SQL, Power BI, Tableau, Spark',
  'Aplicações: previsão de vendas, detecção de fraudes, recomendações, saúde',
  'Salário médio: R$ 6.000 – R$ 18.000',
]);

// 31
contentSlide('Formação em TI — Cursos, Bootcamps e Graduação', [
  'Curso técnico (1–2 anos): Informática, Desenvolvimento de Sistemas — boa base',
  'Bootcamp (3–6 meses): imersão intensiva, foco em empregabilidade rápida',
  'Graduação tecnológica (2–3 anos): Análise e Desenvolvimento de Sistemas, Redes',
  'Graduação tradicional (4–5 anos): Ciência da Computação, Engenharia de Software',
  'Aprendizado autodidata: plataformas como Alura, DIO, Coursera, freeCodeCamp',
  'Certificações profissionais: AWS, Google Cloud, Microsoft Azure, CompTIA',
  'Portfólio no GitHub: muitas empresas contratam por projetos, não apenas pelo diploma',
]);

// 32
contentSlide('Mercado de TI no Brasil — Salários e Oportunidades', [
  'Brasil tem déficit de mais de 500 mil profissionais de TI',
  'Empregabilidade na área: superior a 90% para profissionais qualificados',
  'Salários entre os mais altos do mercado brasileiro em qualquer nível',
  'Trabalho remoto para empresas estrangeiras: salários em dólar ou euro',
  'Startups, fintechs, healthtechs, govtechs: mercado diversificado',
  'Santa Catarina: polo tecnológico crescente — Florianópolis, Blumenau, Joinville',
  'Mulheres na TI: área ainda tem lacuna de gênero — oportunidade de destaque',
]);

// BLOCO 4 — Construindo sua Trajetória
sectionSlide('BLOCO 4\nConstruindo Sua Trajetória');

// 33
contentSlide('Autoconhecimento — Mapa de Habilidades e Interesses', [
  'Habilidades técnicas (hard skills): o que você SABE FAZER (programar, desenhar, calcular)',
  'Habilidades comportamentais (soft skills): como você LIDA com o mundo (empatia, liderança)',
  'Interesses: o que te MOVE e te inspira (tecnologia, pessoas, máquinas, criação)',
  'Valores: o que é IMPORTANTE para você no trabalho (autonomia, impacto, estabilidade)',
  'Atividade: diagrama de Venn — O que sei fazer bem + O que adoro fazer + O que o mundo precisa',
  'A interseção dessas três áreas aponta sua zona de vocação',
]);

// 34
contentSlide('Como Planejar Sua Carreira — Do 8° Ano ao Mercado', [
  '8º/9º ano: exploração — conhecer áreas, visitar empresas, fazer cursos de introdução',
  'Ensino Médio: definir área de interesse, iniciar formação técnica (concomitante)',
  'Jovem aprendiz (14–24 anos): primeiro emprego com registro, benefícios e capacitação',
  'Técnico formado (17–19 anos): entrada no mercado de trabalho formal',
  'Especialização: certificações, cursos complementares, idiomas (especialmente inglês)',
  'Graduação (opcional): para quem quer ir mais fundo na carreira escolhida',
  'Dica: cada passo conta. Não existe "tarde demais" nessa jornada',
]);

// 35
contentSlide('Primeiro Emprego / Jovem Aprendiz — Como Funciona', [
  'Programa Jovem Aprendiz (Lei 10.097/2000): empresas são obrigadas a contratar',
  'Faixa etária: 14 a 24 anos (ou até 29 anos para pessoas com deficiência)',
  'Jornada reduzida: até 6 horas diárias para quem ainda estuda',
  'Benefícios: carteira assinada, salário mínimo proporcional, FGTS, férias',
  'Capacitação teórica: obrigatória, geralmente oferecida pelo SENAI ou SENAC',
  'Como conseguir: sites de emprego (CIEE, IEL, Indeed), SENAI, prefeitura',
  'É uma porta de entrada real para o mercado — muitos jovens são efetivados',
]);

// 36
contentSlide('Currículo Básico para Jovens — O Que Colocar', [
  'Dados pessoais: nome, cidade, telefone, e-mail profissional, LinkedIn (se tiver)',
  'Objetivo profissional: área que busca e o que você oferece (2–3 linhas)',
  'Formação: escola atual, cursos complementares (mesmo que em andamento)',
  'Experiências: trabalhos voluntários, projetos escolares, cursos, programas como Mais Tech',
  'Habilidades: ferramentas que você domina, idiomas, soft skills relevantes',
  'Dicas: máximo 1 página, fonte legível, sem erros de ortografia',
  'Dica de ouro: adapte o currículo para cada vaga — não mande o mesmo para todas',
]);

// 37
contentSlide('LinkedIn para Jovens — Como Criar um Perfil Profissional', [
  'LinkedIn é a maior rede profissional do mundo — mais de 1 bilhão de usuários',
  'Foto profissional: rosto visível, fundo neutro, expressão tranquila (não de festa)',
  'Headline: quem você é e o que busca — ex: "Estudante de Tecnologia | Rio do Sul Mais Tech"',
  'Resumo: conte sua história em 3–5 linhas com naturalidade e entusiasmo',
  'Experiências e formação: adicione tudo — mesmo que pareça pouco',
  'Habilidades: liste e peça que colegas e professores endossem',
  'Conecte-se: professores, colegas, profissionais que você conhece ou admira',
]);

// 38
contentSlide('Networking — O Que É e Por Que Importa', [
  'Networking = construir uma rede de contatos profissionais genuínos',
  '"Não é o que você sabe, é quem você conhece" — há verdade nisso',
  '70–80% das vagas nunca são publicadas — são preenchidas por indicação',
  'Como começar: conecte-se com professores, colegas, palestrantes e profissionais',
  'LinkedIn, eventos de tecnologia, feiras de emprego, eventos SENAI',
  'Networking não é pedir favor — é construir relacionamentos de valor mútuo',
  'Seja genuíno: ajude, compartilhe, comente. A rede cresce quando você contribui',
]);

// 39
contentSlide('Como Se Preparar para uma Entrevista', [
  'Pesquise a empresa antes: o que faz, valores, produtos, missão',
  'Leia com atenção a descrição da vaga — entenda o que buscam',
  'Prepare-se para responder: "Fale sobre você", "Seus pontos fortes/fracos"',
  'Use a técnica STAR: Situação → Tarefa → Ação → Resultado',
  'Vista-se adequadamente ao ambiente da empresa (pesquise a cultura)',
  'Chegue com antecedência, desligue o celular, olhe nos olhos',
  'Ao final, pergunte sobre os próximos passos — demonstra interesse e proatividade',
  'Depois: mande um e-mail de agradecimento (diferencial raro e bem visto)',
]);

// Slide final
const sfinal = pptx.addSlide();
sfinal.background = { color: BORDO };
sfinal.addText('Qual É o Seu Próximo Passo?', {
  x: 0.8, y: 0.8, w: 8.4, h: 1.2,
  fontSize: 32, bold: true, color: BRANCO, align: 'center',
});
sfinal.addText([
  { text: 'Você explorou o mundo do trabalho industrial e tecnológico.\n', options: { fontSize: 17, color: BRANCO } },
  { text: 'Agora é hora de agir.\n\n', options: { fontSize: 17, color: BRANCO } },
  { text: '→  Descubra suas habilidades e interesses\n', options: { fontSize: 16, color: AMBAR } },
  { text: '→  Converse com um profissional da área que te interessa\n', options: { fontSize: 16, color: AMBAR } },
  { text: '→  Pesquise os cursos técnicos do SENAI de Rio do Sul\n', options: { fontSize: 16, color: AMBAR } },
  { text: '→  Monte seu currículo e crie seu LinkedIn\n', options: { fontSize: 16, color: AMBAR } },
  { text: '→  Construa seu Mapa de Carreira nesta UC\n\n', options: { fontSize: 16, color: AMBAR } },
  { text: 'O futuro começa com uma decisão hoje.', options: { fontSize: 18, bold: true, color: BRANCO } },
], {
  x: 1.0, y: 2.1, w: 8, h: 4.4, valign: 'top',
});
sfinal.addText(FOOTER_TEXT, {
  x: 0, y: 6.8, w: '100%', h: 0.3,
  fontSize: 9, color: BRANCO, fill: { color: '5A1438' }, align: 'center', valign: 'middle',
});

// Save
pptx.writeFile({ fileName: 'Slides_Exploracao_Carreiras_Industriais_Tecnologicas.pptx' })
  .then(() => console.log('PPTX gerado com sucesso!'))
  .catch(e => { console.error(e); process.exit(1); });
