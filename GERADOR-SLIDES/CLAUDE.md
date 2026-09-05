# GERADOR-SLIDES com Django + Supabase Auth

**Data:** 05-09-2026  
**Versão:** 2.0 (Django + Supabase)  
**Status:** ✅ Pronto para Configuração

---

## 📋 Visão Geral

Projeto Django com autenticação via Supabase, integração com Storage e Banco de Dados do Supabase. Permite gerar slides PPTX a partir de Markdown, com rastreamento completo, login/logout e monitoramento de storage.

---

## 🔧 Configuração Inicial

### 1. Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha com suas credenciais Supabase:

```bash
cp .env.example .env
```

**Arquivo `.env`:**
```
# Django
DEBUG=True
SECRET_KEY=sua-chave-secreta

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

### 2. Obter Credenciais Supabase

1. Crie conta em https://supabase.com
2. Novo projeto
3. Vá para **Settings** → **API**
4. Copie:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Criar Tabelas no Supabase (SQL)

Vá para **SQL Editor** e execute:

```sql
-- Tabela de slides
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

-- Índices para performance
CREATE INDEX idx_slides_usuario_id ON slides(usuario_id);
CREATE INDEX idx_slides_status ON slides(status);
CREATE INDEX idx_slides_criado_em ON slides(criado_em DESC);
```

### 4. Criar Storage Bucket

1. Vá para **Storage** no Supabase
2. Clique **+ New bucket**
3. Nome: `slides`
4. Marque **Public bucket**
5. Clique **Create bucket**

### 5. Rodar Migrações Django

```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES
C:\Python314\python.exe manage.py migrate
```

---

## 🚀 Como Executar

### Opção 1: Duplo Clique (Recomendado)
```
runserver.bat
```

### Opção 2: Terminal
```powershell
cd C:\fontes\aulas-senai\GERADOR-SLIDES
C:\Python314\python.exe manage.py runserver
```

Acesse: **http://localhost:8000**

---

## 🎯 Novo Fluxo: Criar Slide com Metadados

**Objetivo:** Obrigar salvamento de metadados ANTES de gerar o PPTX.

### Passo 1: Acessar novo formulário
- Dashboard → Botão "✨ Criar Novo Slide (com metadados)"
- Ou acesse: `/novo/`

### Passo 2: Preencher formulário
- 📄 **Arquivo Markdown**: Selecione ou faça upload do .md
- 🎯 **Nome do Slide**: Obrigatório
- 📚 **Matéria/UC**: Opcional
- 🏫 **Curso**: Opcional
- 📝 **Descrição**: Opcional

### Passo 3: Salvar metadados
- Clique em "💾 Salvar Metadados"
- Sistema cria registro na tabela `slides` com:
  - ID único (UUID)
  - Metadados do formulário
  - **Conteúdo markdown original** (campo `conteudo`)
  - Status = "processando"

### Passo 4: Upload do PPTX (depois)
- Você será redirecionado para `/slide/<id>/`
- Gere o PPTX usando o gerador
- Faça upload para Storage Supabase (bucket "slides")
- Cole a URL pública no formulário
- Clique "💾 Registrar URL"

### Diagrama de fluxo
```
┌─────────────────────┐
│  Preencher Form     │
│  (nome, matéria...)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Salvar em Supabase  │
│ (tabela slides)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Gerar PPTX          │
│ (separado)          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Upload para Storage │
│ (Supabase)          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Registrar URL       │
│ (atualizar slide)   │
└─────────────────────┘
```

---

## 🔐 Fluxo de Autenticação

```
Visitante → Login/Signup → Supabase Auth
                            ↓
                    ✓ Credenciais corretas
                            ↓
                  Sessão Django + Token JWT
                            ↓
                       Dashboard
```

### Rotas de Autenticação

| Rota | Função |
|---|---|
| `/login/` | Tela de login |
| `/signup/` | Tela de cadastro |
| `/logout/` | Fazer logout |
| `/` | Dashboard (requer autenticação) |

---

## 💾 Integração Supabase

### Banco de Dados

**Tabela `slides`:**
- `id`: UUID único do slide
- `usuario_id`: Supabase user ID (FK)
- `nome`: Nome do slide
- `descricao`: Descrição (opcional)
- `materia`: Nome da matéria
- `curso`: Nome do curso
- `status`: criado | processando | ativo | arquivado | excluido
- `conteudo`: **OBRIGATÓRIO** — Conteúdo completo do Markdown original (armazenado como JSONB ou TEXT)
- `arquivo_url`: URL pública do PPTX no Storage
- `sincronizado`: Boolean para controle de sync

⚠️ **REGRA CRÍTICA**: O campo `conteudo` SEMPRE deve conter o Markdown original. É essencial para:
- Auditoria e rastreamento
- Regeneração de slides
- Histórico de versões
- Recuperação de dados

**Status Diagram:**
```
criado → processando → ativo
                        ↓
                    arquivado
                        ↓
                     excluido
```

### Storage

**Bucket: `slides`**
- Padrão: `{slide_id}.pptx`
- Acesso: Público (download direto)
- Limite padrão: 5 GB (Supabase free tier)

**Monitoramento:**
- Tamanho usado (MB)
- Tamanho disponível (MB)
- Percentual de uso
- Contagem de arquivos

---

## 📁 Estrutura do Projeto

```
GERADOR-SLIDES/
├── .env                          ← Credenciais (criar manualmente)
├── .env.example                  ← Template
├── .gitignore                    ← Ignora cache, db, IDE
├── runserver.bat                 ← Atalho para iniciar
├── manage.py                     ← Gerenciador Django
├── db.sqlite3                    ← Banco local (histórico de gerações)
│
├── gerador_config/               ← Configurações Django
│   ├── settings.py              (Supabase, Apps, Middleware)
│   ├── urls.py                  (Rotas principais)
│   ├── wsgi.py
│   └── asgi.py
│
├── dashboard/                    ← App Django
│   ├── models.py                ✅ UsuarioSupabase, GeracaoSlide, Slide
│   ├── views.py                 ✅ Dashboard, validar, gerar, download
│   ├── auth_views.py            ✅ Login, signup, logout
│   ├── services.py              ✅ SupabaseService (auth, DB, storage)
│   ├── middleware.py            ✅ Verificação de autenticação
│   ├── admin.py                 ✅ Admin Django
│   ├── urls.py                  ✅ Rotas da app
│   ├── migrations/              ✅ Histórico de migrations
│   ├── templates/
│   │   ├── base.html            ← Template base
│   │   └── dashboard/
│   │       ├── index.html       ← Dashboard (com storage info)
│   │       ├── detalhe.html     ← Detalhes de geração
│   │       └── auth/
│   │           ├── login.html   ← Tela de login
│   │           └── signup.html  ← Tela de cadastro
│   └── tests.py
│
├── ENTRADAS-AULAS-MARKDOWN/      ← Entrada de .md
├── SAIDA/                        ← Saída de .pptx
├── TASKS/                        ← Rastreamento JSON
├── scripts/
│   └── gerar_slides.py          ← Gerador Python (integrado)
│
└── README-DJANGO.md             ← Documentação
```

---

## 🔌 Fluxo de Geração com Supabase

```
1. Usuário faz login
   └─ Supabase autentica, Django cria sessão

2. Dashboard mostra:
   ✓ Arquivos .md disponíveis
   ✓ Histórico de gerações (DB local)
   ✓ Informações de Storage (Supabase)
   ✓ Status de autenticação

3. Usuário clica "Gerar Slide"
   └─ Django executa script Python

4. PPTX gerado → Upload Supabase Storage
   └─ Arquivo armazenado como {slide_id}.pptx

5. Registro criado em 2 locais:
   ├─ Django DB (GeracaoSlide) → Histórico local
   └─ Supabase (tabela slides) → Dados centralizados

6. Usuario pode:
   ✓ Download do PPTX
   ✓ Ver detalhes
   ✓ Acessar via URL pública do Storage
```

---

## 🛠️ Operações Comuns

### Criar Superuser Django (Admin)
```bash
C:\Python314\python.exe manage.py createsuperuser
```
Depois acesse: http://localhost:8000/admin

### Listar Slides do Supabase (CLI)
```python
from dashboard.services import SupabaseService

slides = SupabaseService.list_slides()
for slide in slides:
    print(f"{slide['nome']} - {slide['status']}")
```

### Verificar Storage
```python
from dashboard.services import SupabaseService

info = SupabaseService.get_storage_info()
print(f"Usado: {info['tamanho_usado_mb']} MB")
print(f"Percentual: {info['percentual_usado']}%")
print(f"Arquivos: {info['arquivos_count']}")
```

---

## 📊 Modelos Django

### UsuarioSupabase
Representa usuário autenticado via Supabase
- `id`: PK, Supabase user ID
- `email`: Email único
- `nome`: Nome completo (opcional)
- `criado_em`, `atualizado_em`: Timestamps

### GeracaoSlide
Histórico de gerações (banco local)
- `arquivo`: Nome do .md
- `status`: PENDENTE | GERADO | ERRO
- `slides`: Número de slides
- `tamanho`: Tamanho do PPTX
- `arquivo_saida`: Nome do PPTX

### Slide ⭐ (Novo)
Tabela sincronizada com Supabase
- Rastreamento completo
- URL do arquivo no Storage
- Status e metadata
- Conteúdo Markdown armazenado

---

## ⚙️ Configuração Avançada

### Aumentar Limite de Upload
Editar `gerador_config/settings.py`:
```python
DATA_UPLOAD_MAX_MEMORY_SIZE = 52428800  # 50 MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 52428800
```

### Personalizar Bucket
Em `dashboard/services.py`, função `upload_pptx`:
```python
bucket_name = 'seus-slides'  # Mudar nome
```

### Sincronização com Google Drive (Futuro)
Pode ser implementado usando `django-rq` para tasks assincronos

---

## 🔒 Segurança

| Aspecto | Implementação |
|---|---|
| **Autenticação** | Supabase Auth (JWT) |
| **Sessão** | Django sessions + Redis (opcional) |
| **Middleware** | AuthenticationMiddleware verifica login |
| **CSRF** | Django CSRF token em formulários |
| **Storage** | URLs privadas por padrão, públicas sob demanda |
| **API Keys** | `.env` (nunca committar) |

---

## 🐛 Troubleshooting

### Erro: "SUPABASE_URL não configurado"
→ Verificar `.env` e recarregar servidor

### Erro: "Acesso negado ao bucket"
→ Verificar permissões no Storage (deve ser PUBLIC)

### Erro: "Usuário não autenticado"
→ Verificar cookies/sessão, fazer login novamente

### Storage cheio?
→ Dashboard mostra percentual; deletar slides antigos em Supabase

---

---

## 📄 Páginas Implementadas — Gerador de Aulas

### `/gerador-aulas/` — Página de Gerenciamento de Aulas
**Rota:** `gerador_aulas` (view em `dashboard/views.py`)  
**Template:** `dashboard/templates/dashboard/gerador_aulas.html`  
**Status:** ✅ Implementado  

**Funcionalidades:**
- 📚 **Filtros de Status:** TODAS, PENDENTES, PARCIAL, CONCLUÍDAS
- 📊 **Estatísticas:** Total de gerações, matérias processáveis, aulas geradas, apostilas
- 📝 **Seção Ementas:** Cards de matérias com status e ação "GERAR AULAS"
- ✅ **Seção Aulas Geradas:** Cards de aulas já processadas com visualização e exclusão
- 🚀 **Botão Nova Geração:** Link para `/gerador-aulas/nova/`

**Filtros Implementados:**
- `?filtro=todas` — Lista todas as matérias (padrão)
- `?filtro=pendentes` — Status vazio ou `status_geracao == 'pendente'`
- `?filtro=parcial` — `status_geracao == 'erro'`
- `?filtro=concluidas` — `status_geracao == 'concluido'`

**Campos Exibidos nos Cards:**
- Nome da matéria
- Curso
- Carga horária
- Status badge (PENDENTE, PROCESSANDO, CONCLUIDO, ERRO)
- Botão ação (GERAR AULAS / Visualizar)

---

### `/gerador-aulas/nova/` — Formulário de Nova Geração
**Rota:** `nova_geracao_aulas` (view em `dashboard/views.py`)  
**Template:** `dashboard/templates/dashboard/nova_geracao_aulas.html`  
**Status:** ✅ Implementado  

**Funcionalidades:**
- 📄 **Upload de Ementa:** Suporta Markdown, PDF, TXT (máximo 5MB)
- 🎓 **Nome da UC:** Opcional. Extrai automaticamente da ementa se vazio
- ⏱️ **Carga Horária:** Padrão 40h, editável
- ✨ **Opções de Geração:** Checkboxes para Slides, Apostilas, Avaliações (todos selecionados por padrão)
- 📝 **Notas Adicionais:** Campo opcional para orientações de geração
- ⚡ **Validação AJAX:** Submissão assincronista com feedback de sucesso/erro
- 🔄 **Redirecionamento:** Após sucesso, volta para `/gerador-aulas/`

**Validações:**
- Arquivo obrigatório
- Tamanho máximo 5MB
- Formato permitido (.md, .pdf, .txt)
- Feedback em tempo real

---

### API `POST /api/gerador-aulas/` — Processamento de Ementa
**Rota:** `api_gerador_aulas` (view em `dashboard/views.py`)  
**Status:** ✅ Implementado (validação + extração de metadados)  

**Parâmetros de Entrada:**
```
- arquivo_ementa (file, obrigatório)
- nome_uc (text, opcional)
- carga_horaria (number, padrão: 40)
- gerar_slides (checkbox, padrão: on)
- gerar_apostilas (checkbox, padrão: on)
- gerar_avaliacoes (checkbox, padrão: on)
- descricao (text, opcional)
```

**Resposta JSON (Sucesso):**
```json
{
  "status": "sucesso",
  "mensagem": "✅ Ementa \"Introdução à Programação\" processada com sucesso!",
  "uc": "Introdução à Programação",
  "carga_horaria": "40",
  "tamanho_ementa": 5432,
  "conteudo_extraido": true,
  "nome_extraido_automaticamente": false,
  "opcoes": {
    "gerar_slides": true,
    "gerar_apostilas": true,
    "gerar_avaliacoes": true
  }
}
```

**Resposta JSON (Erro):**
```json
{
  "status": "erro",
  "mensagem": "Erro ao processar ementa: ..."
}
```

**Lógica de Extração de Nome (se `nome_uc` vazio):**
1. Procura primeira linha não-vazia da ementa
2. Ignora linhas que começam com `#` ou `---`
3. Pega primeiros 100 caracteres
4. Se não encontrar, usa nome do arquivo (sem extensão)

---

## 📝 Checklist de Deploy

- [ ] `.env` preenchido com credenciais Supabase
- [ ] Tabelas criadas no Supabase (SQL Editor)
- [ ] Bucket `slides` criado e público
- [ ] Migrations rodadas (`manage.py migrate`)
- [ ] Superuser criado (`manage.py createsuperuser`)
- [ ] DEBUG = False em produção
- [ ] SECRET_KEY alterada
- [ ] ALLOWED_HOSTS configurado
- [ ] Backup do banco local (db.sqlite3)

---

## 📚 Dependências

```
Django==6.1
djangorestframework (opcional, para API)
supabase==2.0+
python-dotenv
crispy-forms
crispy-bootstrap5
```

Instalar:
```bash
pip install -r requirements.txt
```

---

## 🎓 Implementar Integração com Claude API para Geração de Aulas

⚠️ **CRÍTICO:** A orientação de conteúdos a gerar SEMPRE deve estar na tabela `materia`.

### Estrutura Obrigatória da Tabela `materia`

Adicionar nova coluna JSON:

```sql
ALTER TABLE materia 
ADD COLUMN conteudo_aulas JSONB DEFAULT NULL;
```

### Estrutura do Campo `conteudo_aulas`

```json
{
  "status_geracao": "pendente|processando|concluido|erro",
  "data_geracao": "2026-09-05T15:35:00Z",
  "ultima_atualizacao": "2026-09-05T15:35:00Z",
  "conteudo_gerado": {
    "aulas": 10,
    "apostilas": 5,
    "avaliacoes": 3,
    "slides": 150
  },
  "configuracoes": {
    "gerar_slides": true,
    "gerar_apostilas": true,
    "gerar_avaliacoes": true,
    "carga_horaria": 40
  },
  "erros": [
    {
      "data": "2026-09-05T15:35:00Z",
      "mensagem": "Erro ao processar ementa",
      "detalhes": "..."
    }
  ],
  "versao": 1
}
```

### Regra de Leitura - OBRIGATÓRIA

Claude Code **SEMPRE** deve:

1. ✅ Ler o campo `conteudo_aulas` antes de gerar aulas
2. ✅ Verificar `status_geracao`:
   - `pendente` → Aulas ainda não foram geradas
   - `processando` → Geração em andamento (não processar novamente)
   - `concluido` → Aulas já foram geradas
   - `erro` → Houve erro na geração anterior
3. ✅ Se `status_geracao == "concluido"` → Mostrar badge "✅ Aulas Geradas"
4. ✅ Se `status_geracao == "processando"` → Mostrar spinner e desabilitar botão de geração
5. ✅ Se `status_geracao == "erro"` → Mostrar alertas com erros anteriores

### Fluxo de Geração com Claude API

```
1. Usuário acessa Gerador de Aulas (modal)
   └─ Sistema verifica conteudo_aulas.status_geracao

2. Se status == "concluido"
   └─ Mostra aviso: "Aulas já foram geradas"
   └─ Oferece opção de "Regenerar"

3. Se status == "pendente" ou "erro"
   └─ Permite upload de ementa
   └─ Atualiza conteudo_aulas.status_geracao = "processando"

4. Claude API analisa ementa
   └─ Extrai capacidades, domínios, conteúdos
   └─ Gera plano de aulas (JSON)

5. Sistema cria estrutura de pastas
   ├─ AULAS/AULA-001.md, AULA-001-SLIDES.html, ...
   ├─ MATERIAIS/APOSTILA-001.html, ...
   ├─ AVALIACOES_CRIADAS/...
   └─ PLANO-AULAS.json

6. Atualiza conteudo_aulas.status_geracao = "concluido"
   └─ Registra timestamp e metadados de geração

7. Notifica usuário: "✅ Aulas geradas com sucesso"
```

### Campos Obrigatórios na Tabela `materia`

```sql
ALTER TABLE materia 
ADD COLUMN conteudo_aulas JSONB DEFAULT NULL,
ADD COLUMN data_geracao_aulas TIMESTAMP DEFAULT NULL,
ADD COLUMN aulas_geradas INTEGER DEFAULT 0,
ADD COLUMN total_horas_planejadas INTEGER DEFAULT 0;
```

### Views.py - Função para Verificar Status

```python
def verificar_status_aulas(materia_id):
    """Verifica se aulas já foram geradas para uma materia"""
    try:
        materia = Materia.objects.get(id=materia_id)
        conteudo = materia.conteudo_aulas or {}
        
        return {
            'ja_gerada': conteudo.get('status_geracao') == 'concluido',
            'status': conteudo.get('status_geracao', 'pendente'),
            'data_geracao': conteudo.get('data_geracao'),
            'total_aulas': conteudo.get('conteudo_gerado', {}).get('aulas', 0),
            'erros': conteudo.get('erros', [])
        }
    except Exception as e:
        return {'erro': str(e), 'ja_gerada': False}
```

### Template - Mostrar Status de Aulas

```html
{% if materia.conteudo_aulas %}
  {% if materia.conteudo_aulas.status_geracao == 'concluido' %}
    <span class="badge badge-success">✅ {{ materia.conteudo_aulas.conteudo_gerado.aulas }} Aulas</span>
  {% elif materia.conteudo_aulas.status_geracao == 'processando' %}
    <span class="badge badge-warning">⏳ Gerando...</span>
  {% elif materia.conteudo_aulas.status_geracao == 'erro' %}
    <span class="badge badge-danger">❌ Erro na Geração</span>
  {% endif %}
{% else %}
  <span class="badge badge-secondary">📝 Pendente</span>
{% endif %}
```

---

## 🎯 Roadmap

- [x] Autenticação Supabase
- [x] Dashboard Django
- [x] Integração Storage
- [x] Monitoramento de storage
- [x] Modal Gerador de Aulas
- [x] Estrutura de Cursos e Matérias
- [ ] Integração com Claude API para Geração de Aulas ⭐
- [ ] API REST (djangorestframework)
- [ ] Tasks assincronos (celery)
- [ ] Compartilhamento de slides
- [ ] Comentários em slides
- [ ] Exportação em outros formatos

---

## 📞 Suporte

Para problemas:
1. Verificar `.env` configurado
2. Testar conexão Supabase: `SupabaseService.get_client()`
3. Verificar logs: `python manage.py runserver --verbosity 3`
4. Verificar admin: http://localhost:8000/admin

---

**Última atualização:** 05-09-2026  
**Mantido por:** Gelvazio Camargo
