/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 06
 * Tema: Google Sheets — Planilhas Eletrônicas
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula06()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarFormularioAula06() {
  var form = FormApp.create('Avaliação — Aula 06 · Google Sheets · SENAI TI01');

  form.setDescription(
    'Formulário de avaliação sobre Google Sheets — Planilhas Eletrônicas.\n' +
    'Aula 06 — 10/08/2026 · Turma TI01 · Professor Gelvazio\n' +
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

  // ── Seção 2: Conceitos Básicos ──────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Conceitos Básicos')
    .setHelpText('5 questões sobre a estrutura e interface do Google Sheets.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual é o endereço correto de uma célula que está na coluna C, linha 7?')
    .setChoices([
      q1.createChoice('7C'),
      q1.createChoice('C7', true),
      q1.createChoice('C-7'),
      q1.createChoice('Col3Linha7')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. O que representa o intervalo A1:D10 no Google Sheets?')
    .setChoices([
      q2.createChoice('Apenas a célula A1 e a célula D10'),
      q2.createChoice('Todas as células da linha 1 até a linha 10'),
      q2.createChoice('Um bloco retangular de células da coluna A até D e da linha 1 até 10', true),
      q2.createChoice('Todas as colunas da planilha')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Qual elemento da interface do Google Sheets exibe o endereço da célula selecionada?')
    .setChoices([
      q3.createChoice('Barra de menus'),
      q3.createChoice('Barra de fórmulas'),
      q3.createChoice('Caixa de nome', true),
      q3.createChoice('Aba de planilha')
    ])
    .setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. Qual tipo de dado é alinhado à direita automaticamente no Google Sheets?')
    .setChoices([
      q4.createChoice('Texto'),
      q4.createChoice('Número', true),
      q4.createChoice('Data como texto'),
      q4.createChoice('Nome de pessoa')
    ])
    .setRequired(true);

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Onde posso criar múltiplas planilhas dentro do mesmo arquivo do Google Sheets?')
    .setChoices([
      q5.createChoice('Menu Inserir > Nova planilha'),
      q5.createChoice('Nas abas de planilha na parte inferior da tela', true),
      q5.createChoice('No painel lateral direito'),
      q5.createChoice('No menu Arquivo > Nova planilha')
    ])
    .setRequired(true);

  // ── Seção 3: Fórmulas ───────────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Fórmulas e Funções')
    .setHelpText('5 questões sobre fórmulas essenciais do Google Sheets.');

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual fórmula calcula a média dos valores no intervalo B2:B11?')
    .setChoices([
      q6.createChoice('=SOMA(B2:B11)'),
      q6.createChoice('=MEDIA(B2:B11)'),
      q6.createChoice('=MÉDIA(B2:B11)', true),
      q6.createChoice('=AVG(B2:B11)')
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. O que faz a fórmula =SE(C3>=6;"Aprovado";"Reprovado")?')
    .setChoices([
      q7.createChoice('Soma todos os valores maiores que 6'),
      q7.createChoice('Verifica se C3 é maior ou igual a 6 e exibe "Aprovado" ou "Reprovado"', true),
      q7.createChoice('Conta quantas células contêm o valor 6'),
      q7.createChoice('Filtra os dados da coluna C')
    ])
    .setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. O que significa o símbolo $ em uma referência como $A$1?')
    .setChoices([
      q8.createChoice('Indica que o valor é monetário'),
      q8.createChoice('Trava a referência da célula para que não mude ao copiar a fórmula', true),
      q8.createChoice('Multiplica o valor da célula A1 por 1'),
      q8.createChoice('É um atalho para a função SOMA')
    ])
    .setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual fórmula retorna o maior valor do intervalo A1:A20?')
    .setChoices([
      q9.createChoice('=MAIOR(A1:A20)'),
      q9.createChoice('=MAX(A1:A20)'),
      q9.createChoice('=MÁXIMO(A1:A20)', true),
      q9.createChoice('=TOPO(A1:A20)')
    ])
    .setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. A fórmula =CONT.SE(A1:A20;"Aprovado") conta:')
    .setChoices([
      q10.createChoice('A soma de todos os valores "Aprovado"'),
      q10.createChoice('O número de células do intervalo que contêm a palavra "Aprovado"', true),
      q10.createChoice('A média das células aprovadas'),
      q10.createChoice('O número total de células no intervalo')
    ])
    .setRequired(true);

  // ── Seção 4: Recursos Avançados ─────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Recursos do Sheets')
    .setHelpText('3 questões sobre gráficos, filtros e formatação condicional.');

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Para criar um gráfico no Google Sheets, o primeiro passo é:')
    .setChoices([
      q11.createChoice('Ir em Menu Ferramentas > Gráfico'),
      q11.createChoice('Selecionar os dados e ir em Menu Inserir > Gráfico', true),
      q11.createChoice('Clicar com o botão direito e escolher "Novo Gráfico"'),
      q11.createChoice('Usar a fórmula =GRAFICO()')
    ])
    .setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Qual tipo de gráfico é mais adequado para comparar as notas de alunos diferentes?')
    .setChoices([
      q12.createChoice('Gráfico de pizza'),
      q12.createChoice('Gráfico de linha'),
      q12.createChoice('Gráfico de barras ou colunas', true),
      q12.createChoice('Gráfico de área')
    ])
    .setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. A Formatação Condicional serve para:')
    .setChoices([
      q13.createChoice('Aplicar fórmulas automaticamente ao copiar células'),
      q13.createChoice('Mudar a aparência visual de células com base em regras sobre seus valores', true),
      q13.createChoice('Congelar linhas e colunas de cabeçalho'),
      q13.createChoice('Filtrar dados por critério')
    ])
    .setRequired(true);

  // ── Seção 5: Prática ────────────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Aplicação Prática')
    .setHelpText('2 questões discursivas sobre a atividade realizada.');

  form.addParagraphTextItem()
    .setTitle('14. Descreva brevemente como você criou o gráfico de barras na atividade prática da Aula 06. Quais passos seguiu?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('15. Qual foi a maior dificuldade que você encontrou ao trabalhar com fórmulas no Google Sheets? Como resolveu?')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
