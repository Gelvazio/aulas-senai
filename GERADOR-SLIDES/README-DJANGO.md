# GERADOR DE SLIDES — Dashboard Django + Supabase

Dashboard web para gerar apresentações PPTX a partir de arquivos Markdown, com autenticação via Supabase, armazenamento em nuvem e banco de dados centralizado.

---

## 📋 Versão 2.0 (Com Supabase Auth + Storage + BD)

### Funcionalidades Completas

✅ **Autenticação Supabase** — Login/Signup com JWT  
✅ **Banco de Dados Supabase** — Tabela centralizada de slides  
✅ **Storage Supabase** — PPTXs na nuvem com URLs públicas  
✅ **Monitoramento de Storage** — Dashboard com uso MB, percentual, gráficos  
✅ **Dashboard Django** — Interface web responsiva  
✅ **Validação em tempo real** — Antes de gerar  
✅ **Download direto** — Via URLs públicas do Storage  
✅ **Histórico centralizado** — SQLite local + Supabase remoto  
✅ **Admin Django** — Gerenciamento de dados  
✅ **Zero IA** — Apenas Python, Django, Supabase  

---

## 🔧 Instalação e Configuração

### 1. Pré-requisitos

**Localmente:**
- Python 3.14+
- Pip/Poetry
- Git

**Opcionalmente (produção):**
- Docker / Docker Compose
- Máquina Virtual (Ubuntu 20.04+ ou similar)
- Nginx / Gunicorn
- PostgreSQL (se não usar Supabase)

### 2. Clonar / Baixar projeto

```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

Ou manualmente:
```bash
pip install Django==6.1
pip install djangorestframework crispy-forms crispy-bootstrap5
pip install supabase python-dotenv
```

### 4. Configurar `.env`

Copie `.env.example` e preencha:

```bash
cp .env.example .env
```

**Arquivo `.env`:**
```
DEBUG=True
SECRET_KEY=sua-chave-secreta-django
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

👉 **Obter credenciais:** https://app.supabase.com → Settings → API

### 5. Criar Tabelas Supabase

Execute no **SQL Editor** do Supabase:

```sql
CREATE TABLE slides (
  id VARCHAR(255) PRIMARY KEY,
  usuario_id VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  materia VARCHAR(255),
  curso VARCHAR(255),
  status VARCHAR(20) DEFAULT 'criado',
  conteudo JSONB,
  arquivo_url TEXT,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW(),
  sincronizado BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_slides_usuario_id ON slides(usuario_id);
```

### 6. Criar Storage Bucket

- Supabase → Storage → **+ New bucket**
- Nome: `slides`
- ✓ Public bucket
- Create

### 7. Rodar Migrations

```bash
C:\Python314\python.exe manage.py migrate
```

### 8. Criar Superuser (Admin)

```bash
C:\Python314\python.exe manage.py createsuperuser
```

---

## 🚀 Executar Localmente

### Windows (Fácil)

**Duplo clique:**
```
runserver.bat
```

**Ou terminal:**
```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES
C:\Python314\python.exe manage.py runserver
```

Acesse: **http://localhost:8000**

### Linux / Mac

```bash
cd /path/to/GERADOR-SLIDES
python3 manage.py runserver 0.0.0.0:8000
```

---

## 🐳 Executar em Máquina Virtual / Docker

### Docker (Recomendado)

**1. Criar Dockerfile:**

```dockerfile
FROM python:3.14-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "gerador_config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

**2. Criar docker-compose.yml:**

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_KEY=${SUPABASE_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
    volumes:
      - ./SAIDA:/app/SAIDA
      - ./db.sqlite3:/app/db.sqlite3
    command: sh -c "python manage.py migrate && gunicorn gerador_config.wsgi:application --bind 0.0.0.0:8000"
```

**3. Executar:**

```bash
docker-compose up -d
```

Acesse: **http://localhost:8000**

### VM Ubuntu (Produção)

**1. SSH na VM:**

```bash
ssh user@sua-vm-ip
```

**2. Instalar dependências:**

```bash
sudo apt-get update
sudo apt-get install -y python3.11 python3-pip nginx postgresql postgresql-contrib
```

**3. Clonar projeto:**

```bash
git clone seu-repositorio /opt/gerador-slides
cd /opt/gerador-slides
```

**4. Setup Python venv:**

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**5. Configurar `.env`:**

```bash
cp .env.example .env
nano .env  # Preencher credenciais
```

**6. Migrations:**

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

**7. Configurar Gunicorn:**

```bash
pip install gunicorn
gunicorn gerador_config.wsgi:application --bind 127.0.0.1:8000
```

**8. Configurar Nginx:**

```bash
sudo nano /etc/nginx/sites-available/gerador-slides
```

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /opt/gerador-slides/staticfiles/;
    }

    location /media/ {
        alias /opt/gerador-slides/media/;
    }
}
```

**9. Ativar:**

```bash
sudo ln -s /etc/nginx/sites-available/gerador-slides /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

**10. Systemd service:**

```bash
sudo nano /etc/systemd/system/gerador-slides.service
```

```ini
[Unit]
Description=Gerador de Slides Django
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/opt/gerador-slides
ExecStart=/opt/gerador-slides/venv/bin/gunicorn gerador_config.wsgi --bind 127.0.0.1:8000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable gerador-slides
sudo systemctl start gerador-slides
```

---

## 📁 Estrutura do Projeto

```
GERADOR-SLIDES/
├── .env                          # Credenciais (criar)
├── .env.example                  # Template
├── runserver.bat                 # Atalho Windows
├── manage.py                     # Django CLI
├── requirements.txt              # Dependências
├── Dockerfile                    # Docker (produção)
├── docker-compose.yml           # Docker Compose
│
├── gerador_config/               # Configurações Django
│   ├── settings.py              # Apps, middleware, Supabase
│   ├── urls.py
│   └── wsgi.py
│
├── dashboard/                    # App principal
│   ├── models.py                # Slide, UsuarioSupabase, GeracaoSlide
│   ├── views.py                 # Dashboard, gerar
│   ├── auth_views.py            # Login, signup, logout
│   ├── services.py              # SupabaseService
│   ├── middleware.py            # Autenticação
│   ├── templates/
│   │   ├── base.html
│   │   └── dashboard/
│   │       ├── index.html       # Dashboard + storage info
│   │       ├── detalhe.html
│   │       └── auth/
│   │           ├── login.html
│   │           └── signup.html
│   └── migrations/
│
├── ENTRADAS-AULAS-MARKDOWN/      # Entrada de .md
├── SAIDA/                        # Saída de .pptx
├── scripts/
│   └── gerar_slides.py
│
└── db.sqlite3                    # Banco local
```

---

## 🔐 Fluxo de Autenticação

```
Usuário → /signup/ → Supabase Auth
                        ↓
                    Criar usuário
                        ↓
                    /login/ → JWT Token
                        ↓
                    Django Session
                        ↓
                    Dashboard (protegido)
```

**Rotas protegidas:** Requerem login  
**Rotas públicas:** `/login/`, `/signup/`

---

## 📊 Dashboard

### Estatísticas
- Total de gerações
- Gerados (✅)
- Pendentes (⏳)
- Erros (❌)

### Storage Supabase
- **Tamanho usado:** XX.XX MB
- **Disponível:** 5000 MB (free tier)
- **Percentual:** XX%
- **Arquivos:** N

### Autenticação
- Email logado
- Status de sessão
- Botão logout

### Gerar Slide
- Selecionar `.md`
- Validar (opcional)
- Gerar
- Download

---

## 📝 Operações Comuns

### Admin Django
```bash
python manage.py createsuperuser
```
Acesse: http://localhost:8000/admin

### Gerar via CLI (sem dashboard)
```bash
python scripts/gerar_slides.py gerar ENTRADAS-AULAS-MARKDOWN/seu-arquivo.md
```

### Validar arquivo
```bash
python scripts/gerar_slides.py validar ENTRADAS-AULAS-MARKDOWN/seu-arquivo.md
```

### Resetar banco de dados
```bash
rm db.sqlite3
python manage.py migrate
```

---

## 🛠️ Troubleshooting

### "SUPABASE_URL não configurado"
→ Verificar `.env` preenchido

### "Acesso negado ao bucket"
→ Bucket em Storage deve ser PUBLIC

### "Erro ao fazer login"
→ Credenciais Supabase inválidas

### "Porta 8000 em uso"
→ Mudar porta: `python manage.py runserver 8080`

---

## 📚 Dependências

```
Django==6.1
supabase==2.0+
python-dotenv
crispy-forms
crispy-bootstrap5
gunicorn  (produção)
psycopg2  (PostgreSQL, opcional)
```

Ver `requirements.txt` para lista completa.

---

## 🎯 Checklist Deploy Produção

- [ ] `.env` preenchido (não committar)
- [ ] DEBUG = False
- [ ] SECRET_KEY alterada
- [ ] ALLOWED_HOSTS configurado
- [ ] Tabelas Supabase criadas
- [ ] Bucket `slides` criado (PUBLIC)
- [ ] Migrations rodadas
- [ ] Superuser criado
- [ ] Gunicorn/Nginx configurado
- [ ] SSL (Let's Encrypt)
- [ ] Backups automatizados
- [ ] Logs configurados

---

## 📞 Documentação Completa

Veja **CLAUDE.md** para:
- Setup detalhado Supabase
- Arquitetura completa
- Segurança
- Roadmap
- API

Veja **SETUP.md** para:
- Guia rápido
- Passo a passo
- Troubleshooting simples

---

**Desenvolvido com:** Django + Python + Supabase + Docker  
**Última atualização:** 05-09-2026
