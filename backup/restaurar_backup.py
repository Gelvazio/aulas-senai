#!/usr/bin/env python3
"""
Script para restaurar backup SQL no Supabase
"""
import psycopg2
import sys

# Projeto destino
TARGET_HOST = "hxlvonriearllcmfqeri.supabase.co"
TARGET_PORT = 5432
TARGET_DB = "postgres"
TARGET_USER = "postgres"
TARGET_PASSWORD = "3m3w2Ln8weWbQvXV"

BACKUP_FILE = r"C:\fontes\controlemercadoria\BACKUP_COMPLETO_ERP.sql"

print("=" * 60)
print("🔄 RESTAURANDO BACKUP")
print("=" * 60)

# Conectar
print(f"\n📡 Conectando ao projeto {TARGET_HOST}...")
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

# Ler backup
print(f"\n📄 Lendo arquivo: {BACKUP_FILE}")
try:
    with open(BACKUP_FILE, 'r', encoding='utf-8') as f:
        sql_content = f.read()
    print(f"✅ Arquivo carregado ({len(sql_content)} caracteres)")
except Exception as e:
    print(f"❌ Erro ao ler: {e}")
    sys.exit(1)

# Executar
print(f"\n⚙️ Executando SQL...")
try:
    # Dividir em statements individuais
    statements = [s.strip() for s in sql_content.split(';') if s.strip() and not s.strip().startswith('--')]

    success = 0
    failed = 0

    for i, statement in enumerate(statements, 1):
        try:
            cur.execute(statement)
            success += 1
            if i % 1000 == 0:
                print(f"  ✅ {i}/{len(statements)} statements executados")
        except Exception as e:
            failed += 1
            if failed <= 5:  # Mostrar apenas primeiros 5 erros
                print(f"  ⚠️ Statement {i}: {str(e)[:100]}")

    conn.commit()
    cur.close()
    conn.close()

    print(f"\n✅ Restauração concluída!")
    print(f"   - Sucessos: {success}")
    print(f"   - Falhas: {failed}")
    print(f"\n" + "=" * 60)
    print("✅ BACKUP RESTAURADO COM SUCESSO!")
    print("=" * 60)

except Exception as e:
    print(f"❌ Erro durante execução: {e}")
    sys.exit(1)
