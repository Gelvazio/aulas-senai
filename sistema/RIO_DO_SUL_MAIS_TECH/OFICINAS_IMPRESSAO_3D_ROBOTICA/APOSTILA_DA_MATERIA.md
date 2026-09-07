# RIO DO SUL MAIS TECH
## SENAI | PREFEITURA MUNICIPAL DE RIO DO SUL

---

# OFICINAS DE IMPRESSÃO 3D E ROBÓTICA
## APOSTILA DO ALUNO

**Carga Horária Total:** 36 horas
**Público-alvo:** Alunos do 8º e 9º ano do Ensino Fundamental

---

## SOBRE ESTE MATERIAL

Esta apostila foi desenvolvida especialmente para você, aluno do programa **Rio do Sul Mais Tech**, como guia de estudo e referência para todas as atividades das Oficinas de Impressão 3D e Robótica. Aqui você vai encontrar explicações, curiosidades, desafios práticos e muito conteúdo para transformar ideias em realidade.

Guarde este material com carinho — ele é o mapa da sua jornada de criador!

---

## APRESENTAÇÃO

E aí, futuro inventor? Você sabia que é possível criar um objeto do zero usando apenas um computador e uma máquina que "imprime" em plástico? Ou que você pode programar um robô para executar tarefas de forma autônoma?

Pois é exatamente isso que você vai aprender nesta UC! Imagina poder projetar no computador uma peça personalizada — um suporte para celular, um porta-lápis com seu nome, um componente de engenharia — e em seguida "imprimir" esse objeto camada por camada. É quase mágica, mas é ciência!

E não para por aí: você também vai mergulhar no mundo da **robótica**, entendendo como os robôs percebem o mundo ao redor (sensores), como agem sobre ele (atuadores) e como recebem instruções (controladores e programação). No final, você vai juntar os dois mundos — imprimindo peças em 3D para montar seu próprio protótipo robótico!

Prepare-se para colocar a mão na massa, pensar fora da caixa e construir o futuro. Vamos lá?

---

## COMO ESTA APOSTILA ESTÁ ORGANIZADA

| Parte | Tema | Encontros | CH |
|---|---|---|---|
| **PARTE 1** | Impressão 3D | 1 ao 9 | 18h |
| **PARTE 2** | Robótica | 10 ao 18 | 18h |

Cada encontro tem duração de **2 horas** e está estruturado com:
- **Objetivos** — o que você vai aprender
- **Conteúdo** — explicação completa do tema
- **Atividade Prática** — mão na massa!
- **Síntese** — o que ficou de mais importante

---

## OBJETIVO DA UC

Proporcionar a você uma formação prática e interdisciplinar que combina **design**, **engenharia**, **programação** e **tecnologia**, por meio da construção de protótipos e robôs — desenvolvendo criatividade, raciocínio lógico e capacidade de resolver problemas reais.

---

## TABELA DE PERCURSO

| Encontro | Tema | CH |
|---|---|---|
| 1 | Do passado ao futuro: história e impacto da impressão 3D | 2h |
| 2 | Como funciona uma impressora 3D: FDM, SLA e SLS | 2h |
| 3 | Materiais para impressão 3D: filamentos e resinas | 2h |
| 4 | Primeiros passos no Tinkercad: interface e ferramentas básicas | 2h |
| 5 | Criando sólidos no Tinkercad: formas, furos e combinações | 2h |
| 6 | Projeto 1 no Tinkercad: modelando um objeto funcional | 2h |
| 7 | Do modelo ao arquivo: exportando STL e configurando o fatiamento | 2h |
| 8 | Boas práticas de design para impressão 3D | 2h |
| 9 | Impressão do Projeto 1 e análise dos resultados | 2h |
| 10 | Era dos robôs: história e evolução da robótica | 2h |
| 11 | Classificação dos robôs: industriais, de serviço e móveis | 2h |
| 12 | Sensores: como os robôs enxergam o mundo | 2h |
| 13 | Atuadores e motores: como os robôs agem | 2h |
| 14 | Controladores e microcontroladores: o cérebro do robô | 2h |
| 15 | Programação básica: trajetórias e sequências de movimento | 2h |
| 16 | Integração: imprimindo peças para o robô | 2h |
| 17 | Projeto Final: montagem do protótipo robótico | 2h |
| 18 | Apresentação dos projetos e avaliação final | 2h |

---

# PARTE 1 — IMPRESSÃO 3D

---

## ENCONTRO 1 — Do Passado ao Futuro: História e Impacto da Impressão 3D

### Objetivos
- Conhecer a origem e a evolução da impressão 3D
- Entender como essa tecnologia mudou a indústria e o cotidiano
- Reconhecer aplicações atuais da impressão 3D no mundo real

### Conteúdo

#### O que é impressão 3D?

Impressão 3D é um processo de fabricação que cria objetos físicos tridimensionais a partir de um modelo digital. Em vez de esculpir ou moldar um material, a impressora **adiciona material camada por camada** até formar o objeto completo. Por isso, esse processo também é chamado de **manufatura aditiva**.

#### Uma breve história

A impressão 3D não é tão nova quanto parece! Veja a linha do tempo:

| Ano | Marco |
|---|---|
| **1983** | Charles Hull inventa a estereolitografia (SLA) — a primeira técnica de impressão 3D do mundo |
| **1988** | Surge a técnica FDM (Fused Deposition Modeling), criada por Scott Crump |
| **1990s** | As primeiras impressoras 3D são usadas apenas na indústria — custavam centenas de milhares de dólares |
| **2009** | Expiram patentes do FDM, surgindo as primeiras impressoras acessíveis ao público (projeto RepRap) |
| **2010s** | Popularização: impressoras 3D chegam a escolas, makers e pequenas empresas |
| **Hoje** | Usadas em medicina, arquitetura, moda, aeroespacial, alimentos e muito mais! |

#### Para que serve a impressão 3D hoje?

A lista é enorme! Veja alguns exemplos incríveis:

- **Medicina:** próteses personalizadas, modelos de órgãos para treinamento cirúrgico, implantes ósseos
- **Arquitetura:** maquetes detalhadas de edifícios e até casas inteiras impressas em concreto
- **Aeroespacial:** peças leves e complexas para foguetes e satélites
- **Moda:** sapatos, acessórios e joias customizadas
- **Alimentos:** chocolates e massas com formatos impossíveis de fazer à mão
- **Educação:** modelos didáticos de ossos, moléculas, relevos geográficos

> **Caixa de Curiosidade:**
> Em 2022, uma empresa americana imprimiu em 3D uma casa inteira de concreto em apenas 12 horas! A impressora era do tamanho de um galpão e depositava uma mistura especial de cimento camada por camada. O custo foi muito menor que o de uma construção convencional.

#### Por que aprender impressão 3D?

Essa tecnologia está transformando a forma como produtos são criados. Em vez de precisar de fábricas e moldes caros, qualquer pessoa com uma impressora 3D e um computador pode criar peças únicas e funcionais. Para você, isso significa uma habilidade valiosa que abre portas em engenharia, design, programação e empreendedorismo!

### Atividade Prática

**Pesquisa e Debate:**
1. Pesquise na internet (ou pergunte ao professor) uma aplicação de impressão 3D que você achou surpreendente.
2. Apresente para a turma em até 2 minutos: o que é, como funciona e por que é importante.
3. Vote com a turma: qual aplicação é a mais impactante?

**Desafio criativo:** Se você pudesse imprimir qualquer coisa em 3D para a sua escola, o que seria? Desenhe um esboço no papel e explique para um colega.

### Síntese

A impressão 3D é uma revolução na fabricação de objetos — ela permite criar qualquer forma imaginável, de forma rápida, personalizada e cada vez mais acessível. Ao longo desta UC, você vai sair da teoria e colocar a mão na massa para criar seus próprios objetos!

---

## ENCONTRO 2 — Como Funciona uma Impressora 3D: FDM, SLA e SLS

### Objetivos
- Compreender o processo geral de impressão 3D
- Conhecer as três principais tecnologias: FDM, SLA e SLS
- Identificar vantagens e desvantagens de cada tecnologia

### Conteúdo

#### O processo geral

Toda impressão 3D segue basicamente 3 etapas:

1. **Modelagem digital** — você cria o objeto no computador usando um software 3D
2. **Fatiamento (Slicing)** — um software especial "fatia" o modelo em centenas ou milhares de camadas finas
3. **Impressão** — a impressora constrói o objeto camada por camada, seguindo as instruções do fatiamento

#### As três tecnologias principais

**1. FDM — Fused Deposition Modeling (Modelagem por Deposição de Material Fundido)**

É a tecnologia mais comum e acessível. Funciona assim:
- Um filamento plástico (geralmente PLA ou ABS) é puxado para uma cabeça de impressão chamada **extrusor**
- O extrusor aquece o filamento até fundir (~200°C) e o deposita sobre a plataforma
- A plataforma desce levemente e o extrusor deposita a próxima camada
- O plástico se solidifica rapidamente ao esfriar

**Vantagens:** barato, fácil de usar, filamentos variados
**Desvantagens:** acabamento com marcas de camadas visíveis, menos detalhado

**[Imagem descrita: corte lateral de uma impressora FDM mostrando o filamento entrando no extrusor, a cabeça quente depositando plástico fundido e as camadas se acumulando na base]**

---

**2. SLA — Stereolithography (Estereolitografia)**

Usa luz (laser UV ou LCD) para solidificar uma resina líquida fotossensível. Funciona assim:
- O objeto é construído dentro de uma cuba cheia de resina líquida
- Um laser UV ou tela LCD projeta a forma de cada camada, solidificando a resina naquele ponto
- A plataforma sobe (ou desce, dependendo do modelo), revelando a próxima camada de resina
- O objeto é retirado mergulhado em resina e precisa ser lavado e curado com luz UV

**Vantagens:** detalhes extremamente finos, superfície lisa
**Desvantagens:** mais caro, resina tóxica, requer pós-processamento

---

**3. SLS — Selective Laser Sintering (Sinterização Seletiva a Laser)**

Usa um laser poderoso para fundir/sinterizar pó (nylon, metal, cerâmica). Funciona assim:
- Uma camada de pó é espalhada sobre a plataforma
- Um laser aquece e funde os pontos exatos do pó conforme o design
- Uma nova camada de pó é depositada e o processo se repete
- O objeto terminado fica "enterrado" no pó não fundido (que serve de suporte natural!)

**Vantagens:** peças muito resistentes, sem necessidade de suportes artificiais, pode usar metal
**Desvantagens:** equipamento muito caro, necessita de expertise técnica

#### Comparativo

| Tecnologia | Custo do equipamento | Material | Detalhe | Uso comum |
|---|---|---|---|---|
| FDM | Baixo (a partir de R$ 2.000) | Filamento plástico | Médio | Escolas, makers, prototipagem |
| SLA | Médio (a partir de R$ 5.000) | Resina fotossensível | Alto | Joias, odontologia, figurinos |
| SLS | Alto (acima de R$ 100.000) | Pó de nylon/metal | Muito alto | Indústria aeroespacial, automotiva |

> **Caixa de Curiosidade:**
> A impressora 3D que existe na sua escola provavelmente usa tecnologia FDM — a mesma tecnologia que profissionais usam para criar protótipos de produtos antes de fabricar em série. Você está usando o mesmo processo que engenheiros da NASA e montadoras de automóveis!

### Atividade Prática

**Análise comparativa:**
1. Em grupos, cada equipe representa uma tecnologia (FDM, SLA ou SLS).
2. Pesquisem 3 produtos reais que são fabricados com a tecnologia da sua equipe.
3. Apresentem para a turma e discutam: por que essa tecnologia foi escolhida para esse produto?

### Síntese

FDM, SLA e SLS são as três grandes famílias da impressão 3D. Cada uma tem sua especialidade: FDM é acessível e versátil, SLA oferece detalhes precisos e SLS produz peças industriais resistentes. Nesta UC, vamos trabalhar principalmente com FDM!

---

## ENCONTRO 3 — Materiais para Impressão 3D: Filamentos e Resinas

### Objetivos
- Conhecer os principais materiais usados na impressão 3D
- Entender as propriedades e aplicações de cada material
- Saber escolher o material certo para cada projeto

### Conteúdo

#### Filamentos para FDM

Os filamentos são bobinas de plástico com diâmetro padronizado (1,75mm ou 2,85mm). Os mais comuns são:

**PLA (Ácido Polilático)**
- Material mais popular e fácil de usar
- Derivado de fontes vegetais (milho, cana-de-açúcar) — biodegradável!
- Temperatura de impressão: 180–220°C
- Vantagens: não precisa de mesa aquecida, poucos vapores, cores vibrantes
- Desvantagens: sensível ao calor (deforma acima de 60°C), frágil sob impacto
- Uso ideal: protótipos, objetos decorativos, materiais didáticos

**ABS (Acrilonitrila Butadieno Estireno)**
- Mais resistente e durável que o PLA
- O mesmo plástico dos blocos de LEGO!
- Temperatura de impressão: 220–250°C
- Vantagens: resistente ao calor e ao impacto, pode ser lixado e pintado
- Desvantagens: precisa de mesa aquecida, emite vapores, mais difícil de imprimir
- Uso ideal: peças mecânicas, carcaças de eletrônicos

**PETG (Polietileno Tereftalato Glicol)**
- Combina o melhor do PLA e do ABS
- Temperatura de impressão: 220–245°C
- Vantagens: resistente à água, durável, boa flexibilidade, poucos vapores
- Desvantagens: um pouco mais difícil de calibrar
- Uso ideal: peças que terão contato com líquidos, peças funcionais

**TPU (Poliuretano Termoplástico)**
- Filamento flexível e elástico!
- Temperatura de impressão: 220–240°C
- Uso ideal: capas de celular, solas, juntas e vedações

**Filamentos especiais:**
- **Metálicos:** mistura de pó metálico com plástico — visual de metal
- **Madeira:** mistura de fibra de madeira — cheiro e textura de madeira
- **Luminescentes:** brilham no escuro!
- **Condutivos:** conduzem eletricidade levemente

> **Caixa de Curiosidade:**
> Já existe filamento 3D feito de algas marinhas, cogumelos e até de plástico reciclado coletado em oceanos! A impressão 3D está cada vez mais conectada à sustentabilidade ambiental.

#### Resinas para SLA

Resinas são líquidos fotossensíveis que endurecem com luz UV. Tipos principais:

| Tipo | Propriedades | Uso |
|---|---|---|
| Resina padrão | Dura, rígida, detalhada | Protótipos gerais |
| Resina flexível | Elástica | Peças com borracha |
| Resina dentária | Biocompatível | Odontologia |
| Resina resistente | Alta resistência mecânica | Peças funcionais |

**Atenção:** resinas são tóxicas — sempre manuseie com luvas e em ambientes ventilados!

### Atividade Prática

**Teste de materiais:**
1. O professor vai distribuir amostras de peças impressas em PLA, ABS e PETG (ou imagens se não houver amostras).
2. Analise cada amostra: tente dobrar, riscar, verificar flexibilidade e acabamento superficial.
3. Preencha a tabela comparativa no caderno com suas observações.
4. Conclua: para que projeto você usaria cada material?

### Síntese

A escolha do material é tão importante quanto o design do objeto. PLA é perfeito para começar — fácil, bonito e biodegradável. À medida que seus projetos ficarem mais exigentes, você vai precisar de materiais mais resistentes como ABS e PETG.

---

## ENCONTRO 4 — Primeiros Passos no Tinkercad: Interface e Ferramentas Básicas

### Objetivos
- Conhecer a interface do Tinkercad
- Navegar pelo ambiente 3D com confiança
- Usar as ferramentas básicas de visualização e criação

### Conteúdo

#### O que é o Tinkercad?

O **Tinkercad** (tinkercad.com) é um programa gratuito de modelagem 3D desenvolvido pela Autodesk, especialmente voltado para iniciantes. Funciona diretamente no navegador — sem precisar instalar nada — e é usado em escolas, faculdades e por makers do mundo inteiro.

**Por que o Tinkercad?**
- Gratuito e em português
- Funciona no navegador (não precisa instalar)
- Interface simples e intuitiva
- Gera arquivos STL prontos para impressão
- Comunidade com milhares de modelos compartilhados

#### A interface do Tinkercad

Ao abrir um novo projeto, você verá:

**[Imagem descrita: captura de tela do Tinkercad mostrando: 1) painel lateral direito com formas básicas (sólidos coloridos e furos cinzas), 2) área de trabalho central com a grade (plano de trabalho), 3) cubo de visualização no canto superior direito para controlar o ângulo, 4) barra de ferramentas superior com funções de desfazer/refazer, agrupar e alinhar]**

**Elementos principais:**
- **Plano de trabalho (workplane):** a "mesa" onde seus objetos ficam. A grade ajuda a medir e posicionar
- **Painel de formas:** à direita, com dezenas de formas prontas para arrastar para a cena
- **Cubo de visualização:** no canto superior direito — clique nas faces para ver o modelo de frente, cima, lateral
- **Barra superior:** ferramentas de edição, desfazer/refazer, zoom, agrupamento

#### Navegando no espaço 3D

| Ação | Como fazer |
|---|---|
| Girar a câmera | Clique direito + arrastar |
| Zoom | Roda do mouse ou pinça no touchpad |
| Mover a câmera | Clique no scroll + arrastar |
| Ver de cima | Clique na face "Top" do cubo de visualização |
| Ver de frente | Clique na face "Front" do cubo de visualização |
| Selecionar objeto | Clique esquerdo sobre o objeto |
| Mover objeto | Arraste o objeto selecionado |

#### Adicionando e manipulando formas

1. **Arraste** uma forma do painel direito para a área de trabalho
2. Quando selecionado, o objeto mostra **pontos brancos** nas arestas (para escalar) e uma **seta preta** em cima (para mover na altura)
3. No painel que aparece ao selecionar, você digita as **dimensões exatas** (largura, altura, profundidade) em milímetros

> **Caixa de Curiosidade:**
> O nome "Tinkercad" vem de "tinker" (brincar, mexer, experimentar) + "CAD" (Computer-Aided Design — Design Assistido por Computador). A ideia é que qualquer pessoa possa "brincar" de fazer design!

### Atividade Prática

**Explorando o Tinkercad:**
1. Acesse tinkercad.com e crie uma conta gratuita (use o e-mail da escola ou pessoal).
2. Clique em "Criar novo design".
3. Arraste 5 formas diferentes para a área de trabalho.
4. Pratique: rotacione a câmera, faça zoom, mova os objetos.
5. Selecione um cubo e altere suas dimensões para exatamente: 30mm x 20mm x 10mm.
6. Salve com o nome "Minha primeira exploração".

### Síntese

O Tinkercad é sua porta de entrada para o mundo da modelagem 3D. Navegar no espaço 3D parece estranho no começo, mas com um pouco de prática você vai sentir que é quase intuitivo. Próximo encontro: vamos criar formas mais complexas!

---

## ENCONTRO 5 — Criando Sólidos no Tinkercad: Formas, Furos e Combinações

### Objetivos
- Criar e editar formas básicas no Tinkercad
- Usar a ferramenta "furo" para subtrair material
- Combinar múltiplas formas para criar objetos complexos

### Conteúdo

#### Tipos de formas no Tinkercad

O Tinkercad trabalha com dois tipos de formas:
- **Sólidos (coloridos):** adicionam material
- **Furos (cinza com tracejado):** removem material quando agrupados com um sólido

Essa lógica simples, combinando adição e subtração, permite criar praticamente qualquer objeto!

#### Operações básicas

**Escalar (redimensionar):**
- Selecione o objeto
- Arraste os pontos brancos nas bordas para redimensionar
- OU clique no quadro de dimensões e digite o valor exato

**Rotacionar:**
- Selecione o objeto
- Arraste as alças curvas que aparecem nos cantos
- OU segure Shift enquanto rotaciona para travá-lo em múltiplos de 22,5°

**Duplicar:**
- Selecione o objeto
- Ctrl+D (duplica no mesmo lugar) ou Ctrl+C / Ctrl+V

**Alinhar:**
- Selecione dois ou mais objetos (Shift + clique)
- Clique no botão "Alinhar" na barra superior
- Escolha como alinhar: centro, borda esquerda, borda direita, etc.

#### A mágica dos furos

Para fazer um furo em um objeto:
1. Crie o objeto sólido (ex: um cubo)
2. Arraste um cilindro do painel e posicione onde quer o furo
3. Com o cilindro selecionado, clique em "Furo" no painel que aparece — ele fica cinza
4. Selecione ambos os objetos (Shift + clique em cada um)
5. Clique em "Agrupar" (Ctrl+G)
6. Pronto! O cilindro "escava" o cubo, criando o furo

#### Combinando formas

A lógica de combinar sólidos e furos é infinita:
- Cubo + cilindro (furo) = cubo com buraco redondo
- Cubo + cubo (furo, menor) = cubo oco
- Esfera + cubo (ambos sólidos) = objeto misto
- Cilindro + cone (empilhados) = torre pontiaguda

> **Caixa de Curiosidade:**
> O método de criar objetos 3D por adição e subtração de formas simples é chamado de **CSG — Constructive Solid Geometry** (Geometria de Sólidos Construtiva). É o mesmo método usado por softwares profissionais como AutoCAD e SolidWorks!

### Atividade Prática

**Criando um porta-cartão:**
1. Abra um novo design no Tinkercad.
2. Crie um cubo com dimensões: 90mm x 55mm x 5mm (tamanho de um cartão de visita).
3. Crie outro cubo menor: 80mm x 45mm x 6mm. Transforme-o em furo.
4. Posicione o furo sobre o cubo maior, centralizado, com 5mm de margem em todos os lados.
5. Agrupe os dois — você terá uma caixa rasa para guardar cartões!
6. Adicione um cilindro sólido para criar uma aba de segurança.

**Desafio extra:** Adicione seu nome em relevo usando a forma "Texto" do painel de formas.

### Síntese

Com a técnica de sólidos e furos, você pode criar praticamente qualquer objeto no Tinkercad. A chave é pensar no objeto como uma combinação de formas simples — como um quebra-cabeça em 3D!

---

## ENCONTRO 6 — Projeto 1 no Tinkercad: Modelando um Objeto Funcional

### Objetivos
- Aplicar os conhecimentos dos encontros anteriores em um projeto completo
- Planejar antes de modelar
- Criar um objeto funcional do início ao fim

### Conteúdo

#### Planejamento: a etapa mais importante

Antes de abrir o Tinkercad, todo bom designer faz um planejamento:

1. **Definir o objeto:** o que será criado?
2. **Definir a função:** para que serve? Quem vai usar?
3. **Fazer um esboço no papel:** como o objeto vai parecer?
4. **Definir as dimensões:** tamanho real necessário em milímetros
5. **Listar as formas necessárias:** quais sólidos e furos serão usados?

Parece burocrático, mas esse planejamento economiza muito tempo na modelagem!

#### Processo de modelagem

**Passo 1 — Forma base:** comece sempre pelo volume principal do objeto.
**Passo 2 — Detalhe por detalhe:** adicione um elemento de cada vez.
**Passo 3 — Teste visualmente:** rotacione e observe de vários ângulos.
**Passo 4 — Ajuste as medidas:** verifique se as dimensões fazem sentido.
**Passo 5 — Revise:** o objeto cumpre sua função? É possível imprimir?

#### Opções de objetos funcionais para o Projeto 1

Escolha um dos projetos abaixo (ou proponha ao professor):

| Opção | Descrição | Desafio |
|---|---|---|
| **A** | Organizador de mesa (porta-lápis) | Cilindros combinados, base sólida |
| **B** | Suporte para celular | Ângulo inclinado, encaixe para cabo |
| **C** | Chaveiro personalizado com nome | Texto em relevo, furo para argola |
| **D** | Tampa personalizada para caixa | Encaixe de precisão milimétrica |
| **E** | Livre escolha do aluno | Precisa ser aprovado pelo professor |

### Atividade Prática

**Projeto 1 — Desenvolvimento:**
1. Escolha seu projeto e faça o esboço no papel (pelo menos 3 vistas: frente, cima, lateral).
2. Anote todas as dimensões que precisará.
3. Abra o Tinkercad e construa o objeto passo a passo.
4. Salve com o nome "Projeto1_SeuNome".
5. Mostre o resultado para o professor e um colega antes de finalizar.

### Síntese

O Projeto 1 é o primeiro objeto que você vai criar do início ao fim! Não precisa ser perfeito — o importante é aplicar o processo: planejar, modelar, revisar. O objeto será impresso no Encontro 9!

---

## ENCONTRO 7 — Do Modelo ao Arquivo: Exportando STL e Configurando o Fatiamento

### Objetivos
- Entender o que é o arquivo STL
- Exportar o modelo do Tinkercad em STL
- Conhecer as configurações básicas de um software de fatiamento (slicer)

### Conteúdo

#### O arquivo STL

**STL (Standard Tessellation Language ou STereoLithography)** é o formato padrão para impressão 3D. Um arquivo STL descreve a superfície de um objeto 3D como uma malha de triângulos — por isso o arquivo pode ser bem pequeno mesmo para modelos complexos.

Quando você exporta do Tinkercad, gera um arquivo .stl que pode ser aberto em qualquer software de fatiamento.

**Como exportar do Tinkercad:**
1. Certifique-se que todos os objetos estão agrupados corretamente
2. Clique em "Exportar" no canto superior direito
3. Escolha ".STL"
4. O arquivo é baixado automaticamente

#### O software de fatiamento (Slicer)

O slicer é o software que "fatia" o modelo em camadas e gera as instruções para a impressora (arquivo G-code). Os mais usados são:

- **Cura** (gratuito, da Ultimaker — o mais popular)
- **PrusaSlicer** (gratuito, da Prusa Research)
- **Bambu Studio** (gratuito, da Bambu Lab)

#### Configurações principais do slicer

Ao importar o STL no slicer, você ajusta:

| Configuração | O que é | Valor típico iniciante |
|---|---|---|
| **Altura de camada** | Espessura de cada camada impressa | 0,2mm |
| **Temperatura do bico** | Temperatura do extrusor | 200–210°C (PLA) |
| **Temperatura da mesa** | Temperatura da plataforma | 50–60°C (PLA) |
| **Preenchimento (infill)** | % de material interno sólido | 15–20% |
| **Velocidade** | Velocidade do movimento da cabeça | 50–60mm/s |
| **Suportes** | Estruturas para peças que "flutuam" | Ligado quando necessário |
| **Brim/Raft** | Bordas extras para aderência à mesa | Brim para peças pequenas |

#### Entendendo o infill

O infill (preenchimento interno) é uma das configurações mais importantes:

**[Imagem descrita: corte transversal de uma peça impressa mostrando diferentes padrões de infill — grade, hexagonal, triangular — com a camada externa (perímetro) sólida e o interior com padrão geométrico vazado]**

- **15–20%:** peças decorativas, protótipos leves
- **30–50%:** peças funcionais de uso geral
- **70–100%:** peças que precisam de máxima resistência

> **Caixa de Curiosidade:**
> A estrutura interna hexagonal usada em alguns infills imita a construção das colmeias de abelhas — uma das estruturas mais resistentes da natureza em relação ao peso de material usado. Engenheiros estudam a natureza para criar objetos mais eficientes!

### Atividade Prática

**Fatiando o Projeto 1:**
1. Exporte o arquivo STL do Projeto 1 que você criou no Encontro 6.
2. Abra o Cura (ou o slicer disponível na escola) e importe o arquivo.
3. Configure: camada 0,2mm, infill 20%, temperatura 200°C.
4. Observe a prévia do fatiamento: quantas camadas terá seu objeto? Quanto tempo vai levar?
5. Ajuste a posição do objeto na plataforma virtual se necessário.
6. Exporte o G-code e entregue ao professor para a fila de impressão.

### Síntese

O fluxo completo é: modelo no Tinkercad → exportar STL → abrir no slicer → configurar → exportar G-code → imprimir. Você acabou de completar todo esse fluxo com seu Projeto 1!

---

## ENCONTRO 8 — Boas Práticas de Design para Impressão 3D

### Objetivos
- Entender as limitações físicas da impressão 3D
- Aplicar regras de design que garantem impressões bem-sucedidas
- Saber quando e como usar suportes

### Conteúdo

#### Por que o design para impressão 3D é especial?

A impressão 3D constrói objetos de baixo para cima, camada por camada. Isso cria algumas limitações que não existem em outras formas de fabricação. Um designer experiente em 3D sempre considera essas limitações antes de modelar.

#### Regra 1 — Espessura mínima de paredes

Paredes muito finas quebram durante ou após a impressão. Regras gerais:
- Paredes verticais: mínimo de **1,2mm** (equivale a 3 filamentos para bico 0,4mm)
- Paredes horizontais: mínimo de **0,8mm**

**[Imagem descrita: dois cubos vistos de frente — o da esquerda com paredes finas (marcado com X vermelho) e o da direita com paredes adequadas (marcado com check verde)]**

#### Regra 2 — Regra dos 45°

A impressora 3D consegue imprimir ângulos de até 45° sem precisar de suporte. Ângulos mais fechados que isso ficam "pendurados no ar" e precisam de estruturas de suporte.

- **Ângulo ≤ 45°:** imprime sem suporte
- **Ângulo > 45° (mais horizontal):** precisa de suporte

#### Regra 3 — Orientação estratégica da peça

A direção em que uma peça é impressa afeta:
- A resistência (mais fraca entre camadas)
- A quantidade de suportes necessários
- O tempo de impressão
- O acabamento da superfície

Regra de ouro: **a superfície mais importante deve ser a que toca a mesa** (maior área, melhor acabamento).

#### Regra 4 — Tolerância para encaixes

Duas peças que precisam encaixar não devem ter exatamente o mesmo tamanho no modelo digital — precisam de uma **tolerância** de 0,2 a 0,5mm em cada lado para compensar a imprecisão da impressão.

Exemplo: um pino de 10mm de diâmetro entra em um buraco de 10,4mm de diâmetro.

#### Regra 5 — Evite volanças (overhangs) grandes

Partes do modelo que ficam "no ar" sem suporte abaixo são chamadas de **volanças** (overhangs). Minimize-as ou adicione suportes.

#### Quando usar suportes?

| Situação | Usar suporte? |
|---|---|
| Ângulo > 45° | Sim |
| Furos horizontais > 10mm | Sim |
| Pontes entre dois pontos | Às vezes |
| Ângulo < 45° | Não |
| Superfície vertical | Não |

> **Caixa de Curiosidade:**
> A "regra dos 45°" não é uma lei da física — é uma regra prática desenvolvida pela comunidade maker através de anos de testes e erros. É um ótimo exemplo de como o conhecimento coletivo de uma comunidade cria padrões melhores do que qualquer empresa sozinha poderia desenvolver!

### Atividade Prática

**Análise de designs:**
1. O professor vai mostrar 5 objetos 3D diferentes (imagens ou modelos virtuais).
2. Para cada objeto, identifique: há paredes muito finas? Há ângulos problemáticos? Precisaria de suporte?
3. Proponha uma modificação de design para melhorar cada objeto.
4. Revise seu Projeto 1 com base nas regras aprendidas — faça ajustes se necessário.

### Síntese

Design para impressão 3D tem suas próprias regras. As mais importantes: respeite espessuras mínimas, evite ângulos maiores que 45°, considere a orientação da peça e adicione tolerância para encaixes. Aplicar essas regras é a diferença entre uma impressão bem-sucedida e uma tragédia de plástico!

---

## ENCONTRO 9 — Impressão do Projeto 1 e Análise dos Resultados

### Objetivos
- Acompanhar o processo de impressão na prática
- Analisar os resultados da impressão
- Identificar pontos de melhoria para projetos futuros

### Conteúdo

#### O processo de impressão na prática

Agora é a hora da verdade — ver seu modelo digital se tornar um objeto real! Vamos entender o que acontece durante a impressão:

**Antes de imprimir:**
- Nivelamento da mesa (bed leveling): garante que a primeira camada adira corretamente
- Pré-aquecimento: bico e mesa atingem as temperaturas configuradas no slicer
- Carregamento do filamento: filamento é inserido e testado

**Durante a impressão:**
- **Primeira camada:** a mais crítica! Deve aderir perfeitamente à mesa
- **Camadas intermediárias:** o extrusor segue o caminho definido pelo G-code
- **Resfriamento:** o ventilador da impressora esfria cada camada rapidamente para solidificar

**Possíveis problemas e causas:**
| Problema | Causa provável |
|---|---|
| Peça não adere à mesa | Mesa mal nivelada, temperatura baixa |
| Spaghetti (filamento voando) | Peça soltou da mesa durante impressão |
| Camadas separando | Temperatura baixa, velocidade alta |
| Linhas visíveis grossas | Extrusão excessiva |
| Falhas no preenchimento | Temperatura alta, velocidade excessiva |

#### Pós-processamento

Depois de impressa, você pode melhorar sua peça:
- **Remover suportes:** use alicate de bico fino ou estilete com cuidado
- **Lixar:** começar com lixa grossa (120) e terminar com fina (400)
- **Pintar:** use tinta acrílica ou spray depois de lixar
- **Montar:** encaixar peças separadas, usar cola específica para plástico

### Atividade Prática

**Observação e análise:**
1. Acompanhe (se possível ao vivo) a impressão de ao menos uma peça.
2. Registre no caderno: qual problema você observou? A peça ficou como esperado?
3. Ao receber sua peça impressa, avalie: a função foi atingida? O acabamento agradou?
4. Preencha a **ficha de avaliação do Projeto 1:**
   - O que funcionou bem?
   - O que mudaria no design?
   - O que aprendeu para o próximo projeto?

> **Caixa de Curiosidade:**
> A NASA usa impressão 3D para criar peças de reposição na Estação Espacial Internacional diretamente no espaço! Em vez de esperar meses por uma entrega, os astronautas imprimem o que precisam na hora. A impressora 3D da ISS foi instalada em 2014 e já produziu dezenas de peças usadas na estação.

### Síntese

A Parte 1 está concluída! Você aprendeu sobre a história da impressão 3D, conheceu as tecnologias FDM, SLA e SLS, aprendeu a usar o Tinkercad, entendeu o processo de fatiamento e boas práticas de design — e criou seu primeiro objeto real! Agora prepare-se para a Parte 2: Robótica!

---

# PARTE 2 — ROBÓTICA

---

## ENCONTRO 10 — Era dos Robôs: História e Evolução da Robótica

### Objetivos
- Conhecer a história da robótica desde a antiguidade
- Entender como os robôs evoluíram ao longo dos séculos
- Identificar o impacto dos robôs na sociedade atual

### Conteúdo

#### O que é um robô?

Um **robô** é uma máquina programável capaz de realizar tarefas de forma autônoma ou semi-autônoma, interagindo com o ambiente físico através de sensores e atuadores.

A palavra "robô" foi criada pelo escritor checo Karel Čapek em 1920, em sua peça de teatro "R.U.R." (Rossum's Universal Robots). Em tcheco, "robota" significa trabalho forçado.

#### A linha do tempo da robótica

**Antiguidade — Autômatos mecânicos:**
- 350 a.C.: Arquitas de Tarento cria um pássaro mecânico movido a vapor
- Leonardo da Vinci (~1495): projeta um cavaleiro robótico articulado (descoberto em 1950)

**Século XVIII — XIX — Relógios e autômatos:**
- Pierre Jaquet-Droz (1774): cria bonecas mecânicas que escrevem, desenham e tocam música
- Desenvolvimento de máquinas industriais na Revolução Industrial

**Século XX — Os robôs modernos:**

| Ano | Marco |
|---|---|
| 1921 | A palavra "robô" é criada por Karel Čapek |
| 1942 | Isaac Asimov publica as "3 Leis da Robótica" |
| 1954 | George Devol inventa o Unimate — primeiro robô industrial |
| 1961 | Unimate começa a trabalhar na fábrica da General Motors |
| 1966 | Shakey: primeiro robô móvel com raciocínio básico (Stanford) |
| 1970 | Lunakhod 1: primeiro robô a explorar outro planeta (Lua) |
| 1997 | Sojourner explora Marte — robô rover |
| 2000 | ASIMO (Honda): robô humanoide que caminha e sobe escadas |
| 2002 | Roomba: primeiro robô de aspiração doméstica popular |
| 2011 | Watson (IBM) vence campeões humanos no Jeopardy! |
| 2020s | Veículos autônomos, robôs cirúrgicos, drones de entrega |

#### As 3 Leis da Robótica de Asimov

O escritor Isaac Asimov definiu em 1942 três leis que todo robô deveria seguir. Essas "leis" influenciaram décadas de ficção científica e até o pensamento real sobre ética na robótica:

1. **Um robô não pode ferir um ser humano** ou, por omissão, permitir que um ser humano seja ferido.
2. **Um robô deve obedecer às ordens dos seres humanos**, exceto quando essas ordens entram em conflito com a Primeira Lei.
3. **Um robô deve proteger sua própria existência**, desde que tal proteção não entre em conflito com a Primeira ou a Segunda Lei.

> **Caixa de Curiosidade:**
> O robô cirúrgico **Da Vinci** realiza mais de 1 milhão de cirurgias por ano no mundo! O cirurgião controla o robô de um console enquanto os braços mecânicos fazem incisões de precisão milimétrica dentro do corpo do paciente. O robô não age sozinho — é um sistema que amplifica a habilidade humana.

### Atividade Prática

**Linha do tempo colaborativa:**
1. Em grupos, cada equipe recebe uma época da história da robótica.
2. Pesquisem os principais marcos do período e ilustrem com imagens (impressas ou desenhadas).
3. Montem uma linha do tempo na parede da sala com todos os períodos.
4. Cada grupo apresenta sua parte para a turma.

### Síntese

A robótica não surgiu do nada — é fruto de séculos de sonhos, experimentos e inovações. Do pássaro mecânico de Arquitas ao robô cirúrgico Da Vinci, a humanidade sempre buscou criar máquinas que ampliassem nossas capacidades. E você está aprendendo a fazer parte dessa história!

---

## ENCONTRO 11 — Classificação dos Robôs: Industriais, de Serviço e Móveis

### Objetivos
- Conhecer as principais categorias de robôs
- Identificar exemplos reais de cada categoria
- Entender qual tipo de robô é adequado para cada aplicação

### Conteúdo

#### Por que classificar robôs?

Com tantos tipos de robôs existentes, precisamos de categorias para entendê-los melhor. A classificação mais usada divide os robôs pela sua função e ambiente de operação.

#### 1. Robôs Industriais

São os robôs usados em fábricas, para automatizar processos de produção em larga escala.

**Características:**
- Alta precisão e repetibilidade
- Trabalham em ambientes controlados
- Geralmente fixos em uma base
- Programados para tarefas específicas

**Tipos comuns:**
- **Braços robóticos (manipuladores):** soldagem, pintura, montagem de carros
- **Robôs de paletização:** empilham caixas em armazéns
- **Robôs SCARA:** montagem de eletrônicos (muito rápidos)
- **Robôs de coordenadas cartesianas (CNC):** fresadoras, roteadoras

**Exemplos reais:**
- Linhas de montagem da Tesla, VW, Toyota
- Braços robóticos da Fanuc, KUKA, ABB

#### 2. Robôs de Serviço

Robôs que auxiliam pessoas em tarefas fora do ambiente industrial.

**Subcategorias:**
- **Domésticos:** Roomba (aspirador), robôs de jardinagem, assistentes pessoais
- **Médicos:** Da Vinci (cirurgias), exoesqueletos de reabilitação, dispensadores de medicamentos
- **Educacionais:** Lego Mindstorms, robôs de programação para crianças
- **Entretenimento:** robôs em parques temáticos, brinquedos interativos
- **Militares e de segurança:** drones de vigilância, robôs de desarmamento de bombas

#### 3. Robôs Móveis

Robôs que se movem pelo ambiente, podendo ser autônomos ou teleoperados.

**Subcategorias:**
- **AGV (Automated Guided Vehicle):** veículos autônomos em armazéns (Amazon, Mercado Livre)
- **Rovers:** exploração espacial (Curiosity, Perseverance em Marte)
- **Drones/UAV:** vigilância, entrega de encomendas, fotografia aérea
- **Veículos autônomos:** carros sem motorista (Tesla, Waymo)
- **Robôs aquáticos/submarinos:** exploração oceânica

#### Robôs Humanoides — uma categoria especial

Robôs com forma humana, desenvolvidos para operar em ambientes projetados para pessoas:
- **ASIMO** (Honda) — pioneiro na locomoção bípede
- **Atlas** (Boston Dynamics) — caminha, pula, faz acrobacias
- **Sophia** (Hanson Robotics) — com inteligência artificial conversacional
- **Optimus** (Tesla) — voltado para trabalho em fábricas

> **Caixa de Curiosidade:**
> Os robôs do Amazon Fulfillment Center (centro de distribuição) não são humanoides — são plataformas baixas e quadradas que se movem sob as prateleiras e as carregam inteiras até os funcionários humanos! Isso é mais eficiente do que robôs humanoides tentando caminhar pelos corredores. A solução mais inteligente nem sempre é a mais parecida com humanos.

### Atividade Prática

**Caça ao robô:**
1. Cada aluno pesquisa e apresenta um robô real (não fictício) que nunca foi mencionado em aula.
2. Deve classificá-lo na categoria correta e justificar.
3. A turma vota: qual robô apresentado tem o maior impacto na vida das pessoas?

### Síntese

Robôs industriais dominam fábricas, robôs de serviço nos auxiliam no dia a dia e robôs móveis exploram ambientes inóspitos ou nos entregam encomendas. Conhecer essa classificação ajuda a entender qual tecnologia é adequada para cada problema.

---

## ENCONTRO 12 — Sensores: Como os Robôs Enxergam o Mundo

### Objetivos
- Compreender o papel dos sensores em sistemas robóticos
- Conhecer os principais tipos de sensores e suas aplicações
- Entender como os dados dos sensores guiam as ações do robô

### Conteúdo

#### O que são sensores?

Sensores são dispositivos que captam informações do ambiente e as convertem em sinais elétricos que o controlador (cérebro do robô) pode processar.

Assim como os seus sentidos (visão, audição, tato, olfato) permitem que você perceba o mundo e reaja a ele, os sensores são os "sentidos" dos robôs.

#### Tipos de sensores

**Sensores de proximidade e distância:**
- **Ultrassônico (HC-SR04):** emite som de alta frequência e mede o tempo de retorno. Detecta objetos de 2cm a 4m. Comum em robôs que desviam de obstáculos.
- **Infravermelho (IR):** detecta objetos próximos pela reflexão de luz infravermelha. Muito barato, mas sensível à luz ambiente.
- **LIDAR:** varredura a laser que cria um mapa 3D do ambiente. Usado em veículos autônomos.

**Sensores de luz:**
- **LDR (Light Dependent Resistor):** resistência que varia com a luminosidade. Detecta dia/noite.
- **Câmera + visão computacional:** processa imagens para reconhecer objetos, rostos, sinalizações.
- **Sensor de cor:** detecta cores de superfícies. Usado em robôs seguidores de linha.

**Sensores de toque e força:**
- **Botão/chave fim de curso:** detecta contato físico. "O robô chegou no limite de movimento."
- **Sensor de pressão/força:** mede força aplicada. Garra robótica que não esmaga objetos frágeis.

**Sensores de movimento e orientação:**
- **Encoder:** mede rotação de motores com precisão. "Quantas voltas deu a roda?"
- **Acelerômetro:** mede aceleração linear em 3 eixos. Sabe se está caindo ou inclinando.
- **Giroscópio:** mede velocidade de rotação. Mantém o equilíbrio de drones.
- **IMU (Inertial Measurement Unit):** combina acelerômetro + giroscópio.
- **GPS:** localização geográfica. Para robôs e drones ao ar livre.

**Sensores ambientais:**
- **Temperatura (DHT11/22, LM35):** mede temperatura do ar
- **Umidade (DHT11/22):** mede umidade relativa do ar
- **Gás (MQ-X):** detecta gases específicos (CO, metano, álcool)
- **pH:** mede acidez/basicidade de líquidos

**[Imagem descrita: fotografia de uma placa de papelão com 6 sensores diferentes montados: ultrassônico, IR, LDR, DHT11, encoder e botão, cada um com uma etiqueta identificando seu nome]**

#### Da leitura à ação

O processo é sempre o mesmo:
1. Sensor coleta dado do ambiente
2. Dado é enviado ao controlador (número ou sinal)
3. Controlador interpreta o dado com base na programação
4. Controlador envia comando para o atuador agir
5. Robô realiza a ação

Exemplo: Sensor ultrassônico detecta obstáculo a 15cm → controlador recebe distância 15 → programa diz "se distância < 20cm, vire à direita" → motores giram para virar o robô.

> **Caixa de Curiosidade:**
> O rover Perseverance, que explora Marte, tem 23 câmeras, sensores de vento, temperatura, pressão atmosférica, um microfone (o primeiro a capturar som em Marte!) e até um sensor de raios-X para analisar rochas. Toda essa "sensorização" permite que cientistas na Terra entendam Marte sem nunca ter ido lá.

### Atividade Prática

**Mapeamento de sensores:**
1. Pegue um objeto tecnológico do seu dia a dia (celular, smartwatch, carro se alguém tiver foto, aspirador Roomba).
2. Liste todos os sensores que você imagina que esse dispositivo tem.
3. Para cada sensor, explique: o que ele detecta e como essa informação é usada pelo dispositivo.
4. Compare com um colega: quem encontrou mais sensores?

**Desafio:** seu celular tem quantos sensores? Pesquise e surpreenda-se!

### Síntese

Sem sensores, um robô é cego e surdo para o mundo ao redor. Os sensores transformam grandezas físicas (distância, luz, temperatura) em dados que o controlador pode entender e usar para tomar decisões. Na próxima aula, vamos entender como o robô AGE a partir dessas informações!

---

## ENCONTRO 13 — Atuadores e Motores: Como os Robôs Agem

### Objetivos
- Compreender o papel dos atuadores nos sistemas robóticos
- Conhecer os principais tipos de motores usados em robótica
- Entender como os controladores comandam os atuadores

### Conteúdo

#### O que são atuadores?

Se sensores são os "sentidos" do robô, os **atuadores** são seus "músculos" — dispositivos que convertem energia elétrica em movimento ou outra forma de ação física.

#### Tipos de atuadores

**Motores elétricos — os mais comuns na robótica:**

**Motor DC (Corrente Contínua):**
- Motor simples com dois fios: + e -
- Velocidade controlada pela tensão
- Sentido de rotação controlado pela polaridade
- Barato e disponível em vários tamanhos
- Problema: não sabe sua posição exata sem encoder
- Uso: robôs móveis simples, ventiladores

**Motor com Encoder (Motor DC + Encoder):**
- Motor DC com sensor de posição integrado
- Permite controle preciso de distância percorrida
- Uso: robôs móveis de precisão média

**Servo Motor:**
- Gira para uma posição específica (0° a 180°, geralmente)
- Controlado por sinal PWM (largura de pulso)
- Mantém a posição mesmo com carga
- Uso: braços robóticos, timoneiras de drones, garras

**Motor de Passo (Stepper Motor):**
- Divide uma volta em passos precisos (ex: 200 passos = 360°)
- Permite posicionamento muito preciso sem encoder
- Uso: impressoras 3D (sim!), plotters, CNCs

**Motor Brushless (BLDC):**
- Muito eficiente, potente e durável
- Controlado por ESC (Electronic Speed Controller)
- Uso: drones, carros elétricos, eletrodomésticos modernos

#### Outros tipos de atuadores

**Servos lineares e solenoides:**
- Movimento linear (empurrar/puxar) em vez de rotativo
- Uso: travas eletrônicas, válvulas, sistemas pneumáticos

**Bombas e válvulas:**
- Controlam fluxo de líquidos e gases
- Uso: robôs de agricultura, sistemas hidráulicos industriais

**LEDs e displays:**
- Atuadores de luz — comunicam informação visual
- Uso: sinalização, feedback visual ao usuário

**Buzzers e alto-falantes:**
- Atuadores de som — emitem bipes, alarmes, voz
- Uso: alertas, interfaces sonoras

#### O motor de passo na impressora 3D

Lembra da impressão 3D? Os movimentos precisos do extrusor e da mesa são controlados por **motores de passo**! É por isso que a impressora sabe exatamente onde depositar cada fio de plástico — cada "passo" do motor equivale a uma fração de milímetro de movimento.

> **Caixa de Curiosidade:**
> Os músculos artificiais são atuadores feitos de materiais especiais que se contraem quando aquecidos ou quando recebem eletricidade, imitando os músculos biológicos. Pesquisadores já criaram robôs "macios" (soft robots) feitos de silicone e músculos artificiais que se movem de forma muito parecida com animais — e são muito mais seguros para trabalhar perto de humanos!

### Atividade Prática

**Desmontagem e análise:**
1. O professor vai mostrar (ou desmontar) um servo motor e um motor DC.
2. Observe as diferenças internas e externas.
3. Responda no caderno: por que um servo é melhor para uma garra robótica que um motor DC simples?
4. Desenhe um robô simples e indique quais atuadores você usaria em cada parte (rodas, garra, pescoço, etc.).

### Síntese

Motores DC são simples e baratos, servos oferecem posicionamento preciso, e motores de passo permitem controle milimétrico — cada um tem sua especialidade. Conhecer esses atuadores é fundamental para projetar um robô capaz de fazer o que você precisa.

---

## ENCONTRO 14 — Controladores e Microcontroladores: O Cérebro do Robô

### Objetivos
- Entender o papel do controlador em um sistema robótico
- Conhecer o Arduino e outros microcontroladores comuns
- Compreender como a programação conecta sensores e atuadores

### Conteúdo

#### O que é um controlador?

O controlador é o "cérebro" do robô — o componente que lê os sensores, processa as informações com base na programação e envia comandos para os atuadores.

Em sistemas robóticos educacionais e de prototipagem, o controlador mais comum é o **microcontrolador** — um pequeno chip que contém processador, memória e pinos de entrada/saída em um único componente.

#### Arduino — o microcontrolador mais popular do mundo

O **Arduino** é uma plataforma de hardware e software livre (open-source) criada em 2005 na Itália. É o ponto de entrada para milhões de makers, estudantes e engenheiros no mundo inteiro.

**Por que Arduino?**
- Barato (a partir de R$ 40 o clone)
- Enorme comunidade e quantidade de tutoriais gratuitos
- Software (IDE) gratuito e disponível para todos os sistemas operacionais
- Compatível com centenas de módulos e sensores
- Código em linguagem C/C++ simplificada

**Modelos principais de Arduino:**
| Modelo | Uso principal |
|---|---|
| Arduino Uno | Aprendizado, projetos gerais |
| Arduino Nano | Projetos compactos |
| Arduino Mega | Projetos com muitos pinos |
| Arduino Leonardo | Emula teclado/mouse via USB |

#### A anatomia do Arduino Uno

**[Imagem descrita: foto do Arduino Uno com setas identificando: microcontrolador ATmega328P (chip principal), pinos digitais 0-13, pinos analógicos A0-A5, pinos de alimentação (5V, 3.3V, GND), conector USB para programação e alimentação, e conector de alimentação externa 7-12V]**

**Pinos mais importantes:**
- **Digitais (0-13):** leem 0 ou 1 (ligado/desligado). Alguns suportam PWM (~)
- **Analógicos (A0-A5):** leem valores de 0 a 1023 (0V a 5V)
- **PWM (~):** saída analógica simulada — controla velocidade de motores e brilho de LEDs
- **GND:** terra (referência de 0V)
- **5V/3.3V:** saídas de tensão para alimentar sensores

#### A estrutura de um programa Arduino

Todo programa Arduino (chamado de "sketch") tem dois blocos obrigatórios:

```cpp
void setup() {
  // Executado UMA VEZ quando o Arduino liga
  // Configura pinos, velocidade de comunicação, etc.
  pinMode(13, OUTPUT); // Define pino 13 como saída
}

void loop() {
  // Executado CONTINUAMENTE em loop infinito
  // Aqui fica a lógica principal do robô
  digitalWrite(13, HIGH); // Liga LED no pino 13
  delay(1000);             // Espera 1 segundo
  digitalWrite(13, LOW);  // Desliga LED
  delay(1000);             // Espera 1 segundo
}
```

Esse é o "Hello World" da robótica: fazer um LED piscar (Blink)!

#### Outros microcontroladores

| Plataforma | Diferencial |
|---|---|
| **Raspberry Pi** | Mini-computador com Linux, câmera, WiFi integrado |
| **ESP32** | Arduino com WiFi e Bluetooth integrado |
| **micro:bit** | Para crianças — LEDs, acelerômetro, radio |
| **STM32** | Para aplicações industriais de alta performance |

> **Caixa de Curiosidade:**
> O Mars Rover Curiosity é controlado por um processador RAD750 que roda a apenas 200MHz — menos potente que um celular de entrada de 2010. Mas é blindado contra radiação cósmica e funciona a -120°C! Para o espaço, confiabilidade extrema é mais importante que velocidade.

### Atividade Prática

**Primeiro sketch — LED piscante:**
1. Conecte um Arduino Uno ao computador via USB.
2. Abra a IDE do Arduino.
3. Carregue o exemplo: Arquivo → Exemplos → 01.Basics → Blink.
4. Clique em "Verificar" (para compilar) e depois em "Carregar" (para enviar ao Arduino).
5. Observe o LED embutido no pino 13 piscando!
6. Modifique os valores de `delay()` para mudar a velocidade de piscar.

**Desafio:** faça o LED piscar em código Morse: S.O.S. (3 curtos, 3 longos, 3 curtos).

### Síntese

O Arduino é a ponte entre o mundo digital (programação) e o mundo físico (motores, sensores, LEDs). Com um Arduino e criatividade, você pode construir praticamente qualquer projeto robótico. Nos próximos encontros, vamos programar movimentos!

---

## ENCONTRO 15 — Programação Básica: Trajetórias e Sequências de Movimento

### Objetivos
- Programar sequências de movimentos em um robô
- Entender o conceito de trajetória programada
- Controlar motores DC com o Arduino

### Conteúdo

#### Controlando motores com Arduino

Para controlar motores DC com Arduino, precisamos de um **driver de motor** (ponte H). O mais comum para aprendizado é o **L298N** ou o módulo com L293D.

**Por que precisamos do driver?**
O Arduino fornece no máximo 40mA por pino — insuficiente para motores. O driver recebe essa ordem fraca e fornece a corrente necessária para o motor a partir de uma fonte externa.

**Conexão básica L298N + Arduino:**
- ENA → Pino PWM do Arduino (controle de velocidade)
- IN1, IN2 → Pinos digitais (controle de direção)
- Motor A → Motor

#### Controlando velocidade (PWM)

PWM (Pulse Width Modulation) = Modulação por Largura de Pulso

O Arduino simula tensões intermediárias pulsando o sinal rapidamente entre HIGH e LOW. O valor vai de 0 (sempre desligado = 0V) a 255 (sempre ligado = 5V).

```cpp
// Controlar velocidade do motor
analogWrite(ENA, 150); // 150/255 = ~59% da velocidade máxima
```

#### Controlando direção

```cpp
// Motor para frente
digitalWrite(IN1, HIGH);
digitalWrite(IN2, LOW);

// Motor para trás
digitalWrite(IN1, LOW);
digitalWrite(IN2, HIGH);

// Motor parado
digitalWrite(IN1, LOW);
digitalWrite(IN2, LOW);
```

#### Programando trajetórias

Com dois motores (robô de duas rodas) podemos criar trajetórias:

```cpp
// Andar para frente por 2 segundos
motorFrente();
delay(2000);

// Virar à direita por 0.5 segundos
motorDireita();
delay(500);

// Andar para frente por mais 1 segundo
motorFrente();
delay(1000);

// Parar
motorParar();
```

Essa sequência define uma trajetória em "L".

#### Trajetórias mais sofisticadas

Com encoders (sensores de rotação nos motores), é possível controlar a distância percorrida com precisão:
- 1 rotação da roda = circunferência da roda
- Roda de 65mm de diâmetro: 1 rotação = π × 65mm ≈ 204mm
- Para andar 50cm: 500mm ÷ 204mm ≈ 2,45 rotações do motor

> **Caixa de Curiosidade:**
> Os robôs industriais são programados com linguagens específicas como RAPID (ABB), KRL (KUKA) e TP (FANUC). Um programador de robô industrial aprende a definir pontos no espaço (coordenadas XYZ + orientação) e o robô interpola automaticamente a trajetória mais suave entre eles. É como o GPS do carro calculando o caminho entre dois pontos!

### Atividade Prática

**Robô em trajetória:**
1. Monte um robô com chassi de dois motores + Arduino + L298N (ou use o kit disponível).
2. Programe as funções: frente(), trás(), esquerda(), direita(), parar().
3. Programe a trajetória de um quadrado: frente → esquerda → frente → esquerda → frente → esquerda → frente → esquerda.
4. Ajuste os tempos de delay até o robô fazer um quadrado razoavelmente preciso.
5. **Desafio:** programe a letra inicial do seu nome!

### Síntese

Programar trajetórias é essencial na robótica — é assim que robôs industriais sabem onde ir, como robôs aspiradores cobrem toda a sala e como rovers em Marte exploram terreno. Você acabou de dar o primeiro passo nesse mundo!

---

## ENCONTRO 16 — Integração: Imprimindo Peças para o Robô

### Objetivos
- Integrar os conhecimentos de impressão 3D e robótica
- Projetar peças impressas funcionais para sistemas robóticos
- Planejar o Projeto Final

### Conteúdo

#### A impressão 3D na robótica

A combinação de impressão 3D com robótica é uma das mais poderosas do mundo maker! Com ela você pode:
- **Criar carcaças** personalizadas para proteger os componentes eletrônicos
- **Projetar garras** customizadas para tarefas específicas
- **Fazer suportes** para posicionar sensores na posição exata necessária
- **Construir chassi** leve e resistente para robôs móveis
- **Criar peças de transmissão** (engrenagens, polias, acoplamentos)

#### Princípios de design de peças robóticas

**Tolerância para encaixes mecânicos:**
- Encaixe solto (livre): 0,5mm de folga por lado
- Encaixe firme (deslizante): 0,2mm de folga por lado
- Encaixe a pressão: 0,1mm ou negativo

**Furos para parafusos:**
| Parafuso | Furo passante | Rosqueado no plástico |
|---|---|---|
| M2 | 2,2mm | 1,6mm |
| M3 | 3,2mm | 2,5mm |
| M4 | 4,2mm | 3,3mm |

**Considerações estruturais:**
- Imprima peças que suportam carga na direção que as camadas ficam paralelas ao esforço
- Adicione nervuras (reforços) em paredes que sofrerão flexão
- Use pelo menos 30% de infill para peças funcionais

#### Integrando sensores em peças impressas

Ao projetar uma peça que vai segurar um sensor, você precisa:
1. Pesquisar as dimensões exatas do sensor (datasheet)
2. Criar cavidades com folga adequada (0,3mm por lado)
3. Planejar como os fios vão passar
4. Garantir que o sensor ficará na posição certa para funcionar

### Atividade Prática

**Planejamento do Projeto Final:**
1. Em duplas, decidam o tipo de protótipo robótico que vão construir:
   - Robô seguidor de linha com carcaça impressa
   - Garra robótica com servo e base impressa
   - Mini-carro com chassi impresso e controle por sensor
   - Proposta própria (aprovada pelo professor)

2. Façam o esboço completo no papel:
   - Vista explodida das peças impressas necessárias
   - Localização de cada sensor e atuador
   - Esquema de conexão elétrica simplificado
   - Lista de materiais necessários

3. Apresentem o plano ao professor para aprovação e inicie a modelagem no Tinkercad.

### Síntese

A impressão 3D e a robótica se complementam perfeitamente: a primeira cria as peças físicas, a segunda as anima. Nos próximos dois encontros, você vai construir seu Projeto Final que une os dois mundos!

---

## ENCONTRO 17 — Projeto Final: Montagem do Protótipo Robótico

### Objetivos
- Montar o protótipo robótico planejado no Encontro 16
- Integrar as peças impressas com os componentes eletrônicos
- Testar e ajustar o funcionamento

### Conteúdo

#### O processo de integração

Montar um protótipo robótico é um processo iterativo — raramente funciona na primeira tentativa, e isso é completamente normal! O processo é:

1. **Montar a estrutura:** encaixar as peças impressas e fixar os componentes
2. **Fazer a fiação:** conectar sensores, motores e controlador
3. **Carregar o programa:** fazer o upload do código para o Arduino
4. **Testar:** ligar e observar o comportamento
5. **Diagnosticar problemas:** o que não funcionou como esperado?
6. **Ajustar:** modificar código, conexões ou peças conforme necessário
7. **Iterar:** repetir os passos 3-6 até atingir o objetivo

#### Checklist antes de ligar

Antes de ligar qualquer sistema eletrônico:
- [ ] Todas as conexões estão no lugar correto?
- [ ] Não há fios tocando onde não deveriam?
- [ ] A polaridade da alimentação está correta?
- [ ] O código foi compilado sem erros?
- [ ] Os pinos no código batem com as conexões físicas?

#### Depuração (debugging) de problemas comuns

| Sintoma | Possível causa | Solução |
|---|---|---|
| Nada funciona | Sem alimentação | Verificar conexões de energia |
| Motor não gira | Fio solto ou driver queimado | Testar conexões, substituir driver |
| Robô vai ao contrário | Polaridade do motor invertida | Inverter os fios do motor |
| Sensor dá leituras erradas | Fio solto ou pino errado | Verificar código e conexões |
| Arduino reinicia sozinho | Sobrecarga de corrente | Alimentar motor por fonte separada |

> **Caixa de Curiosidade:**
> A montagem do rover Perseverance envolveu mais de 1.000 engenheiros trabalhando por 7 anos. Mesmo assim, tiveram que fazer dezenas de ajustes durante a montagem! O processo de construir, testar, ajustar e testar novamente é chamado de "engenharia iterativa" e é a base de todo desenvolvimento tecnológico profissional.

### Atividade Prática

**Montagem e testes do Projeto Final:**
1. Receba as peças impressas (impressas pelo professor nos encontros anteriores ou durante a semana).
2. Monte seguindo o plano desenvolvido no Encontro 16.
3. Faça as conexões elétricas cuidadosamente.
4. Carregue o programa no Arduino.
5. Teste e anote todos os problemas encontrados.
6. Ajuste e reteste.
7. Documente com fotos (use o celular): antes de ligar, funcionando, detalhes interessantes.

### Síntese

Montar um protótipo é onde a teoria encontra a realidade — e onde você aprende mais do que em qualquer aula expositiva! Cada problema encontrado e resolvido te torna um engenheiro melhor. Amanhã é o grande dia: apresentações!

---

## ENCONTRO 18 — Apresentação dos Projetos e Avaliação Final

### Objetivos
- Apresentar o projeto para a turma e professores
- Comunicar de forma clara o processo e os resultados
- Celebrar as conquistas da UC!

### Conteúdo

#### Como fazer uma boa apresentação técnica

Apresentar um projeto técnico tem uma estrutura própria:

1. **O problema:** qual desafio você quis resolver?
2. **A solução:** como você resolveu?
3. **O processo:** o que fez, quais dificuldades encontrou?
4. **Demonstração:** mostre funcionando!
5. **O que aprendeu:** qual foi a maior lição?
6. **Próximos passos:** o que faria diferente ou como evoluiria o projeto?

**Dicas para uma boa apresentação:**
- Fale com confiança — você é o especialista no seu projeto!
- Use o protótipo como apoio visual — mostre as partes enquanto fala
- Não tenha medo de falar de erros — mostrar como resolveu problemas é impressionante
- Seja conciso: 5 minutos por equipe é o ideal

#### Rubrica de avaliação

| Critério | Peso |
|---|---|
| Funcionamento do protótipo | 30% |
| Qualidade das peças impressas | 20% |
| Qualidade do código/programação | 20% |
| Clareza da apresentação | 15% |
| Trabalho em equipe (avaliação pelos colegas) | 15% |

### Atividade Final

**Feira de protótipos:**
1. Cada equipe prepara uma bancada com seu protótipo e uma cartolina/poster descrevendo o projeto.
2. Apresentações de 5 minutos por equipe, com 3 minutos de perguntas.
3. Avaliação pelos professores e pelos colegas (formulário de peer review).
4. Votação da turma: Prêmio de Criatividade, Prêmio de Funcionalidade e Prêmio de Apresentação.

> **Caixa de Curiosidade:**
> A primeira Maker Faire foi realizada em San Mateo, Califórnia, em 2006. Hoje existem Maker Faires em mais de 40 países, incluindo o Brasil! São eventos onde makers de todas as idades mostram seus projetos — exatamente como a Feira de Protótipos de hoje. Você está participando de uma tradição global de criadores!

---

## GLOSSÁRIO

**Atuador:** Dispositivo que converte energia elétrica em movimento ou outra ação física.

**Arduino:** Plataforma de hardware e software livre para prototipagem eletrônica, baseada em microcontrolador.

**CAD (Computer-Aided Design):** Design Assistido por Computador — criação de modelos digitais em software específico.

**Encoder:** Sensor que mede a rotação de eixos com precisão, permitindo controle de posição e velocidade.

**Extrusor:** Componente da impressora 3D FDM que aquece e deposita o filamento.

**FDM (Fused Deposition Modeling):** Tecnologia de impressão 3D que deposita plástico fundido camada por camada.

**Fatiamento (Slicing):** Processo de dividir um modelo 3D em camadas para gerar instruções de impressão.

**Filamento:** Material plástico em forma de fio usado em impressoras 3D FDM.

**G-code:** Linguagem de programação de máquinas CNC e impressoras 3D — contém as instruções de movimento e temperatura.

**Infill:** Preenchimento interno de uma peça impressa em 3D, expresso em porcentagem.

**LIDAR:** Sensor que usa laser para criar mapas 3D do ambiente.

**Microcontrolador:** Chip que contém processador, memória e pinos de I/O para controlar sistemas eletrônicos.

**Motor de Passo (Stepper):** Motor elétrico que se move em incrementos precisos, usado em impressoras 3D e CNCs.

**Overchanig (Volança):** Parte de um modelo 3D que não tem suporte abaixo — pode ser problemática na impressão.

**PLA:** Ácido Polilático — filamento biodegradável mais usado em impressão 3D educacional.

**Ponte H (Driver de Motor):** Circuito que permite controlar direção e velocidade de motores DC com sinais de microcontrolador.

**Protótipo:** Versão inicial de um produto, usada para testar e validar conceitos antes da produção final.

**PWM (Pulse Width Modulation):** Técnica para simular saídas analógicas com um microcontrolador digital.

**Servo Motor:** Motor com controle preciso de posição angular, controlado por sinal PWM.

**SLA (Stereolithography):** Tecnologia de impressão 3D que usa luz UV para solidificar resina fotossensível.

**SLS (Selective Laser Sintering):** Tecnologia de impressão 3D que usa laser para sinterizar pó de nylon ou metal.

**STL:** Formato de arquivo padrão para troca de modelos 3D entre software de modelagem e impressoras.

**Tinkercad:** Software gratuito de modelagem 3D baseado em navegador, desenvolvido pela Autodesk.

---

## REFERÊNCIAS SUGERIDAS

### Sites
- **Tinkercad:** tinkercad.com — modelagem 3D gratuita no navegador
- **Arduino:** arduino.cc — documentação oficial, tutoriais e fórum
- **Instructables:** instructables.com — projetos maker passo a passo
- **Thingiverse:** thingiverse.com — banco de modelos 3D gratuitos para baixar e imprimir
- **Printables:** printables.com — mais modelos 3D gratuitos da comunidade Prusa

### Canais no YouTube (em português)
- **FilipeFlop** — tutoriais de Arduino para iniciantes
- **WR Kits** — projetos de robótica e eletrônica
- **Maker Hero** — impressão 3D e projetos maker

### Livros
- MONK, Simon. **Programação com Arduino**. Bookman, 2013.
- BLUM, Jeremy. **Explorando o Arduino**. Alta Books, 2016.
- LIPSON, Hod; KURMAN, Melba. **Fabricated: The New World of 3D Printing**. Wiley, 2013.

---

*Material desenvolvido para o Programa Rio do Sul Mais Tech*
*SENAI — Prefeitura Municipal de Rio do Sul*
*Unidade Curricular: Oficinas de Impressão 3D e Robótica — 36h*
