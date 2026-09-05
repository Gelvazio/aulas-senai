/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  GERADOR UNIFICADO DE FORMULÁRIOS — WEB APP                        ║
 * ║  SENAI TI01 · Professor Gelvazio                                   ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║  COMO IMPLANTAR (fazer UMA VEZ):                                   ║
 * ║  1. Acesse script.google.com                                        ║
 * ║  2. Crie um novo projeto e cole TODO este código                    ║
 * ║  3. Menu: Implantar → Nova implantação                              ║
 * ║  4. Clique no ícone ⚙️ → Aplicativo da Web                         ║
 * ║  5. Executar como:      Eu (Professor Gelvazio)                     ║
 * ║  6. Quem pode acessar:  Qualquer usuário do Google                  ║
 * ║  7. Clique em Implantar → autorize as permissões                    ║
 * ║  8. COPIE a URL do Web App exibida                                  ║
 * ║  9. No Dashboard → Ferramentas → Gerar Forms → cole a URL           ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * COMO USAR (após implantado):
 *  - Acesse  URL_DO_WEBAPP?form=aula06  para gerar o formulário da Aula 06
 *  - Parâmetros disponíveis:
 *      aula06 → Google Sheets
 *      aula07 → Google Slides
 *      aula08 → Textos Técnicos e Revisão
 *      aula09 → Avaliação Prática (Checklist)
 *      aula13 → Ferramentas Microsoft
 *  - Sem parâmetro → mostra índice com todos os links
 */

// ═══════════════════════════════════════════════════════════════════════
// PONTO DE ENTRADA DO WEB APP
// ═══════════════════════════════════════════════════════════════════════

function doGet(e) {
  var formId = (e && e.parameter && e.parameter.form) ? e.parameter.form.toLowerCase() : '';
  var resultado = { ok: false, titulo: '', url: '', editUrl: '', erro: '' };

  try {
    switch (formId) {
      case 'aula05': resultado = _criarAula05(); break;
      case 'aula06': resultado = _criarAula06(); break;
      case 'aula07': resultado = _criarAula07(); break;
      case 'aula08': resultado = _criarAula08(); break;
      case 'aula09': resultado = _criarAula09(); break;
      case 'aula13': resultado = _criarAula13(); break;
      case '':
        return HtmlService.createHtmlOutput(_htmlIndice()).setTitle('Gerador de Formulários · SENAI');
      default:
        resultado.erro = 'Formulário "' + formId + '" não encontrado.';
    }
  } catch (ex) {
    resultado.erro = ex.toString();
  }

  var html = resultado.ok ? _htmlSucesso(resultado) : _htmlErro(resultado);
  return HtmlService.createHtmlOutput(html).setTitle(
    resultado.ok ? '✅ ' + resultado.titulo + ' · SENAI' : '❌ Erro · SENAI'
  );
}

// ═══════════════════════════════════════════════════════════════════════
// HTML — ÍNDICE (sem parâmetro)
// ═══════════════════════════════════════════════════════════════════════

function _htmlIndice() {
  var forms = [
    { id: 'aula05', label: 'Aula 05 · 07/08 — Google Docs',                  icone: '&#128221;' },
    { id: 'aula06', label: 'Aula 06 · 10/08 — Google Sheets',                icone: '&#128202;' },
    { id: 'aula07', label: 'Aula 07 · 11/08 — Google Slides',                icone: '&#128444;' },
    { id: 'aula08', label: 'Aula 08 · 12/08 — Textos Tecnicos e Revisao',    icone: '&#128221;' },
    { id: 'aula09', label: 'Aula 09 · 13/08 — Avaliacao Pratica (Checklist)', icone: '&#9989;'  },
    { id: 'aula13', label: 'Aula 13 · 24/08 — Ferramentas Microsoft',         icone: '&#128187;' },
  ];

  var linhas = forms.map(function(f) {
    return '<button class="btn-form" onclick="ir(\'' + f.id + '\')">' +
           '<span class="fi">' + f.icone + '</span>' +
           '<span>' + f.label + '</span>' +
           '<span class="arr">&#8594;</span></button>';
  }).join('');

  return _shell('Gerador de Formularios - SENAI TI01',
    '<div class="hero"><h1>&#128203; Gerador de Formularios</h1>' +
    '<p>Selecione a aula para criar o Google Form automaticamente na sua conta Google.</p></div>' +
    '<div class="card"><div class="form-list">' + linhas + '</div></div>' +
    '<script>function ir(id){var b=window.top.location.href.split("?")[0];window.top.location.href=b+"?form="+id;}<\/script>'
  );
}

// ═══════════════════════════════════════════════════════════════════════
// HTML — SUCESSO
// ═══════════════════════════════════════════════════════════════════════

function _htmlSucesso(r) {
  return _shell('✅ Formulário Criado · SENAI',
    '<div class="hero success"><h1>✅ Formulário criado!</h1>' +
    '<p>' + r.titulo + '</p></div>' +
    '<div class="card">' +
    '  <div class="link-row">' +
    '    <div class="link-label">🔗 Link para os alunos preencherem</div>' +
    '    <div class="link-box" id="lnk1">' + r.url + '</div>' +
    '    <div class="btn-row">' +
    '      <a class="btn btn-primary" href="' + r.url + '" target="_blank">Abrir formulário ↗</a>' +
    '      <button class="btn btn-copy" onclick="copiar(\'lnk1\')">📋 Copiar link</button>' +
    '    </div>' +
    '  </div>' +
    '  <div class="link-row" style="margin-top:20px">' +
    '    <div class="link-label">✏️ Link para editar o formulário (só professor)</div>' +
    '    <div class="link-box" id="lnk2">' + r.editUrl + '</div>' +
    '    <div class="btn-row">' +
    '      <a class="btn btn-secondary" href="' + r.editUrl + '" target="_blank">Editar formulário ↗</a>' +
    '      <button class="btn btn-copy" onclick="copiar(\'lnk2\')">📋 Copiar link</button>' +
    '    </div>' +
    '  </div>' +
    '</div>' +
    '<div style="text-align:center;margin-top:20px">' +
    '  <button class="btn btn-secondary" onclick="window.top.location.href=window.top.location.href.split(\'?\')[0]">&#8592; Voltar ao indice</button>' +
    '</div>' +
    '<script>' +
    'function copiar(id){' +
    '  var txt=document.getElementById(id).textContent;' +
    '  navigator.clipboard.writeText(txt).then(function(){' +
    '    var b=event.target;var orig=b.textContent;' +
    '    b.textContent="✅ Copiado!";b.style.background="#2e7d32";' +
    '    setTimeout(function(){b.textContent=orig;b.style.background="";},2000);' +
    '  });' +
    '}' +
    '</script>'
  );
}

// ═══════════════════════════════════════════════════════════════════════
// HTML — ERRO
// ═══════════════════════════════════════════════════════════════════════

function _htmlErro(r) {
  return _shell('❌ Erro · SENAI',
    '<div class="hero error"><h1>❌ Erro ao criar formulário</h1></div>' +
    '<div class="card"><div class="erro-msg">' + r.erro + '</div>' +
    '<button class="btn btn-secondary" onclick="window.top.location.href=window.top.location.href.split(\'?\')[0]">&#8592; Voltar ao indice</button></div>'
  );
}

// ═══════════════════════════════════════════════════════════════════════
// HTML SHELL (layout compartilhado)
// ═══════════════════════════════════════════════════════════════════════

function _shell(title, body) {
  return '<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + title + '</title>' +
    '<style>' +
    '*{margin:0;padding:0;box-sizing:border-box}' +
    'body{font-family:"Google Sans",Roboto,Arial,sans-serif;background:#f0f4ff;color:#202124;min-height:100vh;padding-bottom:40px}' +
    '.topbar{background:#004384;color:#fff;padding:0 24px;height:52px;display:flex;align-items:center;gap:12px}' +
    '.topbar-logo{font-weight:700;font-size:14px;background:rgba(255,255,255,.15);padding:4px 12px;border-radius:4px;color:#fff;text-decoration:none}' +
    '.topbar-title{font-size:13px;opacity:.8}' +
    '.wrap{max-width:680px;margin:0 auto;padding:24px}' +
    '.hero{background:linear-gradient(135deg,#003068,#004384);color:#fff;border-radius:12px 12px 0 0;padding:28px 24px;text-align:center}' +
    '.hero.success{background:linear-gradient(135deg,#1b5e20,#2e7d32)}' +
    '.hero.error{background:linear-gradient(135deg,#7f0000,#c62828)}' +
    '.hero h1{font-size:20px;margin-bottom:6px}' +
    '.hero p{font-size:13px;opacity:.85}' +
    '.card{background:#fff;border-radius:0 0 12px 12px;box-shadow:0 4px 16px rgba(0,0,0,.12);padding:24px}' +
    '.form-list{display:flex;flex-direction:column;gap:10px}' +
    '.btn-form{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #dde3f0;border-radius:10px;padding:14px 18px;text-decoration:none;color:#202124;font-size:14px;font-weight:600;transition:.15s;cursor:pointer;width:100%;text-align:left;font-family:inherit}' +
    '.btn-form:hover{border-color:#004384;background:#f0f4ff;transform:translateX(3px)}' +
    '.btn-form .fi{font-size:22px}' +
    '.btn-form .arr{margin-left:auto;color:#004384;font-size:16px}' +
    '.link-label{font-size:11px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}' +
    '.link-box{background:#f8f9fa;border:1px solid #e0e0e0;border-radius:6px;padding:10px 14px;font-size:12px;font-family:monospace;color:#333;word-break:break-all;margin-bottom:10px}' +
    '.btn-row{display:flex;gap:8px;flex-wrap:wrap}' +
    '.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:6px;font-size:13px;font-weight:600;border:none;cursor:pointer;text-decoration:none;transition:.15s;font-family:inherit}' +
    '.btn-primary{background:#004384;color:#fff}.btn-primary:hover{background:#003068}' +
    '.btn-secondary{background:#f1f3f4;color:#444}.btn-secondary:hover{background:#e0e0e0}' +
    '.btn-copy{background:#e8f0fe;color:#1a73e8}.btn-copy:hover{background:#d2e3fc}' +
    '.erro-msg{background:#fce4ec;border-left:4px solid #c62828;border-radius:4px;padding:12px 16px;font-size:13px;color:#c62828;margin-bottom:16px}' +
    '</style></head><body>' +
    '<div class="topbar"><a class="topbar-logo" href="#">SENAI</a><span class="topbar-title">Professor Gelvazio · TI01</span></div>' +
    '<div class="wrap">' + body + '</div>' +
    '</body></html>';
}

// ═══════════════════════════════════════════════════════════════════════
// AULA 05 — Google Docs
// ═══════════════════════════════════════════════════════════════════════

function _criarAula05() {
  var form = FormApp.create('Avaliação — Aula 05 · Google Docs · SENAI TI01');
  form.setDescription('Formulário de avaliação sobre Google Docs — Editor de Textos.\nAula 05 — 07/08/2026 · Turma TI01 · Professor Gelvazio\nPreencha com sua conta Google SENAI.');
  form.setCollectEmail(true); form.setLimitOneResponsePerUser(true); form.setProgressBar(true);

  form.addSectionHeaderItem().setTitle('Identificação do Aluno').setHelpText('Preencha seus dados antes de responder.');
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Número de matrícula / RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('Parte 1 — Tipos de Editores e Interface do Google Docs').setHelpText('4 questões sobre editores de texto e a interface do Google Docs.');
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual é a principal diferença entre um editor simples (ex: Bloco de Notas) e um editor rico (ex: Google Docs)?').setChoices([q1.createChoice('O editor simples funciona online; o rico funciona offline'),q1.createChoice('O editor rico permite formatação avançada como fontes, cores, tabelas e imagens',true),q1.createChoice('O editor simples é pago; o rico é gratuito'),q1.createChoice('O editor rico salva em .txt; o simples salva em .docx')]).setRequired(true);
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Como acessar o Google Docs pelo Google Drive?').setChoices([q2.createChoice('Drive > Abrir > Documentos'),q2.createChoice('Drive > Novo > Documentos Google',true),q2.createChoice('Drive > Ferramentas > Google Docs'),q2.createChoice('Drive > Compartilhar > Documentos Google')]).setRequired(true);
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Uma grande vantagem do Google Docs em relação ao Microsoft Word instalado é:').setChoices([q3.createChoice('Ter mais recursos de formatação avançada'),q3.createChoice('Salvar automaticamente no Drive e permitir colaboração em tempo real',true),q3.createChoice('Funcionar sem acesso à internet em todos os recursos'),q3.createChoice('Ser compatível exclusivamente com arquivos .odt')]).setRequired(true);
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. O Google Docs faz parte de qual conjunto de ferramentas?').setChoices([q4.createChoice('Microsoft 365'),q4.createChoice('LibreOffice Suite'),q4.createChoice('Google Workspace',true),q4.createChoice('Apple iWork')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 2 — Formatação, Página e Parágrafos').setHelpText('5 questões sobre formatação de texto e configuração de página.');
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual atalho de teclado aplica negrito no texto selecionado?').setChoices([q5.createChoice('Ctrl+I'),q5.createChoice('Ctrl+U'),q5.createChoice('Ctrl+B',true),q5.createChoice('Ctrl+N')]).setRequired(true);
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Segundo as normas ABNT, qual deve ser a margem esquerda de um documento?').setChoices([q6.createChoice('2 cm'),q6.createChoice('2,5 cm'),q6.createChoice('3 cm',true),q6.createChoice('4 cm')]).setRequired(true);
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Onde se configura o tamanho do papel e as margens no Google Docs?').setChoices([q7.createChoice('Menu Editar > Configurações de página'),q7.createChoice('Menu Arquivo > Configurar página',true),q7.createChoice('Menu Formatar > Configurar página'),q7.createChoice('Menu Ver > Configurações de impressão')]).setRequired(true);
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. O espaçamento entre linhas recomendado pela ABNT para o corpo do texto é:').setChoices([q8.createChoice('Simples (1,0)'),q8.createChoice('1,5',true),q8.createChoice('Duplo (2,0)'),q8.createChoice('2,5')]).setRequired(true);
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual atalho aplica alinhamento justificado ao parágrafo?').setChoices([q9.createChoice('Ctrl+L'),q9.createChoice('Ctrl+E'),q9.createChoice('Ctrl+R'),q9.createChoice('Ctrl+J',true)]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 3 — Recursos, Tabelas e Colaboração').setHelpText('4 questões sobre tabelas, imagens, colaboração e exportação.');
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Como inserir uma tabela no Google Docs?').setChoices([q10.createChoice('Menu Formatar > Tabela'),q10.createChoice('Menu Inserir > Tabela',true),q10.createChoice('Menu Arquivo > Novo > Tabela'),q10.createChoice('Menu Editar > Inserir tabela')]).setRequired(true);
  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual atalho abre a ferramenta de ortografia e gramática no Google Docs?').setChoices([q11.createChoice('F5'),q11.createChoice('F7',true),q11.createChoice('F9'),q11.createChoice('Ctrl+F')]).setRequired(true);
  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Para ver o histórico de versões anteriores de um documento, acesse:').setChoices([q12.createChoice('Menu Editar > Histórico de alterações'),q12.createChoice('Menu Ver > Versões anteriores'),q12.createChoice('Menu Arquivo > Histórico de versões > Ver histórico',true),q12.createChoice('Menu Ferramentas > Controle de versões')]).setRequired(true);
  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. Para exportar o documento como arquivo Microsoft Word, vá em:').setChoices([q13.createChoice('Menu Arquivo > Exportar > Word'),q13.createChoice('Menu Arquivo > Fazer download > Microsoft Word (.docx)',true),q13.createChoice('Menu Editar > Salvar como > .docx'),q13.createChoice('Menu Compartilhar > Download > Word')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 4 — Reflexão e Prática').setHelpText('2 questões sobre sua experiência com a atividade prática da Aula 05.');
  form.addParagraphTextItem().setTitle('14. Descreva como você criou o documento profissional na atividade prática da Aula 05. Quais recursos do Google Docs você utilizou (formatação, tabela, lista, margens…)?').setRequired(true);
  form.addParagraphTextItem().setTitle('15. Qual foi a maior dificuldade que você encontrou ao trabalhar com o Google Docs? Como resolveu ou pretende resolver?').setRequired(false);

  return { ok: true, titulo: 'Aula 05 · Google Docs', url: form.getPublishedUrl(), editUrl: form.getEditUrl() };
}

// ═══════════════════════════════════════════════════════════════════════
// AULA 06 — Google Sheets
// ═══════════════════════════════════════════════════════════════════════

function _criarAula06() {
  var form = FormApp.create('Avaliação — Aula 06 · Google Sheets · SENAI TI01');
  form.setDescription('Formulário de avaliação sobre Google Sheets — Planilhas Eletrônicas.\nAula 06 — 10/08/2026 · Turma TI01 · Professor Gelvazio\nPreencha com sua conta Google SENAI.');
  form.setCollectEmail(true); form.setLimitOneResponsePerUser(true); form.setProgressBar(true);

  form.addSectionHeaderItem().setTitle('Identificação do Aluno').setHelpText('Preencha seus dados antes de responder.');
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Número de matrícula / RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('Parte 1 — Conceitos Básicos').setHelpText('5 questões sobre a estrutura e interface do Google Sheets.');
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual é o endereço correto de uma célula na coluna C, linha 7?').setChoices([q1.createChoice('7C'),q1.createChoice('C7',true),q1.createChoice('C-7'),q1.createChoice('Col3Linha7')]).setRequired(true);
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. O que representa o intervalo A1:D10 no Google Sheets?').setChoices([q2.createChoice('Apenas a célula A1 e a célula D10'),q2.createChoice('Todas as células da linha 1 até a linha 10'),q2.createChoice('Um bloco retangular de células da coluna A até D e da linha 1 até 10',true),q2.createChoice('Todas as colunas da planilha')]).setRequired(true);
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Qual elemento exibe o endereço da célula selecionada?').setChoices([q3.createChoice('Barra de menus'),q3.createChoice('Barra de fórmulas'),q3.createChoice('Caixa de nome',true),q3.createChoice('Aba de planilha')]).setRequired(true);
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. Qual tipo de dado é alinhado à direita automaticamente?').setChoices([q4.createChoice('Texto'),q4.createChoice('Número',true),q4.createChoice('Data como texto'),q4.createChoice('Nome de pessoa')]).setRequired(true);
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Onde se criam múltiplas planilhas dentro do mesmo arquivo?').setChoices([q5.createChoice('Menu Inserir > Nova planilha'),q5.createChoice('Nas abas na parte inferior da tela',true),q5.createChoice('No painel lateral direito'),q5.createChoice('No menu Arquivo > Nova planilha')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 2 — Fórmulas e Funções').setHelpText('5 questões sobre fórmulas essenciais.');
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual fórmula calcula a média do intervalo B2:B11?').setChoices([q6.createChoice('=SOMA(B2:B11)'),q6.createChoice('=MEDIA(B2:B11)'),q6.createChoice('=MÉDIA(B2:B11)',true),q6.createChoice('=AVG(B2:B11)')]).setRequired(true);
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. O que faz =SE(C3>=6;"Aprovado";"Reprovado")?').setChoices([q7.createChoice('Soma todos os valores maiores que 6'),q7.createChoice('Verifica se C3 é maior ou igual a 6 e exibe "Aprovado" ou "Reprovado"',true),q7.createChoice('Conta quantas células contêm o valor 6'),q7.createChoice('Filtra os dados da coluna C')]).setRequired(true);
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. O que significa $ em uma referência como $A$1?').setChoices([q8.createChoice('Indica que o valor é monetário'),q8.createChoice('Trava a referência da célula para que não mude ao copiar a fórmula',true),q8.createChoice('Multiplica o valor da célula A1 por 1'),q8.createChoice('É um atalho para a função SOMA')]).setRequired(true);
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual fórmula retorna o maior valor do intervalo A1:A20?').setChoices([q9.createChoice('=MAIOR(A1:A20)'),q9.createChoice('=MAX(A1:A20)'),q9.createChoice('=MÁXIMO(A1:A20)',true),q9.createChoice('=TOPO(A1:A20)')]).setRequired(true);
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. =CONT.SE(A1:A20;"Aprovado") conta:').setChoices([q10.createChoice('A soma de todos os valores "Aprovado"'),q10.createChoice('O número de células que contêm "Aprovado"',true),q10.createChoice('A média das células aprovadas'),q10.createChoice('O número total de células no intervalo')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 3 — Recursos do Sheets').setHelpText('3 questões sobre gráficos, filtros e formatação condicional.');
  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Para criar um gráfico, o primeiro passo é:').setChoices([q11.createChoice('Menu Ferramentas > Gráfico'),q11.createChoice('Selecionar os dados e ir em Menu Inserir > Gráfico',true),q11.createChoice('Botão direito > "Novo Gráfico"'),q11.createChoice('Usar a fórmula =GRAFICO()')]).setRequired(true);
  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Qual gráfico é mais adequado para comparar notas de alunos?').setChoices([q12.createChoice('Gráfico de pizza'),q12.createChoice('Gráfico de linha'),q12.createChoice('Gráfico de barras ou colunas',true),q12.createChoice('Gráfico de área')]).setRequired(true);
  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. A Formatação Condicional serve para:').setChoices([q13.createChoice('Aplicar fórmulas automaticamente'),q13.createChoice('Mudar a aparência de células com base em regras sobre seus valores',true),q13.createChoice('Congelar linhas e colunas'),q13.createChoice('Filtrar dados por critério')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 4 — Aplicação Prática').setHelpText('2 questões discursivas.');
  form.addParagraphTextItem().setTitle('14. Descreva como você criou o gráfico de barras na atividade prática da Aula 06. Quais passos seguiu?').setRequired(true);
  form.addParagraphTextItem().setTitle('15. Qual foi a maior dificuldade com fórmulas no Google Sheets? Como resolveu?').setRequired(false);

  return { ok: true, titulo: 'Aula 06 · Google Sheets', url: form.getPublishedUrl(), editUrl: form.getEditUrl() };
}

// ═══════════════════════════════════════════════════════════════════════
// AULA 07 — Google Slides
// ═══════════════════════════════════════════════════════════════════════

function _criarAula07() {
  var form = FormApp.create('Avaliação — Aula 07 · Google Slides · SENAI TI01');
  form.setDescription('Formulário sobre Google Slides — Editor de Apresentações.\nAula 07 — 11/08/2026 · Turma TI01 · Professor Gelvazio\nPreencha com sua conta Google SENAI.');
  form.setCollectEmail(true); form.setLimitOneResponsePerUser(true); form.setProgressBar(true);

  form.addSectionHeaderItem().setTitle('Identificação do Aluno').setHelpText('Preencha seus dados antes de responder.');
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Número de matrícula / RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('Parte 1 — Interface e Organização de Slides').setHelpText('4 questões sobre a interface do Google Slides.');
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Onde ficam as miniaturas de todos os slides?').setChoices([q1.createChoice('Na barra de ferramentas superior'),q1.createChoice('No painel esquerdo da interface',true),q1.createChoice('No painel de anotações inferior'),q1.createChoice('No menu Slide')]).setRequired(true);
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Qual atalho cria um novo slide?').setChoices([q2.createChoice('Ctrl+N'),q2.createChoice('Ctrl+S'),q2.createChoice('Ctrl+M',true),q2.createChoice('Ctrl+D')]).setRequired(true);
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Como reordenar os slides?').setChoices([q3.createChoice('Menu Slide > Mover para cima / baixo'),q3.createChoice('Arrastando os slides no painel lateral esquerdo',true),q3.createChoice('Menu Editar > Reorganizar slides'),q3.createChoice('Clicando duas vezes e digitando a nova posição')]).setRequired(true);
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. O Painel de Anotações serve para:').setChoices([q4.createChoice('Exibir comentários do público durante a apresentação'),q4.createChoice('Guardar anotações do apresentador que não aparecem para o público',true),q4.createChoice('Inserir texto que aparece em todos os slides'),q4.createChoice('Listar os objetos inseridos no slide atual')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 2 — Design, Conteúdo e Multimídia').setHelpText('5 questões sobre temas, imagens, vídeos e formatação.');
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. O que é um Tema no Google Slides?').setChoices([q5.createChoice('Um conjunto de slides pré-prontos para editar'),q5.createChoice('Um conjunto de cores, fontes e layouts que dão identidade visual',true),q5.createChoice('Uma coleção de animações disponíveis'),q5.createChoice('Um modelo com conteúdo já preenchido')]).setRequired(true);
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Onde inserir um vídeo do YouTube em um slide?').setChoices([q6.createChoice('Menu Slide > Inserir vídeo'),q6.createChoice('Menu Arquivo > Vídeos'),q6.createChoice('Menu Inserir > Vídeo',true),q6.createChoice('Menu Formatar > Multimídia')]).setRequired(true);
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Qual atalho insere um link em um texto ou objeto selecionado?').setChoices([q7.createChoice('Ctrl+L'),q7.createChoice('Ctrl+K',true),q7.createChoice('Ctrl+H'),q7.createChoice('Ctrl+U')]).setRequired(true);
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. Como inserir um gráfico vinculado ao Google Sheets?').setChoices([q8.createChoice('Copiar e colar diretamente do Sheets (Ctrl+C / Ctrl+V)'),q8.createChoice('Menu Inserir > Gráfico > Do Google Sheets',true),q8.createChoice('Menu Slide > Dados externos > Google Sheets'),q8.createChoice('Menu Ferramentas > Integração > Sheets')]).setRequired(true);
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Para agrupar múltiplos objetos:').setChoices([q9.createChoice('Menu Slide > Agrupar'),q9.createChoice('Selecionar com Ctrl > Menu Organizar > Agrupar',true),q9.createChoice('Botão direito > Agrupar todos'),q9.createChoice('Arrastar retângulo > Ctrl+G')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 3 — Transições, Animações e Apresentação').setHelpText('4 questões sobre recursos de apresentação.');
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Como aplicar a mesma transição a TODOS os slides de uma vez?').setChoices([q10.createChoice('Menu Slide > Transição > selecione > Aplicar a todos os slides',true),q10.createChoice('Selecionar todos os slides com Ctrl+A e escolher a transição'),q10.createChoice('Menu Editar > Aplicar transição em lote'),q10.createChoice('Não é possível — cada slide precisa ser configurado individualmente')]).setRequired(true);
  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual é a diferença entre transição e animação?').setChoices([q11.createChoice('São a mesma coisa com nomes diferentes'),q11.createChoice('Transição ocorre ao passar entre slides; animação é aplicada a objetos dentro do slide',true),q11.createChoice('Transição é para vídeos; animação é para imagens'),q11.createChoice('Animação ocorre ao passar entre slides; transição é aplicada a objetos')]).setRequired(true);
  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Qual atalho inicia a apresentação a partir do primeiro slide?').setChoices([q12.createChoice('Ctrl+P'),q12.createChoice('Ctrl+F5',true),q12.createChoice('Ctrl+Enter'),q12.createChoice('F11')]).setRequired(true);
  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. Durante uma apresentação, a tecla B serve para:').setChoices([q13.createChoice('Voltar ao slide anterior'),q13.createChoice('Exibir a tela em branco (pausa visual)',true),q13.createChoice('Iniciar a animação do slide atual'),q13.createChoice('Ativar o ponteiro laser')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 4 — Reflexão e Prática').setHelpText('2 questões sobre sua experiência com o Google Slides.');
  form.addParagraphTextItem().setTitle('14. Descreva a apresentação que você criou na atividade prática. Quais recursos do Google Slides utilizou?').setRequired(true);
  form.addParagraphTextItem().setTitle('15. Quais são as principais vantagens do Google Slides em vez do Microsoft PowerPoint?').setRequired(false);

  return { ok: true, titulo: 'Aula 07 · Google Slides', url: form.getPublishedUrl(), editUrl: form.getEditUrl() };
}

// ═══════════════════════════════════════════════════════════════════════
// AULA 08 — Textos Técnicos e Revisão Geral
// ═══════════════════════════════════════════════════════════════════════

function _criarAula08() {
  var form = FormApp.create('Avaliação — Aula 08 · Textos Técnicos e Revisão · SENAI TI01');
  form.setDescription('Formulário sobre Textos Técnicos e Revisão Geral do módulo de TIC.\nAula 08 — 12/08/2026 · Turma TI01 · Professor Gelvazio\nEsta é a última aula antes das avaliações. Preencha com atenção!');
  form.setCollectEmail(true); form.setLimitOneResponsePerUser(true); form.setProgressBar(true);

  form.addSectionHeaderItem().setTitle('Identificação do Aluno').setHelpText('Preencha seus dados antes de responder.');
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Número de matrícula / RA').setRequired(false);

  // Parte 1 — Textos Técnicos (7 questões)
  form.addSectionHeaderItem().setTitle('Parte 1 — Textos Técnicos').setHelpText('7 questões sobre conceitos, tipos, estrutura e normas de textos técnicos.');
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual das seguintes características NÃO pertence a um texto técnico?').setChoices([q1.createChoice('Clareza e objetividade'),q1.createChoice('Uso de metáforas e figuras de linguagem',true),q1.createChoice('Impessoalidade'),q1.createChoice('Precisão e formalidade')]).setRequired(true);
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Qual dos seguintes elementos é OBRIGATÓRIO em uma Ata de Reunião?').setChoices([q2.createChoice('Logotipo colorido da empresa'),q2.createChoice('Data, hora, local e lista de participantes presentes',true),q2.createChoice('Assinatura digital de todos os participantes'),q2.createChoice('Resumo fotográfico das apresentações')]).setRequired(true);
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Qual é a principal diferença entre Memorando e Ofício?').setChoices([q3.createChoice('O memorando é enviado por e-mail; o ofício é sempre impresso'),q3.createChoice('O memorando é para comunicação interna entre departamentos; o ofício é para comunicação externa com outras organizações',true),q3.createChoice('O memorando tem valor legal; o ofício é apenas informativo'),q3.createChoice('O ofício é exclusivo de órgãos públicos; o memorando é exclusivo de empresas privadas')]).setRequired(true);
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. Qual é a estrutura correta de um Relatório Técnico?').setChoices([q4.createChoice('Introdução → Resultados → Desenvolvimento → Conclusão'),q4.createChoice('Capa → Introdução → Desenvolvimento → Resultados → Conclusão → Referências',true),q4.createChoice('Resumo → Problema → Solução → Apêndice'),q4.createChoice('Objetivo → Metodologia → Glossário → Índice')]).setRequired(true);
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual tipo de resumo apenas lista os tópicos abordados no texto, sem detalhar o conteúdo?').setChoices([q5.createChoice('Resumo crítico'),q5.createChoice('Resumo informativo'),q5.createChoice('Resumo indicativo',true),q5.createChoice('Resumo executivo')]).setRequired(true);
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual texto técnico é elaborado por um especialista para apresentar análise, parecer ou conclusões sobre um fato ou situação?').setChoices([q6.createChoice('Memorando'),q6.createChoice('Ata'),q6.createChoice('Manual de instrução'),q6.createChoice('Laudo técnico',true)]).setRequired(true);
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. A norma ABNT NBR 14724 estabelece:').setChoices([q7.createChoice('Como fazer referências bibliográficas (citar fontes)'),q7.createChoice('Formatação de trabalhos acadêmicos: fonte, margem, espaçamento e capa',true),q7.createChoice('Normas de segurança para equipamentos elétricos'),q7.createChoice('Procedimentos para auditorias e certificações ISO')]).setRequired(true);

  // Parte 2 — Linguagem Técnica e Comunicação (3 questões)
  form.addSectionHeaderItem().setTitle('Parte 2 — Linguagem Técnica e Comunicação').setHelpText('3 questões sobre linguagem profissional, jargão e elementos da comunicação.');
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. No contexto da linguagem técnica, o que é jargão?').setChoices([q8.createChoice('Uma gíria informal usada em conversas cotidianas'),q8.createChoice('Vocabulário especializado utilizado por profissionais de uma área específica',true),q8.createChoice('Linguagem coloquial simplificada para o público geral'),q8.createChoice('Um erro gramatical comum em textos formais')]).setRequired(true);
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual das seguintes é uma BOA PRÁTICA na redação de textos técnicos e profissionais?').setChoices([q9.createChoice('Usar parágrafos longos para demonstrar profundidade de conhecimento'),q9.createChoice('Empregar linguagem figurada para deixar o texto mais interessante'),q9.createChoice('Usar palavras de transição (portanto, contudo, além disso) para conectar ideias com clareza',true),q9.createChoice('Misturar diferentes fontes e tamanhos de letra para destacar informações')]).setRequired(true);
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Qual é o elemento da comunicação responsável por captar a mensagem enviada?').setChoices([q10.createChoice('Emissor'),q10.createChoice('Canal'),q10.createChoice('Receptor',true),q10.createChoice('Ruído')]).setRequired(true);

  // Parte 3 — Revisão TIC (4 questões)
  form.addSectionHeaderItem().setTitle('Parte 3 — Revisão do Módulo de TIC').setHelpText('4 questões cobrindo os principais conteúdos das Aulas 01 a 07.');
  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Os três pilares da Segurança da Informação são:').setChoices([q11.createChoice('Credibilidade, Integridade e Disponibilidade'),q11.createChoice('Confidencialidade, Integridade e Disponibilidade (CID)',true),q11.createChoice('Confiança, Identidade e Digitalização'),q11.createChoice('Criptografia, Instalação e Detecção')]).setRequired(true);
  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Phishing é um ataque que:').setChoices([q12.createChoice('Danifica fisicamente o hardware'),q12.createChoice('Infecta arquivos de sistema e os apaga'),q12.createChoice('Engana o usuário para que forneça dados pessoais ou clique em links maliciosos',true),q12.createChoice('Bloqueia o processador e exige reinicialização')]).setRequired(true);
  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. O componente do computador responsável por processar os cálculos e instruções é:').setChoices([q13.createChoice('HD (Disco Rígido)'),q13.createChoice('RAM (Memória de Acesso Aleatório)'),q13.createChoice('CPU (Processador)',true),q13.createChoice('GPU (Placa de Vídeo)')]).setRequired(true);
  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('14. No Google Docs, qual atalho ativa a revisão ortográfica e gramatical?').setChoices([q14.createChoice('Ctrl+R'),q14.createChoice('F7',true),q14.createChoice('Ctrl+O'),q14.createChoice('F5')]).setRequired(true);

  // Parte 4 — Redação Técnica e Autoavaliação
  form.addSectionHeaderItem().setTitle('Parte 4 — Redação Técnica e Autoavaliação').setHelpText('2 questões discursivas + autoavaliação.');
  form.addParagraphTextItem().setTitle('15. Reescreva de forma técnica e profissional, adequada para um relatório:\n\n"O programa travou todo e eu não consegui salvar nada que tinha feito."').setRequired(true);
  form.addParagraphTextItem().setTitle('16. Cite 3 termos técnicos de TIC aprendidos neste módulo e defina cada um com suas próprias palavras.').setRequired(true);
  var q17 = form.addScaleItem();
  q17.setTitle('17. Em uma escala de 1 a 5, como você avalia seu domínio dos conteúdos do módulo de TIC até agora?').setBounds(1,5).setLabels('Muito inseguro(a)','Muito seguro(a)').setRequired(true);
  form.addParagraphTextItem().setTitle('18. Qual conteúdo do módulo você mais precisa revisar antes das avaliações? Por quê?').setRequired(false);

  return { ok: true, titulo: 'Aula 08 · Textos Técnicos e Revisão', url: form.getPublishedUrl(), editUrl: form.getEditUrl() };
}

// ═══════════════════════════════════════════════════════════════════════
// AULA 09 — Avaliação Prática (Checklist)
// ═══════════════════════════════════════════════════════════════════════

function _criarAula09() {
  var form = FormApp.create('Checklist de Entrega — Avaliação Prática · Aula 09 · SENAI TI01');
  form.setDescription('Formulário de confirmação de entrega e autoavaliação da Avaliação Prática.\nAula 09 — 13/08/2026 · Turma TI01 · Professor Gelvazio\n\nATENÇÃO: Preencha SOMENTE após compartilhar a pasta com o professor.\nUse sua conta Google SENAI.');
  form.setCollectEmail(true); form.setLimitOneResponsePerUser(true); form.setProgressBar(true);

  form.addSectionHeaderItem().setTitle('Identificação do Aluno').setHelpText('Preencha seus dados com cuidado — serão usados na correção.');
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Número de matrícula / RA').setRequired(false);
  form.addTextItem().setTitle('Horário de início da avaliação (ex: 08:00)').setRequired(true);
  form.addTextItem().setTitle('Horário de término / entrega (ex: 09:30)').setRequired(true);

  form.addSectionHeaderItem().setTitle('Checklist — Tarefa 1: Google Docs').setHelpText('Marque todos os itens que você concluiu na Tarefa 1.');
  var ck1 = form.addCheckboxItem();
  ck1.setTitle('Itens concluídos na Tarefa 1 — Google Docs (marque todos que aplicar)').setChoices([ck1.createChoice('Documento criado com o nome correto: Relatorio_Aprendizagem_SeuNome'),ck1.createChoice('Cabeçalho com "SENAI — Avaliação Prática" inserido'),ck1.createChoice('Rodapé com número de página inserido'),ck1.createChoice('Título formatado: negrito, tamanho 16, centralizado'),ck1.createChoice('Dados do aluno (nome, turma, data) presentes'),ck1.createChoice('3 parágrafos sobre o aprendizado no módulo de TIC escritos'),ck1.createChoice('Tabela 3×9 com dados das 8 aulas preenchida'),ck1.createChoice('Arquivo salvo na pasta Avaliacao_Pratica_SeuNome no Google Drive')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Checklist — Tarefa 2: Google Sheets').setHelpText('Marque todos os itens que você concluiu na Tarefa 2.');
  var ck2 = form.addCheckboxItem();
  ck2.setTitle('Itens concluídos na Tarefa 2 — Google Sheets (marque todos que aplicar)').setChoices([ck2.createChoice('Planilha criada com o nome correto: Controle_Atividades_SeuNome'),ck2.createChoice('Cabeçalho com 5 colunas: Nº | Aula | Data | Conteúdo | Nota Simulada'),ck2.createChoice('8 linhas preenchidas com dados das aulas 01 a 08'),ck2.createChoice('Fórmula =MÉDIA() calculando a média das notas'),ck2.createChoice('Fórmula =SE() exibindo Aprovado ou Reprovado'),ck2.createChoice('Gráfico de barras com Aulas × Notas criado'),ck2.createChoice('Gráfico com título e eixos identificados'),ck2.createChoice('Arquivo salvo na pasta Avaliacao_Pratica_SeuNome no Google Drive')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Checklist — Tarefa 3: Google Slides').setHelpText('Marque todos os itens que você concluiu na Tarefa 3.');
  var ck3 = form.addCheckboxItem();
  ck3.setTitle('Itens concluídos na Tarefa 3 — Google Slides (marque todos que aplicar)').setChoices([ck3.createChoice('Apresentação criada com o nome correto: Apresentacao_TIC_SeuNome'),ck3.createChoice('Mínimo de 6 slides criados'),ck3.createChoice('Slide de capa com nome, turma e data'),ck3.createChoice('4 slides de conteúdo sobre o aprendizado em TIC'),ck3.createChoice('Slide de conclusão'),ck3.createChoice('Tema visual aplicado (não o padrão em branco)'),ck3.createChoice('Pelo menos 1 imagem inserida'),ck3.createChoice('Gráfico do Sheets (Tarefa 2) inserido'),ck3.createChoice('Transições configuradas em todos os slides'),ck3.createChoice('Anotações do apresentador em pelo menos 3 slides'),ck3.createChoice('Arquivo salvo na pasta Avaliacao_Pratica_SeuNome no Google Drive')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Confirmação de Entrega').setHelpText('Confirme que você compartilhou seus arquivos corretamente.');
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Você compartilhou a pasta "Avaliacao_Pratica_SeuNome" com gelvazio.c@edu.sc.senai.br como Editor?').setChoices([q1.createChoice('Sim, compartilhei a pasta inteira como Editor',true),q1.createChoice('Compartilhei apenas alguns arquivos individualmente'),q1.createChoice('Ainda não compartilhei — vou fazer agora'),q1.createChoice('Não consegui — preciso de ajuda')]).setRequired(true);
  form.addTextItem().setTitle('Cole aqui o link da pasta no Google Drive (opcional, mas ajuda na correção):').setRequired(false);

  form.addSectionHeaderItem().setTitle('Autoavaliação').setHelpText('Reflexão sobre seu desempenho na avaliação.');
  var q2 = form.addScaleItem();
  q2.setTitle('Como você avalia seu desempenho geral na Avaliação Prática?').setBounds(1,5).setLabels('Muito abaixo do esperado','Excelente').setRequired(true);
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Qual das três tarefas você achou mais difícil?').setChoices([q3.createChoice('Tarefa 1 — Google Docs'),q3.createChoice('Tarefa 2 — Google Sheets'),q3.createChoice('Tarefa 3 — Google Slides'),q3.createChoice('Todas tiveram dificuldade semelhante'),q3.createChoice('Nenhuma foi difícil')]).setRequired(true);
  form.addParagraphTextItem().setTitle('Descreva a principal dificuldade durante a avaliação e como tentou resolver:').setRequired(false);
  form.addParagraphTextItem().setTitle('Deixe uma mensagem ou dúvida para o professor (opcional):').setRequired(false);

  return { ok: true, titulo: 'Aula 09 · Avaliação Prática', url: form.getPublishedUrl(), editUrl: form.getEditUrl() };
}

// ═══════════════════════════════════════════════════════════════════════
// AULA 13 — Ferramentas Microsoft
// ═══════════════════════════════════════════════════════════════════════

function _criarAula13() {
  var form = FormApp.create('Avaliação — Aula 13 · Ferramentas Microsoft · SENAI TI01');
  form.setDescription('Formulário sobre Ferramentas Microsoft — Word, Excel, PowerPoint, Outlook e OneDrive.\nAula 13 — 24/08/2026 · Turma TI01 · Professor Gelvazio\nPreencha com sua conta Google SENAI.');
  form.setCollectEmail(true); form.setLimitOneResponsePerUser(true); form.setProgressBar(true);

  form.addSectionHeaderItem().setTitle('Identificação do Aluno').setHelpText('Preencha seus dados antes de responder.');
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Número de matrícula / RA').setRequired(false);

  form.addSectionHeaderItem().setTitle('Parte 1 — Microsoft 365 e Word').setHelpText('5 questões sobre o pacote Microsoft e o editor de textos Word.');
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. Qual é a extensão padrão dos arquivos criados no Microsoft Word?').setChoices([q1.createChoice('.txt'),q1.createChoice('.docx',true),q1.createChoice('.odt'),q1.createChoice('.xlsx')]).setRequired(true);
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. Para acessar o Microsoft Word gratuitamente pelo navegador, qual endereço utilizar?').setChoices([q2.createChoice('docs.google.com'),q2.createChoice('word.microsoft.com'),q2.createChoice('word.cloud.microsoft',true),q2.createChoice('office.com/word')]).setRequired(true);
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. Qual atalho de teclado é usado para aplicar negrito no Microsoft Word?').setChoices([q3.createChoice('Ctrl+N'),q3.createChoice('Ctrl+B',true),q3.createChoice('Ctrl+G'),q3.createChoice('Ctrl+S')]).setRequired(true);
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. No Word, onde você configura tamanho do papel, orientação e margens?').setChoices([q4.createChoice('Guia Inserir > Configurar Página'),q4.createChoice('Guia Layout (ou Layout de Página)',true),q4.createChoice('Guia Revisão > Configurações'),q4.createChoice('Menu Arquivo > Opções')]).setRequired(true);
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('5. Qual ação permite exportar um documento Word como PDF?').setChoices([q5.createChoice('Guia Inserir > Exportar'),q5.createChoice('Ctrl+P e escolher impressora PDF'),q5.createChoice('Arquivo > Salvar Como > PDF',true),q5.createChoice('Guia Revisão > Publicar')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 2 — Microsoft Excel').setHelpText('5 questões sobre planilhas, fórmulas e recursos do Excel.');
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('6. Qual é a extensão padrão dos arquivos do Microsoft Excel?').setChoices([q6.createChoice('.csv'),q6.createChoice('.xls'),q6.createChoice('.xlsx',true),q6.createChoice('.docx')]).setRequired(true);
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('7. Qual fórmula do Excel calcula a soma dos valores de A1 até A10?').setChoices([q7.createChoice('=TOTAL(A1:A10)'),q7.createChoice('=SOMA(A1:A10)',true),q7.createChoice('=ADICIONAR(A1,A10)'),q7.createChoice('=SUM(A1-A10)')]).setRequired(true);
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('8. O que significa usar $ em uma referência como $B$2?').setChoices([q8.createChoice('Indica que o valor é em dinheiro'),q8.createChoice('Trava a referência da célula para que não mude ao copiar a fórmula',true),q8.createChoice('Multiplica o valor da célula por 2'),q8.createChoice('Bloqueia a edição da célula')]).setRequired(true);
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('9. Qual recurso permite exibir somente as linhas que atendem a um critério?').setChoices([q9.createChoice('Classificar'),q9.createChoice('Formatação Condicional'),q9.createChoice('Filtro',true),q9.createChoice('Congelar Painéis')]).setRequired(true);
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Para criar um gráfico no Excel, qual é o primeiro passo?').setChoices([q10.createChoice('Ir em Arquivo > Inserir Gráfico'),q10.createChoice('Selecionar os dados e ir na guia Inserir > Gráficos',true),q10.createChoice('Clicar com o botão direito e escolher "Novo Gráfico"'),q10.createChoice('Usar a fórmula =GRÁFICO()')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 3 — PowerPoint, Outlook e OneDrive').setHelpText('5 questões sobre apresentações, e-mail e armazenamento em nuvem.');
  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Qual é a extensão padrão dos arquivos do Microsoft PowerPoint?').setChoices([q11.createChoice('.ppt'),q11.createChoice('.pptx',true),q11.createChoice('.odp'),q11.createChoice('.slides')]).setRequired(true);
  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('12. Qual tecla inicia a apresentação de slides em tela cheia no PowerPoint?').setChoices([q12.createChoice('F1'),q12.createChoice('F5',true),q12.createChoice('Ctrl+P'),q12.createChoice('Ctrl+F5')]).setRequired(true);
  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('13. No Outlook, o que é CC (Com Cópia)?').setChoices([q13.createChoice('Um campo para escrever o conteúdo do e-mail'),q13.createChoice('Um campo para adicionar destinatários que receberão uma cópia do e-mail',true),q13.createChoice('Um campo para ocultar os destinatários uns dos outros'),q13.createChoice('Um campo para classificar a prioridade do e-mail')]).setRequired(true);
  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('14. Quantos GB de armazenamento gratuito o OneDrive oferece para contas pessoais?').setChoices([q14.createChoice('1 GB'),q14.createChoice('15 GB'),q14.createChoice('5 GB',true),q14.createChoice('10 GB')]).setRequired(true);
  var q15 = form.addMultipleChoiceItem();
  q15.setTitle('15. Qual é a principal vantagem de salvar arquivos no OneDrive?').setChoices([q15.createChoice('Os arquivos ficam mais rápidos para abrir'),q15.createChoice('Os arquivos ficam acessíveis de qualquer dispositivo com internet e protegidos contra perda',true),q15.createChoice('Os arquivos ficam maiores e com melhor qualidade'),q15.createChoice('O computador fica mais leve e veloz')]).setRequired(true);

  form.addSectionHeaderItem().setTitle('Parte 4 — Aplicação Prática').setHelpText('2 questões discursivas sobre a atividade realizada.');
  form.addParagraphTextItem().setTitle('16. Descreva o que você fez na atividade prática da Aula 13. Quais ferramentas Microsoft você acessou e o que criou em cada uma?').setRequired(true);
  form.addParagraphTextItem().setTitle('17. Na sua opinião, qual ferramenta Microsoft aprendida hoje será mais útil no ambiente de trabalho industrial? Por quê?').setRequired(false);

  return { ok: true, titulo: 'Aula 13 · Ferramentas Microsoft', url: form.getPublishedUrl(), editUrl: form.getEditUrl() };
}
