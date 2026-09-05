/**
 * INSTRUÇÕES DE USO:
 * 1. Acesse https://script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o código existente e cole este arquivo inteiro
 * 4. Clique em "Executar" (▶) na função criarFormulario
 * 5. Autorize o script quando solicitado
 * 6. O formulário será criado no seu Google Drive automaticamente
 *
 * Disciplina: UC1 — Introdução à TIC — SENAI
 * Aula: Elementos da Comunicação e Comunicação em Equipes
 */

function criarFormulario() {
  var form = FormApp.create('Elementos da Comunicação — Avaliação UC1 SENAI');
  form.setTitle('Elementos da Comunicação — Avaliação UC1 SENAI');
  form.setDescription('Avaliação referente à Aula 02 — Elementos da Comunicação e Comunicação em Equipes de Trabalho — UC1 Introdução à TIC — Professor Gelvazio');
  form.setIsQuiz(true);
  form.setShuffleQuestions(false);

  // ── BLOCO 1: ELEMENTOS DA COMUNICAÇÃO ───────────────────────

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('No processo de comunicação, quem é o EMISSOR?');
  q1.setChoices([
    q1.createChoice('Quem produz e envia a mensagem', true),
    q1.createChoice('Quem recebe e interpreta a mensagem', false),
    q1.createChoice('O meio pelo qual a mensagem é transmitida', false),
    q1.createChoice('O retorno dado ao emissor após receber a mensagem', false)
  ]);
  q1.setPoints(1);
  q1.setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('O que é o RECEPTOR em um processo de comunicação?');
  q2.setChoices([
    q2.createChoice('A pessoa ou grupo que recebe e interpreta a mensagem', true),
    q2.createChoice('O meio de comunicação usado para transmitir a mensagem', false),
    q2.createChoice('O conteúdo que está sendo transmitido', false),
    q2.createChoice('Quem produz e envia a mensagem', false)
  ]);
  q2.setPoints(1);
  q2.setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Em uma reunião de equipe, um colega fala sobre os resultados do mês. O QUE representa a fala dele neste processo de comunicação?');
  q3.setChoices([
    q3.createChoice('A mensagem', true),
    q3.createChoice('O canal', false),
    q3.createChoice('O feedback', false),
    q3.createChoice('O ruído', false)
  ]);
  q3.setPoints(1);
  q3.setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('O CANAL de comunicação é:');
  q4.setChoices([
    q4.createChoice('O meio pelo qual a mensagem é transmitida (voz, e-mail, telefone, papel...)', true),
    q4.createChoice('O conteúdo da mensagem enviada', false),
    q4.createChoice('A resposta do receptor ao emissor', false),
    q4.createChoice('A pessoa que origina a comunicação', false)
  ]);
  q4.setPoints(1);
  q4.setRequired(true);

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Durante uma videoconferência, a internet cai e a voz fica cortada. O que representa esse problema no processo de comunicação?');
  q5.setChoices([
    q5.createChoice('Ruído', true),
    q5.createChoice('Feedback', false),
    q5.createChoice('Código', false),
    q5.createChoice('Mensagem', false)
  ]);
  q5.setPoints(1);
  q5.setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('O RUÍDO na comunicação pode ser definido como:');
  q6.setChoices([
    q6.createChoice('Qualquer interferência que prejudica a transmissão ou compreensão da mensagem', true),
    q6.createChoice('O sistema de sinais usado para codificar a mensagem', false),
    q6.createChoice('O retorno que o receptor dá ao emissor', false),
    q6.createChoice('O meio físico usado para enviar a mensagem', false)
  ]);
  q6.setPoints(1);
  q6.setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('O que é o CÓDIGO em um processo de comunicação?');
  q7.setChoices([
    q7.createChoice('O conjunto de sinais e regras (idioma, gestos, imagens) que dão sentido à mensagem', true),
    q7.createChoice('A senha necessária para abrir um arquivo protegido', false),
    q7.createChoice('O caminho que a mensagem percorre até o receptor', false),
    q7.createChoice('O ruído que interfere na comunicação digital', false)
  ]);
  q7.setPoints(1);
  q7.setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Após receber um e-mail do supervisor, o funcionário responde confirmando que entendeu a tarefa. O que representa essa resposta?');
  q8.setChoices([
    q8.createChoice('Feedback', true),
    q8.createChoice('Ruído', false),
    q8.createChoice('Canal', false),
    q8.createChoice('Código', false)
  ]);
  q8.setPoints(1);
  q8.setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('Por que o FEEDBACK é importante na comunicação profissional?');
  q9.setChoices([
    q9.createChoice('Confirma se a mensagem foi compreendida e permite correções no processo comunicativo', true),
    q9.createChoice('Aumenta o volume da voz do emissor para reduzir os ruídos', false),
    q9.createChoice('Substitui o canal de comunicação quando ele falha', false),
    q9.createChoice('Define o código que será usado na comunicação', false)
  ]);
  q9.setPoints(1);
  q9.setRequired(true);

  // ── BLOCO 2: COMUNICAÇÃO EM EQUIPES ─────────────────────────

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('Quais são os 5 estágios do desenvolvimento de equipes segundo o modelo de Tuckman?');
  q10.setChoices([
    q10.createChoice('Formação, Conflito, Normatização, Desempenho e Encerramento', true),
    q10.createChoice('Planejamento, Execução, Revisão, Entrega e Avaliação', false),
    q10.createChoice('Apresentação, Discussão, Votação, Decisão e Implementação', false),
    q10.createChoice('Contratação, Treinamento, Integração, Produção e Desligamento', false)
  ]);
  q10.setPoints(1);
  q10.setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('No estágio de CONFLITO (Storming) de uma equipe, o que geralmente acontece?');
  q11.setChoices([
    q11.createChoice('Surgem divergências de opinião e disputas de liderança entre os membros', true),
    q11.createChoice('A equipe atinge seu melhor desempenho e maior produtividade', false),
    q11.createChoice('Os membros se conhecem e as funções começam a ser definidas', false),
    q11.createChoice('A equipe encerra o projeto e faz a retrospectiva dos resultados', false)
  ]);
  q11.setPoints(1);
  q11.setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('BUSCA DE CONSENSO em uma equipe significa:');
  q12.setChoices([
    q12.createChoice('Chegar a uma decisão que todos os membros possam aceitar e apoiar', true),
    q12.createChoice('Votar e seguir a opinião da maioria, ignorando a minoria', false),
    q12.createChoice('Aceitar a decisão do líder sem discussão', false),
    q12.createChoice('Evitar qualquer debate para não gerar conflitos', false)
  ]);
  q12.setPoints(1);
  q12.setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('Qual é a melhor forma de lidar com CONFLITOS em uma equipe de trabalho?');
  q13.setChoices([
    q13.createChoice('Identificar as causas, ouvir todos os lados e buscar soluções colaborativas', true),
    q13.createChoice('Ignorar o conflito até que ele se resolva sozinho', false),
    q13.createChoice('Eliminar os membros que discordam da maioria', false),
    q13.createChoice('Recorrer sempre ao supervisor para que ele decida por todos', false)
  ]);
  q13.setPoints(1);
  q13.setRequired(true);

  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('A ESCUTA ATIVA em uma equipe de trabalho consiste em:');
  q14.setChoices([
    q14.createChoice('Prestar total atenção ao interlocutor, demonstrando interesse e buscando compreender o que é dito', true),
    q14.createChoice('Ouvir o colega enquanto realiza outras tarefas ao mesmo tempo', false),
    q14.createChoice('Responder imediatamente antes que o colega termine de falar', false),
    q14.createChoice('Anotar tudo que é dito sem fazer perguntas', false)
  ]);
  q14.setPoints(1);
  q14.setRequired(true);

  // ── BLOCO 3: TEXTOS TÉCNICOS ────────────────────────────────

  var q15 = form.addMultipleChoiceItem();
  q15.setTitle('O que é um RELATÓRIO técnico?');
  q15.setChoices([
    q15.createChoice('Documento formal que descreve atividades, resultados ou análises de forma estruturada', true),
    q15.createChoice('Registro das decisões tomadas em uma reunião', false),
    q15.createChoice('Comunicado interno curto enviado entre setores de uma empresa', false),
    q15.createChoice('Síntese reduzida de um documento maior', false)
  ]);
  q15.setPoints(1);
  q15.setRequired(true);

  var q16 = form.addMultipleChoiceItem();
  q16.setTitle('Qual documento registra de forma oficial as decisões, discussões e encaminhamentos de uma reunião?');
  q16.setChoices([
    q16.createChoice('Ata', true),
    q16.createChoice('Memorando', false),
    q16.createChoice('Relatório', false),
    q16.createChoice('Resumo', false)
  ]);
  q16.setPoints(1);
  q16.setRequired(true);

  var q17 = form.addMultipleChoiceItem();
  q17.setTitle('O MEMORANDO é um tipo de comunicação utilizado para:');
  q17.setChoices([
    q17.createChoice('Comunicação interna rápida entre setores ou departamentos de uma mesma organização', true),
    q17.createChoice('Registrar o resultado de uma reunião com todas as decisões tomadas', false),
    q17.createChoice('Apresentar uma análise detalhada de um processo ou resultado', false),
    q17.createChoice('Condensar as principais ideias de um texto longo', false)
  ]);
  q17.setPoints(1);
  q17.setRequired(true);

  var q18 = form.addMultipleChoiceItem();
  q18.setTitle('O RESUMO de um texto técnico deve:');
  q18.setChoices([
    q18.createChoice('Apresentar as ideias principais de forma clara e concisa, sem interpretações pessoais', true),
    q18.createChoice('Reproduzir o texto original na íntegra com formatação diferente', false),
    q18.createChoice('Incluir apenas a conclusão e as recomendações do documento', false),
    q18.createChoice('Ser sempre mais longo que o documento original', false)
  ]);
  q18.setPoints(1);
  q18.setRequired(true);

  // ── BLOCO 4: NÍVEIS DE FALA ──────────────────────────────────

  var q19 = form.addMultipleChoiceItem();
  q19.setTitle('A LINGUAGEM CULTA ou formal é mais indicada em qual situação?');
  q19.setChoices([
    q19.createChoice('Relatórios, apresentações, e-mails profissionais e reuniões formais', true),
    q19.createChoice('Conversas informais entre colegas de mesma equipe', false),
    q19.createChoice('Mensagens de texto no celular', false),
    q19.createChoice('Comentários em redes sociais pessoais', false)
  ]);
  q19.setPoints(1);
  q19.setRequired(true);

  var q20 = form.addMultipleChoiceItem();
  q20.setTitle('O que é JARGÃO profissional?');
  q20.setChoices([
    q20.createChoice('Vocabulário técnico específico de uma área ou profissão, nem sempre compreendido por todos', true),
    q20.createChoice('Forma incorreta de falar que deve ser evitada em todos os contextos', false),
    q20.createChoice('Linguagem formal exigida em documentos oficiais', false),
    q20.createChoice('Gírias e expressões populares usadas no cotidiano', false)
  ]);
  q20.setPoints(1);
  q20.setRequired(true);

  var q21 = form.addMultipleChoiceItem();
  q21.setTitle('Um técnico usa termos como "CLP", "SCADA" e "inversor de frequência" ao conversar com outros técnicos. Que tipo de linguagem ele está usando?');
  q21.setChoices([
    q21.createChoice('Linguagem técnica / jargão profissional', true),
    q21.createChoice('Linguagem culta formal', false),
    q21.createChoice('Linguagem coloquial', false),
    q21.createChoice('Linguagem literária', false)
  ]);
  q21.setPoints(1);
  q21.setRequired(true);

  var q22 = form.addMultipleChoiceItem();
  q22.setTitle('Por que é importante adaptar o NÍVEL DE LINGUAGEM ao contexto e ao interlocutor?');
  q22.setChoices([
    q22.createChoice('Para garantir que a mensagem seja compreendida e a comunicação seja eficaz', true),
    q22.createChoice('Para demonstrar superioridade intelectual sobre o interlocutor', false),
    q22.createChoice('Porque a legislação trabalhista exige o uso da linguagem culta em todas as situações', false),
    q22.createChoice('Para evitar o uso de qualquer tipo de jargão, mesmo entre especialistas', false)
  ]);
  q22.setPoints(1);
  q22.setRequired(true);

  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link de edição: ' + form.getEditUrl());
  Logger.log('🔗 Link para responder: ' + form.getPublishedUrl());
  Logger.log('📊 Total de questões: ' + form.getItems().length);
}
