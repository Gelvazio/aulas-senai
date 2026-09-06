#!/usr/bin/env python3
"""
Script para inserir dados via MCP Supabase
"""
import glob
import os

BACKUP_DIR = r"C:\fontes\controlemercadoria\backup\backup_corrigido"
PROJECT_ID = "hxlvonriearllcmfqeri"

print("=" * 70)
print("🔄 EXECUÇÃO DE INSERTS VIA MCP SUPABASE")
print("=" * 70)

# Listar arquivos
sql_files = sorted(glob.glob(os.path.join(BACKUP_DIR, "*.sql")))

print(f"\n📊 Encontrados {len(sql_files)} arquivos de dados\n")

# Gerar instruções MCP
instructions = []
for sql_file in sql_files:
    table_name = os.path.basename(sql_file)[:-4]

    with open(sql_file, 'r', encoding='utf-8') as f:
        sql_content = f.read().strip()

    if not sql_content:
        print(f"⏭️ {table_name:30} (vazio)")
        continue

    line_count = sql_content.count('\n') + 1
    print(f"✅ {table_name:30} {line_count:6} INSERTs")

    instructions.append({
        'table': table_name,
        'file': sql_file,
        'sql': sql_content,
        'lines': line_count
    })

print(f"\n" + "=" * 70)
print(f"Total de tabelas com dados: {len(instructions)}")
print("=" * 70)

print(f"""
Para inserir os dados, execute cada comando abaixo via MCP:

mcp__f9d10089-9eaa-4166-8cd1-7a43cb904cad__execute_sql(
    project_id="{PROJECT_ID}",
    query=<conteúdo_do_arquivo_SQL>
)

Total de registros a inserir: {sum(i['lines'] for i in instructions)}
""")

print("\nArquivos em ordem:")
for i, instr in enumerate(instructions, 1):
    print(f"  {i:2}. {instr['table']:30} ({instr['lines']:3} INSERTs)")
