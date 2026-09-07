#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
LISTADOR DE CURSOS — Sincronizar status de aulas e ementas no Supabase

Lê o arquivo geradoraulas.json e atualiza as colunas:
- curso.ementa (0/1)
- materia.aulasgeradas (0/1)

Uso:
    python listadorcurso.py --arquivo geradoraulas.json
"""

import json
import argparse
import sys
from pathlib import Path
from datetime import datetime

try:
    from api.supabase_config import SupabaseConfig
except ImportError:
    print("❌ Erro: Módulo 'api' não encontrado. Execute de dentro da pasta 'scripts/'")
    sys.exit(1)


class ListadorCurso:
    """Sincronizar status de aulas e ementas no Supabase."""

    def __init__(self, arquivo_json: str):
        """
        Inicializar.

        Args:
            arquivo_json: Caminho do arquivo geradoraulas.json
        """
        self.arquivo_json = Path(arquivo_json)
        self.dados = {}
        self.relatorio = {
            'timestamp': datetime.now().isoformat(),
            'arquivo': str(self.arquivo_json),
            'cursos_processados': 0,
            'materias_atualizadas': 0,
            'erros': []
        }

    def carregar_json(self) -> bool:
        """
        Carregar dados do arquivo JSON.

        Returns:
            True se bem-sucedido
        """
        if not self.arquivo_json.exists():
            print(f"❌ Arquivo não encontrado: {self.arquivo_json}")
            self.relatorio['erros'].append(f"Arquivo não encontrado: {self.arquivo_json}")
            return False

        try:
            with open(self.arquivo_json, 'r', encoding='utf-8') as f:
                self.dados = json.load(f)

            print(f"✅ Arquivo carregado: {len(self.dados)} cursos")
            return True

        except json.JSONDecodeError as e:
            print(f"❌ Erro ao decodificar JSON: {e}")
            self.relatorio['erros'].append(f"JSON inválido: {e}")
            return False

    def sincronizar(self) -> bool:
        """
        Sincronizar status no Supabase.

        Returns:
            True se bem-sucedido
        """
        try:
            client = SupabaseConfig.get_client()

            for curso_data in self.dados:
                nome_curso = curso_data.get('nome')
                ementa_status = curso_data.get('ementa', 0)

                print(f"\n📚 Processando: {nome_curso}")

                # Buscar curso no Supabase
                response = client.table('curso').select('id').ilike(
                    'nome', f'%{nome_curso}%'
                ).execute()

                if not response.data:
                    print(f"   ⚠️  Curso não encontrado no Supabase")
                    continue

                curso_id = response.data[0]['id']

                # Atualizar status de ementa no curso
                try:
                    client.table('curso').update({
                        'ementa': ementa_status
                    }).eq('id', curso_id).execute()
                    print(f"   ✅ Ementa atualizada: {ementa_status}")
                except Exception as e:
                    print(f"   ❌ Erro ao atualizar ementa: {e}")
                    self.relatorio['erros'].append(f"Erro ao atualizar {nome_curso}: {e}")

                self.relatorio['cursos_processados'] += 1

                # Atualizar matérias
                for materia_data in curso_data.get('materias', []):
                    nome_materia = materia_data.get('nome')
                    aulas_geradas = materia_data.get('aulasgeradas', 0)

                    # Buscar matéria no Supabase
                    response_materia = client.table('materia').select('id').ilike(
                        'nome', f'%{nome_materia}%'
                    ).execute()

                    if not response_materia.data:
                        print(f"      ⚠️  Matéria não encontrada: {nome_materia}")
                        continue

                    materia_id = response_materia.data[0]['id']

                    # Atualizar status de aulas geradas
                    try:
                        client.table('materia').update({
                            'aulasgeradas': aulas_geradas
                        }).eq('id', materia_id).execute()
                        print(f"      ✅ {nome_materia}: aulas_geradas={aulas_geradas}")
                        self.relatorio['materias_atualizadas'] += 1
                    except Exception as e:
                        print(f"      ❌ Erro: {e}")
                        self.relatorio['erros'].append(f"Erro ao atualizar {nome_materia}: {e}")

            return True

        except Exception as e:
            print(f"\n❌ Erro na sincronização: {e}")
            self.relatorio['erros'].append(str(e))
            return False

    def gerar_relatorio(self) -> dict:
        """
        Gerar relatório de sincronização.

        Returns:
            Dicionário com relatório
        """
        return self.relatorio

    def listar_cursos(self) -> bool:
        """
        Listar todos os cursos do Supabase com status.

        Returns:
            True se bem-sucedido
        """
        try:
            client = SupabaseConfig.get_client()

            print("\n📚 CURSOS NO SUPABASE")
            print("=" * 70)

            # Buscar todos os cursos
            response = client.table('curso').select('id, nome, ementa').execute()

            if not response.data:
                print("Nenhum curso encontrado")
                return True

            for curso in response.data:
                cursor_id = curso['id']
                nome = curso['nome']
                ementa_status = curso.get('ementa', 0)

                ementa_badge = '✅ Gerada' if ementa_status == 1 else '❌ Não gerada'

                print(f"\n📖 {nome}")
                print(f"   ID: {cursor_id}")
                print(f"   Ementa: {ementa_badge}")

                # Buscar matérias do curso
                response_mat = client.table('materia').select(
                    'id, nome, aulasgeradas'
                ).eq('curso_id', cursor_id).execute()

                if response_mat.data:
                    print(f"   Matérias: {len(response_mat.data)}")
                    for materia in response_mat.data:
                        aulas_badge = '✅' if materia.get('aulasgeradas', 0) == 1 else '❌'
                        print(f"      {aulas_badge} {materia['nome']}")

            print("\n" + "=" * 70)
            return True

        except Exception as e:
            print(f"❌ Erro ao listar cursos: {e}")
            return False


def main():
    """CLI principal."""
    parser = argparse.ArgumentParser(
        description='Sincronizar status de aulas e ementas no Supabase',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Exemplos:
  python listadorcurso.py --arquivo geradoraulas.json --sync
  python listadorcurso.py --listar
  python listadorcurso.py --arquivo geradoraulas.json --sync --listar
        '''
    )

    parser.add_argument(
        '--arquivo',
        default='geradoraulas.json',
        help='Arquivo JSON com status (padrão: geradoraulas.json)'
    )

    parser.add_argument(
        '--sync',
        action='store_true',
        help='Sincronizar status no Supabase'
    )

    parser.add_argument(
        '--listar',
        action='store_true',
        help='Listar cursos com status'
    )

    args = parser.parse_args()

    # Se nenhuma ação foi especificada, mostrar ajuda
    if not args.sync and not args.listar:
        parser.print_help()
        return

    print(f"{'='*70}")
    print(f"🚀 LISTADOR DE CURSOS")
    print(f"{'='*70}\n")

    listador = ListadorCurso(args.arquivo)

    # Sincronizar
    if args.sync:
        print("📖 Sincronizando status do arquivo JSON...\n")

        if not listador.carregar_json():
            return

        if not listador.sincronizar():
            print("\n⚠️  Sincronização concluída com erros")
        else:
            print("\n✅ Sincronização concluída com sucesso!")

        # Exibir relatório
        relatorio = listador.gerar_relatorio()
        print(f"\n📊 RELATÓRIO:")
        print(f"   Cursos processados: {relatorio['cursos_processados']}")
        print(f"   Matérias atualizadas: {relatorio['materias_atualizadas']}")
        if relatorio['erros']:
            print(f"   Erros: {len(relatorio['erros'])}")
            for erro in relatorio['erros']:
                print(f"      - {erro}")

    # Listar
    if args.listar:
        print("📋 Listando cursos e status...\n")
        listador.listar_cursos()

    print(f"\n{'='*70}\n")


if __name__ == '__main__':
    main()
