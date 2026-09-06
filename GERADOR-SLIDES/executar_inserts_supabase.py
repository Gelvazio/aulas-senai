"""
Executor de Scripts SQL no Supabase
Lê o arquivo INSERTS-DADOS-SISTEMA-SENAI.sql e executa no banco de dados
"""

import os
from pathlib import Path
from supabase import create_client, Client

def executar_inserts_supabase():
    """Executa o script de inserts no Supabase"""

    # Obter credenciais do .env
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')

    if not supabase_url or not supabase_key:
        return {
            'sucesso': False,
            'mensagem': 'Credenciais Supabase não configuradas no .env',
            'detalhes': f'SUPABASE_URL: {bool(supabase_url)}, SUPABASE_KEY: {bool(supabase_key)}'
        }

    # Inicializar cliente Supabase
    try:
        supabase: Client = create_client(supabase_url, supabase_key)
    except Exception as e:
        return {
            'sucesso': False,
            'mensagem': 'Erro ao conectar com Supabase',
            'detalhes': str(e)
        }

    # Localizar arquivo SQL
    script_path = Path(__file__).parent.parent / 'database' / 'INSERTS-DADOS-SISTEMA-SENAI.sql'

    if not script_path.exists():
        return {
            'sucesso': False,
            'mensagem': f'Arquivo SQL não encontrado',
            'detalhes': f'Caminho esperado: {script_path}'
        }

    # Ler arquivo SQL
    try:
        with open(script_path, 'r', encoding='utf-8') as f:
            sql_content = f.read()
    except Exception as e:
        return {
            'sucesso': False,
            'mensagem': 'Erro ao ler arquivo SQL',
            'detalhes': str(e)
        }

    # Dividir em statements individuais (por GO ou ;)
    # Remove comentários
    linhas = []
    for linha in sql_content.split('\n'):
        linha = linha.strip()
        # Pular linhas vazias e comentários
        if not linha or linha.startswith('--') or linha.startswith('/*'):
            continue
        linhas.append(linha)

    sql_content = '\n'.join(linhas)

    # Executar query usando RPC ou SQL direto
    resultados = []
    erros = []

    try:
        # Tentar executar como um único bloco
        resultado = supabase.postgrest.rpc('exec_sql', {'query': sql_content}).execute()
        resultados.append({
            'status': 'sucesso',
            'resultado': str(resultado)
        })
    except Exception as e_rpc:
        # Se falhar, tentar dividir em statements
        try:
            # Split por GO ou ;
            statements = [s.strip() for s in sql_content.split(';') if s.strip()]

            for i, statement in enumerate(statements, 1):
                if not statement or statement.startswith('--') or statement.startswith('/*'):
                    continue

                try:
                    # Executar cada statement
                    resultado = supabase.postgrest.rpc('exec_sql', {'query': statement}).execute()
                    resultados.append({
                        'numero': i,
                        'status': 'sucesso',
                        'preview': statement[:100] + '...' if len(statement) > 100 else statement
                    })
                except Exception as e_stmt:
                    erros.append({
                        'numero': i,
                        'status': 'erro',
                        'preview': statement[:100] + '...' if len(statement) > 100 else statement,
                        'erro': str(e_stmt)
                    })
        except Exception as e_split:
            erros.append({
                'status': 'erro',
                'mensagem': 'Erro ao processar statements',
                'detalhes': str(e_split)
            })

    # Retornar resultado
    return {
        'sucesso': len(erros) == 0,
        'total_statements': len(resultados) + len(erros),
        'sucesso_count': len(resultados),
        'erro_count': len(erros),
        'resultados': resultados,
        'erros': erros,
        'mensagem': f'Executados {len(resultados)} statements com sucesso' +
                   (f' e {len(erros)} erros' if erros else '')
    }


if __name__ == '__main__':
    # Para testar diretamente
    import json
    import django
    import sys

    # Setup Django
    sys.path.insert(0, str(Path(__file__).parent))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gerador_config.settings')
    django.setup()

    # Executar
    resultado = executar_inserts_supabase()
    print(json.dumps(resultado, indent=2, ensure_ascii=False))
