#!/usr/bin/env python3
"""
Gera CREATE TABLE statements do banco original
"""
import psycopg2

SOURCE_HOST = "db.jwasbzdbkbryncpvfujc.supabase.co"
SOURCE_PORT = 5432
SOURCE_DB = "postgres"
SOURCE_USER = "postgres"
SOURCE_PASSWORD = "xkm440POkZg24d7F"

EXCLUDED = {"produto", "pedido", "pessoa", "venda", "cliente"}
OUTPUT_FILE = r"C:\fontes\controlemercadoria\CREATE_TABLES.sql"

print("📡 Conectando ao banco original...")
conn = psycopg2.connect(
    host=SOURCE_HOST,
    port=SOURCE_PORT,
    database=SOURCE_DB,
    user=SOURCE_USER,
    password=SOURCE_PASSWORD
)
conn.autocommit = True
cur = conn.cursor()

# Listar tabelas
cur.execute("""
    SELECT table_name FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE'
    ORDER BY table_name
""")
tables = [row[0] for row in cur.fetchall()]

# Filtrar excluídas
tables = [t for t in tables if t not in EXCLUDED]

print(f"✅ {len(tables)} tabelas encontradas\n")

# Gerar DDL
ddl_statements = []
ddl_statements.append("-- CREATE TABLE STATEMENTS")
ddl_statements.append("")

for table in tables:
    cur.execute(f"""
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema='public' AND table_name=%s
        ORDER BY ordinal_position
    """, (table,))

    columns = cur.fetchall()

    if not columns:
        continue

    ddl = f"CREATE TABLE \"{table}\" (\n"

    col_defs = []
    for col_name, data_type, is_nullable, col_default in columns:
        col_def = f"  \"{col_name}\" {data_type}"

        if col_default:
            col_def += f" DEFAULT {col_default}"

        if is_nullable == "NO":
            col_def += " NOT NULL"

        col_defs.append(col_def)

    ddl += ",\n".join(col_defs)
    ddl += "\n);"

    ddl_statements.append(f"-- Table: {table}")
    ddl_statements.append(ddl)
    ddl_statements.append("")

    print(f"✅ {table}")

cur.close()
conn.close()

# Salvar
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write("\n".join(ddl_statements))

print(f"\n✅ DDL salvo em: {OUTPUT_FILE}")
print(f"   {len([s for s in ddl_statements if s.startswith('CREATE')])} tables")
