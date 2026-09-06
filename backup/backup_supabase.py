#!/usr/bin/env python3
"""
Script de Backup do Supabase ERP - Versão 2
Gera backup SQL completo excluindo tabelas específicas
Usa information_schema para obter DDL e estrutura
"""

import psycopg2
from psycopg2 import sql
import sys
from datetime import datetime

# Configuração
SUPABASE_HOST = "db.jwasbzdbkbryncpvfujc.supabase.co"
SUPABASE_PORT = 5432
SUPABASE_DB = "postgres"
SUPABASE_USER = "postgres"
SUPABASE_PASSWORD = "xkm440POkZg24d7F"

# Tabelas a excluir
EXCLUDED_TABLES = {"produto", "pedido", "pessoa", "venda"}

# Caminho do backup
BACKUP_FILE = r"C:\fontes\controlemercadoria\BACKUP_COMPLETO_ERP.sql"

def connect_db():
    """Conectar ao banco de dados"""
    try:
        conn = psycopg2.connect(
            host=SUPABASE_HOST,
            port=SUPABASE_PORT,
            database=SUPABASE_DB,
            user=SUPABASE_USER,
            password=SUPABASE_PASSWORD
        )
        conn.autocommit = True
        print("✅ Conexão estabelecida com sucesso!")
        return conn
    except Exception as e:
        print(f"❌ Erro ao conectar: {e}")
        sys.exit(1)

def get_all_tables(conn):
    """Obter lista de todas as tabelas públicas"""
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE'
            ORDER BY table_name
        """)
        tables = [row[0] for row in cur.fetchall()]
        cur.close()
        return tables
    except Exception as e:
        print(f"❌ Erro ao listar tabelas: {e}")
        sys.exit(1)

def get_create_table_ddl(conn, table_name):
    """Construir CREATE TABLE DDL usando information_schema"""
    try:
        cur = conn.cursor()

        # Obter colunas
        cur.execute("""
            SELECT column_name, data_type, is_nullable, column_default, character_maximum_length
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = %s
            ORDER BY ordinal_position
        """, (table_name,))

        columns = []
        for col_name, data_type, is_nullable, col_default, char_max_len in cur.fetchall():
            col_def = col_name

            # Adicionar tipo de dados
            if data_type == "character varying" and char_max_len:
                col_def += f" VARCHAR({char_max_len})"
            else:
                col_def += f" {data_type.upper()}"

            # Adicionar constraints
            if col_default:
                col_def += f" DEFAULT {col_default}"

            if is_nullable == "NO":
                col_def += " NOT NULL"

            columns.append(col_def)

        cur.close()

        if not columns:
            return None

        ddl = f"CREATE TABLE {sql.Identifier(table_name).getquoted()} (\n"
        ddl += ",\n".join([f"  {col}" for col in columns])
        ddl += "\n)"

        return ddl
    except Exception as e:
        print(f"   ⚠️ Erro ao obter DDL de {table_name}: {e}")
        return None

def generate_backup(conn, all_tables):
    """Gerar backup SQL"""
    backup_sql = []

    # Cabeçalho
    backup_sql.append("-- BACKUP COMPLETO DO SUPABASE ERP")
    backup_sql.append(f"-- Gerado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    backup_sql.append(f"-- Host: {SUPABASE_HOST}")
    backup_sql.append(f"-- Banco: {SUPABASE_DB}")
    backup_sql.append("--")
    backup_sql.append(f"-- Tabelas EXCLUÍDAS: {', '.join(sorted(EXCLUDED_TABLES))}")
    backup_sql.append("--")
    backup_sql.append("")
    backup_sql.append("SET client_encoding = 'UTF8';")
    backup_sql.append("SET standard_conforming_strings = on;")
    backup_sql.append("")

    # Tabelas a incluir
    included_tables = [t for t in all_tables if t not in EXCLUDED_TABLES]

    print(f"\n📊 Tabelas encontradas: {len(all_tables)}")
    print(f"   - Incluídas no backup: {len(included_tables)}")
    print(f"   - Excluídas: {len([t for t in EXCLUDED_TABLES if t in all_tables])}")
    print(f"\n📝 Tabelas incluídas:")
    for table in included_tables:
        print(f"   ✅ {table}")

    print(f"\n⛔ Tabelas excluídas:")
    for table in EXCLUDED_TABLES:
        if table in all_tables:
            print(f"   ❌ {table}")

    cur = conn.cursor()

    # Processar cada tabela
    for table in included_tables:
        try:
            print(f"\n🔄 Processando tabela: {table}")

            # CREATE TABLE
            ddl = get_create_table_ddl(conn, table)
            if ddl:
                backup_sql.append(f"-- Table: {table}")
                backup_sql.append(ddl)
                backup_sql.append(";")
                backup_sql.append("")

            # Dados (INSERT)
            cur.execute(f"SELECT * FROM {sql.Identifier(table)}")
            rows = cur.fetchall()
            row_count = len(rows)

            if row_count > 0:
                backup_sql.append(f"-- Data for table: {table} ({row_count} rows)")
                columns = [desc[0] for desc in cur.description]

                for row in rows:
                    values = []
                    for val in row:
                        if val is None:
                            values.append("NULL")
                        elif isinstance(val, str):
                            # Escapar aspas simples
                            escaped_val = val.replace("'", "''")
                            values.append(f"'{escaped_val}'")
                        elif isinstance(val, bool):
                            values.append("true" if val else "false")
                        else:
                            values.append(str(val))

                    col_names = ", ".join([sql.Identifier(c).getquoted() for c in columns])
                    insert_sql = f"INSERT INTO {sql.Identifier(table).getquoted()} ({col_names}) VALUES ({', '.join(values)});"
                    backup_sql.append(insert_sql)

                backup_sql.append("")

            print(f"   ✅ {table}: {row_count} linhas")

        except Exception as e:
            print(f"   ⚠️ Erro ao processar {table}: {e}")
            continue

    cur.close()

    return "\n".join(backup_sql)

def save_backup(backup_content):
    """Salvar backup em arquivo"""
    try:
        with open(BACKUP_FILE, 'w', encoding='utf-8') as f:
            f.write(backup_content)

        # Obter tamanho do arquivo
        import os
        file_size = os.path.getsize(BACKUP_FILE)
        size_mb = file_size / (1024 * 1024)

        print(f"\n✅ Backup salvo com sucesso!")
        print(f"   📄 Arquivo: {BACKUP_FILE}")
        print(f"   📊 Tamanho: {size_mb:.2f} MB ({file_size} bytes)")

        # Contar linhas
        line_count = sum(1 for line in open(BACKUP_FILE))
        print(f"   📝 Linhas: {line_count}")

        return True
    except Exception as e:
        print(f"❌ Erro ao salvar arquivo: {e}")
        return False

def validate_backup(backup_file):
    """Validar o backup"""
    try:
        with open(backup_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Verificar que tabelas excluídas não aparecem
        excluded_found = []
        for table in EXCLUDED_TABLES:
            if f"INSERT INTO {table}" in content or f"CREATE TABLE {table}" in content:
                excluded_found.append(table)

        if excluded_found:
            print(f"\n⚠️ AVISO: As seguintes tabelas excluídas foram encontradas: {excluded_found}")
            return False

        print(f"\n✅ Validação de integridade passou:")
        print(f"   - Nenhuma tabela excluída encontrada no backup")
        print(f"   - Arquivo contém {len(content)} caracteres")
        return True
    except Exception as e:
        print(f"❌ Erro ao validar: {e}")
        return False

def main():
    """Função principal"""
    print("=" * 60)
    print("🔄 INICIANDO BACKUP DO SUPABASE ERP (V2)")
    print("=" * 60)

    # Conectar
    print("\n📡 Conectando ao Supabase...")
    conn = connect_db()

    # Listar tabelas
    print("\n📋 Listando tabelas...")
    all_tables = get_all_tables(conn)

    # Gerar backup
    print("\n💾 Gerando backup SQL...")
    backup_content = generate_backup(conn, all_tables)

    conn.close()

    # Salvar arquivo
    print("\n💾 Salvando arquivo de backup...")
    if save_backup(backup_content):
        # Validar
        print("\n✔️ Validando backup...")
        if validate_backup(BACKUP_FILE):
            print("\n" + "=" * 60)
            print("✅ BACKUP COMPLETO COM SUCESSO!")
            print("=" * 60)
            return 0

    print("\n" + "=" * 60)
    print("❌ ERRO AO GERAR BACKUP!")
    print("=" * 60)
    return 1

if __name__ == "__main__":
    sys.exit(main())
