/**
 * FORM_AULA_04_INTERNET.gs
 * Aula 04: Internet e Comunicação Digital
 * 10 questões | 10 pontos | Nota automática
 */

function criarFormularioAula04() {
  var form = FormApp.create('Avaliação — Aula 04 · Internet e Comunicação Digital · SENAI');
  form.setDescription('✅ Aula 04: Internet e Comunicação Digital\n10 questões, 10 pontos\n🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('❓ Questionário — Internet e Comunicação Digital');

  form.addMultipleChoiceItem().setTitle('1. Qual é a diferença entre INTERNET e WORLD WIDE WEB?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Não há diferença, são a mesma coisa', false),
      form.addMultipleChoiceItem().createChoice('Internet é a rede; Web é um serviço que usa a internet', true),
      form.addMultipleChoiceItem().createChoice('Web é mais importante que internet', false),
      form.addMultipleChoiceItem().createChoice('Internet é mais rápida que web', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('2. O que é um NAVEGADOR?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um programa de segurança', false),
      form.addMultipleChoiceItem().createChoice('UM PROGRAMA USADO PARA ACESSAR E VER PÁGINAS WEB', true),
      form.addMultipleChoiceItem().createChoice('Um tipo de malware', false),
      form.addMultipleChoiceItem().createChoice('Uma ferramenta de edição de imagens', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('3. Qual destes é um navegador WEB?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Chrome, Firefox, Safari ou Edge', true),
      form.addMultipleChoiceItem().createChoice('Windows ou Linux', false),
      form.addMultipleChoiceItem().createChoice('Outlook', false),
      form.addMultipleChoiceItem().createChoice('AutoCAD', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('4. O que é um MECANISMO DE BUSCA?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Um tipo de navegador', false),
      form.addMultipleChoiceItem().createChoice('UM SERVIÇO QUE AJUDA A ENCONTRAR INFORMAÇÕES NA INTERNET', true),
      form.addMultipleChoiceItem().createChoice('Um programa para fazer backup', false),
      form.addMultipleChoiceItem().createChoice('Um tipo de email', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('5. Qual é o mecanismo de busca mais popular?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Google', true),
      form.addMultipleChoiceItem().createChoice('Facebook', false),
      form.addMultipleChoiceItem().createChoice('Instagram', false),
      form.addMultipleChoiceItem().createChoice('YouTube', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('6. O que é E-MAIL?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma rede social online', false),
      form.addMultipleChoiceItem().createChoice('SISTEMA DE MENSAGENS ENVIADAS PELA INTERNET', true),
      form.addMultipleChoiceItem().createChoice('Um programa de edição', false),
      form.addMultipleChoiceItem().createChoice('Um tipo de malware', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('7. Na comunicação digital profissional, qual é importante?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Usar emoticons em tudo', false),
      form.addMultipleChoiceItem().createChoice('USAR LINGUAGEM CLARA, ASSUNTO DESCRITIVO E ASSINATURA', true),
      form.addMultipleChoiceItem().createChoice('Escrever em letras maiúsculas', false),
      form.addMultipleChoiceItem().createChoice('Enviar sem reler', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('8. O que é ARMAZENAMENTO EM NUVEM (Cloud)?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Uma cópia de segurança apenas local', false),
      form.addMultipleChoiceItem().createChoice('ARMAZENAR DADOS E ARQUIVOS EM SERVIDORES NA INTERNET', true),
      form.addMultipleChoiceItem().createChoice('Um tipo de backup externo', false),
      form.addMultipleChoiceItem().createChoice('Uma rede privada', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('9. Qual é a importância dos DIREITOS AUTORAIS na internet?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Não têm importância', false),
      form.addMultipleChoiceItem().createChoice('PROTEGEM OS CRIADORES DE CONTEÚDO E EXIGEM CITAÇÃO DE FONTES', true),
      form.addMultipleChoiceItem().createChoice('Apenas para professores', false),
      form.addMultipleChoiceItem().createChoice('Apenas para empresas grandes', false)
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle('10. Como CITAR uma fonte consultada na internet?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Não precisa citar', false),
      form.addMultipleChoiceItem().createChoice('INDICAR AUTOR, TÍTULO, DATA E LINK DA FONTE', true),
      form.addMultipleChoiceItem().createChoice('Apenas copiar sem avisar', false),
      form.addMultipleChoiceItem().createChoice('Mudar o nome do autor', false)
    ]).setRequired(true);

  Logger.log('✅ AULA 04 criada: ' + form.getPublishedUrl());
}

function analisarRespostasAula04() {
  var form = FormApp.openByTitle('Avaliação — Aula 04 · Internet e Comunicação Digital · SENAI');
  var responses = form.getResponses();
  Logger.log('Aula 04: ' + responses.length + ' respostas');
}
