# GERADOR DE SLIDES — Dashboard Django

Dashboard web para gerar apresentações PPTX a partir de arquivos Markdown, **sem usar IA**.

## Instalação

Dependências já instaladas:
- Django
- crispy-forms
- crispy-bootstrap5

## Como executar

```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES

# Iniciar servidor
C:\Python314\python.exe manage.py runserver

# Ou em porta customizada
C:\Python314\python.exe manage.py runserver 8080
```

Acesse em: **http://localhost:8000**

## Primeiro acesso

1. Abra http://localhost:8000
2. Selecione um arquivo `.md` da pasta `ENTRADAS-AULAS-MARKDOWN/`
3. Clique em "✓ Validar Primeiro" (opcional)
4. Clique em "🎬 Gerar Slide"
5. Acompanhe a geração em tempo real
6. Download do PPTX quando pronto

## Estrutura

```
GERADOR-SLIDES/
├── manage.py                      # Gerenciador Django
├── gerador_config/                # Configurações
│   ├── settings.py               # Configurações (INSTALLED_APPS, etc)
│   ├── urls.py                   # Rotas principais
│   └── wsgi.py
├── dashboard/                     # App principal
│   ├── models.py                 # Modelo GeracaoSlide
│   ├── views.py                  # Lógica (validar, gerar, download)
│   ├── urls.py                   # Rotas da app
│   ├── admin.py                  # Painel admin
│   ├── migrations/               # Histórico de banco
│   └── templates/
│       ├── base.html             # Template base
│       └── dashboard/
│           ├── index.html        # Dashboard principal
│           └── detalhe.html      # Detalhes de uma geração
├── ENTRADAS-AULAS-MARKDOWN/      # Entrada de arquivos .md
├── SAIDA/                        # Saída de .pptx gerados
├── TASKS/                        # Rastreamento JSON
├── scripts/                      # Gerador Python (gerar_slides.py)
└── db.sqlite3                    # Banco de dados (auto-criado)
```

## Operações comuns

### Criar superuser (admin)
```bash
C:\Python314\python.exe manage.py createsuperuser
```
Depois acesse: http://localhost:8000/admin

### Gerar um slide via CLI (sem dashboard)
```bash
C:\Python314\python.exe scripts\gerar_slides.py gerar ENTRADAS-AULAS-MARKDOWN\seu-arquivo.md
```

### Validar arquivo antes de gerar
```bash
C:\Python314\python.exe scripts\gerar_slides.py validar ENTRADAS-AULAS-MARKDOWN\seu-arquivo.md
```

## Funcionalidades

✅ **Dashboard responsivo** — Listagem visual de gerações  
✅ **Validação em tempo real** — Saber se o arquivo é válido ANTES de gerar  
✅ **Download automático** — PPTX direto do navegador  
✅ **Histórico centralizado** — Banco de dados SQLite com todas as gerações  
✅ **Rastreamento** — Status (PENDENTE/GERADO/ERRO) visível  
✅ **Admin Django** — Gerenciar gerações via painel admin  
✅ **Zero IA** — Apenas Python + Django, sem chamadas externas  

## Notas

- Sem limite de slides (qualquer quantidade no `.md`)
- Sem permissão por usuário (qualquer um pode gerar enquanto servidor rodar)
- Banco SQLite persistente (histórico fica salvo entre reinicializações)
- Arquivos PPTX gerados ficam em `SAIDA/`

---

**Desenvolvido com Django + Python + python-pptx**
