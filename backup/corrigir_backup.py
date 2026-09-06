#!/usr/bin/env python3
"""
Corrige problemas de encoding e formatação nos arquivos SQL
"""
import os
import glob
import re

BACKUP_DIR = r"C:\fontes\controlemercadoria\backup_por_tabela"
CORRECTED_DIR = r"C:\fontes\controlemercadoria\backup_corrigido"

os.makedirs(CORRECTED_DIR, exist_ok=True)

sql_files = glob.glob(os.path.join(BACKUP_DIR, "*.sql"))

print("🔧 Corrigindo arquivos SQL\n")

for sql_file in sorted(sql_files):
    filename = os.path.basename(sql_file)

    # Ler
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()

    if not content.strip():
        continue

    # Corrigir tempo (HH:MM:SS sem aspas -> com aspas)
    # Padrão: número:número:número não entre aspas
    content = re.sub(r'(?<!\')[0-2]?\d:[0-5]\d:[0-5]\d(?!\')',
                     lambda m: f"'{m.group()}'",
                     content)

    # Salvar versão corrigida
    output_file = os.path.join(CORRECTED_DIR, filename)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

    lines = content.count('\n')
    print(f"✅ {filename:30} {lines} linhas")

print(f"\n✅ Arquivos corrigidos em: {CORRECTED_DIR}")
