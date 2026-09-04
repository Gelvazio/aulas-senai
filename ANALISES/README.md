# ANALISES

Ferramentas de auditoria de armazenamento do projeto **aulas-senai**.

## `analise_tamanhos.py`

Percorre recursivamente todas as pastas do projeto e reporta, para cada pasta e
cada arquivo: **nome**, **local** (caminho relativo) e **tamanho**.

### Execução

```bash
C:\Python314\python.exe ANALISES/analise_tamanhos.py --duplicados
```

### Opções

| Opção | Efeito | Padrão |
|---|---|---|
| `--raiz <pasta>` | Pasta raiz a analisar | raiz do projeto |
| `--top <n>` | Itens exibidos nos rankings | 30 |
| `--nivel <n>` | Profundidade da árvore de pastas no relatório | 2 |
| `--incluir-ocultas` | Inclui itens iniciados por ponto (`.git`, `.claude`…) | desligado |
| `--duplicados` | Procura arquivos idênticos por MD5 | desligado |
| `--min-dup <bytes>` | Tamanho mínimo para considerar duplicata | 1 MB |
| `--saida <pasta>` | Destino dos relatórios | `ANALISES/relatorios/` |

Pastas ignoradas por padrão: `.git`, `.tmp.driveupload`, `.tmp.drivedownload`,
`node_modules`, `__pycache__`, `.venv`, `venv`, `.idea`.

### Saídas — `ANALISES/relatorios/`

| Arquivo | Conteúdo |
|---|---|
| `relatorio-tamanhos.md` | Relatório legível: maiores pastas, maiores arquivos, peso por extensão, árvore, duplicados |
| `pastas.csv` | Todas as pastas — nome, local, nível, tamanho total/próprio, nº de arquivos |
| `arquivos.csv` | Todos os arquivos — nome, local, pasta, tamanho, extensão |
| `resumo.json` | Dados agregados para consumo por outras ferramentas |

---

## Diagnóstico atual — 04/09/2026, 14:20

**Conteúdo real do projeto: 517,7 MB** em 1.465 arquivos e 143 pastas.
Ocupação total em disco (incluindo `.git`): **575 MB**.

### Onde está o peso

| Item | Tamanho | Situação |
|---|---|---|
| `sistema/` | 494,9 MB | Conteúdo pedagógico legítimo — 95,6% do total |
| `graphify-out/` | 23 MB | Snapshots do grafo de conhecimento |
| `.git/` | **92 KB** | ✅ Repositório novo — 3 commits, packfile de 3,7 KB |
| `.tmp.driveupload/` | — | ✅ Não existe mais neste repositório |

### ✅ Situação do repositório

O projeto migrou para o repositório **`aulas-senai`**
(`https://github.com/Gelvazio/aulas-senai.git`), criado do zero em 04/09/2026.
Com isso, o problema histórico do repositório anterior deixou de existir:

- O `.git/` tem **92 KB** — o antigo `professor-senai` chegou a 3,7 GB por conta
  de blobs de `.tmp.driveupload/` commitados antes da regra entrar no `.gitignore`.
- A pasta `.tmp.driveupload/` **não existe** neste diretório de trabalho.
- O backup `C:\fontes\professor-senai-GIT-BACKUP` **já foi removido** do disco.
- O `push --force` que estava pendente no repositório antigo **não se aplica mais** —
  o remoto atual é outro e nasceu limpo.

⚠️ **Lição preservada:** o `.gitignore` só bloqueia commits futuros; ele nunca apaga
o que já foi gravado no histórico. Foi essa a causa dos 3,3 GB perdidos no repositório
anterior.

### Peso por tipo de arquivo

| Extensão | Tamanho | Arquivos | % do total |
|---|---|---|---|
| `.pptx` | 369,4 MB | 51 | **71,4%** |
| `.png` | 46,8 MB | 57 | 9,0% |
| `.pdf` | 40,7 MB | 59 | 7,9% |
| `.docx` | 28,6 MB | 103 | 5,5% |
| `.json` | 19,6 MB | 367 | 3,8% |
| `.md` | 5,3 MB | 574 | 1,0% |

Apresentações respondem por quase três quartos de todo o conteúdo.

### Maiores pastas

| Pasta | Tamanho |
|---|---|
| `sistema/` | 494,9 MB |
| `sistema/INTRODUCAO_TIC-PRESIDENTE-GETULIO/` | 273,2 MB |
| `…/Introdução a TIC-VICTOR-ANATO/` | 229,7 MB |
| `sistema/FICHA-PRODUTO-MAIS-TECH/` | 92,5 MB |
| `sistema/GESTAO_E_CONTROLE_MATERIAIS/` | 64,1 MB |

### Maiores arquivos

| Arquivo | Tamanho |
|---|---|
| `Introdução a Tecnologia da Informação e Comunicação_BACKUP_ORIGINAL.pptx` | 99,3 MB |
| `Introdução a Tecnologia da Informação e Comunicação.pptx` | 98,2 MB |
| `Excel.pptx` | 29,9 MB |
| `MODELO_LAYOUT_APRESENTACAO.pptx` | 25,2 MB |
| `modelo-slide-senai-2026.pptx` (×3 cópias) | 18,4 MB cada |

### Duplicados identificados — 42,9 MB recuperáveis

| Arquivo | Cópias | Desperdício |
|---|---|---|
| `modelo-slide-senai-2026.pptx` | 3 | 36,7 MB |
| `PROMPT - Rubricas Capacidades Socioemocionais.docx` | 2 | 2,7 MB |
| `infografico-exemplo.png` | 2 | 2,1 MB |
| `Apresentação_Docentes disponibilidade e competencias.ppsx` | 2 | 1,4 MB |

### Recomendações

1. **Avaliar o `_BACKUP_ORIGINAL.pptx` de 99,3 MB** — é uma cópia quase idêntica do
   arquivo ativo. Se o backup já não serve, remover libera 99 MB (19% do projeto).
2. **Centralizar `modelo-slide-senai-2026.pptx`** em `sistema/GERADOR-AULAS/` e
   referenciar a partir das UCs, em vez de manter 3 cópias — recupera 36,7 MB.
3. **Deduplicar os outros 3 grupos** (`PROMPT - Rubricas…`, `infografico-exemplo.png`,
   `Apresentação_Docentes…`) — recupera mais 6,2 MB.
4. **Nunca commitar `.tmp.driveupload/` ou `node_modules/`** — ambos já cobertos
   pelo `.gitignore` deste repositório.
5. **Podar snapshots antigos de `graphify-out/`** se os 23 MB incomodarem — cada
   `graph.json` diário pesa ~6 MB.
