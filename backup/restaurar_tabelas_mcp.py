#!/usr/bin/env python3
"""
Restaurar tabelas via MCP execute_sql
Lê cada arquivo de tabela e envia para o Supabase
"""
import os
import glob
import json

BACKUP_DIR = r"C:\fontes\controlemercadoria\backup_por_tabela"
PROJECT_ID = "hxlvonriearllcmfqeri"

print("=" * 60)
print("🔄 RESTAURANDO TABELAS VIA MCP")
print("=" * 60)

# Listar arquivos
sql_files = sorted(glob.glob(os.path.join(BACKUP_DIR, "*.sql")))

print(f"\n📊 Encontrados {len(sql_files)} arquivos de tabela\n")

# Ler e preparar cada tabela
commands = []
for sql_file in sql_files:
    table_name = os.path.basename(sql_file)[:-4]  # Remove .sql
    file_size = os.path.getsize(sql_file)

    with open(sql_file, 'r', encoding='utf-8') as f:
        sql_content = f.read()

    if not sql_content.strip():
        print(f"⏭️ {table_name:30} (vazio)")
        continue

    line_count = sql_content.count('\n')

    commands.append({
        'table': table_name,
        'file': sql_file,
        'size': file_size,
        'lines': line_count,
        'sql': sql_content
    })

    print(f"✅ {table_name:30} {line_count:6} linhas  {file_size:10} bytes")

print(f"\n" + "=" * 60)
print("PRÓXIMAS INSTRUÇÕES:")
print("=" * 60)
print(f"""
Total de tabelas a restaurar: {len(commands)}
Projeto destino: {PROJECT_ID}

Para cada tabela, execute via ferramenta MCP:

mcp__f9d10089-9eaa-4166-8cd1-7a43cb904cad__execute_sql(
    project_id="{PROJECT_ID}",
    query=<conteúdo_do_arquivo>
)

Arquivos de tabela estão em:
{BACKUP_DIR}

Você pode restaurar manualmente ou criar um script de automação.
""")

# Salvar resumo
summary_file = os.path.join(BACKUP_DIR, "RESTAURACAO_RESUMO.txt")
with open(summary_file, 'w', encoding='utf-8') as f:
    f.write(f"Resumo de Restauração\n")
    f.write(f"=====================\n\n")
    f.write(f"Projeto: {PROJECT_ID}\n")
    f.write(f"Total de tabelas: {len(commands)}\n\n")
    for cmd in commands:
        f.write(f"{cmd['table']:30} {cmd['lines']:6} linhas  {cmd['size']:10} bytes\n")

print(f"📋 Resumo salvo em: {summary_file}")
