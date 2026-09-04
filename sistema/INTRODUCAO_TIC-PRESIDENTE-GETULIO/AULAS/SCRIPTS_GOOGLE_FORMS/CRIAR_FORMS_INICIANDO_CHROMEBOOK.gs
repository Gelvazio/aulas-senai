/**
 * INSTRUÇÕES DE USO:
 * 1. Acesse https://script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o código existente e cole este arquivo inteiro
 * 4. Clique em "Executar" (▶) na função criarFormulario
 * 5. Autorize o script quando solicitado
 * 6. O formulário será criado no seu Google Drive automaticamente
 *
 * Disciplina: UC1 — Introdução à TIC — SENAI
 * Aula: Iniciando no Chromebook
 */

function criarFormulario() {
  var form = FormApp.create('Iniciando no Chromebook — Avaliação UC1 SENAI');
  form.setIsQuiz(true);
  form.setTitle('Iniciando no Chromebook — Avaliação UC1 SENAI');
  form.setDescription('Avaliação referente à aula Iniciando no Chromebook — UC1 Introdução à TIC — Professor Gelvazio');
  form.setShuffleQuestions(false);

  // ── BLOCO 1: O QUE É UM CHROMEBOOK ──────────────────────────

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Qual sistema operacional é utilizado no Chromebook?');
  q1.setChoices([
    q1.createChoice('Chrome OS, criado pelo Google', true),
    q1.createChoice('Windows, criado pela Microsoft', false),
    q1.createChoice('macOS, criado pela Apple', false),
    q1.createChoice('Android, criado pelo Google para smartphones', false)
  ]);
  q1.setPoints(1);
  q1.setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Qual é uma característica que diferencia o Chromebook de um PC com Windows?');
  q2.setChoices([
    q2.createChoice('É mais leve, inicializa em segundos e a maioria dos apps roda direto no navegador', true),
    q2.createChoice('Possui mais memória RAM e armazenamento local', false),
    q2.createChoice('Suporta mais programas instalados localmente', false),
    q2.createChoice('É mais indicado para uso sem conexão com a internet', false)
  ]);
  q2.setPoints(1);
  q2.setRequired(true);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Onde os arquivos criados no Chromebook são salvos automaticamente?');
  q3.setChoices([
    q3.createChoice('Na nuvem, no Google Drive', true),
    q3.createChoice('No HD interno do Chromebook', false),
    q3.createChoice('Em um pen drive conectado ao dispositivo', false),
    q3.createChoice('Na memória RAM do equipamento', false)
  ]);
  q3.setPoints(1);
  q3.setRequired(true);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Por que o Chromebook é considerado naturalmente seguro?');
  q4.setChoices([
    q4.createChoice('Tem baixo risco de vírus e recebe atualizações automáticas', true),
    q4.createChoice('Não se conecta à internet, evitando ataques', false),
    q4.createChoice('Possui antivírus pago instalado de fábrica', false),
    q4.createChoice('O sistema operacional é baseado em Windows Defender', false)
  ]);
  q4.setPoints(1);
  q4.setRequired(true);

  // ── BLOCO 2: COMO LIGAR E FAZER LOGIN ───────────────────────

  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Qual é o primeiro passo para usar o Chromebook após ligá-lo?');
  q5.setChoices([
    q5.createChoice('Conectar-se à rede Wi-Fi da sala', true),
    q5.createChoice('Instalar os programas necessários', false),
    q5.createChoice('Formatar o dispositivo para uso', false),
    q5.createChoice('Inserir um pen drive com os arquivos', false)
  ]);
  q5.setPoints(1);
  q5.setRequired(true);

  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Para fazer login no Chromebook, o que deve ser inserido?');
  q6.setChoices([
    q6.createChoice('E-mail Google e senha pessoal', true),
    q6.createChoice('Nome de usuário e PIN numérico', false),
    q6.createChoice('Impressão digital ou reconhecimento facial', false),
    q6.createChoice('Apenas o nome completo do aluno', false)
  ]);
  q6.setPoints(1);
  q6.setRequired(true);

  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('O que deve ser feito ao terminar de usar o Chromebook na sala de aula?');
  q7.setChoices([
    q7.createChoice('Fazer logout da conta clicando no relógio, nome do usuário e depois "Sair"', true),
    q7.createChoice('Simplesmente fechar a tela sem sair da conta', false),
    q7.createChoice('Deixar a tela aberta para o próximo aluno usar', false),
    q7.createChoice('Desligar o dispositivo sem sair da conta', false)
  ]);
  q7.setPoints(1);
  q7.setRequired(true);

  // ── BLOCO 3: INTERFACE DO CHROME OS ─────────────────────────

  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('O que é o "Shelf" no Chrome OS?');
  q8.setChoices([
    q8.createChoice('A barra inferior com atalhos para apps favoritos, relógio e status do sistema', true),
    q8.createChoice('O ícone de círculo que acessa todos os apps', false),
    q8.createChoice('A área central e limpa da tela principal', false),
    q8.createChoice('O navegador Chrome aberto pelo sistema', false)
  ]);
  q8.setPoints(1);
  q8.setRequired(true);

  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('Para que serve o "Launcher" (ícone de círculo) no Chrome OS?');
  q9.setChoices([
    q9.createChoice('Acessa todos os apps instalados e realiza buscas gerais', true),
    q9.createChoice('Abre o Google Drive diretamente', false),
    q9.createChoice('Controla o volume e o brilho da tela', false),
    q9.createChoice('Exibe as notificações do sistema', false)
  ]);
  q9.setPoints(1);
  q9.setRequired(true);

  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('Como dividir a tela entre dois aplicativos no Chrome OS?');
  q10.setChoices([
    q10.createChoice('Arrastar a janela para a lateral ou usar os atalhos Alt+[ ou Alt+]', true),
    q10.createChoice('Clicar com o botão direito e selecionar "Dividir tela"', false),
    q10.createChoice('Abrir o Launcher e escolher a opção "Multitarefa"', false),
    q10.createChoice('Pressionar Ctrl+D para ativar o modo dividido', false)
  ]);
  q10.setPoints(1);
  q10.setRequired(true);

  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('O que é possível acessar clicando no canto inferior direito da tela no Chrome OS?');
  q11.setChoices([
    q11.createChoice('Wi-Fi, bateria, volume e notificações do sistema', true),
    q11.createChoice('Google Drive e documentos recentes', false),
    q11.createChoice('Histórico de navegação do Chrome', false),
    q11.createChoice('Configurações de impressora e scanner', false)
  ]);
  q11.setPoints(1);
  q11.setRequired(true);

  // ── BLOCO 4: GOOGLE DRIVE ────────────────────────────────────

  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('Como acessar o Google Drive no Chromebook?');
  q12.setChoices([
    q12.createChoice('Pelo endereço drive.google.com ou pelo Launcher no aplicativo Drive', true),
    q12.createChoice('Apenas pelo aplicativo instalado localmente', false),
    q12.createChoice('Somente por pen drive com atalho salvo', false),
    q12.createChoice('Pelo menu Iniciar do Chrome OS', false)
  ]);
  q12.setPoints(1);
  q12.setRequired(true);

  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('Como criar uma nova pasta no Google Drive?');
  q13.setChoices([
    q13.createChoice('Clicar em "+ Novo" e depois em "Pasta"', true),
    q13.createChoice('Pressionar Ctrl+N no teclado', false),
    q13.createChoice('Clicar com botão direito na área de trabalho', false),
    q13.createChoice('Acessar o menu "Arquivo" → "Nova Pasta"', false)
  ]);
  q13.setPoints(1);
  q13.setRequired(true);

  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('Por que os documentos do Google não precisam do Ctrl+S para salvar?');
  q14.setChoices([
    q14.createChoice('Porque são salvos automaticamente na nuvem em tempo real', true),
    q14.createChoice('Porque o Chrome OS salva automaticamente no HD local', false),
    q14.createChoice('Porque o Google Drive faz backup apenas ao fechar o documento', false),
    q14.createChoice('Porque os arquivos ficam na memória RAM até o desligamento', false)
  ]);
  q14.setPoints(1);
  q14.setRequired(true);

  var q15 = form.addMultipleChoiceItem();
  q15.setTitle('Como compartilhar um arquivo do Google Drive com o professor?');
  q15.setChoices([
    q15.createChoice('Clicar em "Compartilhar", inserir o e-mail do professor e clicar em "Enviar"', true),
    q15.createChoice('Baixar o arquivo e enviar por WhatsApp', false),
    q15.createChoice('Copiar o arquivo para um pen drive e entregar pessoalmente', false),
    q15.createChoice('Imprimir o arquivo e entregar na próxima aula', false)
  ]);
  q15.setPoints(1);
  q15.setRequired(true);

  // ── BLOCO 5: GOOGLE WORKSPACE ────────────────────────────────

  var q16 = form.addMultipleChoiceItem();
  q16.setTitle('Qual aplicativo do Google Workspace equivale ao Microsoft Word?');
  q16.setChoices([
    q16.createChoice('Google Docs', true),
    q16.createChoice('Google Planilhas', false),
    q16.createChoice('Google Apresentações', false),
    q16.createChoice('Google Forms', false)
  ]);
  q16.setPoints(1);
  q16.setRequired(true);

  var q17 = form.addMultipleChoiceItem();
  q17.setTitle('Qual aplicativo do Google Workspace é equivalente ao Microsoft Excel?');
  q17.setChoices([
    q17.createChoice('Google Planilhas', true),
    q17.createChoice('Google Docs', false),
    q17.createChoice('Google Apresentações', false),
    q17.createChoice('Google Drive', false)
  ]);
  q17.setPoints(1);
  q17.setRequired(true);

  var q18 = form.addMultipleChoiceItem();
  q18.setTitle('Os aplicativos do Google Workspace precisam ser instalados no Chromebook?');
  q18.setChoices([
    q18.createChoice('Não — funcionam direto no navegador Chrome, sem instalação', true),
    q18.createChoice('Sim — precisam ser baixados da Chrome Web Store', false),
    q18.createChoice('Sim — precisam ser instalados via pen drive', false),
    q18.createChoice('Depende do aplicativo — alguns precisam de instalação', false)
  ]);
  q18.setPoints(1);
  q18.setRequired(true);

  var q19 = form.addMultipleChoiceItem();
  q19.setTitle('O que significa "edição simultânea" nos aplicativos do Google Workspace?');
  q19.setChoices([
    q19.createChoice('Professor e aluno podem editar o mesmo arquivo ao mesmo tempo', true),
    q19.createChoice('O arquivo pode ser editado em dois computadores diferentes, mas não ao mesmo tempo', false),
    q19.createChoice('Apenas o dono do arquivo pode fazer alterações', false),
    q19.createChoice('O sistema salva duas versões diferentes do arquivo', false)
  ]);
  q19.setPoints(1);
  q19.setRequired(true);

  // ── BLOCO 6: NAVEGADOR E DICAS ───────────────────────────────

  var q20 = form.addMultipleChoiceItem();
  q20.setTitle('Para que serve a "barra de endereço (omnibox)" no Chrome?');
  q20.setChoices([
    q20.createChoice('Serve tanto para digitar endereços (URLs) quanto para realizar pesquisas', true),
    q20.createChoice('Serve apenas para digitar endereços de sites', false),
    q20.createChoice('É usada somente para acessar o Google Drive', false),
    q20.createChoice('Mostra apenas o histórico de navegação', false)
  ]);
  q20.setPoints(1);
  q20.setRequired(true);

  var q21 = form.addMultipleChoiceItem();
  q21.setTitle('O que é uma "aba anônima" no Chrome?');
  q21.setChoices([
    q21.createChoice('Não salva histórico nem cookies — indicada para navegação privada com cautela', true),
    q21.createChoice('Permite navegar mais rápido sem carregar imagens', false),
    q21.createChoice('É uma aba exclusiva para uso educacional', false),
    q21.createChoice('Salva automaticamente todos os sites visitados', false)
  ]);
  q21.setPoints(1);
  q21.setRequired(true);

  var q22 = form.addMultipleChoiceItem();
  q22.setTitle('Qual atalho de teclado abre uma nova aba no Chrome?');
  q22.setChoices([
    q22.createChoice('Ctrl+T', true),
    q22.createChoice('Ctrl+N', false),
    q22.createChoice('Ctrl+A', false),
    q22.createChoice('Ctrl+P', false)
  ]);
  q22.setPoints(1);
  q22.setRequired(true);

  var q23 = form.addMultipleChoiceItem();
  q23.setTitle('Qual atalho desfaz a última ação realizada no Chromebook?');
  q23.setChoices([
    q23.createChoice('Ctrl+Z', true),
    q23.createChoice('Ctrl+X', false),
    q23.createChoice('Ctrl+D', false),
    q23.createChoice('Ctrl+S', false)
  ]);
  q23.setPoints(1);
  q23.setRequired(true);

  var q24 = form.addMultipleChoiceItem();
  q24.setTitle('O que deve ser feito ao encontrar um problema no Chromebook durante a aula?');
  q24.setChoices([
    q24.createChoice('Avisar o professor imediatamente sem tentar resolver sozinho', true),
    q24.createChoice('Desligar e religar o equipamento várias vezes', false),
    q24.createChoice('Formatar o sistema operacional para corrigir o erro', false),
    q24.createChoice('Abrir o gabinete e verificar os componentes internos', false)
  ]);
  q24.setPoints(1);
  q24.setRequired(true);

  var q25 = form.addMultipleChoiceItem();
  q25.setTitle('Por que não se deve comer ou beber próximo ao Chromebook?');
  q25.setChoices([
    q25.createChoice('Para evitar danos físicos ao equipamento, que é patrimônio da escola', true),
    q25.createChoice('Porque o Chrome OS detecta líquidos e desliga automaticamente', false),
    q25.createChoice('Porque o teclado é sensível a odores de alimentos', false),
    q25.createChoice('Porque o regulamento proíbe qualquer alimento na área de TI', false)
  ]);
  q25.setPoints(1);
  q25.setRequired(true);

  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link de edição: ' + form.getEditUrl());
  Logger.log('🔗 Link para responder: ' + form.getPublishedUrl());
  Logger.log('📊 Total de questões: ' + form.getItems().length);
}
