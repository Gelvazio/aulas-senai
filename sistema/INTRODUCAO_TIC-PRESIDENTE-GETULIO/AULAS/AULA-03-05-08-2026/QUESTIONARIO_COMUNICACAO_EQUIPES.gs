/**
 * QUESTIONÁRIO — Comunicação em Equipes de Trabalho
 * Aula 02 · UC1 Introdução à TIC · SENAI
 *
 * Como usar:
 *   1. Acesse script.google.com e crie um novo projeto
 *   2. Cole este código e execute a função criarFormulario()
 *   3. Autorize as permissões solicitadas
 *   4. O link do formulário será exibido no console (Ctrl+Enter para ver)
 *   5. Copie o link e atualize o campo "arquivo" na Supabase (tabela curso, materias)
 */

function criarFormulario() {
  const form = FormApp.create('Questionário — Comunicação em Equipes de Trabalho · Aula 02 · SENAI');

  form.setDescription(
    'UC1 — Introdução à Tecnologia da Informação e Comunicação\n' +
    'Responda com atenção. Este questionário avalia o conteúdo da Aula 02 — Comunicação em Equipes.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShuffleQuestions(false);

  // ── Seção 1: Elementos da Comunicação ─────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Elementos da Comunicação')
    .setHelpText('Questões sobre os componentes do processo comunicativo.');

  form.addMultipleChoiceItem()
    .setTitle('1. Quem é o EMISSOR em um processo de comunicação?')
    .setChoiceValues([
      'Quem recebe e interpreta a mensagem',
      'Quem produz e envia a mensagem',
      'O meio pelo qual a mensagem é transmitida',
      'O conteúdo da mensagem'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('2. Um professor explica um conteúdo aos alunos usando um slides projetado. Nesse contexto, o CANAL de comunicação é:')
    .setChoiceValues([
      'O professor',
      'Os alunos',
      'O projetor e a tela',
      'O conteúdo explicado'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('3. O que é o RUÍDO em um processo de comunicação?')
    .setChoiceValues([
      'Um barulho alto que impede a fala',
      'Qualquer interferência que prejudique a compreensão da mensagem',
      'O tom de voz do emissor',
      'A resposta dada pelo receptor'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4. Você manda um áudio no WhatsApp e a pessoa responde. A resposta da pessoa é chamada de:')
    .setChoiceValues(['Mensagem', 'Canal', 'Feedback', 'Ruído'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('5. Qual é a função do CÓDIGO no processo de comunicação?')
    .setChoiceValues([
      'Proteger a mensagem com senha',
      'Ser o conjunto de sinais e regras usado para transmitir a mensagem (ex: idioma, sinais de trânsito)',
      'Armazenar mensagens antigas',
      'Identificar o emissor'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('6. Um colega de trabalho fala com você em inglês, mas você não entende o idioma. Qual elemento da comunicação está comprometido?')
    .setChoiceValues(['Canal', 'Emissor', 'Código', 'Receptor'])
    .setRequired(true);

  // ── Seção 2: Comunicação em Equipes ───────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Comunicação em Equipes de Trabalho')
    .setHelpText('Questões sobre dinâmica de equipes e trabalho colaborativo.');

  form.addMultipleChoiceItem()
    .setTitle('7. Qual é a principal diferença entre um GRUPO e uma EQUIPE de trabalho?')
    .setChoiceValues([
      'Um grupo tem mais pessoas do que uma equipe',
      'Na equipe há objetivo comum, interdependência e responsabilidade compartilhada; no grupo as pessoas trabalham de forma independente',
      'Uma equipe é sempre temporária; um grupo é permanente',
      'Não há diferença entre grupo e equipe'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('8. Durante uma reunião de equipe, um colega apresenta uma ideia diferente da sua. A atitude mais adequada é:')
    .setChoiceValues([
      'Interrompê-lo e apresentar imediatamente sua ideia como melhor',
      'Ignorar a ideia e seguir em frente',
      'Ouvir com atenção, avaliar os pontos positivos e contribuir de forma construtiva',
      'Concordar por educação, mesmo discordando'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('9. O que é ESCUTA ATIVA?')
    .setChoiceValues([
      'Ouvir música enquanto trabalha para aumentar a concentração',
      'Prestar atenção plena ao que o outro diz, demonstrando interesse e compreensão',
      'Tomar notas de tudo que é falado em uma reunião',
      'Aguardar o outro terminar de falar para apresentar sua opinião'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('10. A busca por CONSENSO em uma equipe significa:')
    .setChoiceValues([
      'Que todos devem ter exatamente a mesma opinião',
      'Que a decisão é imposta pelo líder sem discussão',
      'Que a equipe chega a uma decisão aceitável para todos após diálogo e negociação',
      'Que a maioria vota e a minoria aceita sem participar'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('11. Qual das situações abaixo representa um CONFLITO CONSTRUTIVO em equipe?')
    .setChoiceValues([
      'Dois colegas brigam e param de se falar',
      'Uma discussão técnica sobre a melhor forma de resolver um problema gera uma solução inovadora',
      'Um membro da equipe boicota o trabalho dos outros',
      'O líder ignora as sugestões da equipe'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('12. Em um ambiente de trabalho, a ASSERTIVIDADE significa:')
    .setChoiceValues([
      'Ser agressivo para garantir seus direitos',
      'Ceder sempre para evitar conflitos',
      'Expressar opiniões e necessidades de forma clara, direta e respeitosa',
      'Nunca discordar de superiores'
    ])
    .setRequired(true);

  // ── Seção 3: Gestão de Conflitos ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Gestão de Conflitos e Comportamento Profissional')
    .setHelpText('Questões sobre resolução de conflitos no ambiente de trabalho.');

  form.addMultipleChoiceItem()
    .setTitle('13. Qual é a primeira atitude recomendada ao perceber um conflito na equipe?')
    .setChoiceValues([
      'Ignorar e esperar o problema se resolver sozinho',
      'Reclamar com o gestor imediatamente',
      'Identificar a causa do conflito e iniciar um diálogo direto com o envolvido',
      'Comentar o conflito com outros colegas para obter apoio'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('14. Um colega entregou um trabalho com erros que comprometem o projeto da equipe. Como você deve agir?')
    .setChoiceValues([
      'Refazer todo o trabalho sem avisar o colega',
      'Avisar ao gestor que o colega não sabe trabalhar',
      'Conversar diretamente com o colega, apontar os erros com respeito e oferecer ajuda',
      'Ignorar e entregar o projeto com os erros'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('15. Qual comportamento PREJUDICA a comunicação e o trabalho em equipe?')
    .setChoiceValues([
      'Dar feedback honesto e construtivo',
      'Compartilhar informações relevantes com todos',
      'Fofoca, boato e omissão de informações importantes',
      'Pedir ajuda quando necessário'
    ])
    .setRequired(true);

  // ── Seção 4: Níveis de Linguagem ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Níveis de Linguagem e Comunicação Profissional')
    .setHelpText('Questões sobre linguagem culta, técnica e comunicação no ambiente industrial.');

  form.addMultipleChoiceItem()
    .setTitle('16. Ao enviar um e-mail formal para um cliente, qual nível de linguagem deve ser usado?')
    .setChoiceValues([
      'Linguagem informal, pois é mais próxima e simpática',
      'Gírias e abreviações para parecer moderno',
      'Linguagem culta e formal, respeitando a norma padrão da língua',
      'Jargão técnico de fábrica, pois o cliente entende o setor'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('17. O que é JARGÃO no contexto profissional?')
    .setChoiceValues([
      'Uma gíria usada por jovens',
      'Um erro gramatical comum no ambiente de trabalho',
      'Termos técnicos específicos de uma área ou profissão',
      'Uma forma de comunicação não verbal'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('18. Você está em uma reunião formal com a diretoria da empresa. Qual das frases abaixo é mais adequada?')
    .setChoiceValues([
      '"Então, o negócio é assim: a produção tá uma bagunça."',
      '"Gostaria de relatar que identificamos gargalos no processo produtivo que impactam a eficiência."',
      '"Cara, a produção tá horrível, precisa arrumar logo."',
      '"Tô falando que tem problema na fábrica faz tempo."'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('19. Qual das opções abaixo NÃO é uma boa prática de comunicação escrita no trabalho?')
    .setChoiceValues([
      'Revisar o texto antes de enviar',
      'Usar linguagem clara e objetiva',
      'Escrever tudo em letras maiúsculas para dar ênfase',
      'Estruturar o texto com introdução, desenvolvimento e conclusão'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('20. A comunicação NÃO VERBAL inclui:')
    .setChoiceValues([
      'E-mails e mensagens de texto',
      'Relatórios técnicos escritos',
      'Expressões faciais, postura corporal e tom de voz',
      'Apresentações em PowerPoint'
    ])
    .setRequired(true);

  // ── Questão dissertativa ───────────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Parte 5 — Questão Dissertativa')
    .setHelpText('Responda com suas próprias palavras.');

  form.addParagraphTextItem()
    .setTitle('21. Descreva uma situação (real ou fictícia) em que a falta de comunicação clara causou um problema em uma equipe. Explique como esse problema poderia ter sido evitado usando os elementos da comunicação estudados em aula.')
    .setHelpText('Mínimo de 4 linhas. Identifique ao menos 2 elementos da comunicação no seu exemplo.')
    .setRequired(true);

  // ── Configurações finais ───────────────────────────────────────────────────

  form.setConfirmationMessage(
    'Parabéns! Suas respostas foram registradas. ' +
    'Lembre-se: a comunicação clara é a base de todo bom trabalho em equipe! 🤝 Bons estudos!'
  );

  const url = form.getPublishedUrl();
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 Link para os alunos: ' + url);
  Logger.log('⚙️  Link de edição: ' + form.getEditUrl());

  return url;
}
