"""
Inspetor de Tabelas Supabase
Mostra a estrutura real das tabelas
"""

import os
from supabase import create_client

def inspecionar_tabelas():
    """Inspeciona estrutura das tabelas no Supabase"""

    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')

    if not supabase_url or not supabase_key:
        print("❌ Credenciais não configuradas")
        return

    supabase = create_client(supabase_url, supabase_key)

    # Tabelas principais
    tabelas = ['unidade', 'curso', 'materia', 'cursomateria', 'aulas', 'avaliacao', 'ementas', 'material', 'tipo_material']

    for tabela in tabelas:
        print(f"\n{'='*70}")
        print(f"TABELA: {tabela}")
        print(f"{'='*70}")

        try:
            # Tentar buscar um registro para ver a estrutura
            resultado = supabase.table(tabela).select('*').limit(1).execute()

            if resultado.data:
                # Se tem dados, mostrar as chaves
                registro = resultado.data[0]
                print(f"Colunas encontradas: {len(registro)}")
                for coluna, valor in registro.items():
                    tipo = type(valor).__name__
                    print(f"  - {coluna}: {tipo} = {repr(valor)[:50]}")
            else:
                print("Tabela vazia (sem registros para inspecionar)")
                # Tentar inserir um registro fictício para ver a estrutura
                print("⚠️ Tabela não tem dados, estrutura pode estar incompleta")

        except Exception as e:
            print(f"❌ Erro ao inspecionar: {str(e)}")

if __name__ == '__main__':
    import django
    import sys

    sys.path.insert(0, str(os.path.dirname(__file__)))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gerador_config.settings')
    django.setup()

    inspecionar_tabelas()
