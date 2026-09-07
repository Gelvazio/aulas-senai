#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
ORQUESTRADOR — Gerenciar geração de aulas e ementas

Detecta estrutura de curso e orquestra:
1. gerador-aulas.py (gerar HTMLs)
2. gerador-ementa.py (gerar ementas)
3. Validação final

Uso:
    python geradorementas-aulas.py \\
      --caminho-curso sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO \\
      --modo completo
"""

import os
import sys
import json
import subprocess
import argparse
from pathlib import Path
from datetime import datetime


class OrquestradorAulas:
    """Orquestrar geração completa de aulas e ementas."""

    def __init__(self, caminho_curso: str):
        """
        Inicializar.

        Args:
            caminho_curso: Caminho da pasta do curso
        """
        self.caminho_curso = Path(caminho_curso)
        self.pasta_aulas = self.caminho_curso / 'AULAS'
        self.pasta_materiais = self.caminho_curso / 'MATERIAIS'
        self.arquivo_plano = None
        self.relatorio = {
            'inicio': datetime.now().isoformat(),
            'curso': str(self.caminho_curso),
            'etapas': [],
            'erros': [],
            'avisos': []
        }

    def validar_estrutura(self) -> bool:
        """
        Validar estrutura básica do curso.

        Returns:
            True se válido, False caso contrário
        """
        print("🔍 Validando estrutura do curso...\n")

        # Verificar pasta AULAS/
        if not self.pasta_aulas.is_dir():
            print(f"❌ Pasta AULAS/ não encontrada: {self.pasta_aulas}")
            self.relatorio['erros'].append(f"Pasta AULAS/ não encontrada")
            return False

        # Verificar arquivos AULA-*.md
        aulas = list(self.pasta_aulas.glob('AULA-*.md'))
        if not aulas:
            print(f"⚠️  Nenhuma aula AULA-*.md encontrada em {self.pasta_aulas}")
            self.relatorio['avisos'].append("Nenhuma aula encontrada")
            return False

        print(f"✅ Pasta AULAS/ encontrada ({len(aulas)} aulas)")

        # Verificar arquivo de plano
        planos = list(self.caminho_curso.glob('PLANO*.md'))
        if planos:
            self.arquivo_plano = planos[0]
            print(f"✅ Arquivo de plano encontrado: {self.arquivo_plano.name}")
        else:
            print(f"⚠️  Nenhum arquivo PLANO*.md encontrado")
            self.relatorio['avisos'].append("Arquivo de plano não encontrado")

        # Verificar MATERIAIS/
        if not self.pasta_materiais.is_dir():
            print(f"⚠️  Pasta MATERIAIS/ não encontrada (criando...)")
            self.pasta_materiais.mkdir(exist_ok=True)
            self.relatorio['avisos'].append("Pasta MATERIAIS/ criada")
        else:
            materiais = list(self.pasta_materiais.glob('*'))
            print(f"✅ Pasta MATERIAIS/ encontrada ({len(materiais)} arquivos)")

        print()
        return True

    def executar_gerador_aulas(self) -> bool:
        """
        Executar gerador-aulas.py.

        Returns:
            True se bem-sucedido
        """
        print("📚 Gerando aulas em HTML...\n")

        try:
            # Caminho do script
            script = Path(__file__).parent / 'gerador-aulas.py'

            if not script.exists():
                print(f"❌ Script não encontrado: {script}")
                self.relatorio['erros'].append(f"gerador-aulas.py não encontrado")
                return False

            # Executar
            resultado = subprocess.run(
                [sys.executable, str(script), '--pasta-aulas', str(self.pasta_aulas)],
                capture_output=True,
                text=True,
                timeout=300
            )

            if resultado.returncode == 0:
                print(resultado.stdout)
                self.relatorio['etapas'].append({
                    'nome': 'Gerar Aulas (HTML)',
                    'status': 'sucesso',
                    'timestamp': datetime.now().isoformat()
                })
                return True
            else:
                print(f"❌ Erro ao executar gerador-aulas.py:")
                print(resultado.stderr)
                self.relatorio['etapas'].append({
                    'nome': 'Gerar Aulas (HTML)',
                    'status': 'erro',
                    'erro': resultado.stderr,
                    'timestamp': datetime.now().isoformat()
                })
                self.relatorio['erros'].append("Falha ao gerar aulas HTML")
                return False

        except Exception as e:
            print(f"❌ Erro: {e}")
            self.relatorio['etapas'].append({
                'nome': 'Gerar Aulas (HTML)',
                'status': 'erro',
                'erro': str(e),
                'timestamp': datetime.now().isoformat()
            })
            self.relatorio['erros'].append(str(e))
            return False

    def executar_gerador_ementa(self) -> bool:
        """
        Executar gerador-ementa.py.

        Returns:
            True se bem-sucedido
        """
        if not self.arquivo_plano:
            print("⏭️  Pulando gerador de ementas (arquivo de plano não encontrado)\n")
            return True

        print("📖 Gerando ementas consolidadas...\n")

        try:
            # Caminho do script
            script = Path(__file__).parent / 'gerador-ementa.py'

            if not script.exists():
                print(f"❌ Script não encontrado: {script}")
                return False

            # Executar
            resultado = subprocess.run(
                [
                    sys.executable,
                    str(script),
                    '--arquivo-principal', str(self.arquivo_plano),
                    '--pasta-base', str(self.caminho_curso)
                ],
                capture_output=True,
                text=True,
                timeout=300
            )

            if resultado.returncode == 0:
                print(resultado.stdout)
                self.relatorio['etapas'].append({
                    'nome': 'Gerar Ementas',
                    'status': 'sucesso',
                    'timestamp': datetime.now().isoformat()
                })
                return True
            else:
                print(f"❌ Erro ao executar gerador-ementa.py:")
                print(resultado.stderr)
                self.relatorio['etapas'].append({
                    'nome': 'Gerar Ementas',
                    'status': 'erro',
                    'erro': resultado.stderr,
                    'timestamp': datetime.now().isoformat()
                })
                self.relatorio['avisos'].append("Falha ao gerar ementas")
                return True  # Não é bloqueante

        except Exception as e:
            print(f"❌ Erro: {e}")
            self.relatorio['avisos'].append(f"Erro ao gerar ementas: {e}")
            return True

    def validar_resultado(self) -> bool:
        """
        Validar resultado final.

        Returns:
            True se válido
        """
        print("✅ Validando resultado...\n")

        # Verificar HTMLs gerados
        htmls = list(self.pasta_aulas.glob('AULA-*.html'))
        if not htmls:
            print("⚠️  Nenhum HTML gerado")
            self.relatorio['avisos'].append("Nenhum HTML gerado")
            return False

        print(f"✅ {len(htmls)} arquivos HTML gerados")

        # Verificar index.html
        if (self.pasta_aulas / 'index.html').exists():
            print(f"✅ index.html gerado")
        else:
            print(f"⚠️  index.html não encontrado")
            self.relatorio['avisos'].append("index.html não encontrado")

        print()
        return True

    def gerar_relatorio(self, pasta_saida: str = None) -> str:
        """
        Gerar relatório em JSON.

        Args:
            pasta_saida: Onde salvar (padrão: caminho_curso)

        Returns:
            Caminho do relatório
        """
        pasta_saida = Path(pasta_saida or self.caminho_curso)
        self.relatorio['fim'] = datetime.now().isoformat()

        # Calcular tempo
        inicio = datetime.fromisoformat(self.relatorio['inicio'])
        fim = datetime.fromisoformat(self.relatorio['fim'])
        duracao = (fim - inicio).total_seconds()
        self.relatorio['duracao_segundos'] = duracao

        # Salvar
        caminho_relatorio = pasta_saida / 'relatorio-geracao.json'
        with open(caminho_relatorio, 'w', encoding='utf-8') as f:
            json.dump(self.relatorio, f, indent=2, ensure_ascii=False)

        return str(caminho_relatorio)

    def executar(self, modo: str = 'completo', gerar_index: bool = True) -> int:
        """
        Executar orquestração completa.

        Args:
            modo: 'completo', 'apenas-aulas', 'apenas-ementas'
            gerar_index: Se True, gerar index.html

        Returns:
            Código de saída
        """
        print(f"{'='*60}")
        print(f"🚀 ORQUESTRADOR DE AULAS E EMENTAS")
        print(f"{'='*60}\n")
        print(f"📁 Curso: {self.caminho_curso}")
        print(f"🎯 Modo: {modo.upper()}")
        print(f"{'='*60}\n")

        # Validar estrutura
        if not self.validar_estrutura():
            print("❌ Estrutura inválida. Abortando.\n")
            return 1

        # Executar conforme modo
        sucesso = True

        if modo in ['completo', 'apenas-aulas']:
            if not self.executar_gerador_aulas():
                sucesso = False

        if modo in ['completo', 'apenas-ementas']:
            if not self.executar_gerador_ementa():
                sucesso = False

        # Validar resultado
        if not self.validar_resultado():
            sucesso = False

        # Gerar relatório
        print("📊 Gerando relatório...\n")
        caminho_relatorio = self.gerar_relatorio()
        print(f"✅ Relatório salvo: {caminho_relatorio}")

        # Resumo final
        print(f"\n{'='*60}")
        print(f"📋 RESUMO FINAL")
        print(f"{'='*60}")
        print(f"Status: {'✅ SUCESSO' if sucesso else '⚠️  COM AVISOS/ERROS'}")
        print(f"Etapas: {len(self.relatorio['etapas'])}")
        print(f"Avisos: {len(self.relatorio['avisos'])}")
        print(f"Erros: {len(self.relatorio['erros'])}")
        print(f"Duração: {self.relatorio.get('duracao_segundos', 0):.1f}s")

        if self.relatorio['avisos']:
            print(f"\n⚠️  Avisos:")
            for aviso in self.relatorio['avisos']:
                print(f"   - {aviso}")

        if self.relatorio['erros']:
            print(f"\n❌ Erros:")
            for erro in self.relatorio['erros']:
                print(f"   - {erro}")

        print(f"\n{'='*60}\n")

        return 0 if sucesso else 1


def main():
    """CLI principal."""
    parser = argparse.ArgumentParser(
        description='Orquestrador: Gerar aulas e ementas de forma completa',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Exemplos:
  python geradorementas-aulas.py \\
    --caminho-curso sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO \\
    --modo completo

  python geradorementas-aulas.py \\
    --caminho-curso ./meu-curso \\
    --modo apenas-aulas
        '''
    )

    parser.add_argument(
        '--caminho-curso',
        required=True,
        help='Caminho da pasta do curso'
    )

    parser.add_argument(
        '--modo',
        default='completo',
        choices=['completo', 'apenas-aulas', 'apenas-ementas'],
        help='Modo de execução'
    )

    parser.add_argument(
        '--gerar-index',
        default='true',
        choices=['true', 'false'],
        help='Gerar index.html'
    )

    args = parser.parse_args()

    # Validar caminho
    caminho = Path(args.caminho_curso)
    if not caminho.is_dir():
        print(f"❌ Caminho não encontrado: {caminho}")
        sys.exit(1)

    # Executar
    orquestrador = OrquestradorAulas(str(caminho))
    exit_code = orquestrador.executar(
        modo=args.modo,
        gerar_index=(args.gerar_index == 'true')
    )

    sys.exit(exit_code)


if __name__ == '__main__':
    main()
