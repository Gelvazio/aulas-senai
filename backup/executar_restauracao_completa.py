#!/usr/bin/env python3
"""
Executa restauração completa via MCP
1. Cria tabelas (DDL)
2. Insere dados (DML)
"""
import glob
import os

DDL_FILE = r"C:\fontes\controlemercadoria\CREATE_TABLES.sql"
DATA_DIR = r"C:\fontes\controlemercadoria\backup_corrigido"
PROJECT_ID = "hxlvonriearllcmfqeri"

print("=" * 70)
print("🔄 RESTAURAÇÃO COMPLETA DO BACKUP")
print("=" * 70)

# Passo 1: Ler CREATE TABLE statements
print(f"\n📖 PASSO 1: Lendo DDL (CREATE TABLE)...")
with open(DDL_FILE, 'r', encoding='utf-8') as f:
    ddl_content = f.read()

# Extrair cada CREATE TABLE
create_statements = []
current = []
for line in ddl_content.split('\n'):
    if line.startswith('-- Table:'):
        if current:
            create_statements.append('\n'.join(current))
            current = []
    current.append(line)
if current:
    create_statements.append('\n'.join(current))

# Filtrar vazios
create_statements = [s.strip() for s in create_statements if s.strip() and s.strip().startswith('CREATE')]

print(f"✅ {len(create_statements)} CREATE TABLE statements encontrados\n")

# Passo 2: Listar arquivos de dados
print(f"📖 PASSO 2: Listando arquivos de dados...")
data_files = sorted(glob.glob(os.path.join(DATA_DIR, "*.sql")))
print(f"✅ {len(data_files)} arquivos SQL encontrados\n")

# Passo 3: Gerar instruções de restauração
print("=" * 70)
print("INSTRUÇÕES DE RESTAURAÇÃO")
print("=" * 70)

print(f"""
Total de passos:
  1. CREATE TABLE statements: {len(create_statements)}
  2. Arquivos de dados: {len([f for f in data_files if f])}

Para executar a restauração:

### PASSO 1: Criar tabelas (executar DDL)

Execute cada CREATE TABLE via:
  mcp__f9d10089-9eaa-4166-8cd1-7a43cb904cad__execute_sql(
    project_id="{PROJECT_ID}",
    query=<CREATE_TABLE_STATEMENT>
  )

Total de tabelas a criar: {len(create_statements)}

### PASSO 2: Inserir dados (executar DML)

Para cada tabela, execute via:
  mcp__f9d10089-9eaa-4166-8cd1-7a43cb904cad__execute_sql(
    project_id="{PROJECT_ID}",
    query=<conteúdo_arquivo_tabela.sql>
  )

Total de arquivos de dados: {len(data_files)}

### Arquivos de dados (em ordem):
""")

for f in sorted(data_files):
    name = os.path.basename(f)
    size = os.path.getsize(f)
    print(f"  - {name:30} ({size:10} bytes)")

print(f"""
### Próximos passos:
1. Execute todos os CREATE TABLE statements
2. Execute todos os INSERT statements

Alternativamente, você pode usar um script automation para fazer isso.
""")
