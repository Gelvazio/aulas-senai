#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gerador de HTML para Aulas — Automação Industrial 1200h
Lê PLANO-AULAS.md e gera arquivos HTML responsivos com branding SENAI
"""

import os
import re
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Tuple

class GeradorHTMLAulas:
    """Gera arquivos HTML a partir de PLANO-AULAS.md"""

    # Cores SENAI
    CORES = {
        'azul_senai': '#004384',
        'laranja_senai': '#f7941d',
        'cinza_claro': '#f5f5f5',
        'cinza_escuro': '#1a1a1a',
        'branco': '#ffffff',
        'preto': '#000000'
    }

    def __init__(self, base_dir: str):
        self.base_dir = Path(base_dir)
        self.materias_dir = self.base_dir / 'MATERIAS'
        self.aulas_criadas = 0
        self.ucs_processadas = 0

    def get_css_template(self) -> str:
        """Retorna CSS responsivo com tema claro/escuro"""
        return """
        :root {
            --color-primary: #004384;
            --color-secondary: #f7941d;
            --color-bg-light: #ffffff;
            --color-text-light: #000000;
            --color-bg-dark: #1a1a1a;
            --color-text-dark: #e0e0e0;
            --border-color: #ddd;
            --shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --color-bg-light: var(--color-bg-dark);
                --color-text-light: var(--color-text-dark);
                --border-color: #444;
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: var(--color-bg-light);
            color: var(--color-text-light);
            line-height: 1.6;
            transition: background-color 0.3s, color 0.3s;
        }

        header {
            background: linear-gradient(135deg, var(--color-primary) 0%, #003060 100%);
            color: white;
            padding: 1rem;
            box-shadow: var(--shadow);
        }

        header .logo {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        header .breadcrumb {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        h1 {
            color: var(--color-primary);
            margin: 1.5rem 0 1rem 0;
            border-bottom: 3px solid var(--color-secondary);
            padding-bottom: 0.5rem;
        }

        h2 {
            color: var(--color-primary);
            margin: 1.5rem 0 0.5rem 0;
        }

        h3 {
            color: var(--color-secondary);
            margin: 1rem 0 0.5rem 0;
        }

        .aula-header {
            background: linear-gradient(135deg, var(--color-primary) 0%, #003060 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }

        .aula-header h2 {
            color: white;
            margin: 0;
            border: none;
        }

        .duracao {
            background: var(--color-secondary);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.9rem;
            display: inline-block;
            margin-top: 0.5rem;
        }

        .conteudo-aula {
            background: var(--color-bg-light);
            border-left: 4px solid var(--color-secondary);
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 4px;
            box-shadow: var(--shadow);
        }

        .atividades {
            background: var(--color-bg-light);
            border-left: 4px solid var(--color-primary);
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 4px;
            box-shadow: var(--shadow);
        }

        ul, ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
        }

        li {
            margin-bottom: 0.5rem;
        }

        .nav-aulas {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            text-decoration: none;
            transition: all 0.3s;
            display: inline-block;
        }

        .btn-primary {
            background: var(--color-primary);
            color: white;
        }

        .btn-primary:hover {
            background: #003060;
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .btn-secondary {
            background: var(--color-secondary);
            color: white;
        }

        .btn-secondary:hover {
            background: #e07a1a;
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .index-aulas {
            background: var(--color-bg-light);
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            box-shadow: var(--shadow);
        }

        .index-aulas ul {
            columns: 2;
            column-gap: 2rem;
        }

        .index-aulas a {
            color: var(--color-primary);
            text-decoration: none;
        }

        .index-aulas a:hover {
            text-decoration: underline;
            color: var(--color-secondary);
        }

        footer {
            text-align: center;
            padding: 2rem 1rem;
            border-top: 1px solid var(--border-color);
            margin-top: 3rem;
            color: #666;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .container {
                padding: 1rem 0.5rem;
            }

            h1 {
                font-size: 1.5rem;
            }

            .index-aulas ul {
                columns: 1;
            }

            .nav-aulas {
                flex-direction: column;
            }
        }
        """

    def extrair_aulas(self, conteudo_md: str) -> List[Dict]:
        """Extrai lista de aulas do PLANO-AULAS.md"""
        aulas = []

        # Regex para encontrar seções de aulas (#### AULA X)
        pattern = r'#### AULA (\d+) — (.+?)\n- \*\*Duração:\*\* (.+?)\n- \*\*Conteúdo:\*\*(.*?)(?:- \*\*Atividades|$)'

        matches = re.findall(pattern, conteudo_md, re.DOTALL)

        for num, titulo, duracao, conteudo in matches:
            # Limpar conteúdo
            linhas_conteudo = [
                linha.strip()
                for linha in conteudo.split('\n')
                if linha.strip() and not linha.strip().startswith('- **Atividades')
            ]
            conteudo_limpo = '\n'.join(linhas_conteudo)

            # Extrair atividades
            atividades_pattern = r'- \*\*Atividades Práticas:\*\*(.*?)(?:#### AULA|---|\Z)'
            atividades_match = re.search(atividades_pattern, conteudo_md[conteudo_md.find(f'AULA {num}'):], re.DOTALL)

            atividades = []
            if atividades_match:
                linhas_ativ = [
                    linha.strip()
                    for linha in atividades_match.group(1).split('\n')
                    if linha.strip() and linha.strip().startswith('-')
                ]
                atividades = linhas_ativ

            aulas.append({
                'numero': int(num),
                'titulo': titulo.strip(),
                'duracao': duracao.strip(),
                'conteudo': conteudo_limpo,
                'atividades': atividades
            })

        return sorted(aulas, key=lambda x: x['numero'])

    def gerar_html_aula(self, aula: Dict, nome_uc: str, total_aulas: int, semestre: str) -> str:
        """Gera HTML para uma aula individual"""

        num = aula['numero']
        titulo = aula['titulo']
        duracao = aula['duracao']
        conteudo = aula['conteudo']
        atividades = aula['atividades']

        # Calcular anterior e próximo
        anterior = num - 1 if num > 1 else None
        proximo = num + 1 if num < total_aulas else None

        # Construir HTML
        html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AULA {num} — {titulo} | {nome_uc}</title>
    <style>
        {self.get_css_template()}
    </style>
</head>
<body>
    <header>
        <div class="logo">📚 SENAI — Automação Industrial</div>
        <div class="breadcrumb">
            {semestre} → {nome_uc} → AULA {num}
        </div>
    </header>

    <main class="container">
        <div class="aula-header">
            <h2>AULA {num} — {titulo}</h2>
            <span class="duracao">⏱️ {duracao}</span>
        </div>

        <div class="conteudo-aula">
            <h3>📖 Conteúdo Programático</h3>
            <p>{conteudo.replace(chr(10), '<br>')}</p>
        </div>

        <div class="atividades">
            <h3>✍️ Atividades Práticas</h3>
            <ul>
"""

        for atividade in atividades:
            atividade_limpa = atividade.replace('- ', '').strip()
            html += f"                <li>{atividade_limpa}</li>\n"

        html += """            </ul>
        </div>

        <div class="nav-aulas">
"""

        if anterior:
            html += f'            <a href="AULA-{anterior:02d}.html" class="btn btn-secondary">← Aula Anterior</a>\n'

        html += f'            <a href="index.html" class="btn btn-primary">📑 Índice da UC</a>\n'

        if proximo:
            html += f'            <a href="AULA-{proximo:02d}.html" class="btn btn-secondary">Próxima Aula →</a>\n'

        html += """        </div>
    </main>

    <footer>
        <p>© 2026 SENAI Santa Catarina | Técnico em Automação Industrial | 1200 horas</p>
        <p>Gerado automaticamente em """ + datetime.now().strftime("%d/%m/%Y %H:%M") + """</p>
    </footer>
</body>
</html>
"""
        return html

    def gerar_index_uc(self, nome_uc: str, aulas: List[Dict], semestre: str) -> str:
        """Gera index.html para uma UC"""

        html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Índice de Aulas — {nome_uc}</title>
    <style>
        {self.get_css_template()}
    </style>
</head>
<body>
    <header>
        <div class="logo">📚 SENAI — Automação Industrial</div>
        <div class="breadcrumb">{semestre} → {nome_uc}</div>
    </header>

    <main class="container">
        <h1>📑 Índice de Aulas</h1>
        <h2>{nome_uc}</h2>
        <p><strong>Total de Aulas:</strong> {len(aulas)} aulas de 2h</p>

        <div class="index-aulas">
            <ul>
"""

        for aula in aulas:
            html += f'                <li><a href="AULA-{aula["numero"]:02d}.html">AULA {aula["numero"]} — {aula["titulo"]}</a></li>\n'

        html += """            </ul>
        </div>

        <div class="nav-aulas">
            <a href="../../index.html" class="btn btn-primary">← Voltar para Principal</a>
        </div>
    </main>

    <footer>
        <p>© 2026 SENAI Santa Catarina | Técnico em Automação Industrial | 1200 horas</p>
        <p>Gerado automaticamente em """ + datetime.now().strftime("%d/%m/%Y %H:%M") + """</p>
    </footer>
</body>
</html>
"""
        return html

    def processar_uc(self, semestre_path: Path) -> None:
        """Processa uma UC e gera seus arquivos HTML"""

        for uc_path in semestre_path.iterdir():
            if not uc_path.is_dir() or not uc_path.name.startswith('MATERIA_'):
                continue

            plano_file = uc_path / 'PLANO-AULAS.md'
            if not plano_file.exists():
                print(f"⚠️  {uc_path.name}: PLANO-AULAS.md não encontrado")
                continue

            # Ler conteúdo
            with open(plano_file, 'r', encoding='utf-8') as f:
                conteudo_md = f.read()

            # Extrair informações
            nome_uc_raw = uc_path.name.replace('MATERIA_', '').replace('-', ' ')
            semestre = semestre_path.name.replace('SEMESTRE_', '')

            # Extrair aulas
            aulas = self.extrair_aulas(conteudo_md)

            if not aulas:
                print(f"⚠️  {uc_path.name}: Nenhuma aula encontrada")
                continue

            # Criar pasta AULAS se não existir
            aulas_dir = uc_path / 'AULAS'
            aulas_dir.mkdir(exist_ok=True)

            # Gerar HTML para cada aula
            for aula in aulas:
                html_content = self.gerar_html_aula(aula, nome_uc_raw, len(aulas), semestre)

                aula_file = aulas_dir / f'AULA-{aula["numero"]:02d}.html'
                with open(aula_file, 'w', encoding='utf-8') as f:
                    f.write(html_content)

                self.aulas_criadas += 1

            # Gerar index.html da UC
            index_content = self.gerar_index_uc(nome_uc_raw, aulas, semestre)
            index_file = aulas_dir / 'index.html'
            with open(index_file, 'w', encoding='utf-8') as f:
                f.write(index_content)

            print(f"✅ {nome_uc_raw} ({len(aulas)} aulas)")
            self.ucs_processadas += 1

    def executar(self) -> None:
        """Executa a geração de HTML para todas as UCs"""

        print("🚀 Gerando HTMLs das aulas...")
        print("")

        for semestre_path in sorted(self.materias_dir.iterdir()):
            if semestre_path.is_dir() and semestre_path.name.startswith('SEMESTRE_'):
                self.processar_uc(semestre_path)

        print("")
        print(f"🎉 Processo concluído!")
        print(f"   - UCs processadas: {self.ucs_processadas}")
        print(f"   - Aulas geradas: {self.aulas_criadas}")
        print(f"   - Total de arquivos: {self.aulas_criadas + self.ucs_processadas}")


def main():
    """Função principal"""
    base_dir = r"C:\fontes\aulas-senai\sistema\AUTOMACAO-INDUSTRIAL-1200-HORAS"

    if not os.path.exists(base_dir):
        print(f"❌ Erro: Diretório não encontrado: {base_dir}")
        return 1

    gerador = GeradorHTMLAulas(base_dir)
    gerador.executar()

    return 0


if __name__ == '__main__':
    exit(main())
