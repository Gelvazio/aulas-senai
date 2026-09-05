/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 08
 * Tema: Textos Técnicos e Revisão Geral
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula08()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarFormularioAula08() {
  var form = FormApp.create('Avaliação — Aula 08 · Textos Técnicos e Revisão · SENAI TI01');

  form.setDescription(
    'Formulário de avaliação sobre Textos Técnicos e Revisão Geral do módulo de TIC.\n' +
    'Aula 08 — 12/08/2026 · Turma TI01 · Professor Gelvazio\n' +
    'Esta é a última aula antes das avaliações. Preencha com atenção!'
  );
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  // ── Seção 1: Identificação ──────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Identificação do Aluno')
    .setHelpText('Preencha seus dados antes de responder.');

  form.addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Número de matrícula / RA')
    .setRequired(false);

  // ── Seção 2: Textos Técnicos ────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Textos Técnicos')
    .setHelpText('7 questões sobre conceitos, tipos, estrutura e normas de textos técnicos.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual das seguintes características NÃO pertence a um texto técnico?')
    .setChoices([
      q1.createChoice('Clareza e objetividade'),
      q1.createChoice('Uso de metáforas e figuras de linguagem', true),
      q1.createChoice('Impessoalidade'),
      q1.createChoice('Precisão e formalidade')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Qual dos seguintes elementos é OBRIGATÓRIO em uma Ata de Reunião?')
    .setChoices([
      q2.createChoice('Logotipo colorido da empresa'),
      q2.createChoice('Data, hora, local e lista de participantes presentes', true),
      q2.createChoice('Assinatura digital de todos os participantes'),
      q2.createChoice('Resumo fotográfico das apresentações')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Qual é a principal diferença entre Memorando e Ofício?')
    .setChoices([
      q3.createChoice('O memorando é enviado por e-mail; o ofício é sempre impresso'),
      q3.createChoice('O memorando é para comunicação interna entre departamentos; o ofício é para comunicação externa com outras organizações', true),
      q3.createChoice('O memorando tem valor legal; o ofício é apenas informativo'),
      q3.createChoice('O ofício é exclusivo de órgãos públicos; o memorando é exclusivo de empresas privadas')
    ])
    .setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. Qual é a estrutura correta de um Relatório Técnico?')
    .setChoices([
      q4.createChoice('Introdução → Resultados → Desenvolvimento → Conclusão'),
      q4.createChoice('Capa → Introdução → Desenvolvimento → Resultados → Conclusão → Referências', true),
      q4.createChoice('Resumo → Problema → Solução → Apêndice'),
      q4.createChoice('Objetivo → Metodologia → Glossário → Índice')
    ])
    .setRequired(true);

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual tipo de resumo apenas lista os tópicos abordados no texto, sem detalhar o conteúdo?')
    .setChoices([
      q5.createChoice('Resumo crítico'),
      q5.createChoice('Resumo informativo'),
      q5.createChoice('Resumo indicativo', true),
      q5.createChoice('Resumo executivo')
    ])
    .setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual texto técnico é elaborado por um especialista para apresentar análise, parecer ou conclusões sobre um fato ou situação?')
    .setChoices([
      q6.createChoice('Memorando'),
      q6.createChoice('Ata'),
      q6.createChoice('Manual de instrução'),
      q6.createChoice('Laudo técnico', true)
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. A norma ABNT NBR 14724 estabelece:')
    .setChoices([
      q7.createChoice('Como fazer referências bibliográficas (citar fontes)'),
      q7.createChoice('Formatação de trabalhos acadêmicos: fonte, margem, espaçamento e capa', true),
      q7.createChoice('Normas de segurança para equipamentos elétricos'),
      q7.createChoice('Procedimentos para auditorias e certificações ISO')
    ])
    .setRequired(true);

  // ── Seção 3: Linguagem Técnica e Boas Práticas ──────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Linguagem Técnica e Comunicação')
    .setHelpText('3 questões sobre linguagem profissional, jargão e comunicação no trabalho.');

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. No contexto da linguagem técnica, o que é jargão?')
    .setChoices([
      q8.createChoice('Uma gíria informal usada em conversas cotidianas'),
      q8.createChoice('Vocabulário especializado utilizado por profissionais de uma área específica', true),
      q8.createChoice('Linguagem coloquial simplificada para o público geral'),
      q8.createChoice('Um erro gramatical comum em textos formais')
    ])
    .setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual das seguintes é uma BOA PRÁTICA na redação de textos técnicos e profissionais?')
    .setChoices([
      q9.createChoice('Usar parágrafos longos para demonstrar profundidade de conhecimento'),
      q9.createChoice('Empregar linguagem figurada para deixar o texto mais interessante'),
      q9.createChoice('Usar palavras de transição (portanto, contudo, além disso) para conectar ideias com clareza', true),
      q9.createChoice('Misturar diferentes fontes e tamanhos de letra para destacar informações')
    ])
    .setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Qual é o elemento da comunicação responsável por captar a mensagem enviada?')
    .setChoices([
      q10.createChoice('Emissor'),
      q10.createChoice('Canal'),
      q10.createChoice('Receptor', true),
      q10.createChoice('Ruído')
    ])
    .setRequired(true);

  // ── Seção 4: Revisão de TIC ─────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Revisão do Módulo de TIC')
    .setHelpText('4 questões cobrindo os principais conteúdos das Aulas 01 a 07.');

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Os três pilares da Segurança da Informação são:')
    .setChoices([
      q11.createChoice('Credibilidade, Integridade e Disponibilidade'),
      q11.createChoice('Confidencialidade, Integridade e Disponibilidade (CID)', true),
      q11.createChoice('Confiança, Identidade e Digitalização'),
      q11.createChoice('Criptografia, Instalação e Detecção')
    ])
    .setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Phishing é um tipo de ataque que:')
    .setChoices([
      q12.createChoice('Danifica fisicamente o hardware do computador'),
      q12.createChoice('Infecta arquivos de sistema e os apaga permanentemente'),
      q12.createChoice('Engana o usuário para que forneça dados pessoais ou clique em links maliciosos', true),
      q12.createChoice('Bloqueia o processador e exige reinicialização do sistema')
    ])
    .setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. O componente do computador responsável por processar os cálculos e instruções é:')
    .setChoices([
      q13.createChoice('HD (Disco Rígido)'),
      q13.createChoice('RAM (Memória de Acesso Aleatório)'),
      q13.createChoice('CPU (Processador)', true),
      q13.createChoice('GPU (Placa de Vídeo)')
    ])
    .setRequired(true);

  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('14. No Google Docs, qual atalho ativa a revisão ortográfica e gramatical?')
    .setChoices([
      q14.createChoice('Ctrl+R'),
      q14.createChoice('F7', true),
      q14.createChoice('Ctrl+O'),
      q14.createChoice('F5')
    ])
    .setRequired(true);

  // ── Seção 5: Redação e Autoavaliação ────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Redação Técnica e Autoavaliação')
    .setHelpText('2 questões discursivas + autoavaliação.');

  form.addParagraphTextItem()
    .setTitle('15. Reescreva a frase a seguir de forma técnica e profissional, adequada para um relatório:\n\n"O programa travou todo e eu não consegui salvar nada que tinha feito."')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('16. Cite 3 termos técnicos de TIC que você aprendeu neste módulo e escreva a definição de cada um com suas próprias palavras.')
    .setRequired(true);

  var q17 = form.addScaleItem();
  q17.setTitle('17. Em uma escala de 1 a 5, como você avalia seu domínio dos conteúdos do módulo de TIC até agora?')
    .setBounds(1, 5)
    .setLabels('Muito inseguro(a)', 'Muito seguro(a)')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('18. Qual conteúdo do módulo de TIC você sente mais necessidade de revisar antes das avaliações? Por quê?')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
