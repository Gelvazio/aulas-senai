/**
 * QUESTIONÁRIO — MATEMÁTICA E RACIOCÍNIO LÓGICO
 * Rio do Sul Mais Tech · SENAI · Iniciação Profissional
 *
 * Como usar:
 *   1. Acesse https://script.google.com
 *   2. Crie um novo projeto (Arquivo > Novo projeto)
 *   3. Apague o código padrão e cole este arquivo inteiro
 *   4. Clique em "Executar" → criarFormulario
 *   5. Autorize as permissões solicitadas
 *   6. Ao final, o link do formulário aparece em Visualizar > Registros
 *
 * Questões extraídas de:
 *   ReforcoMatematicaRaciocinioLogico01.html  (Aulas 01 — Operações e Raciocínio)
 *   ReforcoMatematicaRaciocinioLogico02.html  (Aulas 02 — Frações, Razão e Proporção)
 *   ReforcoMatematicaRaciocinioLogico03.html  (Aulas 03 — Lógica Proposicional)
 *   ReforcoMatematicaRaciocinioLogico04.html  (Aulas 04 — Matemática Aplicada)
 */

function criarFormulario() {

  // ── Cria o formulário ─────────────────────────────────────────────────────
  var form = FormApp.create('Questionário — Matemática e Raciocínio Lógico | SENAI');

  form.setDescription(
    'Rio do Sul Mais Tech · SENAI · Iniciação Profissional\n' +
    'Questionário integrado das Atividades 01 a 04.\n' +
    'Leia cada enunciado com atenção. Mostre o raciocínio nas questões abertas.'
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);

  // ── IDENTIFICAÇÃO ─────────────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Identificação')
    .setHelpText('Preencha seus dados antes de começar.');

  form.addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Turma')
    .setRequired(true);

  form.addTextItem()
    .setTitle('LabTEC')
    .setRequired(false);

  // =========================================================================
  // PARTE 1 — OPERAÇÕES E CÁLCULO NUMÉRICO  (Atividade 01)
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('Parte 1 — Operações e Cálculo Numérico')
    .setHelpText('Questões 1 a 5 · baseadas na Atividade 01');

  // Q1 — Operação aritmética simples
  form.addParagraphTextItem()
    .setTitle('1. Resolva a operação e mostre o desenvolvimento:\n\n3.847 + 1.256 − 2.409 = ?')
    .setRequired(true);

  // Q2 — Problema de produção
  form.addParagraphTextItem()
    .setTitle(
      '2. Problema — Controle de Produção\n\n' +
      'Uma empresa produz 240 smartphones por dia. Em março houve 22 dias úteis de ' +
      'produção. O controle de qualidade reprova 5% da produção total.\n\n' +
      'a) Quantos smartphones foram produzidos no mês?\n' +
      'b) Quantos foram aprovados no controle de qualidade?\n' +
      'c) Quantos foram reprovados?'
    )
    .setHelpText('Mostre todos os cálculos.')
    .setRequired(true);

  // Q3 — Porcentagem: escolha da melhor opção
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle(
    '3. Porcentagem — Qual é a melhor opção de compra?\n\n' +
    'Um notebook custa R$ 3.800,00. A loja oferece:\n' +
    '• Opção A: 12% de desconto à vista\n' +
    '• Opção B: 3 parcelas de R$ 1.330,00 (sem juros)\n\n' +
    'Calcule o valor final de cada opção. Qual é mais vantajosa para o comprador?'
  )
  .setChoices([
    q3.createChoice('Opção A (à vista com desconto — valor final: R$ 3.344,00) — é mais barata'),
    q3.createChoice('Opção B (parcelado — valor final: R$ 3.990,00) — é mais barata'),
    q3.createChoice('As duas opções custam o mesmo valor final'),
    q3.createChoice('Não é possível determinar sem mais informações')
  ])
  .setRequired(true);

  // Q4 — Sequências numéricas (três sequências)
  form.addParagraphTextItem()
    .setTitle(
      '4. Sequências Numéricas — complete os espaços e escreva a regra:\n\n' +
      'a) 4, 7, 12, 19, 28, ___, ___     Regra: ___________\n' +
      'b) 256, 128, 64, 32, ___, ___     Regra: ___________\n' +
      'c) 1, 1, 2, 3, 5, 8, ___, ___    Regra: ___________'
    )
    .setHelpText('Escreva os dois próximos termos de cada sequência e descreva o padrão.')
    .setRequired(true);

  // Q5 — Conjuntos: computadores do LabTEC
  form.addParagraphTextItem()
    .setTitle(
      '5. Conjuntos — Computadores do LabTEC\n\n' +
      'O LabTEC tem 30 computadores numerados de 1 a 30.\n' +
      '• Grupo de Programação usa os múltiplos de 4.\n' +
      '• Grupo de Redes usa os múltiplos de 6.\n\n' +
      'a) Liste os computadores do grupo de Programação.\n' +
      'b) Liste os computadores do grupo de Redes.\n' +
      'c) Quais computadores são usados pelos dois grupos ao mesmo tempo?\n' +
      'd) Quantos computadores ficam disponíveis para outros alunos?'
    )
    .setRequired(true);

  // =========================================================================
  // PARTE 2 — FRAÇÕES, RAZÃO E PROPORÇÃO  (Atividade 02)
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('Parte 2 — Frações, Razão e Proporção')
    .setHelpText('Questões 6 a 9 · baseadas na Atividade 02');

  // Q6 — Operações com frações
  form.addParagraphTextItem()
    .setTitle(
      '6. Resolva as operações com frações e simplifique o resultado:\n\n' +
      'a) 3/4 + 1/6 =\n' +
      'b) 5/8 × 4/3 =\n' +
      'c) 7/9 − 1/3 ='
    )
    .setHelpText('Mostre o desenvolvimento completo.')
    .setRequired(true);

  // Q7 — Energia elétrica
  form.addParagraphTextItem()
    .setTitle(
      '7. Consumo de Energia Elétrica\n\n' +
      'O LabTEC tem 20 computadores que consomem 0,3 kWh/hora cada. ' +
      'Em uma semana de aula ficam ligados 6 horas/dia por 5 dias. ' +
      'A tarifa é R$ 0,85 por kWh.\n\n' +
      'a) Qual é o consumo total (kWh) de todos os computadores na semana?\n' +
      'b) Qual é o custo total de energia dessa semana?\n' +
      'c) Se o LabTEC funcionar 4 semanas por mês, qual é o gasto mensal estimado?'
    )
    .setHelpText('Mostre todos os cálculos.')
    .setRequired(true);

  // Q8 — Regra de três
  form.addParagraphTextItem()
    .setTitle(
      '8. Regra de Três Simples — Impressora\n\n' +
      'Uma impressora imprime 45 páginas em 3 minutos.\n\n' +
      'a) Quantas páginas ela imprime em 11 minutos?\n' +
      'b) Quantos minutos são necessários para imprimir 270 páginas?\n' +
      'c) Com 4 impressoras iguais, quanto tempo para imprimir 1.080 páginas? ' +
      'Explique por que essa situação é uma proporção inversa.'
    )
    .setRequired(true);

  // Q9 — Conjuntos (múltipla escolha)
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle(
    '9. Conjuntos — Cursos Extras\n\n' +
    'Em uma turma de 40 alunos: 24 querem fazer Python, 18 querem Robótica e ' +
    '10 querem fazer os dois cursos.\n\n' +
    'Quantos alunos NÃO querem nenhum dos dois cursos?'
  )
  .setChoices([
    q9.createChoice('8 alunos'),
    q9.createChoice('6 alunos'),
    q9.createChoice('4 alunos'),
    q9.createChoice('2 alunos')
  ])
  .setRequired(true);

  // =========================================================================
  // PARTE 3 — LÓGICA PROPOSICIONAL  (Atividade 03)
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('Parte 3 — Lógica Proposicional')
    .setHelpText('Questões 10 a 15 · baseadas na Atividade 03');

  // Q10 — V/F: par e divisível por 4
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('10. Verdadeiro ou Falso?\n\n"Todo número par é divisível por 4."')
  .setChoices([
    q10.createChoice('Verdadeiro — par significa divisível por 2, e 2 × 2 = 4'),
    q10.createChoice('Falso — por exemplo, 6 é par mas não é divisível por 4'),
    q10.createChoice('Depende do número analisado'),
    q10.createChoice('Verdadeiro apenas para números acima de 10')
  ])
  .setRequired(true);

  // Q11 — V/F: soma de ímpares
  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('11. Verdadeiro ou Falso?\n\n"A soma de dois números ímpares é sempre par."')
  .setChoices([
    q11.createChoice('Verdadeiro — ímpar + ímpar = par (sempre)'),
    q11.createChoice('Falso — depende dos números escolhidos'),
    q11.createChoice('Falso — ímpar + ímpar = ímpar'),
    q11.createChoice('Verdadeiro apenas para ímpares consecutivos')
  ])
  .setRequired(true);

  // Q12 — Negação de proposições
  form.addParagraphTextItem()
    .setTitle(
      '12. Negação de Proposições — escreva a negação correta de cada afirmação:\n\n' +
      'a) "Todos os computadores do LabTEC estão ligados."\n' +
      'b) "Nenhum aluno foi reprovado na atividade."\n' +
      'c) "O sistema funciona corretamente."\n' +
      'd) "Existe pelo menos um programa sem erro de código."'
    )
    .setHelpText('Aplique corretamente a regra de negação de quantificadores (todo/nenhum/existe).')
    .setRequired(true);

  // Q13 — Proposição condicional
  form.addParagraphTextItem()
    .setTitle(
      '13. Proposição Condicional (P → Q)\n\n' +
      '"No SENAI, todo aluno que participa de todas as aulas recebe o certificado."\n' +
      'P = "O aluno participa de todas as aulas"   Q = "O aluno recebe o certificado"\n\n' +
      'a) Qual é a hipótese (P) e qual é a conclusão (Q)?\n' +
      'b) Maria participou de todas as aulas. Ela receberá o certificado? Justifique.\n' +
      'c) Carlos recebeu o certificado. Podemos afirmar que participou de todas as aulas? Explique.\n' +
      'd) Ana não recebeu o certificado. O que podemos concluir sobre sua participação?'
    )
    .setHelpText('Use o raciocínio da lógica proposicional.')
    .setRequired(true);

  // Q14 — P ∧ Q
  var q14 = form.addMultipleChoiceItem();
  q14.setTitle('14. Operador E Lógico\n\n"Se P é verdadeiro e Q é falso, a proposição P ∧ Q (P E Q) é:"')
  .setChoices([
    q14.createChoice('Verdadeiro — basta um ser verdadeiro para o E ser verdadeiro'),
    q14.createChoice('Falso — P ∧ Q só é verdadeiro quando ambos P e Q são verdadeiros'),
    q14.createChoice('Verdadeiro — o E lógico retorna o valor de P'),
    q14.createChoice('Indeterminado sem mais informações')
  ])
  .setRequired(true);

  // Q15 — Enigma lógico (Atividade 03, Ex 05)
  var q15 = form.addMultipleChoiceItem();
  q15.setTitle(
    '15. Enigma Lógico — Projetos do LabTEC\n\n' +
    'Ana, Bruno, Carlos e Dani desenvolvem projetos: Site, App, Jogo e Robô (um cada).\n' +
    'Pistas:\n' +
    '1. Ana não desenvolve o Site.\n' +
    '2. Bruno desenvolve o App.\n' +
    '3. Carlos não desenvolve nem o Jogo nem o Robô.\n' +
    '4. Dani não trabalha com Robô.\n' +
    '5. Dani não desenvolve o App.\n\n' +
    'Qual é o projeto de Ana?'
  )
  .setChoices([
    q15.createChoice('Site'),
    q15.createChoice('App'),
    q15.createChoice('Jogo'),
    q15.createChoice('Robô')
  ])
  .setRequired(true);

  // =========================================================================
  // PARTE 4 — MATEMÁTICA APLICADA E DESAFIOS  (Atividade 04)
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('Parte 4 — Matemática Aplicada e Desafios')
    .setHelpText('Questões 16 a 20 · baseadas na Atividade 04');

  // Q16 — Porcentagem e parcelamento
  form.addParagraphTextItem()
    .setTitle(
      '16. Porcentagem e Parcelamento\n\n' +
      'Carla quer comprar um notebook por R$ 3.200,00. A loja oferece 15% de desconto ' +
      'à vista ou parcelamento em 4 prestações iguais sem juros (calculadas sobre o valor ' +
      'com desconto).\n\n' +
      'a) Qual é o valor do desconto concedido?\n' +
      'b) Qual é o preço à vista após o desconto?\n' +
      'c) Qual o valor de cada parcela?'
    )
    .setHelpText('Mostre os cálculos.')
    .setRequired(true);

  // Q17 — Probabilidade (múltipla escolha)
  var q17 = form.addMultipleChoiceItem();
  q17.setTitle(
    '17. Probabilidade Básica\n\n' +
    'Em uma turma de tecnologia: 12 escolheram Python, 8 escolheram JavaScript e ' +
    '5 escolheram C++. Um aluno é sorteado aleatoriamente.\n\n' +
    'Qual a probabilidade de o aluno sorteado ter escolhido Python? (expresse como fração)'
  )
  .setChoices([
    q17.createChoice('12/25'),
    q17.createChoice('12/20'),
    q17.createChoice('6/25'),
    q17.createChoice('2/5')
  ])
  .setRequired(true);

  // Q18 — Média, moda e mediana
  form.addParagraphTextItem()
    .setTitle(
      '18. Média, Moda e Mediana\n\n' +
      'As notas de Pedro em 7 provas do SENAI foram: 6, 8, 7, 10, 6, 9, 8.\n\n' +
      'a) Calcule a média aritmética das notas.\n' +
      'b) Ordene as notas do menor ao maior e indique a mediana.\n' +
      'c) Qual é a moda desse conjunto de notas? Justifique.'
    )
    .setRequired(true);

  // Q19 — Sequências (Atividade 04)
  form.addParagraphTextItem()
    .setTitle(
      '19. Sequências Numéricas — identifique o padrão e complete:\n\n' +
      'a) 1, 1, 2, 3, 5, 8, ___     Regra: ___________\n' +
      'b) 100, 50, 25, 12,5, ___   Regra: ___________\n' +
      'c) 2, 5, 10, 17, 26, ___    Regra: ___________\n' +
      'd) 1, 3, 7, 15, 31, ___     Regra: ___________'
    )
    .setHelpText('Escreva o próximo elemento e explique a regra de cada sequência.')
    .setRequired(true);

  // Q20 — Diagrama de Venn com três conjuntos
  form.addParagraphTextItem()
    .setTitle(
      '20. Diagrama de Euler-Venn — Três Conjuntos\n\n' +
      'Em pesquisa com 30 alunos do SENAI sobre dispositivos usados em casa:\n' +
      '• 15 usam Notebook (N)   • 12 usam Smartphone (S)   • 10 usam Tablet (T)\n' +
      '• 5 usam N e S   • 4 usam N e T   • 3 usam S e T   • 2 usam os três\n\n' +
      'a) Quantos alunos usam somente Notebook (sem Smartphone nem Tablet)?\n' +
      'b) Quantos alunos usam Notebook e Smartphone, mas NÃO usam Tablet?\n' +
      'c) Quantos alunos usam pelo menos um dos três dispositivos?\n' +
      'd) Quantos alunos não usam nenhum dos três dispositivos?'
    )
    .setHelpText('Use a fórmula de união de conjuntos. Mostre o desenvolvimento.')
    .setRequired(true);

  // ── Exibe os links no log ─────────────────────────────────────────────────
  Logger.log('=== FORMULÁRIO CRIADO COM SUCESSO ===');
  Logger.log('Título: ' + form.getTitle());
  Logger.log('Total de itens: ' + form.getItems().length);
  Logger.log('');
  Logger.log('🔗 Link para RESPONDER: ' + form.getPublishedUrl());
  Logger.log('✏️  Link para EDITAR:   ' + form.getEditUrl());
  Logger.log('');
  Logger.log('Copie o link "para RESPONDER" e compartilhe com os alunos.');

  return {
    publicUrl: form.getPublishedUrl(),
    editUrl: form.getEditUrl()
  };
}
