#!/usr/bin/env python3
"""
Consolida todos os dados de backup em uma única tabela
Estrutura: backup (id, tabela_origem, coluna_nomes, valores_json, data_backup)
"""
import glob
import json
import os
import re
from datetime import datetime

BACKUP_DIR = r"C:\fontes\controlemercadoria\backup_corrigido"
OUTPUT_FILE = r"C:\fontes\controlemercadoria\BACKUP_UNIFICADO.sql"

print("=" * 70)
print("🔄 CONSOLIDANDO BACKUP EM UMA ÚNICA TABELA")
print("=" * 70)

# Criar arquivo de saída
sql_lines = []

# Cabeçalho
sql_lines.append("-- BACKUP UNIFICADO EM UMA TABELA")
sql_lines.append(f"-- Data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
sql_lines.append("")
sql_lines.append("SET client_encoding = 'UTF8';")
sql_lines.append("")

# CREATE TABLE backup
sql_lines.append("""-- Criar tabela única de backup
CREATE TABLE IF NOT EXISTS backup (
  id SERIAL PRIMARY KEY,
  tabela_origem VARCHAR(255) NOT NULL,
  coluna_nomes TEXT NOT NULL,
  valores_json JSONB NOT NULL,
  data_backup TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
""")

# Processar cada arquivo SQL
sql_files = sorted(glob.glob(os.path.join(BACKUP_DIR, "*.sql")))

print(f"\n📖 Processando {len(sql_files)} arquivos...\n")

total_inserts = 0

for sql_file in sql_files:
    filename = os.path.basename(sql_file)
    table_name = filename[:-4]  # Remove .sql

    # Ler arquivo
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()

    if not content.strip():
        continue

    # Extrair INSERTs
    # Padrão: INSERT INTO "tabela" ("col1", "col2") VALUES (val1, val2);
    insert_pattern = r'INSERT INTO "(\w+)" \((.*?)\) VALUES \((.*?)\);'

    matches = re.findall(insert_pattern, content)

    if not matches:
        print(f"⏭️ {table_name:30} (sem dados)")
        continue

    # Extrair nomes de colunas do primeiro INSERT
    if matches:
        cols_str = matches[0][1]
        # Limpar aspas
        cols = [c.strip().strip('"') for c in cols_str.split(',')]
        cols_json = json.dumps(cols)

    insert_count = 0
    for table, cols_str, values_str in matches:
        # Parse dos valores
        # Separar por vírgula, mas respeitando strings
        values = []
        current = ""
        in_string = False
        escape_next = False

        for char in values_str:
            if escape_next:
                current += char
                escape_next = False
                continue

            if char == "\\":
                escape_next = True
                current += char
                continue

            if char == "'" and not escape_next:
                in_string = not in_string
                current += char
                continue

            if char == "," and not in_string:
                values.append(current.strip())
                current = ""
                continue

            current += char

        if current.strip():
            values.append(current.strip())

        # Converter valores para JSON
        values_json = json.dumps(values)

        # Montar INSERT para tabela backup
        insert_sql = f"INSERT INTO backup (tabela_origem, coluna_nomes, valores_json) VALUES ('{table}', '{cols_json.replace(chr(39), chr(39)+chr(39))}', '{values_json.replace(chr(39), chr(39)+chr(39))}');"
        sql_lines.append(insert_sql)

        insert_count += 1
        total_inserts += 1

    print(f"✅ {table_name:30} {insert_count:6} registros")

print(f"\n" + "=" * 70)
print(f"✅ Total de registros: {total_inserts}")

# Salvar arquivo
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

size = os.path.getsize(OUTPUT_FILE)
print(f"✅ Arquivo criado: BACKUP_UNIFICADO.sql ({size} bytes)")
print("=" * 70)
