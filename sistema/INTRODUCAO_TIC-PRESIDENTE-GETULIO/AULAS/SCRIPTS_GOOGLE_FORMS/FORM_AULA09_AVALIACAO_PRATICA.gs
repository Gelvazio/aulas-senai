/**
 * SCRIPT GOOGLE APPS SCRIPT — FORMULÁRIO AULA 09
 * Tema: Avaliação Prática — Google Workspace
 * Curso: Introdução à Tecnologia da Informação e Comunicação — SENAI
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código e salve
 * 4. Execute a função criarFormularioAula09()
 * 5. Autorize o script quando solicitado
 * 6. O link do formulário será exibido nos Logs (Ctrl+Enter)
 *
 * ATENÇÃO: Este formulário serve como CHECKLIST DE ENTREGA da Avaliação Prática.
 * O aluno confirma que concluiu e compartilhou todos os arquivos.
 */

function criarFormularioAula09() {
  var form = FormApp.create('Checklist de Entrega — Avaliação Prática · Aula 09 · SENAI TI01');

  form.setDescription(
    'Formulário de confirmação de entrega e autoavaliação da Avaliação Prática.\n' +
    'Aula 09 — 13/08/2026 · Turma TI01 · Professor Gelvazio\n\n' +
    'ATENÇÃO: Preencha este formulário SOMENTE após compartilhar a pasta com o professor.\n' +
    'Use sua conta Google SENAI (gelvazio…@edu.sc.senai.br).'
  );
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);

  // ── Seção 1: Identificação ──────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Identificação do Aluno')
    .setHelpText('Preencha seus dados com cuidado — serão usados na correção.');

  form.addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Número de matrícula / RA')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Horário de início da avaliação (ex: 08:00)')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Horário de término / entrega (ex: 09:30)')
    .setRequired(true);

  // ── Seção 2: Checklist Tarefa 1 ─────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Checklist — Tarefa 1: Google Docs')
    .setHelpText('Marque todos os itens que você concluiu na Tarefa 1.');

  var ck1 = form.addCheckboxItem();
  ck1.setTitle('Itens concluídos na Tarefa 1 — Google Docs (marque todos que aplicar)')
    .setChoices([
      ck1.createChoice('Documento criado com o nome correto: Relatorio_Aprendizagem_SeuNome'),
      ck1.createChoice('Cabeçalho com "SENAI — Avaliação Prática" inserido'),
      ck1.createChoice('Rodapé com número de página inserido'),
      ck1.createChoice('Título formatado: negrito, tamanho 16, centralizado'),
      ck1.createChoice('Dados do aluno (nome, turma, data) presentes'),
      ck1.createChoice('3 parágrafos sobre o aprendizado no módulo de TIC escritos'),
      ck1.createChoice('Tabela 3×9 com dados das 8 aulas preenchida'),
      ck1.createChoice('Arquivo salvo na pasta Avaliacao_Pratica_SeuNome no Google Drive')
    ])
    .setRequired(true);

  // ── Seção 3: Checklist Tarefa 2 ─────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Checklist — Tarefa 2: Google Sheets')
    .setHelpText('Marque todos os itens que você concluiu na Tarefa 2.');

  var ck2 = form.addCheckboxItem();
  ck2.setTitle('Itens concluídos na Tarefa 2 — Google Sheets (marque todos que aplicar)')
    .setChoices([
      ck2.createChoice('Planilha criada com o nome correto: Controle_Atividades_SeuNome'),
      ck2.createChoice('Cabeçalho com 5 colunas: Nº | Aula | Data | Conteúdo | Nota Simulada'),
      ck2.createChoice('8 linhas preenchidas com dados das aulas 01 a 08'),
      ck2.createChoice('Fórmula =MÉDIA() calculando a média das notas'),
      ck2.createChoice('Fórmula =SE() exibindo Aprovado ou Reprovado'),
      ck2.createChoice('Gráfico de barras com Aulas × Notas criado'),
      ck2.createChoice('Gráfico com título e eixos identificados'),
      ck2.createChoice('Arquivo salvo na pasta Avaliacao_Pratica_SeuNome no Google Drive')
    ])
    .setRequired(true);

  // ── Seção 4: Checklist Tarefa 3 ─────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Checklist — Tarefa 3: Google Slides')
    .setHelpText('Marque todos os itens que você concluiu na Tarefa 3.');

  var ck3 = form.addCheckboxItem();
  ck3.setTitle('Itens concluídos na Tarefa 3 — Google Slides (marque todos que aplicar)')
    .setChoices([
      ck3.createChoice('Apresentação criada com o nome correto: Apresentacao_TIC_SeuNome'),
      ck3.createChoice('Mínimo de 6 slides criados'),
      ck3.createChoice('Slide de capa com nome, turma e data'),
      ck3.createChoice('4 slides de conteúdo sobre o aprendizado em TIC'),
      ck3.createChoice('Slide de conclusão'),
      ck3.createChoice('Tema visual aplicado (não o padrão em branco)'),
      ck3.createChoice('Pelo menos 1 imagem inserida'),
      ck3.createChoice('Gráfico do Sheets (Tarefa 2) inserido'),
      ck3.createChoice('Transições configuradas em todos os slides'),
      ck3.createChoice('Anotações do apresentador em pelo menos 3 slides'),
      ck3.createChoice('Arquivo salvo na pasta Avaliacao_Pratica_SeuNome no Google Drive')
    ])
    .setRequired(true);

  // ── Seção 5: Confirmação de Entrega ─────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Confirmação de Entrega')
    .setHelpText('Confirme que você compartilhou seus arquivos corretamente.');

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Você compartilhou a pasta "Avaliacao_Pratica_SeuNome" com gelvazio.c@edu.sc.senai.br como Editor?')
    .setChoices([
      q1.createChoice('Sim, compartilhei a pasta inteira como Editor', true),
      q1.createChoice('Compartilhei apenas alguns arquivos individualmente'),
      q1.createChoice('Ainda não compartilhei — vou fazer agora'),
      q1.createChoice('Não consegui — preciso de ajuda')
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Cole aqui o link da pasta no Google Drive (opcional, mas ajuda na correção):')
    .setRequired(false);

  // ── Seção 6: Autoavaliação ──────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Autoavaliação')
    .setHelpText('Reflexão sobre seu desempenho na avaliação.');

  var q2 = form.addScaleItem();
  q2.setTitle('Como você avalia seu desempenho geral na Avaliação Prática?')
    .setBounds(1, 5)
    .setLabels('Muito abaixo do esperado', 'Excelente')
    .setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Qual das três tarefas você achou mais difícil?')
    .setChoices([
      q3.createChoice('Tarefa 1 — Google Docs'),
      q3.createChoice('Tarefa 2 — Google Sheets'),
      q3.createChoice('Tarefa 3 — Google Slides'),
      q3.createChoice('Todas tiveram dificuldade semelhante'),
      q3.createChoice('Nenhuma foi difícil')
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Descreva a principal dificuldade que você encontrou durante a avaliação prática e como tentou resolver:')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Deixe uma mensagem ou dúvida para o professor (opcional):')
    .setRequired(false);

  // ── Publicar ─────────────────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para preencher: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para editar: ' + form.getEditUrl());
}
