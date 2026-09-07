# Ajustar API PHP: Gerar Aulas em HTML a partir de Markdown

**Data:** 2026-09-07  
**Status:** 🔄 Em Progresso  
**Prioridade:** Alta  
**Estimativa:** 4-6 horas  
**Progresso:** 4/8 etapas concluídas (50%)  

---

## 📋 Objetivo

Ajustar o código da API PHP em `sistema/apiphp/api/gerar-aulas.php` para:
- ✅ Gerar aulas em HTML **com base nos arquivos Markdown** das pastas `AULAS/` de cada matéria
- ✅ Integrar com **Supabase** (ler dados de `materia` e `aula`)
- ✅ Melhorar o **parser Markdown** (suportar tabelas, códigos, imagens, listas avançadas)
- ✅ Criar **endpoints REST** para gerenciar aulas
- ✅ Gerar **templates HTML profissionais** e responsivos

---

## 🎯 Escopo

### O Que Será Feito

| Item | Descrição | Status |
|------|-----------|--------|
| **Melhorar Parser MD** | Usar lib real (`league/commonmark`) em vez de regex | ⬜ Pendente |
| **Integração Supabase** | Ler dados de `materia`, `aula` e retornar JSON | ⬜ Pendente |
| **Novos Endpoints** | POST/GET para CRUD de aulas geradas | ⬜ Pendente |
| **Template HTML** | Melhorar design (suportar dark mode, mobile) | ⬜ Pendente |
| **Suporte a Recursos** | Imagens, links, code blocks, tabelas, listas aninhadas | ⬜ Pendente |
| **Testes** | Validar com aulas reais do projeto | ⬜ Pendente |

### O Que NÃO Será Feito

- ❌ Criar banco de dados novo (usar Supabase existente)
- ❌ Alterar estrutura de pastas (respeitar `AULAS/AULA-*.md`)
- ❌ Remover endpoints antigos (compatibilidade regressiva)

---

## 🏗️ Arquitetura

### Estrutura Atual vs. Nova

```
ANTES:
├─ api/gerar-aulas.php (ÚNICO)
│  └─ GeradorAulas::gerar()
│     ├─ Procura AULA-*.md em pasta fixa
│     └─ Gera HTML com parser básico (regex)

DEPOIS:
├─ api/
│  ├─ gerar-aulas.php (MANTIDO, melhorado)
│  ├─ controllers/
│  │  ├─ ControllerApiAula.php (NOVO)
│  │  └─ ControllerApiMateria.php (NOVO)
│  │
│  ├─ services/
│  │  ├─ MarkdownService.php (NOVO — parser com league/commonmark)
│  │  ├─ AulaService.php (NOVO — lógica de aulas)
│  │  └─ MateriaService.php (NOVO — lógica de matérias)
│  │
│  ├─ lib/
│  │  ├─ league/
│  │  │  └─ commonmark/ (NOVO — composer install)
│  │  └─ [...existente]
│  │
│  └─ core/
│     └─ Utils.php (EXISTENTE — reutilizar)
```

### Fluxo de Dados

```
1. Cliente envia POST /api/aulas/gerar
   {
     "acao": "gerar_aulas_materia",
     "materia_id": "uuid-da-materia"
   }

2. API:
   a. Consulta Supabase: SELECT * FROM materia WHERE id = ?
   b. Lê pasta AULAS/ (filesystem)
   c. Para cada AULA-*.md:
      i. Parse markdown → AST (com league/commonmark)
      ii. Renderiza HTML (template customizado)
      iii. Salva arquivo HTML
   d. Retorna JSON:
      {
        "status": "ok",
        "materia": {...},
        "htmlsGerados": 10,
        "arquivos": [{...}],
        "timestamp": "..."
      }
```

---

## 📝 Plano de Execução

### Etapa 1: Preparar Ambiente
**Status:** ✅ Concluído  
**Tempo Estimado:** 30 min

- [x] Criar `composer.json` com dependências (league/commonmark, etc)
- [x] Estrutura de autoload PSR-4 configurada
- [x] Criar pastas `services/` e `tests/`
- [x] Verificar permissões de escrita em pastas `AULAS/`

---

### Etapa 2: Criar Serviços
**Status:** ✅ Concluído  
**Tempo Estimado:** 1h 30 min

#### 2.1: `services/MarkdownService.php` ✅
- [ ] Classe para parsear Markdown com `league/commonmark`
- [ ] Métodos:
  - `parseMarkdown(string $md): string` — retorna HTML
  - `extractMetadata(string $md): array` — extrai YAML front-matter (opcional)
  - `highlightCode(string $code, string $lang): string` — syntax highlighting

**Exemplo de uso:**
```php
$service = new MarkdownService();
$html = $service->parseMarkdown($conteudoMd);
```

#### 2.2: `services/AulaService.php` (NOVO)
- [ ] Classe para gerenciar aulas
- [ ] Métodos:
  - `listarAulasPorMateria(string $materiaId): array` — GET from Supabase
  - `gerarHtmlAulas(string $materiaId, string $pastaAulas): array` — converter MD → HTML
  - `salvarAulaHtml(string $caminhoHtml, string $conteudo): bool` — salvar arquivo
  - `gerarIndexHtml(array $aulas, string $pastaDestino): string` — gerar index.html

#### 2.3: `services/MateriaService.php` (NOVO)
- [ ] Classe para matérias (Supabase)
- [ ] Métodos:
  - `obterPorId(string $id): array` — GET de materia
  - `obterPorCurso(string $cursoId): array` — GET all by curso
  - `criarComAulas(array $dados): array` — INSERT materia + aulas

---

### Etapa 3: Criar Controllers
**Status:** ✅ Concluído  
**Tempo Estimado:** 1h

#### 3.1: `controllers/ControllerApiAula.php` ✅
- [ ] Herdar de `ControllerApiBase`
- [ ] Métodos:
  - `listarAulas(Request, Response): Response` — GET `/api/aulas/{materia_id}`
  - `gerarHtmlAulas(Request, Response): Response` — POST `/api/aulas/gerar`
  - `obterAula(Request, Response): Response` — GET `/api/aulas/{aula_id}`

#### 3.2: `controllers/ControllerApiMateria.php` (NOVO)
- [ ] Herdar de `ControllerApiBase`
- [ ] Métodos:
  - `listarMaterias(Request, Response): Response` — GET `/api/materias`
  - `obterMateria(Request, Response): Response` — GET `/api/materias/{id}`

---

### Etapa 4: Registrar Rotas
**Status:** ✅ Concluído  
**Tempo Estimado:** 20 min

**Arquivo:** `sistema/apiphp/api.php` ✅

Adicionar ao `$app->group()`:

```php
// Aulas
$app->get('/aulas/{materia_id}', ControllerApiAula::class . ':listarAulas');
$app->post('/aulas/gerar', ControllerApiAula::class . ':gerarHtmlAulas');
$app->get('/aulas/{aula_id}/html', ControllerApiAula::class . ':obterAula');

// Matérias
$app->get('/materias', ControllerApiMateria::class . ':listarMaterias');
$app->get('/materias/{id}', ControllerApiMateria::class . ':obterMateria');
```

---

### Etapa 5: Melhorar Template HTML
**Status:** ⬜ Pendente  
**Tempo Estimado:** 1h

**Arquivo:** `sistema/apiphp/api/gerar-aulas.php` (método `gerarHtmlAula`)

Enhancements:
- [ ] Adicionar suporte a `<img>` tags (com lazy loading)
- [ ] Adicionar suporte a `<pre><code>` (com syntax highlighting via highlight.js ou prism.js)
- [ ] Adicionar suporte a tabelas (com scroll horizontal em mobile)
- [ ] Adicionar suporte a blockquotes e callouts
- [ ] Melhorar responsividade (grid layout melhor)
- [ ] Adicionar breadcrumb (Volta → UC → Matéria → Aula)
- [ ] Adicionar TOC (Table of Contents) gerado dinamicamente

**Novo template:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{titulo} — {materia} | SENAI</title>
  
  <!-- Syntax Highlighting -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
  
  <style>
    /* Dark mode support */
    :root {
      --color-primary: #004384;
      --color-secondary: #f7941d;
      --bg-light: #fff;
      --text-light: #202124;
    }
    
    [data-theme="dark"] {
      --bg-light: #1c1e2a;
      --text-light: #e0e3e8;
    }
    
    body {
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: var(--bg-light);
      color: var(--text-light);
      line-height: 1.7;
    }
    
    /* ... resto dos estilos ... */
  </style>
</head>
<body data-theme="light">
  <nav class="breadcrumb">
    <a href="index.html">📚 Índice</a>
    <span>/</span>
    <a href="../">Matéria</a>
    <span>/</span>
    <span>{titulo}</span>
  </nav>
  
  <article class="container">
    <header class="aula-header">
      <h1>{titulo}</h1>
      <div class="meta">
        <span>📚 {materia}</span>
        <span>⏱️ {tempo_leitura} min</span>
      </div>
    </header>
    
    <nav class="toc">
      <h3>Índice</h3>
      <ul id="toc-list">
        <!-- Gerado dinamicamente via JS -->
      </ul>
    </nav>
    
    <main class="aula-content">
      {conteudo_html}
    </main>
    
    <footer class="aula-footer">
      <button onclick="toggleTheme()">🌙 Tema</button>
      <button onclick="printAula()">🖨️ Imprimir</button>
    </footer>
  </article>
  
  <script>
    // TOC generator
    // Theme toggle
    // Print function
    // Syntax highlighting
    hljs.highlightAll();
  </script>
</body>
</html>
```

---

### Etapa 6: Testes e Validação
**Status:** ⬜ Pendente  
**Tempo Estimado:** 1h

- [ ] Criar arquivo de teste: `tests/test_gerar_aulas.php`
- [ ] Testar com aulas reais:
  - `FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/`
  - `APRENDIZAGEM-INDUSTRIAL/INTRODUCAO-TIC/AULAS/`
  - `GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/AULAS/`
- [ ] Validar HTML gerado (W3C Validator)
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Testar dark mode
- [ ] Verificar performance (tamanho de arquivo, tempo de carregamento)

---

### Etapa 7: Integração com Supabase
**Status:** ⬜ Pendente  
**Tempo Estimado:** 45 min

**Criar tabela `aula_html_gerada` (OPCIONAL):**
```sql
CREATE TABLE aula_html_gerada (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aula_id UUID NOT NULL REFERENCES aula(id) ON DELETE CASCADE,
  html_conteudo TEXT NOT NULL,
  timestamp_geracao TIMESTAMP DEFAULT NOW(),
  versao INTEGER DEFAULT 1,
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_aula_html_aula_id ON aula_html_gerada(aula_id);
```

**Ou usar blob storage:**
```
Supabase Storage:
aulas/{materia_id}/{aula_id}.html
```

---

### Etapa 8: Commit e Documentação
**Status:** ⬜ Pendente  
**Tempo Estimado:** 20 min

- [ ] Fazer commit: `git add .`
- [ ] Commit message: `Refatorar API PHP para gerar aulas HTML com Supabase`
- [ ] Atualizar `README.md` com endpoints
- [ ] Atualizar este arquivo: marcar como ✅ Concluído

---

## 🛠️ Tecnologias e Dependências

| Tech | Versão | Propósito |
|------|--------|----------|
| PHP | 8.0+ | Backend |
| Slim Framework | 3.x | Routing |
| league/commonmark | 2.4+ | Parser Markdown |
| Supabase PHP SDK | latest | Banco de dados |
| highlight.js | 11.x | Syntax highlighting |

---

## 📊 Arquivos Afetados

### Novos Arquivos
```
sistema/apiphp/
├─ services/MarkdownService.php
├─ services/AulaService.php
├─ services/MateriaService.php
├─ controllers/ControllerApiAula.php
├─ controllers/ControllerApiMateria.php
├─ tests/test_gerar_aulas.php
└─ composer.json (atualizar)
```

### Arquivos Modificados
```
sistema/apiphp/
├─ api.php (adicionar rotas)
└─ api/gerar-aulas.php (melhorar template)
```

---

## 📈 Critérios de Sucesso

✅ **Deve satisfazer:**

1. **Funcionalidade:**
   - API gera HTML a partir de markdown real das pastas AULAS/
   - Endpoints REST funcionam corretamente
   - Suportam tabelas, códigos, listas, imagens

2. **Qualidade:**
   - HTML é semântico e acessível (WCAG 2.1 AA)
   - Responsivo (mobile, tablet, desktop)
   - Dark mode suportado
   - Performance: < 2s para gerar 10 aulas

3. **Compatibilidade:**
   - Endpoints antigos continuam funcionando
   - Não quebra estrutura existente
   - Funciona em ambiente Docker

4. **Documentação:**
   - README atualizado com exemplos
   - Comentários no código
   - Erros tratados com mensagens claras

---

## ⚠️ Riscos e Dependências

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Permissões de pasta | Alto | Verificar `chmod` em container |
| Encoder de caracteres | Médio | Usar UTF-8 em toda parte |
| Performance (muitas aulas) | Médio | Usar cache ou queue |
| Composição de pastas | Baixo | Ter mapa claro de estrutura |

---

## 🔍 Verificação Final

- [ ] Todos os endpoints testados
- [ ] Documentação atualizada
- [ ] Sem erros no PHP Linter
- [ ] Sem warnings no navegador
- [ ] Commit realizado
- [ ] Grafo atualizado (`graphify update .`)

---

**Próximo Passo:** Aguardar aprovação do usuário para iniciar a implementação.
