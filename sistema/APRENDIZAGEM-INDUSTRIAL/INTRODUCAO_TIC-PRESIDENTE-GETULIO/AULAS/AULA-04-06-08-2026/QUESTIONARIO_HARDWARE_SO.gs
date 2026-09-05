/**
 * QUESTIONÁRIO — Hardware e Sistema Operacional
 * Aula 05 · UC1 Introdução à TIC · SENAI
 *
 * Como usar:
 *   1. Acesse script.google.com e crie um novo projeto
 *   2. Cole este código e execute a função criarFormulario()
 *   3. Autorize as permissões solicitadas
 *   4. O link do formulário será exibido no console (Ctrl+Enter para ver)
 *   5. Copie o link e atualize o campo "questionario" na Supabase (tabela curso, materias)
 */

function criarFormulario() {
  const form = FormApp.create('Questionário — Hardware e Sistema Operacional · Aula 05 · SENAI');

  form.setDescription(
    'UC1 — Introdução à Tecnologia da Informação e Comunicação\n' +
    'Responda com atenção. Este questionário avalia o conteúdo da Aula 05.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShuffleQuestions(false);

  // ── Seção 1: Hardware ──────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Hardware: Componentes do Computador')
    .setHelpText('Questões sobre os componentes físicos do computador.');

  form.addMultipleChoiceItem()
    .setTitle('1. Qual componente é chamado de "cérebro" do computador?')
    .setChoiceValues(['Memória RAM', 'HD (Hard Disk)', 'CPU (Processador)', 'Placa de Vídeo'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('2. O que acontece com os dados armazenados na memória RAM quando o computador é desligado?')
    .setChoiceValues([
      'Os dados são gravados automaticamente no HD',
      'Os dados são apagados — a RAM é volátil',
      'Os dados ficam salvos até a próxima vez que o computador ligar',
      'Os dados vão para a nuvem'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('3. Qual das opções abaixo é uma vantagem do SSD em relação ao HD tradicional?')
    .setChoiceValues([
      'O SSD é mais barato por GB',
      'O SSD tem maior capacidade de armazenamento',
      'O SSD é muito mais rápido e resistente a impactos',
      'O SSD consome mais energia'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4. Qual componente conecta e integra todas as peças do computador?')
    .setChoiceValues(['Processador', 'Fonte de alimentação', 'Placa-mãe', 'Memória RAM'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('5. O Chromebook geralmente usa qual tipo de armazenamento interno?')
    .setChoiceValues(['HD de 1 TB', 'SSD NVMe', 'eMMC (16–64 GB) + Google Drive', 'Fita magnética'])
    .setRequired(true);

  // ── Seção 2: Periféricos ───────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Periféricos')
    .setHelpText('Classifique e identifique os periféricos do computador.');

  form.addMultipleChoiceItem()
    .setTitle('6. Um teclado é classificado como periférico de:')
    .setChoiceValues(['Saída', 'Entrada', 'Entrada e Saída (E/S)', 'Processamento'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('7. Qual dos itens abaixo é um periférico de SAÍDA?')
    .setChoiceValues(['Mouse', 'Teclado', 'Monitor', 'Webcam'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('8. Um pen drive é classificado como periférico de:')
    .setChoiceValues(['Entrada', 'Saída', 'Entrada e Saída (E/S)', 'Processamento'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('9. Qual porta é usada nos Chromebooks modernos para carregar, transferir dados e conectar monitor usando o mesmo cabo?')
    .setChoiceValues(['USB-A', 'USB-C', 'HDMI', 'P2 (3.5mm)'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('10. Qual periférico é um exemplo de dispositivo de Entrada E Saída ao mesmo tempo?')
    .setChoiceValues(['Monitor', 'Impressora', 'Tela touch screen', 'Microfone'])
    .setRequired(true);

  // ── Seção 3: Sistema Operacional ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Sistema Operacional')
    .setHelpText('Questões sobre sistemas operacionais e Chrome OS.');

  form.addMultipleChoiceItem()
    .setTitle('11. Qual é a principal função de um Sistema Operacional?')
    .setChoiceValues([
      'Apenas conectar à internet',
      'Gerenciar hardware e permitir o funcionamento de outros programas',
      'Fazer cálculos matemáticos',
      'Armazenar arquivos no HD'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('12. O Chrome OS foi desenvolvido por qual empresa?')
    .setChoiceValues(['Microsoft', 'Apple', 'Google', 'Samsung'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('13. Qual característica do Chrome OS permite que ele inicie em menos de 10 segundos?')
    .setChoiceValues([
      'Possui o processador mais rápido do mercado',
      'É baseado na nuvem, leve e otimizado — sem programas pesados instalados',
      'Tem HD muito grande',
      'Não precisa de RAM'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('14. No Chrome OS, qual é a diferença entre a pasta "Downloads" e o "Google Drive"?')
    .setChoiceValues([
      'Não há diferença — são iguais',
      'Downloads é local (só no Chromebook); Google Drive é na nuvem (acessível de qualquer lugar)',
      'Google Drive é local; Downloads é na nuvem',
      'Downloads tem mais espaço que o Drive'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('15. Qual atalho de teclado no Chrome OS permite alternar entre janelas abertas?')
    .setChoiceValues(['Ctrl + Tab', 'Alt + Tab', 'Ctrl + W', 'Shift + Tab'])
    .setRequired(true);

  // ── Seção 4: Arquivos e Compactação ───────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Arquivos, Organização e Compactação')
    .setHelpText('Questões sobre tipos de arquivo e compactação.');

  form.addMultipleChoiceItem()
    .setTitle('16. Qual extensão de arquivo é usada para apresentações no formato Microsoft PowerPoint?')
    .setChoiceValues(['.docx', '.xlsx', '.pptx', '.pdf'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('17. Para que serve a compactação de arquivos?')
    .setChoiceValues([
      'Para deixar os arquivos mais bonitos',
      'Para reduzir o tamanho e facilitar envio ou armazenamento',
      'Para abrir arquivos mais rápido',
      'Para proteger arquivos com senha'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('18. Como compactar arquivos no Chromebook?')
    .setChoiceValues([
      'Arrastar o arquivo para a lixeira',
      'Selecionar arquivos → botão direito → "Zip selection"',
      'Ctrl + Z',
      'Abrir o Terminal e digitar um comando'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('19. Qual é a boa prática ao nomear arquivos?')
    .setChoiceValues([
      'Usar nomes curtos como "doc1", "arquivo2"',
      'Usar nomes descritivos como "Atividade_Hardware_SeuNome"',
      'Nunca colocar a data no nome',
      'Deixar o nome padrão do sistema'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('20. Por que é importante salvar arquivos no Google Drive em vez de apenas em Downloads?')
    .setChoiceValues([
      'Porque o Drive é mais rápido',
      'Porque Downloads não aceita arquivos grandes',
      'Porque o Drive é na nuvem — os arquivos ficam disponíveis em qualquer dispositivo e não são perdidos se o Chromebook for reiniciado',
      'Porque Downloads apaga arquivos automaticamente a cada hora'
    ])
    .setRequired(true);

  // ── Questão dissertativa ───────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 5 — Questão Dissertativa')
    .setHelpText('Responda com suas próprias palavras.');

  form.addParagraphTextItem()
    .setTitle('21. Explique a diferença entre Hardware e Software usando um exemplo do seu dia a dia com o Chromebook.')
    .setHelpText('Mínimo de 3 linhas.')
    .setRequired(true);

  // ── Configurações finais ───────────────────────────────────────────────────

  form.setConfirmationMessage(
    'Obrigado! Suas respostas foram registradas. ' +
    'Professor Gelvazio revisará seus resultados em breve. Bons estudos! 🎓'
  );

  const url = form.getPublishedUrl();
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para os alunos: ' + url);
  Logger.log('⚙️  Link de edição: ' + form.getEditUrl());

  return url;
}
