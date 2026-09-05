#!/usr/bin/env python
"""Script de teste para verificar se cursos estão sendo buscados do Supabase"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gerador_config.settings')
django.setup()

from dashboard.services import SupabaseService

print("=" * 60)
print("TESTE DE BUSCA DE CURSOS DO SUPABASE")
print("=" * 60)

try:
    # Teste 1: Conectar ao Supabase
    print("\n✓ Conectando ao Supabase...")
    client = SupabaseService.get_client()
    print("✓ Conexão estabelecida!")

    # Teste 2: Buscar cursos
    print("\n✓ Buscando cursos da tabela 'curso'...")
    cursos = SupabaseService.list_cursos()

    print(f"\n📊 Total de cursos encontrados: {len(cursos)}")

    if cursos:
        print("\n📋 Primeiros 3 cursos:")
        for i, curso in enumerate(cursos[:3], 1):
            print(f"\n  {i}. {curso.get('nome_completo', 'SEM NOME')}")
            print(f"     - ID: {curso.get('id')}")
            print(f"     - Código: {curso.get('codigo')}")
            print(f"     - Tipo: {curso.get('tipo_curso')}")
            print(f"     - Campos: {list(curso.keys())}")
    else:
        print("\n⚠️  Nenhum curso encontrado!")
        print("\n💡 Possíveis causas:")
        print("   1. Tabela 'curso' está vazia")
        print("   2. Não há permissão para ler a tabela")
        print("   3. O nome da tabela está incorreto")

        # Teste 3: Tentar listar todas as tabelas
        print("\n✓ Testando acesso à tabela 'slides' (para verificar conexão)...")
        try:
            slides_response = client.table('slides').select('*').limit(1).execute()
            print(f"✓ Tabela 'slides' acessível ({len(slides_response.data)} registros)")
        except Exception as e:
            print(f"❌ Erro ao acessar 'slides': {str(e)}")

except Exception as e:
    print(f"\n❌ ERRO: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
