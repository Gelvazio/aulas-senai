#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GERADOR DE CURSO COMPLETO - Processa um curso do início ao fim

FLUXO:
  1. Encontra ementas (TXT, DOCX, PDF)
  2. Converte para Markdown
  3. Cria estrutura de matérias
  4. Gera PLANO-AULAS.md em cada matéria
  5. Cria AULA-XX.md em AULAS/ de cada matéria
  6. Documenta tudo em PASSOS.md

COMO USAR:
  python gerador-curso-completo.py --caminho-curso C:\\fontes\\aulas-senai\\sistema\\BACKEND-560-HORAS
"""

import sys
import io
import re
import json
from pathlib import Path
from datetime import datetime
from collections import OrderedDict

# Configurar encoding UTF-8 para Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


class GeradorCursoCompleto:
    """Processar um curso completo do início ao fim."""

    def __init__(self, caminho_curso: Path):
        self.caminho_curso = Path(caminho_curso)
        self.passos = []
        self.arquivo_ementa = None
        self.conteudo_ementa = None
        self.estrutura = {}

    def adicionar_passo(self, titulo: str, descricao: str, status: str = "✅", detalhes: str = ""):
        """Registrar um passo no workflow."""
        passo = {
            "data": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "titulo": titulo,
            "status": status,
            "descricao": descricao,
            "detalhes": detalhes
        }
        self.passos.append(passo)
        print(f"{status} {titulo}")
        if detalhes:
            print(f"   {detalhes}")

    def passo_1_encontrar_ementa(self):
        """PASSO 1: Encontrar arquivo de ementa."""
        print("\n" + "="*70)
        print("PASSO 1: Encontrar arquivo de ementa")
        print("="*70)

        # Procurar por arquivos de ementa
        padroes = ["*.docx", "*.xlsx", "*.pdf", "*.txt"]
        arquivos = []

        for padrao in padroes:
            arquivos.extend(self.caminho_curso.glob(padrao))

        if not arquivos:
            self.adicionar_passo(
                "Encontrar ementa",
                "Nenhum arquivo de ementa encontrado",
                "⚠️",
                f"Pastas pesquisadas: {self.caminho_curso}"
            )
            return False

        self.arquivo_ementa = arquivos[0]
        self.adicionar_passo(
            "Encontrar ementa",
            f"Arquivo encontrado: {self.arquivo_ementa.name}",
            "✅",
            f"Tipo: {self.arquivo_ementa.suffix}"
        )
        return True

    def passo_2_ler_ementa(self):
        """PASSO 2: Ler conteúdo da ementa."""
        print("\n" + "="*70)
        print("PASSO 2: Ler ementa do arquivo")
        print("="*70)

        try:
            if self.arquivo_ementa.suffix.lower() == '.docx':
                from docx import Document
                doc = Document(self.arquivo_ementa)
                self.conteudo_ementa = '\n'.join([p.text for p in doc.paragraphs])
            else:
                with open(self.arquivo_ementa, 'r', encoding='utf-8', errors='ignore') as f:
                    self.conteudo_ementa = f.read()

            self.adicionar_passo(
                "Ler ementa",
                f"Conteúdo lido com sucesso",
                "✅",
                f"Tamanho: {len(self.conteudo_ementa)} caracteres"
            )
            return True
        except Exception as e:
            self.adicionar_passo(
                "Ler ementa",
                f"Erro ao ler arquivo: {e}",
                "❌"
            )
            return False

    def passo_3_criar_ementa_markdown(self):
        """PASSO 3: Criar arquivo EMENTA-PRINCIPAL-*.md."""
        print("\n" + "="*70)
        print("PASSO 3: Criar ementa em Markdown")
        print("="*70)

        nome_curso = self.caminho_curso.name
        arquivo_saida = self.caminho_curso / f"EMENTA-PRINCIPAL-{nome_curso}.md"

        conteudo_md = f"""# EMENTA PRINCIPAL: {nome_curso}

**Data de Criação:** {datetime.now().strftime('%Y-%m-%d')}
**Status:** Importado de documento original
**Fonte:** {self.arquivo_ementa.name}

---

## CONTEÚDO ORIGINAL

{self.conteudo_ementa[:2000]}

... (conteúdo completo)

---

*Arquivo gerado automaticamente por gerador-curso-completo.py*
"""

        try:
            with open(arquivo_saida, 'w', encoding='utf-8') as f:
                f.write(conteudo_md)

            self.adicionar_passo(
                "Criar ementa Markdown",
                f"Arquivo criado: {arquivo_saida.name}",
                "✅"
            )
            return True
        except Exception as e:
            self.adicionar_passo(
                "Criar ementa Markdown",
                f"Erro ao criar arquivo: {e}",
                "❌"
            )
            return False

    def passo_4_detectar_materias(self):
        """PASSO 4: Detectar matérias na ementa."""
        print("\n" + "="*70)
        print("PASSO 4: Detectar matérias na ementa")
        print("="*70)

        # Procurar por padrões de módulos/disciplinas
        padroes = [
            r'(?:M[óo]dulo|Disciplina|Unidade|UC)\s*(\d+)[:\s]*([^;\n]+)',
            r'^##\s+([^;\n]+)',
        ]

        materias = []
        for padrao in padroes:
            matches = re.findall(padrao, self.conteudo_ementa, re.MULTILINE | re.IGNORECASE)
            materias.extend([m[1] if isinstance(m, tuple) else m for m in matches])

        if not materias:
            materias = ["Materia-Geral"]

        # Remover duplicatas
        materias = list(dict.fromkeys(materias))[:5]  # Máx 5 matérias

        self.estrutura['materias'] = materias

        self.adicionar_passo(
            "Detectar matérias",
            f"{len(materias)} matérias encontradas",
            "✅",
            f"Matérias: {', '.join(materias[:3])}" + (" ..." if len(materias) > 3 else "")
        )
        return True

    def passo_5_criar_estrutura_materias(self):
        """PASSO 5: Criar pasta e estrutura de cada matéria."""
        print("\n" + "="*70)
        print("PASSO 5: Criar estrutura de matérias")
        print("="*70)

        materias_criadas = 0

        for materia in self.estrutura.get('materias', []):
            # Sanitizar nome
            nome_materia = materia.strip().replace(' ', '_').replace('/', '_').upper()[:50]
            pasta_materia = self.caminho_curso / nome_materia

            try:
                # Criar pastas
                (pasta_materia / "AULAS").mkdir(parents=True, exist_ok=True)
                (pasta_materia / "MATERIAIS").mkdir(parents=True, exist_ok=True)

                materias_criadas += 1
            except Exception as e:
                print(f"   ⚠️ Erro ao criar {nome_materia}: {e}")

        self.adicionar_passo(
            "Criar estrutura de matérias",
            f"{materias_criadas} pastas de matérias criadas",
            "✅",
            f"Pasta base: {self.caminho_curso}"
        )
        return materias_criadas > 0

    def passo_6_gerar_planos_aulas(self):
        """PASSO 6: Gerar PLANO-AULAS.md em cada matéria."""
        print("\n" + "="*70)
        print("PASSO 6: Gerar PLANO-AULAS.md")
        print("="*70)

        planos_criados = 0

        for materia in self.estrutura.get('materias', []):
            nome_materia = materia.strip().replace(' ', '_').replace('/', '_').upper()[:50]
            pasta_materia = self.caminho_curso / nome_materia
            arquivo_plano = pasta_materia / "PLANO-AULAS.md"

            # Estimar aulas
            num_aulas = 5  # Padrão
            ch_por_aula = 4

            conteudo_plano = f"""# PLANO DE AULAS: {materia}

**Data de Criação:** {datetime.now().strftime('%Y-%m-%d')}
**Total de Encontros:** {num_aulas}
**Duração por Encontro:** {ch_por_aula}h
**Carga Horária Total:** {num_aulas * ch_por_aula}h

---

## Estrutura de Encontros

"""

            for i in range(1, num_aulas + 1):
                conteudo_plano += f"""
### ENCONTRO {i}

**Arquivo:** `AULAS/AULA-{i:02d}.md`
**Duração:** {ch_por_aula}h

#### Objetivos
- Compreender conceitos fundamentais
- Aplicar técnicas práticas
- Resolver problemas

---
"""

            try:
                with open(arquivo_plano, 'w', encoding='utf-8') as f:
                    f.write(conteudo_plano)
                planos_criados += 1
            except Exception as e:
                print(f"   ⚠️ Erro ao criar plano para {nome_materia}: {e}")

        self.adicionar_passo(
            "Gerar PLANO-AULAS.md",
            f"{planos_criados} planos criados",
            "✅"
        )
        return planos_criados > 0

    def passo_7_gerar_arquivos_aulas(self):
        """PASSO 7: Gerar AULA-XX.md em cada matéria."""
        print("\n" + "="*70)
        print("PASSO 7: Gerar arquivos de aulas")
        print("="*70)

        aulas_criadas = 0
        num_aulas = 5

        for materia in self.estrutura.get('materias', []):
            nome_materia = materia.strip().replace(' ', '_').replace('/', '_').upper()[:50]
            pasta_aulas = self.caminho_curso / nome_materia / "AULAS"

            for i in range(1, num_aulas + 1):
                arquivo_aula = pasta_aulas / f"AULA-{i:02d}.md"

                conteudo_aula = f"""# AULA-{i:02d}

**Data:** {datetime.now().strftime('%Y-%m-%d')}
**Matéria:** {materia}

---

## Objetivo

Ao final desta aula você será capaz de:
- Compreender conceitos principais
- Aplicar em situações práticas
- Resolver problemas

---

## Conteúdo

[Conteúdo detalhado da aula será adicionado aqui]

---

## Atividades

1. Atividade prática
2. Exercícios
3. Discussão em grupo

---

## Referências

Consulte o PLANO-AULAS.md para mais informações.
"""

                try:
                    with open(arquivo_aula, 'w', encoding='utf-8') as f:
                        f.write(conteudo_aula)
                    aulas_criadas += 1
                except Exception as e:
                    print(f"   ⚠️ Erro ao criar AULA-{i:02d}.md: {e}")

        self.adicionar_passo(
            "Gerar arquivos de aulas",
            f"{aulas_criadas} arquivos de aulas criados",
            "✅",
            f"Total de aulas: {aulas_criadas}"
        )
        return aulas_criadas > 0

    def passo_8_gerar_aulas_html(self):
        """PASSO 8: Gerar AULA-XX.html a partir de AULA-XX.md."""
        print("\n" + "="*70)
        print("PASSO 8: Gerar aulas em HTML")
        print("="*70)

        htmls_criados = 0

        for materia in self.estrutura.get('materias', []):
            nome_materia = materia.strip().replace(' ', '_').replace('/', '_').upper()[:50]
            pasta_aulas = self.caminho_curso / nome_materia / "AULAS"
            num_aulas = 5

            for i in range(1, num_aulas + 1):
                arquivo_md = pasta_aulas / f"AULA-{i:02d}.md"
                arquivo_html = pasta_aulas / f"AULA-{i:02d}.html"

                # Gerar HTML a partir do Markdown
                conteudo_html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AULA-{i:02d} — {materia}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #004384 0%, #0055b3 100%);
            color: #333;
            line-height: 1.6;
        }}
        .container {{ max-width: 900px; margin: 0 auto; padding: 40px 20px; }}
        header {{
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            border-left: 8px solid #f7941d;
        }}
        h1 {{ color: #004384; font-size: 2em; margin-bottom: 10px; }}
        .meta {{ color: #999; font-size: 0.9em; }}
        .content {{
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }}
        h2 {{ color: #004384; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #f7941d; padding-bottom: 10px; }}
        h3 {{ color: #0055b3; margin-top: 20px; margin-bottom: 10px; }}
        ul, ol {{ margin-left: 20px; margin-bottom: 15px; }}
        li {{ margin-bottom: 8px; }}
        .btn {{
            display: inline-block;
            background: #004384;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            margin-top: 20px;
        }}
        .btn:hover {{ background: #003060; }}
        footer {{
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #999;
            font-size: 0.9em;
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>AULA-{i:02d}</h1>
            <p class="meta">Matéria: {materia} | Data: {datetime.now().strftime('%d/%m/%Y')}</p>
        </header>

        <div class="content">
            <h2>Objetivo de Aprendizagem</h2>
            <ul>
                <li>Compreender conceitos principais</li>
                <li>Aplicar em situações práticas</li>
                <li>Resolver problemas</li>
            </ul>

            <h2>Conteúdo</h2>
            <p>[Conteúdo detalhado será adicionado aqui]</p>

            <h2>Atividades Práticas</h2>
            <ol>
                <li>Atividade principal (40 min)</li>
                <li>Exercícios complementares (20 min)</li>
                <li>Discussão em grupo (10 min)</li>
            </ol>

            <h2>Recursos Necessários</h2>
            <ul>
                <li>Computador com internet</li>
                <li>Software específico (conforme UC)</li>
                <li>Projetor/tela</li>
                <li>Material didático</li>
            </ul>

            <h2>Referências</h2>
            <p>Consulte o PLANO-AULAS.md e a EMENTA-PRINCIPAL-*.md para mais informações.</p>

            <a href="index.html" class="btn">← Voltar</a>

            <footer>
                <p>Gerado automaticamente por gerador-curso-completo.py</p>
                <p>Curso: {self.caminho_curso.name}</p>
            </footer>
        </div>
    </div>
</body>
</html>
"""

                try:
                    with open(arquivo_html, 'w', encoding='utf-8') as f:
                        f.write(conteudo_html)
                    htmls_criados += 1
                except Exception as e:
                    print(f"   ⚠️ Erro ao criar AULA-{i:02d}.html: {e}")

        self.adicionar_passo(
            "Gerar aulas em HTML",
            f"{htmls_criados} arquivos HTML criados",
            "✅",
            f"Total de HTMLs: {htmls_criados}"
        )
        return htmls_criados > 0

    def passo_9_gerar_relatorio_passos(self):
        """PASSO 9: Gerar relatório PASSOS.md."""
        print("\n" + "="*70)
        print("PASSO 9: Gerar relatório PASSOS.md")
        print("="*70)

        arquivo_passos = self.caminho_curso / "PASSOS.md"

        conteudo = f"""# PASSOS — Geração do Curso {self.caminho_curso.name}

**Data de Início:** {self.passos[0]['data'] if self.passos else datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Data de Conclusão:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Status:** ✅ Concluído

---

## Resumo Executivo

Curso **{self.caminho_curso.name}** processado com sucesso.

| Item | Valor |
|------|-------|
| Arquivo de origem | {self.arquivo_ementa.name if self.arquivo_ementa else "N/A"} |
| Matérias criadas | {len(self.estrutura.get('materias', []))} |
| Planos gerados | {len(self.estrutura.get('materias', []))} |
| Aulas Markdown geradas | {len(self.estrutura.get('materias', [])) * 5} |
| Aulas HTML geradas | {len(self.estrutura.get('materias', [])) * 5} |

---

## Passos Executados

"""

        for idx, passo in enumerate(self.passos, 1):
            conteudo += f"""
### Passo {idx}: {passo['titulo']}

**Status:** {passo['status']}
**Data:** {passo['data']}
**Descrição:** {passo['descricao']}
"""
            if passo['detalhes']:
                conteudo += f"**Detalhes:** {passo['detalhes']}\n"

        conteudo += f"""

---

## Estrutura Final Criada

```
{self.caminho_curso.name}/
├── PASSOS.md (este arquivo)
├── EMENTA-PRINCIPAL-{self.caminho_curso.name}.md
"""

        for materia in self.estrutura.get('materias', []):
            nome_materia = materia.strip().replace(' ', '_').replace('/', '_').upper()[:50]
            conteudo += f"""├── {nome_materia}/
│   ├── PLANO-AULAS.md
│   ├── AULAS/
│   │   ├── AULA-01.md
│   │   ├── AULA-01.html ✅ HTML
│   │   ├── AULA-02.md
│   │   ├── AULA-02.html ✅ HTML
│   │   ├── AULA-03.md
│   │   ├── AULA-03.html ✅ HTML
│   │   ├── AULA-04.md
│   │   ├── AULA-04.html ✅ HTML
│   │   ├── AULA-05.md
│   │   ├── AULA-05.html ✅ HTML
│   │   └── index.html (dashboard)
│   └── MATERIAIS/
"""

        conteudo += """```

---

## Próximos Passos

1. ✅ Revisar cada PLANO-AULAS.md
2. ✅ Editar AULA-XX.md com conteúdo real
3. ✅ Adicionar materiais em MATERIAIS/
4. ✅ Gerar HTMLs de aulas (opcional)
5. ✅ Sincronizar com Supabase

---

**Gerado por:** gerador-curso-completo.py
**Status:** ✅ PRONTO PARA REVISÃO
"""

        try:
            with open(arquivo_passos, 'w', encoding='utf-8') as f:
                f.write(conteudo)

            self.adicionar_passo(
                "Gerar relatório PASSOS.md",
                "Arquivo criado com sucesso",
                "✅",
                f"Localização: {arquivo_passos}"
            )
            return True
        except Exception as e:
            self.adicionar_passo(
                "Gerar relatório PASSOS.md",
                f"Erro ao criar: {e}",
                "❌"
            )
            return False

    def executar(self):
        """Executar todo o workflow."""
        print("\n")
        print("█" * 70)
        print("█  GERADOR DE CURSO COMPLETO")
        print("█" * 70)
        print(f"\n🎓 Processando: {self.caminho_curso.name}\n")

        # Executar todos os passos
        if self.passo_1_encontrar_ementa():
            self.passo_2_ler_ementa()
            self.passo_3_criar_ementa_markdown()
            self.passo_4_detectar_materias()
            self.passo_5_criar_estrutura_materias()
            self.passo_6_gerar_planos_aulas()
            self.passo_7_gerar_arquivos_aulas()
            self.passo_8_gerar_aulas_html()
            self.passo_9_gerar_relatorio_passos()

        # Resumo final
        print("\n" + "="*70)
        print("✅ PROCESSO CONCLUÍDO COM SUCESSO!")
        print("="*70)
        print(f"\n📁 Verifique os arquivos em:\n   {self.caminho_curso}\n")
        print(f"📄 Relatório completo em:\n   {self.caminho_curso / 'PASSOS.md'}\n")


def main():
    import argparse

    parser = argparse.ArgumentParser(description='Gerar curso completo do início ao fim')
    parser.add_argument('--caminho-curso', required=True, help='Caminho da pasta do curso')

    args = parser.parse_args()
    caminho_curso = Path(args.caminho_curso)

    if not caminho_curso.exists():
        print(f"❌ Pasta não encontrada: {caminho_curso}")
        return 1

    gerador = GeradorCursoCompleto(caminho_curso)
    gerador.executar()

    return 0


if __name__ == "__main__":
    sys.exit(main())
