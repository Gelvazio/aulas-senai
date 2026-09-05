#!/usr/bin/env python3
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gerador_config.settings')
django.setup()

from dashboard.services import SupabaseService

print("🔍 Testando conexão com Supabase...\n")

try:
    client = SupabaseService.get_client()
    print("✅ Cliente Supabase conectado\n")

    # Tentar listar cursos - testar ambos os nomes
    table_name = None
    response = None

    for name in ['cursos', 'curso']:
        print(f"📚 Tentando tabela '{name}'...")
        try:
            response = client.table(name).select('*').execute()
            table_name = name
            print(f"   ✅ Sucesso!\n")
            break
        except Exception as e:
            print(f"   ❌ Erro: {str(e)}\n")

    if response is None:
        print("❌ Nenhuma tabela de cursos encontrada (nem 'cursos' nem 'curso')\n")
    else:
        print(f"Status: {response.status_code if hasattr(response, 'status_code') else 'N/A'}")
        print(f"Data: {response.data}")
        print(f"Tipo: {type(response.data)}")
        print(f"Quantidade: {len(response.data) if response.data else 0}\n")

    if response.data:
        print("📋 Cursos encontrados:")
        for curso in response.data:
            print(f"  - {curso}")
    else:
        print("⚠️ Nenhum curso encontrado!")
        print("\n💡 Possíveis razões:")
        print("  1. Tabela 'cursos' vazia")
        print("  2. RLS bloqueando a leitura")
        print("  3. Nome da tabela diferente")

    # Tentar listar tabelas disponíveis
    print("\n🔍 Tentando listar todas as tabelas...")
    try:
        # Supabase não tem uma API direta para listar tabelas
        # Vamos tentar acessar uma tabela conhecida como teste
        test_response = client.table('slides').select('*').limit(1).execute()
        print(f"✅ Tabela 'slides' está acessível ({len(test_response.data or [])} registros)")
    except Exception as e:
        print(f"❌ Erro ao acessar 'slides': {str(e)}")

except Exception as e:
    print(f"❌ Erro: {str(e)}")
    import traceback
    traceback.print_exc()
