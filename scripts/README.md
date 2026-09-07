# Scripts Disponíveis - AULAS-SENAI

## 📊 Opções Principais

### 1. **analisador.py** 
**Analisa estrutura de cursos e matérias, gera `geradoraulas.json`**

```bash
python analisador.py
```

**O que faz:**
- ✅ Lê pasta `sistema/`
- ✅ Detecta cursos diretos vs contêineres
- ✅ Encontra matérias/UCs com AULAS/, AVALIACOES/, EMENTA-
- ✅ Conta aulas e calcula tempo de leitura
- ✅ Gera JSON com estrutura completa

**Saída:**
```
geradoraulas.json (com cursos, matérias, aulas, tempos)
```

**Exemplo:**
```
🔍 Analisando sistema/...
  APRENDIZAGEM-INDUSTRIAL... (CONTÊINER)
  GESTAO_E_CONTROLE_MATERIAIS... (CURSO)
  RIO_DO_SUL_MAIS_TECH... (CURSO)
  ...
📊 Cursos: 4 | Contêineres: 1
📚 UCs: 7 | Aulas: 52
```

---

### 2. **converter-ementa.py**
**Extrai ementas de TXT/DOCX/PDF, cria `EMENTA-PRINCIPAL-*.md`**

```bash
python converter-ementa.py
```

**O que faz:**
- ✅ Busca arquivos: EMENTA-*, PLANO-*, APOSTILA-*, CT-*
- ✅ Suporta: TXT, DOCX, PDF
- ✅ Ignora: aulas, atividades, provas, avaliações
- ✅ Para contêineres: procura em subcursos ou gera agregada
- ✅ Formata como Markdown estruturado

**Saída:**
```
sistema/CURSO/EMENTA-PRINCIPAL-CURSO.md
```

**Exemplo:**
```
📖 Convertendo ementas para Markdown...
  APRENDIZAGEM-INDUSTRIAL... ✅ (agregada)
  GESTAO_E_CONTROLE_MATERIAIS... ✅ (convertido)
  MECANICA... ✅ (convertido)
  ...
✅ Criados: 12 | ⏭️  Pulados: 0 | ❌ Erros: 0
```

---

## 🔄 Scripts Auxiliares (Legado - Manutenção)

| Script | Propósito |
|--------|-----------|
| **gerador-aulas.py** | Converte Markdown para HTML com design SENAI |
| **gerador-ementa.py** | Consolida aulas em ementa única |
| **geradorementas-aulas.py** | Orquestrador: coordena geração de aulas e ementas |
| **listadorcurso.py** | Sincroniza status com Supabase |

---

## 📋 Fluxo Recomendado

### Fase 1: Análise
```bash
python analisador.py
# Gera: geradoraulas.json com estrutura completa
```

### Fase 2: Extração de Ementas
```bash
python converter-ementa.py
# Cria: EMENTA-PRINCIPAL-*.md em cada pasta de curso
```

### Fase 3: (Opcional) Gerar Aulas HTML
```bash
python gerador-aulas.py --pasta-aulas "sistema/CURSO/AULAS" --gerar-index
# Cria: AULA-*.html e index.html navegável
```

---

## 🎯 Estrutura Esperada

```
sistema/
├── CURSO-1/                    # Curso direto
│   ├── MATERIA-A/
│   │   ├── AULAS/             # Arquivos AULA-*.md
│   │   ├── AVALIACOES/
│   │   └── EMENTA-*.md        # ou EMENTA-PRINCIPAL-*.md
│   └── MATERIA-B/
│
├── CONTEINER/                 # Contêiner de cursos
│   ├── SUBCURSO-1/
│   │   └── MATERIA/
│   │       ├── AULAS/
│   │       ├── AVALIACOES/
│   │       └── EMENTA-*.md
│   └── SUBCURSO-2/
│
└── CURSO-2/
    └── MATERIA/
        └── ...
```

---

## 📊 JSON Gerado (geradoraulas.json)

```json
[
  {
    "nome": "GESTAO_E_CONTROLE_MATERIAIS",
    "ementa": 1,
    "aulasgeradas": 1,
    "data_atualizacao": "2026-09-07",
    "materias": [
      {
        "nome": "ANALISE_DADOS_APLICADA_GESTAO",
        "ementa": 1,
        "aulasgeradas": 1,
        "avaliacoesgeradas": 0,
        "aulas": 16,
        "tempo_leitura": 52
      }
    ]
  }
]
```

---

## 🔍 Dependências Opcionais

Para máximo suporte de formatos:

```bash
pip install pypdf
pip install python-docx
```

Sem elas:
- ✅ TXT sempre funciona
- ⚠️ DOCX requer python-docx
- ⚠️ PDF requer pypdf

---

## 📝 Notas

- Todos os scripts usam UTF-8
- Estrutura é detectada automaticamente (curso vs contêiner)
- Ementas em Markdown são as únicas criadas
- JSON é idempotente (rodar novamente gera mesmo resultado)

