/**
 * CORRETOR HÍBRIDO — PROVA SIMPLES UC1 TIC EM EQUIPES
 *
 * Executar uma única vez: criarSistemaCorrecaoProvaTIC()
 * O script cria:
 *   1. Formulário de entrega;
 *   2. Planilha com correção automática e rubrica docente;
 *   3. Gatilho instalável para corrigir cada envio.
 *
 * Nota: 7,0 pontos automáticos + 3,0 pontos do docente.
 */

var CONFIG_TIC = {
  tituloFormulario: 'Entrega — Prova Prática Simples UC1 TIC — Equipes',
  nomeGuia: 'GUIA_DA_EQUIPE',
  nomeInventario: 'INVENTARIO_DA_EQUIPE',
  nomeApresentacao: 'APRESENTACAO_DA_EQUIPE',
  abaAutomatica: 'CORRECAO_AUTOMATICA',
  abaDocente: 'RUBRICA_DOCENTE',
  abaConfiguracao: 'CONFIGURACAO',
  props: {
    formulario: 'PROVA_TIC_FORM_ID',
    planilha: 'PROVA_TIC_SHEET_ID'
  },
  campos: {
    estudante1: 'Nome completo do estudante 1',
    estudante2: 'Nome completo do estudante 2',
    estudante3: 'Nome completo do estudante 3',
    estudante4: 'Nome completo do estudante 4',
    turma: 'Turma',
    docs: 'Link do GUIA_DA_EQUIPE no Google Docs',
    sheets: 'Link do INVENTARIO_DA_EQUIPE no Google Sheets',
    slides: 'Link da APRESENTACAO_DA_EQUIPE no Google Slides',
    confirmacao: 'Confirmação da equipe'
  }
};


function criarSistemaCorrecaoProvaTIC() {
  var form = FormApp.create(CONFIG_TIC.tituloFormulario);
  form.setDescription(
    'Envie os links somente após concluir e compartilhar os três arquivos com o docente.\n\n' +
    'A correção automática vale 7,0 pontos. Os 3,0 pontos restantes serão atribuídos pelo professor.'
  );
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Entrega recebida. A correção automática será registrada na planilha do docente. ' +
    'A nota final será concluída após a avaliação qualitativa e a apresentação da equipe.'
  );

  form.addSectionHeaderItem()
    .setTitle('Identificação da equipe')
    .setHelpText('Informe os nomes completos dos integrantes (mínimo 2, máximo 4).');

  form.addTextItem().setTitle(CONFIG_TIC.campos.estudante1).setRequired(true);
  form.addTextItem().setTitle(CONFIG_TIC.campos.estudante2).setRequired(true);
  form.addTextItem().setTitle(CONFIG_TIC.campos.estudante3).setRequired(false);
  form.addTextItem().setTitle(CONFIG_TIC.campos.estudante4).setRequired(false);
  form.addTextItem().setTitle(CONFIG_TIC.campos.turma).setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('Links dos arquivos')
    .setHelpText('Use arquivos nativos Google e confira se o docente possui acesso.');

  adicionarCampoLink_(form, CONFIG_TIC.campos.docs);
  adicionarCampoLink_(form, CONFIG_TIC.campos.sheets);
  adicionarCampoLink_(form, CONFIG_TIC.campos.slides);

  var confirmacao = form.addCheckboxItem();
  confirmacao.setTitle(CONFIG_TIC.campos.confirmacao)
    .setChoices([
      confirmacao.createChoice('Os três arquivos estão concluídos e compartilhados com o docente.'),
      confirmacao.createChoice('Os dois integrantes conhecem o conteúdo produzido.')
    ])
    .setRequired(true);

  var planilha = SpreadsheetApp.create('Resultados — Prova Prática Simples UC1 TIC');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  prepararPlanilhaResultados_(planilha);

  var props = PropertiesService.getScriptProperties();
  props.setProperty(CONFIG_TIC.props.formulario, form.getId());
  props.setProperty(CONFIG_TIC.props.planilha, planilha.getId());

  removerGatilhosDoCorretor_();
  ScriptApp.newTrigger('corrigirEnvioProvaTIC')
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log('FORMULÁRIO PARA AS EQUIPES: ' + form.getPublishedUrl());
  Logger.log('EDIÇÃO DO FORMULÁRIO: ' + form.getEditUrl());
  Logger.log('PLANILHA DE RESULTADOS: ' + planilha.getUrl());
}


function adicionarCampoLink_(form, titulo) {
  var validacao = FormApp.createTextValidation()
    .requireTextIsUrl()
    .setHelpText('Cole um link válido do Google Drive.')
    .build();
  form.addTextItem()
    .setTitle(titulo)
    .setValidation(validacao)
    .setRequired(true);
}


function prepararPlanilhaResultados_(planilha) {
  var inicial = planilha.getSheets()[0];
  inicial.setName(CONFIG_TIC.abaAutomatica);

  var cabecalhoAuto = [
    'Data e hora', 'Equipe', 'Estudante 1', 'Estudante 2', 'Estudante 3', 'Estudante 4', 'Turma', 'E-mail',
    'Organização (1,0)', 'Google Docs (2,0)', 'Google Sheets (2,0)',
    'Google Slides (1,5)', 'Segurança e interpretação (0,5)',
    'Nota automática (7,0)', 'Status', 'Feedback automático',
    'Link Docs', 'Link Sheets', 'Link Slides'
  ];
  inicial.getRange(1, 1, 1, cabecalhoAuto.length).setValues([cabecalhoAuto]);
  formatarCabecalho_(inicial, cabecalhoAuto.length);
  inicial.setFrozenRows(1);

  var docente = planilha.insertSheet(CONFIG_TIC.abaDocente);
  var cabecalhoDocente = [
    'Data e hora', 'Equipe', 'Clareza e linguagem (1,0)',
    'Correção técnica (1,0)', 'Apresentação e cooperação (1,0)',
    'Total docente (3,0)', 'Nota automática (7,0)', 'Nota final (10,0)',
    'Observações do docente'
  ];
  docente.getRange(1, 1, 1, cabecalhoDocente.length).setValues([cabecalhoDocente]);
  formatarCabecalho_(docente, cabecalhoDocente.length);
  docente.setFrozenRows(1);

  var config = planilha.insertSheet(CONFIG_TIC.abaConfiguracao);
  config.getRange('A1:B6').setValues([
    ['Configuração', 'Valor'],
    ['Nota automática máxima', 7],
    ['Nota docente máxima', 3],
    ['Nome obrigatório — Docs', CONFIG_TIC.nomeGuia],
    ['Nome obrigatório — Sheets', CONFIG_TIC.nomeInventario],
    ['Nome obrigatório — Slides', CONFIG_TIC.nomeApresentacao]
  ]);
  formatarCabecalho_(config, 2);
  config.autoResizeColumns(1, 2);
}


function formatarCabecalho_(aba, quantidadeColunas) {
  aba.getRange(1, 1, 1, quantidadeColunas)
    .setFontWeight('bold')
    .setFontColor('#FFFFFF')
    .setBackground('#1F4E78')
    .setWrap(true);
}


function removerGatilhosDoCorretor_() {
  ScriptApp.getProjectTriggers().forEach(function(gatilho) {
    if (gatilho.getHandlerFunction() === 'corrigirEnvioProvaTIC') {
      ScriptApp.deleteTrigger(gatilho);
    }
  });
}


function corrigirEnvioProvaTIC(e) {
  if (!e || !e.response) {
    throw new Error('Esta função deve ser executada pelo gatilho de envio do formulário.');
  }

  var respostas = mapearRespostas_(e.response);
  var estudante1 = respostas[CONFIG_TIC.campos.estudante1] || '';
  var estudante2 = respostas[CONFIG_TIC.campos.estudante2] || '';
  var estudante3 = respostas[CONFIG_TIC.campos.estudante3] || '';
  var estudante4 = respostas[CONFIG_TIC.campos.estudante4] || '';
  var turma = respostas[CONFIG_TIC.campos.turma] || '';
  var nomes = [estudante1, estudante2, estudante3, estudante4].filter(function(n) { return n.trim(); });
  var equipe = nomes.join(' e ');
  var email = e.response.getRespondentEmail() || '';

  var guia = inspecionarArquivo_(respostas[CONFIG_TIC.campos.docs], MimeType.GOOGLE_DOCS, CONFIG_TIC.nomeGuia);
  var inventario = inspecionarArquivo_(respostas[CONFIG_TIC.campos.sheets], MimeType.GOOGLE_SHEETS, CONFIG_TIC.nomeInventario);
  var apresentacao = inspecionarArquivo_(respostas[CONFIG_TIC.campos.slides], MimeType.GOOGLE_SLIDES, CONFIG_TIC.nomeApresentacao);

  var organizacao = corrigirOrganizacao_(nomes, guia, inventario, apresentacao);
  var resultadoDocs = corrigirGoogleDocs_(guia);
  var resultadoSheets = corrigirGoogleSheets_(inventario);
  var resultadoSlides = corrigirGoogleSlides_(apresentacao, nomes);
  var seguranca = corrigirSegurancaInterpretacao_(resultadoDocs.texto, resultadoSlides.texto);

  var notaAutomatica = arredondar_(
    organizacao.nota + resultadoDocs.nota + resultadoSheets.nota +
    resultadoSlides.nota + seguranca.nota
  );

  var feedback = [].concat(
    organizacao.detalhes,
    resultadoDocs.detalhes,
    resultadoSheets.detalhes,
    resultadoSlides.detalhes,
    seguranca.detalhes
  ).join('\n');

  var status = notaAutomatica >= 5.6 ? 'REQUISITOS OBJETIVOS ATENDIDOS' : 'REVISAR REQUISITOS';
  registrarResultado_(
    e.response.getTimestamp(), equipe, estudante1, estudante2, estudante3, estudante4, turma, email,
    organizacao.nota, resultadoDocs.nota, resultadoSheets.nota,
    resultadoSlides.nota, seguranca.nota, notaAutomatica, status, feedback,
    respostas[CONFIG_TIC.campos.docs],
    respostas[CONFIG_TIC.campos.sheets],
    respostas[CONFIG_TIC.campos.slides]
  );
}


function mapearRespostas_(formResponse) {
  var mapa = {};
  formResponse.getItemResponses().forEach(function(resposta) {
    mapa[resposta.getItem().getTitle()] = resposta.getResponse();
  });
  return mapa;
}


function inspecionarArquivo_(url, mimeEsperado, nomeEsperado) {
  var resultado = {
    url: url || '', id: '', acessivel: false, nativo: false,
    nomeCorreto: false, nome: '', mime: '', erro: ''
  };
  try {
    resultado.id = extrairId_(url);
    if (!resultado.id) throw new Error('link sem identificador reconhecível');
    var arquivo = DriveApp.getFileById(resultado.id);
    resultado.acessivel = true;
    resultado.nome = arquivo.getName();
    resultado.mime = arquivo.getMimeType();
    resultado.nativo = resultado.mime === mimeEsperado;
    resultado.nomeCorreto = normalizar_(resultado.nome).indexOf(normalizar_(nomeEsperado)) === 0;
  } catch (erro) {
    resultado.erro = erro.message;
  }
  return resultado;
}


function extrairId_(url) {
  if (!url) return '';
  var texto = String(url).trim();
  var correspondencia = texto.match(/[-\w]{25,}/);
  return correspondencia ? correspondencia[0] : '';
}


function corrigirOrganizacao_(nomes, guia, inventario, apresentacao) {
  var nota = 0;
  var detalhes = ['ORGANIZAÇÃO E ENTREGA:'];
  if (nomes.length >= 2) {
    nota += 0.10;
    detalhes.push('✅ ' + nomes.length + ' estudantes identificados.');
  } else {
    detalhes.push('❌ Identificação incompleta da equipe (mínimo 2).');
  }

  [guia, inventario, apresentacao].forEach(function(item) {
    if (item.acessivel) nota += 0.20;
    if (item.nativo) nota += 0.05;
    if (item.nomeCorreto) nota += 0.05;
  });

  detalhes.push(descreverArquivo_('Docs', guia));
  detalhes.push(descreverArquivo_('Sheets', inventario));
  detalhes.push(descreverArquivo_('Slides', apresentacao));
  return {nota: arredondar_(Math.min(1, nota)), detalhes: detalhes};
}


function descreverArquivo_(rotulo, item) {
  if (!item.acessivel) return '❌ ' + rotulo + ': arquivo sem acesso (' + (item.erro || 'erro desconhecido') + ').';
  var partes = [item.nativo ? 'formato Google correto' : 'formato não nativo'];
  partes.push(item.nomeCorreto ? 'nome correto' : 'nome diferente do padrão');
  return (item.nativo && item.nomeCorreto ? '✅ ' : '⚠️ ') + rotulo + ': ' + partes.join('; ') + '.';
}


function corrigirGoogleDocs_(arquivo) {
  var detalhes = ['GOOGLE DOCS:'];
  if (!arquivo.acessivel || !arquivo.nativo) {
    detalhes.push('❌ Não foi possível analisar um Google Docs nativo.');
    return {nota: 0, detalhes: detalhes, texto: ''};
  }

  try {
    var doc = DocumentApp.openById(arquivo.id);
    var body = doc.getBody();
    var texto = body.getText();
    var normalizado = normalizar_(texto);
    var palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    var paragrafos = body.getParagraphs();
    var titulos = paragrafos.filter(function(p) {
      return p.getHeading() !== DocumentApp.ParagraphHeading.NORMAL;
    }).length;
    var listas = body.getListItems().length;
    var nota = 0;

    nota += registrarCriterio_(detalhes, contem_(normalizado, ['como organizar e proteger o computador do setor']), 0.20, 'Título solicitado');
    nota += registrarCriterio_(detalhes, palavras >= 100, 0.20, 'Pelo menos 100 palavras');
    nota += registrarCriterio_(detalhes, titulos >= 2, 0.20, 'Dois ou mais títulos/subtítulos');
    nota += registrarCriterio_(detalhes, listas >= 1, 0.20, 'Lista com marcadores');
    nota += registrarCriterio_(detalhes, contem_(normalizado, ['hardware']) && contem_(normalizado, ['software']), 0.30, 'Diferença entre hardware e software');
    nota += registrarCriterio_(detalhes, contarGrupos_(normalizado, [
      ['cpu', 'processador'], ['memoria ram', 'ram'], ['hd', 'ssd'],
      ['periferico', 'teclado', 'mouse', 'monitor', 'impressora']
    ]) >= 4, 0.40, 'CPU, RAM, armazenamento e periférico');
    nota += registrarCriterio_(detalhes, /https?:\/\/|www\.|fonte\s*:/i.test(texto), 0.20, 'Fonte ou link consultado');
    nota += registrarCriterio_(detalhes, contarGrupos_(normalizado, [
      ['backup'], ['malware', 'antimalware'], ['autenticacao']
    ]) >= 3, 0.30, 'Termos do Anexo I explicados');

    return {nota: arredondar_(Math.min(2, nota)), detalhes: detalhes, texto: texto};
  } catch (erro) {
    detalhes.push('❌ Erro ao analisar o Google Docs: ' + erro.message);
    return {nota: 0, detalhes: detalhes, texto: ''};
  }
}


function corrigirGoogleSheets_(arquivo) {
  var detalhes = ['GOOGLE SHEETS:'];
  if (!arquivo.acessivel || !arquivo.nativo) {
    detalhes.push('❌ Não foi possível analisar um Google Sheets nativo.');
    return {nota: 0, detalhes: detalhes};
  }

  try {
    var planilha = SpreadsheetApp.openById(arquivo.id);
    var aba = planilha.getSheets()[0];
    var valores = aba.getDataRange().getDisplayValues();
    var cabecalhosEsperados = ['codigo', 'item', 'tipo', 'qtd', 'estado', 'acao necessaria'];
    var cabecalhos = (valores[0] || []).slice(0, 6).map(normalizar_);
    var cabecalhosCorretos = cabecalhosEsperados.every(function(valor, i) {
      return cabecalhos[i] && cabecalhos[i].indexOf(valor) >= 0;
    });
    var registros = valores.slice(1).filter(function(linha) {
      return linha.slice(0, 6).some(function(valor) { return String(valor).trim() !== ''; });
    });
    var registrosCompletos = registros.filter(function(linha) {
      return linha.slice(0, 6).every(function(valor) { return String(valor).trim() !== ''; });
    }).length;
    var formulaH2 = aba.getRange('H2').getFormula();
    var formulaValida = /^=/.test(formulaH2) && /D2:D/i.test(formulaH2);
    var filtro = aba.getFilter() !== null;
    var fundos = aba.getRange(1, 1, 1, 6).getBackgrounds()[0];
    var cabecalhoDestacado = fundos.some(function(cor) {
      return cor && cor.toLowerCase() !== '#ffffff';
    });
    var nota = 0;

    nota += registrarCriterio_(detalhes, cabecalhosCorretos, 0.40, 'Seis cabeçalhos na ordem solicitada');
    nota += registrarCriterio_(detalhes, registros.length >= 6, 0.40, 'Seis ou mais registros');
    nota += registrarCriterio_(detalhes, registrosCompletos >= 6, 0.40, 'Seis registros completos');
    nota += registrarCriterio_(detalhes, formulaValida, 0.40, 'Fórmula de totalização em H2');
    nota += registrarCriterio_(detalhes, filtro, 0.20, 'Filtro aplicado');
    nota += registrarCriterio_(detalhes, cabecalhoDestacado, 0.20, 'Cabeçalho com cor de fundo');
    return {nota: arredondar_(Math.min(2, nota)), detalhes: detalhes};
  } catch (erro) {
    detalhes.push('❌ Erro ao analisar o Google Sheets: ' + erro.message);
    return {nota: 0, detalhes: detalhes};
  }
}


function corrigirGoogleSlides_(arquivo, nomes) {
  var detalhes = ['GOOGLE SLIDES:'];
  if (!arquivo.acessivel || !arquivo.nativo) {
    detalhes.push('❌ Não foi possível analisar um Google Slides nativo.');
    return {nota: 0, detalhes: detalhes, texto: ''};
  }

  try {
    var apresentacao = SlidesApp.openById(arquivo.id);
    var slides = apresentacao.getSlides();
    var textos = slides.map(extrairTextoSlide_);
    var textoCompleto = textos.join('\n');
    var normalizado = normalizar_(textoCompleto);
    var capa = normalizar_(textos[0] || '');
    var nomesNaCapa = nomes.filter(function(nome) {
      return nomePresente_(capa, nome);
    }).length;
    var nomesValidos = nomesNaCapa >= Math.min(2, nomes.length);
    var imagens = 0;
    slides.forEach(function(slide) {
      slide.getPageElements().forEach(function(elemento) {
        if (elemento.getPageElementType() === SlidesApp.PageElementType.IMAGE) imagens++;
      });
    });
    var conteudos = contarGrupos_(normalizado, [
      ['hardware'], ['software'], ['risco', 'ameaca', 'phishing', 'malware'],
      ['backup'], ['organizacao de arquivos', 'pastas', 'arquivos']
    ]);
    var textoAdequado = textos.every(function(texto) { return texto.length <= 700; });
    var nota = 0;

    nota += registrarCriterio_(detalhes, slides.length === 4, 0.30, 'Exatamente quatro slides');
    nota += registrarCriterio_(detalhes, nomesValidos, 0.20, 'Nomes dos integrantes na capa');
    nota += registrarCriterio_(detalhes, conteudos >= 5, 0.60, 'Conteúdos obrigatórios distribuídos nos slides');
    nota += registrarCriterio_(detalhes, imagens >= 1, 0.20, 'Pelo menos uma imagem');
    nota += registrarCriterio_(detalhes, textoAdequado, 0.20, 'Quantidade de texto dentro do limite automático');
    return {nota: arredondar_(Math.min(1.5, nota)), detalhes: detalhes, texto: textoCompleto};
  } catch (erro) {
    detalhes.push('❌ Erro ao analisar o Google Slides: ' + erro.message);
    return {nota: 0, detalhes: detalhes, texto: ''};
  }
}


function extrairTextoSlide_(slide) {
  var partes = [];
  slide.getPageElements().forEach(function(elemento) {
    try {
      if (elemento.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
        partes.push(elemento.asShape().getText().asString());
      } else if (elemento.getPageElementType() === SlidesApp.PageElementType.TABLE) {
        var tabela = elemento.asTable();
        for (var l = 0; l < tabela.getNumRows(); l++) {
          for (var c = 0; c < tabela.getNumColumns(); c++) {
            partes.push(tabela.getCell(l, c).getText().asString());
          }
        }
      }
    } catch (erro) {
      partes.push('');
    }
  });
  return partes.join(' ');
}


function corrigirSegurancaInterpretacao_(textoDocs, textoSlides) {
  var detalhes = ['SEGURANÇA E INTERPRETAÇÃO:'];
  var texto = normalizar_((textoDocs || '') + '\n' + (textoSlides || ''));
  var grupos = [
    ['backup'], ['malware', 'antimalware'], ['autenticacao'],
    ['senha forte', 'senha segura'], ['link suspeito', 'phishing', 'golpe']
  ];
  var encontrados = contarGrupos_(texto, grupos);
  var nota = arredondar_(Math.min(0.5, encontrados * 0.10));
  detalhes.push((encontrados === 5 ? '✅ ' : '⚠️ ') + encontrados + ' de 5 conceitos mínimos encontrados.');
  return {nota: nota, detalhes: detalhes};
}


function registrarCriterio_(detalhes, atende, valor, descricao) {
  detalhes.push((atende ? '✅ ' : '❌ ') + descricao + ' — ' + (atende ? '+' + valor.toFixed(2) : '+0,00'));
  return atende ? valor : 0;
}


function registrarResultado_(data, equipe, estudante1, estudante2, estudante3, estudante4, turma, email,
  organizacao, docs, sheets, slides, seguranca, notaAutomatica, status, feedback,
  linkDocs, linkSheets, linkSlides) {

  var idPlanilha = PropertiesService.getScriptProperties().getProperty(CONFIG_TIC.props.planilha);
  if (!idPlanilha) throw new Error('Planilha de resultados não configurada. Execute criarSistemaCorrecaoProvaTIC().');
  var planilha = SpreadsheetApp.openById(idPlanilha);
  var automatica = planilha.getSheetByName(CONFIG_TIC.abaAutomatica);
  automatica.appendRow([
    data, equipe, estudante1, estudante2, estudante3 || '', estudante4 || '', turma, email,
    organizacao, docs, sheets, slides, seguranca, notaAutomatica,
    status, feedback, linkDocs, linkSheets, linkSlides
  ]);
  var linhaAuto = automatica.getLastRow();
  automatica.getRange(linhaAuto, 7, 1, 6).setNumberFormat('0.00');
  automatica.getRange(linhaAuto, 14).setWrap(true);

  var docente = planilha.getSheetByName(CONFIG_TIC.abaDocente);
  docente.appendRow([data, equipe, '', '', '', '', notaAutomatica, '', '']);
  var linha = docente.getLastRow();
  docente.getRange(linha, 6).setFormula('=SUM(C' + linha + ':E' + linha + ')');
  docente.getRange(linha, 8).setFormula('=MIN(10,F' + linha + '+G' + linha + ')');
  docente.getRange(linha, 3, 1, 6).setNumberFormat('0.00');
  var regra = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(0, 1)
    .setAllowInvalid(false)
    .setHelpText('Informe uma nota entre 0 e 1.')
    .build();
  docente.getRange(linha, 3, 1, 3).setDataValidation(regra);
}


function nomePresente_(textoNormalizado, nome) {
  var partes = normalizar_(nome).split(' ').filter(function(p) { return p.length >= 3; });
  return partes.length > 0 && partes.some(function(parte) { return textoNormalizado.indexOf(parte) >= 0; });
}


function contarGrupos_(textoNormalizado, grupos) {
  return grupos.filter(function(grupo) {
    return contem_(textoNormalizado, grupo);
  }).length;
}


function contem_(textoNormalizado, alternativas) {
  return alternativas.some(function(valor) {
    return textoNormalizado.indexOf(normalizar_(valor)) >= 0;
  });
}


function normalizar_(valor) {
  return String(valor || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}


function arredondar_(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}
