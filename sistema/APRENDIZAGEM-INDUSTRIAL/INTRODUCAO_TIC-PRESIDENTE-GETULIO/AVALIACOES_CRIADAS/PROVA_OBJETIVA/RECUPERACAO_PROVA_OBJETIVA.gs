/**
 * ============================================================
 *  RECUPERAÇÃO — AVALIAÇÃO OBJETIVA | UC1 Introdução à TIC
 *  SENAI — Aprendizagem Industrial | AI OPIR 2026/2 V1
 *  Docente: Gelvazio Camargo
 * ============================================================
 *
 *  COMO USAR:
 *  1. Acesse script.google.com e crie um novo projeto
 *  2. Apague o código existente e cole este script completo
 *  3. Salve (Ctrl+S)
 *  4. Execute a função criarRecuperacaoUC1TIC()
 *  5. Autorize o acesso quando solicitado (necessário apenas na 1ª vez)
 *  6. O link do formulário aparecerá em Visualizar > Registros
 *
 *  PONTUAÇÃO:
 *  10 questões × 1 ponto cada = 10 pontos (escala SENAI direta, sem conversão).
 * ============================================================
 */

function criarRecuperacaoUC1TIC() {

  // ── Cria o formulário ───────────────────────────────────────
  var form = FormApp.create('RECUPERAÇÃO — Avaliação Objetiva UC1 Introdução à TIC');

  form.setTitle('RECUPERAÇÃO — AVALIAÇÃO OBJETIVA\nIntrodução à Tecnologia da Informação e Comunicação');

  form.setDescription(
    'SENAI — Aprendizagem Industrial\n' +
    'Curso: Operador de Produção Industrial\n' +
    'Unidade Curricular: Introdução à TIC | Turma: AI OPIR 2026/2 V1\n' +
    'Docente: Gelvazio Camargo\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    'INSTRUÇÕES AO ESTUDANTE\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '• Esta é a avaliação de recuperação.\n' +
    '• Contém 10 questões de múltipla escolha, cada uma valendo 1,0 ponto (total: 10,0 pontos).\n' +
    '• Leia atentamente a situação antes de responder o comando de cada item.\n' +
    '• Marque apenas uma alternativa por questão.\n' +
    '• Não é permitida consulta a materiais ou dispositivos eletrônicos.'
  );

  // ── Configura o modo quiz ───────────────────────────────────
  form.setIsQuiz(true);
  form.setShowLinkToRespondAgain(false);
  form.setLimitOneResponsePerUser(false);
  form.setShuffleQuestions(false);

  form.setConfirmationMessage(
    'Recuperação enviada com sucesso!\n\n' +
    'Sua nota aparece abaixo (escala de 0 a 10 — sem conversão necessária).\n\n' +
    'Bom trabalho! — Prof. Gelvazio Camargo'
  );

  // ── Dados das questões ──────────────────────────────────────
  // correta: índice da alternativa correta (0 = a, 1 = b, 2 = c, 3 = d)

  var questoes = [

    // ─── C2 — Segurança da Informação ───────────────────────
    {
      num: '01', cap: 'C2',
      situacao: 'Uma funcionária recebe um e-mail de remetente desconhecido pedindo que ela clique em um link e informe sua senha corporativa para "confirmar o cadastro".',
      comando: 'A atitude correta diante dessa situação é:',
      alternativas: [
        'a) Clicar no link e informar a senha para evitar problemas.',
        'b) Ignorar o e-mail e não clicar em links ou fornecer dados pessoais.',
        'c) Encaminhar o e-mail para todos os colegas.',
        'd) Responder ao e-mail pedindo mais informações.'
      ],
      correta: 1
    },

    {
      num: '02', cap: 'C2',
      situacao: 'Um técnico de TI precisa orientar os funcionários a criarem senhas seguras para acessar os sistemas da empresa.',
      comando: 'A senha que atende melhor aos critérios de segurança é:',
      alternativas: [
        'a) nome123',
        'b) senha',
        'c) Tr@b4lh0!2026',
        'd) 111111'
      ],
      correta: 2
    },

    {
      num: '03', cap: 'C2',
      situacao: 'Um computador de uma empresa foi infectado por um programa malicioso que se instalou silenciosamente após o usuário abrir um arquivo de origem desconhecida.',
      comando: 'Esse tipo de software é classificado como:',
      alternativas: [
        'a) Sistema operacional.',
        'b) Planilha eletrônica.',
        'c) Malware (código malicioso).',
        'd) Navegador de internet.'
      ],
      correta: 2
    },

    {
      num: '04', cap: 'C2',
      situacao: 'Para não perder documentos importantes em caso de falha no computador, a empresa precisa adotar uma estratégia de proteção dos dados.',
      comando: 'A prática mais adequada para garantir a segurança das informações é:',
      alternativas: [
        'a) Manter todos os arquivos apenas na área de trabalho do computador.',
        'b) Realizar cópias de segurança (backup) dos dados regularmente.',
        'c) Compartilhar os arquivos por e-mail para todos da empresa.',
        'd) Nunca fechar os documentos abertos.'
      ],
      correta: 1
    },

    // ─── C1 — Comunicação ───────────────────────────────────
    {
      num: '05', cap: 'C1',
      situacao: 'Após uma reunião de equipe, o supervisor pediu que um funcionário registrasse formalmente os assuntos discutidos, as decisões tomadas e os responsáveis por cada tarefa definida.',
      comando: 'O documento mais adequado para esse tipo de registro é:',
      alternativas: [
        'a) Ata de reunião.',
        'b) Anúncio publicitário.',
        'c) Mensagem de rede social.',
        'd) Lista de compras.'
      ],
      correta: 0
    },

    {
      num: '06', cap: 'C1',
      situacao: 'Um profissional precisa se comunicar com sua equipe sobre uma mudança de procedimento. Ele quer garantir que todos entendam a mensagem.',
      comando: 'Para que a comunicação seja eficaz, a mensagem deve ser:',
      alternativas: [
        'a) Longa, com muitos detalhes desnecessários.',
        'b) Clara, objetiva e adequada ao público que a receberá.',
        'c) Escrita apenas com termos técnicos avançados.',
        'd) Enviada sem indicar o assunto principal.'
      ],
      correta: 1
    },

    // ─── C4 — Hardware e Sistema Operacional ────────────────
    {
      num: '07', cap: 'C4',
      situacao: 'Um técnico de suporte explica aos funcionários qual é o componente do computador responsável por executar todos os cálculos e processar as instruções dos programas.',
      comando: 'Esse componente é chamado de:',
      alternativas: [
        'a) Monitor.',
        'b) Memória RAM.',
        'c) CPU (Processador).',
        'd) Impressora.'
      ],
      correta: 2
    },

    {
      num: '08', cap: 'C4',
      situacao: 'Durante uma aula sobre tecnologia, o instrutor explica que existem diferentes tipos de software que controlam o funcionamento básico do computador, permitindo que outros programas sejam executados.',
      comando: 'Esse tipo de software é chamado de:',
      alternativas: [
        'a) Editor de textos.',
        'b) Sistema operacional.',
        'c) Planilha eletrônica.',
        'd) Navegador de internet.'
      ],
      correta: 1
    },

    // ─── C5 — Internet e WEB ────────────────────────────────
    {
      num: '09', cap: 'C5',
      situacao: 'Uma equipe de trabalho que atua em locais diferentes precisa criar e editar um documento de forma colaborativa, sem precisar enviar arquivos por e-mail.',
      comando: 'A ferramenta mais adequada para essa necessidade é:',
      alternativas: [
        'a) Pen drive.',
        'b) Google Drive com Google Docs.',
        'c) Impressora em rede.',
        'd) Programa de compactação de arquivos.'
      ],
      correta: 1
    },

    // ─── C3 — Planilha Eletrônica ───────────────────────────
    {
      num: '10', cap: 'C3',
      situacao: 'Um funcionário precisa calcular a soma dos valores das células A1, A2 e A3 em uma planilha eletrônica.',
      comando: 'A função correta para realizar essa operação é:',
      alternativas: [
        'a) =MÉDIA(A1:A3)',
        'b) =MÁXIMO(A1:A3)',
        'c) =SOMA(A1:A3)',
        'd) =SE(A1:A3)'
      ],
      correta: 2
    }

  ]; // fim do array questoes

  // ── Adiciona as questões ao formulário ──────────────────────
  questoes.forEach(function(q) {

    var titulo = 'ITEM ' + q.num + '  —  ' + q.cap + '\n\n' +
                 'Situação: ' + q.situacao + '\n\n' +
                 'Comando: ' + q.comando;

    var item = form.addMultipleChoiceItem();
    item.setTitle(titulo);
    item.setRequired(true);
    item.setPoints(1); // 1 ponto por questão | total: 10 pontos

    var choices = q.alternativas.map(function(alt, idx) {
      return item.createChoice(alt, idx === q.correta);
    });
    item.setChoices(choices);

    // Feedback exibido ao aluno após correção
    var fbCerto = FormApp.createFeedback();
    fbCerto.setText('Resposta correta: ' + q.alternativas[q.correta]);
    item.setFeedbackForCorrect(fbCerto.build());

    var fbErro = FormApp.createFeedback();
    fbErro.setText('Resposta correta: ' + q.alternativas[q.correta]);
    item.setFeedbackForIncorrect(fbErro.build());

  });

  // ── Exibe os links no Log ───────────────────────────────────
  Logger.log('==========================================');
  Logger.log('Formulário de RECUPERAÇÃO criado!');
  Logger.log('==========================================');
  Logger.log('Link para os alunos responderem:');
  Logger.log(form.getPublishedUrl());
  Logger.log('');
  Logger.log('Link para editar o formulário:');
  Logger.log(form.getEditUrl());
  Logger.log('');
  Logger.log('Link para ver as respostas:');
  Logger.log('https://docs.google.com/forms/d/' + form.getId() + '/viewanalytics');
  Logger.log('==========================================');
  Logger.log('PONTUAÇÃO: 1 pt por questão | Total: 10 pts');
  Logger.log('(Escala SENAI direta — sem conversão necessária)');
  Logger.log('==========================================');
}
