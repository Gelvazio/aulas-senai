/**
 * FORM_AULA_07_TEXTOS_TECNICOS.gs
 * Aula 07: Textos Técnicos no Ambiente Profissional
 * 10 questões | 10 pontos | Avaliação de redação técnica
 */

function criarFormularioAula07() {
  var form = FormApp.create('Avaliação — Aula 07 · Textos Técnicos · SENAI');
  form.setDescription('📋 TEXTOS TÉCNICOS — Aula 07\n' +
    '10 questões | 10 pontos\n' +
    'Relatórios, atas, memorandos, ABNT, ISO, IEEE, redação técnica\n' +
    '🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('📋 Questionário — Textos Técnicos');
  form.addTextItem().setHelpText('10 questões sobre textos técnicos e normas profissionais.');

  form.addMultipleChoiceItem().setTitle('1. O QUE É UM TEXTO TÉCNICO?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um texto criativo e literário', false),
      form.addMultipleChoiceItem().createChoice('TEXTO PRECISO QUE DESCREVE PROCESSOS, PROCEDIMENTOS OU INFORMAÇÕES PROFISSIONAIS', true),
      form.addMultipleChoiceItem().createChoice('Um texto informal entre amigos', false),
      form.addMultipleChoiceItem().createChoice('Apenas textos com números', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. QUAL É A PRINCIPAL CARACTERÍSTICA de um texto técnico?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Ser emocionante', false),
      form.addMultipleChoiceItem().createChoice('CLAREZA, OBJETIVIDADE E PRECISÃO na transmissão de informações', true),
      form.addMultipleChoiceItem().createChoice('Ter muitas palavras', false),
      form.addMultipleChoiceItem().createChoice('Usar linguagem coloquial', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. O QUE É UM RELATÓRIO?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma conversa informal', false),
      form.addMultipleChoiceItem().createChoice('DOCUMENTO QUE APRESENTA INFORMAÇÕES, ANÁLISES E CONCLUSÕES SOBRE UM TEMA OU ATIVIDADE', true),
      form.addMultipleChoiceItem().createChoice('Um email simples', false),
      form.addMultipleChoiceItem().createChoice('Um recado verbal', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. O QUE É UMA ATA?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma lei federal', false),
      form.addMultipleChoiceItem().createChoice('REGISTRO OFICIAL DAS DISCUSSÕES, DECISÕES E ACORDOS EM REUNIÃO', true),
      form.addMultipleChoiceItem().createChoice('Um contrato entre pessoas', false),
      form.addMultipleChoiceItem().createChoice('Uma carta pessoal', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. O QUE É UM MEMORANDO?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um adorno para lembranças', false),
      form.addMultipleChoiceItem().createChoice('COMUNICAÇÃO BREVE E FORMAL entre membros de uma organização', true),
      form.addMultipleChoiceItem().createChoice('Um tipo de jornal', false),
      form.addMultipleChoiceItem().createChoice('Uma mensagem de texto', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. A NORMA ABNT NBR 14724 refere-se a:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Segurança em máquinas', false),
      form.addMultipleChoiceItem().createChoice('APRESENTAÇÃO DE TRABALHOS ACADÊMICOS E PROFISSIONAIS', true),
      form.addMultipleChoiceItem().createChoice('Qualidade de alimentos', false),
      form.addMultipleChoiceItem().createChoice('Transportes de carga', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. A LINGUAGEM em um texto técnico deve ser:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Poética e decorada', false),
      form.addMultipleChoiceItem().createChoice('FORMAL, PRECISA, DIRETA E ADEQUADA AO CONTEXTO PROFISSIONAL', true),
      form.addMultipleChoiceItem().createChoice('Cheia de gírias', false),
      form.addMultipleChoiceItem().createChoice('Sem estrutura definida', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. O QUE É UM RESUMO em documentação técnica?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma história condensada', false),
      form.addMultipleChoiceItem().createChoice('SÍNTESE BREVE DE INFORMAÇÕES PRINCIPAIS DE UM DOCUMENTO OU PESQUISA', true),
      form.addMultipleChoiceItem().createChoice('Um comentário pessoal', false),
      form.addMultipleChoiceItem().createChoice('Uma opinião sobre o assunto', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. NA REDAÇÃO TÉCNICA, EVITA-SE:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Informações claras', false),
      form.addMultipleChoiceItem().createChoice('AMBIGUIDADES, REPETIÇÕES DESNECESSÁRIAS E LINGUAGEM VAGA', true),
      form.addMultipleChoiceItem().createChoice('Estrutura organizada', false),
      form.addMultipleChoiceItem().createChoice('Referências de fontes', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. QUAL É A ESTRUTURA BÁSICA de um relatório técnico?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Sem estrutura definida', false),
      form.addMultipleChoiceItem().createChoice('INTRODUÇÃO, DESENVOLVIMENTO, ANÁLISE E CONCLUSÃO', true),
      form.addMultipleChoiceItem().createChoice('Apenas um parágrafo', false),
      form.addMultipleChoiceItem().createChoice('Título e nada mais', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 07 (TEXTOS TÉCNICOS) criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula07() {
  var form = FormApp.openByTitle('Avaliação — Aula 07 · Textos Técnicos · SENAI');
  var responses = form.getResponses();
  Logger.log('📋 AULA 07 (TEXTOS TÉCNICOS): ' + responses.length + ' alunos avaliados');
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
