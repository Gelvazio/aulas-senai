/**
 * INSTRUÇÕES DE USO:
 * 1. Acesse https://script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o código existente e cole este arquivo inteiro
 * 4. Clique em "Executar" (▶) na função criarFormulario
 * 5. Autorize o script quando solicitado
 * 6. O formulário será criado no seu Google Drive automaticamente
 *
 * Disciplina: UC1 — Introdução à TIC — SENAI
 * Aula: História da Computação
 */

function criarFormulario() {
  var form = FormApp.create('História da Computação — Avaliação UC1 SENAI');
  form.setIsQuiz(true);
  form.setTitle('História da Computação — Avaliação UC1 SENAI');
  form.setDescription('Avaliação referente à aula de História da Computação — UC1 Introdução à TIC — Professor Gelvazio');
  form.setShuffleQuestions(false);

  // ── BLOCO 1: SURGIMENTO E GERAÇÕES ──────────────────────────

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Quem é considerado o "pai do computador" por ter projetado a Máquina Analítica em 1837?');
  q1.setChoices([
    q1.createChoice('Charles Babbage', true),
    q1.createChoice('Alan Turing', false),
    q1.createChoice('Tim Berners-Lee', false),
    q1.createChoice('Steve Jobs', false)
  ]);
  q1.setPoints(1);
  q1.setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('O ENIAC, primeiro computador eletrônico digital, foi criado em qual década?');
  q2.setChoices([
    q2.createChoice('1940', true),
    q2.createChoice('1920', false),
    q2.createChoice('1960', false),
    q2.createChoice('1980', false)
  ]);
  q2.setPoints(1);
  q2.setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Qual característica marcou a 1ª geração dos computadores?');
  q3.setChoices([
    q3.createChoice('Uso de válvulas eletrônicas, máquinas enormes e caríssimas', true),
    q3.createChoice('Uso de transistores e surgimento das primeiras linguagens de programação', false),
    q3.createChoice('Uso de circuitos integrados e surgimento dos sistemas operacionais', false),
    q3.createChoice('Uso de microprocessadores e surgimento do PC pessoal', false)
  ]);
  q3.setPoints(1);
  q3.setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('O que caracteriza a 2ª geração dos computadores?');
  q4.setChoices([
    q4.createChoice('Transistores tornaram os computadores menores, mais rápidos e confiáveis', true),
    q4.createChoice('Válvulas eletrônicas ocupavam salas inteiras', false),
    q4.createChoice('Circuitos integrados com múltiplos transistores em um chip', false),
    q4.createChoice('Inteligência Artificial com capacidade de aprendizado', false)
  ]);
  q4.setPoints(1);
  q4.setRequired(true);

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('O microprocessador Intel 4004, lançado em 1971, marcou o início de qual geração dos computadores?');
  q5.setChoices([
    q5.createChoice('4ª Geração — era do PC pessoal e da internet', true),
    q5.createChoice('3ª Geração — circuitos integrados', false),
    q5.createChoice('2ª Geração — transistores', false),
    q5.createChoice('5ª Geração — Inteligência Artificial', false)
  ]);
  q5.setPoints(1);
  q5.setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Qual é a principal característica da 5ª geração dos computadores?');
  q6.setChoices([
    q6.createChoice('Inteligência Artificial — computadores aprendem, reconhecem voz e imagem', true),
    q6.createChoice('Uso de transistores substituindo as válvulas', false),
    q6.createChoice('Criação dos primeiros PCs pessoais', false),
    q6.createChoice('Surgimento da internet e dos smartphones', false)
  ]);
  q6.setPoints(1);
  q6.setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Em que ano o IBM PC foi lançado, marcando a chegada do computador pessoal?');
  q7.setChoices([
    q7.createChoice('1981', true),
    q7.createChoice('1971', false),
    q7.createChoice('1991', false),
    q7.createChoice('1965', false)
  ]);
  q7.setPoints(1);
  q7.setRequired(true);

  // ── BLOCO 2: COMO FUNCIONA UM COMPUTADOR ────────────────────

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Qual componente do computador é responsável pelo processamento de instruções e é chamado de "cérebro" do computador?');
  q8.setChoices([
    q8.createChoice('CPU (Processador)', true),
    q8.createChoice('Memória RAM', false),
    q8.createChoice('HD/SSD', false),
    q8.createChoice('Placa-mãe', false)
  ]);
  q8.setPoints(1);
  q8.setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('Qual é a função da Memória RAM em um computador?');
  q9.setChoices([
    q9.createChoice('Armazenar temporariamente os dados em uso enquanto o computador está ligado', true),
    q9.createChoice('Guardar arquivos permanentemente mesmo após desligar o computador', false),
    q9.createChoice('Processar milhões de operações matemáticas por segundo', false),
    q9.createChoice('Conectar todos os componentes internos entre si', false)
  ]);
  q9.setPoints(1);
  q9.setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('Qual é a diferença entre HD e SSD?');
  q10.setChoices([
    q10.createChoice('SSD é muito mais rápido que o HD, embora ambos armazenem dados permanentemente', true),
    q10.createChoice('HD é mais rápido e SSD armazena dados temporariamente', false),
    q10.createChoice('Ambos têm a mesma velocidade, mas o SSD é maior', false),
    q10.createChoice('HD armazena dados em nuvem, SSD armazena localmente', false)
  ]);
  q10.setPoints(1);
  q10.setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('Qual é a sequência correta do ciclo básico de funcionamento de um computador?');
  q11.setChoices([
    q11.createChoice('Entrada → Processamento → Armazenamento → Saída', true),
    q11.createChoice('Saída → Entrada → Processamento → Armazenamento', false),
    q11.createChoice('Processamento → Entrada → Saída → Armazenamento', false),
    q11.createChoice('Armazenamento → Saída → Entrada → Processamento', false)
  ]);
  q11.setPoints(1);
  q11.setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('O que diferencia hardware de software?');
  q12.setChoices([
    q12.createChoice('Hardware é a parte física (tudo que se pode tocar); software é a parte lógica (programas e instruções)', true),
    q12.createChoice('Hardware são os programas e software são os componentes físicos', false),
    q12.createChoice('Hardware é o sistema operacional e software são os periféricos', false),
    q12.createChoice('Hardware e software são termos sinônimos para componentes do computador', false)
  ]);
  q12.setPoints(1);
  q12.setRequired(true);

  // ── BLOCO 3: SOFTWARE E SISTEMAS OPERACIONAIS ───────────────

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('Qual das alternativas abaixo é um exemplo de Software de Sistema?');
  q13.setChoices([
    q13.createChoice('Sistema Operacional Windows', true),
    q13.createChoice('Google Docs', false),
    q13.createChoice('Spotify', false),
    q13.createChoice('WhatsApp', false)
  ]);
  q13.setPoints(1);
  q13.setRequired(true);

  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('O Chrome OS é o sistema operacional utilizado em qual tipo de dispositivo?');
  q14.setChoices([
    q14.createChoice('Chromebook', true),
    q14.createChoice('iPhone', false),
    q14.createChoice('Computadores Mac', false),
    q14.createChoice('Servidores Linux', false)
  ]);
  q14.setPoints(1);
  q14.setRequired(true);

  var q15 = form.addMultipleChoiceItem();
  q15.setTitle('O que é Software Embarcado?');
  q15.setChoices([
    q15.createChoice('Software instalado em equipamentos industriais como robôs, CLPs e sensores', true),
    q15.createChoice('Software gratuito disponível na internet', false),
    q15.createChoice('Sistema operacional de smartphones', false),
    q15.createChoice('Programa de edição de imagens', false)
  ]);
  q15.setPoints(1);
  q15.setRequired(true);

  var q16 = form.addMultipleChoiceItem();
  q16.setTitle('O que significa Software Livre (Open Source)?');
  q16.setChoices([
    q16.createChoice('Código aberto que qualquer pessoa pode usar, modificar e distribuir', true),
    q16.createChoice('Software gratuito mas com código fechado', false),
    q16.createChoice('Software exclusivo para empresas', false),
    q16.createChoice('Software que funciona apenas na nuvem', false)
  ]);
  q16.setPoints(1);
  q16.setRequired(true);

  // ── BLOCO 4: ALGORITMOS E LINGUAGENS ────────────────────────

  var q17 = form.addMultipleChoiceItem();
  q17.setTitle('O que é um algoritmo?');
  q17.setChoices([
    q17.createChoice('Sequência finita e ordenada de passos para resolver um problema ou executar uma tarefa', true),
    q17.createChoice('Linguagem de programação usada para criar sites', false),
    q17.createChoice('Componente físico do computador que processa dados', false),
    q17.createChoice('Sistema operacional de código aberto', false)
  ]);
  q17.setPoints(1);
  q17.setRequired(true);

  var q18 = form.addMultipleChoiceItem();
  q18.setTitle('Qual linguagem de programação é amplamente usada em Inteligência Artificial e ciência de dados?');
  q18.setChoices([
    q18.createChoice('Python', true),
    q18.createChoice('HTML', false),
    q18.createChoice('SQL', false),
    q18.createChoice('CSS', false)
  ]);
  q18.setPoints(1);
  q18.setRequired(true);

  var q19 = form.addMultipleChoiceItem();
  q19.setTitle('Para que serve a linguagem SQL?');
  q19.setChoices([
    q19.createChoice('Consultar e gerenciar bancos de dados', true),
    q19.createChoice('Criar interfaces visuais de páginas web', false),
    q19.createChoice('Desenvolver aplicativos para Android', false),
    q19.createChoice('Programar sistemas operacionais', false)
  ]);
  q19.setPoints(1);
  q19.setRequired(true);

  var q20 = form.addMultipleChoiceItem();
  q20.setTitle('O computador processa internamente apenas uma linguagem. Qual é ela?');
  q20.setChoices([
    q20.createChoice('Binário — sequências de 0 e 1', true),
    q20.createChoice('Python', false),
    q20.createChoice('HTML', false),
    q20.createChoice('Português estruturado', false)
  ]);
  q20.setPoints(1);
  q20.setRequired(true);

  // ── BLOCO 5: WEB E APLICAÇÕES ───────────────────────────────

  var q21 = form.addMultipleChoiceItem();
  q21.setTitle('Quem criou a World Wide Web (WWW) em 1991?');
  q21.setChoices([
    q21.createChoice('Tim Berners-Lee', true),
    q21.createChoice('Bill Gates', false),
    q21.createChoice('Steve Jobs', false),
    q21.createChoice('Mark Zuckerberg', false)
  ]);
  q21.setPoints(1);
  q21.setRequired(true);

  var q22 = form.addMultipleChoiceItem();
  q22.setTitle('O que caracterizou a Web 2.0?');
  q22.setChoices([
    q22.createChoice('Web participativa e colaborativa — qualquer pessoa publica conteúdo; surgem redes sociais como Facebook e YouTube', true),
    q22.createChoice('Páginas estáticas somente de leitura, criadas apenas por instituições', false),
    q22.createChoice('Web descentralizada baseada em blockchain e inteligência artificial', false),
    q22.createChoice('Internet apenas disponível em computadores de grande porte', false)
  ]);
  q22.setPoints(1);
  q22.setRequired(true);

  var q23 = form.addMultipleChoiceItem();
  q23.setTitle('Qual tecnologia está associada à Web 3.0?');
  q23.setChoices([
    q23.createChoice('Inteligência Artificial, blockchain e descentralização', true),
    q23.createChoice('Surgimento das primeiras páginas estáticas na internet', false),
    q23.createChoice('Criação do e-mail e do protocolo HTTP', false),
    q23.createChoice('Popularização do dial-up e do modem 56k', false)
  ]);
  q23.setPoints(1);
  q23.setRequired(true);

  // ── BLOCO 6: PROFISSÕES E APLICAÇÕES ────────────────────────

  var q24 = form.addMultipleChoiceItem();
  q24.setTitle('Qual profissional de TI é responsável por proteger sistemas contra ataques e vazamentos de dados?');
  q24.setChoices([
    q24.createChoice('Especialista em Segurança da Informação', true),
    q24.createChoice('Cientista de Dados', false),
    q24.createChoice('UX/UI Designer', false),
    q24.createChoice('Desenvolvedor de Software', false)
  ]);
  q24.setPoints(1);
  q24.setRequired(true);

  var q25 = form.addMultipleChoiceItem();
  q25.setTitle('O que faz um Cientista de Dados?');
  q25.setChoices([
    q25.createChoice('Analisa grandes volumes de dados para gerar insights e apoiar decisões', true),
    q25.createChoice('Instala e mantém infraestrutura de redes', false),
    q25.createChoice('Projeta interfaces digitais intuitivas para o usuário', false),
    q25.createChoice('Cria e mantém programas, apps e sistemas', false)
  ]);
  q25.setPoints(1);
  q25.setRequired(true);

  var q26 = form.addMultipleChoiceItem();
  q26.setTitle('Na indústria, qual tecnologia é usada para controlar linhas de produção e automação de máquinas?');
  q26.setChoices([
    q26.createChoice('CLP (Controlador Lógico Programável) e sistemas SCADA', true),
    q26.createChoice('Google Classroom', false),
    q26.createChoice('Internet Banking', false),
    q26.createChoice('Reconhecimento facial para redes sociais', false)
  ]);
  q26.setPoints(1);
  q26.setRequired(true);

  var q27 = form.addMultipleChoiceItem();
  q27.setTitle('Em qual setor o GPS, o piloto automático e o rastreamento de frota são exemplos de aplicação de TI?');
  q27.setChoices([
    q27.createChoice('Transporte', true),
    q27.createChoice('Saúde', false),
    q27.createChoice('Agronegócio', false),
    q27.createChoice('Entretenimento', false)
  ]);
  q27.setPoints(1);
  q27.setRequired(true);

  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link de edição: ' + form.getEditUrl());
  Logger.log('🔗 Link para responder: ' + form.getPublishedUrl());
  Logger.log('📊 Total de questões: ' + form.getItems().length);
}
