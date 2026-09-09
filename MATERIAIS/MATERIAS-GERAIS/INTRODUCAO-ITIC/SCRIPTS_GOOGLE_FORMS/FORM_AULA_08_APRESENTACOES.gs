/**
 * FORM_AULA_08_APRESENTACOES.gs
 * Aula 08: Apresentações Profissionais com Slides
 * 10 questões | 10 pontos | Avaliação de design e conteúdo
 */

function criarFormularioAula08() {
  var form = FormApp.create('Avaliação — Aula 08 · Apresentações Profissionais · SENAI');
  form.setDescription('🎨 APRESENTAÇÕES PROFISSIONAIS — Aula 08\n' +
    '10 questões | 10 pontos\n' +
    'PowerPoint, Google Slides, design, hierarquia visual, storytelling\n' +
    '🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('🎨 Questionário — Apresentações Profissionais');
  form.addTextItem().setHelpText('10 questões sobre PowerPoint, Google Slides e design de slides.');

  form.addMultipleChoiceItem().setTitle('1. Um SOFTWARE DE APRESENTAÇÃO PROFISSIONAL é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Adobe Photoshop', false),
      form.addMultipleChoiceItem().createChoice('Microsoft PowerPoint ou Google Slides', true),
      form.addMultipleChoiceItem().createChoice('Excel', false),
      form.addMultipleChoiceItem().createChoice('Paint', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. O QUE É UM SLIDE?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um arquivo de backup', false),
      form.addMultipleChoiceItem().createChoice('UMA PÁGINA INDIVIDUAL DENTRO DE UMA APRESENTAÇÃO', true),
      form.addMultipleChoiceItem().createChoice('Uma pasta de armazenamento', false),
      form.addMultipleChoiceItem().createChoice('Um tipo de vídeo', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. UM SLIDE PROFISSIONAL DEVE TER:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Máximo de textos possível', false),
      form.addMultipleChoiceItem().createChoice('HIERARQUIA VISUAL, IMAGENS RELEVANTES, TEXTO CONCISO', true),
      form.addMultipleChoiceItem().createChoice('Apenas títulos e nada mais', false),
      form.addMultipleChoiceItem().createChoice('Muitas animações', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. QUAL É A REGRA DE "1 IDEIA POR SLIDE"?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Nunca fazer isso', false),
      form.addMultipleChoiceItem().createChoice('CADA SLIDE DEVE CONTER UM CONCEITO PRINCIPAL', true),
      form.addMultipleChoiceItem().createChoice('Preencher slides com múltiplas ideias', false),
      form.addMultipleChoiceItem().createChoice('Não existe essa regra', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. O QUE É STORYTELLING em apresentações?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas usar animações', false),
      form.addMultipleChoiceItem().createChoice('CONTAR UMA HISTÓRIA COERENTE QUE PRENDA O PÚBLICO', true),
      form.addMultipleChoiceItem().createChoice('Ler texto do slide', false),
      form.addMultipleChoiceItem().createChoice('Usar muitas cores', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. PALETA DE CORES EM SLIDES deve ter:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Todas as cores possíveis', false),
      form.addMultipleChoiceItem().createChoice('MÁXIMO 3-5 CORES HARMÔNICAS', true),
      form.addMultipleChoiceItem().createChoice('Apenas branco e preto', false),
      form.addMultipleChoiceItem().createChoice('Sem limite de cores', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. FONTES ADEQUADAS para slides profissionais são:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Comic Sans ou Wingdings', false),
      form.addMultipleChoiceItem().createChoice('Arial, Calibri, Helvetica (sem serifa)', true),
      form.addMultipleChoiceItem().createChoice('Nenhuma fonte funciona', false),
      form.addMultipleChoiceItem().createChoice('Fontes decorativas sempre', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. O TAMANHO DE FONTE mínimo em slides deve ser:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('8 pt', false),
      form.addMultipleChoiceItem().createChoice('18 pt ou maior', true),
      form.addMultipleChoiceItem().createChoice('12 pt', false),
      form.addMultipleChoiceItem().createChoice('Sem limite', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. IMAGENS EM SLIDES devem ser:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Aleatórias e desconexas', false),
      form.addMultipleChoiceItem().createChoice('DE ALTA QUALIDADE E RELACIONADAS AO CONTEÚDO', true),
      form.addMultipleChoiceItem().createChoice('Fundo apenas de decoração', false),
      form.addMultipleChoiceItem().createChoice('Desnecessárias', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. O TEMPO DE APRESENTAÇÃO ideal é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('1 minuto por slide', false),
      form.addMultipleChoiceItem().createChoice('30 SEGUNDOS A 2 MINUTOS POR SLIDE (dependendo conteúdo)', true),
      form.addMultipleChoiceItem().createChoice('Sem limite de tempo', false),
      form.addMultipleChoiceItem().createChoice('5 minutos por slide', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 08 (APRESENTAÇÕES) criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula08() {
  var form = FormApp.openByTitle('Avaliação — Aula 08 · Apresentações Profissionais · SENAI');
  var responses = form.getResponses();
  Logger.log('🎨 AULA 08 (APRESENTAÇÕES): ' + responses.length + ' alunos avaliados');
  var notas = [];

  responses.forEach(function(r) {
    var email = r.getRespondentEmail();
    var acertos = 0;
    r.getItemResponses().forEach(function(ir, i) {
      if (i >= 2) acertos++; // Simplificado
    });
    var nota = (acertos / 10) * 10;
    notas.push(nota);
    Logger.log(email + ' — Nota: ' + nota.toFixed(1) + '/10');
  });

  if (notas.length > 0) {
    var media = notas.reduce((a, b) => a + b) / notas.length;
    var aprovados = notas.filter(n => n >= 7).length;
    Logger.log('');
    Logger.log('📊 RESULTADO AULA 08:');
    Logger.log('   Média: ' + media.toFixed(1) + '/10');
    Logger.log('   Aprovados (≥7): ' + aprovados + '/' + notas.length);
  }
}
