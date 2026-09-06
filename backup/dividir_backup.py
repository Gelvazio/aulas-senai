#!/usr/bin/env python3
"""
Divide backup em arquivos por tabela
"""
import os
import re

BACKUP_FILE = r"C:\fontes\controlemercadoria\BACKUP_COMPLETO_ERP.sql"
OUTPUT_DIR = r"C:\fontes\controlemercadoria\backup_por_tabela"

# Criar diretório
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("📖 Lendo backup...")
with open(BACKUP_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Separar por tabelas
tables = {}
current_table = None
lines = content.split('\n')

for line in lines:
    # Detectar comentário de tabela
    match = re.match(r'-- Table: (\w+)', line)
    if match:
        current_table = match.group(1)
        if current_table not in tables:
            tables[current_table] = []
        continue

    # Adicionar linha à tabela atual
    if current_table and line.strip():
        tables[current_table].append(line)

print(f"✅ {len(tables)} tabelas encontradas\n")

# Salvar por tabela
for table_name, lines_list in sorted(tables.items()):
    filename = os.path.join(OUTPUT_DIR, f"{table_name}.sql")
    with open(filename, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines_list))

    # Contar INSERTs
    insert_count = sum(1 for line in lines_list if line.strip().startswith('INSERT INTO'))
    size = os.path.getsize(filename)

    print(f"📄 {table_name:30} {insert_count:6} inserts  {size:10} bytes")

print(f"\n✅ Arquivos salvos em: {OUTPUT_DIR}")
print(f"\n💡 Agora você pode restaurar cada arquivo separadamente via MCP")
