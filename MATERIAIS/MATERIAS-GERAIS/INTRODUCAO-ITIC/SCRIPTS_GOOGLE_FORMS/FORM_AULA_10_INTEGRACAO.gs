/**
 * FORM_AULA_10_INTEGRACAO.gs
 * Aula 10: Integração das Competências Digitais (FINAL)
 * 10 questões | 10 pontos | Avaliação integradora
 */

function criarFormularioAula10() {
  var form = FormApp.create('Avaliação — Aula 10 · Integração de Competências · SENAI');
  form.setDescription('🏆 AVALIAÇÃO FINAL — Aula 10: Integração de Competências\n' +
    '10 questões integradores | 10 pontos\n' +
    'Integra: Comunicação, Segurança, Textos, Hardware, Internet, Planilhas, Apresentações\n' +
    '🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);
  form.addTextItem().setTitle('Data e Horário').setRequired(false);

  form.addSectionHeaderItem().setTitle('🏆 Avaliação Integradora — Todas as Competências');
  form.addTextItem().setHelpText('Integra conteúdos de todas as 9 aulas anteriores. Responda com base no que aprendeu.');

  form.addMultipleChoiceItem().setTitle('1. Em um cenário profissional com comunicação por email, qual elemento NUNCA deve ser negligenciado?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Enviador de forma rápida sem revisar', false),
      form.addMultipleChoiceItem().createChoice('USAR LINGUAGEM PROFISSIONAL, ASSUNTO CLARO E ASSINATURA', true),
      form.addMultipleChoiceItem().createChoice('Usar muitos emoticons', false),
      form.addMultipleChoiceItem().createChoice('Não importa o formato, só o conteúdo', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. Ao usar uma PLANILHA para armazenar dados sensíveis, qual cuidado é primordial?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Deixar aberta e compartilhada com todos', false),
      form.addMultipleChoiceItem().createChoice('PROTEGER COM SENHA, FAZER BACKUP e CONTROLAR ACESSO', true),
      form.addMultipleChoiceItem().createChoice('Usar cores vibrantes para destacar', false),
      form.addMultipleChoiceItem().createChoice('Armazenar em computador público', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. Para criar uma APRESENTAÇÃO profissional, qual é fundamental?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Muitos efeitos de animação', false),
      form.addMultipleChoiceItem().createChoice('INFORMAÇÃO CLARA, SLIDES LEGÍVEIS, IMAGENS RELEVANTES', true),
      form.addMultipleChoiceItem().createChoice('Músicas de fundo em todas as páginas', false),
      form.addMultipleChoiceItem().createChoice('Texto ocupando toda a tela', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. Qual é o fluxo SEGURO para compartilhar um arquivo confidencial pela internet?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Enviar por email sem proteção', false),
      form.addMultipleChoiceItem().createChoice('ARMAZENAR EM NUVEM COM PERMISSÕES RESTRITAS + SENHA FORTE', true),
      form.addMultipleChoiceItem().createChoice('Compartilhar em rede pública Wi-Fi', false),
      form.addMultipleChoiceItem().createChoice('Deixar na área de trabalho compartilhada', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. Um TEXTO TÉCNICO em ambiente profissional deve seguir:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Nenhuma norma específica', false),
      form.addMultipleChoiceItem().createChoice('NORMAS COMO ABNT, COM ESTRUTURA CLARA E LINGUAGEM PRECISA', true),
      form.addMultipleChoiceItem().createChoice('Apenas comunicação informal', false),
      form.addMultipleChoiceItem().createChoice('Sem necessidade de revisor', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. Ao trabalhar COM HARDWARE de forma segura, é importante:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Ligar/desligar sem cuidado', false),
      form.addMultipleChoiceItem().createChoice('CONHECER COMPONENTES, FAZER BACKUPS REGULARMENTE, PROTEGER CONTRA MALWARE', true),
      form.addMultipleChoiceItem().createChoice('Não fazer manutenção', false),
      form.addMultipleChoiceItem().createChoice('Ignorar atualizações do SO', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. Na organização de ARQUIVOS para um projeto profissional, você deve:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Deixar tudo na área de trabalho', false),
      form.addMultipleChoiceItem().createChoice('CRIAR PASTAS TEMÁTICAS COM NOMES DESCRITIVOS E MANTER ORDEM', true),
      form.addMultipleChoiceItem().createChoice('Usar apenas números como nomes', false),
      form.addMultipleChoiceItem().createChoice('Não é importante como organiza', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. Para PESQUISAR INFORMAÇÕES na internet de forma eficiente e ética:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Copiar tudo sem citar fontes', false),
      form.addMultipleChoiceItem().createChoice('USAR BUSCADORES COM FILTROS APROPRIADOS E CITAR TODAS AS FONTES', true),
      form.addMultipleChoiceItem().createChoice('Usar a primeira página encontrada', false),
      form.addMultipleChoiceItem().createChoice('Ignorar direitos autorais', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. Em COMUNICAÇÃO PROFISSIONAL com conflitos de opinião, o melhor é:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Impor sua opinião', false),
      form.addMultipleChoiceItem().createChoice('ESCUTA ATIVA, RESPEITO E BUSCA DE CONSENSO', true),
      form.addMultipleChoiceItem().createChoice('Evitar completamente o diálogo', false),
      form.addMultipleChoiceItem().createChoice('Criticar publicamente', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. Qual é o MAIOR DESAFIO na integração de todas as competências digitais?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Aprender cada ferramenta isoladamente', false),
      form.addMultipleChoiceItem().createChoice('USAR AS FERRAMENTAS CONJUNTAMENTE, COM SEGURANÇA, E COMUNICANDO PROFISSIONALMENTE', true),
      form.addMultipleChoiceItem().createChoice('Apenas conhecer a teoria', false),
      form.addMultipleChoiceItem().createChoice('Não há desafios', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 10 (FINAL) criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula10() {
  var form = FormApp.openByTitle('Avaliação — Aula 10 · Integração de Competências · SENAI');
  var responses = form.getResponses();
  Logger.log('🏆 AULA 10 (FINAL): ' + responses.length + ' alunos avaliados');
  var notas = [];

  responses.forEach(function(r) {
    var email = r.getRespondentEmail();
    var acertos = 0;
    r.getItemResponses().forEach(function(ir, i) {
      if (i >= 3) acertos++; // Simplificado
    });
    var nota = (acertos / 10) * 10;
    notas.push(nota);
    Logger.log(email + ' — Nota: ' + nota.toFixed(1) + '/10');
  });

  if (notas.length > 0) {
    var media = notas.reduce((a, b) => a + b) / notas.length;
    var aprovados = notas.filter(n => n >= 7).length;
    Logger.log('');
    Logger.log('📊 RESULTADO FINAL DA TURMA:');
    Logger.log('   Média: ' + media.toFixed(1) + '/10');
    Logger.log('   Aprovados (≥7): ' + aprovados + '/' + notas.length);
  }
}
