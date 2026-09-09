/**
 * FORMULÁRIO AULA 02 — Hardware, Software e Sistema Operacional
 * UC: Introdução à TIC — SENAI
 * 10 questões | 10 pontos | Mostra nota automática ao aluno
 */

function criarFormularioAula02() {
  var form = FormApp.create('Avaliação — Aula 02 · Hardware e Sistema Operacional · SENAI');
  form.setDescription('✅ Avaliação: Hardware, Software e SO\nAula 02 — 10 questões, 10 pontos\n🎯 Nota automática ao enviar!');
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(true);

  form.addSectionHeaderItem().setTitle('📋 Identificação');
  form.addTextItem().setTitle('Nome Completo').setRequired(true);
  form.addTextItem().setTitle('RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('❓ Questionário — Hardware e SO');

  var q1 = form.addMultipleChoiceItem().setTitle('1. O que é HARDWARE?');
  q1.setChoices([
    q1.createChoice('A PARTE FÍSICA do computador (componentes tangíveis)', true),
    q1.createChoice('Os programas e sistemas do computador', false),
    q1.createChoice('A conexão com a internet', false),
    q1.createChoice('Os dados armazenados no computador', false)
  ]).setRequired(true);

  var q2 = form.addMultipleChoiceItem().setTitle('2. O que é SOFTWARE?');
  q2.setChoices([
    q2.createChoice('Componentes que você pode segurar fisicamente', false),
    q2.createChoice('Os PROGRAMAS e SISTEMAS que controlam o computador', true),
    q2.createChoice('A velocidade do processador', false),
    q2.createChoice('A quantidade de memória RAM', false)
  ]).setRequired(true);

  var q3 = form.addMultipleChoiceItem().setTitle('3. Qual é a função do PROCESSADOR?');
  q3.setChoices([
    q3.createChoice('Armazenar dados permanentemente', false),
    q3.createChoice('EXECUTAR as instruções dos programas e realizar cálculos', true),
    q3.createChoice('Conectar o computador à internet', false),
    q3.createChoice('Exibir imagens na tela', false)
  ]).setRequired(true);

  var q4 = form.addMultipleChoiceItem().setTitle('4. Qual é a função da MEMÓRIA RAM?');
  q4.setChoices([
    q4.createChoice('Armazenar dados permanentemente (mesmo desligado)', false),
    q4.createChoice('ARMAZENAR DADOS TEMPORARIAMENTE enquanto o programa está aberto', true),
    q4.createChoice('Controlar o uso de energia', false),
    q4.createChoice('Processar vídeos em tempo real', false)
  ]).setRequired(true);

  var q5 = form.addMultipleChoiceItem().setTitle('5. O DISCO RÍGIDO (HD) serve para:');
  q5.setChoices([
    q5.createChoice('Processar dados temporários', false),
    q5.createChoice('ARMAZENAR DADOS PERMANENTEMENTE (arquivos, programas)', true),
    q5.createChoice('Controlar a qualidade da imagem', false),
    q5.createChoice('Gerenciar a energia do computador', false)
  ]).setRequired(true);

  var q6 = form.addMultipleChoiceItem().setTitle('6. Qual é a definição de PERIFÉRICO?');
  q6.setChoices([
    q6.createChoice('Uma parte desnecessária do computador', false),
    q6.createChoice('DISPOSITIVOS CONECTADOS ao computador para entrada/saída de dados', true),
    q6.createChoice('Um tipo de programa', false),
    q6.createChoice('A tela do computador', false)
  ]).setRequired(true);

  var q7 = form.addMultipleChoiceItem().setTitle('7. Qual é a função do SISTEMA OPERACIONAL?');
  q7.setChoices([
    q7.createChoice('Armazenar arquivos de vídeo', false),
    q7.createChoice('GERENCIAR os recursos do computador e permitir que programas funcionem', true),
    q7.createChoice('Conectar ao Wi-Fi automaticamente', false),
    q7.createChoice('Fazer backup de dados', false)
  ]).setRequired(true);

  var q8 = form.addMultipleChoiceItem().setTitle('8. Qual destes é um Sistema Operacional?');
  q8.setChoices([
    q8.createChoice('Google Chrome', false),
    q8.createChoice('Microsoft Word', false),
    q8.createChoice('Windows, macOS ou Linux', true),
    q8.createChoice('Adobe Photoshop', false)
  ]).setRequired(true);

  var q9 = form.addMultipleChoiceItem().setTitle('9. Qual é a relação entre HARDWARE e SOFTWARE?');
  q9.setChoices([
    q9.createChoice('Não têm relação um com o outro', false),
    q9.createChoice('Hardware é a máquina física; software são os programas que a controlam', true),
    q9.createChoice('São nomes diferentes para a mesma coisa', false),
    q9.createChoice('Software é mais importante que hardware', false)
  ]).setRequired(true);

  var q10 = form.addMultipleChoiceItem().setTitle('10. Para rodar um programa pesado, qual componente é mais importante melhorar?');
  q10.setChoices([
    q10.createChoice('O monitor', false),
    q10.createChoice('O teclado', false),
    q10.createChoice('O PROCESSADOR e a MEMÓRIA RAM', true),
    q10.createChoice('A impressora', false)
  ]).setRequired(true);

  Logger.log('✅ Formulário AULA 02 criado!');
  Logger.log('Link: ' + form.getPublishedUrl());
}

function analisarRespostasAula02() {
  var form = FormApp.openByTitle('Avaliação — Aula 02 · Hardware e Sistema Operacional · SENAI');
  var responses = form.getResponses();
  var todasAsNotas = [];

  responses.forEach(function(response) {
    var itemResponses = response.getItemResponses();
    var acertos = 0;
    var respostasCorretas = [
      'A PARTE FÍSICA do computador (componentes tangíveis)',
      'Os PROGRAMAS e SISTEMAS que controlam o computador',
      'EXECUTAR as instruções dos programas e realizar cálculos',
      'ARMAZENAR DADOS TEMPORARIAMENTE enquanto o programa está aberto',
      'ARMAZENAR DADOS PERMANENTEMENTE (arquivos, programas)',
      'DISPOSITIVOS CONECTADOS ao computador para entrada/saída de dados',
      'GERENCIAR os recursos do computador e permitir que programas funcionem',
      'Windows, macOS ou Linux',
      'Hardware é a máquina física; software são os programas que a controlam',
      'O PROCESSADOR e a MEMÓRIA RAM'
    ];

    itemResponses.forEach(function(itemResponse, idx) {
      if (idx >= 2) {
        if (itemResponse.getResponse() === respostasCorretas[idx - 2]) {
          acertos++;
        }
      }
    });

    var nota = (acertos / 10) * 10;
    todasAsNotas.push(nota);
    Logger.log(response.getRespondentEmail() + ' — ' + acertos + '/10 — Nota: ' + nota.toFixed(1));
  });

  if (todasAsNotas.length > 0) {
    var media = todasAsNotas.reduce((a, b) => a + b) / todasAsNotas.length;
    Logger.log('Média da turma: ' + media.toFixed(1) + '/10');
  }
}
