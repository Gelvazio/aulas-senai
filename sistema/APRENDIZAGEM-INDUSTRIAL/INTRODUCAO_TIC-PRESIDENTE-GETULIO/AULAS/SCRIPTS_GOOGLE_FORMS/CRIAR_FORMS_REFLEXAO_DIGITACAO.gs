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
 * Atividade: Reflexão — Lição de Casa Agile Fingers
 */

function criarFormulario() {
  var form = FormApp.create('Reflexão — Atividade de Digitação (Agile Fingers)');
  form.setTitle('Reflexão — Atividade de Digitação (Agile Fingers)');
  form.setDescription(
    'Olá! Responda com sinceridade sobre sua experiência com a lição de casa de digitação. ' +
    'Não há resposta certa ou errada — queremos entender como foi para você.\n\n' +
    'Professor: Gelvazio | Turma: Operador de Produção Industrial | UC1 — Introdução à TIC'
  );

  // ── 1. O QUE ACHARAM ────────────────────────────────────────

  var q1 = form.addParagraphTextItem();
  q1.setTitle('O que você achou da atividade de digitação no Agile Fingers?');
  q1.setHelpText('Conte sua impressão geral: foi fácil, difícil, interessante, chato? Fique à vontade para ser honesto(a).');
  q1.setRequired(true);

  // ── 2. DIFICULDADES ─────────────────────────────────────────

  var q2 = form.addCheckboxItem();
  q2.setTitle('Quais foram suas principais dificuldades durante a atividade?');
  q2.setHelpText('Pode marcar mais de uma opção.');
  q2.setChoices([
    q2.createChoice('Velocidade — não consegui digitar rápido o suficiente'),
    q2.createChoice('Erros — cometi muitos erros de digitação'),
    q2.createChoice('Posição dos dedos — não sabia como posicionar corretamente'),
    q2.createChoice('Acento e caracteres especiais (ç, ã, é...)'),
    q2.createChoice('Concentração — me distraí facilmente'),
    q2.createChoice('Não tive dificuldades'),
    q2.createChoice('Outro')
  ]);
  q2.setRequired(true);

  var q2b = form.addParagraphTextItem();
  q2b.setTitle('Se marcou "Outro" ou quiser detalhar alguma dificuldade, escreva aqui:');
  q2b.setRequired(false);

  // ── 3. MELHORIAS ────────────────────────────────────────────

  var q3 = form.addParagraphTextItem();
  q3.setTitle('Na sua opinião, o que poderia melhorar nessa atividade?');
  q3.setHelpText('Pense na plataforma, nas instruções, no tempo dado, no nível de dificuldade...');
  q3.setRequired(true);

  // ── 4. NOTA PESSOAL ─────────────────────────────────────────

  var q4 = form.addScaleItem();
  q4.setTitle('De 1 a 5, como você avalia sua própria performance na atividade?');
  q4.setBounds(1, 5);
  q4.setLabels('Péssimo — errei muito', 'Ótimo — fui muito bem');
  q4.setRequired(true);

  // ── 5. APRENDIZADO ──────────────────────────────────────────

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Após fazer a atividade, você percebe que sua digitação:');
  q5.setChoices([
    q5.createChoice('Melhorou — percebi uma diferença'),
    q5.createChoice('Ficou igual — não senti diferença ainda'),
    q5.createChoice('Não sei avaliar — preciso praticar mais para perceber'),
    q5.createChoice('Piorou — fiquei mais confuso(a) com os dedos')
  ]);
  q5.setRequired(true);

  // ── 6. CONTINUIDADE ─────────────────────────────────────────

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Você continuaria praticando digitação no Agile Fingers por conta própria?');
  q6.setChoices([
    q6.createChoice('Sim — achei útil e quero melhorar'),
    q6.createChoice('Talvez — dependendo do resultado nas próximas aulas'),
    q6.createChoice('Não — prefiro outro método de prática'),
    q6.createChoice('Não sei ainda')
  ]);
  q6.setRequired(true);

  // ── 7. COMENTÁRIO LIVRE ─────────────────────────────────────

  var q7 = form.addParagraphTextItem();
  q7.setTitle('Algum comentário ou sugestão para o professor?');
  q7.setHelpText('Opcional — mas sua opinião é muito importante!');
  q7.setRequired(false);

  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link de edição: ' + form.getEditUrl());
  Logger.log('🔗 Link para os alunos responderem: ' + form.getPublishedUrl());
  Logger.log('📊 Total de perguntas: ' + form.getItems().length);
}
