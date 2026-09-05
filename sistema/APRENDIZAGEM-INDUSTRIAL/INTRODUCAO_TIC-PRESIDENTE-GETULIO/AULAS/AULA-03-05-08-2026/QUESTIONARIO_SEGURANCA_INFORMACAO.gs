/**
 * QUESTIONÁRIO — Segurança da Informação
 * Aula 03 · UC1 Introdução à TIC · SENAI
 *
 * Como usar:
 *   1. Acesse script.google.com e crie um novo projeto
 *   2. Cole este código e execute a função criarFormulario()
 *   3. Autorize as permissões solicitadas
 *   4. O link do formulário será exibido no console (Ctrl+Enter para ver)
 *   5. Copie o link e atualize o campo "questionario" na Supabase (tabela curso, materias)
 */

function criarFormulario() {
  const form = FormApp.create('Questionário — Segurança da Informação · Aula 03 · SENAI');

  form.setDescription(
    'UC1 — Introdução à Tecnologia da Informação e Comunicação\n' +
    'Responda com atenção. Este questionário avalia o conteúdo da Aula 03 — Segurança da Informação.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShuffleQuestions(false);

  // ── Seção 1: Tríade CIA ────────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Tríade CIA')
    .setHelpText('Questões sobre os três pilares da Segurança da Informação.');

  form.addMultipleChoiceItem()
    .setTitle('1. A Tríade CIA representa quais três pilares da Segurança da Informação?')
    .setChoiceValues([
      'Controle, Inteligência e Acesso',
      'Confidencialidade, Integridade e Disponibilidade',
      'Criptografia, Identidade e Autenticação',
      'Confiabilidade, Integração e Acesso'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('2. Um hacker acessa o banco de dados de uma escola e altera as notas dos alunos. Qual pilar da Tríade CIA foi violado?')
    .setChoiceValues(['Confidencialidade', 'Integridade', 'Disponibilidade', 'Todos os pilares'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('3. Um ataque DDoS derruba o site de um banco por horas. Qual pilar da Tríade CIA foi violado?')
    .setChoiceValues(['Confidencialidade', 'Integridade', 'Disponibilidade', 'Nenhum pilar'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4. Qual mecanismo garante principalmente o pilar de Confidencialidade?')
    .setChoiceValues([
      'Backup regular',
      'Redundância de servidores',
      'Criptografia e controle de acesso',
      'Compactação de arquivos'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('5. A assinatura digital é usada para garantir qual pilar?')
    .setChoiceValues(['Confidencialidade', 'Integridade', 'Disponibilidade', 'Redundância'])
    .setRequired(true);

  // ── Seção 2: LGPD e Legislação ────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 2 — LGPD e Legislação Digital')
    .setHelpText('Questões sobre leis que regulam o uso de dados e a internet no Brasil.');

  form.addMultipleChoiceItem()
    .setTitle('6. O que é a LGPD?')
    .setChoiceValues([
      'Lei que proíbe o uso de redes sociais por menores de 18 anos',
      'Lei Geral de Proteção de Dados — regula o tratamento de dados pessoais no Brasil',
      'Lei que obriga empresas a usar antivírus',
      'Lei que regulamenta os contratos digitais'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('7. Segundo a LGPD, qual é um direito do titular dos dados?')
    .setChoiceValues([
      'Não pagar por produtos digitais',
      'Acessar o sistema de qualquer empresa gratuitamente',
      'Solicitar a exclusão dos seus dados pessoais de uma empresa',
      'Usar o Wi-Fi de qualquer estabelecimento comercial'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('8. A "Lei Carolina Dieckmann" (12.737/2012) tipifica como crime:')
    .setChoiceValues([
      'Publicar fotos sem autorização em redes sociais',
      'Invasão de dispositivo informático (computador, celular) sem autorização',
      'Compartilhar músicas na internet',
      'Usar Wi-Fi de terceiros sem permissão'
    ])
    .setRequired(true);

  // ── Seção 3: Golpes e Engenharia Social ───────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Phishing, Golpes e Engenharia Social')
    .setHelpText('Questões sobre golpes digitais e como se proteger.');

  form.addMultipleChoiceItem()
    .setTitle('9. Você recebe um e-mail do "Banco do Brasil" pedindo que você clique em um link para atualizar sua senha. O e-mail usa urgência: "Sua conta será bloqueada em 24 horas!". O que você deve fazer?')
    .setChoiceValues([
      'Clicar no link imediatamente para não perder o acesso',
      'Encaminhar o e-mail para amigos avisando sobre a urgência',
      'Ignorar e acessar o site do banco diretamente pelo navegador para verificar',
      'Responder o e-mail com seus dados para confirmar a identidade'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('10. O que é Phishing?')
    .setChoiceValues([
      'Um tipo de antivírus',
      'Uma técnica de golpe digital que usa mensagens falsas para roubar dados das vítimas',
      'Um protocolo de segurança de redes',
      'Uma forma de criptografar arquivos'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('11. Você recebe um WhatsApp de um número desconhecido dizendo ser seu filho e pedindo dinheiro urgente. O que você deve fazer?')
    .setChoiceValues([
      'Transferir o dinheiro imediatamente — pode ser urgência real',
      'Ligar para o número do seu filho para confirmar',
      'Bloquear o número sem verificar',
      'Pedir que a pessoa mande foto para confirmar'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('12. Um Ransomware é um tipo de malware que:')
    .setChoiceValues([
      'Mostra anúncios indesejados na tela',
      'Espiona as atividades do usuário em segundo plano',
      'Criptografa todos os arquivos e exige pagamento (resgate) para liberar o acesso',
      'Propaga vírus automaticamente pela rede'
    ])
    .setRequired(true);

  // ── Seção 4: Senhas e Autenticação ────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Senhas, 2FA e Navegação Segura')
    .setHelpText('Questões sobre proteção de contas e navegação segura.');

  form.addMultipleChoiceItem()
    .setTitle('13. Qual das senhas abaixo é considerada FORTE?')
    .setChoiceValues(['123456', 'senha', 'joao1990', 'S3n@i!AULA2026'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('14. O que é a Autenticação em Dois Fatores (2FA)?')
    .setChoiceValues([
      'Usar duas senhas diferentes',
      'Fazer login em dois computadores diferentes ao mesmo tempo',
      'Adicionar uma segunda camada de verificação além da senha — ex: código por SMS ou app',
      'Ter duas contas no mesmo serviço'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('15. O que indica o cadeado 🔒 na barra de endereço do navegador?')
    .setChoiceValues([
      'O site é gratuito',
      'A conexão usa HTTPS — os dados são criptografados entre seu dispositivo e o servidor',
      'O site foi aprovado pelo governo',
      'O site não tem anúncios'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('16. Qual é o PRINCIPAL risco de usar Wi-Fi público sem proteção?')
    .setChoiceValues([
      'O Wi-Fi pode ficar lento',
      'A bateria do dispositivo descarrega mais rápido',
      'Alguém pode interceptar sua comunicação (ataque Man-in-the-Middle)',
      'O Google pode bloquear sua conta'
    ])
    .setRequired(true);

  // ── Seção 5: Backup e Malware ─────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 5 — Backup e Malware')
    .setHelpText('Questões sobre proteção e recuperação de dados.');

  form.addMultipleChoiceItem()
    .setTitle('17. O que representa a Regra 3-2-1 de backup?')
    .setChoiceValues([
      '3 computadores, 2 usuários, 1 senha',
      '3 cópias dos dados, em 2 tipos de mídia, com 1 cópia em local diferente (offsite)',
      '3 backups por dia, 2 por semana, 1 por mês',
      '3 GB de backup, 2 GB na nuvem, 1 GB local'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('18. Um Worm se diferencia de um Vírus porque:')
    .setChoiceValues([
      'O Worm é mais fácil de remover',
      'O Worm não causa danos ao sistema',
      'O Worm se propaga automaticamente pela rede sem precisar de ação do usuário',
      'O Worm só afeta computadores com Windows'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('19. Um Spyware tem como objetivo principal:')
    .setChoiceValues([
      'Mostrar anúncios na tela',
      'Criptografar os arquivos do usuário',
      'Espionar as atividades do usuário — capturando senhas, histórico e capturas de tela',
      'Propagar vírus por e-mail'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('20. Por que o Chromebook é considerado um dos sistemas mais seguros?')
    .setChoiceValues([
      'Porque é muito caro e criminosos não o atacam',
      'Porque não tem conexão com a internet',
      'Porque cada aba do Chrome roda em um sandbox isolado, recebe atualizações automáticas e usa verificação de inicialização segura',
      'Porque tem antivírus pago instalado'
    ])
    .setRequired(true);

  // ── Questão dissertativa ───────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 6 — Questão Dissertativa')
    .setHelpText('Responda com suas próprias palavras.');

  form.addParagraphTextItem()
    .setTitle('21. Você recebeu um e-mail suspeito e acredita que pode ser phishing. Descreva passo a passo o que você faria para verificar e se proteger. Cite pelo menos 3 ações concretas.')
    .setHelpText('Mínimo de 4 linhas.')
    .setRequired(true);

  // ── Configurações finais ───────────────────────────────────────────────────

  form.setConfirmationMessage(
    'Ótimo trabalho! Suas respostas foram registradas com sucesso. ' +
    'Lembre-se: segurança da informação começa com você! 🛡️ Bons estudos!'
  );

  const url = form.getPublishedUrl();
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para os alunos: ' + url);
  Logger.log('⚙️  Link de edição: ' + form.getEditUrl());

  return url;
}
