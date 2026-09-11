/**
 * FORM_AULA_01_COMUNICACAO.gs
 * Aula 01: Comunicação Profissional
 * 10 questões | 10 pontos | Nota automática
 *
 * INSTRUÇÕES:
 * 1. Acesse https://script.google.com
 * 2. Crie novo projeto e cole este código
 * 3. Execute a função: criarFormularioAula01()
 * 4. O formulário será criado automaticamente no seu Drive
 * 5. Copie o link e compartilhe com os alunos
 */

function criarFormularioAula01() {
  var form = FormApp.create('Avaliação — Aula 01 · Comunicação Profissional · SENAI');

  form.setDescription(
    '✅ Avaliação de Comunicação Profissional\n\n' +
    'Aula 01 — UC Introdução à TIC\n' +
    'Professor: Gelvazio\n\n' +
    '📝 10 questões | 10 pontos no total\n' +
    '⏱️ Tempo estimado: 15 minutos\n' +
    '🎯 Você verá sua pontuação automaticamente ao enviar!'
  );

  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('❓ Questionário — Elementos da Comunicação');
  form.addTextItem().setHelpText('10 questões | 1 ponto cada | Total: 10 pontos');

  form.addMultipleChoiceItem().setTitle('1. Em um processo de comunicação, o EMISSOR é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('A pessoa ou entidade que recebe a mensagem', false),
      form.addMultipleChoiceItem().createChoice('A pessoa ou entidade que ENVIA a mensagem', true),
      form.addMultipleChoiceItem().createChoice('O meio através do qual a mensagem é transmitida', false),
      form.addMultipleChoiceItem().createChoice('O conteúdo da mensagem transmitida', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. Qual é a definição de FEEDBACK em um processo de comunicação?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('A perturbação que atrapalha a comunicação', false),
      form.addMultipleChoiceItem().createChoice('A RESPOSTA ou REAÇÃO do receptor à mensagem recebida', true),
      form.addMultipleChoiceItem().createChoice('O meio através do qual a mensagem é enviada', false),
      form.addMultipleChoiceItem().createChoice('O conjunto de símbolos usados na mensagem', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. O que é RUÍDO em um contexto de comunicação?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas som alto que atrapalha a fala', false),
      form.addMultipleChoiceItem().createChoice('Qualquer INTERFERÊNCIA que prejudica o entendimento da mensagem', true),
      form.addMultipleChoiceItem().createChoice('O tom de voz utilizado pelo emissor', false),
      form.addMultipleChoiceItem().createChoice('A velocidade com que a mensagem é transmitida', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. Qual é a diferença entre linguagem FORMAL e linguagem TÉCNICA?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Não há diferença, são sinônimas', false),
      form.addMultipleChoiceItem().createChoice('Formal segue normas gramaticais; técnica usa TERMOS ESPECÍFICOS de uma área', true),
      form.addMultipleChoiceItem().createChoice('Formal é usada com amigos; técnica é usada no trabalho', false),
      form.addMultipleChoiceItem().createChoice('Formal é escrita; técnica é falada', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. O JARGÃO é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Erro gramatical na comunicação', false),
      form.addMultipleChoiceItem().createChoice('EXPRESSÕES e TERMOS ESPECÍFICOS usados por um grupo profissional', true),
      form.addMultipleChoiceItem().createChoice('Um tipo de grito ou som confuso', false),
      form.addMultipleChoiceItem().createChoice('Forma incorreta de pronunciar palavras', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. Na comunicação profissional, qual elemento NÃO é fundamental?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Mensagem clara e objetiva', false),
      form.addMultipleChoiceItem().createChoice('Receptor que compreenda a mensagem', false),
      form.addMultipleChoiceItem().createChoice('Canal apropriado para transmissão', false),
      form.addMultipleChoiceItem().createChoice('Sempre usar linguagem muito formal, INDEPENDENTEMENTE do contexto', true)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. A comunicação efetiva em equipes de trabalho depende principalmente de:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('ESCUTA ATIVA, CLAREZA e FEEDBACK', true),
      form.addMultipleChoiceItem().createChoice('Que todos tenham a mesma opinião', false),
      form.addMultipleChoiceItem().createChoice('Uso exclusivo de comunicação escrita', false),
      form.addMultipleChoiceItem().createChoice('Evitar completamente conflitos', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. Qual é a importância do CÓDIGO em um processo de comunicação?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('É a senha da mensagem', false),
      form.addMultipleChoiceItem().createChoice('É o SISTEMA DE SÍMBOLOS que emissor e receptor devem compreender', true),
      form.addMultipleChoiceItem().createChoice('É o envelope da mensagem', false),
      form.addMultipleChoiceItem().createChoice('Não tem importância real', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. Um erro comum na comunicação profissional é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Adaptar a mensagem ao público', false),
      form.addMultipleChoiceItem().createChoice('Usar JARGÃO EXCESSIVO com pessoas que não entendem o assunto', true),
      form.addMultipleChoiceItem().createChoice('Pedir feedback', false),
      form.addMultipleChoiceItem().createChoice('Ser claro e objetivo', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. Na comunicação em equipes, a BUSCA DE CONSENSO significa:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Todos sempre concordarem sem discussão', false),
      form.addMultipleChoiceItem().createChoice('Impor a opinião do chefe', false),
      form.addMultipleChoiceItem().createChoice('OUVIR, DISCUTIR e CHEGAR a um ACORDO que satisfaça o grupo', true),
      form.addMultipleChoiceItem().createChoice('Evitar qualquer debate', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 01 criada com sucesso!');
  Logger.log('');
  Logger.log('📊 INFORMAÇÕES DO FORMULÁRIO:');
  Logger.log('   Aula: 01 — Comunicação Profissional');
  Logger.log('   Questões: 10');
  Logger.log('   Pontuação: 10 pontos (1 ponto/questão)');
  Logger.log('');
  Logger.log('🔗 LINK PARA COMPARTILHAR COM ALUNOS:');
  Logger.log(form.getPublishedUrl());
  Logger.log('');
  Logger.log('✏️ LINK PARA EDITAR (PROFESSOR):');
  Logger.log(FormApp.getActiveForm().getEditUrl());
}

function analisarRespostasAula01() {
  var form = FormApp.openByTitle('Avaliação — Aula 01 · Comunicação Profissional · SENAI');
  var responses = form.getResponses();

  Logger.log('📊 ANÁLISE DE RESPOSTAS — AULA 01');
  Logger.log('═══════════════════════════════════════════════════');
  Logger.log('Total de respostas: ' + responses.length);
  Logger.log('');

  var todasAsNotas = [];

  responses.forEach(function(response) {
    var email = response.getRespondentEmail();
    var itemResponses = response.getItemResponses();
    var acertos = 0;
    var total = 10;

    var respostasCorretas = [
      'A pessoa ou entidade que ENVIA a mensagem',
      'A RESPOSTA ou REAÇÃO do receptor à mensagem recebida',
      'Qualquer INTERFERÊNCIA que prejudica o entendimento da mensagem',
      'Formal segue normas gramaticais; técnica usa TERMOS ESPECÍFICOS de uma área',
      'EXPRESSÕES e TERMOS ESPECÍFICOS usados por um grupo profissional',
      'Sempre usar linguagem muito formal, INDEPENDENTEMENTE do contexto',
      'ESCUTA ATIVA, CLAREZA e FEEDBACK',
      'É o SISTEMA DE SÍMBOLOS que emissor e receptor devem compreender',
      'Usar JARGÃO EXCESSIVO com pessoas que não entendem o assunto',
      'OUVIR, DISCUTIR e CHEGAR a um ACORDO que satisfaça o grupo'
    ];

    itemResponses.forEach(function(itemResponse, idx) {
      var resposta = itemResponse.getResponse();
      if (idx >= 2 && idx < 12) {
        if (resposta === respostasCorretas[idx - 2]) {
          acertos++;
        }
      }
    });

    var nota = (acertos / total) * 10;
    var percentual = (acertos / total) * 100;

    todasAsNotas.push(nota);

    var feedback = '';
    if (nota >= 9) {
      feedback = '🌟 EXCELENTE! Domina completamente o conceito de comunicação profissional!';
    } else if (nota >= 7) {
      feedback = '✅ MUITO BOM! Compreendeu bem. Revise os tópicos com menor acerto.';
    } else if (nota >= 5) {
      feedback = '⚠️ Bom início! Estude novamente os elementos com o professor.';
    } else {
      feedback = '💡 Procure o professor para revisão orientada.';
    }

    Logger.log('👤 ' + email);
    Logger.log('   Acertos: ' + acertos + '/' + total);
    Logger.log('   Nota: ' + nota.toFixed(1) + '/10 (' + percentual.toFixed(0) + '%)');
    Logger.log('   ' + feedback);
    Logger.log('');
  });

  if (todasAsNotas.length > 0) {
    var media = todasAsNotas.reduce(function(a, b) { return a + b; }) / todasAsNotas.length;
    Logger.log('─────────────────────────────────────────────────');
    Logger.log('📈 ESTATÍSTICAS DA TURMA');
    Logger.log('   Média: ' + media.toFixed(1) + '/10');
    Logger.log('   Maior nota: ' + Math.max.apply(null, todasAsNotas).toFixed(1) + '/10');
    Logger.log('   Menor nota: ' + Math.min.apply(null, todasAsNotas).toFixed(1) + '/10');
  }
}
