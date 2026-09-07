#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
GERADOR DE AULAS — Converter Markdown para HTML

Converte todos os arquivos AULA-*.md de uma pasta em HTML interativo
com templates SENAI, dark mode, table of contents e syntax highlighting.

Uso:
    python gerador-aulas.py --pasta-aulas caminho/AULAS --gerar-index true

Saída:
    - AULA-01.html, AULA-02.html, ...
    - index.html (dashboard navegável)
"""

import os
import sys
import re
import json
import argparse
from pathlib import Path
from datetime import datetime

try:
    import markdown
except ImportError:
    print("❌ Erro: markdown não instalado. Execute: pip install markdown")
    sys.exit(1)


class MarkdownParser:
    """Parser de Markdown com suporte a tabelas, listas, código, etc."""

    def __init__(self):
        """Inicializar parser markdown com extensões."""
        self.extensions = [
            'markdown.extensions.tables',
            'markdown.extensions.fenced_code',
            'markdown.extensions.codehilite',
            'markdown.extensions.toc',
            'markdown.extensions.md_in_html'
        ]

    def parse(self, conteudo: str) -> str:
        """
        Converter markdown para HTML.

        Args:
            conteudo: Conteúdo em markdown

        Returns:
            HTML renderizado
        """
        try:
            html = markdown.markdown(
                conteudo,
                extensions=self.extensions,
                extension_configs={
                    'markdown.extensions.codehilite': {
                        'css_class': 'hljs',
                        'linenums': False
                    },
                    'markdown.extensions.toc': {
                        'permalink': True,
                        'title': 'Índice'
                    }
                }
            )
            return html
        except Exception as e:
            print(f"⚠️  Erro ao parsear markdown: {e}")
            return f"<p><strong>Erro ao processar: {e}</strong></p>"

    def extrair_titulo(self, conteudo: str) -> str:
        """
        Extrair título (primeira linha com #).

        Args:
            conteudo: Conteúdo markdown

        Returns:
            Título ou "Sem Título"
        """
        match = re.search(r'^#+\s+(.+)$', conteudo, re.MULTILINE)
        if match:
            return match.group(1).strip()
        return "Sem Título"

    def extrair_front_matter(self, conteudo: str) -> tuple:
        """
        Extrair metadados YAML front matter.

        Args:
            conteudo: Conteúdo com front matter

        Returns:
            (metadados_dict, conteudo_sem_fm)
        """
        metadata = {}

        # Detectar ---\n...\n---
        if conteudo.startswith('---'):
            match = re.match(r'^---\s*\n(.*?)\n---\s*\n', conteudo, re.DOTALL)
            if match:
                fm = match.group(1)
                conteudo = conteudo[len(match.group(0)):]

                # Parse YAML simples
                for linha in fm.split('\n'):
                    if ':' in linha:
                        key, value = linha.split(':', 1)
                        metadata[key.strip()] = value.strip().strip('"\'')

        return metadata, conteudo.strip()

    def tempo_leitura(self, conteudo: str) -> int:
        """
        Calcular tempo estimado de leitura (~200 palavras/minuto).

        Args:
            conteudo: Conteúdo markdown

        Returns:
            Tempo em minutos
        """
        palavras = len(conteudo.split())
        minutos = max(1, (palavras + 199) // 200)
        return minutos

    def extrair_headings(self, html: str) -> list:
        """
        Extrair headings (h1, h2, h3) para TOC.

        Args:
            html: HTML renderizado

        Returns:
            Lista de {level, text, id}
        """
        headings = []
        for match in re.finditer(r'<h([1-3]).*?id="([^"]*)"[^>]*>([^<]+)<', html):
            level, heading_id, text = match.groups()
            headings.append({
                'level': int(level),
                'text': text.strip(),
                'id': heading_id
            })
        return headings


class AulaGenerator:
    """Gerar HTMLs de aulas a partir de Markdown."""

    TEMPLATE_AULA = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{titulo} — SENAI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css">
    <style>
        :root {{
            --color-primary: #004384;
            --color-secondary: #f7941d;
            --bg-light: #fff;
            --text-light: #202124;
            --bg-code: #f5f5f5;
        }}

        @media (prefers-color-scheme: dark) {{
            body[data-theme="dark"] {{
                --bg-light: #1c1e2a;
                --text-light: #e0e3e8;
                --bg-code: #2d2d2d;
            }}
        }}

        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        body {{
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--bg-light);
            color: var(--text-light);
            line-height: 1.7;
            transition: background 0.3s, color 0.3s;
        }}

        .container {{
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 250px;
            gap: 2rem;
            padding: 2rem;
        }}

        @media (max-width: 900px) {{
            .container {{ grid-template-columns: 1fr; }}
            .toc {{ display: none; }}
        }}

        .breadcrumb {{
            display: flex;
            gap: 0.5rem;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
            color: #666;
        }}

        .breadcrumb a {{
            color: var(--color-primary);
            text-decoration: none;
        }}

        .breadcrumb a:hover {{ text-decoration: underline; }}

        .aula-header {{
            border-bottom: 3px solid var(--color-secondary);
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
        }}

        .aula-header h1 {{
            font-size: 2.5rem;
            color: var(--color-primary);
            margin-bottom: 0.5rem;
        }}

        .meta {{
            display: flex;
            gap: 1.5rem;
            font-size: 0.95rem;
            color: #666;
        }}

        .aula-content {{
            max-width: 100%;
        }}

        .aula-content h1 {{
            font-size: 2rem;
            color: var(--color-primary);
            margin-top: 2rem;
            margin-bottom: 1rem;
        }}

        .aula-content h2 {{
            font-size: 1.5rem;
            color: var(--color-primary);
            margin-top: 1.5rem;
            margin-bottom: 0.8rem;
            border-left: 4px solid var(--color-secondary);
            padding-left: 1rem;
        }}

        .aula-content h3 {{
            font-size: 1.2rem;
            color: #555;
            margin-top: 1.2rem;
            margin-bottom: 0.6rem;
        }}

        .aula-content p {{
            margin-bottom: 1rem;
            text-align: justify;
        }}

        .aula-content ul, .aula-content ol {{
            margin-left: 1.5rem;
            margin-bottom: 1rem;
        }}

        .aula-content li {{ margin-bottom: 0.5rem; }}

        .aula-content table {{
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            border: 1px solid #ddd;
        }}

        .aula-content table th {{
            background: var(--color-primary);
            color: white;
            padding: 1rem;
            text-align: left;
        }}

        .aula-content table td {{
            padding: 0.8rem;
            border: 1px solid #ddd;
        }}

        .aula-content code {{
            background: var(--bg-code);
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
        }}

        .aula-content pre {{
            background: var(--bg-code);
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 1rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }}

        .aula-content pre code {{
            background: none;
            padding: 0;
            border-radius: 0;
        }}

        .toc {{
            background: var(--bg-code);
            padding: 1.5rem;
            border-radius: 8px;
            position: sticky;
            top: 2rem;
            max-height: calc(100vh - 4rem);
            overflow-y: auto;
        }}

        .toc h3 {{
            font-size: 1rem;
            margin-bottom: 1rem;
            color: var(--color-primary);
        }}

        .toc ul {{
            list-style: none;
            margin: 0;
            padding: 0;
        }}

        .toc li {{ margin-bottom: 0.5rem; }}

        .toc a {{
            color: var(--color-primary);
            text-decoration: none;
            font-size: 0.9rem;
        }}

        .toc a:hover {{ text-decoration: underline; }}

        .toc .level-2 {{ padding-left: 1rem; }}
        .toc .level-3 {{ padding-left: 2rem; }}

        .footer {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2rem;
            border-top: 1px solid #ddd;
            margin-top: 3rem;
            font-size: 0.9rem;
            color: #666;
        }}

        .footer button {{
            background: var(--color-primary);
            color: white;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
        }}

        .footer button:hover {{ background: var(--color-secondary); }}

        .hljs {{ background: var(--bg-code) !important; }}
    </style>
</head>
<body data-theme="light">
    <div class="container">
        <main>
            <nav class="breadcrumb">
                <a href="index.html">📚 Índice</a>
                <span>/</span>
                <span>{titulo}</span>
            </nav>

            <header class="aula-header">
                <h1>{titulo}</h1>
                <div class="meta">
                    <span>📚 SENAI — Aprendizagem Industrial</span>
                    <span>⏱️ ~{tempo_leitura} min de leitura</span>
                    <span>📅 Gerado: {data_agora}</span>
                </div>
            </header>

            <article class="aula-content">
                {conteudo}
            </article>

            <footer class="footer">
                <div>
                    <strong>Arquivo:</strong> {nome_arquivo}<br>
                    Aula convertida de Markdown para HTML interativo
                </div>
                <div>
                    <button onclick="voltarIndex()">📑 Voltar ao Índice</button>
                    <button onclick="toggleTema()">🌙 Tema</button>
                </div>
            </footer>
        </main>

        <aside class="toc">
            {toc}
        </aside>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
    <script>
        (function() {{
            const tema = localStorage.getItem('senai_tema') || 'light';
            if (tema === 'dark') {{
                document.documentElement.setAttribute('data-theme', 'dark');
            }}
        }})();

        function toggleTema() {{
            const html = document.documentElement;
            const tema = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', tema);
            localStorage.setItem('senai_tema', tema);
        }}

        function voltarIndex() {{
            window.location.href = 'index.html';
        }}

        hljs.highlightAll();
    </script>
</body>
</html>
'''

    TEMPLATE_INDEX = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Índice de Aulas — SENAI</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Segoe UI', Roboto, Arial, sans-serif;
            background: #e8eaed;
            padding: 2rem;
            color: #202124;
        }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        .header {{
            background: linear-gradient(135deg, #004384 0%, #0055b3 100%);
            color: white;
            padding: 3rem 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }}
        .header h1 {{ font-size: 2rem; margin-bottom: 0.5rem; }}
        .header p {{ opacity: 0.9; }}
        .aulas-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }}
        .aula-card {{
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.12);
            transition: transform 0.15s, box-shadow 0.15s;
        }}
        .aula-card:hover {{
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0,67,132,0.15);
        }}
        .aula-numero {{
            font-size: 0.8rem;
            font-weight: 700;
            color: #f7941d;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.5rem;
        }}
        .aula-info h3 {{
            font-size: 1.2rem;
            color: #004384;
            margin-bottom: 0.5rem;
        }}
        .aula-info p {{
            font-size: 0.85rem;
            color: #888;
            margin-bottom: 0.3rem;
        }}
        .aula-link {{
            display: inline-block;
            background: #004384;
            color: white;
            padding: 0.6rem 1rem;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 1rem;
            transition: background 0.15s;
        }}
        .aula-link:hover {{ background: #00306a; }}
        .footer {{
            text-align: center;
            margin-top: 3rem;
            padding: 1.5rem;
            color: #666;
            font-size: 0.9rem;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Índice de Aulas Interativas</h1>
            <p>SENAI — Aprendizagem Industrial</p>
            <p>Total: {total_aulas} aulas</p>
        </div>
        <div class="aulas-grid">
            {cards}
        </div>
        <div class="footer">
            <p>Índice gerado em {data_agora}</p>
        </div>
    </div>
</body>
</html>
'''

    def __init__(self, pasta_aulas: str):
        """
        Inicializar gerador.

        Args:
            pasta_aulas: Caminho da pasta AULAS
        """
        self.pasta_aulas = Path(pasta_aulas)
        self.parser = MarkdownParser()
        self.aulas_geradas = []
        self.erros = []

    def listar_aulas(self) -> list:
        """Listar todos os AULA-*.md."""
        aulas = sorted(self.pasta_aulas.glob('AULA-*.md'))
        return aulas

    def gerar_tudo(self, gerar_index: bool = True) -> dict:
        """
        Gerar HTMLs de todas as aulas.

        Args:
            gerar_index: Se True, criar index.html

        Returns:
            {status, total, aulas, erros}
        """
        aulas = self.listar_aulas()

        if not aulas:
            return {
                'status': 'aviso',
                'total': 0,
                'aulas': [],
                'erros': ['Nenhuma aula AULA-*.md encontrada'],
                'timestamp': datetime.now().isoformat()
            }

        print(f"📚 Encontradas {len(aulas)} aulas")

        for i, arquivo_md in enumerate(aulas, 1):
            print(f"  [{i}/{len(aulas)}] {arquivo_md.name}...", end=' ')
            try:
                self.gerar_aula_html(arquivo_md)
                print("✅")
            except Exception as e:
                print(f"❌ {e}")
                self.erros.append({'arquivo': arquivo_md.name, 'erro': str(e)})

        if gerar_index:
            print("🎯 Gerando index.html...", end=' ')
            try:
                self.gerar_index_html()
                print("✅")
            except Exception as e:
                print(f"❌ {e}")
                self.erros.append({'arquivo': 'index.html', 'erro': str(e)})

        return {
            'status': 'ok' if not self.erros else 'parcial',
            'total': len(self.aulas_geradas),
            'aulas': self.aulas_geradas,
            'erros': self.erros,
            'timestamp': datetime.now().isoformat()
        }

    def gerar_aula_html(self, arquivo_md: Path) -> None:
        """Gerar HTML de uma aula."""
        conteudo = arquivo_md.read_text(encoding='utf-8')

        # Extrair front matter
        metadata, conteudo_limpo = self.parser.extrair_front_matter(conteudo)

        # Extrair título
        titulo = metadata.get('titulo') or self.parser.extrair_titulo(conteudo_limpo)

        # Parse markdown
        html = self.parser.parse(conteudo_limpo)

        # Extrair headings para TOC
        headings = self.parser.extrair_headings(html)

        # Gerar TOC
        toc = self._gerar_toc(headings)

        # Tempo de leitura
        tempo_leitura = self.parser.tempo_leitura(conteudo_limpo)

        # Renderizar template
        html_completo = self.TEMPLATE_AULA.format(
            titulo=titulo,
            conteudo=html,
            toc=toc,
            tempo_leitura=tempo_leitura,
            data_agora=datetime.now().strftime('%d/%m/%Y %H:%M'),
            nome_arquivo=arquivo_md.name
        )

        # Salvar
        arquivo_html = arquivo_md.with_suffix('.html')
        arquivo_html.write_text(html_completo, encoding='utf-8')

        # Registrar
        self.aulas_geradas.append({
            'numero': self._extrair_numero_aula(arquivo_md.name),
            'titulo': titulo,
            'origem': arquivo_md.name,
            'saida': arquivo_html.name,
            'tempo_leitura': tempo_leitura,
            'tamanho_bytes': len(html_completo.encode('utf-8')),
            'data_geracao': datetime.now().isoformat()
        })

    def _gerar_toc(self, headings: list) -> str:
        """Gerar Table of Contents em HTML."""
        if not headings:
            return '<h3>Índice</h3><p>Sem seções</p>'

        html = '<h3>📑 Índice</h3><ul>'
        for h in headings:
            level_class = f'level-{h["level"]}'
            html += f'<li class="{level_class}"><a href="#{h["id"]}">{h["text"]}</a></li>'
        html += '</ul>'
        return html

    def _extrair_numero_aula(self, nome: str) -> int:
        """Extrair número de AULA-01.md."""
        match = re.search(r'AULA-(\d+)', nome)
        return int(match.group(1)) if match else 0

    def gerar_index_html(self) -> None:
        """Gerar index.html com todas as aulas."""
        # Ordenar por número
        aulas = sorted(self.aulas_geradas, key=lambda a: a['numero'])

        # Gerar cards
        cards = []
        for aula in aulas:
            card = f'''        <div class="aula-card">
            <div class="aula-numero">AULA {aula['numero']:02d}</div>
            <div class="aula-info">
                <h3>{aula['titulo']}</h3>
                <p>⏱️ {aula['tempo_leitura']} min de leitura</p>
            </div>
            <a href="{aula['saida']}" class="aula-link">▶️ Abrir</a>
        </div>'''
            cards.append(card)

        cards_html = '\n'.join(cards)

        # Renderizar index
        html = self.TEMPLATE_INDEX.format(
            total_aulas=len(aulas),
            cards=cards_html,
            data_agora=datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        )

        # Salvar
        (self.pasta_aulas / 'index.html').write_text(html, encoding='utf-8')


def main():
    """CLI principal."""
    parser = argparse.ArgumentParser(
        description='Gerador de Aulas: Markdown → HTML',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Exemplos:
  python gerador-aulas.py --pasta-aulas sistema/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS
  python gerador-aulas.py --pasta-aulas ./AULAS --gerar-index true
        '''
    )

    parser.add_argument(
        '--pasta-aulas',
        required=True,
        help='Caminho da pasta AULAS (contendo AULA-*.md)'
    )

    parser.add_argument(
        '--gerar-index',
        default='true',
        choices=['true', 'false'],
        help='Gerar index.html (padrão: true)'
    )

    args = parser.parse_args()

    # Validar pasta
    pasta = Path(args.pasta_aulas)
    if not pasta.is_dir():
        print(f"❌ Pasta não encontrada: {pasta}")
        sys.exit(1)

    # Gerar
    gerador = AulaGenerator(str(pasta))
    resultado = gerador.gerar_tudo(gerar_index=(args.gerar_index == 'true'))

    # Exibir resultado
    print(f"\n{'='*60}")
    print(f"📊 RESULTADO")
    print(f"{'='*60}")
    print(f"Status: {resultado['status'].upper()}")
    print(f"Aulas geradas: {resultado['total']}")

    if resultado['aulas']:
        print(f"\n✅ Aulas:")
        for aula in resultado['aulas']:
            print(f"   - AULA {aula['numero']:02d}: {aula['titulo']}")

    if resultado['erros']:
        print(f"\n❌ Erros:")
        for erro in resultado['erros']:
            print(f"   - {erro['arquivo']}: {erro['erro']}")

    print(f"\n📅 Timestamp: {resultado['timestamp']}")
    print(f"{'='*60}\n")

    # Retornar código de saída
    sys.exit(0 if resultado['status'] == 'ok' else 1)


if __name__ == '__main__':
    main()
