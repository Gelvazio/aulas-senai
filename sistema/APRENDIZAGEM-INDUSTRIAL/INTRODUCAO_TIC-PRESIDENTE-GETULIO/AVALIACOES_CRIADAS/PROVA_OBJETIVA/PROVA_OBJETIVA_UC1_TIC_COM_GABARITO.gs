/**
 * ============================================================
 *  AVALIAÇÃO OBJETIVA — UC1 Introdução à TIC
 *  SENAI — Aprendizagem Industrial | AI OPIR 2026/2 V1
 *  Docente: Gelvazio Camargo
 * ============================================================
 *
 *  COMO USAR:
 *  1. Acesse script.google.com e crie um novo projeto
 *  2. Apague o código existente e cole este script completo
 *  3. Salve (Ctrl+S)
 *  4. Execute: clique em "Executar" com a função criarProvaUC1TIC selecionada
 *  5. Autorize o acesso quando solicitado (necessário apenas na 1ª vez)
 *  6. Aguarde. No menu "Visualizar > Registros" aparecerão os links do formulário
 *
 *  PONTUAÇÃO:
 *  O Google Forms registra pontuação como inteiros. Cada questão vale 1 ponto
 *  (total: 20 pontos). Para converter para a escala SENAI (0 a 10), divida por 2.
 *  Ex.: aluno acertou 16/20 → nota final = 8,0
 * ============================================================
 */

function criarProvaUC1TIC() {

  // ── Cria o formulário ───────────────────────────────────────
  var form = FormApp.create('AVALIAÇÃO OBJETIVA — UC1 Introdução à TIC');

  form.setTitle('AVALIAÇÃO OBJETIVA\nIntrodução à Tecnologia da Informação e Comunicação');

  form.setDescription(
    'SENAI — Aprendizagem Industrial\n' +
    'Curso: Operador de Produção Industrial\n' +
    'Unidade Curricular: Introdução à TIC | Turma: AI OPIR 2026/2 V1\n' +
    'Docente: Gelvazio Camargo\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    'INSTRUÇÕES AO ESTUDANTE\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '• Esta avaliação contém 20 questões de múltipla escolha.\n' +
    '• Cada questão vale 0,5 ponto (total: 10,0 pontos).\n' +
    '• Leia atentamente a situação antes de responder o comando de cada item.\n' +
    '• Marque apenas uma alternativa por questão.\n' +
    '• Não é permitida consulta a materiais ou dispositivos eletrônicos.\n\n' +
    'Observação: A pontuação exibida ao final estará na escala de 0 a 20.\n' +
    'Para obter a nota final (0 a 10), divida a pontuação por 2.\n' +
    'Exemplo: 16 pontos ÷ 2 = nota 8,0'
  );

  // ── Configura o modo quiz (prova com gabarito automático) ───
  form.setIsQuiz(true);
  form.setShowLinkToRespondAgain(false);
  form.setLimitOneResponsePerUser(false);
  form.setShuffleQuestions(false);

  // Mensagem exibida ao aluno após enviar as respostas
  form.setConfirmationMessage(
    'Avaliação enviada com sucesso!\n\n' +
    'Sua pontuação aparece abaixo na escala de 0 a 20.\n' +
    'Para calcular sua nota final (0 a 10): divida a pontuação por 2.\n\n' +
    'Exemplo: 14 pontos ÷ 2 = nota 7,0\n\n' +
    'Bom trabalho! — Prof. Gelvazio Camargo'
  );

  // ── Dados das questões ──────────────────────────────────────
  // correta: índice da alternativa correta (0 = a, 1 = b, 2 = c, 3 = d)

  var questoes = [

    // ─── C1 — Comunicação ───────────────────────────────────
    {
      num: '01', cap: 'C1',
      situacao: 'Durante uma reunião de trabalho, dois integrantes da equipe apresentam opiniões diferentes sobre a melhor forma de executar determinada atividade.',
      comando: 'Para buscar uma solução adequada, a atitude mais apropriada é:',
      alternativas: [
        'a) Ignorar a opinião divergente para evitar conflitos.',
        'b) Defender a própria opinião até que os demais concordem.',
        'c) Ouvir os envolvidos, analisar os argumentos e buscar uma solução consensual.',
        'd) Encerrar a discussão e deixar que cada integrante execute a atividade como preferir.'
      ],
      correta: 2
    },

    {
      num: '02', cap: 'C1',
      situacao: 'Um profissional precisa comunicar à equipe que houve alteração no horário de uma atividade.',
      comando: 'Para garantir uma comunicação clara e eficaz, a mensagem deve:',
      alternativas: [
        'a) Utilizar informações incompletas para ser mais rápida.',
        'b) Apresentar a informação de forma objetiva, clara e adequada ao público.',
        'c) Utilizar exclusivamente termos técnicos, independentemente de quem receberá a mensagem.',
        'd) Evitar qualquer possibilidade de confirmação ou retorno dos destinatários.'
      ],
      correta: 1
    },

    // ─── C2 — Segurança da Informação ───────────────────────
    {
      num: '03', cap: 'C2',
      situacao: 'Um colaborador recebe uma mensagem informando que sua conta corporativa será bloqueada caso ele não clique imediatamente em um link e informe sua senha.',
      comando: 'O comportamento mais seguro diante dessa situação é:',
      alternativas: [
        'a) Clicar no link e informar os dados para evitar o bloqueio.',
        'b) Encaminhar a mensagem aos colegas para verificar se também receberam.',
        'c) Verificar a autenticidade da mensagem por um canal oficial antes de fornecer qualquer informação.',
        'd) Responder à mensagem solicitando que o remetente envie a senha correta.'
      ],
      correta: 2
    },

    {
      num: '04', cap: 'C2',
      situacao: 'Uma organização deseja proteger suas informações contra acesso não autorizado e precisa adotar uma política de senhas adequada.',
      comando: 'Entre as práticas abaixo, a mais adequada é:',
      alternativas: [
        'a) Utilizar a mesma senha em todos os sistemas.',
        'b) Compartilhar senhas com colegas de confiança.',
        'c) Utilizar senhas fortes e autenticação em dois fatores quando disponível.',
        'd) Anotar as senhas em um arquivo público para facilitar o acesso.'
      ],
      correta: 2
    },

    {
      num: '05', cap: 'C2',
      situacao: 'Uma empresa mantém três cópias de seus dados, utiliza dois tipos diferentes de mídia e mantém uma das cópias em local separado do ambiente principal de trabalho.',
      comando: 'Essa prática está relacionada à:',
      alternativas: [
        'a) Regra 3-2-1 de backup.',
        'b) Política de atualização de navegadores.',
        'c) Autenticação por senha simples.',
        'd) Configuração de impressão de documentos.'
      ],
      correta: 0
    },

    {
      num: '06', cap: 'C2',
      situacao: 'Um funcionário recebeu um arquivo malicioso que bloqueou o acesso aos documentos do computador e exigiu pagamento para liberar os arquivos.',
      comando: 'Esse tipo de ataque é característico de:',
      alternativas: [
        'a) Adware.',
        'b) Ransomware.',
        'c) Navegador.',
        'd) Compactador de arquivos.'
      ],
      correta: 1
    },

    {
      num: '07', cap: 'C2',
      situacao: 'No contexto de uma organização, a equipe de TI orienta os colaboradores sobre o tratamento adequado de dados pessoais, conforme os princípios da LGPD (Lei Geral de Proteção de Dados).',
      comando: 'Uma prática adequada ao tratamento de dados pessoais é:',
      alternativas: [
        'a) Coletar e compartilhar qualquer dado pessoal sem necessidade de justificativa.',
        'b) Utilizar dados pessoais de maneira responsável e conforme as finalidades estabelecidas.',
        'c) Disponibilizar dados pessoais de colaboradores para qualquer pessoa da organização.',
        'd) Armazenar informações pessoais sem qualquer controle de acesso.'
      ],
      correta: 1
    },

    // ─── C5 — Internet e WEB ────────────────────────────────
    {
      num: '08', cap: 'C5',
      situacao: 'Um profissional precisa localizar na Internet informações específicas sobre um equipamento industrial e deseja obter resultados mais precisos na pesquisa.',
      comando: 'A estratégia mais adequada para realizar essa pesquisa é:',
      alternativas: [
        'a) Utilizar somente a primeira página de resultados apresentada pelo buscador.',
        'b) Utilizar palavras-chave adequadas e operadores de pesquisa quando necessário.',
        'c) Pesquisar apenas em redes sociais.',
        'd) Utilizar qualquer resultado sem verificar sua origem.'
      ],
      correta: 1
    },

    {
      num: '09', cap: 'C5',
      situacao: 'Um profissional precisa enviar um e-mail a diferentes integrantes de sua equipe comunicando uma mudança de procedimento no setor.',
      comando: 'Ao redigir essa mensagem, o remetente deve:',
      alternativas: [
        'a) Utilizar assunto relacionado ao conteúdo e escrever a mensagem de maneira clara e objetiva.',
        'b) Deixar o campo de assunto vazio para reduzir o tamanho da mensagem.',
        'c) Escrever toda a mensagem em letras maiúsculas.',
        'd) Utilizar linguagem informal independentemente do contexto profissional.'
      ],
      correta: 0
    },

    {
      num: '10', cap: 'C5',
      situacao: 'Um colaborador precisa compartilhar um documento de trabalho com integrantes de uma equipe que atuam em locais diferentes, garantindo que todos possam acessar e editar o arquivo com controle de acesso.',
      comando: 'A solução mais adequada para esse cenário é:',
      alternativas: [
        'a) Armazenamento em nuvem com compartilhamento controlado.',
        'b) Exclusivamente uma unidade de armazenamento local sem possibilidade de acesso remoto.',
        'c) Mensagens instantâneas sem controle sobre o arquivo.',
        'd) Qualquer site público de armazenamento, independentemente de suas configurações de segurança.'
      ],
      correta: 0
    },

    // ─── C3 — Textos Técnicos e Ferramentas ─────────────────
    {
      num: '11', cap: 'C3',
      situacao: 'Um documento técnico apresenta um gráfico acompanhado da informação: "O aumento das falhas ocorreu principalmente no segundo trimestre."',
      comando: 'Para interpretar corretamente essa informação, o profissional deve:',
      alternativas: [
        'a) Analisar os dados apresentados e relacioná-los ao período indicado no gráfico.',
        'b) Considerar apenas o título do gráfico.',
        'c) Ignorar os valores apresentados e utilizar sua opinião pessoal.',
        'd) Substituir os dados por informações encontradas em outra fonte.'
      ],
      correta: 0
    },

    {
      num: '12', cap: 'C3',
      situacao: 'Durante a leitura de um manual técnico de um equipamento industrial, um trabalhador encontra termos específicos que não fazem parte do seu vocabulário cotidiano.',
      comando: 'Para compreender corretamente o documento, é necessário:',
      alternativas: [
        'a) Desconsiderar os termos técnicos e interpretar apenas as imagens.',
        'b) Identificar o significado dos termos considerando o contexto técnico apresentado.',
        'c) Substituir todos os termos técnicos por expressões informais.',
        'd) Interpretar cada termo isoladamente, sem considerar o restante do documento.'
      ],
      correta: 1
    },

    // ─── C4 — Hardware e Sistema Operacional ────────────────
    {
      num: '13', cap: 'C4',
      situacao: 'Em uma indústria, um técnico de informática precisa identificar o componente de um computador responsável por processar todas as instruções e executar os cálculos necessários para o funcionamento das aplicações industriais.',
      comando: 'O componente de hardware que desempenha essa função é:',
      alternativas: [
        'a) CPU (Unidade Central de Processamento).',
        'b) Memória RAM.',
        'c) Impressora.',
        'd) Placa de saída de áudio.'
      ],
      correta: 0
    },

    {
      num: '14', cap: 'C4',
      situacao: 'Um computador utilizado no setor de produção apresenta lentidão quando vários programas estão abertos simultaneamente. O técnico responsável precisa identificar qual componente é diretamente responsável pela capacidade de manter dados e programas em uso de forma temporária.',
      comando: 'O componente relacionado a esse desempenho é:',
      alternativas: [
        'a) CPU (Processador).',
        'b) Memória RAM.',
        'c) Impressora.',
        'd) Webcam.'
      ],
      correta: 1
    },

    {
      num: '15', cap: 'C4',
      situacao: 'Um usuário precisa organizar documentos armazenados em um computador, criar pastas para separar arquivos por projeto, localizar arquivos e executar outras operações básicas de gerenciamento de arquivos.',
      comando: 'O recurso de software utilizado para realizar essas tarefas é, principalmente:',
      alternativas: [
        'a) O sistema operacional.',
        'b) O navegador de Internet.',
        'c) O editor de apresentações.',
        'd) O programa de reprodução de vídeos.'
      ],
      correta: 0
    },

    // ─── C3 — Ferramentas de Escritório ─────────────────────
    {
      num: '16', cap: 'C3',
      situacao: 'Um profissional precisa elaborar um relatório formal contendo título, subtítulos, tabela de dados e informações organizadas em diferentes seções, com formatação adequada às normas da empresa.',
      comando: 'O recurso computacional mais adequado para essa atividade é:',
      alternativas: [
        'a) Editor de textos.',
        'b) Navegador de Internet.',
        'c) Antivírus.',
        'd) Gerenciador de dispositivos.'
      ],
      correta: 0
    },

    {
      num: '17', cap: 'C3',
      situacao: 'Em uma planilha eletrônica, as células B2, B3 e B4 contêm respectivamente os valores 10, 20 e 30. Um profissional precisa calcular a soma total desses três valores utilizando uma função básica.',
      comando: 'A função correta para realizar esse cálculo é:',
      alternativas: [
        'a) =MÉDIA(B2:B4)',
        'b) =SE(B2:B4)',
        'c) =SOMA(B2:B4)',
        'd) =FILTRO(B2:B4)'
      ],
      correta: 2
    },

    {
      num: '18', cap: 'C3',
      situacao: 'Um profissional precisa apresentar os resultados de uma pesquisa interna para sua equipe de trabalho, utilizando um recurso que permita organizar o conteúdo em telas com títulos, imagens, gráficos e textos resumidos.',
      comando: 'O recurso mais adequado para essa apresentação é:',
      alternativas: [
        'a) Editor de apresentações.',
        'b) Gerenciador de arquivos.',
        'c) Sistema operacional.',
        'd) Aplicativo de compactação de arquivos.'
      ],
      correta: 0
    },

    // ─── C1 — Textos Técnicos e Elementos da Comunicação ───
    {
      num: '19', cap: 'C1',
      situacao: 'Após uma reunião de equipe, o supervisor solicitou que um profissional elaborasse um documento formal registrando os assuntos discutidos, as decisões tomadas e os responsáveis pelas tarefas definidas na reunião.',
      comando: 'O gênero textual técnico mais adequado para esse registro é:',
      alternativas: [
        'a) Ata.',
        'b) Anúncio publicitário.',
        'c) História em quadrinhos.',
        'd) Mensagem informal.'
      ],
      correta: 0
    },

    {
      num: '20', cap: 'C1/C3',
      situacao: 'Durante uma comunicação profissional, um trabalhador transmite uma informação para outro integrante da equipe. Ao receber a mensagem, o destinatário envia uma resposta confirmando que compreendeu o conteúdo.',
      comando: 'Considerando os elementos da comunicação, essa resposta é denominada:',
      alternativas: [
        'a) Canal.',
        'b) Código.',
        'c) Feedback.',
        'd) Ruído.'
      ],
      correta: 2
    }

  ]; // fim do array questoes

  // ── Adiciona as questões ao formulário ──────────────────────
  questoes.forEach(function(q) {

    var titulo = 'ITEM ' + q.num + '  —  ' + q.cap + '\n\n' +
                 'Situação: ' + q.situacao + '\n\n' +
                 'Comando: ' + q.comando;

    var item = form.addMultipleChoiceItem();
    item.setTitle(titulo);
    item.setRequired(true);
    item.setPoints(1); // 1 ponto por questão (÷2 para escala 0-10)

    var choices = q.alternativas.map(function(alt, idx) {
      return item.createChoice(alt, idx === q.correta);
    });
    item.setChoices(choices);

    // Feedback exibido ao aluno após correção
    var fb = FormApp.createFeedback();
    fb.setText('Resposta correta: ' + q.alternativas[q.correta]);
    item.setFeedbackForCorrect(fb.build());

    var fbErro = FormApp.createFeedback();
    fbErro.setText('Resposta correta: ' + q.alternativas[q.correta]);
    item.setFeedbackForIncorrect(fbErro.build());

  });

  // ── Exibe os links no Log ───────────────────────────────────
  Logger.log('==========================================');
  Logger.log('Formulário criado com sucesso!');
  Logger.log('==========================================');
  Logger.log('Link para os alunos responderem:');
  Logger.log(form.getPublishedUrl());
  Logger.log('');
  Logger.log('Link para editar o formulário:');
  Logger.log(form.getEditUrl());
  Logger.log('');
  Logger.log('Link para ver as respostas:');
  Logger.log('https://docs.google.com/forms/d/' + form.getId() + '/viewanalytics');
  Logger.log('==========================================');
  Logger.log('PONTUAÇÃO: 1 pt por questão | Total: 20 pts');
  Logger.log('Para nota 0-10: divida a pontuação por 2');
  Logger.log('==========================================');

  // Abre o formulário no navegador automaticamente (opcional)
  // FormApp.openById(form.getId()); // descomente se desejar abrir automaticamente
}
