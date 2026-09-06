"""
Executor de Scripts SQL no Supabase
Lê o arquivo INSERTS-DADOS-SISTEMA-SENAI.sql e executa no banco de dados
"""

import os
from pathlib import Path
from supabase import create_client, Client

def executar_inserts_supabase():
    """Executa o script de inserts no Supabase, statement por statement"""

    # Obter credenciais do .env
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')

    if not supabase_url or not supabase_key:
        return {
            'sucesso': False,
            'mensagem': 'Credenciais Supabase não configuradas',
            'detalhes': f'SUPABASE_URL configurado: {bool(supabase_url)}\nSUPABASE_KEY configurado: {bool(supabase_key)}',
            'tipo_erro': 'CONFIGURACAO'
        }

    # Localizar arquivo SQL
    script_path = Path(__file__).parent.parent / 'database' / 'INSERTS-DADOS-SISTEMA-SENAI.sql'

    if not script_path.exists():
        return {
            'sucesso': False,
            'mensagem': 'Arquivo SQL não encontrado',
            'detalhes': f'Caminho esperado:\n{script_path}',
            'tipo_erro': 'ARQUIVO'
        }

    # Ler arquivo SQL
    try:
        with open(script_path, 'r', encoding='utf-8') as f:
            sql_content = f.read()
    except Exception as e:
        return {
            'sucesso': False,
            'mensagem': 'Erro ao ler arquivo SQL',
            'detalhes': str(e),
            'tipo_erro': 'LEITURA'
        }

    # Remover comentários e linhas vazias
    linhas = []
    for linha in sql_content.split('\n'):
        linha = linha.strip()
        if not linha or linha.startswith('--') or linha.startswith('/*'):
            continue
        linhas.append(linha)

    # Dividir em statements individuais (por ;)
    statements = []
    current = ''
    for linha in linhas:
        current += ' ' + linha
        if ';' in linha:
            stmt = current.replace(';', '').strip()
            if stmt:
                statements.append(stmt)
            current = ''

    # Executar cada statement individualmente
    resultados = []
    erros = []

    for i, statement in enumerate(statements, 1):
        if not statement:
            continue

        try:
            # Usar a biblioteca supabase para executar queries
            from supabase import create_client
            supabase: Client = create_client(supabase_url, supabase_key)

            # Tentar executar a query diretamente
            resultado = supabase.postgrest.rpc('exec_sql', {'query': statement}).execute()

            resultados.append({
                'numero': i,
                'status': 'sucesso',
                'preview': statement[:80] + '...' if len(statement) > 80 else statement
            })

        except Exception as e:
            # Capturar erro detalhado
            erro_str = str(e)

            erros.append({
                'numero': i,
                'status': 'erro',
                'statement': statement[:200] + '...' if len(statement) > 200 else statement,
                'erro': erro_str,
                'tipo': type(e).__name__
            })

    # Retornar resultado
    return {
        'sucesso': len(erros) == 0,
        'total_statements': len(resultados) + len(erros),
        'sucesso_count': len(resultados),
        'erro_count': len(erros),
        'resultados': resultados,
        'erros': erros,
        'mensagem': f'✅ Executados {len(resultados)} statements' +
                   (f' com {len(erros)} erro(s)' if erros else ' com sucesso!'),
        'tipo_erro': 'EXECUCAO' if erros else None
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
