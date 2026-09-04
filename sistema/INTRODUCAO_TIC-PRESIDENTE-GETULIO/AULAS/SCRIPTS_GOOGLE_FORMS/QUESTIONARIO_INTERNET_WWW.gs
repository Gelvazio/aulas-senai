/**
 * QUESTIONÁRIO — Internet e World Wide Web
 * Aula 04 · UC1 Introdução à TIC · SENAI
 *
 * Como usar:
 *   1. Acesse script.google.com e crie um novo projeto
 *   2. Cole este código e execute a função criarFormulario()
 *   3. Autorize as permissões solicitadas
 *   4. O link do formulário será exibido no console (Ctrl+Enter para ver)
 *   5. Copie o link e atualize o campo "arquivo" na Supabase (tabela curso, materias, Aula 04)
 */

function criarFormulario() {
  const form = FormApp.create('Questionário — Internet e World Wide Web · Aula 04 · SENAI');

  form.setDescription(
    'UC1 — Introdução à Tecnologia da Informação e Comunicação\n' +
    'Responda com atenção. Este questionário avalia o conteúdo da Aula 04 — Internet e WWW.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShuffleQuestions(false);

  // ── Seção 1: Internet e WWW ────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Internet e World Wide Web')
    .setHelpText('Conceitos fundamentais sobre a internet e a web.');

  form.addMultipleChoiceItem()
    .setTitle('1. Qual a diferença entre Internet e World Wide Web (WWW)?')
    .setChoiceValues([
      'São a mesma coisa — termos diferentes para o mesmo serviço',
      'A Internet é a infraestrutura de rede global; a WWW é um serviço que roda sobre ela, baseado em páginas acessadas pelo navegador',
      'A WWW é mais antiga que a Internet',
      'A Internet só funciona com a WWW ativa'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('2. Quem criou a World Wide Web em 1989?')
    .setChoiceValues(['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee', 'Mark Zuckerberg'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('3. O que é um endereço IP?')
    .setChoiceValues([
      'O nome de um site na internet',
      'Um identificador numérico único atribuído a cada dispositivo em uma rede',
      'O protocolo de segurança HTTPS',
      'O endereço físico do servidor onde o site está hospedado'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4. Qual serviço traduz nomes de domínio (ex: google.com) para endereços IP?')
    .setChoiceValues(['HTTP', 'DNS', 'FTP', 'SSL'])
    .setRequired(true);

  // ── Seção 2: Navegadores e Segurança ──────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Navegadores e Segurança')
    .setHelpText('Questões sobre navegadores web e conexões seguras.');

  form.addMultipleChoiceItem()
    .setTitle('5. O que o ícone de cadeado 🔒 na barra de endereço do navegador indica?')
    .setChoiceValues([
      'O site é oficial e aprovado pelo governo',
      'A conexão usa HTTPS — os dados trafegam criptografados entre seu dispositivo e o servidor',
      'O site é gratuito',
      'O site não tem anúncios'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('6. Qual a função do modo Incógnito (Ctrl+Shift+N) no navegador?')
    .setChoiceValues([
      'Deixar o usuário completamente anônimo na internet',
      'Navegar sem salvar histórico, cookies e dados de formulário localmente no dispositivo',
      'Bloquear todos os anúncios automaticamente',
      'Aumentar a velocidade de navegação'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('7. Qual é o navegador padrão do Chromebook?')
    .setChoiceValues(['Firefox', 'Safari', 'Edge', 'Google Chrome'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('8. Qual protocolo garante que a comunicação entre o navegador e o site seja criptografada?')
    .setChoiceValues(['HTTP', 'FTP', 'HTTPS', 'SMTP'])
    .setRequired(true);

  // ── Seção 3: Busca e Fontes ────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Sites de Busca e Avaliação de Fontes')
    .setHelpText('Questões sobre pesquisa eficiente e confiabilidade de informações.');

  form.addMultipleChoiceItem()
    .setTitle('9. Qual operador de busca do Google é usado para encontrar uma frase exata?')
    .setChoiceValues(['* (asterisco)', '- (hífen)', '"aspas"', 'site:'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('10. Você quer encontrar apenas arquivos PDF sobre segurança da informação. Qual busca usar no Google?')
    .setChoiceValues([
      'segurança da informação pdf',
      'filetype:pdf segurança da informação',
      'site:pdf segurança da informação',
      '-doc segurança da informação'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('11. Qual site de busca é conhecido por não rastrear os dados e pesquisas do usuário?')
    .setChoiceValues(['Google', 'Bing', 'DuckDuckGo', 'Yahoo'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('12. Ao avaliar uma fonte de informação encontrada na internet, qual critério é MENOS relevante?')
    .setChoiceValues([
      'Quem é o autor e se tem autoridade no assunto',
      'Se o site tem muitos seguidores nas redes sociais',
      'A data de publicação do conteúdo',
      'Se o conteúdo cita outras fontes verificáveis'
    ])
    .setRequired(true);

  // ── Seção 4: E-mail ────────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Correio Eletrônico')
    .setHelpText('Questões sobre uso profissional do e-mail.');

  form.addMultipleChoiceItem()
    .setTitle('13. Qual campo do e-mail deve ser usado quando você quer enviar uma cópia para alguém sem que os outros destinatários saibam?')
    .setChoiceValues(['Para', 'CC (Com Cópia)', 'CCO (Com Cópia Oculta)', 'Assunto'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('14. Você recebe um e-mail de um banco pedindo que clique em um link para "atualizar seus dados urgentemente". O que você deve fazer?')
    .setChoiceValues([
      'Clicar no link imediatamente para não ter a conta bloqueada',
      'Encaminhar o e-mail para seus contatos avisando sobre o problema',
      'Ignorar e deletar — é uma tentativa de phishing. Se necessário, acesse o site do banco diretamente pelo navegador',
      'Responder o e-mail com seus dados para confirmar a identidade'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('15. Qual é a boa prática ao enviar um e-mail profissional?')
    .setChoiceValues([
      'Escrever o assunto em maiúsculas para chamar atenção',
      'Usar linguagem informal e gírias para ser mais simpático',
      'Preencher o campo Assunto de forma clara e objetiva, e usar linguagem formal no corpo',
      'Deixar o campo Assunto em branco para o destinatário ver a mensagem antes'
    ])
    .setRequired(true);

  // ── Seção 5: Direitos Autorais e Nuvem ────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 5 — Direitos Autorais, Download e Nuvem')
    .setHelpText('Questões sobre uso legal de conteúdo e armazenamento em nuvem.');

  form.addMultipleChoiceItem()
    .setTitle('16. Uma foto encontrada no Google Images pode ser usada livremente em trabalhos escolares sem citar a fonte?')
    .setChoiceValues([
      'Sim, tudo que está no Google é de domínio público',
      'Sim, desde que seja para uso pessoal',
      'Não — imagens na internet têm direitos autorais e precisam de autorização ou citação de fonte',
      'Sim, porque o Google já tem permissão de todas as imagens'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('17. O que é uma licença Creative Commons CC BY?')
    .setChoiceValues([
      'Proibição total de uso e reprodução do conteúdo',
      'Permissão para usar o conteúdo livremente, desde que o autor seja citado',
      'Permissão apenas para uso comercial',
      'Licença que exige pagamento para uso'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('18. Ao baixar um arquivo da internet no Chromebook, onde ele é salvo automaticamente?')
    .setChoiceValues(['Google Drive', 'Pasta Downloads', 'Área de Trabalho', 'Pasta Documentos'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('19. Qual é a principal vantagem de salvar arquivos no Google Drive em vez de apenas na pasta Downloads do Chromebook?')
    .setChoiceValues([
      'Os arquivos ficam mais seguros contra vírus',
      'Os arquivos ficam na nuvem — acessíveis de qualquer dispositivo e não são perdidos se o Chromebook for redefinido',
      'O Drive abre os arquivos mais rápido',
      'O Drive tem mais espaço que o HD do Chromebook'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('20. Ao compartilhar um documento no Google Drive com permissão de "Apenas visualização", o que o destinatário pode fazer?')
    .setChoiceValues([
      'Editar e salvar alterações no documento original',
      'Apenas ler o documento, sem poder modificar ou comentar',
      'Baixar e recompartilhar o documento com qualquer pessoa',
      'Apagar o documento da sua pasta'
    ])
    .setRequired(true);

  // ── Questão dissertativa ───────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 6 — Questão Dissertativa')
    .setHelpText('Responda com suas próprias palavras.');

  form.addParagraphTextItem()
    .setTitle('21. Você encontrou uma imagem perfeita para o seu trabalho em um site da internet. Descreva passo a passo o que você faria para usar essa imagem de forma legal e ética, citando os conceitos de direitos autorais e licenças aprendidos em aula.')
    .setHelpText('Mínimo de 4 linhas.')
    .setRequired(true);

  // ── Configurações finais ───────────────────────────────────────────────────

  form.setConfirmationMessage(
    'Muito bem! Suas respostas foram registradas com sucesso. ' +
    'A internet é uma ferramenta poderosa — use-a com responsabilidade! 🌐 Bons estudos!'
  );

  const url = form.getPublishedUrl();
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para os alunos: ' + url);
  Logger.log('⚙️  Link de edição: ' + form.getEditUrl());

  return url;
}
