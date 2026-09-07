#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
ANALISADOR DE AULAS E EMENTAS

Analisa a pasta `sistema/` para verificar:
1. Quais aulas foram geradas em HTML
2. Quais ementas foram geradas em Markdown
3. Atualiza geradoraulas.json com status real
4. Gera relatório detalhado

Uso:
    python analisador.py [--atualizar] [--detalhado]
"""

import json
import argparse
import sys
from pathlib import Path
from datetime import datetime
from collections import defaultdict


class AnalisadorAulas:
    """Analisar estado real de aulas e ementas no diretório sistema/."""

    def __init__(self, pasta_sistema: str = "sistema", arquivo_json: str = "geradoraulas.json"):
        """
        Inicializar analisador.

        Args:
            pasta_sistema: Caminho da pasta com UCs
            arquivo_json: Caminho do arquivo JSON
        """
        self.pasta_sistema = Path(pasta_sistema)
        self.arquivo_json = Path(arquivo_json)
        self.dados_json = {}
        self.analise = {
            'timestamp': datetime.now().isoformat(),
            'cursos': {},
            'total_aulas_encontradas': 0,
            'total_ementas_encontradas': 0,
            'erros': []
        }

    def carregar_json(self) -> bool:
        """
        Carregar dados do JSON.

        Returns:
            True se bem-sucedido
        """
        if not self.arquivo_json.exists():
            print(f"❌ Arquivo não encontrado: {self.arquivo_json}")
            return False

        try:
            with open(self.arquivo_json, 'r', encoding='utf-8') as f:
                self.dados_json = json.load(f)
            print(f"✅ JSON carregado: {len(self.dados_json)} cursos")
            return True
        except Exception as e:
            print(f"❌ Erro ao carregar JSON: {e}")
            return False

    def analisar_pasta_sistema(self) -> bool:
        """
        Analisar a pasta sistema/ para encontrar aulas e ementas.

        Returns:
            True se bem-sucedido
        """
        if not self.pasta_sistema.exists():
            print(f"❌ Pasta não encontrada: {self.pasta_sistema}")
            return False

        print(f"\n🔍 Analisando pasta: {self.pasta_sistema}\n")

        # Procurar por todas as pastas AULAS/
        aulas_encontradas = defaultdict(list)
        ementas_encontradas = defaultdict(list)

        for pasta_aulas in self.pasta_sistema.rglob("AULAS"):
            # Contar arquivos AULA-*.html e AULA-*.md
            htmls = list(pasta_aulas.glob("AULA-*.html"))
            mds = list(pasta_aulas.glob("AULA-*.md"))
            total_aulas = len(htmls) + len(mds)

            if total_aulas > 0:
                uc_path = str(pasta_aulas.parent.relative_to(self.pasta_sistema))
                aulas_encontradas[uc_path] = total_aulas
                self.analise['total_aulas_encontradas'] += total_aulas
                print(f"  📚 {uc_path}")
                if htmls:
                    print(f"     ✅ {len(htmls)} aulas em HTML")
                if mds:
                    print(f"     📝 {len(mds)} aulas em Markdown")

        # Procurar por EMENTA-*.md e EMENTA.md
        for ementa_file in self.pasta_sistema.rglob("EMENTA*.md"):
            uc_path = str(ementa_file.parent.relative_to(self.pasta_sistema))
            ementas_encontradas[uc_path].append(ementa_file.name)
            self.analise['total_ementas_encontradas'] += 1
            print(f"  📖 {uc_path}/{ementa_file.name}")

        # Procurar por EMENTA-PRINCIPAL-*.md
        principais = list(self.pasta_sistema.rglob("EMENTA-PRINCIPAL-*.md"))
        if principais:
            print(f"\n📚 EMENTAS PRINCIPAIS ENCONTRADAS:")
            for ementa_file in principais:
                uc_path = str(ementa_file.relative_to(self.pasta_sistema))
                print(f"  📖 {uc_path}")
                self.analise['total_ementas_encontradas'] += 1

        print(f"\n📊 Resumo:")
        print(f"  🎓 Aulas encontradas: {self.analise['total_aulas_encontradas']}")
        print(f"  📚 Ementas encontradas: {self.analise['total_ementas_encontradas']}")

        return True

    def atualizar_json_com_status_real(self) -> bool:
        """
        Atualizar dados do JSON com status real encontrado.

        Returns:
            True se bem-sucedido
        """
        print(f"\n🔄 Atualizando JSON com status real...\n")

        for curso in self.dados_json:
            nome_curso = curso['nome']
            print(f"  📖 {nome_curso}")

            # Procurar por aulas desta matéria
            aulas_geradas = 0
            ementas_geradas = 0

            for materia in curso.get('materias', []):
                nome_materia = materia['nome']

                # Procurar por AULA-*.html e AULA-*.md
                for pasta_aulas in self.pasta_sistema.rglob("AULAS"):
                    htmls = list(pasta_aulas.glob("AULA-*.html"))
                    mds = list(pasta_aulas.glob("AULA-*.md"))
                    total = len(htmls) + len(mds)
                    if total > 0:
                        aulas_geradas = 1
                        materia['aulasgeradas'] = 1
                        tipo = "HTML" if htmls else "Markdown"
                        print(f"      ✅ {nome_materia}: {total} aulas ({tipo})")

                # Procurar por EMENTA*.md (EMENTA.md ou EMENTA-*.md)
                for ementa_file in self.pasta_sistema.rglob("EMENTA*.md"):
                    if nome_materia.lower() in ementa_file.read_text(encoding='utf-8', errors='ignore').lower():
                        ementas_geradas = 1
                        materia['ementa'] = 1
                        print(f"      ✅ {nome_materia}: ementa encontrada")

            curso['aulasgeradas'] = aulas_geradas
            curso['data_atualizacao'] = datetime.now().strftime('%Y-%m-%d')

        return True

    def salvar_json_atualizado(self) -> bool:
        """
        Salvar JSON com status atualizado.

        Returns:
            True se bem-sucedido
        """
        try:
            with open(self.arquivo_json, 'w', encoding='utf-8') as f:
                json.dump(self.dados_json, f, indent=2, ensure_ascii=False)
            print(f"\n✅ Arquivo {self.arquivo_json} atualizado")
            return True
        except Exception as e:
            print(f"❌ Erro ao salvar JSON: {e}")
            return False

    def verificar_cursos_orfaos(self) -> bool:
        """
        Verificar cursos no JSON que não têm pastas em sistema/.

        Returns:
            True se bem-sucedido
        """
        print(f"\n🔍 Verificando cursos órfãos...\n")

        cursos_orfaos = []

        for curso in self.dados_json:
            nome_curso = curso['nome']

            # Procurar por uma pasta que corresponda ao curso
            encontrado = False

            # Estratégia 1: Procurar por pasta com parte do nome do curso
            for pasta in self.pasta_sistema.iterdir():
                if not pasta.is_dir():
                    continue

                nome_pasta = pasta.name.upper()
                nome_curso_upper = nome_curso.upper()

                # Remover caracteres especiais e comparar
                nome_pasta_norm = nome_pasta.replace('-', '_').replace(' ', '_')
                nome_curso_norm = nome_curso_upper.replace('-', '_').replace(' ', '_')

                # Verificar se há match
                if (nome_pasta in nome_curso_upper or
                    nome_curso_upper in nome_pasta or
                    nome_pasta_norm in nome_curso_norm or
                    nome_curso_norm in nome_pasta_norm):
                    encontrado = True
                    print(f"  ✅ {nome_curso}")
                    print(f"     📁 Encontrado em: {pasta.name}")
                    break

            if not encontrado:
                cursos_orfaos.append(nome_curso)
                print(f"  ❌ {nome_curso}")
                print(f"     ⚠️  Nenhuma pasta encontrada em sistema/")

        if cursos_orfaos:
            print(f"\n🚨 {len(cursos_orfaos)} curso(s) órfão(s) encontrado(s):")
            for curso in cursos_orfaos:
                print(f"   - {curso}")
            return False
        else:
            print(f"\n✅ Todos os cursos têm pastas correspondentes em sistema/")
            return True

    def gerar_relatorio_detalhado(self):
        """Gerar relatório detalhado da análise."""
        print(f"\n{'='*70}")
        print(f"📊 RELATÓRIO DETALHADO DE ANÁLISE")
        print(f"{'='*70}\n")

        total_cursos = len(self.dados_json)
        cursos_com_aulas = sum(1 for c in self.dados_json if c.get('aulasgeradas') == 1)
        cursos_com_ementas = sum(1 for c in self.dados_json if c.get('ementa') == 1)

        print(f"📚 CURSOS")
        print(f"  Total: {total_cursos}")
        print(f"  Com aulas geradas: {cursos_com_aulas}")
        print(f"  Com ementas geradas: {cursos_com_ementas}")

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

        print(f"\n📖 MATÉRIAS")
        print(f"  Total: {total_materias}")
        print(f"  Com aulas geradas: {materias_com_aulas}")
        print(f"  Com ementas geradas: {materias_com_ementas}")

        progresso_aulas = (materias_com_aulas / total_materias * 100) if total_materias > 0 else 0
        progresso_ementas = (materias_com_ementas / total_materias * 100) if total_materias > 0 else 0

        print(f"\n⚡ PROGRESSO")
        print(f"  Aulas: {progresso_aulas:.1f}% ({materias_com_aulas}/{total_materias})")
        print(f"  Ementas: {progresso_ementas:.1f}% ({materias_com_ementas}/{total_materias})")

        print(f"\n📋 CURSOS DETALHADO")
        for curso in self.dados_json:
            aulas_badge = "✅" if curso.get('aulasgeradas') == 1 else "❌"
            ementa_badge = "✅" if curso.get('ementa') == 1 else "❌"
            print(f"\n  {aulas_badge} {ementa_badge} {curso['nome']}")

            for materia in curso.get('materias', []):
                aulas_m = "✅" if materia.get('aulasgeradas') == 1 else "❌"
                ementa_m = "✅" if materia.get('ementa') == 1 else "❌"
                print(f"      {aulas_m} {ementa_m} {materia['nome']}")

        print(f"\n{'='*70}\n")

    def executar(self, atualizar: bool = False, detalhado: bool = False, verificar_orfaos: bool = False):
        """
        Executar análise completa.

        Args:
            atualizar: Atualizar JSON com status real
            detalhado: Gerar relatório detalhado
            verificar_orfaos: Verificar cursos sem pastas em sistema/
        """
        print(f"{'='*70}")
        print(f"🔍 ANALISADOR DE AULAS E EMENTAS")
        print(f"{'='*70}\n")

        # 1. Carregar JSON
        if not self.carregar_json():
            return

        # 2. Analisar pasta sistema
        if not self.analisar_pasta_sistema():
            return

        # 3. Verificar cursos órfãos
        if verificar_orfaos:
            self.verificar_cursos_orfaos()

        # 4. Atualizar JSON se solicitado
        if atualizar:
            if not self.atualizar_json_com_status_real():
                return
            if not self.salvar_json_atualizado():
                return

        # 5. Gerar relatório detalhado
        if detalhado:
            self.gerar_relatorio_detalhado()

        print(f"✅ Análise concluída!\n")


def main():
    """CLI principal."""
    parser = argparse.ArgumentParser(
        description='Analisar aulas e ementas geradas na pasta sistema/',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Exemplos:
  python analisador.py
  python analisador.py --atualizar
  python analisador.py --detalhado
  python analisador.py --atualizar --detalhado
        '''
    )

    parser.add_argument(
        '--atualizar',
        action='store_true',
        help='Atualizar geradoraulas.json com status real encontrado'
    )

    parser.add_argument(
        '--detalhado',
        action='store_true',
        help='Gerar relatório detalhado da análise'
    )

    parser.add_argument(
        '--verificar-orfaos',
        action='store_true',
        help='Verificar cursos no JSON que não têm pastas em sistema/'
    )

    args = parser.parse_args()

    analisador = AnalisadorAulas()
    analisador.executar(
        atualizar=args.atualizar,
        detalhado=args.detalhado,
        verificar_orfaos=args.verificar_orfaos
    )


if __name__ == '__main__':
    main()
