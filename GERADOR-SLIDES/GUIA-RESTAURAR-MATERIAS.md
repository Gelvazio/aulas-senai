# 🔧 Guia: Restaurar Matérias e Aulas do Backup JSONB

**Problema Identificado:** Os dados de matérias estavam em `curso.materias` (coluna JSONB) e não na tabela `materia`.

**Estrutura Correta:**
- **Curso** → contém várias **Matérias**
- **Matéria** → contém várias **Aulas** (armazenadas em coluna `aulas` JSONB)

**Solução:** Executar o script SQL para sincronizar os dados.

---

## 📋 Passo a Passo

### 1️⃣ Acesse o Supabase

```
https://app.supabase.com
→ Seu Projeto (jwasbzdbkbryncpvfujc)
→ SQL Editor
```

### 2️⃣ Copie o Script

Abra o arquivo:
```
C:\fontes\aulas-senai\GERADOR-SLIDES\SCRIPT-RESTAURAR-MATERIAS.sql
```

Copie TODO o conteúdo.

### 3️⃣ Execute no Supabase

1. No SQL Editor do Supabase, cole o script
2. Clique em **"Run"** (ou pressione `Ctrl+Enter`)
3. Aguarde a execução (deve levar alguns segundos)

### 4️⃣ Verifique o Resultado

O script exibirá:
- ✅ Total de matérias inseridas
- ✅ Número de cursos com matérias
- ✅ Amostra das matérias restauradas

---

## 🔍 O que o Script Faz

| Etapa | Ação |
|-------|------|
| 1 | Garante que tabela `materia` existe |
| 2 | Garante que tabela `cursomateria` existe |
| 3 | **Extrai dados de `curso.materias` (JSONB)** |
| 4 | **Insere em `materia` table** |
| 5 | **Cria relacionamentos em `cursomateria`** |
| 6 | Exibe resumo de sincronização |

---

## ⚠️ Notas Importantes

- ✅ O script é **seguro** - usa `ON CONFLICT DO NOTHING`
- ✅ Não deleta dados antigos
- ✅ Pode ser executado **múltiplas vezes**
- ✅ Mantém o histórico em `curso.materias` intacto

---

## ✅ Após Executar

1. Volte para o painel da aplicação
2. Clique em um curso → "📖 Matérias"
3. Você deve ver a lista correta de matérias restauradas

---

## 🐛 Se Algo der Errado

Se receber um erro, verifique:

1. **Tabela `curso` existe?**
   ```sql
   SELECT COUNT(*) FROM public.curso;
   ```

2. **Coluna `materias` tem dados?**
   ```sql
   SELECT COUNT(*) FROM public.curso WHERE materias IS NOT NULL;
   ```

3. **Estrutura do JSONB está correta?**
   ```sql
   SELECT materias FROM public.curso LIMIT 1;
   ```

---

**Arquivo do Script:** `SCRIPT-RESTAURAR-MATERIAS.sql`  
**Data:** 2026-09-05  
**Status:** Pronto para usar ✅
