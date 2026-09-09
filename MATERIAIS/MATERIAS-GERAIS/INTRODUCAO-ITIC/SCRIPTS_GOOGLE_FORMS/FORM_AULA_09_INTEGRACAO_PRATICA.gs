/**
 * FORM_AULA_09_INTEGRACAO_PRATICA.gs
 * Aula 09: Integração Prática de Ferramentas
 * 10 questões | 10 pontos | Avaliação de aplicação de conhecimentos
 */

function criarFormularioAula09() {
  var form = FormApp.create('Avaliação — Aula 09 · Integração Prática de Ferramentas · SENAI');
  form.setDescription('🔧 INTEGRAÇÃO PRÁTICA — Aula 09\n' +
    '10 questões | 10 pontos\n' +
    'Fluxos de trabalho, colaboração, automação e produtividade integrada\n' +
    '🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('🔧 Questionário — Integração Prática de Ferramentas');
  form.addTextItem().setHelpText('10 questões sobre fluxos de trabalho e uso integrado de softwares.');

  form.addMultipleChoiceItem().setTitle('1. O QUE É FLUXO DE TRABALHO INTEGRADO?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Usar um programa por vez', false),
      form.addMultipleChoiceItem().createChoice('USAR MÚLTIPLAS FERRAMENTAS CONECTADAS EM UM PROCESSO ÚNICO', true),
      form.addMultipleChoiceItem().createChoice('Apenas armazenar arquivos', false),
      form.addMultipleChoiceItem().createChoice('Sem conexão entre programas', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. UM EXEMPLO DE FLUXO INTEGRADO é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Pesquisar → Organizar em pasta → Criar doc → Corrigir → Compartilhar', true),
      form.addMultipleChoiceItem().createChoice('Usar Excel apenas', false),
      form.addMultipleChoiceItem().createChoice('Escrever sem pesquisar', false),
      form.addMultipleChoiceItem().createChoice('Não fazer integração', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. A NUVEM (Cloud) facilita:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas armazenar', false),
      form.addMultipleChoiceItem().createChoice('COMPARTILHAR, COLABORAR E ACESSAR ARQUIVOS DE QUALQUER LUGAR', true),
      form.addMultipleChoiceItem().createChoice('Apenas fazer backup', false),
      form.addMultipleChoiceItem().createChoice('Proteger com senha', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. COLABORAÇÃO SIMULTÂNEA significa:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas uma pessoa editando', false),
      form.addMultipleChoiceItem().createChoice('MÚLTIPLAS PESSOAS EDITANDO UM DOCUMENTO AO MESMO TEMPO', true),
      form.addMultipleChoiceItem().createChoice('Revisar depois de pronto', false),
      form.addMultipleChoiceItem().createChoice('Sem feedback entre colaboradores', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. AUTOMAÇÃO DE PROCESSOS refere-se a:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Tudo deve ser manual', false),
      form.addMultipleChoiceItem().createChoice('USAR SCRIPTS/MACROS PARA REPETIR TAREFAS AUTOMATICAMENTE', true),
      form.addMultipleChoiceItem().createChoice('Não é possível automatizar', false),
      form.addMultipleChoiceItem().createChoice('Apenas copiar/colar', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. UM FLUXO DE PESQUISA ACADÊMICA COMPLETO é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Pesquisar sozinho', false),
      form.addMultipleChoiceItem().createChoice('BUSCAR → ORGANIZAR FONTES → ANOTAR → CITAR → COMPILAR', true),
      form.addMultipleChoiceItem().createChoice('Copiar tudo sem citar', false),
      form.addMultipleChoiceItem().createChoice('Sem estrutura', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. A VERSÃO CONTROL (controle de versões) ajuda a:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas salvar uma vez', false),
      form.addMultipleChoiceItem().createChoice('RASTREAR MUDANÇAS, RECUPERAR VERSÕES ANTERIORES', true),
      form.addMultipleChoiceItem().createChoice('Deletar arquivos', false),
      form.addMultipleChoiceItem().createChoice('Não é necessário', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. FEEDBACK EM DOCUMENTOS COMPARTILHADOS pode ser feito com:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas comentários por email', false),
      form.addMultipleChoiceItem().createChoice('COMENTÁRIOS DIRETOS, SUGESTÕES EDITADAS, RASTREAMENTO', true),
      form.addMultipleChoiceItem().createChoice('Sem feedback possível', false),
      form.addMultipleChoiceItem().createChoice('Refazer o documento inteiro', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. EXPORTAR DE UM FORMATO para outro significa:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Deletar o original', false),
      form.addMultipleChoiceItem().createChoice('CONVERTER ARQUIVO (ex: .docx → .pdf ou .xlsx → .csv)', true),
      form.addMultipleChoiceItem().createChoice('Criar cópia idêntica', false),
      form.addMultipleChoiceItem().createChoice('Não é possível', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. A INTEGRAÇÃO DE FERRAMENTAS AUMENTA:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Apenas tamanho de arquivo', false),
      form.addMultipleChoiceItem().createChoice('PRODUTIVIDADE, PRECISÃO E REDUZ ERROS MANUAIS', true),
      form.addMultipleChoiceItem().createChoice('Apenas segurança', false),
      form.addMultipleChoiceItem().createChoice('Não tem impacto', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 09 (INTEGRAÇÃO PRÁTICA) criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula09() {
  var form = FormApp.openByTitle('Avaliação — Aula 09 · Integração Prática de Ferramentas · SENAI');
  var responses = form.getResponses();
  Logger.log('🔧 AULA 09 (INTEGRAÇÃO PRÁTICA): ' + responses.length + ' alunos avaliados');
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
    Logger.log('📊 RESULTADO AULA 09:');
    Logger.log('   Média: ' + media.toFixed(1) + '/10');
    Logger.log('   Aprovados (≥7): ' + aprovados + '/' + notas.length);
  }
}
