// Conteudo da Apostila — Exploracao de Carreiras Industriais e Tecnologicas
// Blocos: ['h2',t] ['h3',t] ['p',t] ['li',[..]] ['num',[..]] ['img',arq,legenda]
//         ['box',tipo,titulo,[linhas]] ['tab',[larguras%],header,linhas] ['cod',t] ['linha']
// Tipos de box: exemplo | sabia | mito | atividade | desafio | sintese | alem | atencao | reflexao

const ENCONTROS = [
// =====================================================================
{
  n: 1, titulo: "Quem Sou Eu? Autoconhecimento Inicial", ch: "2 horas",
  icone: "🪞", tema: "DESCOBRIR",
  objetivos: [
    "Refletir sobre identidade, valores e interesses pessoais.",
    "Iniciar o processo de autoconhecimento como base para o planejamento de carreira.",
    "Reconhecer que não existe perfil “certo” — existe perfil autêntico."
  ],
  blocos: [
    ["h2", "Você é o ponto de partida"],
    ["p", "Antes de escolher uma profissão, você precisa se conhecer melhor. Parece óbvio, mas muita gente cresce sem nunca ter parado para pensar: “O que eu gosto de fazer?”, “O que me emociona?”, “O que me irrita?”, “Em quê sou bom ou boa?”."],
    ["p", "Autoconhecimento é a capacidade de entender seus próprios pensamentos, sentimentos, habilidades e limitações. É a base de qualquer planejamento de vida — inclusive o profissional. E, diferente de uma prova, aqui não existe gabarito."],
    ["p", "Existem pessoas que adoram trabalhar com as mãos, construindo e consertando coisas. Outras preferem criar códigos e resolver problemas lógicos. Algumas se destacam quando estão em contato com pessoas; outras rendem mais sozinhas, concentradas em um projeto. Não existe certo ou errado — existe o que é autêntico para cada um."],
    ["p", "A ciência chama isso de perfil de interesses. Pesquisadores como John Holland identificaram que as pessoas tendem a se sentir mais realizadas em profissões alinhadas com seu perfil. Conhecer o seu é um passo enorme."],
    ["img", "02_venn_autoconhecimento.png", "Figura 1 — O encontro entre o que você sabe fazer, o que você gosta e o que o mundo precisa costuma apontar um bom caminho de carreira."],
    ["box", "exemplo", "EXEMPLO REAL — três colegas, três caminhos", [
      "O Lucas passava as tardes desmontando o ventilador da avó para ver como funcionava por dentro. Hoje ele está no curso técnico de Mecânica e é o primeiro a ser chamado quando algo quebra na oficina.",
      "A Bianca organizava as planilhas do bazar da escola sem ninguém pedir. Descobriu que gostava de encontrar padrões em números — está estudando Análise de Dados.",
      "O Enzo era o que sempre acalmava as brigas do grupo do trabalho. Hoje trabalha como líder de equipe numa fábrica: a habilidade dele não era técnica, era gente.",
      "Nenhum dos três “nasceu sabendo”. Os três repararam no que já faziam naturalmente."
    ]],
    ["box", "sabia", "VOCÊ SABIA?", [
      "Segundo o psicólogo norte-americano John Holland, os interesses profissionais podem ser agrupados em seis grandes tipos: Realista (mão na massa), Investigativo (analisar e pesquisar), Artístico (criar), Social (ajudar pessoas), Empreendedor (liderar e vender) e Convencional (organizar). Quase ninguém é 100% de um tipo só — o normal é ser uma mistura de dois ou três."
    ]],
    ["box", "atividade", "ATIVIDADE 1 — Quem sou eu em 3 círculos", [
      "Desenhe três círculos sobrepostos (como um diagrama de Venn) e escreva em cada um:",
      "• Círculo 1 — O que eu SEI FAZER BEM (ex.: organizar, montar, programar, desenhar).",
      "• Círculo 2 — O que eu GOSTO de fazer (ex.: jogar, ajudar pessoas, criar coisas).",
      "• Círculo 3 — O que O MUNDO PRECISA (ex.: saúde, tecnologia, segurança, educação).",
      "A interseção dos três círculos pode revelar onde está a sua vocação. Compartilhe com um colega e discutam: vocês enxergam em você algo que você mesmo não escreveu?"
    ]],
    ["box", "desafio", "MINI-DESAFIO DA SEMANA", [
      "Pergunte a três pessoas diferentes (um familiar, um colega e um professor): “Na sua opinião, no que eu sou bom?”. Anote as três respostas sem discutir. Traga para o próximo encontro. Muitas vezes, os outros enxergam talentos que a gente acha que são “normais”."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 1", [
      "Autoconhecimento é o ponto de partida de qualquer carreira bem escolhida. Neste encontro, você começou a mapear quem você é, o que você gosta e o que você faz bem."
    ]]
  ]
},
// =====================================================================
{
  n: 2, titulo: "O Mundo do Trabalho: Ontem, Hoje e Amanhã", ch: "2 horas",
  icone: "🕰️", tema: "DESCOBRIR",
  objetivos: [
    "Compreender a evolução histórica do trabalho.",
    "Identificar como as transformações sociais e tecnológicas afetam as profissões.",
    "Perceber que mudança de profissão não é fracasso — é adaptação."
  ],
  blocos: [
    ["h2", "O trabalho nunca foi o mesmo"],
    ["p", "Há 200 anos, a maioria das pessoas trabalhava no campo ou em pequenas manufaturas. Com a Revolução Industrial (a partir de 1760 na Inglaterra), as fábricas surgiram, as cidades cresceram e as profissões mudaram completamente. Quem trabalhava no campo foi para as fábricas — e quem resistia às mudanças ficava para trás."],
    ["p", "Depois veio a Segunda Revolução Industrial (eletricidade, aço, petróleo), a Terceira (computadores e automação) e agora estamos vivendo a Quarta Revolução Industrial — a era da inteligência artificial, da internet das coisas e da integração entre o mundo físico e o digital."],
    ["img", "03_revolucoes_industriais.png", "Figura 2 — As quatro revoluções industriais. Cada uma delas apagou profissões e criou outras que ninguém tinha imaginado."],
    ["p", "Cada revolução criou novas profissões e eliminou antigas. Hoje, um operador de teares industriais pode ser substituído por um robô — mas quem programa, mantém e melhora esse robô é um ser humano bem preparado."],
    ["p", "A grande pergunta não é “minha profissão vai existir no futuro?” — é “como eu me preparo para o que está vindo?”."],
    ["box", "exemplo", "EXEMPLO REAL — profissões que sumiram (e o que veio no lugar)", [
      "Acendedor de lampiões — percorria as ruas ao anoitecer acendendo a iluminação pública a gás. A eletricidade acabou com a função e criou a do eletricista.",
      "Telefonista de mesa — conectava manualmente as ligações com cabos. As centrais automáticas encerraram o cargo e abriram espaço para o técnico em telecomunicações.",
      "Datilógrafo — digitava documentos em máquina de escrever. O computador transformou a função em assistente administrativo, que hoje usa Word, Excel e sistemas de gestão.",
      "Repare no padrão: a tecnologia não apagou o trabalho. Ela mudou a ferramenta e exigiu mais qualificação."
    ]],
    ["box", "mito", "MITO × VERDADE", [
      "MITO: “Escolhi uma profissão, é para a vida toda.”",
      "VERDADE: pesquisas de mercado indicam que os jovens de hoje devem passar por várias funções e até por áreas diferentes ao longo da carreira. O que se leva de uma para outra são as habilidades — não o cargo."
    ]],
    ["box", "atividade", "ATIVIDADE 2 — Linha do tempo das profissões", [
      "Em grupo, pesquisem e montem uma linha do tempo com:",
      "• 3 profissões que existiam há 100 anos e hoje não existem mais (ou mudaram muito).",
      "• 3 profissões que surgiram nos últimos 20 anos.",
      "• 3 profissões que vocês acreditam que vão existir nos próximos 20 anos.",
      "Apresentem para a turma e expliquem: o que causou cada mudança?"
    ]],
    ["box", "desafio", "MINI-DESAFIO DA SEMANA", [
      "Entreviste alguém com mais de 50 anos da sua família. Pergunte: “Qual era o seu primeiro emprego e como ele funcionava?”. Compare com a mesma função hoje. O que mudou? O que continua igual?"
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 2", [
      "O trabalho sempre foi afetado pelas transformações tecnológicas. Entender a história ajuda a enxergar o futuro com mais clareza — e a se preparar melhor."
    ]]
  ]
},
// =====================================================================
{
  n: 3, titulo: "Indústria 4.0: A Revolução Que Está Acontecendo Agora", ch: "2 horas",
  icone: "🏭", tema: "DESCOBRIR",
  objetivos: [
    "Compreender o conceito de Indústria 4.0.",
    "Identificar as tecnologias que compõem essa revolução.",
    "Reconhecer aplicações da Indústria 4.0 no dia a dia e na região."
  ],
  blocos: [
    ["h2", "A fábrica do futuro (que já é o presente)"],
    ["p", "Você já imaginou uma fábrica onde as máquinas “conversam” entre si? Onde um robô detecta um problema antes que ele aconteça? Onde um operador acompanha a produção pelo celular de qualquer lugar do mundo?"],
    ["p", "Isso não é ficção científica. Isso é Indústria 4.0 — e já está acontecendo em empresas de Santa Catarina e do Brasil, inclusive em indústrias do Alto Vale do Itajaí, região onde ficam os setores têxtil, metalmecânico, moveleiro e de alimentos."],
    ["p", "O termo foi criado na Alemanha por volta de 2011 para descrever a fusão entre tecnologias digitais, físicas e biológicas na produção industrial."],
    ["img", "04_pilares_industria40.png", "Figura 3 — Os oito pilares tecnológicos da Indústria 4.0. Nenhum deles funciona sozinho: eles se combinam dentro da fábrica."],
    ["tab", [30, 70], ["Tecnologia", "O que é"], [
      ["IoT (Internet das Coisas)", "Máquinas e objetos conectados à internet, trocando dados em tempo real"],
      ["Big Data", "Processamento e análise de enormes volumes de dados para tomada de decisão"],
      ["Inteligência Artificial", "Sistemas que aprendem com dados e tomam decisões"],
      ["Manufatura Aditiva (Impressão 3D)", "Criação de objetos físicos a partir de modelos digitais"],
      ["Computação em Nuvem", "Armazenamento e processamento de dados pela internet"],
      ["Robótica Avançada", "Robôs colaborativos (cobots) que trabalham junto com humanos"],
      ["Realidade Aumentada/Virtual", "Simulações digitais para treinamento e projeto"],
      ["Cibersegurança Industrial", "Proteção dos sistemas digitais das fábricas contra ataques"]
    ]],
    ["p", "Essas tecnologias não eliminam o ser humano — elas mudam o papel dele. O trabalhador da Indústria 4.0 precisa saber operar, programar, monitorar e melhorar sistemas inteligentes."],
    ["box", "exemplo", "EXEMPLO REAL — manutenção preditiva numa fábrica de embalagens", [
      "Antes: o motor da máquina quebrava sem aviso, a linha parava por 6 horas e a empresa perdia produção.",
      "Agora: um sensor de vibração (IoT) envia dados a cada segundo para a nuvem. Um algoritmo percebe que a vibração está 8% acima do normal e emite um alerta.",
      "O técnico troca o rolamento no sábado, com a fábrica parada de qualquer jeito. Zero prejuízo.",
      "Quem faz esse trabalho? O técnico em manutenção que aprendeu a ler o painel de dados. Ou seja: a mesma profissão de sempre, com uma habilidade nova."
    ]],
    ["box", "sabia", "VOCÊ SABIA?", [
      "A palavra “cobot” vem de collaborative robot. Diferente dos robôs tradicionais, que ficam trancados dentro de gaiolas de proteção, o cobot tem sensores de força: se encostar em uma pessoa, ele para sozinho. É por isso que ele pode trabalhar lado a lado com o operador na mesma bancada."
    ]],
    ["box", "atividade", "ATIVIDADE 3 — Mapa mental da Indústria 4.0", [
      "Crie um mapa mental com “Indústria 4.0” no centro e os oito pilares tecnológicos ao redor. Para cada pilar, escreva um exemplo de aplicação prática que você conhece ou imagina.",
      "Dica: pense em coisas que você já usa. Sua smart TV é IoT. O Spotify sugerindo músicas é IA. O backup do seu celular é nuvem."
    ]],
    ["box", "desafio", "MINI-DESAFIO DA SEMANA", [
      "Encontre na sua casa três objetos conectados à internet que não sejam celular nem computador. Anote o que cada um faz com os dados que coleta. Você vai se surpreender."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 3", [
      "A Indústria 4.0 está transformando as fábricas em ambientes inteligentes e conectados. Profissionais que entendem essas tecnologias têm muito mais oportunidades no mercado."
    ]]
  ]
},
// =====================================================================
{
  n: 4, titulo: "Automação, Robôs e IA: O Futuro Já Chegou?", ch: "2 horas",
  icone: "🤖", tema: "DESCOBRIR",
  objetivos: [
    "Compreender o impacto da automação e da inteligência artificial no mercado de trabalho.",
    "Refletir criticamente sobre o futuro das profissões.",
    "Diferenciar tarefas automatizáveis de tarefas tipicamente humanas."
  ],
  blocos: [
    ["h2", "Robôs vão roubar meu emprego?"],
    ["p", "Essa é uma das perguntas mais feitas quando se fala em automação. A resposta honesta é: depende."],
    ["p", "Tarefas repetitivas, que seguem sempre o mesmo padrão, estão sendo automatizadas. Mas tarefas que exigem criatividade, empatia, tomada de decisão em situações novas e habilidades interpessoais são muito mais difíceis de automatizar."],
    ["p", "Um estudo do Fórum Econômico Mundial (2023) aponta que até 2027 a automação vai eliminar cerca de 83 milhões de empregos — mas vai criar 69 milhões de empregos novos. O saldo é negativo no curto prazo, mas as novas profissões são mais bem remuneradas e exigem mais qualificação."],
    ["img", "05_automacao_empregos.png", "Figura 4 — O balanço de empregos até 2027 segundo o Fórum Econômico Mundial. A conta não é só de perda: é de troca."],
    ["p", "Inteligência Artificial (IA) é a tecnologia que permite que computadores aprendam com dados e tomem decisões. Hoje a IA diagnostica doenças a partir de imagens médicas, aprova ou reprova crédito em bancos, sugere músicas e filmes nas plataformas, detecta fraudes em cartões e até escreve textos, cria imagens e compõe músicas."],
    ["p", "Mas a IA não tem emoções, não tem ética própria, não compreende contexto cultural profundo. Ela precisa de humanos para ser orientada, corrigida e supervisionada. A pergunta certa não é “a IA vai me substituir?” — é “o que eu preciso saber para trabalhar com a IA?”."],
    ["tab", [50, 50], ["Mais fácil de automatizar", "Mais difícil de automatizar"], [
      ["Digitar dados de uma planilha para outra", "Convencer um cliente irritado a continuar comprando"],
      ["Separar peças por tamanho na esteira", "Descobrir por que a peça está saindo torta"],
      ["Somar valores e emitir um relatório padrão", "Decidir o que fazer com o resultado do relatório"],
      ["Responder perguntas frequentes por chat", "Cuidar de alguém em uma situação delicada"],
      ["Apertar sempre o mesmo parafuso", "Consertar uma máquina que nunca deu esse defeito antes"]
    ]],
    ["box", "exemplo", "EXEMPLO REAL — o caixa do supermercado", [
      "Os caixas de autoatendimento chegaram e muita gente achou que a função ia acabar. O que aconteceu de verdade: uma parte dos operadores virou “assistente de autoatendimento” — quem ajuda o cliente, resolve o produto que não passa no leitor, cuida da prevenção de perdas e opera o sistema.",
      "A parte repetitiva foi automatizada. A parte que exige julgamento e trato com pessoas ficou — e passou a valer mais."
    ]],
    ["box", "mito", "MITO × VERDADE", [
      "MITO: “A IA pensa como uma pessoa.”",
      "VERDADE: a IA reconhece padrões estatísticos em enormes quantidades de dados. Ela não entende o que está dizendo, não sabe se está certa e pode inventar informações com toda a confiança do mundo. Por isso qualquer resposta de IA precisa ser conferida numa fonte confiável."
    ]],
    ["box", "atividade", "ATIVIDADE 4 — Debate: automação é ameaça ou oportunidade?", [
      "Divida a turma em dois grupos:",
      "• Grupo A — defende que a automação é uma ameaça ao emprego.",
      "• Grupo B — defende que a automação gera mais oportunidades do que elimina.",
      "Pesquisem argumentos e façam um debate de 20 minutos. Regra: todo argumento precisa vir com um exemplo concreto. Ao final, façam uma síntese coletiva com os pontos em que os dois lados concordaram."
    ]],
    ["box", "desafio", "MINI-DESAFIO DA SEMANA", [
      "Liste cinco tarefas que você faz na escola. Marque quais um computador conseguiria fazer no seu lugar e quais não. Depois responda: o que sobrou na coluna “não”? Provavelmente é aí que está o seu valor profissional."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 4", [
      "A automação e a IA estão transformando o mercado de trabalho, mas não eliminam o ser humano — mudam seu papel. Profissionais que dominam essas tecnologias saem na frente."
    ]]
  ]
},
// =====================================================================
{
  n: 5, titulo: "Carreiras Industriais I: Mecânica e Eletrotécnica", ch: "2 horas",
  icone: "🔧", tema: "EXPLORAR",
  objetivos: [
    "Conhecer as principais carreiras das áreas de mecânica industrial e eletrotécnica.",
    "Identificar requisitos, funções e perspectivas dessas profissões.",
    "Relacionar essas carreiras com as indústrias da região."
  ],
  blocos: [
    ["h2", "O coração da indústria bate aqui"],
    ["p", "Quando você liga a luz ou usa um equipamento elétrico, não pensa nos profissionais que tornaram isso possível. Mas eles existem — e são fundamentais para o funcionamento de todo sistema industrial."],
    ["img", "06_carreiras_industriais_1.png", "Figura 5 — Duas carreiras que sustentam qualquer fábrica: quem cuida das máquinas e quem cuida da energia que as move."],
    ["h3", "Técnico em Mecânica Industrial"],
    ["p", "O técnico em mecânica industrial trabalha com máquinas, equipamentos e componentes mecânicos nas fábricas. Ele é responsável por montar, ajustar e calibrar máquinas e equipamentos; realizar manutenção preventiva e corretiva; interpretar desenhos técnicos e manuais; e garantir que as máquinas operem com segurança e eficiência."],
    ["tab", [26, 74], null, [
      ["Onde trabalha", "Indústrias metalúrgicas, alimentícias, têxteis, automotivas, de papel e celulose"],
      ["Formação", "Curso técnico no SENAI (2 anos). Pode avançar para engenharia mecânica"],
      ["Salário médio", "R$ 2.500 a R$ 4.500 (varia por região e empresa)"],
      ["Combina com quem", "Gosta de mexer com as mãos, entender como as coisas funcionam e resolver defeitos"]
    ]],
    ["h3", "Técnico em Eletrotécnica"],
    ["p", "O técnico em eletrotécnica lida com sistemas elétricos industriais: motores, painéis, subestações, iluminação industrial e redes elétricas. Instala e mantém sistemas elétricos; lê e interpreta projetos; realiza medições e testes em equipamentos; e garante a conformidade com normas de segurança, especialmente a NR-10."],
    ["tab", [26, 74], null, [
      ["Onde trabalha", "Indústrias, construtoras, empresas de energia, data centers"],
      ["Formação", "Curso técnico no SENAI. Pode avançar para engenharia elétrica"],
      ["Salário médio", "R$ 2.800 a R$ 5.000"],
      ["Combina com quem", "É metódico, gosta de diagramas e leva segurança a sério"]
    ]],
    ["img", "20_salarios_industria.png", "Figura 6 — Faixas salariais dos principais técnicos industriais. Valores médios de mercado, para nível técnico."],
    ["box", "exemplo", "EXEMPLO REAL — um dia do técnico de manutenção", [
      "07h00 — Reunião rápida de turno: o que quebrou ontem, o que está previsto para hoje.",
      "07h20 — Ronda pela fábrica com o tablet, conferindo temperatura e vibração dos motores.",
      "09h00 — A extrusora número 3 apresenta ruído anormal. Ele para a máquina, abre, encontra um rolamento gasto e troca.",
      "11h00 — Registra a ocorrência no sistema: peça trocada, tempo parado, causa provável.",
      "13h30 — Manutenção preventiva programada na linha 2, seguindo o checklist.",
      "16h30 — Passa o turno para o colega e anota o que ficou pendente.",
      "Repare: metade do trabalho é técnico, a outra metade é organização, registro e comunicação."
    ]],
    ["box", "atencao", "SEGURANÇA NÃO É DETALHE", [
      "A NR-10 é a Norma Regulamentadora que trata da segurança em instalações e serviços com eletricidade. Nenhum profissional trabalha em painéis energizados sem treinamento e sem EPI. No SENAI, esse conteúdo é obrigatório em todos os cursos da área elétrica — e é ele que mantém o profissional vivo e a empresa dentro da lei."
    ]],
    ["box", "atividade", "ATIVIDADE 5 — Pesquisa de profissional", [
      "Entreviste (presencialmente ou por mensagem) um técnico mecânico ou eletrotécnico que você conheça — familiar, vizinho, amigo da família. Pergunte:",
      "1. Como você escolheu essa profissão?",
      "2. O que você mais gosta no seu trabalho?",
      "3. O que é mais desafiador?",
      "4. O que você recomenda para quem quer seguir esse caminho?",
      "Apresente o resultado para a turma no próximo encontro."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 5", [
      "Mecânica e eletrotécnica são carreiras sólidas, bem remuneradas e com alta demanda no mercado industrial. O SENAI oferece formação de qualidade para essas áreas."
    ]]
  ]
},
// =====================================================================
{
  n: 6, titulo: "Carreiras Industriais II: Automação e Mecatrônica", ch: "2 horas",
  icone: "🦾", tema: "EXPLORAR",
  objetivos: [
    "Conhecer as carreiras de automação industrial e mecatrônica.",
    "Compreender como essas profissões se conectam à Indústria 4.0.",
    "Entender, na prática, a lógica de um CLP."
  ],
  blocos: [
    ["h2", "Onde a máquina encontra o digital"],
    ["p", "Se você gosta tanto de eletrônica quanto de programação — e ainda curte mecânica — a mecatrônica pode ser a sua área."],
    ["h3", "Técnico em Automação Industrial"],
    ["p", "É responsável por programar, instalar e manter os sistemas automatizados das fábricas. Trabalha com CLPs (Controladores Lógicos Programáveis), que são os “cérebros” das máquinas industriais; com sensores e atuadores, que fazem as máquinas enxergar e agir; com redes industriais, que permitem a comunicação entre máquinas; e com sistemas SCADA, de supervisão e controle de processos."],
    ["img", "07_clp_fluxo.png", "Figura 7 — A lógica de qualquer automação: alguma coisa detecta, o CLP decide, alguma coisa age."],
    ["tab", [26, 74], null, [
      ["Onde trabalha", "Indústrias automatizadas, integradoras de sistemas, fábricas de alimentos, bebidas e farmacêuticas"],
      ["Formação", "Curso técnico no SENAI (2 anos)"],
      ["Salário médio", "R$ 3.000 a R$ 6.000"],
      ["Combina com quem", "Gosta de lógica, de programar e de ver o código virar movimento no mundo real"]
    ]],
    ["h3", "Técnico em Mecatrônica"],
    ["p", "A mecatrônica integra mecânica, eletrônica, computação e controle. O técnico em mecatrônica projeta e mantém sistemas integrados — desde robôs industriais até linhas de montagem automatizadas."],
    ["li", [
      "Programação de CLPs e microcontroladores (Arduino, Raspberry Pi).",
      "Conhecimento de pneumática e hidráulica.",
      "Eletrônica analógica e digital.",
      "Lógica de programação."
    ]],
    ["tab", [26, 74], null, [
      ["Onde trabalha", "Indústrias automotivas, de equipamentos médicos, de embalagens e de robótica"],
      ["Formação", "Curso técnico no SENAI (2 anos)"],
      ["Salário médio", "R$ 3.500 a R$ 7.000"],
      ["Combina com quem", "Não quer escolher entre mecânica, eletrônica e programação — quer as três"]
    ]],
    ["box", "exemplo", "EXEMPLO REAL — a lógica do portão eletrônico da sua rua", [
      "Você já opera uma automação todo dia sem perceber. O portão eletrônico funciona exatamente como uma máquina industrial:",
      "ENTRADA: o receptor capta o sinal do controle e o sensor de fim de curso informa se o portão está aberto ou fechado.",
      "PROCESSAMENTO: a central decide — se está fechado, abre; se está aberto, fecha; se o sensor de barreira detectou alguém passando, para na hora.",
      "SAÍDA: o motor gira para um lado ou para o outro e a luz pisca avisando.",
      "Trocando a central por um CLP e o portão por uma esteira, você tem uma linha de produção."
    ]],
    ["box", "sabia", "VOCÊ SABIA?", [
      "A linguagem mais usada para programar CLPs se chama Ladder (escada) e não parece código: parece um diagrama elétrico com trilhos e contatos. Ela foi criada assim de propósito, nos anos 1970, para que os eletricistas das fábricas conseguissem programar sem precisar aprender uma linguagem de computador."
    ]],
    ["box", "atividade", "ATIVIDADE 6 — Simulação de CLP", [
      "Com o professor, acesse um simulador online de CLP (por exemplo LOGO! Soft Comfort, OpenPLC ou simuladores web gratuitos). Crie um programa simples para acender e apagar uma lâmpada com um botão.",
      "Depois, aumente o desafio: faça a lâmpada continuar acesa mesmo depois de soltar o botão (função “selo”) e criar um segundo botão para desligar.",
      "Discuta: como isso se aplica em uma fábrica real?"
    ]],
    ["box", "desafio", "MINI-DESAFIO DA SEMANA", [
      "Escolha um eletrodoméstico da sua casa e descreva as ENTRADAS, o PROCESSAMENTO e as SAÍDAS dele. Uma máquina de lavar é um ótimo começo."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 6", [
      "Automação e mecatrônica são áreas em plena expansão na Indústria 4.0. Profissionais dessas áreas estão entre os mais demandados pelo mercado industrial brasileiro."
    ]]
  ]
},
// =====================================================================
{
  n: 7, titulo: "Carreiras em TI I: Desenvolvimento de Software", ch: "2 horas",
  icone: "💻", tema: "EXPLORAR",
  objetivos: [
    "Conhecer as principais carreiras na área de desenvolvimento de software.",
    "Compreender o papel do desenvolvedor no mundo tecnológico atual.",
    "Escrever e executar o primeiro programa da vida."
  ],
  blocos: [
    ["h2", "O desenvolvedor que constrói o mundo digital"],
    ["p", "Tudo o que você acessa pelo celular ou computador foi construído por alguém. O Instagram, o WhatsApp, os jogos, os aplicativos de banco, os sites — tudo isso é código escrito por desenvolvedores de software."],
    ["p", "O desenvolvimento de software é uma das áreas com maior demanda de profissionais no Brasil e no mundo. Em 2023, o Brasil tinha um déficit de mais de 700 mil profissionais de tecnologia. Isso significa: muita vaga, poucos candidatos qualificados."],
    ["img", "08_front_back.png", "Figura 8 — Front-end é o que você vê; back-end é o que decide. Full stack é quem transita nos dois lados."],
    ["tab", [30, 70], ["Cargo", "O que faz"], [
      ["Desenvolvedor Front-end", "Cria a parte visual dos sites e apps (o que o usuário vê e com o que interage)"],
      ["Desenvolvedor Back-end", "Cria a lógica e o servidor que faz os sistemas funcionarem “por baixo”"],
      ["Desenvolvedor Full Stack", "Trabalha tanto no front-end quanto no back-end"],
      ["Desenvolvedor Mobile", "Cria aplicativos para Android e iOS"],
      ["Desenvolvedor de Jogos", "Cria jogos digitais usando engines como Unity e Unreal"]
    ]],
    ["h3", "Linguagens mais usadas"],
    ["li", [
      "HTML, CSS e JavaScript — a base do desenvolvimento web.",
      "Python — ciência de dados, inteligência artificial e automação.",
      "Java e Kotlin — desenvolvimento Android.",
      "Swift — desenvolvimento iOS.",
      "C# e C++ — jogos e sistemas industriais."
    ]],
    ["h3", "Quanto ganha um desenvolvedor?"],
    ["p", "Um desenvolvedor júnior (0 a 2 anos de experiência) ganha em média R$ 4.000 a R$ 8.000. Um sênior (5 anos ou mais) fica entre R$ 12.000 e R$ 25.000. Em empresas internacionais, com trabalho remoto e pagamento em dólar, os valores podem ser bem maiores."],
    ["box", "exemplo", "EXEMPLO REAL — o que acontece quando você clica em “Entrar”", [
      "1. O FRONT-END pega o que você digitou e monta um pedido.",
      "2. O pedido viaja pela internet, protegido por criptografia (trabalho da equipe de segurança).",
      "3. O BACK-END recebe, procura seu usuário no banco de dados e confere a senha.",
      "4. Se estiver certo, devolve uma “chave” temporária de acesso.",
      "5. O FRONT-END guarda a chave e mostra a tela inicial com o seu saldo.",
      "Tudo isso em menos de um segundo — e com pelo menos três profissionais diferentes por trás."
    ]],
    ["box", "atividade", "ATIVIDADE 7 — Meu primeiro “Olá, mundo!”", [
      "Com o professor, acesse o site Replit (replit.com) ou qualquer editor online e escreva o programa abaixo em Python:"
    ]],
    ["cod", "nome = input(\"Qual é o seu nome? \")\nprint(\"Olá,\", nome, \"! Você acabou de programar!\")"],
    ["p", "Depois de rodar, tente melhorar o programa — este é o momento em que se aprende de verdade:"],
    ["num", [
      "Peça também a idade e mostre em que ano a pessoa vai fazer 18 anos.",
      "Faça o programa perguntar a carreira preferida e responder com uma frase diferente para cada uma.",
      "Se der errado, leia a mensagem de erro em vez de apagar tudo: ela diz a linha e o motivo."
    ]],
    ["box", "sabia", "VOCÊ SABIA?", [
      "A primeira pessoa a escrever um algoritmo para ser executado por uma máquina foi Ada Lovelace, em 1843 — quase cem anos antes de existir o primeiro computador eletrônico. Programar, portanto, nasceu antes do computador."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 7", [
      "Desenvolvimento de software é uma das carreiras mais promissoras da atualidade, com alta demanda e ótima remuneração. Começar a programar cedo é uma vantagem enorme."
    ]]
  ]
},
// =====================================================================
{
  n: 8, titulo: "Carreiras em TI II: Dados, IA e Segurança da Informação", ch: "2 horas",
  icone: "🛡️", tema: "EXPLORAR",
  objetivos: [
    "Conhecer carreiras nas áreas de ciência de dados, inteligência artificial e cibersegurança.",
    "Compreender o valor estratégico dos dados nas empresas.",
    "Refletir sobre a proteção dos próprios dados pessoais."
  ],
  blocos: [
    ["h2", "Quem controla os dados, controla o futuro"],
    ["p", "“Dados são o novo petróleo.” Essa frase, muito repetida no mundo tecnológico, significa que informações bem analisadas valem dinheiro — e muito."],
    ["p", "Toda vez que você usa um aplicativo, você gera dados. Seu histórico de compras, suas pesquisas, suas curtidas — tudo isso é coletado, armazenado e analisado. As empresas usam esses dados para entender o comportamento dos consumidores e tomar melhores decisões."],
    ["img", "21_dados_ia_seguranca.png", "Figura 9 — Do toque no celular até a decisão da empresa: cada etapa dessa esteira é uma carreira diferente."],
    ["h3", "Cientista de Dados"],
    ["p", "Coleta, limpa, analisa e interpreta grandes volumes de dados para gerar informação útil às empresas. Usa estatística, programação (principalmente Python e R) e algoritmos de aprendizado de máquina. Salário médio: R$ 8.000 a R$ 20.000 ou mais."],
    ["h3", "Analista de Inteligência Artificial"],
    ["p", "Desenvolve e aplica modelos de IA — redes neurais, algoritmos de aprendizado de máquina, sistemas de visão computacional e processamento de linguagem natural. Salário médio: R$ 10.000 a R$ 25.000 ou mais."],
    ["h3", "Analista de Segurança da Informação (Cibersegurança)"],
    ["p", "Com o aumento dos ataques hackers, proteger sistemas e dados se tornou estratégico. O analista de segurança monitora redes em busca de ameaças, realiza testes de invasão (pentests) para identificar vulnerabilidades, implementa políticas de segurança digital e responde a incidentes. Salário médio: R$ 6.000 a R$ 18.000 ou mais. É uma das áreas com maior escassez global de profissionais."],
    ["img", "09_salarios_ti.png", "Figura 10 — Faixas salariais em tecnologia. Repare: quanto mais especializada a função, maior a variação entre o piso e o teto."],
    ["box", "exemplo", "EXEMPLO REAL — como a plataforma sabe o que você quer assistir", [
      "Você assiste a um documentário sobre robótica até o fim, pula outro pela metade e volta duas vezes na mesma cena.",
      "COLETA: cada uma dessas ações vira um dado com data, hora e duração.",
      "ANÁLISE: o cientista de dados descobre que quem assiste a esse documentário inteiro costuma gostar de conteúdos sobre engenharia.",
      "IA: o modelo aprende o padrão e passa a recomendar automaticamente.",
      "SEGURANÇA: o analista garante que esses dados não vazem — porque histórico de consumo diz muito sobre uma pessoa.",
      "Três carreiras, um único clique seu."
    ]],
    ["box", "atencao", "PROTEJA OS SEUS PRÓPRIOS DADOS", [
      "Senhas longas e diferentes para cada serviço — uma frase é melhor do que uma palavra.",
      "Ative a verificação em duas etapas nas contas importantes.",
      "Desconfie de links recebidos por mensagem, mesmo de conhecidos: contas invadidas mandam links.",
      "Nunca informe código recebido por SMS a ninguém, em hipótese alguma.",
      "No Brasil, a LGPD (Lei Geral de Proteção de Dados, nº 13.709/2018) garante que você tem direito de saber quais dados uma empresa guarda sobre você e de pedir a exclusão deles."
    ]],
    ["box", "atividade", "ATIVIDADE 8 — Caça ao dado", [
      "Em grupos, pesquisem uma notícia recente sobre:",
      "a) um vazamento de dados que afetou muitas pessoas;",
      "b) uma empresa que usou dados para inovar seu produto ou serviço.",
      "Apresentem para a turma: o que aconteceu? Quais profissionais estavam envolvidos? O que poderia ter sido feito de diferente? Citem a fonte da notícia."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 8", [
      "Dados, IA e cibersegurança são as fronteiras mais quentes da tecnologia. Profissionais dessas áreas são altamente valorizados e cada vez mais necessários."
    ]]
  ]
},
// =====================================================================
{
  n: 9, titulo: "Profissões do Futuro: O Que Ainda Não Existe", ch: "2 horas",
  icone: "🚀", tema: "EXPLORAR",
  objetivos: [
    "Explorar profissões emergentes que ainda estão se formando.",
    "Desenvolver visão prospectiva sobre o mercado de trabalho.",
    "Exercitar a criatividade aplicada ao mundo do trabalho."
  ],
  blocos: [
    ["h2", "Carreiras que seus pais nunca imaginaram"],
    ["p", "Quando seus pais tinham a sua idade, não existia o cargo de social media manager. Não havia analista de UX. Não existia engenheiro de prompt. O mundo criou essas profissões porque surgiu a necessidade — e quem se preparou, surfou a onda."],
    ["img", "10_profissoes_futuro.png", "Figura 11 — Seis profissões que já estão nascendo. Nenhuma delas exige adivinhação: todas nascem de um problema real."],
    ["tab", [34, 66], ["Profissão do futuro", "O que pode ser"], [
      ["Engenheiro de IA Ética", "Garantir que sistemas de IA sejam justos, transparentes e seguros"],
      ["Designer de Experiência em Realidade Aumentada", "Criar ambientes imersivos para educação, saúde e entretenimento"],
      ["Especialista em Fazendas Verticais", "Gerenciar cultivo de alimentos em ambientes urbanos verticais"],
      ["Técnico em Biofabricação", "Trabalhar com impressão 3D de tecidos e órgãos biológicos"],
      ["Gestor de Bem-Estar Digital", "Ajudar pessoas a manterem equilíbrio entre vida digital e física"],
      ["Arquiteto de Cidades Inteligentes", "Planejar infraestruturas urbanas conectadas e sustentáveis"],
      ["Especialista em Energia Renovável", "Projetar e manter sistemas solares, eólicos e de hidrogênio"]
    ]],
    ["p", "O que essas profissões têm em comum? Todas exigem adaptabilidade, aprendizado contínuo e visão interdisciplinar — ou seja, misturar conhecimentos de áreas diferentes."],
    ["box", "exemplo", "EXEMPLO REAL — de onde nasce uma profissão nova", [
      "PROBLEMA: modelos de IA começaram a reprovar pedidos de emprego de mulheres porque aprenderam com currículos antigos de uma empresa que só contratava homens.",
      "CONSEQUÊNCIA: processos judiciais, prejuízo de imagem e uma tecnologia inutilizável.",
      "SOLUÇÃO: alguém precisa auditar o modelo, encontrar o viés e corrigir os dados.",
      "RESULTADO: nasce o cargo de especialista em IA responsável — que hoje existe em bancos, seguradoras e big techs. Toda profissão nova começa exatamente assim: um problema que ninguém sabia resolver."
    ]],
    ["box", "atividade", "ATIVIDADE 9 — Invente uma profissão", [
      "Individualmente, crie uma profissão do futuro que ainda não existe. Sua apresentação precisa responder:",
      "1. Qual é o nome da profissão?",
      "2. Que PROBLEMA do mundo ela resolve?",
      "3. O que esse profissional faz no dia a dia?",
      "4. Que formação e habilidades seriam necessárias?",
      "5. Quanto você acha que essa profissão pagaria — e por quê?",
      "Apresente para a turma com criatividade!"
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 9", [
      "O mercado de trabalho do futuro será mais dinâmico, criativo e interdisciplinar. Quem aprende a aprender tem vantagem sobre quem apenas memoriza conteúdos."
    ]]
  ]
},
// =====================================================================
{
  n: 10, titulo: "Mapa de Habilidades e Interesses", ch: "2 horas",
  icone: "🗂️", tema: "PLANEJAR",
  objetivos: [
    "Identificar habilidades pessoais (hard skills e soft skills).",
    "Mapear interesses e valores profissionais.",
    "Produzir o mapa que servirá de base para o projeto final."
  ],
  blocos: [
    ["h2", "Você é mais do que uma nota"],
    ["p", "Habilidades não são só aquilo que você aprendeu na escola. Existem dois tipos principais: as hard skills, que são técnicas, ensináveis e mensuráveis; e as soft skills, que são comportamentais e interpessoais."],
    ["img", "11_hard_soft_skills.png", "Figura 12 — As duas famílias de habilidades. As técnicas abrem a porta; as comportamentais mantêm você dentro da sala."],
    ["p", "O mercado de trabalho valoriza AMBAS. Uma pesquisa do LinkedIn mostrou que 92% dos recrutadores consideram as soft skills tão importantes quanto as técnicas — e muitas vezes mais difíceis de encontrar."],
    ["p", "Valores profissionais são o que mais importa para você no trabalho. Algumas pessoas valorizam estabilidade; outras preferem liberdade criativa. Algumas buscam impacto social; outras priorizam remuneração alta. Não existe certo ou errado — mas é importante saber o que você valoriza para fazer escolhas alinhadas."],
    ["box", "exemplo", "EXEMPLO REAL — dois candidatos, uma vaga", [
      "CANDIDATO A: sabe programar melhor do que todo mundo da sala. Mas não avisa quando vai atrasar uma entrega, não pede ajuda quando trava e discute com quem discorda dele.",
      "CANDIDATO B: sabe um pouco menos de técnica, mas comunica o que está fazendo, avisa cedo quando vê um problema e ajuda os colegas.",
      "Na maioria das empresas, B é contratado — e A, quando é contratado, costuma ser o primeiro a sair.",
      "Motivo: dá para ensinar uma linguagem de programação em três meses. Ensinar alguém a trabalhar em equipe leva anos."
    ]],
    ["box", "atividade", "ATIVIDADE 10 — Meu mapa de habilidades", [
      "Preencha a tabela a seguir com honestidade — este mapa vai ser usado no projeto final da UC. Depois, responda: existe alguma profissão (das que estudamos até agora) que combina com o seu mapa? Qual e por quê?"
    ]],
    ["tab", [22, 39, 39], ["Categoria", "Habilidades que EU TENHO", "Habilidades que QUERO DESENVOLVER"], [
      ["Hard Skills", " ", " "], ["Soft Skills", " ", " "],
      ["Interesses", " ", " "], ["Valores", " ", " "]
    ]],
    ["box", "reflexao", "PARA PENSAR", [
      "Escreva em uma frase: “No trabalho, o que mais importa para mim é ______.” Guarde essa frase. Daqui a cinco anos, vale a pena reler e conferir se ainda é verdade."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 10", [
      "Conhecer suas habilidades e interesses é fundamental para fazer escolhas de carreira conscientes e satisfatórias. Este mapa será a base do seu projeto de carreira."
    ]]
  ]
},
// =====================================================================
{
  n: 11, titulo: "Planejamento de Carreira: Da Escola ao Mercado", ch: "2 horas",
  icone: "🧭", tema: "PLANEJAR",
  objetivos: [
    "Compreender as etapas de uma trajetória profissional.",
    "Conhecer os itinerários formativos disponíveis após o 9º ano.",
    "Construir um plano de carreira inicial em três horizontes."
  ],
  blocos: [
    ["h2", "Construindo a estrada enquanto caminha"],
    ["p", "Planejar a carreira não significa ter tudo definido para sempre. Significa saber para onde você quer ir e que passos pode dar agora para chegar lá."],
    ["img", "12_itinerarios.png", "Figura 13 — Os quatro caminhos possíveis depois do 9º ano. Nenhum deles fecha portas."],
    ["tab", [26, 48, 26], ["Caminho", "O que é", "Duração"], [
      ["Ensino Médio regular", "Formação geral para o vestibular", "3 anos"],
      ["Ensino Médio técnico integrado (SENAI/SESI)", "Formação geral + técnica ao mesmo tempo", "3 anos"],
      ["Curso técnico concomitante", "Técnico enquanto faz o Ensino Médio em outra escola", "1,5 a 2 anos"],
      ["Jovem Aprendiz", "Trabalha e aprende ao mesmo tempo, com carteira assinada", "14 a 24 anos"]
    ]],
    ["h3", "Planejamento em 3 horizontes"],
    ["p", "Curto prazo (1 a 2 anos) — o que você pode fazer AGORA: participar de programas como o Rio do Sul Mais Tech, fazer cursos online gratuitos (SENAI EAD, Coursera, Khan Academy), aprender inglês básico e participar de projetos e competições."],
    ["p", "Médio prazo (3 a 5 anos) — após o Ensino Médio: fazer um curso técnico no SENAI, ingressar como Jovem Aprendiz em uma empresa, participar de programas de estágio."],
    ["p", "Longo prazo (5 a 10 anos) — onde você quer estar: formação superior (tecnólogo, licenciatura, bacharelado), especialização e pós-graduação, liderança técnica ou empreendedorismo."],
    ["box", "exemplo", "EXEMPLO REAL — a trajetória da Camila, passo a passo", [
      "14 anos — entra no Rio do Sul Mais Tech e descobre que gosta de automação.",
      "15 anos — faz um curso gratuito de lógica de programação pela internet.",
      "16 anos — começa o técnico em Automação Industrial no SENAI, concomitante ao Ensino Médio.",
      "17 anos — é contratada como Jovem Aprendiz numa indústria da região, com carteira assinada.",
      "19 anos — termina o técnico e é efetivada como técnica júnior.",
      "22 anos — a empresa paga metade da faculdade de Engenharia de Controle e Automação.",
      "Nenhum salto mágico: cada passo foi possível por causa do anterior."
    ]],
    ["box", "atividade", "ATIVIDADE 11 — Meu plano de carreira inicial", [
      "Monte uma linha do tempo pessoal com pelo menos 3 marcos em cada horizonte (curto, médio e longo prazo). Use criatividade — pode ser um desenho, um mapa mental ou uma tabela.",
      "Regra importante: cada marco de curto prazo precisa ser algo que você consiga começar nos próximos 30 dias."
    ]],
    ["tab", [24, 76], ["Horizonte", "Meus marcos"], [
      ["Curto prazo (1–2 anos)", " "], ["Médio prazo (3–5 anos)", " "], ["Longo prazo (5–10 anos)", " "]
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 11", [
      "O planejamento de carreira é um processo dinâmico. O importante é dar o primeiro passo — e o Rio do Sul Mais Tech é um deles."
    ]]
  ]
},
// =====================================================================
{
  n: 12, titulo: "Currículo para Jovens: Como Montar o Seu", ch: "2 horas",
  icone: "📄", tema: "PLANEJAR",
  objetivos: [
    "Aprender a estrutura de um currículo profissional.",
    "Construir um currículo básico para o primeiro emprego ou programa de aprendiz.",
    "Revisar o currículo de um colega com olhar crítico e respeitoso."
  ],
  blocos: [
    ["h2", "O currículo é a sua primeira apresentação"],
    ["p", "O currículo é o documento que apresenta você ao mercado de trabalho. Para jovens sem experiência formal, ele precisa destacar outras coisas: formação, habilidades, cursos extracurriculares, projetos e perfil pessoal."],
    ["img", "13_curriculo.png", "Figura 14 — A anatomia de um currículo de uma página, com os seis blocos obrigatórios e os erros mais comuns."],
    ["h3", "Estrutura básica de um currículo para jovens"],
    ["num", [
      "Dados de contato — nome completo, telefone, e-mail profissional (nada de “gatinhofofo@…”), cidade e estado, LinkedIn se tiver.",
      "Objetivo profissional — uma frase curta dizendo o que você busca. Ex.: “Busco oportunidade como Jovem Aprendiz na área de tecnologia para iniciar minha trajetória profissional.”",
      "Formação — escola atual, ano cursado e cursos complementares (como o Rio do Sul Mais Tech!).",
      "Habilidades — suas soft skills e hard skills relevantes. Seja honesto: não exagere.",
      "Experiências — trabalhos voluntários, projetos escolares, participação em eventos, competições. Tudo conta!",
      "Informações adicionais — idiomas (inglês básico, por exemplo) e hobbies relevantes para a área."
    ]],
    ["h3", "O que NÃO colocar no currículo"],
    ["li", [
      "Informações desnecessárias (signo, time de futebol, religião).",
      "Foto, se a vaga não pedir.",
      "Erros de português — use o corretor ortográfico.",
      "Mentiras ou exageros: a verdade sempre aparece na entrevista."
    ]],
    ["box", "exemplo", "EXEMPLO REAL — o mesmo candidato, dois currículos", [
      "VERSÃO FRACA — Objetivo: “Quero uma oportunidade de emprego em qualquer área para crescer na vida.” Experiência: “Não tenho experiência.”",
      "VERSÃO FORTE — Objetivo: “Busco vaga de Jovem Aprendiz na área industrial, com interesse em manutenção e automação.” Experiência: “Monitor voluntário da feira de ciências da escola (2026): organizei a bancada de robótica e apresentei os projetos aos visitantes.”",
      "É a mesma pessoa. O que mudou foi parar de dizer o que NÃO tem e começar a mostrar o que JÁ fez."
    ]],
    ["box", "atividade", "ATIVIDADE 12 — Monte seu currículo", [
      "Usando um editor de texto (Word ou Google Docs), crie o seu primeiro currículo seguindo a estrutura acima. Ele deve caber em UMA página.",
      "Depois, troque com um colega para revisão mútua. Ao revisar o currículo do outro, aponte: 1 coisa que está muito boa, 1 coisa que faltou e 1 erro de escrita. Crítica sem elogio desanima; elogio sem crítica não ajuda."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 12", [
      "O currículo é uma ferramenta viva — você vai atualizando ao longo da vida. Criar o primeiro agora é um passo importante para o mercado de trabalho."
    ]]
  ]
},
// =====================================================================
{
  n: 13, titulo: "LinkedIn e Redes Profissionais", ch: "2 horas",
  icone: "🔗", tema: "CONECTAR",
  objetivos: [
    "Compreender o papel do LinkedIn no mercado de trabalho.",
    "Aprender a criar um perfil profissional básico.",
    "Refletir sobre a própria reputação digital."
  ],
  blocos: [
    ["h2", "A rede social que abre portas"],
    ["p", "O LinkedIn é a maior rede social profissional do mundo, com mais de 1 bilhão de usuários. Diferente do Instagram ou do TikTok, o LinkedIn existe para conectar profissionais, compartilhar conquistas e divulgar oportunidades de trabalho."],
    ["p", "Você pode criar seu perfil no LinkedIn a partir dos 16 anos. Mas nada impede que você já vá conhecendo a plataforma agora e preparando o conteúdo do seu perfil."],
    ["img", "14_linkedin.png", "Figura 15 — Um perfil profissional bem montado, campo por campo, com as dicas que fazem diferença."],
    ["h3", "Por que criar um perfil profissional?"],
    ["li", [
      "Visibilidade: recrutadores e empresas buscam profissionais ativamente na plataforma.",
      "Networking: você se conecta com profissionais da área e aprende com eles.",
      "Aprendizado: há cursos e conteúdos gratuitos publicados diariamente.",
      "Reputação: um perfil bem feito mostra quem você é profissionalmente."
    ]],
    ["tab", [24, 76], ["Seção", "Dica"], [
      ["Foto", "Foto profissional: rosto visível, fundo neutro, sorriso natural"],
      ["Headline", "“Estudante de TI | Entusiasta de tecnologia | Rio do Sul Mais Tech”"],
      ["Sobre", "3 a 5 linhas sobre quem você é e o que busca, escritas na primeira pessoa"],
      ["Formação", "Escola atual e cursos complementares"],
      ["Habilidades", "Liste suas principais habilidades, técnicas e comportamentais"],
      ["Conexões", "Conecte-se com colegas, professores e profissionais da área"]
    ]],
    ["box", "atencao", "CUIDADO COM A PRESENÇA DIGITAL", [
      "O que você posta te representa. Recrutadores pesquisam candidatos on-line antes de chamar para a entrevista — e o que está público é o que eles vão ver.",
      "Antes de publicar, faça o teste: “eu mostraria isso para o dono da empresa onde quero trabalhar?”. Se a resposta for não, não publique.",
      "Nada do que você apaga desaparece de verdade: prints existem."
    ]],
    ["box", "atividade", "ATIVIDADE 13 — Perfil profissional simulado", [
      "Crie um perfil profissional simulado de você mesmo, em papel ou no Word, como se fosse preencher todos os campos da plataforma. Inclua a descrição da foto que usaria, a headline, o texto “Sobre” e as habilidades.",
      "Apresente para a turma e receba sugestões de melhoria na headline — ela é a linha mais lida do perfil."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 13", [
      "O LinkedIn é uma ferramenta poderosa para quem está iniciando no mercado. Criar um perfil profissional desde cedo é uma vantagem competitiva."
    ]]
  ]
},
// =====================================================================
{
  n: 14, titulo: "Networking: Construindo Conexões", ch: "2 horas",
  icone: "🤝", tema: "CONECTAR",
  objetivos: [
    "Compreender o conceito e a importância do networking.",
    "Desenvolver habilidades de relacionamento profissional.",
    "Montar e treinar o próprio elevator pitch."
  ],
  blocos: [
    ["h2", "Sua rede de contatos vale ouro"],
    ["p", "Networking é a arte de construir e manter relacionamentos profissionais mutuamente benéficos. Não é sobre usar as pessoas — é sobre criar conexões genuínas em que os dois lados se ajudam a crescer."],
    ["p", "Pesquisas mostram que cerca de 70% das vagas de emprego são preenchidas por indicação — ou seja, por quem a empresa já conhece ou por indicação de alguém de confiança. Ter uma boa rede de contatos é, muitas vezes, mais valioso do que um currículo impecável."],
    ["img", "15_networking.png", "Figura 16 — Você já tem uma rede. A questão é cuidar dela — e um elevator pitch de 40 segundos ajuda muito."],
    ["h3", "Como construir networking sendo jovem?"],
    ["li", [
      "Seja presente: participe de eventos, feiras, palestras, workshops e competições da sua área.",
      "Seja curioso: converse com profissionais que você admira. A maioria gosta de compartilhar experiências.",
      "Seja generoso: compartilhe conteúdos úteis, ajude colegas, colabore em projetos.",
      "Seja consistente: relacionamentos se constroem ao longo do tempo.",
      "Use as redes: o LinkedIn é uma ferramenta on-line — mas os contatos mais fortes nascem pessoalmente."
    ]],
    ["h3", "O elevator pitch"],
    ["p", "Um elevator pitch é uma apresentação de 30 a 60 segundos sobre quem você é e o que busca — como se você estivesse num elevador com um profissional que admira e tivesse só alguns segundos para se apresentar."],
    ["box", "exemplo", "MODELO DE ELEVATOR PITCH", [
      "“Olá, me chamo [nome], tenho [idade] anos e estou no [ano] do Ensino Fundamental. Participo do programa Rio do Sul Mais Tech e estou me descobrindo na área de [área]. Tenho interesse especial em [tema específico]. Seria possível conversar mais sobre a sua experiência em [área]?”",
      "Três regras: fale o nome com clareza, diga uma coisa específica (não “gosto de tecnologia”, e sim “gosto de automação”) e termine com uma pergunta — pitch bom abre conversa, não encerra."
    ]],
    ["box", "atividade", "ATIVIDADE 14 — Roda de networking", [
      "Organize a turma em duas rodas, uma interna e uma externa. Os alunos da roda interna ficam parados e os da externa giram a cada 2 minutos.",
      "Em cada encontro, cada aluno faz o seu elevator pitch e depois faz uma pergunta ao colega.",
      "Ao final, reflita: o que foi fácil? O que foi difícil? Em que rodada o seu pitch ficou melhor?"
    ]],
    ["box", "desafio", "MINI-DESAFIO DA SEMANA", [
      "Grave o seu elevator pitch no celular e assista. Cronometre: passou de 60 segundos? Corte. Você disse alguma coisa específica sobre você? Se qualquer colega pudesse ter dito o mesmo texto, ele ainda não é seu."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 14", [
      "Networking é uma habilidade que se aprende e se pratica. Começa com uma conversa genuína e se constrói com consistência ao longo do tempo."
    ]]
  ]
},
// =====================================================================
{
  n: 15, titulo: "Entrevista Simulada: Como Se Apresentar", ch: "2 horas",
  icone: "🎤", tema: "CONECTAR",
  objetivos: [
    "Conhecer o processo de entrevistas de emprego e aprendizagem.",
    "Praticar apresentação pessoal em contextos profissionais.",
    "Preparar respostas para as perguntas mais frequentes."
  ],
  blocos: [
    ["h2", "A entrevista começa antes de entrar na sala"],
    ["p", "A entrevista de emprego é um dos momentos mais importantes do processo seletivo. Para um jovem que está se candidatando ao primeiro emprego ou a um programa de Jovem Aprendiz, a preparação faz toda a diferença."],
    ["img", "16_entrevista.png", "Figura 17 — A entrevista tem três tempos, e o primeiro deles acontece dias antes."],
    ["h3", "Antes da entrevista"],
    ["li", [
      "Pesquise a empresa: saiba o que ela faz, seus valores, produtos e missão.",
      "Releia o seu currículo: saiba defender cada ponto que você escreveu.",
      "Prepare-se para as perguntas comuns: “Fale sobre você”, “Por que você quer trabalhar aqui?”, “Quais são suas qualidades e seus pontos a melhorar?”, “Onde você se vê daqui a 5 anos?”."
    ]],
    ["h3", "Durante a entrevista"],
    ["li", [
      "Chegue 10 minutos antes.",
      "Vista-se adequadamente: não precisa ser formal demais, mas deve ser limpo e apresentável.",
      "Mantenha contato visual, postura ereta e fale com clareza.",
      "Seja honesto — não invente experiências que não teve.",
      "Faça perguntas ao final: demonstra interesse."
    ]],
    ["h3", "Após a entrevista"],
    ["li", [
      "Envie um e-mail de agradecimento em até 24 horas.",
      "Anote o que foi perguntado e reflita sobre o que pode melhorar para a próxima."
    ]],
    ["box", "exemplo", "EXEMPLO REAL — como responder “qual é o seu ponto fraco?”", [
      "RESPOSTA RUIM: “Não tenho nenhum.” (soa arrogante e ninguém acredita)",
      "RESPOSTA RUIM 2: “Sou perfeccionista demais.” (todo mundo diz isso; o entrevistador já ouviu mil vezes)",
      "RESPOSTA BOA: “Tenho dificuldade em falar em público. Por isso me inscrevi para apresentar o projeto na feira da escola — ainda fico nervoso, mas melhorei bastante desde a primeira vez.”",
      "A fórmula é: reconheço a fraqueza + mostro o que estou fazendo a respeito. Honestidade com atitude vale mais do que resposta decorada."
    ]],
    ["box", "atencao", "PERGUNTAS QUE VOCÊ PODE FAZER AO FINAL", [
      "“Como é um dia normal de quem trabalha nesta função?”",
      "“Que tipo de aprendizado a empresa oferece para quem está começando?”",
      "“O que você mais valoriza em um jovem aprendiz?”",
      "Nunca comece perguntando sobre salário e benefícios — espere a empresa tocar no assunto."
    ]],
    ["box", "atividade", "ATIVIDADE 15 — Entrevista simulada", [
      "Em duplas, realizem entrevistas simuladas de 10 minutos. Um aluno é o “candidato” e o outro é o “recrutador”. Depois troquem os papéis. O “recrutador” deve fazer ao menos 5 perguntas.",
      "Ao final, a turma discute: o que cada candidato fez bem? O que poderia melhorar? Alguém respondeu algo que você quer copiar?"
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 15", [
      "A entrevista é uma habilidade que se desenvolve com prática. Quanto mais você simula, mais confiante e preparado fica para a situação real."
    ]]
  ]
},
// =====================================================================
{
  n: 16, titulo: "SENAI: Caminhos de Formação Técnica", ch: "2 horas",
  icone: "🏫", tema: "CONECTAR",
  objetivos: [
    "Conhecer a estrutura de formação técnica do SENAI.",
    "Identificar cursos e oportunidades disponíveis em Rio do Sul e região.",
    "Descobrir os requisitos de entrada de cada curso."
  ],
  blocos: [
    ["h2", "O SENAI como seu próximo passo"],
    ["p", "O SENAI (Serviço Nacional de Aprendizagem Industrial) é uma das maiores redes de educação profissional e tecnológica do mundo. No Brasil, o SENAI forma mais de 2 milhões de trabalhadores por ano — em áreas que vão da mecânica à tecnologia da informação, da gastronomia à indústria de precisão."],
    ["h3", "Por que escolher o SENAI?"],
    ["li", [
      "Formação prática, com laboratórios modernos e professores vindos do mercado.",
      "Alta empregabilidade: mais de 70% dos alunos são contratados durante ou logo após o curso.",
      "Convênios com empresas regionais que oferecem estágios e vagas.",
      "Modalidades flexíveis: técnico integrado, concomitante, subsequente e EaD.",
      "Programas de aprendizagem para jovens entre 14 e 24 anos."
    ]],
    ["img", "17_cursos_senai.png", "Figura 18 — Exemplos de cursos técnicos do SENAI. A oferta muda por unidade: sempre confira no site da sua região."],
    ["tab", [42, 32, 26], ["Curso", "Área", "Duração"], [
      ["Técnico em Eletrotécnica", "Industrial", "2 anos"],
      ["Técnico em Mecânica", "Industrial", "2 anos"],
      ["Técnico em Automação Industrial", "Industrial", "2 anos"],
      ["Técnico em Mecatrônica", "Industrial", "2 anos"],
      ["Técnico em Informática", "TI", "1,5 ano"],
      ["Técnico em Desenvolvimento de Sistemas", "TI", "2 anos"],
      ["Técnico em Segurança do Trabalho", "Industrial", "2 anos"]
    ]],
    ["h3", "O Jovem Aprendiz no SENAI"],
    ["p", "O programa de Jovem Aprendiz permite que jovens de 14 a 24 anos trabalhem e se qualifiquem ao mesmo tempo, com carteira assinada, salário e formação técnica. É uma porta de entrada poderosa para o mercado industrial e tecnológico — e a lei obriga empresas de médio e grande porte a contratarem aprendizes."],
    ["box", "exemplo", "EXEMPLO REAL — como funciona a rotina do aprendiz", [
      "SEGUNDA A QUINTA: trabalha meio período na empresa, com carteira assinada, salário proporcional, vale-transporte e férias.",
      "SEXTA-FEIRA: aula no SENAI, que conta como jornada de trabalho — ou seja, é dia trabalhado.",
      "A empresa não pode colocar o aprendiz em atividade perigosa nem prejudicar os estudos: se as notas caírem, o contrato pode ser revisto.",
      "Ao final, muitos aprendizes são efetivados — a empresa já treinou a pessoa e conhece o trabalho dela."
    ]],
    ["box", "atividade", "ATIVIDADE 16 — Pesquisa de cursos", [
      "Acesse o site do SENAI Santa Catarina (sc.senai.br) e pesquise:",
      "1. Quais cursos técnicos estão disponíveis mais próximos de Rio do Sul?",
      "2. Quais são os requisitos de entrada (idade mínima, escolaridade)?",
      "3. Existe algum programa de Jovem Aprendiz disponível na região?",
      "4. Qual é a duração e o turno de cada curso que te interessou?",
      "Monte um breve relatório e compartilhe com a turma."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 16", [
      "O SENAI é uma das melhores portas de entrada para carreiras industriais e tecnológicas. Conheça os cursos disponíveis e planeje seu próximo passo."
    ]]
  ]
},
// =====================================================================
{
  n: 17, titulo: "Projeto Final: Meu Mapa de Carreira", ch: "2 horas",
  icone: "🗺️", tema: "CONECTAR",
  objetivos: [
    "Integrar os aprendizados de toda a UC em um projeto individual.",
    "Construir um mapa de carreira personalizado.",
    "Definir ações concretas para as próximas semanas."
  ],
  blocos: [
    ["h2", "Tudo se conecta"],
    ["p", "Ao longo desta UC, você explorou o mundo do trabalho industrial e tecnológico, conheceu dezenas de profissões, refletiu sobre suas habilidades e interesses, aprendeu a fazer um currículo e a se comunicar profissionalmente. Agora é hora de unir tudo isso em um único projeto: o seu Mapa de Carreira."],
    ["img", "18_mapa_carreira.png", "Figura 19 — As quatro perguntas do Mapa de Carreira. Respondê-las bem vale mais do que um projeto bonito."],
    ["h3", "O que é o Mapa de Carreira?"],
    ["num", [
      "Quem você é hoje: suas habilidades, interesses, valores e ponto de partida.",
      "Para onde quer ir: as carreiras que mais te interessam e por quê.",
      "Como chegar lá: os passos que você vai dar no curto, médio e longo prazo.",
      "Seus próximos passos concretos: pelo menos 3 ações que você pode iniciar agora."
    ]],
    ["h3", "Formato"],
    ["p", "O Mapa de Carreira pode ser uma apresentação de slides (Canva, PowerPoint, Google Slides), um pôster criativo desenhado à mão, um documento de texto bem organizado ou um vídeo de apresentação pessoal. O importante é que seja autêntico, reflexivo e bem apresentado."],
    ["box", "atencao", "COMO O PROJETO SERÁ AVALIADO", [
      "Autoconhecimento — o mapa mostra reflexão real, não respostas genéricas (3,0 pontos).",
      "Pesquisa — as carreiras escolhidas estão descritas com informação correta e fonte citada (2,5 pontos).",
      "Plano de ação — os passos são concretos, com prazo, e não apenas desejos (2,5 pontos).",
      "Apresentação — organização, clareza e capricho no material (2,0 pontos)."
    ]],
    ["box", "atividade", "ATIVIDADE 17 — Construção do Mapa de Carreira", [
      "Dedique este encontro inteiro para construir o seu Mapa de Carreira. O professor estará disponível para orientar, tirar dúvidas e dar feedback.",
      "Ao final do encontro, cada aluno deve ter o projeto em versão preliminar pronto para apresentação.",
      "Material de apoio: o seu mapa de habilidades (Encontro 10), o seu plano em três horizontes (Encontro 11) e o seu currículo (Encontro 12)."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 17", [
      "O Mapa de Carreira é o produto final desta UC — e o ponto de partida para a sua vida profissional. Guarde-o e revise-o ao longo dos anos."
    ]]
  ]
},
// =====================================================================
{
  n: 18, titulo: "Apresentações e Encerramento", ch: "2 horas",
  icone: "🎓", tema: "CONECTAR",
  objetivos: [
    "Apresentar o Mapa de Carreira para a turma.",
    "Celebrar o percurso de aprendizagem.",
    "Receber feedback e orientações para os próximos passos."
  ],
  blocos: [
    ["h2", "Você chegou até aqui — e este é só o começo"],
    ["p", "Ao longo das últimas 36 horas, você embarcou em uma jornada de descoberta. Conheceu o mundo industrial e tecnológico, explorou profissões que mudam o mundo, refletiu sobre quem você é e onde quer chegar."],
    ["p", "Isso tudo — essa curiosidade, essa coragem de explorar, essa capacidade de se perguntar “quem eu quero ser?” — é o começo de uma trajetória profissional consciente e significativa."],
    ["p", "O mercado de trabalho precisa de jovens como você: curiosos, preparados, conectados e dispostos a aprender sempre. E Rio do Sul — e o Brasil — precisa de talentos que compreendam a indústria e a tecnologia como motores do desenvolvimento. Você é esse talento."],
    ["box", "atividade", "ATIVIDADE 18 — Apresentações finais", [
      "Cada aluno apresenta o seu Mapa de Carreira em até 5 minutos. A turma e o professor dão feedback positivo e sugestões construtivas.",
      "Ao final do encontro:",
      "• Celebração coletiva do percurso.",
      "• Carta para si mesmo: cada aluno escreve uma carta para ser aberta em 5 anos, descrevendo quem é hoje, o que sonha e o que planeja.",
      "• O professor entrega o certificado de participação no programa."
    ]],
    ["box", "reflexao", "CARTA PARA O MEU EU DE 5 ANOS", [
      "Escreva à mão, feche o envelope e escreva na frente: “Abrir em [mês/ano daqui a 5 anos]”. Sugestões do que colocar:",
      "• Quem eu sou hoje e do que eu gosto.",
      "• A carreira que eu escolhi neste momento — e por quê.",
      "• Três coisas que eu prometo tentar.",
      "• Uma coisa que eu tenho medo de que aconteça.",
      "• Uma mensagem de incentivo para mim mesmo."
    ]],
    ["box", "sintese", "SÍNTESE DO ENCONTRO 18", [
      "Parabéns! Você concluiu a UC de Exploração de Carreiras Industriais e Tecnológicas. Agora você tem um mapa — use-o, atualize-o e siga em frente com determinação."
    ]]
  ]
}
];

module.exports = { ENCONTROS };
