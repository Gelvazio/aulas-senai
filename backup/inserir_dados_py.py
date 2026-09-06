#!/usr/bin/env python3
"""
Inserir todos os dados via psycopg2
"""
import psycopg2
import glob
import os
import sys

TARGET_HOST = "hxlvonriearllcmfqeri.supabase.co"
TARGET_PORT = 5432
TARGET_DB = "postgres"
TARGET_USER = "postgres"
TARGET_PASSWORD = "3m3w2Ln8weWbQvXV"

BACKUP_DIR = r"C:\fontes\controlemercadoria\backup\backup_corrigido"

print("=" * 70)
print("💾 INSERINDO DADOS VIA PSYCOPG2")
print("=" * 70)

# Conectar
print(f"\n📡 Conectando a {TARGET_HOST}...")
try:
    conn = psycopg2.connect(
        host=TARGET_HOST,
        port=TARGET_PORT,
        database=TARGET_DB,
        user=TARGET_USER,
        password=TARGET_PASSWORD
    )
    conn.autocommit = True
    cur = conn.cursor()
    print("✅ Conectado!")
except Exception as e:
    print(f"❌ Erro: {e}")
    sys.exit(1)

# Listar e processar arquivos
sql_files = sorted(glob.glob(os.path.join(BACKUP_DIR, "*.sql")))

print(f"\n📊 Processando {len(sql_files)} arquivos...\n")

total_success = 0
total_failed = 0

for sql_file in sql_files:
    table_name = os.path.basename(sql_file)[:-4]

    try:
        with open(sql_file, 'r', encoding='utf-8') as f:
            sql_content = f.read().strip()

        if not sql_content:
            print(f"⏭️ {table_name:30} (vazio)")
            continue

        # Executar INSERT
        cur.execute(sql_content)
        row_count = sql_content.count('INSERT INTO')

        print(f"✅ {table_name:30} {row_count:6} registros inseridos")
        total_success += row_count

    except Exception as e:
        print(f"❌ {table_name:30} ERRO: {str(e)[:80]}")
        total_failed += 1

conn.close()

print(f"\n" + "=" * 70)
print(f"✅ Sucesso: {total_success} registros")
print(f"❌ Falhas: {total_failed} tabelas")
print("=" * 70)
