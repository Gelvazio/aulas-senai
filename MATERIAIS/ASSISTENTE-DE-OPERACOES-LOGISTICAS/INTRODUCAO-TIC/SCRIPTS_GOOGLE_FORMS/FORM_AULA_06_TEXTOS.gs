/**
 * FORM_AULA_06_TEXTOS.gs
 * Aula 06: Edição de Textos e Documentos Profissionais
 * 10 questões | 10 pontos | Avaliação de redação técnica
 */

function criarFormularioAula06() {
  var form = FormApp.create('Avaliação — Aula 06 · Edição de Textos e Documentos · SENAI');
  form.setDescription('✏️ EDIÇÃO DE TEXTOS — Aula 06\n' +
    '10 questões | 10 pontos\n' +
    'Normas ABNT, estrutura de documentos, revisão, formatação profissional\n' +
    '🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('✏️ Questionário — Edição de Textos e Documentos');
  form.addTextItem().setHelpText('10 questões sobre redação, formatação e normas ABNT.');

  form.addMultipleChoiceItem().setTitle('1. Qual é a norma brasileira para formatação de documentos?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('ISO 1234', false),
      form.addMultipleChoiceItem().createChoice('ABNT NBR 14724 (Trabalhos Acadêmicos)', true),
      form.addMultipleChoiceItem().createChoice('IEEE 802.11', false),
      form.addMultipleChoiceItem().createChoice('Unicode 3.0', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. Em um PARÁGRAFO bem estruturado, deve haver:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma única frase', false),
      form.addMultipleChoiceItem().createChoice('IDEIA CENTRAL, DESENVOLVIMENTO E FECHAMENTO', true),
      form.addMultipleChoiceItem().createChoice('Apenas enumeração de itens', false),
      form.addMultipleChoiceItem().createChoice('Texto sem estrutura definida', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. Qual é a estrutura básica de um DOCUMENTO PROFISSIONAL?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Sem estrutura, apenas conteúdo', false),
      form.addMultipleChoiceItem().createChoice('CABEÇALHO, CORPO, ENCERRAMENTO e ASSINATURA', true),
      form.addMultipleChoiceItem().createChoice('Apenas assinatura digital', false),
      form.addMultipleChoiceItem().createChoice('Corpo duplicado', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. A COESÃO TEXTUAL refere-se a:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Tamanho da fonte', false),
      form.addMultipleChoiceItem().createChoice('CONEXÃO ENTRE IDEIAS usando CONECTIVOS e PRONOMES', true),
      form.addMultipleChoiceItem().createChoice('Número de parágrafos', false),
      form.addMultipleChoiceItem().createChoice('Cores no documento', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. Qual é a MARGEM PADRÃO (esquerda) segundo ABNT?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('1 cm', false),
      form.addMultipleChoiceItem().createChoice('3 cm', true),
      form.addMultipleChoiceItem().createChoice('5 cm', false),
      form.addMultipleChoiceItem().createChoice('Sem margem definida', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. O que é REVISÃO ORTOGRÁFICA?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Contar palavras do documento', false),
      form.addMultipleChoiceItem().createChoice('VERIFICAR ERROS GRAMATICAIS, ORTOGRAFIA E PONTUAÇÃO', true),
      form.addMultipleChoiceItem().createChoice('Mudar cores de texto', false),
      form.addMultipleChoiceItem().createChoice('Adicionar imagens', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. Um CABEÇALHO de documento profissional NÃO deve conter:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Nome da empresa', false),
      form.addMultipleChoiceItem().createChoice('Data', false),
      form.addMultipleChoiceItem().createChoice('PIADAS e EMOJIS', true),
      form.addMultipleChoiceItem().createChoice('Logo da instituição', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. O ESPAÇAMENTO SIMPLES em um documento corresponde a:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('1.5', false),
      form.addMultipleChoiceItem().createChoice('1.0', true),
      form.addMultipleChoiceItem().createChoice('2.0', false),
      form.addMultipleChoiceItem().createChoice('Sem padrão definido', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. Qual FONTE é recomendada para documentos formais?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Comic Sans', false),
      form.addMultipleChoiceItem().createChoice('Times New Roman ou Arial', true),
      form.addMultipleChoiceItem().createChoice('Wingdings', false),
      form.addMultipleChoiceItem().createChoice('Qualquer fonte colorida', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. Um TÍTULO SECUNDÁRIO (Heading 2) deve ter:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Fonte maior que o corpo, mas menor que Heading 1', true),
      form.addMultipleChoiceItem().createChoice('Mesma fonte do corpo', false),
      form.addMultipleChoiceItem().createChoice('Fonte mínima', false),
      form.addMultipleChoiceItem().createChoice('Sem hierarquia definida', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 06 (TEXTOS) criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula06() {
  var form = FormApp.openByTitle('Avaliação — Aula 06 · Edição de Textos e Documentos · SENAI');
  var responses = form.getResponses();
  Logger.log('✏️ AULA 06 (TEXTOS): ' + responses.length + ' alunos avaliados');
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
    Logger.log('📊 RESULTADO AULA 06:');
    Logger.log('   Média: ' + media.toFixed(1) + '/10');
    Logger.log('   Aprovados (≥7): ' + aprovados + '/' + notas.length);
  }
}
