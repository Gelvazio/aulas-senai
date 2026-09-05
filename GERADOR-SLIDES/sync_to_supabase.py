#!/usr/bin/env python3
import os
import sys
import django
from pathlib import Path
from datetime import datetime

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gerador_config.settings')
django.setup()

from dashboard.services import SupabaseService
from dashboard.models import GeracaoSlide

SAIDA_DIR = Path('SAIDA')

print('🚀 Sincronizando PPTX com Supabase Storage...\n')

for pptx_file in sorted(SAIDA_DIR.glob('*.pptx')):
    slide_id = pptx_file.stem.replace('-', '_').lower()
    print(f'📤 Fazendo upload: {pptx_file.name} (ID: {slide_id})')

    try:
        # 1. Upload para Storage Supabase
        arquivo_url = SupabaseService.upload_pptx(pptx_file, slide_id)
        print(f'   ✅ Storage: {arquivo_url}')

        # 2. Criar/atualizar registro na tabela slides do Supabase
        tamanho_mb = pptx_file.stat().st_size / (1024 * 1024)

        slide_data = {
            'id': slide_id,
            'nome': pptx_file.stem,
            'descricao': f'Gerado automaticamente em {datetime.now().strftime("%d/%m/%Y %H:%M")}',
            'status': 'ativo',
            'arquivo_url': arquivo_url,
            'criado_em': datetime.now().isoformat(),
            'sincronizado': True
        }

        try:
            SupabaseService.create_slide(slide_data)
            print(f'   ✅ BD Supabase: registrado\n')
        except Exception as e:
            # Pode ser que já exista, tenta atualizar
            if 'duplicate' in str(e).lower():
                SupabaseService.update_slide(slide_id, slide_data)
                print(f'   ✅ BD Supabase: atualizado\n')
            else:
                print(f'   ⚠️  BD Supabase: {str(e)}\n')

    except Exception as e:
        print(f'   ❌ Erro: {str(e)}\n')

print('✅ Sincronização completa!')
print('\n💾 Agora, abra o dashboard em http://localhost:8000')
print('📊 Os slides devem aparecer na lista.')
