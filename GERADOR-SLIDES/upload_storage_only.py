#!/usr/bin/env python3
import os
import sys
from pathlib import Path
from supabase import create_client

# Carregar variáveis de ambiente
from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
SAIDA_DIR = Path('SAIDA')

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    print('❌ Erro: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados')
    sys.exit(1)

# Usar service role key (tem permissão para fazer upload)
client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

print('🚀 Fazendo upload de PPTX para Supabase Storage (slides)...\n')

for pptx_file in sorted(SAIDA_DIR.glob('*.pptx')):
    slide_id = pptx_file.stem.replace('-', '_').lower()
    file_name = f"{slide_id}.pptx"

    print(f'📤 Upload: {pptx_file.name}')
    print(f'   ID: {slide_id}')
    print(f'   Tamanho: {pptx_file.stat().st_size / (1024*1024):.2f} MB')

    try:
        # Upload para Storage
        with open(pptx_file, 'rb') as f:
            response = client.storage.from_('slides').upload(
                path=file_name,
                file=f,
                file_options={
                    'content-type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                }
            )

        # Obter URL pública
        public_url_response = client.storage.from_('slides').get_public_url(file_name)
        if isinstance(public_url_response, dict):
            url = public_url_response.get('publicUrl', str(public_url_response))
        else:
            url = str(public_url_response)

        print(f'   ✅ URL: {url}\n')

    except Exception as e:
        print(f'   ❌ Erro: {str(e)}\n')

print('✅ Upload concluído!')
print('\n📋 Próximo passo: Registre o link na tabela slides do Supabase')
print('   - Coluna: arquivo_url = <URL acima>')
