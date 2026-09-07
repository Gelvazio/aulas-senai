#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
GERADOR DE EMENTA — Consolidar aulas em ementas por matéria

Lê arquivo principal do curso e gera ementas consolidadas para cada matéria.
Cada ementa é salva em sua própria pasta.

Uso:
    python gerador-ementa.py \
      --arquivo-principal sistema/CURSO/PLANO-AULAS.md \
      --pasta-base sistema/CURSO \
      --pasta-saida sistema/CURSO

Saída:
    - MATERIA-01/EMENTA-MATERIA-01.md
    - MATERIA-02/EMENTA-MATERIA-02.md
    - ...
"""

import os
import sys
import re
import argparse
from pathlib import Path
from datetime import datetime


class EmentaGenerator:
    """Gerador de ementas consolidadas por matéria."""

    def __init__(self, arquivo_principal: str, pasta_base: str):
        """
        Inicializar.

        Args:
            arquivo_principal: Arquivo markdown do curso (PLANO-AULAS.md)
            pasta_base: Pasta base do curso
        """
        self.arquivo_principal = Path(arquivo_principal)
        self.pasta_base = Path(pasta_base)
        self.materias = []
        self.erros = []

    def extrair_materias(self) -> list:
        """
        Extrair estrutura de matérias do arquivo principal.

        Formato esperado:
        ## MATERIA 1: Introdução à Tecnologia
        ### Encontros 1-2 (4h)
        - Objetivo: ...
        - Conteúdo: ...

        Returns:
            Lista de {nome, encontros, objetivo, conteudo}
        """
        conteudo = self.arquivo_principal.read_text(encoding='utf-8')

        materias = []
        current_materia = None

        for linha in conteudo.split('\n'):
            linha = linha.strip()

            # Detectar matéria (##)
            if re.match(r'^##\s+MATERIA\s+\d+:', linha, re.IGNORECASE):
                if current_materia:
                    materias.append(current_materia)

                match = re.search(r'MATERIA\s+\d+:\s*(.+?)$', linha, re.IGNORECASE)
                nome = match.group(1).strip() if match else "Sem Nome"

                current_materia = {
                    'nome': nome,
                    'encontros': [],
                    'objetivos': [],
                    'conteudos': [],
                    'duracao': '0h'
                }

            elif current_materia:
                # Capturar encontros
                if 'encontros' in linha.lower():
                    match = re.search(r'(\d+)h', linha, re.IGNORECASE)
                    if match:
                        current_materia['duracao'] = match.group(0)

                # Capturar objetivo
                if linha.lower().startswith('- objetivo:'):
                    objetivo = linha.replace('- Objetivo:', '', 1).strip()
                    current_materia['objetivos'].append(objetivo)

                # Capturar conteúdo
                if linha.lower().startswith('- conteúdo:'):
                    conteudo = linha.replace('- Conteúdo:', '', 1).strip()
                    current_materia['conteudos'].append(conteudo)

        if current_materia:
            materias.append(current_materia)

        return materias

    def listar_aulas_materia(self, nome_materia: str) -> list:
        """
        Listar aulas de uma matéria (de AULAS/AULA-*.md).

        Args:
            nome_materia: Nome da matéria

        Returns:
            Lista de {numero, titulo, arquivo}
        """
        # Procurar AULAS/ na pasta base
        pasta_aulas = self.pasta_base / 'AULAS'

        if not pasta_aulas.is_dir():
            return []

        aulas = []
        for arquivo in sorted(pasta_aulas.glob('AULA-*.md')):
            # Ler título do arquivo
            conteudo = arquivo.read_text(encoding='utf-8')
            match = re.search(r'^#+\s+(.+)$', conteudo, re.MULTILINE)
            titulo = match.group(1).strip() if match else arquivo.stem

            # Extrair número
            match_num = re.search(r'AULA-(\d+)', arquivo.name)
            numero = int(match_num.group(1)) if match_num else 0

            aulas.append({
                'numero': numero,
                'titulo': titulo,
                'arquivo': arquivo.name,
                'conteudo': conteudo
            })

        return aulas

    def gerar_ementa_materia(self, materia: dict, aulas: list) -> str:
        """
        Gerar markdown de ementa para uma matéria.

        Args:
            materia: Dicionário {nome, objetivos, conteudos, duracao}
            aulas: Lista de aulas da matéria

        Returns:
            Markdown da ementa
        """
        md = f"# EMENTA: {materia['nome']}\n\n"

        # Metadados
        md += "## Informações Gerais\n"
        md += f"- **Duração Total:** {materia['duracao']}\n"
        md += f"- **Total de Aulas:** {len(aulas)}\n"
        md += f"- **Gerado em:** {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n\n"

        # Objetivos
        if materia['objetivos']:
            md += "## Objetivos de Aprendizagem\n"
            for obj in materia['objetivos']:
                md += f"- {obj}\n"
            md += "\n"

        # Conteúdos programáticos
        if materia['conteudos']:
            md += "## Conteúdo Programático\n"
            for cont in materia['conteudos']:
                md += f"- {cont}\n"
            md += "\n"

        # Aulas
        if aulas:
            md += "## Plano de Aulas\n\n"
            for aula in aulas:
                md += f"### AULA {aula['numero']:02d} — {aula['titulo']}\n"
                md += f"**Arquivo:** {aula['arquivo']}\n\n"

        # Referências
        md += "## Observações\n"
        md += "- Ementa gerada automaticamente pelo sistema SENAI\n"
        md += "- Para atualizar, edite o arquivo `PLANO-AULAS.md` principal\n"

        return md

    def gerar_tudo(self, pasta_saida: str = None) -> dict:
        """
        Gerar todas as ementas.

        Args:
            pasta_saida: Pasta onde salvar (padrão: pasta_base)

        Returns:
            {status, total, ementas_geradas, erros}
        """
        pasta_saida = Path(pasta_saida or self.pasta_base)

        if not self.arquivo_principal.is_file():
            return {
                'status': 'erro',
                'total': 0,
                'ementas': [],
                'erros': [f'Arquivo não encontrado: {self.arquivo_principal}'],
                'timestamp': datetime.now().isoformat()
            }

        # Extrair matérias
        print("📖 Extraindo estrutura de matérias...")
        self.materias = self.extrair_materias()
        print(f"   ✅ {len(self.materias)} matérias encontradas\n")

        ementas_geradas = []

        for i, materia in enumerate(self.materias, 1):
            nome_materia = materia['nome']
            print(f"[{i}/{len(self.materias)}] {nome_materia}...", end=' ')

            try:
                # Listar aulas
                aulas = self.listar_aulas_materia(nome_materia)

                # Gerar ementa
                ementa_md = self.gerar_ementa_materia(materia, aulas)

                # Criar pasta da matéria
                nome_pasta = self._sanitizar_nome(nome_materia)
                pasta_materia = pasta_saida / nome_pasta
                pasta_materia.mkdir(parents=True, exist_ok=True)

                # Salvar ementa
                nome_arquivo_ementa = f'EMENTA-{nome_pasta}.md'
                caminho_ementa = pasta_materia / nome_arquivo_ementa

                caminho_ementa.write_text(ementa_md, encoding='utf-8')

                print("✅")

                ementas_geradas.append({
                    'materia': nome_materia,
                    'pasta': nome_pasta,
                    'arquivo': nome_arquivo_ementa,
                    'aulas': len(aulas),
                    'tamanho_bytes': len(ementa_md.encode('utf-8'))
                })

            except Exception as e:
                print(f"❌ {e}")
                self.erros.append({
                    'materia': nome_materia,
                    'erro': str(e)
                })

        return {
            'status': 'ok' if not self.erros else 'parcial',
            'total': len(ementas_geradas),
            'ementas': ementas_geradas,
            'erros': self.erros,
            'timestamp': datetime.now().isoformat()
        }

    def _sanitizar_nome(self, nome: str) -> str:
        """
        Converter nome em slug para pasta.

        Args:
            nome: Nome original

        Returns:
            Nome sanitizado (MATERIA_NOME_LIMPO)
        """
        # Remover caracteres especiais
        slug = re.sub(r'[^a-zA-Z0-9\s]', '', nome)
        # Converter espaços em underscore e maiúsculas
        slug = slug.replace(' ', '_').upper()
        # Remover underscores múltiplos
        slug = re.sub(r'_+', '_', slug)
        return f'MATERIA_{slug}'


def main():
    """CLI principal."""
    parser = argparse.ArgumentParser(
        description='Gerador de Ementa: Consolidar aulas em ementas por matéria',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Exemplos:
  python gerador-ementa.py \\
    --arquivo-principal sistema/CURSO/PLANO-AULAS.md \\
    --pasta-base sistema/CURSO

  python gerador-ementa.py \\
    --arquivo-principal ./PLANO.md \\
    --pasta-base . \\
    --pasta-saida ./ementas-geradas
        '''
    )

    parser.add_argument(
        '--arquivo-principal',
        required=True,
        help='Arquivo markdown principal do curso (PLANO-AULAS.md)'
    )

    parser.add_argument(
        '--pasta-base',
        required=True,
        help='Pasta base do curso (contém AULAS/)'
    )

    parser.add_argument(
        '--pasta-saida',
        default=None,
        help='Pasta para salvar ementas (padrão: pasta-base)'
    )

    args = parser.parse_args()

    # Validar
    arquivo = Path(args.arquivo_principal)
    if not arquivo.is_file():
        print(f"❌ Arquivo não encontrado: {arquivo}")
        sys.exit(1)

    pasta_base = Path(args.pasta_base)
    if not pasta_base.is_dir():
        print(f"❌ Pasta base não encontrada: {pasta_base}")
        sys.exit(1)

    # Gerar
    gerador = EmentaGenerator(str(arquivo), str(pasta_base))
    resultado = gerador.gerar_tudo(args.pasta_saida)

    # Exibir resultado
    print(f"\n{'='*60}")
    print(f"📊 RESULTADO")
    print(f"{'='*60}")
    print(f"Status: {resultado['status'].upper()}")
    print(f"Ementas geradas: {resultado['total']}")

    if resultado['ementas']:
        print(f"\n✅ Ementas:")
        for ementa in resultado['ementas']:
            print(f"   - {ementa['materia']}")
            print(f"     📁 {ementa['pasta']}/{ementa['arquivo']}")
            print(f"     ({ementa['aulas']} aulas, {ementa['tamanho_bytes']} bytes)")

    if resultado['erros']:
        print(f"\n❌ Erros:")
        for erro in resultado['erros']:
            print(f"   - {erro.get('materia', 'Desconhecido')}: {erro['erro']}")

    print(f"\n📅 Timestamp: {resultado['timestamp']}")
    print(f"{'='*60}\n")

    sys.exit(0 if resultado['status'] == 'ok' else 1)


if __name__ == '__main__':
    main()
