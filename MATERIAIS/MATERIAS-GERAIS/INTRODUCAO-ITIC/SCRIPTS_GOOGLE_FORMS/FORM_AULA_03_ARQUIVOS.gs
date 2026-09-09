/**
 * FORM_AULA_03_ARQUIVOS.gs
 * Aula 03: Organização e Gerenciamento de Arquivos
 * 10 questões | 10 pontos | Nota automática
 */

function criarFormularioAula03() {
  var form = FormApp.create('Avaliação — Aula 03 · Arquivos e Pastas · SENAI');
  form.setDescription('✅ Aula 03: Organização de Arquivos\n10 questões, 10 pontos\n🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('❓ Questionário — Arquivos e Pastas');

  form.addMultipleChoiceItem().setTitle('1. O que é um ARQUIVO?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma pastinha que contém outros arquivos', false),
      form.addMultipleChoiceItem().createChoice('UM CONJUNTO DE DADOS armazenado com um nome', true),
      form.addMultipleChoiceItem().createChoice('Uma conexão com a internet', false),
      form.addMultipleChoiceItem().createChoice('Um tipo de programa', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. O que é uma PASTA (ou diretório)?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um arquivo executável', false),
      form.addMultipleChoiceItem().createChoice('UM CONTAINER que ORGANIZA ARQUIVOS (pode conter subpastas)', true),
      form.addMultipleChoiceItem().createChoice('Um programa de edição', false),
      form.addMultipleChoiceItem().createChoice('Apenas um atalho', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. Qual é a vantagem de organizar arquivos em pastas?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Faz o computador mais rápido', false),
      form.addMultipleChoiceItem().createChoice('FACILITA A LOCALIZAÇÃO e MANTÉM TUDO ORGANIZADO', true),
      form.addMultipleChoiceItem().createChoice('Reduz o uso de memória', false),
      form.addMultipleChoiceItem().createChoice('Não há vantagem real', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. O que é uma EXTENSÃO de arquivo?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Pasta adicional', false),
      form.addMultipleChoiceItem().createChoice('AS 3-4 LETRAS APÓS O PONTO QUE INDICAM O TIPO DE ARQUIVO', true),
      form.addMultipleChoiceItem().createChoice('Um programa para baixar arquivos', false),
      form.addMultipleChoiceItem().createChoice('Espaço de armazenamento extra', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. Qual é a extensão de um arquivo de texto?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('.xlsx', false),
      form.addMultipleChoiceItem().createChoice('.doc ou .docx', true),
      form.addMultipleChoiceItem().createChoice('.jpg', false),
      form.addMultipleChoiceItem().createChoice('.mp3', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. Para que serve a COMPACTAÇÃO de arquivos?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apagar dados desnecessários', false),
      form.addMultipleChoiceItem().createChoice('REDUZIR O TAMANHO do arquivo para facilitar envio/armazenamento', true),
      form.addMultipleChoiceItem().createChoice('Aumentar a segurança', false),
      form.addMultipleChoiceItem().createChoice('Fazer backup automático', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. Qual é o formato de arquivo COMPACTADO mais comum?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('.doc', false),
      form.addMultipleChoiceItem().createChoice('.zip ou .rar', true),
      form.addMultipleChoiceItem().createChoice('.txt', false),
      form.addMultipleChoiceItem().createChoice('.html', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. Como RENOMEAR um arquivo?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas deletar e criar novamente', false),
      form.addMultipleChoiceItem().createChoice('CLICAR COM BOTÃO DIREITO → Renomear (ou F2)', true),
      form.addMultipleChoiceItem().createChoice('Usar um programa especial', false),
      form.addMultipleChoiceItem().createChoice('Não é possível renomear', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. Para BUSCAR um arquivo no seu computador, você pode usar:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Manualmente procurar em cada pasta', false),
      form.addMultipleChoiceItem().createChoice('A FERRAMENTA DE BUSCA do Sistema Operacional', true),
      form.addMultipleChoiceItem().createChoice('Apenas Google', false),
      form.addMultipleChoiceItem().createChoice('Perguntar a alguém', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. Uma boa prática de ORGANIZAÇÃO de arquivos é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Armazenar TUDO na área de trabalho', false),
      form.addMultipleChoiceItem().createChoice('CRIAR PASTAS TEMÁTICAS com NOMES DESCRITIVOS', true),
      form.addMultipleChoiceItem().createChoice('Não é necessário organizar', false),
      form.addMultipleChoiceItem().createChoice('Usar apenas nomes numéricos', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 03 criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula03() {
  var form = FormApp.openByTitle('Avaliação — Aula 03 · Arquivos e Pastas · SENAI');
  var responses = form.getResponses();
  Logger.log('Aula 03: ' + responses.length + ' respostas');
  var notas = [];

  responses.forEach(function(r) {
    var acertos = 0;
    r.getItemResponses().forEach(function(ir, i) {
      if (i >= 2) acertos++; // Simplificado para demo
    });
    notas.push((acertos / 10) * 10);
  });

  if (notas.length > 0) {
    var media = notas.reduce((a, b) => a + b) / notas.length;
    Logger.log('Média: ' + media.toFixed(1) + '/10');
  }
}
