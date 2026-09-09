# Preenchimento Aula 01 — Introdução à Computação

**Data de Criação:** 2026-09-08  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta

---

## 📌 Objetivo

A AULA-01 está esqueletizada: tem apenas estrutura HTML, mas carece de conteúdo substantivo.

**Objetivo:** Preencher completamente com:
- Objetivos de aprendizagem (5-7 itens)
- Conteúdo programático detalhado (7 seções com explicações)
- Quiz questions expandido (5-8 questões)
- Recursos necessários (software, links, ferramentas)

---

## 📋 Escopo

| Item | Estado Atual | Desejado |
|------|---|---|
| **Objetivos** | Vazio | 5-7 competências SMART |
| **Conteúdo (7 seções)** | 1 section vazia | 7 sections com toggles preenchidas |
| **Quiz** | 1 questão | 5-8 questões com gabarito |
| **Recursos** | Vazio | Lista de ferramentas/links |
| **Atividades** | Genérica | Mantém template (já tem) |

---

## 📊 Plano de Execução

### Etapa 1: Preencher Objetivos
- **Status:** ⬜ Pendente
- **Ação:** Adicionar 5-7 objetivos SMART na seção `#objetivos`
- **Arquivo:** `AULA-01-INTRODUCAO-COMPUTACAO-HARDWARE-SOFTWARE.html` (linhas 52-57)
- **Verificação:** Objetivos aparecem na aba "Objetivos" quando carregada

**Exemplo de conteúdo:**
```
✓ Compreender a evolução histórica da computação (3 gerações)
✓ Diferenciar hardware de software com exemplos práticos
✓ Identificar periféricos e suas funções (entrada, saída, armazenamento)
✓ Operar o desktop de um PC (mouse, teclado, menus)
✓ Organizar pastas e arquivos no sistema de arquivos
✓ Reconhecer o sistema operacional e sua importância
✓ Resolver problemas básicos de usabilidade
```

### Etapa 2: Preencher Conteúdo Programático (4h = 240 min total)
- **Status:** ⬜ Pendente
- **Ação:** Adicionar 7 seções completas (atualmente apenas 1 toggle vazio)
- **Arquivo:** `AULA-01-...html` (linhas 64-75, dentro de `#conteudo`)
- **Verificação:** 7 seções aparecem na aba "Conteúdo" com toggles

**Seções detalhadas (240 min total):**

#### 1️⃣ Acolhimento e diagnóstico inicial (20 min)
- Apresentação do professor e aula
- Levantamento de experiências prévias com computador
- Expectativas do aluno
- Regras de segurança no lab
- Resumo das competências a desenvolver

#### 2️⃣ História da Computação (50 min)
- **Pré-história (antes de 1940):** Ábaco, Pascalina, Máquina de Babbage
- **1ª Geração (1940-1956):** ENIAC, válvulas eletrônicas, programação em linguagem de máquina
- **2ª Geração (1956-1963):** Transistor, computadores comerciais IBM, linguagens estruturadas (COBOL, FORTRAN)
- **3ª Geração (1963-1980):** Circuito integrado, mainframe, minicomputador
- **4ª Geração (1980-2000):** Microprocessador, PC pessoal (Apple II, Commodore, IBM PC)
- **5ª Geração (2000-atual):** Internet, computação em nuvem, IoT, IA
- Exemplos práticos de cada era (demonstrar imagens/vídeos)
- Impacto na sociedade

#### 3️⃣ Hardware × Software (45 min)
- **Hardware:** Definição (o que se toca)
  - Componentes internos: CPU, RAM, HD, placa-mãe, fonte, cooler
  - Periféricos de entrada: mouse, teclado, scanner, microfone
  - Periféricos de saída: monitor, impressora, alto-falante
  - Periféricos de armazenamento: pendrive, HD externo, CD/DVD
  - Exemplos visuais de cada componente
  
- **Software:** Definição (o que se usa, não toca)
  - Sistema Operacional (Windows, Linux, macOS) — funções principais
  - Programas aplicativos (Word, Excel, navegador, paint)
  - Drivers (intermediários entre SO e hardware)
  - Diferença entre software licenciado e open-source
  
- **Relação:** Como hardware e software trabalham juntos
- Atividade: Identificar components no PC (abrir gabinete ou diagrama)

#### 4️⃣ Mouse: uso e domínio (30 min)
- Anatomia do mouse: botões (esquerdo, direito, roda)
- Sensibilidade e configuração (DPI)
- Gestos básicos:
  - Clique simples (seleção)
  - Clique duplo (abrir)
  - Clique direito (menu contextual)
  - Arrastar (move objetos)
  - Scroll (rolar página)
  - Duplo-clique rápido vs lento
- Alternativas ao mouse: touchpad, trackball
- Prática guiada: Clique em alvos na tela (mini-jogo)

#### 5️⃣ Teclado: regiões e atalhos essenciais (35 min)
- **Regiões do teclado:**
  - Função (F1-F12)
  - Alfanumérica (letras, números)
  - Seta (movimento)
  - Numpad (números à direita)
  - Modificadores (Ctrl, Alt, Shift, Windows)
  
- **Atalhos essenciais:**
  - Ctrl+C (copiar), Ctrl+X (cortar), Ctrl+V (colar)
  - Ctrl+Z (desfazer), Ctrl+Y (refazer)
  - Ctrl+A (selecionar tudo)
  - Ctrl+S (salvar)
  - Alt+Tab (trocar janelas)
  - Windows+E (explorador)
  - Cozinhar com segurança: não usar líquidos perto
  
- Prática: Digitação de texto com atalhos

#### 6️⃣ Área de Trabalho (Desktop) (25 min)
- Componentes da tela inicial:
  - Ícones (atalhos para programas/arquivos)
  - Barra de tarefas (taskbar) — programas abertos
  - Relógio, volume, rede, bateria (system tray)
  - Menu Iniciar/Applications
  
- Personalização:
  - Mudar wallpaper
  - Criar atalhos
  - Mudar resolução da tela
  - Temas (luz/escuro)
  
- Segurança: Sempre fazer logout ao sair

#### 7️⃣ Pastas e Arquivos: a organização digital (35 min)
- **Conceitos:**
  - Arquivo (documento, imagem, programa)
  - Pasta/Diretório (recipiente)
  - Caminho/Path: `C:\Usuarios\aluno\Documentos\SENAI\arquivo.docx`
  - Extensão (.txt, .docx, .jpg, .exe)
  
- **Estrutura de pastas Windows:**
  - Disco C: (raiz)
  - Program Files (programas instalados)
  - Users → Documentos, Downloads, Área de Trabalho
  - AppData (dados de programas)
  
- **Operações básicas:**
  - Criar nova pasta
  - Renomear arquivo/pasta
  - Copiar (Ctrl+C + Ctrl+V)
  - Mover (Ctrl+X + Ctrl+V)
  - Deletar (Delete → Lixeira)
  - Restaurar da lixeira
  
- **Nomeação correta:**
  - Usar nomes descritivos (não "doc1", "trabalho", etc)
  - Evitar caracteres especiais (?, *, /, \)
  - Máximo 255 caracteres
  
- **Buscando arquivos:**
  - Explorador (Ctrl+E)
  - Barra de endereço
  - Filtros (por tipo, data, tamanho)
  
- Prática: Criar estrutura de pastas pessoal
  - `SENAI/`
    - `AULA-01/`
    - `AULA-02/`
    - `Exercicios/`
    - `Documentos/`

### Etapa 3: Expandir Quiz
- **Status:** ⬜ Pendente
- **Ação:** Adicionar 5-8 questões de múltipla escolha (atualmente 1 questão)
- **Arquivo:** `AULA-01-...html` (seção `#conteudo`)
- **Verificação:** Todas as questões aparecem e têm gabarito correto

**Questões sugeridas:**
1. Qual é o primeiro computador eletrônico de grande porte? (ENIAC) ✅ Já tem
2. Em que geração surgiu o transistor?
3. Qual é a diferença entre hardware e software?
4. Quantas gerações de computadores conhecemos?
5. O mouse é dispositivo de entrada ou saída?
6. Qual é a função da Bios?
7. Quantos botões tem um teclado ABNT2?

### Etapa 4: Preencher Recursos Necessários
- **Status:** ⬜ Pendente
- **Ação:** Adicionar lista de recursos/ferramentas na seção `#recursos`
- **Arquivo:** `AULA-01-...html` (linhas 135-140)
- **Verificação:** Recursos aparecem na aba "Recursos"

**Exemplo:**
- Windows 10/11 instalado
- Mouse funcional
- Teclado ABNT2
- Acesso a pasta de exercícios do aluno
- Conectado à internet (para baixar recursos)

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Conteúdo ficar muito extenso | Média | Manter 3-5 linhas por seção |
| Quiz com gabarito errado | Baixa | Verificar cada questão antes de confirmar |
| Estrutura HTML quebrar | Baixa | Seguir estrutura existente de outros elementos |

---

## ✅ Checklist Final

- [ ] Objetivos adicionados e revisados
- [ ] 7 seções de conteúdo preenchidas
- [ ] 5-8 questões de quiz com gabarito
- [ ] Recursos listados
- [ ] HTML validado (aula carrega sem erros)
- [ ] Teste visual em navegador
- [ ] Commit realizado

---

**Próximos passos após conclusão:**
1. Aplicar mesmo padrão às demais aulas (AULA-02, AULA-03, etc)
2. Sincronizar com PLANO-AULAS.md da UC
3. Atualizar graphify
