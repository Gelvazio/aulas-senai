/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 07
 * Tema: Google Slides — Editor de Apresentações
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula07()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarFormularioAula07() {
  var form = FormApp.create('Avaliação — Aula 07 · Google Slides · SENAI TI01');

  form.setDescription(
    'Formulário de avaliação sobre Google Slides — Editor de Apresentações.\n' +
    'Aula 07 — 11/08/2026 · Turma TI01 · Professor Gelvazio\n' +
    'Preencha com sua conta Google SENAI.'
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

  // ── Seção 2: Interface e Organização ────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Interface e Organização de Slides')
    .setHelpText('4 questões sobre a interface e organização do Google Slides.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Onde ficam as miniaturas de todos os slides no Google Slides?')
    .setChoices([
      q1.createChoice('Na barra de ferramentas superior'),
      q1.createChoice('No painel esquerdo da interface', true),
      q1.createChoice('No painel de anotações inferior'),
      q1.createChoice('No menu Slide')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Qual atalho de teclado cria um novo slide no Google Slides?')
    .setChoices([
      q2.createChoice('Ctrl+N'),
      q2.createChoice('Ctrl+S'),
      q2.createChoice('Ctrl+M', true),
      q2.createChoice('Ctrl+D')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Como reordenar os slides no Google Slides?')
    .setChoices([
      q3.createChoice('Menu Slide > Mover para cima / Mover para baixo'),
      q3.createChoice('Arrastando os slides no painel lateral esquerdo', true),
      q3.createChoice('Menu Editar > Reorganizar slides'),
      q3.createChoice('Clicando duas vezes no slide e digitando a nova posição')
    ])
    .setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. O Painel de Anotações no Google Slides serve para:')
    .setChoices([
      q4.createChoice('Exibir comentários do público durante a apresentação'),
      q4.createChoice('Guardar anotações do apresentador que não aparecem para o público', true),
      q4.createChoice('Inserir texto que aparece em todos os slides'),
      q4.createChoice('Listar os objetos inseridos no slide atual')
    ])
    .setRequired(true);

  // ── Seção 3: Design e Conteúdo ──────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Design, Conteúdo e Multimídia')
    .setHelpText('5 questões sobre temas, imagens, vídeos e formatação.');

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. O que é um Tema no Google Slides?')
    .setChoices([
      q5.createChoice('Um conjunto de slides pré-prontos para editar'),
      q5.createChoice('Um conjunto de cores, fontes e layouts que dão identidade visual à apresentação', true),
      q5.createChoice('Uma coleção de animações disponíveis'),
      q5.createChoice('Um modelo de apresentação com conteúdo já preenchido')
    ])
    .setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Onde devo ir para inserir um vídeo do YouTube em um slide?')
    .setChoices([
      q6.createChoice('Menu Slide > Inserir vídeo'),
      q6.createChoice('Menu Arquivo > Vídeos'),
      q6.createChoice('Menu Inserir > Vídeo', true),
      q6.createChoice('Menu Formatar > Multimídia')
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Qual atalho insere um link em um texto ou objeto selecionado no Google Slides?')
    .setChoices([
      q7.createChoice('Ctrl+L'),
      q7.createChoice('Ctrl+K', true),
      q7.createChoice('Ctrl+H'),
      q7.createChoice('Ctrl+U')
    ])
    .setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. Como inserir um gráfico vinculado ao Google Sheets em uma apresentação?')
    .setChoices([
      q8.createChoice('Copiar e colar diretamente do Sheets (Ctrl+C / Ctrl+V)'),
      q8.createChoice('Menu Inserir > Gráfico > Do Google Sheets', true),
      q8.createChoice('Menu Slide > Dados externos > Google Sheets'),
      q8.createChoice('Menu Ferramentas > Integração > Sheets')
    ])
    .setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Para agrupar múltiplos objetos no Google Slides, você deve:')
    .setChoices([
      q9.createChoice('Selecionar os objetos > Menu Slide > Agrupar'),
      q9.createChoice('Selecionar os objetos segurando Ctrl > Menu Organizar > Agrupar', true),
      q9.createChoice('Clicar com botão direito em um objeto > Agrupar todos'),
      q9.createChoice('Arrastar um retângulo sobre todos os objetos > Ctrl+G')
    ])
    .setRequired(true);

  // ── Seção 4: Transições, Animações e Apresentação ───────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Transições, Animações e Apresentação')
    .setHelpText('4 questões sobre os recursos de apresentação.');

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Como aplicar a mesma transição a TODOS os slides de uma vez?')
    .setChoices([
      q10.createChoice('Menu Slide > Transição > selecione > Aplicar a todos os slides', true),
      q10.createChoice('Selecionar todos os slides com Ctrl+A e escolher a transição'),
      q10.createChoice('Menu Editar > Aplicar transição em lote'),
      q10.createChoice('Não é possível — cada slide precisa ser configurado individualmente')
    ])
    .setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual é a diferença entre transição e animação no Google Slides?')
    .setChoices([
      q11.createChoice('São a mesma coisa com nomes diferentes'),
      q11.createChoice('Transição ocorre ao passar entre slides; animação é aplicada a objetos dentro do slide', true),
      q11.createChoice('Transição é para vídeos; animação é para imagens'),
      q11.createChoice('Animação ocorre ao passar entre slides; transição é aplicada a objetos')
    ])
    .setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Qual atalho inicia a apresentação a partir do primeiro slide?')
    .setChoices([
      q12.createChoice('Ctrl+P'),
      q12.createChoice('Ctrl+F5', true),
      q12.createChoice('Ctrl+Enter'),
      q12.createChoice('F11')
    ])
    .setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. Durante uma apresentação, pressionar a tecla B serve para:')
    .setChoices([
      q13.createChoice('Voltar ao slide anterior'),
      q13.createChoice('Exibir a tela em branco (pausa visual)', true),
      q13.createChoice('Iniciar a animação do slide atual'),
      q13.createChoice('Ativar o ponteiro laser')
    ])
    .setRequired(true);

  // ── Seção 5: Reflexão ───────────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Reflexão e Prática')
    .setHelpText('2 questões sobre sua experiência com o Google Slides.');

  form.addParagraphTextItem()
    .setTitle('14. Descreva a apresentação que você criou na atividade prática. Quais recursos do Google Slides você utilizou?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('15. Na sua opinião, quais são as principais vantagens de usar o Google Slides em vez do Microsoft PowerPoint?')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
