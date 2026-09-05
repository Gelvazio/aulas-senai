# 🚀 GERADOR-SLIDES com Supabase — Setup Rápido

## 1️⃣ Prepare as Credenciais Supabase

1. Crie conta em https://supabase.com
2. Novo projeto
3. Vá para **Settings → API**
4. Copie:
   - `Project URL` 
   - `anon public` key
   - `service_role` secret

## 2️⃣ Configure `.env`

Crie arquivo `.env` na raiz (copie de `.env.example`):

```
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_KEY=sua_chave_anonima_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui
DEBUG=True
SECRET_KEY=sua-chave-django-aqui
```

⚠️ **Nunca commitar `.env` — já está em `.gitignore`**

## 3️⃣ Criar Tabelas no Supabase

Copie este SQL e execute no **SQL Editor** do Supabase:

```sql
CREATE TABLE slides (
  id VARCHAR(255) PRIMARY KEY,
  usuario_id VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  materia VARCHAR(255),
  curso VARCHAR(255),
  status VARCHAR(20) DEFAULT 'criado' CHECK (status IN ('criado', 'processando', 'ativo', 'arquivado', 'excluido')),
  conteudo JSONB,
  arquivo_url TEXT,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW(),
  sincronizado BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_slides_usuario_id ON slides(usuario_id);
CREATE INDEX idx_slides_status ON slides(status);
CREATE INDEX idx_slides_criado_em ON slides(criado_em DESC);
```

## 4️⃣ Criar Storage Bucket

1. Vá para **Storage** no Supabase
2. **+ New bucket**
3. Nome: `slides`
4. ✓ **Public bucket**
5. **Create**

## 5️⃣ Rodar Migrations Django

```bash
C:\Python314\python.exe manage.py migrate
```

## 6️⃣ Criar Superuser (Admin)

```bash
C:\Python314\python.exe manage.py createsuperuser
```

Preencha email e senha. Depois acesse: http://localhost:8000/admin

## 7️⃣ Iniciar Servidor

### Opção A: Duplo clique
```
runserver.bat
```

### Opção B: Terminal
```bash
C:\Python314\python.exe manage.py runserver
```

## 8️⃣ Acessar

- **Dashboard:** http://localhost:8000
- **Login:** /login/
- **Signup:** /signup/
- **Admin:** http://localhost:8000/admin

---

## 📊 O que você vê no Dashboard

✅ **Estatísticas:**
- Total de gerações
- Gerados com sucesso
- Pendentes
- Erros

✅ **Storage Supabase:**
- MB usado / MB disponível
- Percentual de uso (com gráfico)
- Número de arquivos

✅ **Autenticação:**
- Email logado
- Status da sessão
- Botão de logout

✅ **Gerar Slides:**
- Selecionar arquivo `.md`
- Validar antes de gerar
- Ver histórico
- Download do PPTX

---

## 🔗 Fluxo Completo

```
Login/Signup (Supabase)
        ↓
Dashboard Django
        ↓
Selecionar .md
        ↓
Gerar PPTX (Python script)
        ↓
Upload Storage Supabase
        ↓
Registro em tabela slides
        ↓
Download ou compartilhar
```

---

## ✅ Checklist

- [ ] Supabase criado
- [ ] Credenciais em `.env`
- [ ] Tabelas criadas (SQL)
- [ ] Bucket `slides` criado
- [ ] Migrations rodadas
- [ ] Superuser criado
- [ ] Servidor rodando
- [ ] Login funciona
- [ ] Pode gerar slides

---

## 🆘 Problemas?

### "SUPABASE_URL não configurado"
→ Verificar `.env` preenchido corretamente

### "Acesso negado ao bucket"
→ Bucket deve ser **PUBLIC** em Storage

### "Erro ao fazer login"
→ Testar credenciais Supabase manualmente

### "Migrations pendentes"
→ Rodar: `python manage.py migrate`

---

**Leia `CLAUDE.md` para documentação completa!**
