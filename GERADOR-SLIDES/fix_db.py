import sqlite3
from pathlib import Path
from datetime import datetime

conn = sqlite3.connect('db.sqlite3')
cursor = conn.cursor()

SAIDA_DIR = Path('SAIDA')
print('🔍 Procurando arquivos PPTX...\n')

for pptx_file in SAIDA_DIR.glob('*.pptx'):
    tamanho_mb = f'{pptx_file.stat().st_size / (1024*1024):.2f} MB'
    nome_original = pptx_file.stem
    agora = datetime.now().isoformat()

    cursor.execute('SELECT id FROM dashboard_geracaoslide WHERE arquivo_saida = ?', (pptx_file.name,))
    if not cursor.fetchone():
        cursor.execute('''
            INSERT INTO dashboard_geracaoslide (arquivo, arquivo_saida, status, tamanho, data_criacao, data_geracao)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (f'{nome_original}.md', pptx_file.name, 'GERADO', tamanho_mb, agora, agora))
        print(f'✅ Registrado: {pptx_file.name} ({tamanho_mb})')
    else:
        print(f'⏭️  Já existe: {pptx_file.name}')

conn.commit()

print('\n📋 Slides no banco agora:')
cursor.execute('SELECT id, arquivo_saida, tamanho, status FROM dashboard_geracaoslide ORDER BY id DESC')
for row in cursor.fetchall():
    print(f'  [{row[0]}] {row[1]} - {row[2]} ({row[3]})')

conn.close()
print('\n✅ Pronto! Recarregue o dashboard para ver os slides.')
