# 🚀 GUIA COMPLETO — TODOS OS SCRIPTS

**Localização:** `C:\fontes\aulas-senai\scripts\`  
**Data:** 2026-09-07  
**Status:** ✅ Todos os scripts operacionais

---

## 📋 ÍNDICE RÁPIDO

| # | Script | Tipo | Função | Uso |
|---|--------|------|--------|-----|
| 1 | **rodar-analisador.bat** | Batch | Analisa estrutura de cursos | Duplo clique |
| 2 | **rodar-converter.bat** | Batch | Converte ementas para Markdown | Duplo clique |
| 3 | **rodar-gerador-ementa.bat** | Batch | Menu para selecionar curso | Duplo clique → Escolha |
| 4 | **rodar-geradorementas-aulas.bat** | Batch | Menu: curso + modo | Duplo clique → Escolha |
| 5 | **rodar-gerador-aulas.bat** | Batch | Gera HTMLs de aulas | Duplo clique → Digite caminho |
| 6 | **rodar-gerador-plano-aula.bat** | Batch | Gera PLANO-AULAS.md em matérias | Duplo clique |
| 7 | **rodar-gerador-pastas-aulas.bat** | Batch | Cria pastas AULA-XX com PLANO | Duplo clique → Digite caminho |

---

## 🔍 SCRIPTS PYTHON DETALHADOS

### 1️⃣ **analisador.py**
**O que faz:** Analisa estrutura completa de cursos e matérias  
**Entrada:** Lê pasta `sistema/`  
**Saída:** `geradoraulas.json`  
**Tempo:** ~5 segundos  

**Como executar:**
```bash
# Via .bat (Recomendado)
rodar-analisador.bat                    # Duplo clique

# Via terminal
C:\Python314\python.exe analisador.py
```

**Resultado:**
```json
[
  {
    "nome": "CURSO-NAME",
    "ementa": 1,
    "aulasgeradas": 1,
    "materias": [...]
  }
]
```

---

### 2️⃣ **converter-ementa.py**
**O que faz:** Extrai ementas de TXT/DOCX/PDF e converte para Markdown  
**Entrada:** Busca `EMENTA-*`, `PLANO-*`, `CT-*` em cada pasta  
**Saída:** `EMENTA-PRINCIPAL-{CURSO}.md` em cada pasta  
**Tempo:** ~10 segundos  

**Como executar:**
```bash
# Via .bat (Recomendado)
rodar-converter.bat                     # Duplo clique

# Via terminal
C:\Python314\python.exe converter-ementa.py
```

**Formatos suportados:**
- ✅ `.txt` (sempre)
- ✅ `.md` (sempre)
- ⚠️ `.docx` (requer `pip install python-docx`)
- ⚠️ `.pdf` (requer `pip install pypdf`)

---

### 3️⃣ **gerador-ementa.py** (Legado)
**O que faz:** Consolida aulas individuais em uma ementa única  
**Entrada:** Arquivo principal (`PLANO-AULAS.md`) + pasta do curso  
**Saída:** `EMENTA-{MATERIA}.md` consolidado  
**Tempo:** ~5 segundos por matéria  

**Como executar:**
```bash
# Via .bat (Recomendado - com menu)
rodar-gerador-ementa.bat                # Duplo clique → Digite caminho curso

# Via terminal (completo)
C:\Python314\python.exe gerador-ementa.py \
  --arquivo-principal "C:\...\PLANO-AULAS.md" \
  --pasta-base "C:\...\CURSO" \
  --pasta-saida "C:\...\EMENTAS"

# Via terminal (simplificado)
C:\Python314\python.exe gerador-ementa.py \
  --arquivo-principal "./PLANO-AULAS.md" \
  --pasta-base .
```

**Argumentos:**
- `--arquivo-principal` ← Obrigatório (arquivo Markdown com ementa)
- `--pasta-base` ← Obrigatório (pasta do curso)
- `--pasta-saida` ← Opcional (padrão: pasta-base)

---

### 4️⃣ **gerador-aulas.py** (Legado)
**O que faz:** Converte Markdown de aulas em HTML responsivo  
**Entrada:** Arquivos `AULA-*.md` em pasta `AULAS/`  
**Saída:** `AULA-*.html` + `index.html`  
**Tempo:** ~2 segundos por aula  

**Como executar:**
```bash
# Via .bat (Recomendado - com form)
rodar-gerador-aulas.bat                 # Duplo clique → Digite caminho AULAS/

# Via terminal
C:\Python314\python.exe gerador-aulas.py \
  --pasta-aulas "../sistema/CURSO/AULAS" \
  --gerar-index
```

**Argumentos:**
- `--pasta-aulas` ← Caminho da pasta com AULA-*.md
- `--gerar-index` ← Gerar index.html navegável

**Saída esperada:**
```
AULAS/
├── AULA-01.html
├── AULA-02.html
├── AULA-03.html
└── index.html (dashboard)
```

---

### 5️⃣ **geradorementas-aulas.py** (Orquestrador)
**O que faz:** Coordena geração de aulas + ementas + validação  
**Entrada:** Caminho do curso + modo  
**Saída:** Aulas HTML + Ementas + Relatório  
**Tempo:** ~15 segundos por curso  

**Como executar:**
```bash
# Via .bat (Recomendado - com menu)
rodar-geradorementas-aulas.bat          # Duplo clique → Escolha curso e modo

# Via terminal
C:\Python314\python.exe geradorementas-aulas.py \
  --caminho-curso "../sistema/CURSO" \
  --modo completo
```

**Modos:**
- `completo` ← Aulas + Ementas + Validação
- `apenas-aulas` ← Apenas gerar HTML
- `apenas-ementas` ← Apenas gerar Markdown

**Saída esperada:**
```json
{
  "inicio": "2026-09-07T10:30:00",
  "curso": "sistema/CURSO",
  "etapas": [
    {"etapa": "gerador-aulas", "status": "sucesso"},
    {"etapa": "gerador-ementa", "status": "sucesso"}
  ],
  "duracao_segundos": 12.5
}
```

---

### 6️⃣ **gerador-plano-aula.py** ⭐ NOVO
**O que faz:** Gera `PLANO-AULAS.md` em cada matéria a partir da ementa  
**Entrada:** `EMENTA-PRINCIPAL-*.md` em cada matéria  
**Saída:** `PLANO-AULAS.md` dentro de cada matéria  
**Tempo:** ~3 segundos por matéria  

**Estrutura gerada:**
```
{CURSO}/{MATERIA}/
├── AULAS/
├── EMENTA-PRINCIPAL-*.md
└── PLANO-AULAS.md ✅ CRIADO
```

**Como executar:**
```bash
# Via .bat (Recomendado)
rodar-gerador-plano-aula.bat            # Duplo clique (processa TODOS)

# Via terminal
C:\Python314\python.exe gerador-plano-aula.py
```

**Conteúdo do PLANO-AULAS.md:**
- Título e data
- Carga horária estimada
- Estrutura de encontros (1-N)
- Objetivos por encontro
- Conteúdo programático
- Estratégias de ensino
- Atividades práticas
- Avaliação formativa

---

### 7️⃣ **gerador-pastas-aulas-com-plano.py** ⭐ NOVO
**O que faz:** Cria pastas `AULA-01/`, `AULA-02/`, etc com `PLANO-AULAS.md` em cada  
**Entrada:** Ementa da matéria (`EMENTA-PRINCIPAL-*.md` ou `PLANO-AULAS.md`)  
**Saída:** Pastas estruturadas com planos individualizados  
**Tempo:** ~2 segundos por matéria  

**Estrutura gerada:**
```
{CURSO}/{MATERIA}/AULAS/
├── AULA-01/
│   └── PLANO-AULAS.md ✅
├── AULA-02/
│   └── PLANO-AULAS.md ✅
├── AULA-03/
│   └── PLANO-AULAS.md ✅
└── ...
```

**Como executar:**
```bash
# Via .bat (Recomendado)
rodar-gerador-pastas-aulas.bat          # Duplo clique → Digite caminho do curso

# Via terminal
C:\Python314\python.exe gerador-pastas-aulas-com-plano.py \
  --caminho-curso "../sistema/CURSO"
```

**Conteúdo de cada PLANO-AULAS.md:**
- Título da aula específica
- Objetivos de aprendizagem
- Conteúdo programático (tópicos desta aula)
- Estratégias de ensino (3 fases: 20+40+20 min)
- Atividades práticas
- Recursos necessários
- Avaliação formativa

---

## 🎯 FLUXO RECOMENDADO DE USO

### Passo 1️⃣: Análise Inicial
```bash
rodar-analisador.bat
# Gera: geradoraulas.json com estrutura completa
```

### Passo 2️⃣: Extração de Ementas
```bash
rodar-converter.bat
# Gera: EMENTA-PRINCIPAL-*.md em cada curso
```

### Passo 3️⃣: Geração de Planos (Consolidados)
```bash
rodar-gerador-plano-aula.bat
# Gera: PLANO-AULAS.md em cada matéria
```

### Passo 4️⃣: Criação de Pastas de Aulas
```bash
rodar-gerador-pastas-aulas.bat
# Gera: AULA-01/, AULA-02/, ... com PLANO-AULAS.md em cada
```

### Passo 5️⃣: (Opcional) Gerar HTMLs
```bash
rodar-gerador-aulas.bat
# Gera: AULA-*.html + index.html
```

---

## 📊 COMPARAÇÃO VISUAL

| Fase | Script | Entrada | Saída | Objetivo |
|------|--------|---------|-------|----------|
| **1** | analisador | `sistema/` | `geradoraulas.json` | Mapear estrutura |
| **2** | converter-ementa | EMENTA-* + PLANO-* | `EMENTA-PRINCIPAL-*.md` | Extrair ementas |
| **3** | gerador-plano-aula | `EMENTA-PRINCIPAL-*.md` | `PLANO-AULAS.md` (matéria) | Criar plano consolidado |
| **4** | gerador-pastas-aulas | `EMENTA-PRINCIPAL-*.md` | `AULA-01/, AULA-02/...` | Criar pastas com planos |
| **5** | gerador-aulas | `AULA-*.md` | `AULA-*.html + index.html` | Converter para HTML |

---

## 🛠️ CONFIGURAÇÃO E DEPENDÊNCIAS

### Python 3.14 (Obrigatório)
```bash
# Verificar versão
C:\Python314\python.exe --version

# Instalar dependências (opcional)
pip install python-docx  # Para suporte a .docx
pip install pypdf        # Para suporte a .pdf
```

### Codificação UTF-8 (Automático)
Todos os scripts configuram UTF-8 automaticamente no Windows:
```python
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
```

---

## 🐛 TROUBLESHOOTING

| Erro | Causa | Solução |
|------|-------|--------|
| `FileNotFoundError: 'sistema'` | Script executa de local errado | Use .bat (já configura caminho correto) |
| `'═' não é reconhecido...` | Caracteres especiais no .bat | Use versão corrigida (sem emoji/linhas) |
| `UnicodeEncodeError` | Encoding errado no Windows | Use .bat (já configura UTF-8) |
| `Nenhum arquivo PLANO...` | Ementa não encontrada | Gere com `rodar-converter.bat` primeiro |
| `Pasta AULAS não encontrada` | Matéria sem estrutura padrão | Crie pasta `AULAS/` manualmente |

---

## 📂 ESTRUTURA ESPERADA

```
C:\fontes\aulas-senai\
├── scripts/
│   ├── *.py (todos os scripts Python)
│   ├── *.bat (todos os atalhos .bat)
│   ├── README.md (documentação original)
│   ├── api/ (módulos Supabase)
│   └── GUIA-COMPLETO-SCRIPTS.md ✅ (ESTE ARQUIVO)
│
├── sistema/
│   ├── CURSO-1/
│   │   ├── MATERIA-A/
│   │   │   ├── AULAS/
│   │   │   │   ├── AULA-01/
│   │   │   │   │   └── PLANO-AULAS.md
│   │   │   │   └── ...
│   │   │   ├── EMENTA-PRINCIPAL-*.md
│   │   │   └── PLANO-AULAS.md
│   │   └── MATERIA-B/
│   │       └── ...
│   └── CURSO-2/
│       └── ...
│
├── docs/
│   ├── criar-index-scripts.md
│   └── ...
│
└── geradoraulas.json ✅
```

---

## ⚡ ATALHOS RÁPIDOS

### Terminal PowerShell/CMD
```bash
# Ir para pasta scripts
cd C:\fontes\aulas-senai\scripts

# Rodar cada script
python analisador.py
python converter-ementa.py
python gerador-plano-aula.py
python gerador-pastas-aulas-com-plano.py --caminho-curso "../sistema/MECANICA"

# Ou usar .bat (mais fácil - duplo clique!)
rodar-analisador.bat
rodar-converter.bat
rodar-gerador-plano-aula.bat
```

---

## 📞 INFORMAÇÕES

**Projeto:** AULAS-SENAI  
**Organização:** Sistema pedagógico integrado com Supabase  
**Scripts:** 7 Python + 7 Batch  
**Linguagem:** Python 3.14  
**Encoding:** UTF-8  
**Plataforma:** Windows 10/11 (Linux/Mac com ajustes)  

**Última Atualização:** 2026-09-07  
**Status:** ✅ Todos operacionais  

---

## 🎓 PRÓXIMOS PASSOS

1. ✅ Rodar `rodar-analisador.bat` para análise inicial
2. ✅ Rodar `rodar-converter.bat` para extrair ementas
3. ✅ Rodar `rodar-gerador-plano-aula.bat` para gerar planos consolidados
4. ✅ Rodar `rodar-gerador-pastas-aulas.bat` para criar estrutura de aulas
5. ✅ (Opcional) Rodar `rodar-gerador-aulas.bat` para gerar HTMLs

**Tempo total estimado:** ~30-60 segundos para todos os cursos! ⚡

---

**Fim do Guia. Sucesso! 🚀**
