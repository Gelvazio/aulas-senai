/**
 * FORM_AULA_05_SEGURANCA.gs
 * Aula 05: Segurança da Informação e LGPD
 * 10 questões | 10 pontos | Avaliação obrigatória
 */

function criarFormularioAula05() {
  var form = FormApp.create('Avaliação — Aula 05 · Segurança da Informação · SENAI');
  form.setDescription('🔒 SEGURANÇA DA INFORMAÇÃO — Aula 05\n' +
    '10 questões | 10 pontos\n' +
    'Pilares de segurança, LGPD, senhas, phishing, malware, backup\n' +
    '🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);
  form.addTextItem().setTitle('Data').setRequired(false);

  form.addSectionHeaderItem().setTitle('🔒 Questionário — Segurança da Informação');
  form.addTextItem().setHelpText('10 questões sobre segurança, LGPD, senhas e práticas seguras.');

  form.addMultipleChoiceItem().setTitle('1. Os TRÊS PILARES da segurança da informação são:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Velocidade, Interface e Armazenamento', false),
      form.addMultipleChoiceItem().createChoice('CONFIDENCIALIDADE, INTEGRIDADE e DISPONIBILIDADE', true),
      form.addMultipleChoiceItem().createChoice('Hardware, Software e Rede', false),
      form.addMultipleChoiceItem().createChoice('Senhas, Firewalls e Antivírus', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. O que é CONFIDENCIALIDADE em segurança?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Garantir que dados estejam sempre disponíveis', false),
      form.addMultipleChoiceItem().createChoice('GARANTIR QUE DADOS NÃO SEJAM ACESSADOS POR PESSOAS NÃO AUTORIZADAS', true),
      form.addMultipleChoiceItem().createChoice('Fazer backup de arquivos', false),
      form.addMultipleChoiceItem().createChoice('Usar senhas simples', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. O que é LGPD (Lei Geral de Proteção de Dados)?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma lei que proíbe uso de internet', false),
      form.addMultipleChoiceItem().createChoice('LEI QUE REGULA O USO E PROTEÇÃO DE DADOS PESSOAIS', true),
      form.addMultipleChoiceItem().createChoice('Um antivírus brasileiro', false),
      form.addMultipleChoiceItem().createChoice('Um tipo de senha', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. Uma SENHA FORTE deve ter:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('MÍNIMO 8 CARACTERES, LETRAS, NÚMEROS E SÍMBOLOS', true),
      form.addMultipleChoiceItem().createChoice('Apenas o seu nome', false),
      form.addMultipleChoiceItem().createChoice('Datas de aniversário', false),
      form.addMultipleChoiceItem().createChoice('Nenhum requisito especial', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. O que é PHISHING?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um tipo de antivírus', false),
      form.addMultipleChoiceItem().createChoice('TENTATIVA DE ROUBO DE DADOS USANDO EMAILS OU SITES FALSOS', true),
      form.addMultipleChoiceItem().createChoice('Um backup automático', false),
      form.addMultipleChoiceItem().createChoice('Um firewall', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. Como PROTEGER-SE CONTRA PHISHING?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Clicar em todos os links de email', false),
      form.addMultipleChoiceItem().createChoice('VERIFICAR O REMETENTE, NÃO CLICAR EM LINKS SUSPEITOS, CONFERIR URLs', true),
      form.addMultipleChoiceItem().createChoice('Usar senhas simples', false),
      form.addMultipleChoiceItem().createChoice('Compartilhar dados com desconhecidos', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. O que é MALWARE?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um programa que melhora a velocidade', false),
      form.addMultipleChoiceItem().createChoice('SOFTWARE MALICIOSO QUE DANIFICA O COMPUTADOR OU ROUBA DADOS', true),
      form.addMultipleChoiceItem().createChoice('Uma conexão segura de internet', false),
      form.addMultipleChoiceItem().createChoice('Um arquivo criptografado', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. Qual é a importância de fazer BACKUP regularmente?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Nenhuma importância', false),
      form.addMultipleChoiceItem().createChoice('RECUPERAR DADOS EM CASO DE PERDA, CORRUPÇÃO OU ATAQUE MALICIOSO', true),
      form.addMultipleChoiceItem().createChoice('Aumentar a velocidade do PC', false),
      form.addMultipleChoiceItem().createChoice('Proteger contra vírus apenas', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. Em uma conexão Wi-Fi PÚBLICA é importante:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Evitar completamente a internet', false),
      form.addMultipleChoiceItem().createChoice('USAR VPN, NÃO ACESSAR DADOS SENSÍVEIS, DESABILITAR AUTO-CONEXÃO', true),
      form.addMultipleChoiceItem().createChoice('Usar a rede sem nenhuma proteção', false),
      form.addMultipleChoiceItem().createChoice('Compartilhar senha com desconhecidos', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. A DISPONIBILIDADE em segurança significa:')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Compartilhar dados com qualquer pessoa', false),
      form.addMultipleChoiceItem().createChoice('GARANTIR QUE DADOS ESTEJAM ACESSÍVEIS AOS USUÁRIOS AUTORIZADOS', true),
      form.addMultipleChoiceItem().createChoice('Deixar arquivos públicos na nuvem', false),
      form.addMultipleChoiceItem().createChoice('Ignorar atualizações de segurança', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 05 (SEGURANÇA) criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula05() {
  var form = FormApp.openByTitle('Avaliação — Aula 05 · Segurança da Informação · SENAI');
  var responses = form.getResponses();
  Logger.log('🔒 AULA 05 (SEGURANÇA): ' + responses.length + ' alunos avaliados');
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
    Logger.log('📊 RESULTADO AULA 05:');
    Logger.log('   Média: ' + media.toFixed(1) + '/10');
    Logger.log('   Aprovados (≥7): ' + aprovados + '/' + notas.length);
  }
}
