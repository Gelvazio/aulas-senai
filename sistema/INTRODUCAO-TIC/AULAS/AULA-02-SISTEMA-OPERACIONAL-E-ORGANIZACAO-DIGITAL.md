# AULA 02 — Sistema Operacional e Organização Digital

**Programa:** Educação para o Trabalho — SENAI
**UC:** Introdução à Tecnologia da Informação e Comunicação
**Duração:** 4 horas presenciais
**Ambiente:** Laboratório de informática
**Data:** ___/___/______

---

## Objetivos de Aprendizagem

Ao final desta aula, o aluno será capaz de:
- Explicar o que é um sistema operacional e quais funções ele desempenha;
- Reconhecer os principais tipos de sistema operacional e onde cada um é usado;
- Utilizar periféricos de entrada e saída, incluindo instalação e remoção segura de pen drive;
- Construir uma estrutura de pastas coerente para uso profissional;
- Pesquisar arquivos e diretórios usando busca por nome, tipo e data;
- Compactar e descompactar arquivos para armazenamento e envio.

> **Cobertura da ementa:** item 4.7 — tipos de sistema operacional, fundamentos e funções do
> sistema operacional, barra de ferramentas, utilização de periféricos, organização de
> arquivos em pastas, pesquisa de arquivos e diretórios, área de trabalho e compactação.

---

## Conteúdo Programático

### 1. Retomada e correção da tarefa (20 min)

Compartilhamento das listas de hardware e software trazidas de casa. O professor organiza
no quadro uma lista coletiva e corrige classificações equivocadas.

### 2. O que é um Sistema Operacional (45 min)

**Definição:** o sistema operacional (SO) é o **software básico** que faz a ponte entre o
usuário, os programas e o hardware. Sem ele, o computador é apenas um conjunto de peças.

**Analogia:**
> O SO é o **encarregado do setor**. O usuário pede ("quero imprimir"), e o encarregado
> decide qual máquina usa, em que ordem, com quanta memória e por quanto tempo.

#### Funções principais do sistema operacional

| Função | O que faz na prática |
|---|---|
| **Gerenciar processos** | Decide quais programas rodam e por quanto tempo |
| **Gerenciar memória** | Distribui a RAM entre os programas abertos |
| **Gerenciar arquivos** | Organiza pastas, permissões, gravação e leitura no disco |
| **Gerenciar dispositivos** | Controla teclado, impressora, rede e pen drive (drivers) |
| **Fornecer interface** | Apresenta a área de trabalho, janelas, menus e ícones |
| **Cuidar da segurança** | Controla contas de usuário, senhas e permissões de acesso |

#### Tipos de sistema operacional

**Quanto ao equipamento:**
- **Desktop e notebook:** Windows, Linux (Ubuntu, Mint, Fedora), macOS.
- **Dispositivos móveis:** Android, iOS.
- **Servidores:** Windows Server, Linux Server.
- **Sistemas embarcados e industriais:** SO de tempo real, presentes em CLPs, robôs, painéis.

**Quanto à interface:**
- **Gráfica (GUI):** ícones, janelas e mouse — a mais comum.
- **Linha de comando (CLI):** comandos digitados — usada em servidores e manutenção.

**Quanto à licença:**
- **Proprietário:** Windows, macOS (licença paga ou embutida no equipamento).
- **Livre/aberto:** Linux (uso e modificação permitidos, sem custo de licença).

**Destaque para o mundo do trabalho:**
> Em ambiente industrial, o mesmo profissional pode encontrar Windows no escritório, Linux
> no servidor e um sistema embarcado no painel da máquina. Saber que a lógica é a mesma —
> arquivos, pastas, permissões, dispositivos — evita o bloqueio diante do desconhecido.

### 3. A Interface: barra de tarefas e barras de ferramentas (30 min)

- **Barra de tarefas:** botão Iniciar, campo de busca, programas fixados, programas abertos,
  área de notificação e relógio.
- **Barra de ferramentas dos programas:** conjunto de botões que executam comandos sem menu.
- **Barra de endereços do explorador:** mostra o **caminho** da pasta atual e permite navegar
  clicando em qualquer nível anterior.
- **Faixa de opções (Ribbon):** organização por guias usada nos softwares de escritório.
- **Painel de navegação:** acesso rápido a Documentos, Downloads, Imagens, unidades e rede.

**Prática guiada:** fixar um programa na barra de tarefas, exibir extensões de arquivo,
alternar o modo de exibição (ícones grandes, lista, detalhes) e ordenar por nome, tipo,
tamanho e data.

### 4. Periféricos na prática (35 min)

**Conectar e usar:**
- **USB:** pen drive, mouse, teclado, HD externo, impressora.
- **HDMI / VGA:** monitor e projetor.
- **Áudio P2:** fone e microfone.
- **Rede (RJ-45) e Wi-Fi:** conexão com a rede local e a internet.

**Driver:** é o software que ensina o SO a conversar com um dispositivo. Quando a impressora
"não é reconhecida", quase sempre falta o driver ou o cabo está mal conectado.

**Remoção segura do pen drive:**
> Retirar o pen drive durante uma gravação pode **corromper o arquivo**. O procedimento
> correto é usar o ícone "Remover hardware com segurança" na área de notificação e só então
> retirar o dispositivo.

**Roteiro de diagnóstico simples (útil no trabalho):**
1. O cabo está conectado nas duas pontas?
2. O dispositivo está ligado e com energia?
3. O sistema reconhece o dispositivo (aparece na lista)?
4. Existe driver instalado?
5. Reiniciar o equipamento resolve?

### 5. Organização de Arquivos em Pastas (35 min)

**Princípio:** a estrutura deve responder a três perguntas — *de quem é*, *do que trata* e
*de quando é*.

Modelo profissional sugerido:

```
DOCUMENTOS
├── 01_TRABALHO
│   ├── RELATORIOS
│   │   ├── 2026
│   │   └── 2025
│   ├── PROCEDIMENTOS
│   └── PLANILHAS
├── 02_CURSOS
│   └── SENAI-TIC
├── 03_PESSOAL
└── 04_ARQUIVO_MORTO
```

Regras de ouro:
1. Uma pasta deve ter **um assunto só**.
2. Evite mais de 4 ou 5 níveis de profundidade.
3. Nomes padronizados: `AAAA-MM-DD_assunto_versao`.
4. Nada permanece solto na Área de Trabalho.
5. O que não é mais usado vai para `ARQUIVO_MORTO`, não para a Lixeira.

### 6. Pesquisa de Arquivos e Diretórios (25 min)

- **Busca do menu Iniciar:** localiza programas, configurações e arquivos.
- **Busca do explorador (canto superior direito):** procura dentro da pasta atual e subpastas.
- **Filtros úteis:**
  - por parte do nome: `relatorio`
  - por tipo: `*.xlsx`, `*.pdf`
  - por data de modificação: hoje, esta semana, este mês
  - por tamanho: grandes, enormes
- **Curinga `*`:** substitui qualquer sequência de caracteres. `2026-*_relatorio*` encontra
  todos os relatórios de 2026.

**Situação de trabalho:**
> "Preciso do relatório de manutenção que eu fiz em agosto, mas não lembro o nome."
> Solução: buscar por `*.docx`, filtrar por data de modificação em agosto e ordenar por data.

### 7. Compactação de Arquivos (25 min)

**O que é:** reunir um ou vários arquivos em um único pacote menor, chamado arquivo
compactado (`.zip`, `.rar`, `.7z`).

**Para que serve:**
- Enviar vários arquivos de uma vez por e-mail;
- Reduzir o espaço ocupado no disco ou na nuvem;
- Manter uma estrutura de pastas íntegra durante o envio;
- Arquivar documentos antigos.

**Como fazer (Windows):**
- Compactar: selecionar os arquivos → botão direito → *Enviar para* → *Pasta compactada*.
- Descompactar: botão direito no `.zip` → *Extrair tudo* → escolher o destino.

**Atenção:**
> Arquivos já comprimidos (JPG, MP3, MP4, PDF) reduzem pouco ao serem compactados.
> Documentos de texto e planilhas reduzem bastante.
> **Nunca abra um `.zip` recebido de remetente desconhecido** — é um vetor comum de vírus
> (tema retomado na Aula 06).

---

## Estratégias de Ensino

1. **Exposição dialogada com analogias de chão de fábrica.**
2. **Demonstração projetada seguida de execução simultânea pelos alunos.**
3. **Resolução de problema real** — "encontre este arquivo perdido".
4. **Checklist impresso** para o aluno consultar durante a prática.

---

## Atividades Práticas

### Atividade 1 (desplugada): "Arquitetos da Pasta" (30 min)

**Objetivo:** planejar uma estrutura de pastas antes de criá-la no computador.

**Procedimento:**
1. Em grupos de 3, cada grupo recebe um cenário profissional:
   - Grupo A: setor de manutenção de uma indústria;
   - Grupo B: almoxarifado e controle de materiais;
   - Grupo C: setor administrativo de uma pequena empresa;
   - Grupo D: um estudante de curso técnico.
2. Cada grupo desenha em cartolina a árvore de pastas ideal, com no mínimo 3 níveis.
3. Definem também o padrão de nomeação dos arquivos.
4. Apresentação de 3 minutos por grupo e crítica construtiva da turma:
   *"Onde eu salvaria uma nota fiscal de setembro nessa estrutura?"*

**Materiais:** cartolina, canetão, fichas com os cenários.

### Atividade 2 (prática no computador): "Organizar e Empacotar" (50 min)

**Objetivo:** aplicar organização, busca e compactação em um caso realista.

**Procedimento:**
1. O professor distribui (por pen drive ou rede) uma pasta `BAGUNCA` com cerca de 25 arquivos
   misturados: documentos, planilhas, imagens, PDFs e apresentações, com nomes ruins.
2. Cada aluno deve:
   a. Criar em `Documentos` a estrutura `SENAI-TIC/AULA-02/` com as subpastas
      `TEXTOS`, `PLANILHAS`, `IMAGENS`, `PDFS` e `APRESENTACOES`;
   b. Mover cada arquivo para a subpasta correta (usar exibição em Detalhes e ordenar por tipo);
   c. Renomear ao menos 5 arquivos seguindo o padrão `AAAA-MM-DD_assunto_v01`;
   d. Usar a busca para localizar todos os arquivos `*.xlsx` e conferir se nenhum ficou fora;
   e. Compactar a pasta `AULA-02` inteira em `AULA-02_<seunome>.zip`;
   f. Conferir o tamanho antes e depois da compactação e anotar a diferença;
   g. Extrair o `.zip` em uma pasta `TESTE-EXTRACAO` e verificar se a estrutura se manteve.
3. Conectar o pen drive, copiar o `.zip` para ele e realizar a **remoção segura**.

**Entrega:** o arquivo `AULA-02_<seunome>.zip` e a anotação da diferença de tamanho.

**Materiais:** computador, pasta `BAGUNCA` preparada pelo professor, pen drive.

---

## Recursos Necessários

- Laboratório de informática com um computador por aluno;
- Pasta `BAGUNCA` previamente montada pelo professor;
- Pen drives (individuais ou compartilhados);
- Projetor multimídia, cartolina e canetões;
- Checklist impresso de operações do explorador de arquivos.

---

## Avaliação Formativa

**Observação durante as atividades:**
- O aluno explica com as próprias palavras o papel do sistema operacional?
- Constrói uma estrutura de pastas coerente e justificável?
- Usa a busca com filtros em vez de procurar manualmente?
- Compacta e descompacta corretamente, mantendo a estrutura?
- Realiza a remoção segura do pen drive?

**Perguntas de verificação:**
1. Cite três funções do sistema operacional.
2. Qual a diferença entre um SO proprietário e um SO livre? Dê um exemplo de cada.
3. O que é um driver e quando percebemos que ele está faltando?
4. Por que a remoção segura do pen drive é importante?
5. Como localizar todas as planilhas modificadas nesta semana?
6. Por que compactar uma pasta antes de enviá-la por e-mail?

---

## Tarefa de Casa

**Atividade:** organizar uma pasta real do próprio computador ou celular (fotos, downloads
ou documentos), criando ao menos 3 subpastas e renomeando 5 arquivos segundo o padrão
estudado. Registrar a estrutura final em um print de tela ou em um pequeno desenho.

**Tempo estimado:** 30 min

---

## Observações do Professor

_Espaço para anotações: alunos com dificuldade em mover arquivos, dúvidas sobre extensões,
tempo real gasto na compactação._

---

**Próxima aula:** AULA 03 — Comunicação Profissional: elementos da comunicação, níveis de fala e trabalho em equipe
