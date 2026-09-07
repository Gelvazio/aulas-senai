#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
ANALISADOR DE AULAS E EMENTAS - v2

Varre a pasta sistema/ e reflete EXATAMENTE o que tem nela no geradoraulas.json

Uso:
    python analisador.py
"""

import json
import sys
from pathlib import Path
from datetime import datetime
from collections import defaultdict


class AnalisadorAulas:
    """Analisar estado REAL de aulas e ementas descobrindo na pasta sistema/."""

    def __init__(self, pasta_sistema: str = "sistema", arquivo_json: str = "geradoraulas.json"):
        """
        Inicializar analisador.

        Args:
            pasta_sistema: Caminho da pasta com UCs
            arquivo_json: Caminho do arquivo JSON
        """
        self.pasta_sistema = Path(pasta_sistema)
        self.arquivo_json = Path(arquivo_json)
        self.dados_json = []
        self.analise = {
            'timestamp': datetime.now().isoformat(),
            'total_pastas_encontradas': 0,
            'total_aulas_encontradas': 0,
            'total_ementas_encontradas': 0,
        }

    def descobrir_estrutura_real(self) -> bool:
        """
        Descobrir toda a estrutura REAL de aulas e ementas em sistema/.

        Returns:
            True se bem-sucedido
        """
        if not self.pasta_sistema.exists():
            print(f"❌ Pasta não encontrada: {self.pasta_sistema}")
            return False

        print(f"🔍 Varrendo pasta sistema/ para descobrir estrutura real...\n")

        # Dicionário para armazenar estrutura descoberta
        cursos_dict = defaultdict(lambda: {'materias': defaultdict(lambda: {'aulas': 0, 'ementa': 0})})

        # Procurar por pastas AULAS recursivamente
        for pasta_aulas in self.pasta_sistema.rglob("AULAS"):
            # Pegar o caminho relativo
            caminho_rel = pasta_aulas.parent.relative_to(self.pasta_sistema)

            # Determinar se é curso ou matéria baseado na estrutura
            partes = list(caminho_rel.parts)

            if len(partes) == 1:
                # É uma pasta de curso direto
                curso_nome = partes[0]
                materia_nome = "Aulas gerais"
            elif len(partes) >= 2:
                # É uma subpasta de curso
                curso_nome = partes[0]
                materia_nome = partes[-2]  # Pasta pai de AULAS
            else:
                continue

            # Contar aulas
            aulas_html = list(pasta_aulas.glob("AULA-*.html"))
            aulas_md = list(pasta_aulas.glob("AULA-*.md"))
            total_aulas = len(aulas_html) + len(aulas_md)

            if total_aulas > 0:
                cursos_dict[curso_nome]['materias'][materia_nome]['aulas'] = total_aulas
                self.analise['total_aulas_encontradas'] += total_aulas
                print(f"  📚 {curso_nome}/{materia_nome}")
                print(f"     ✅ {total_aulas} aulas encontradas")

        # Procurar por EMENTA*.md recursivamente
        for ementa_file in self.pasta_sistema.rglob("EMENTA*.md"):
            caminho_rel = ementa_file.parent.relative_to(self.pasta_sistema)
            partes = list(caminho_rel.parts)

            if len(partes) >= 1:
                curso_nome = partes[0]
                if len(partes) >= 2:
                    materia_nome = partes[-1]
                else:
                    materia_nome = "Geral"

                cursos_dict[curso_nome]['materias'][materia_nome]['ementa'] = 1
                self.analise['total_ementas_encontradas'] += 1
                print(f"  📖 {curso_nome}/{materia_nome}")
                print(f"     ✅ Ementa encontrada: {ementa_file.name}")

        # Construir estrutura de JSON
        self.dados_json = []
        for curso_nome in sorted(cursos_dict.keys()):
            curso_data = {
                'nome': curso_nome,
                'ementa': 0,
                'aulasgeradas': 0,
                'data_atualizacao': datetime.now().strftime('%Y-%m-%d'),
                'materias': []
            }

            for materia_nome in sorted(cursos_dict[curso_nome]['materias'].keys()):
                mat_data = cursos_dict[curso_nome]['materias'][materia_nome]
                curso_data['materias'].append({
                    'nome': materia_nome,
                    'ementa': mat_data['ementa'],
                    'aulasgeradas': 1 if mat_data['aulas'] > 0 else 0,
                    'aulas': mat_data['aulas'],
                    'tempo_leitura': 0
                })

                # Atualizar status do curso
                if mat_data['aulas'] > 0:
                    curso_data['aulasgeradas'] = 1
                if mat_data['ementa'] > 0:
                    curso_data['ementa'] = 1

            self.dados_json.append(curso_data)
            self.analise['total_pastas_encontradas'] += 1

        print(f"\n📊 Resumo:")
        print(f"  📚 {len(self.dados_json)} curso(s) descoberto(s)")
        print(f"  🎓 {self.analise['total_aulas_encontradas']} aulas encontradas")
        print(f"  📖 {self.analise['total_ementas_encontradas']} ementas encontradas")

        return True

    def salvar_json_atualizado(self) -> bool:
        """
        Salvar JSON com estrutura descoberta.

        Returns:
            True se bem-sucedido
        """
        try:
            with open(self.arquivo_json, 'w', encoding='utf-8') as f:
                json.dump(self.dados_json, f, indent=2, ensure_ascii=False)
            print(f"\n✅ Arquivo {self.arquivo_json} atualizado com estrutura REAL\n")
            return True
        except Exception as e:
            print(f"❌ Erro ao salvar JSON: {e}")
            return False

    def gerar_relatorio_detalhado(self):
        """Gerar relatório detalhado da análise."""
        print(f"\n{'='*70}")
        print(f"📊 RELATÓRIO DETALHADO")
        print(f"{'='*70}\n")

        total_materias = sum(len(c.get('materias', [])) for c in self.dados_json)
        materias_com_aulas = sum(
            1 for c in self.dados_json
            for m in c.get('materias', [])
            if m.get('aulasgeradas') == 1
        )
        materias_com_ementas = sum(
            1 for c in self.dados_json
            for m in c.get('materias', [])
            if m.get('ementa') == 1
        )

        print(f"📚 ESTRUTURA DESCOBERTA")
        print(f"  Cursos: {len(self.dados_json)}")
        print(f"  Matérias: {total_materias}")
        print(f"  Matérias com aulas: {materias_com_aulas}")
        print(f"  Matérias com ementas: {materias_com_ementas}")

        progresso_aulas = (materias_com_aulas / total_materias * 100) if total_materias > 0 else 0
        progresso_ementas = (materias_com_ementas / total_materias * 100) if total_materias > 0 else 0

        print(f"\n⚡ PROGRESSO")
        print(f"  Aulas: {progresso_aulas:.1f}% ({materias_com_aulas}/{total_materias})")
        print(f"  Ementas: {progresso_ementas:.1f}% ({materias_com_ementas}/{total_materias})")

        print(f"\n📋 ESTRUTURA COMPLETA")
        for curso in self.dados_json:
            aulas_badge = "✅" if curso.get('aulasgeradas') == 1 else "❌"
            ementa_badge = "✅" if curso.get('ementa') == 1 else "❌"
            print(f"\n  {aulas_badge} {ementa_badge} {curso['nome']}")

            for materia in curso.get('materias', []):
                aulas_m = "✅" if materia.get('aulasgeradas') == 1 else "❌"
                ementa_m = "✅" if materia.get('ementa') == 1 else "❌"
                aulas_count = f"({materia.get('aulas', 0)} aulas)" if materia.get('aulas', 0) > 0 else ""
                print(f"      {aulas_m} {ementa_m} {materia['nome']} {aulas_count}")

        print(f"\n{'='*70}\n")

    def executar(self, detalhado: bool = False):
        """
        Executar análise completa.

        Args:
            detalhado: Gerar relatório detalhado
        """
        print(f"{'='*70}")
        print(f"🔍 ANALISADOR DE AULAS E EMENTAS v2")
        print(f"{'='*70}\n")

        # 1. Descobrir estrutura real
        if not self.descobrir_estrutura_real():
            return

        # 2. Salvar JSON
        if not self.salvar_json_atualizado():
            return

        # 3. Gerar relatório detalhado
        if detalhado:
            self.gerar_relatorio_detalhado()

        print(f"✅ Análise concluída!\n")


def main():
    """CLI principal."""
    import argparse

    parser = argparse.ArgumentParser(
        description='Descobrir estrutura REAL em sistema/ e atualizar geradoraulas.json',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Exemplos:
  python analisador.py
  python analisador.py --detalhado
        '''
    )

    parser.add_argument(
        '--detalhado',
        action='store_true',
        help='Gerar relatório detalhado da análise'
    )

    args = parser.parse_args()

    analisador = AnalisadorAulas()
    analisador.executar(detalhado=args.detalhado)


if __name__ == '__main__':
    main()
