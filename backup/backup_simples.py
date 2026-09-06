#!/usr/bin/env python3
import psycopg2
from datetime import datetime

# Conexão
conn = psycopg2.connect(
    host="db.jwasbzdbkbryncpvfujc.supabase.co",
    port=5432,
    database="postgres",
    user="postgres",
    password="xkm440POkZg24d7F"
)
conn.autocommit = True
cur = conn.cursor()

# Tabelas excluídas - AGORA INCLUINDO CLIENTE
EXCLUDED = {"produto", "pedido", "pessoa", "venda", "cliente"}

# Cabeçalho
backup = []
backup.append("-- BACKUP COMPLETO DO SUPABASE ERP")
backup.append(f"-- Data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
backup.append(f"-- Excluídas: {', '.join(sorted(EXCLUDED))}")
backup.append("")
backup.append("SET client_encoding = 'UTF8';")
backup.append("")

# Listar tabelas
cur.execute("""
    SELECT table_name FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE'
    ORDER BY table_name
""")
tables = [row[0] for row in cur.fetchall()]

print(f"📊 Total de tabelas: {len(tables)}")
print(f"🚫 Excluídas: {len(EXCLUDED)}")
print(f"✅ Incluídas: {len([t for t in tables if t not in EXCLUDED])}\n")

# Processar cada tabela
for table in tables:
    if table in EXCLUDED:
        print(f"⛔ {table} (excluído)")
        continue

    print(f"✅ {table}", end=" - ")

    # Obter coluna
    cur.execute(f"SELECT * FROM \"{table}\" LIMIT 0")
    cols = [desc[0] for desc in cur.description]

    # Dados
    cur.execute(f"SELECT * FROM \"{table}\"")
    rows = cur.fetchall()

    backup.append(f"-- Table: {table}")

    for row in rows:
        vals = []
        for v in row:
            if v is None:
                vals.append("NULL")
            elif isinstance(v, str):
                vals.append(f"'{v.replace(chr(39), chr(39)+chr(39))}'")
            elif isinstance(v, bool):
                vals.append("true" if v else "false")
            else:
                vals.append(str(v))

        col_names = ", ".join([f'"{c}"' for c in cols])
        insert = f"INSERT INTO \"{table}\" ({col_names}) VALUES ({', '.join(vals)});"
        backup.append(insert)

    print(f"{len(rows)} linhas")

cur.close()
conn.close()

# Salvar
with open("BACKUP_COMPLETO_ERP.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(backup))

size = len("\n".join(backup))
print(f"\n✅ Backup salvo: BACKUP_COMPLETO_ERP.sql ({size} bytes)")
