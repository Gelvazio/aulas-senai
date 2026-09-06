#!/usr/bin/env python3
"""
Restaurar backup via conector MCP do Supabase
Usa chunking para evitar limites de tamanho
"""
import sys
import json

BACKUP_FILE = r"C:\fontes\controlemercadoria\BACKUP_COMPLETO_ERP.sql"
PROJECT_ID = "hxlvonriearllcmfqeri"

print("=" * 60)
print("🔄 RESTAURANDO BACKUP VIA MCP")
print("=" * 60)

# Ler arquivo
print(f"\n📄 Lendo: {BACKUP_FILE}")
with open(BACKUP_FILE, 'r', encoding='utf-8') as f:
    sql_content = f.read()

print(f"✅ Arquivo carregado: {len(sql_content)} caracteres")

# Dividir em statements
statements = []
for line in sql_content.split('\n'):
    line = line.strip()
    if line and not line.startswith('--'):
        statements.append(line)

# Agrupar em blocos (evitar statements muito grandes)
blocks = []
current_block = []
current_size = 0
MAX_BLOCK_SIZE = 50000  # 50KB por bloco

for stmt in statements:
    if current_size + len(stmt) > MAX_BLOCK_SIZE and current_block:
        blocks.append('\n'.join(current_block))
        current_block = [stmt]
        current_size = len(stmt)
    else:
        current_block.append(stmt)
        current_size += len(stmt)

if current_block:
    blocks.append('\n'.join(current_block))

print(f"\n📊 Dividido em {len(blocks)} blocos")
print(f"   Tamanho máximo por bloco: {MAX_BLOCK_SIZE} bytes")

# Gerar instruções para executar via MCP
print(f"\n💾 Gerando instruções MCP...")

mcp_commands = []
for i, block in enumerate(blocks, 1):
    cmd = {
        "block_number": i,
        "total_blocks": len(blocks),
        "sql": block[:200] + "..." if len(block) > 200 else block,
        "sql_size": len(block)
    }
    mcp_commands.append(cmd)
    print(f"  Bloco {i}: {len(block)} bytes")

print(f"\n" + "=" * 60)
print("PRÓXIMO PASSO:")
print("=" * 60)
print(f"""
Execute os seguintes comandos Python para restaurar cada bloco:

project_id = "{PROJECT_ID}"

Execute para cada bloco:
mcp__f9d10089-9eaa-4166-8cd1-7a43cb904cad__execute_sql(
    project_id=project_id,
    query=<conteúdo_bloco>
)

Total de blocos: {len(blocks)}
Tamanho total: {len(sql_content)} bytes

Use a ferramenta execute_sql do MCP Supabase para cada bloco.
""")

print("\n📋 Instruções salvas para consulta")
print(f"\nTotal de statements: {len(statements)}")
print(f"Total de blocos: {len(blocks)}")
