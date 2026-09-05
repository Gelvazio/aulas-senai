/**
 * SCRIPT GOOGLE APPS SCRIPT — QUESTIONÁRIO AULA 13
 * Tema: Ferramentas Microsoft — Word, Excel, PowerPoint, Outlook, OneDrive
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarQuestionarioFerramentasMicrosoft()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 */

function criarQuestionarioFerramentasMicrosoft() {
  var form = FormApp.create('Questionário — Ferramentas Microsoft · Aula 13 · SENAI TI01');

  form.setDescription(
    'Questionário sobre as Ferramentas Microsoft: Word, Excel, PowerPoint, Outlook e OneDrive.\n' +
    'Aula 13 — 24/08/2026 · Turma TI01 · Professor Gelvazio\n' +
    'Responda com atenção. Preencha com sua conta Google SENAI.'
  );
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);

  // ── Identificação ──────────────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Identificação')
    .setHelpText('Preencha seus dados antes de iniciar o questionário.');

  form.addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Número de matrícula / RA')
    .setRequired(false);

  // ── Bloco 1: Microsoft 365 ────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Bloco 1 — Microsoft 365')
    .setHelpText('Questões sobre o pacote Microsoft 365 e seu funcionamento.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. O que é o Microsoft 365?')
    .setChoices([
      q1.createChoice('Sistema operacional desenvolvido pela Microsoft'),
      q1.createChoice('Pacote de aplicativos de produtividade criado pela Microsoft, o mais usado no mundo corporativo', true),
      q1.createChoice('Antivírus e proteção online da Microsoft'),
      q1.createChoice('Navegador web da Microsoft para acesso à internet')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Qual é a diferença entre a versão instalada e a versão online do Microsoft 365?')
    .setChoices([
      q2.createChoice('A versão online é paga e a versão instalada é gratuita'),
      q2.createChoice('Não há diferença — ambas funcionam exatamente da mesma forma'),
      q2.createChoice('A versão instalada é paga (exige licença); a versão online é gratuita e funciona pelo navegador', true),
      q2.createChoice('A versão instalada só funciona no Windows e a online só no Mac')
    ])
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Onde é possível criar uma conta Microsoft gratuita para acessar as ferramentas online?')
    .setChoices([
      q3.createChoice('microsoft365.com'),
      q3.createChoice('account.microsoft.com', true),
      q3.createChoice('login.microsoft.com'),
      q3.createChoice('office.microsoft.com/cadastro')
    ])
    .setRequired(true);

  // ── Bloco 2: Microsoft Word ───────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Bloco 2 — Microsoft Word')
    .setHelpText('Questões sobre o editor de textos Word.');

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. Qual é a extensão (formato) padrão dos arquivos criados no Microsoft Word?')
    .setChoices([
      q4.createChoice('.txt'),
      q4.createChoice('.pdf'),
      q4.createChoice('.docx', true),
      q4.createChoice('.xlsx')
    ])
    .setRequired(true);

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual combinação de teclas aplica negrito no Microsoft Word?')
    .setChoices([
      q5.createChoice('Ctrl+N'),
      q5.createChoice('Ctrl+B', true),
      q5.createChoice('Ctrl+G'),
      q5.createChoice('Ctrl+Alt+N')
    ])
    .setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual atalho de teclado é usado para centralizar um parágrafo no Word?')
    .setChoices([
      q6.createChoice('Ctrl+J'),
      q6.createChoice('Ctrl+L'),
      q6.createChoice('Ctrl+E', true),
      q6.createChoice('Ctrl+D')
    ])
    .setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. As margens padrão segundo a norma ABNT para documentos Word são:')
    .setChoices([
      q7.createChoice('2 cm em todos os lados'),
      q7.createChoice('Superior 3 cm, Inferior 2 cm, Esquerda 3 cm, Direita 2 cm', true),
      q7.createChoice('Superior 2 cm, Inferior 3 cm, Esquerda 2 cm, Direita 3 cm'),
      q7.createChoice('3 cm em todos os lados')
    ])
    .setRequired(true);

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. Como exportar um documento Word no formato PDF?')
    .setChoices([
      q8.createChoice('Guia Inserir > Exportar como PDF'),
      q8.createChoice('Arquivo > Salvar Como > PDF', true),
      q8.createChoice('Guia Revisão > Publicar > PDF'),
      q8.createChoice('Ctrl+P e selecionar "Imprimir como PDF" no Word instalado')
    ])
    .setRequired(true);

  // ── Bloco 3: Microsoft Excel ──────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Bloco 3 — Microsoft Excel')
    .setHelpText('Questões sobre planilhas eletrônicas, fórmulas e recursos do Excel.');

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. No Excel, o que é uma célula?')
    .setChoices([
      q9.createChoice('Um arquivo completo do Excel'),
      q9.createChoice('Uma aba (planilha) dentro do arquivo'),
      q9.createChoice('A unidade básica da planilha, identificada por coluna (letra) e linha (número), ex.: A1, B3', true),
      q9.createChoice('Um gráfico inserido na planilha')
    ])
    .setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Toda fórmula no Excel começa com qual símbolo?')
    .setChoices([
      q10.createChoice('+'),
      q10.createChoice('=', true),
      q10.createChoice('#'),
      q10.createChoice('@')
    ])
    .setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual fórmula calcula a média aritmética dos valores no intervalo B1 até B10?')
    .setChoices([
      q11.createChoice('=SOMA(B1:B10)'),
      q11.createChoice('=TOTAL(B1:B10)'),
      q11.createChoice('=MÉDIA(B1:B10)', true),
      q11.createChoice('=CALCULAR(B1:B10)')
    ])
    .setRequired(true);

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. O que faz a fórmula: =SE(D2>=6;"Aprovado";"Reprovado")?')
    .setChoices([
      q12.createChoice('Soma todos os valores maiores ou iguais a 6'),
      q12.createChoice('Conta quantos alunos tiraram nota maior que 6'),
      q12.createChoice('Testa se o valor de D2 é maior ou igual a 6 e retorna "Aprovado" ou "Reprovado" conforme o resultado', true),
      q12.createChoice('Calcula a média das notas e exibe o resultado')
    ])
    .setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. No Excel, o que é referência absoluta (uso do símbolo $)?')
    .setChoices([
      q13.createChoice('Indica que o valor da célula é monetário (em reais)'),
      q13.createChoice('Trava a referência da célula para que não mude ao copiar a fórmula para outra célula', true),
      q13.createChoice('Multiplica automaticamente o valor da célula'),
      q13.createChoice('Bloqueia a edição da célula para outros usuários')
    ])
    .setRequired(true);

  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('14. O que faz a Formatação Condicional no Excel?')
    .setChoices([
      q14.createChoice('Formata o texto automaticamente com maiúsculas ou minúsculas'),
      q14.createChoice('Aplica filtros automáticos nos dados da planilha'),
      q14.createChoice('Pinta células automaticamente de acordo com regras definidas (ex.: notas abaixo de 5 ficam vermelhas)', true),
      q14.createChoice('Classifica os dados em ordem crescente ou decrescente')
    ])
    .setRequired(true);

  // ── Bloco 4: PowerPoint ───────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Bloco 4 — Microsoft PowerPoint')
    .setHelpText('Questões sobre o editor de apresentações PowerPoint.');

  var q15 = form.addMultipleChoiceItem();
  q15.setTitle('15. Qual é a extensão padrão dos arquivos do Microsoft PowerPoint?')
    .setChoices([
      q15.createChoice('.ppt'),
      q15.createChoice('.odp'),
      q15.createChoice('.pptx', true),
      q15.createChoice('.slides')
    ])
    .setRequired(true);

  var q16 = form.addMultipleChoiceItem();
  q16.setTitle('16. Qual tecla inicia a apresentação de slides em tela cheia no PowerPoint (do primeiro slide)?')
    .setChoices([
      q16.createChoice('F1'),
      q16.createChoice('F5', true),
      q16.createChoice('F10'),
      q16.createChoice('Ctrl+P')
    ])
    .setRequired(true);

  var q17 = form.addMultipleChoiceItem();
  q17.setTitle('17. No PowerPoint, qual é a diferença entre Transição e Animação?')
    .setChoices([
      q17.createChoice('Não há diferença — os dois termos significam a mesma coisa'),
      q17.createChoice('Transição é o efeito ao mudar de slide; Animação é o efeito aplicado a elementos dentro do slide', true),
      q17.createChoice('Animação é o efeito ao mudar de slide; Transição é o efeito de elementos dentro do slide'),
      q17.createChoice('Transição organiza a ordem dos slides; Animação define as cores')
    ])
    .setRequired(true);

  // ── Bloco 5: Outlook e OneDrive ───────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Bloco 5 — Outlook e OneDrive')
    .setHelpText('Questões sobre e-mail profissional e armazenamento em nuvem.');

  var q18 = form.addMultipleChoiceItem();
  q18.setTitle('18. O que é o CCO (Cópia Oculta) em um e-mail no Outlook?')
    .setChoices([
      q18.createChoice('Um campo para escrever o assunto do e-mail'),
      q18.createChoice('Um campo em que os destinatários adicionados não se veem e não aparecem para os demais', true),
      q18.createChoice('Um campo para adicionar destinatários que receberão cópia e serão visíveis a todos'),
      q18.createChoice('Um campo para classificar a prioridade do e-mail como urgente')
    ])
    .setRequired(true);

  var q19 = form.addMultipleChoiceItem();
  q19.setTitle('19. Qual é a capacidade de armazenamento gratuito oferecida pelo OneDrive para contas pessoais Microsoft?')
    .setChoices([
      q19.createChoice('1 GB'),
      q19.createChoice('15 GB'),
      q19.createChoice('10 GB'),
      q19.createChoice('5 GB', true)
    ])
    .setRequired(true);

  var q20 = form.addMultipleChoiceItem();
  q20.setTitle('20. Como é feito o compartilhamento de um arquivo no OneDrive?')
    .setChoices([
      q20.createChoice('Somente por e-mail com anexo do arquivo'),
      q20.createChoice('Clicando com o botão direito no arquivo > Compartilhar > enviando o link com permissão definida (visualizar ou editar)', true),
      q20.createChoice('Compactando o arquivo em .zip e enviando pelo chat'),
      q20.createChoice('Não é possível compartilhar arquivos no OneDrive gratuitamente')
    ])
    .setRequired(true);

  // ── Bloco 6: Microsoft vs Google Workspace ────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Bloco 6 — Microsoft vs Google Workspace')
    .setHelpText('Questões sobre o comparativo entre as duas plataformas.');

  var q21 = form.addMultipleChoiceItem();
  q21.setTitle('21. Qual ferramenta do Google equivale ao Microsoft Word?')
    .setChoices([
      q21.createChoice('Google Sheets'),
      q21.createChoice('Google Slides'),
      q21.createChoice('Google Docs', true),
      q21.createChoice('Google Drive')
    ])
    .setRequired(true);

  var q22 = form.addMultipleChoiceItem();
  q22.setTitle('22. Qual ferramenta do Google equivale ao Microsoft Excel?')
    .setChoices([
      q22.createChoice('Google Docs'),
      q22.createChoice('Google Sheets', true),
      q22.createChoice('Google Slides'),
      q22.createChoice('Google Forms')
    ])
    .setRequired(true);

  var q23 = form.addMultipleChoiceItem();
  q23.setTitle('23. Quantos GB de armazenamento gratuito o Google Drive oferece, comparado aos 5 GB do OneDrive?')
    .setChoices([
      q23.createChoice('5 GB — igual ao OneDrive'),
      q23.createChoice('10 GB'),
      q23.createChoice('15 GB', true),
      q23.createChoice('20 GB')
    ])
    .setRequired(true);

  var q24 = form.addMultipleChoiceItem();
  q24.setTitle('24. Segundo o conteúdo da aula, em qual ambiente o Microsoft 365 é dominante?')
    .setChoices([
      q24.createChoice('Educação e startups'),
      q24.createChoice('Uso doméstico e pessoal'),
      q24.createChoice('Indústria e mercado corporativo', true),
      q24.createChoice('Governo e setor público exclusivamente')
    ])
    .setRequired(true);

  // ── Bloco 7: Questões Discursivas ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Bloco 7 — Questões Discursivas')
    .setHelpText('Responda com suas próprias palavras.');

  form.addParagraphTextItem()
    .setTitle('25. Descreva, com suas palavras, para que serve o Microsoft Excel. Cite pelo menos dois exemplos de uso no ambiente industrial.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('26. Você usou alguma das ferramentas Microsoft apresentadas hoje (Word, Excel, PowerPoint, Outlook ou OneDrive) antes desta aula? Se sim, em qual situação? Se não, qual delas você tem mais curiosidade em aprender?')
    .setRequired(false);

  // ── Finalização ───────────────────────────────────────────────────────────
  Logger.log('✅ Questionário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
