/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 05
 * Tema: Google Docs — Editor de Textos
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula05()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarFormularioAula05() {
  var form = FormApp.create('Avaliação — Aula 05 · Google Docs · SENAI TI01');

  form.setDescription(
    'Formulário de avaliação sobre Google Docs — Editor de Textos.\n' +
    'Aula 05 — 07/08/2026 · Turma TI01 · Professor Gelvazio\n' +
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

  // ── Seção 2: Tipos de Editores e Interface (slides 2–3) ─────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Tipos de Editores e Interface do Google Docs')
    .setHelpText('4 questões sobre tipos de editores de texto e a interface do Google Docs.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual é a principal diferença entre um editor de texto simples (ex: Bloco de Notas) e um editor rico (ex: Google Docs)?')
    .setChoices([
      q1.createChoice('O editor simples funciona online; o rico funciona offline'),
      q1.createChoice('O editor rico permite formatação avançada como fontes, cores, tabelas e imagens', true),
      q1.createChoice('O editor simples é pago; o rico é gratuito'),
      q1.createChoice('O editor rico salva em .txt; o simples salva em .docx')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Como criar um novo documento no Google Docs a partir do Google Drive?')
    .setChoices([
      q2.createChoice('Drive > Abrir > Documentos Google'),
      q2.createChoice('Drive > Novo > Documentos Google', true),
      q2.createChoice('Drive > Ferramentas > Google Docs'),
      q2.createChoice('Drive > Compartilhar > Documentos Google')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Uma grande vantagem do Google Docs em relação ao Microsoft Word instalado é:')
    .setChoices([
      q3.createChoice('Ter mais recursos de formatação avançada'),
      q3.createChoice('Salvar automaticamente no Google Drive e permitir colaboração em tempo real', true),
      q3.createChoice('Funcionar sem acesso à internet em todos os recursos'),
      q3.createChoice('Ser compatível exclusivamente com arquivos .odt')
    ])
    .setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. O Google Docs faz parte de qual conjunto de ferramentas?')
    .setChoices([
      q4.createChoice('Microsoft 365'),
      q4.createChoice('LibreOffice Suite'),
      q4.createChoice('Google Workspace', true),
      q4.createChoice('Apple iWork')
    ])
    .setRequired(true);

  // ── Seção 3: Formatação, Página e Parágrafos (slides 4–6) ──────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Formatação, Página e Parágrafos')
    .setHelpText('7 questões sobre formatação de texto, configuração de página, recuos e alinhamento.');

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual atalho de teclado aplica negrito no texto selecionado no Google Docs?')
    .setChoices([
      q5.createChoice('Ctrl+I'),
      q5.createChoice('Ctrl+U'),
      q5.createChoice('Ctrl+B', true),
      q5.createChoice('Ctrl+N')
    ])
    .setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual atalho de teclado remove TODA a formatação aplicada ao texto selecionado no Google Docs?')
    .setChoices([
      q6.createChoice('Ctrl+Z'),
      q6.createChoice('Ctrl+Delete'),
      q6.createChoice('Ctrl+\\', true),
      q6.createChoice('Ctrl+F')
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Onde se configura o tamanho do papel e as margens no Google Docs?')
    .setChoices([
      q7.createChoice('Menu Editar > Configurações de página'),
      q7.createChoice('Menu Arquivo > Configurar página', true),
      q7.createChoice('Menu Formatar > Configurar página'),
      q7.createChoice('Menu Ver > Configurações de impressão')
    ])
    .setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. Segundo as normas ABNT, qual deve ser a margem esquerda de um documento?')
    .setChoices([
      q8.createChoice('2 cm'),
      q8.createChoice('2,5 cm'),
      q8.createChoice('3 cm', true),
      q8.createChoice('4 cm')
    ])
    .setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. O recuo de primeira linha exigido pela ABNT para cada parágrafo é:')
    .setChoices([
      q9.createChoice('0,5 cm'),
      q9.createChoice('1,0 cm'),
      q9.createChoice('1,25 cm', true),
      q9.createChoice('2,0 cm')
    ])
    .setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. O espaçamento entre linhas recomendado pela ABNT para o corpo do texto é:')
    .setChoices([
      q10.createChoice('Simples (1,0)'),
      q10.createChoice('1,5', true),
      q10.createChoice('Duplo (2,0)'),
      q10.createChoice('2,5')
    ])
    .setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual atalho de teclado aplica alinhamento justificado ao parágrafo no Google Docs?')
    .setChoices([
      q11.createChoice('Ctrl+L'),
      q11.createChoice('Ctrl+E'),
      q11.createChoice('Ctrl+R'),
      q11.createChoice('Ctrl+J', true)
    ])
    .setRequired(true);

  // ── Seção 4: Marcadores, Bordas e Colunas (slides 7–9) ─────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Marcadores, Bordas e Colunas')
    .setHelpText('3 questões sobre listas, bordas de parágrafo e colunas no Google Docs.');

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Ao criar uma lista no Google Docs, como se criam subitens (itens de um nível abaixo)?')
    .setChoices([
      q12.createChoice('Pressione Enter duas vezes'),
      q12.createChoice('Pressione Tab enquanto o cursor está no início do item', true),
      q12.createChoice('Clique em Formatar > Subnível'),
      q12.createChoice('Pressione Ctrl+Shift+L')
    ])
    .setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. Como acessar a configuração de bordas e sombreamento de um parágrafo no Google Docs?')
    .setChoices([
      q13.createChoice('Menu Inserir > Bordas e sombreamento'),
      q13.createChoice('Menu Formatar > Estilo do parágrafo > Bordas e sombreamento', true),
      q13.createChoice('Menu Editar > Parágrafo > Bordas'),
      q13.createChoice('Menu Ver > Bordas de página')
    ])
    .setRequired(true);

  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('14. Como dividir o texto do documento em colunas (como um jornal) no Google Docs?')
    .setChoices([
      q14.createChoice('Menu Inserir > Colunas'),
      q14.createChoice('Menu Arquivo > Layout > Colunas'),
      q14.createChoice('Menu Formatar > Colunas', true),
      q14.createChoice('Menu Ver > Colunas')
    ])
    .setRequired(true);

  // ── Seção 5: Tabelas, Imagens, Exibição, Colaboração e Exportação (slides 10–14) ──
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Tabelas, Imagens, Colaboração e Exportação')
    .setHelpText('7 questões sobre inserção de elementos, correção ortográfica, colaboração e exportação.');

  var q15 = form.addMultipleChoiceItem();
  q15.setTitle('15. Como inserir uma tabela no Google Docs?')
    .setChoices([
      q15.createChoice('Menu Formatar > Tabela'),
      q15.createChoice('Menu Inserir > Tabela', true),
      q15.createChoice('Menu Arquivo > Novo > Tabela'),
      q15.createChoice('Menu Editar > Inserir tabela')
    ])
    .setRequired(true);

  var q16 = form.addMultipleChoiceItem();
  q16.setTitle('16. Como inserir uma imagem no Google Docs?')
    .setChoices([
      q16.createChoice('Menu Formatar > Imagem'),
      q16.createChoice('Menu Inserir > Imagem', true),
      q16.createChoice('Menu Arquivo > Imagem'),
      q16.createChoice('Menu Editar > Colar imagem')
    ])
    .setRequired(true);

  var q17 = form.addMultipleChoiceItem();
  q17.setTitle('17. Qual atalho abre a ferramenta de ortografia e gramática no Google Docs?')
    .setChoices([
      q17.createChoice('F5'),
      q17.createChoice('F7', true),
      q17.createChoice('F9'),
      q17.createChoice('Ctrl+F')
    ])
    .setRequired(true);

  var q18 = form.addMultipleChoiceItem();
  q18.setTitle('18. Qual atalho de teclado insere um comentário no Google Docs sem alterar o conteúdo do documento?')
    .setChoices([
      q18.createChoice('Ctrl+Alt+C'),
      q18.createChoice('Ctrl+Alt+M', true),
      q18.createChoice('Ctrl+Shift+M'),
      q18.createChoice('Ctrl+M')
    ])
    .setRequired(true);

  var q19 = form.addMultipleChoiceItem();
  q19.setTitle('19. Para ver o histórico de versões anteriores de um documento no Google Docs, acesse:')
    .setChoices([
      q19.createChoice('Menu Editar > Histórico de alterações'),
      q19.createChoice('Menu Ver > Versões anteriores'),
      q19.createChoice('Menu Arquivo > Histórico de versões > Ver histórico', true),
      q19.createChoice('Menu Ferramentas > Controle de versões')
    ])
    .setRequired(true);

  var q20 = form.addMultipleChoiceItem();
  q20.setTitle('20. Para exportar um documento do Google Docs como arquivo do Microsoft Word, acesse:')
    .setChoices([
      q20.createChoice('Menu Arquivo > Exportar > Word'),
      q20.createChoice('Menu Arquivo > Fazer download > Microsoft Word (.docx)', true),
      q20.createChoice('Menu Editar > Salvar como > .docx'),
      q20.createChoice('Menu Compartilhar > Download > Word')
    ])
    .setRequired(true);

  var q21 = form.addMultipleChoiceItem();
  q21.setTitle('21. Para exportar um documento do Google Docs como PDF, acesse:')
    .setChoices([
      q21.createChoice('Menu Compartilhar > Download > PDF'),
      q21.createChoice('Menu Arquivo > Exportar > PDF'),
      q21.createChoice('Menu Arquivo > Fazer download > Documento PDF (.pdf)', true),
      q21.createChoice('Menu Arquivo > Imprimir > Salvar como PDF')
    ])
    .setRequired(true);

  // ── Seção 6: Reflexão e Prática (slide 15) ──────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 5 — Reflexão e Prática')
    .setHelpText('2 questões sobre sua experiência com a atividade prática da Aula 05.');

  form.addParagraphTextItem()
    .setTitle('22. Descreva como você criou o documento profissional na atividade prática da Aula 05. Quais recursos do Google Docs você utilizou (formatação, tabela, lista com marcadores, margens ABNT, recuo de primeira linha…)?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('23. Qual foi a maior dificuldade que você encontrou ao trabalhar com o Google Docs? Como você resolveu ou pretende resolver?')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
