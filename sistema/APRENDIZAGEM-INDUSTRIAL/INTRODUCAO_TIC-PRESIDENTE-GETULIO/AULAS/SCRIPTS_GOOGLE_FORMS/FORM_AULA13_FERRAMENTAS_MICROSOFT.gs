/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 13
 * Tema: Ferramentas Microsoft — Word, Excel, PowerPoint, Outlook, OneDrive
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula13()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarFormularioAula13() {
  var form = FormApp.create('Avaliação — Aula 13 · Ferramentas Microsoft · SENAI TI01');

  form.setDescription(
    'Formulário de avaliação sobre Ferramentas Microsoft — Word, Excel, PowerPoint, Outlook e OneDrive.\n' +
    'Aula 13 — 24/08/2026 · Turma TI01 · Professor Gelvazio\n' +
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

  // ── Seção 2: Microsoft 365 e Word ───────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Microsoft 365 e Word')
    .setHelpText('5 questões sobre o pacote Microsoft e o editor de textos Word.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual é a extensão padrão dos arquivos criados no Microsoft Word?')
    .setChoices([
      q1.createChoice('.txt'),
      q1.createChoice('.docx', true),
      q1.createChoice('.odt'),
      q1.createChoice('.xlsx')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Para acessar o Microsoft Word gratuitamente pelo navegador, qual endereço utilizar?')
    .setChoices([
      q2.createChoice('docs.google.com'),
      q2.createChoice('word.microsoft.com'),
      q2.createChoice('word.cloud.microsoft', true),
      q2.createChoice('office.com/word')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Qual atalho de teclado é usado para aplicar negrito no Microsoft Word?')
    .setChoices([
      q3.createChoice('Ctrl+N'),
      q3.createChoice('Ctrl+B', true),
      q3.createChoice('Ctrl+G'),
      q3.createChoice('Ctrl+S')
    ])
    .setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. No Word, onde você configura o tamanho do papel, orientação e margens?')
    .setChoices([
      q4.createChoice('Guia Inserir > Configurar Página'),
      q4.createChoice('Guia Layout (ou Layout de Página)', true),
      q4.createChoice('Guia Revisão > Configurações'),
      q4.createChoice('Menu Arquivo > Opções')
    ])
    .setRequired(true);

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual ação permite exportar um documento Word como PDF?')
    .setChoices([
      q5.createChoice('Guia Inserir > Exportar'),
      q5.createChoice('Ctrl+P e escolher impressora PDF'),
      q5.createChoice('Arquivo > Salvar Como > PDF', true),
      q5.createChoice('Guia Revisão > Publicar')
    ])
    .setRequired(true);

  // ── Seção 3: Microsoft Excel ─────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Microsoft Excel')
    .setHelpText('5 questões sobre planilhas, fórmulas e recursos do Excel.');

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual é a extensão padrão dos arquivos criados no Microsoft Excel?')
    .setChoices([
      q6.createChoice('.csv'),
      q6.createChoice('.xls'),
      q6.createChoice('.xlsx', true),
      q6.createChoice('.docx')
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Qual fórmula do Excel calcula a soma dos valores de A1 até A10?')
    .setChoices([
      q7.createChoice('=TOTAL(A1:A10)'),
      q7.createChoice('=SOMA(A1:A10)', true),
      q7.createChoice('=ADICIONAR(A1,A10)'),
      q7.createChoice('=SUM(A1-A10)')
    ])
    .setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. O que significa usar $ em uma referência de célula no Excel, como $B$2?')
    .setChoices([
      q8.createChoice('Indica que o valor da célula é em dinheiro'),
      q8.createChoice('Trava a referência da célula para que não mude ao copiar a fórmula', true),
      q8.createChoice('Multiplica o valor da célula por 2'),
      q8.createChoice('Bloqueia a edição da célula')
    ])
    .setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual recurso do Excel permite exibir somente as linhas que atendem a um critério específico?')
    .setChoices([
      q9.createChoice('Classificar'),
      q9.createChoice('Formatação Condicional'),
      q9.createChoice('Filtro', true),
      q9.createChoice('Congelar Painéis')
    ])
    .setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Para criar um gráfico no Excel, qual é o primeiro passo?')
    .setChoices([
      q10.createChoice('Ir em Arquivo > Inserir Gráfico'),
      q10.createChoice('Selecionar os dados e ir na guia Inserir > Gráficos', true),
      q10.createChoice('Clicar com o botão direito e escolher "Novo Gráfico"'),
      q10.createChoice('Usar a fórmula =GRÁFICO()')
    ])
    .setRequired(true);

  // ── Seção 4: PowerPoint, Outlook e OneDrive ─────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — PowerPoint, Outlook e OneDrive')
    .setHelpText('5 questões sobre apresentações, e-mail e armazenamento em nuvem.');

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual é a extensão padrão dos arquivos do Microsoft PowerPoint?')
    .setChoices([
      q11.createChoice('.ppt'),
      q11.createChoice('.pptx', true),
      q11.createChoice('.odp'),
      q11.createChoice('.slides')
    ])
    .setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Qual tecla inicia a apresentação de slides em tela cheia no PowerPoint?')
    .setChoices([
      q12.createChoice('F1'),
      q12.createChoice('F5', true),
      q12.createChoice('Ctrl+P'),
      q12.createChoice('Ctrl+F5')
    ])
    .setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. No Outlook, o que é CC (Com Cópia) em um e-mail?')
    .setChoices([
      q13.createChoice('Um campo para escrever o conteúdo do e-mail'),
      q13.createChoice('Um campo para adicionar destinatários que receberão uma cópia do e-mail', true),
      q13.createChoice('Um campo para ocultar os destinatários uns dos outros'),
      q13.createChoice('Um campo para classificar a prioridade do e-mail')
    ])
    .setRequired(true);

  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('14. Quantos GB de armazenamento gratuito o OneDrive oferece para contas pessoais Microsoft?')
    .setChoices([
      q14.createChoice('1 GB'),
      q14.createChoice('15 GB'),
      q14.createChoice('5 GB', true),
      q14.createChoice('10 GB')
    ])
    .setRequired(true);

  var q15 = form.addMultipleChoiceItem();
  q15.setTitle('15. Qual é a principal vantagem de salvar arquivos no OneDrive em vez do computador local?')
    .setChoices([
      q15.createChoice('Os arquivos ficam mais rápidos para abrir'),
      q15.createChoice('Os arquivos ficam acessíveis de qualquer dispositivo com internet e protegidos contra perda', true),
      q15.createChoice('Os arquivos ficam maiores e com melhor qualidade'),
      q15.createChoice('O computador fica mais leve e veloz')
    ])
    .setRequired(true);

  // ── Seção 5: Prática ────────────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Aplicação Prática')
    .setHelpText('2 questões discursivas sobre a atividade realizada.');

  form.addParagraphTextItem()
    .setTitle('16. Descreva o que você fez na atividade prática da Aula 13. Quais ferramentas Microsoft você acessou e o que criou em cada uma?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('17. Na sua opinião, qual ferramenta Microsoft aprendida hoje será mais útil no ambiente de trabalho industrial? Por quê?')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
