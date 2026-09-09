/**
 * FORM_AULA_07_PLANILHAS.gs
 * Aula 07: Planilhas Eletrônicas e Análise de Dados
 * 10 questões | 10 pontos | Avaliação de conceitos Excel/Sheets
 */

function criarFormularioAula07() {
  var form = FormApp.create('Avaliação — Aula 07 · Planilhas Eletrônicas · SENAI');
  form.setDescription('📊 PLANILHAS ELETRÔNICAS — Aula 07\n' +
    '10 questões | 10 pontos\n' +
    'Excel, Google Sheets, fórmulas, tabelas, gráficos, análise de dados\n' +
    '🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('📊 Questionário — Planilhas Eletrônicas');
  form.addTextItem().setHelpText('10 questões sobre Excel, Google Sheets e análise de dados.');

  form.addMultipleChoiceItem().setTitle('1. Um exemplo de software de PLANILHA ELETRÔNICA é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Microsoft Word', false),
      form.addMultipleChoiceItem().createChoice('Microsoft Excel ou Google Sheets', true),
      form.addMultipleChoiceItem().createChoice('PowerPoint', false),
      form.addMultipleChoiceItem().createChoice('Adobe Illustrator', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. O QUE É UMA CÉLULA em uma planilha?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um arquivo de backup', false),
      form.addMultipleChoiceItem().createChoice('A INTERSECÇÃO ENTRE UMA LINHA E UMA COLUNA', true),
      form.addMultipleChoiceItem().createChoice('Um tipo de gráfico', false),
      form.addMultipleChoiceItem().createChoice('Uma fórmula', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. Como IDENTIFICAR uma célula?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas com números (1, 2, 3)', false),
      form.addMultipleChoiceItem().createChoice('LETRA DA COLUNA + NÚMERO DA LINHA (A1, B2, C3)', true),
      form.addMultipleChoiceItem().createChoice('Apenas com letras (A, B, C)', false),
      form.addMultipleChoiceItem().createChoice('Com datas', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. Uma FÓRMULA em planilha começa com:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Letra maiúscula', false),
      form.addMultipleChoiceItem().createChoice('Espaço em branco', false),
      form.addMultipleChoiceItem().createChoice('= (SINAL DE IGUALDADE)', true),
      form.addMultipleChoiceItem().createChoice('@', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. O QUE FAZ A FUNÇÃO SOMA?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Divide números', false),
      form.addMultipleChoiceItem().createChoice('ADICIONA NÚMEROS DE UM INTERVALO DE CÉLULAS', true),
      form.addMultipleChoiceItem().createChoice('Calcula média', false),
      form.addMultipleChoiceItem().createChoice('Cria gráficos', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. A FUNÇÃO MÉDIA em Excel é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('=MEDIANA()', false),
      form.addMultipleChoiceItem().createChoice('=AVERAGE() ou =MÉDIA()', true),
      form.addMultipleChoiceItem().createChoice('=MEAN()', false),
      form.addMultipleChoiceItem().createChoice('=CALC()', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. UM GRÁFICO em planilha serve para:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Decorar o documento', false),
      form.addMultipleChoiceItem().createChoice('VISUALIZAR DADOS DE FORMA CLARA E ENTENDER TENDÊNCIAS', true),
      form.addMultipleChoiceItem().createChoice('Armazenar dados adicionais', false),
      form.addMultipleChoiceItem().createChoice('Diminuir o tamanho do arquivo', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. QUAL TIPO DE GRÁFICO é melhor para COMPARAR valores?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Pizza (Pie)', false),
      form.addMultipleChoiceItem().createChoice('BARRAS (Bar Chart)', true),
      form.addMultipleChoiceItem().createChoice('Linha (Line)', false),
      form.addMultipleChoiceItem().createChoice('Dispersão (Scatter)', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. ORDENAR dados em planilha significa:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Deletar linhas', false),
      form.addMultipleChoiceItem().createChoice('ORGANIZAR CRESCENTE OU DECRESCENTE POR COLUNA', true),
      form.addMultipleChoiceItem().createChoice('Criar cópia do arquivo', false),
      form.addMultipleChoiceItem().createChoice('Mudar cores de fundo', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. FILTRAR dados em planilha permite:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas visualizar', false),
      form.addMultipleChoiceItem().createChoice('MOSTRAR APENAS LINHAS QUE ATENDEM CRITÉRIOS ESPECÍFICOS', true),
      form.addMultipleChoiceItem().createChoice('Apagar dados permanentemente', false),
      form.addMultipleChoiceItem().createChoice('Dividir a planilha', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 07 (PLANILHAS) criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula07() {
  var form = FormApp.openByTitle('Avaliação — Aula 07 · Planilhas Eletrônicas · SENAI');
  var responses = form.getResponses();
  Logger.log('📊 AULA 07 (PLANILHAS): ' + responses.length + ' alunos avaliados');
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
    Logger.log('📊 RESULTADO AULA 07:');
    Logger.log('   Média: ' + media.toFixed(1) + '/10');
    Logger.log('   Aprovados (≥7): ' + aprovados + '/' + notas.length);
  }
}
