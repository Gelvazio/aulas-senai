/**
 * MENU_PRINCIPAL.gs
 * Menu Central — Índice de Todas as 10 Aulas
 * Exibe links para todos os formulários de avaliação
 *
 * INSTRUÇÕES DE USO:
 * 1. Acesse https://script.google.com
 * 2. Crie novo projeto e cole este código
 * 3. Execute a função: criarMenuPrincipal()
 * 4. O arquivo será criado no seu Google Drive
 * 5. Compartilhe com os alunos (link único)
 */

function criarMenuPrincipal() {
  var doc = DocumentApp.create('📚 Introdução à TIC — Menu de Avaliações');
  var body = doc.getBody();

  // Cabeçalho
  body.appendParagraph('📚 INTRODUÇÃO À TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO')
    .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  body.appendParagraph('UC1 — 40 Horas | 10 Blocos de Aprendizagem')
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    .setItalic(true);

  body.appendParagraph('');

  // Introdução
  body.appendParagraph('Bem-vindo(a) ao Menu de Avaliações!')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);

  body.appendParagraph('Aqui você encontra todos os 10 formulários de avaliação desta unidade curricular. ' +
    'Cada formulário contém 10 questões objetivas e sua nota é calculada automaticamente ao enviar.');

  body.appendParagraph('');

  // Tabela de Aulas
  var table = body.appendTable([
    ['#', 'Aula', 'Tema', 'Questões', 'Link'],
    ['1', 'Aula 01', 'Comunicação Profissional', '10', '(em breve)'],
    ['2', 'Aula 02', 'Hardware e Sistema Operacional', '10', '(em breve)'],
    ['3', 'Aula 03', 'Arquivos e Organização', '10', '(em breve)'],
    ['4', 'Aula 04', 'Internet e Comunicação Digital', '10', '(em breve)'],
    ['5', 'Aula 05', 'Segurança da Informação', '10', '(em breve)'],
    ['6', 'Aula 06', 'Edição de Textos e Documentos', '10', '(em breve)'],
    ['7', 'Aula 07', 'Planilhas Eletrônicas', '10', '(em breve)'],
    ['8', 'Aula 08', 'Apresentações Profissionais', '10', '(em breve)'],
    ['9', 'Aula 09', 'Integração Prática de Ferramentas', '10', '(em breve)'],
    ['10', 'Aula 10', 'Integração de Competências (Final)', '10', '(em breve)']
  ]);

  // Formatar tabela
  for (var i = 0; i < table.getNumRows(); i++) {
    var row = table.getRow(i);
    for (var j = 0; j < row.getNumCells(); j++) {
      var cell = row.getCell(j);
      if (i === 0) {
        // Header
        cell.setBackgroundColor('#004384');
        var para = cell.getChild(0).asParagraph();
        para.setForegroundColor('#FFFFFF');
        para.setBold(true);
      } else {
        // Alternating rows
        if (i % 2 === 0) {
          cell.setBackgroundColor('#E8F0F7');
        }
      }
    }
  }

  body.appendParagraph('');

  // Instruções
  body.appendParagraph('📋 INSTRUÇÕES PARA RESPONDER:')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);

  body.appendListItem('Clique no link de cada aula para abrir o formulário')
    .setNestingLevel(0);
  body.appendListItem('Preencha seus dados (Nome e RA) no início')
    .setNestingLevel(0);
  body.appendListItem('Responda todas as 10 questões')
    .setNestingLevel(0);
  body.appendListItem('Clique em "Enviar" ao final')
    .setNestingLevel(0);
  body.appendListItem('Sua nota será calculada automaticamente')
    .setNestingLevel(0);

  body.appendParagraph('');

  // Escala de Avaliação
  body.appendParagraph('🎯 ESCALA DE AVALIAÇÃO:')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);

  body.appendListItem('9.0 a 10.0 — 🌟 Excelente')
    .setNestingLevel(0);
  body.appendListItem('7.0 a 8.9 — ✅ Muito Bom')
    .setNestingLevel(0);
  body.appendListItem('5.0 a 6.9 — ⚠️ Bom Início')
    .setNestingLevel(0);
  body.appendListItem('Abaixo de 5.0 — 💡 Procure Ajuda')
    .setNestingLevel(0);

  body.appendParagraph('');
  body.appendParagraph('');

  // Rodapé
  body.appendParagraph('Professor Gelvazio | SENAI — Educação Profissional')
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    .setItalic(true)
    .setForegroundColor('#666666');

  var url = doc.getUrl();
  Logger.log('✅ MENU PRINCIPAL criado com sucesso!');
  Logger.log('');
  Logger.log('📊 INFORMAÇÕES DO DOCUMENTO:');
  Logger.log('   Título: 📚 Introdução à TIC — Menu de Avaliações');
  Logger.log('   Total de Aulas: 10');
  Logger.log('   Total de Questões: 100 (10 por aula)');
  Logger.log('');
  Logger.log('🔗 LINK PARA COMPARTILHAR COM ALUNOS:');
  Logger.log(url);
  Logger.log('');
  Logger.log('💡 PRÓXIMA AÇÃO:');
  Logger.log('   1. Obter links de cada formulário de aula');
  Logger.log('   2. Adicionar links ao menu principal');
  Logger.log('   3. Compartilhar link do menu com alunos');
}

/**
 * Função auxiliar para atualizar links no documento
 * Chame após obter todos os links dos formulários
 */
function atualizarLinksMenu() {
  // Este é um template - você precisará adicionar os links manualmente
  // ou modificar esta função para integrar com as URLs dos formulários

  var links = {
    aula01: '', // https://forms.gle/...
    aula02: '',
    aula03: '',
    aula04: '',
    aula05: '',
    aula06: '',
    aula07: '',
    aula08: '',
    aula09: '',
    aula10: ''
  };

  Logger.log('Atualize os links acima e chame esta função para inserir no menu');
}
