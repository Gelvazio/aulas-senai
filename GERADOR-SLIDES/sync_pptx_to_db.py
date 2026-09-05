#!/usr/bin/env python3
import os
import django
from pathlib import Path
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gerador_config.settings')
django.setup()

from dashboard.models import GeracaoSlide

SAIDA_DIR = Path('SAIDA')

print('📊 Sincronizando PPTX para banco de dados...\n')

for pptx_file in sorted(SAIDA_DIR.glob('*.pptx')):
    nome_base = pptx_file.stem
    tamanho_mb = f'{pptx_file.stat().st_size / (1024*1024):.2f} MB'

    # Tentar encontrar o arquivo .md correspondente
    md_file = Path('ENTRADAS-AULAS-MARKDOWN') / f'{nome_base}.md'
    if not md_file.exists():
        # Se não existe, procura um .md similar
        md_files = list(Path('ENTRADAS-AULAS-MARKDOWN').glob('*.md'))
        if md_files:
            # Usa o primeiro disponível como fallback
            nome_md = md_files[0].name
        else:
            nome_md = f'{nome_base}.md'
    else:
        nome_md = md_file.name

    print(f'📝 {pptx_file.name}')
    print(f'   MD: {nome_md}')
    print(f'   Tamanho: {tamanho_mb}')

    try:
        # Tentar atualizar se já existe
        geracao, criado = GeracaoSlide.objects.update_or_create(
            arquivo=nome_md,
            defaults={
                'status': 'GERADO',
                'arquivo_saida': pptx_file.name,
                'tamanho': tamanho_mb,
                'data_criacao': datetime.now(),
                'data_geracao': datetime.now(),
                'slides': None
            }
        )

        if criado:
            print(f'   ✅ Criado novo registro\n')
        else:
            print(f'   ✏️  Atualizado\n')

    except Exception as e:
        print(f'   ❌ Erro: {str(e)}\n')

# Mostrar resultado final
print('📋 Registros no banco:')
for geracao in GeracaoSlide.objects.all().order_by('-data_geracao'):
    status_emoji = '✓' if geracao.status == 'GERADO' else '×'
    print(f'  [{status_emoji}] {geracao.arquivo} → {geracao.arquivo_saida or "N/A"} ({geracao.tamanho or "?"})' )

print('\n✅ Sincronização concluída! Recarregue o dashboard.')
