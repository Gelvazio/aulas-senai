# 📚 ORIENTACAO_JS_SUPABASE.md

## Propósito
Centralizar configuração e funções de comunicação com a API REST do Supabase (banco de dados PostgreSQL).

## Localização
`C:\fontes\aulas-senai\sistema\js\supabase.js`

## Responsabilidades
- ✅ Armazenar credenciais de conexão (URL, API Key)
- ✅ Preparar headers HTTP padrão (autenticação)
- ✅ Implementar operações básicas de banco: GET, POST, PATCH, DELETE
- ✅ Tratar erros de conexão/banco
- ✅ Centralizar lógica de requisição

## Estrutura Principal

### Configuração Supabase
```javascript
const SUPABASE = {
  URL: "https://hxlvonriearllcmfqeri.supabase.co",
  KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // API Key anônima
};
```

### Função de Headers
```javascript
function sbH() {
  return {
    apikey: SUPABASE.KEY,
    Authorization: "Bearer " + SUPABASE.KEY,
    "Content-Type": "application/json",
  };
}
```

### Operações CRUD Básicas

| Função | Método HTTP | Propósito |
|--------|-------------|-----------|
| `sbGet(table, qs)` | GET | Listar/filtrar registros |
| `sbPost(table, body)` | POST | Criar novo registro |
| `sbPatch(table, id, body)` | PATCH | Atualizar registro |
| `sbDelete(table, id)` | DELETE | Deletar registro |

## Como Usar

### 1. GET — Listar dados
```javascript
// Listar todos os cursos
const cursos = await sbGet("curso", "select=*&order=nome_completo");

// Listar com filtro
const cursoAtivo = await sbGet("curso", "select=*&ativo=eq.true&order=nome_completo");

// Listar com limite
const primeirosCursos = await sbGet("curso", "select=*&limit=10");
```

**Query String Supabase (RLS):**
- `select=*` — Selecionar todas as colunas
- `select=id,nome_completo` — Selecionar colunas específicas
- `order=coluna` — Ordenar ascendente
- `order=coluna.desc` — Ordenar descendente
- `limit=N` — Limitar N resultados
- `filtro=eq.valor` — Igualdade
- `filtro=neq.valor` — Não igual

### 2. POST — Criar registro
```javascript
const novoCurso = {
  nome_completo: "Técnico em Informática",
  descricao: "Curso técnico...",
  ativo: true
};

const resultado = await sbPost("curso", novoCurso);
console.log(resultado);  // Array com registro criado
```

### 3. PATCH — Atualizar registro
```javascript
const cursoPatch = {
  descricao: "Nova descrição"
};

const resultado = await sbPatch("curso", 5, cursoPatch);
// Atualiza curso ID 5
```

### 4. DELETE — Deletar registro
```javascript
await sbDelete("curso", 5);
// Deleta curso ID 5
```

## Tratamento de Erros

Todas as funções podem lançar exceção se falhar:

```javascript
try {
  const cursos = await sbGet("curso", "select=*");
  console.log(cursos);
} catch (erro) {
  console.error("Erro ao listar cursos:", erro.message);
  // Erro pode ser:
  // - 401 Unauthorized (API Key inválida)
  // - 404 Not Found (tabela não existe)
  // - 42703 (coluna não existe)
  // - Connection refused (rede)
}
```

## Tabelas Principais (Schema)

| Tabela | Propósito | Chave Primária |
|--------|-----------|---|
| `usuario` | Usuários (login/senha) | `id` |
| `curso` | Cursos | `id` |
| `materia` | Matérias/disciplinas | `id` |
| `aulas` | Aulas | `id` |
| `unidade` | Unidades (filiais) | `id` |
| `cursomateria` | Associação curso-matéria | `id` |

## URLs da API REST

```
GET    https://...supabase.co/rest/v1/{table}?{qs}
POST   https://...supabase.co/rest/v1/{table}
PATCH  https://...supabase.co/rest/v1/{table}?id=eq.{id}
DELETE https://...supabase.co/rest/v1/{table}?id=eq.{id}
```

## RLS (Row Level Security)

Supabase pode ter policies que restringem acesso:

```javascript
// Exemplo: Aluno só vê cursos com ensalado=true
// Professores veem tudo
// → Política configurada no Supabase console
```

## Integração com Outros Módulos
- **Usado por:** `curso.js`, `materia.js`, `aulas.js`, `unidade.js`, `login.js`
- **Dependências:** Nenhuma (módulo base)
- **Não deve carregar:** Dados "filhos" (ex: não carrega aulas em GET de curso)

## ⚠️ Notas Importantes

### Segurança
- ✅ API Key é anônima (read/insert/update/delete definidos via RLS)
- ✅ Não expor chaves secretas em produção
- ⚠️ localStorage não é seguro — não armazenar dados sensíveis

### Performance
- ✅ Use `select=*` apenas quando necessário
- ✅ Use `limit=` para paginar grandes datasets
- ✅ Reutilizar cache local antes de fazer fetch

### Erros Comuns
| Erro | Causa | Solução |
|------|-------|--------|
| 401 Unauthorized | API Key inválida | Verificar SUPABASE.KEY |
| 42703 Column not found | Coluna não existe | Verificar nome exato (ex: `descricao` não `nome`) |
| 404 Not Found | Tabela não existe | Verificar nome da tabela |
| CORS error | Origem não autorizada | Adicionar domain no Supabase console |

---

## ✅ Checklist para Modificações

- [ ] Headers preparados corretamente (apikey + Authorization)
- [ ] Try/catch em todas as chamadas
- [ ] Query strings (select, order, limit) validadas
- [ ] IDs escapados em filtros
- [ ] Prefer header em POST (return=representation)
- [ ] Teste cada operação (GET, POST, PATCH, DELETE)
