# 📋 Guia de Uso — Formulário de Presença com Supabase

## 🎯 Resumo

Formulário interativo para fazer chamada em sala de aula com integração ao banco de dados Supabase.

---

## 📋 Checklist de Configuração

### ✅ Etapa 1: Criar Tabela no Supabase (5 min)

1. Acesse: **https://app.supabase.com**
2. Faça login com sua conta
3. Selecione o projeto **aulas-senai**
4. Vá para **SQL Editor** (lado esquerdo)
5. Clique em **+ New Query**
6. Cole o SQL abaixo:

```sql
-- Criar tabela presenca
CREATE TABLE presenca (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  data DATE NOT NULL,
  horario TIME,
  local TEXT,
  aluno_id INTEGER REFERENCES usuario(id) ON DELETE SET NULL,
  aluno_nome TEXT NOT NULL,
  presente BOOLEAN NOT NULL DEFAULT false,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para busca rápida
CREATE INDEX idx_presenca_data ON presenca(data);
CREATE INDEX idx_presenca_aluno ON presenca(aluno_id);

-- Enable RLS
ALTER TABLE presenca ENABLE ROW LEVEL SECURITY;

-- Policy: Leitura pública
CREATE POLICY "presenca_select" ON presenca
  FOR SELECT TO public USING (true);

-- Policy: Inserção pública
CREATE POLICY "presenca_insert" ON presenca
  FOR INSERT TO public WITH CHECK (true);

-- Policy: Atualização pública
CREATE POLICY "presenca_update" ON presenca
  FOR UPDATE TO public USING (true) WITH CHECK (true);
```

7. Clique em **RUN**
8. ✅ Tabela criada!

**Verificação:** Vá para **Table Editor** e procure por `presenca`. Deve aparecer na lista.

---

### ✅ Etapa 2: Abrir o Formulário

1. Abra o arquivo: **FORMULARIO-PRESENCA.html**
2. No navegador, você verá:
   - Campo de **Data** (preenchido com hoje)
   - Campo de **Horário**
   - Campo de **Local**
   - Lista de **25 alunos**

---

## 🎓 Como Usar em Sala de Aula

### Workflow Básico

1. **Selecione a data** da aula (padrão: hoje)
2. **Digite o horário** (opcional, ex: 14:00)
3. **Digite o local** (opcional, ex: Sala 101)
4. **Clique nos alunos** para marcar presença:
   - ✓ = Presente (verde)
   - ✗ = Ausente (vermelho, padrão)
5. **Use os filtros:**
   - Todos (25) — Mostrar todos
   - Presentes — Mostrar só quem está presente
   - Ausentes — Mostrar só quem faltou
6. **Clique "Salvar Presença"** para:
   - ✅ Salvar no Supabase
   - ✅ Armazenar em backup no navegador
7. **Pronto!** Dados salvos no banco

---

## 📊 Funcionalidades

| Botão | Ação |
|-------|------|
| 💾 **Salvar Presença** | Salva no Supabase + localStorage |
| 🖨️ **Imprimir** | Imprime a lista de presença |
| 📥 **Exportar CSV** | Baixa arquivo .csv para Excel |
| 🔄 **Limpar Tudo** | Reseta todos os checkmarks |

---

## 🔄 Recuperar Histórico

**Quando você muda de data:**

1. Selecione uma **data anterior** no campo "Data"
2. O formulário **carrega automaticamente** a presença daquele dia
3. Você pode:
   - ✏️ **Editar** (mudar presentes para ausentes ou vice-versa)
   - 💾 **Salvar** para atualizar no banco
   - 📥 **Exportar** a presença daquele dia

---

## 📈 Dados Armazenados

Cada registro de presença contém:

| Campo | Exemplo |
|-------|---------|
| **data** | 2026-09-14 |
| **horario** | 14:00 |
| **local** | Sala 101 |
| **aluno_id** | 1 |
| **aluno_nome** | Ana Clara Hostim |
| **presente** | true / false |
| **criado_em** | 2026-09-14 14:05:30 |

---

## 🖥️ Acessar Dados no Supabase

### Ver Registros de Presença

1. Acesse: **https://app.supabase.com**
2. Selecione projeto **aulas-senai**
3. Vá para **Table Editor**
4. Procure pela tabela **presenca**
5. Você verá todos os registros salvos em tempo real

### Consultar Presença de um Dia Específico

No **SQL Editor**, cole:

```sql
SELECT aluno_nome, presente, horario, local
FROM presenca
WHERE data = '2026-09-14'
ORDER BY aluno_nome;
```

Resultado:
```
Ana Clara Hostim       | true  | 14:00 | Sala 101
Ana Luiza Costa...     | false | 14:00 | Sala 101
...
```

---

## 📊 Estatísticas de Presença

### Quantos alunos compareceram?

```sql
SELECT COUNT(*) as presentes
FROM presenca
WHERE data = '2026-09-14' AND presente = true;
```

### Taxa de presença por dia

```sql
SELECT 
  data,
  COUNT(*) as total,
  COUNT(CASE WHEN presente = true THEN 1 END) as presentes,
  ROUND(100.0 * COUNT(CASE WHEN presente = true THEN 1 END) / COUNT(*), 2) as percentual
FROM presenca
GROUP BY data
ORDER BY data DESC;
```

---

## 🔒 Segurança

- ✅ RLS (Row Level Security) habilitado
- ✅ Políticas públicas (qualquer um pode ler/escrever por enquanto)
- ⚠️ **Recomendação futura:** Restringir a usuários autenticados

---

## 🚨 Troubleshooting

### ❌ Erro: "Erro ao salvar: 401 Unauthorized"
- **Causa:** API Key expirada ou inválida
- **Solução:** Verifique a chave no arquivo HTML (deve começar com `eyJh...`)

### ❌ Erro: "Erro ao salvar: 42P01 (tabela não existe)"
- **Causa:** Tabela `presenca` não foi criada
- **Solução:** Execute o SQL da Etapa 1

### ❌ Formulário não carrega alunos
- **Causa:** Possível problema de conexão
- **Solução:** Abra o console do navegador (F12) e procure por erros

---

## 💾 Backup Local

O formulário também salva em **localStorage** como backup. Para recuperar:

1. Abra o navegador (F12 → Console)
2. Cole: `console.log(JSON.parse(localStorage.getItem('presenca_2026-09-14')))`
3. Você verá todos os dados salvos localmente

---

## 📱 Compatibilidade

| Device | Suporte |
|--------|---------|
| 🖥️ Desktop | ✅ Completo |
| 📱 Tablet | ✅ Responsivo |
| 📱 Celular | ✅ Responsivo (otimizado) |
| 🖨️ Impressão | ✅ Formatação correta |

---

## 🎯 Próximos Passos

1. ✅ Execute o SQL da Etapa 1
2. ✅ Abra o formulário
3. ✅ Teste marcando 5 alunos presentes
4. ✅ Clique "Salvar"
5. ✅ Verifique no Supabase Console se salvou
6. ✅ Mude para outra data e volte → dados devem reaparecer

---

## 📞 Suporte

Se tiver dúvidas:
1. Consulte o **console do navegador** (F12)
2. Verifique a **tabela presenca** no Supabase
3. Confirme que a **data está selecionada** antes de salvar

---

**Versão:** 1.0  
**Data:** 2026-09-14  
**Status:** ✅ Pronto para usar
