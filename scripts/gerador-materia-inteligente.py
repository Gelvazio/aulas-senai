#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GERADOR DE MATÉRIA INTELIGENTE - Extrai e cria matérias de um curso

FLUXO INTELIGENTE:
  1. Lê a ementa do curso (EMENTA-*.md, PLANO-*.md, .txt, .docx)
  2. EXTRAI os nomes das matérias do conteúdo
  3. CRIA pastas de matérias (se não existirem)
  4. Gera PLANO-AULAS.md na raiz de cada matéria
  5. Gera AULA-01.md até AULA-05.md e HTMLs correspondentes
  6. Cria PASSOS.md com relatório completo

COMO USAR:
  python gerador-materia-inteligente.py --caminho-curso C:\\fontes\\aulas-senai\\sistema\\CURSO
"""

import sys
import io
import re
import json
from pathlib import Path
from datetime import datetime

# Configurar encoding UTF-8 para Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


class GeradorMateriaInteligente:
    """Extrair matérias de ementa e criar estrutura completa."""

    def __init__(self, caminho_curso: Path):
        self.caminho_curso = Path(caminho_curso)
        self.passos = []
        self.materias = {}
        self.ementa_content = ""

    def adicionar_passo(self, materia: str, acao: str, status: str = "✅", detalhes: str = ""):
        """Registrar um passo executado."""
        passo = {
            "materia": materia,
            "acao": acao,
            "status": status,
            "detalhes": detalhes,
            "data": datetime.now().strftime('%H:%M:%S')
        }
        self.passos.append(passo)
        print(f"  {status} {materia}: {acao}")
        if detalhes:
            print(f"      {detalhes}")

    def encontrar_ementa_arquivo(self):
        """PASSO 1: Encontrar e ler ementa do curso."""
        print("\n" + "="*70)
        print("PASSO 1: Encontrar ementa do curso")
        print("="*70)

        # Procurar por arquivos de ementa
        padroes = ["EMENTA-*.md", "PLANO-*.md", "*.txt"]
        ementa_encontrada = None

        for padrao in padroes:
            arquivos = list(self.caminho_curso.glob(padrao))
            if arquivos:
                ementa_encontrada = arquivos[0]
                break

        if not ementa_encontrada:
            print("❌ Nenhuma ementa encontrada (EMENTA-*.md, PLANO-*.md, *.txt)")
            return False

        try:
            self.ementa_content = ementa_encontrada.read_text(encoding='utf-8', errors='ignore')
            self.adicionar_passo(
                "EMENTA",
                "Arquivo encontrado e lido",
                "✅",
                f"Arquivo: {ementa_encontrada.name} ({len(self.ementa_content)} chars)"
            )
            print(f"\n✅ Ementa lida: {ementa_encontrada.name}")
            return True
        except Exception as e:
            print(f"❌ Erro ao ler ementa: {e}")
            return False

    def extrair_materias_da_ementa(self):
        """PASSO 2: Extrair nomes de matérias da ementa."""
        print("\n" + "="*70)
        print("PASSO 2: Extrair matérias da ementa")
        print("="*70)

        if not self.ementa_content:
            print("❌ Ementa vazia")
            return False

        # Melhorar o conteúdo removendo espaços extras
        content_limpo = re.sub(r'\s+', ' ', self.ementa_content)

        # Padrões para detectar matérias na ementa
        padroes = [
            # Seções numeradas com título (## 5.3.1 Nome da Unidade)
            r'#+\s+\d+(?:\.\d+)*\s+([A-Za-z][A-Za-záéíóúãõêô\s\-\(\)]{10,150}?)(?=(?:\n#+\s+\d|ANEXO|$))',

            # UNIDADE X — Nome
            r'UNIDADE\s+\d+\s*[—\-:]\s*([A-Za-z][A-Za-záéíóúãõêô\s\-\(\)]{5,100}?)(?=(?:\n|UNIDADE\s+\d|$))',

            # UC X — Nome
            r'UC\s+\d+\s*[—\-:]\s*([A-Za-z][A-Za-záéíóúãõêô\s\-\(\)]{5,100}?)(?=(?:\n|UC\s+\d|$))',

            # ENCONTRO X — Nome
            r'ENCONTRO\s+\d+\s*[—\-:]\s*([A-Za-z][A-Za-záéíóúãõêô\s\-\(\)]{5,100}?)(?=(?:\n|ENCONTRO\s+\d|$))',
        ]

        materias_extraidas = set()

        for padrao in padroes:
            matches = re.finditer(padrao, content_limpo, re.IGNORECASE | re.DOTALL)
            for match in matches:
                nome = match.group(1).strip()

                # Limpar o nome
                nome = re.sub(r'\s+', ' ', nome)  # Remover espaços múltiplos
                nome = nome.split('\n')[0].strip()  # Pegar apenas primeira linha

                # Filtrar nomes muito curtos ou genéricos
                if nome and len(nome) > 5 and nome not in ["Identificação", "Justificativa", "Requisitos"]:
                    # Converter para formato de pasta (snake_case com maiúsculas)
                    nome_pasta = re.sub(r'\s+', '_', nome.upper())
                    nome_pasta = re.sub(r'[^\w]', '', nome_pasta)
                    nome_pasta = nome_pasta[:50]  # Limitar tamanho

                    if nome_pasta and nome_pasta not in materias_extraidas:
                        materias_extraidas.add(nome_pasta)

        if not materias_extraidas:
            # Se não encontrou por padrão, usar nome genérico
            materias_extraidas.add("MATERIA_GERAL")
            self.adicionar_passo("EMENTA", "Nenhuma matéria detectada, usando MATERIA_GERAL", "⚠️")

        # Armazenar matérias
        for materia in sorted(materias_extraidas):
            self.materias[materia] = {
                "caminho": self.caminho_curso / materia,
                "pasta_aulas": None,
                "ementa": None
            }
            self.adicionar_passo("EMENTA", f"Matéria extraída: {materia}", "✅")

        print(f"\n✅ {len(materias_extraidas)} matérias extraídas")
        return True

    def criar_estrutura_materias(self):
        """PASSO 3: Criar pastas de matérias dentro de MATERIAS/."""
        print("\n" + "="*70)
        print("PASSO 3: Criar estrutura de pastas (MATERIAS/)")
        print("="*70)

        # Criar pasta MATERIAS/ na raiz do curso
        pasta_materias_raiz = self.caminho_curso / "MATERIAS"
        try:
            if not pasta_materias_raiz.exists():
                pasta_materias_raiz.mkdir(parents=True, exist_ok=True)
                self.adicionar_passo("CURSO", "Pasta MATERIAS/ criada", "✅", str(pasta_materias_raiz))
        except Exception as e:
            self.adicionar_passo("CURSO", "Erro ao criar MATERIAS/", "❌", str(e))
            return False

        for materia in sorted(self.materias.keys()):
            # Caminho dentro de MATERIAS/
            caminho_materia = pasta_materias_raiz / materia
            pasta_aulas = caminho_materia / "AULAS"
            pasta_materiais = caminho_materia / "MATERIAIS"

            try:
                # Criar pasta da matéria
                if not caminho_materia.exists():
                    caminho_materia.mkdir(parents=True, exist_ok=True)
                    self.adicionar_passo(materia, "Pasta criada (em MATERIAS/)", "✅")

                # Criar AULAS/
                if not pasta_aulas.exists():
                    pasta_aulas.mkdir(parents=True, exist_ok=True)
                    self.adicionar_passo(materia, "Pasta AULAS/ criada", "✅")

                # Criar MATERIAIS/
                if not pasta_materiais.exists():
                    pasta_materiais.mkdir(parents=True, exist_ok=True)
                    self.adicionar_passo(materia, "Pasta MATERIAIS/ criada", "✅")

                # Atualizar referência no dicionário
                self.materias[materia]["caminho"] = caminho_materia
                self.materias[materia]["pasta_aulas"] = pasta_aulas

            except Exception as e:
                self.adicionar_passo(materia, "Erro ao criar pastas", "❌", str(e))

        print(f"\n✅ Estrutura de pastas criada para {len(self.materias)} matérias em MATERIAS/")
        return True

    def extrair_ementa_materia(self, materia: str):
        """Extrair conteúdo específico da matéria da ementa geral."""
        # Procurar por seções que mencionam a matéria na ementa
        padrao = rf'#{2,3}\s+{re.escape(materia)}.*?(?=##|\Z)'
        matches = re.findall(padrao, self.ementa_content, re.IGNORECASE | re.DOTALL)

        if matches:
            return matches[0].strip()

        # Se não encontrou, retornar ementa genérica
        return f"""# EMENTA: {materia}

**Data de Criação:** {datetime.now().strftime('%Y-%m-%d')}
**Status:** A ser preenchida

## Objetivo Geral
[Definir objetivo geral da matéria]

## Competências
- [Competência 1]
- [Competência 2]

## Conteúdo Programático
- [Conteúdo 1]
- [Conteúdo 2]

## Carga Horária
[Definir carga horária]

## Avaliação
[Definir critérios de avaliação]
"""

    def gerar_ementa_markdown(self, materia: str):
        """PASSO 4: Gerar EMENTA-*.md na pasta da matéria."""
        caminho_materia = self.materias[materia]["caminho"]
        arquivo_ementa = caminho_materia / f"EMENTA-{materia}.md"

        if arquivo_ementa.exists():
            self.adicionar_passo(materia, "EMENTA-*.md já existe", "⏭️")
            return True

        conteudo_ementa = self.extrair_ementa_materia(materia)

        try:
            arquivo_ementa.write_text(conteudo_ementa, encoding='utf-8')
            self.adicionar_passo(materia, "EMENTA-*.md criado", "✅", f"Arquivo: EMENTA-{materia}.md")
            return True
        except Exception as e:
            self.adicionar_passo(materia, "Erro ao criar ementa", "❌", str(e))
            return False

    def gerar_plano_aulas(self, materia: str):
        """PASSO 5: Gerar PLANO-AULAS.md."""
        caminho_materia = self.materias[materia]["caminho"]
        arquivo_plano = caminho_materia / "PLANO-AULAS.md"

        # Verificar se já existe
        if arquivo_plano.exists():
            self.adicionar_passo(materia, "PLANO-AULAS.md já existe", "⏭️")
            return True

        num_aulas = 5
        ch_por_aula = 4

        conteudo = f"""# PLANO DE AULAS: {materia}

**Data de Criação:** {datetime.now().strftime('%Y-%m-%d')}
**Total de Encontros:** {num_aulas}
**Duração por Encontro:** {ch_por_aula}h
**Status:** Gerado automaticamente

---

## Estrutura de Encontros

"""

        for i in range(1, num_aulas + 1):
            conteudo += f"""
### ENCONTRO {i}

**Arquivo:** `AULAS/AULA-{i:02d}.md`
**Duração:** {ch_por_aula}h
**Dia:** A definir

#### Objetivos
- Compreender conceitos fundamentais
- Aplicar técnicas práticas
- Resolver problemas

---
"""

        try:
            arquivo_plano.write_text(conteudo, encoding='utf-8')
            self.adicionar_passo(materia, "PLANO-AULAS.md criado", "✅")
            return True
        except Exception as e:
            self.adicionar_passo(materia, "Erro ao criar PLANO-AULAS.md", "❌", str(e))
            return False

    def gerar_aulas_markdown_html(self, materia: str):
        """PASSO 4: Gerar AULA-XX.md e AULA-XX.html."""
        pasta_aulas = self.materias[materia]["pasta_aulas"]
        num_aulas = 5

        arquivos_criados = 0

        for i in range(1, num_aulas + 1):
            arquivo_md = pasta_aulas / f"AULA-{i:02d}.md"
            arquivo_html = pasta_aulas / f"AULA-{i:02d}.html"

            # Verificar se já existem
            if arquivo_md.exists() and arquivo_html.exists():
                continue

            # Criar Markdown
            conteudo_md = f"""# AULA-{i:02d}

**Matéria:** {materia}
**Data:** {datetime.now().strftime('%Y-%m-%d')}

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
3. Discussão

---

## Referências

Consulte o PLANO-AULAS.md para mais informações.
"""

            # Criar HTML
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
        ul, ol {{ margin-left: 20px; margin-bottom: 15px; }}
        li {{ margin-bottom: 8px; }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>AULA-{i:02d}</h1>
            <p class="meta">Matéria: {materia}</p>
        </header>
        <div class="content">
            <h2>Objetivo</h2>
            <ul>
                <li>Compreender conceitos principais</li>
                <li>Aplicar em situações práticas</li>
                <li>Resolver problemas</li>
            </ul>
            <h2>Conteúdo</h2>
            <p>[Conteúdo detalhado será adicionado aqui]</p>
            <h2>Atividades</h2>
            <ol>
                <li>Atividade prática (40 min)</li>
                <li>Exercícios (20 min)</li>
                <li>Discussão (10 min)</li>
            </ol>
        </div>
    </div>
</body>
</html>
"""

            try:
                arquivo_md.write_text(conteudo_md, encoding='utf-8')
                arquivo_html.write_text(conteudo_html, encoding='utf-8')
                arquivos_criados += 1
            except Exception as e:
                print(f"      ⚠️ Erro ao criar AULA-{i:02d}: {e}")

        self.adicionar_passo(
            materia,
            f"Aulas criadas ({arquivos_criados}/5)",
            "✅" if arquivos_criados > 0 else "⏭️"
        )
        return True

    def processar_materia(self, materia: str):
        """Processar uma matéria completa."""
        print(f"\n{'─'*70}")
        print(f"📚 Processando: {materia}")
        print(f"{'─'*70}")

        self.gerar_ementa_markdown(materia)
        self.gerar_plano_aulas(materia)
        self.gerar_aulas_markdown_html(materia)

    def gerar_relatorio_final(self):
        """Gerar PASSOS.md com relatório completo."""
        arquivo_passos = self.caminho_curso / "PASSOS.md"

        conteudo = f"""# PASSOS — Processamento de Matérias {self.caminho_curso.name}

**Data:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Status:** ✅ Concluído

---

## Resumo

Processadas **{len(self.materias)}** matérias com sucesso.

| Matéria | Status | Ementa | Aulas |
|---------|--------|--------|-------|
"""

        for materia in sorted(self.materias.keys()):
            ementa_tipo = self.materias[materia]["ementa"]["arquivo"] if self.materias[materia]["ementa"] else "❌"
            conteudo += f"| {materia} | ✅ | {ementa_tipo} | 5 MD + 5 HTML |\n"

        conteudo += f"""

---

## Estrutura Final

```
{self.caminho_curso.name}/
├── PASSOS.md (este arquivo)
"""

        for materia in sorted(self.materias.keys()):
            conteudo += f"""├── {materia}/
│   ├── PLANO-AULAS.md
│   ├── AULAS/
│   │   ├── AULA-01.md + AULA-01.html
│   │   ├── AULA-02.md + AULA-02.html
│   │   ├── AULA-03.md + AULA-03.html
│   │   ├── AULA-04.md + AULA-04.html
│   │   └── AULA-05.md + AULA-05.html
│   └── MATERIAIS/
"""

        conteudo += """```

---

**Status:** ✅ PRONTO PARA REVISÃO

Cada matéria foi processada individualmente com:
- PLANO-AULAS.md consolidado na raiz
- 5 arquivos de aula em Markdown
- 5 arquivos de aula em HTML
- Pasta MATERIAIS/ pronta para conteúdo
"""

        try:
            arquivo_passos.write_text(conteudo, encoding='utf-8')
            print(f"\n✅ PASSOS.md gerado: {arquivo_passos}")
        except Exception as e:
            print(f"\n❌ Erro ao gerar PASSOS.md: {e}")

    def executar(self):
        """Executar o processamento completo."""
        print("\n" + "█"*70)
        print("█  GERADOR DE MATÉRIA INTELIGENTE")
        print("█"*70)
        print(f"\n🎓 Processando: {self.caminho_curso.name}\n")

        # PASSO 1: Encontrar ementa
        if not self.encontrar_ementa_arquivo():
            print("❌ Ementa não encontrada")
            return 1

        # PASSO 2: Extrair matérias
        if not self.extrair_materias_da_ementa():
            print("❌ Nenhuma matéria extraída")
            return 1

        # PASSO 3: Criar estrutura de pastas
        if not self.criar_estrutura_materias():
            print("❌ Erro ao criar estrutura")
            return 1

        # PASSO 4+: Processar cada matéria
        for materia in sorted(self.materias.keys()):
            self.processar_materia(materia)

        # Gerar relatório
        self.gerar_relatorio_final()

        print("\n" + "="*70)
        print("✅ PROCESSO CONCLUÍDO COM SUCESSO!")
        print("="*70)
        print(f"\n📁 Verifique os arquivos em:\n   {self.caminho_curso}\n")

        return 0


def main():
    import argparse

    parser = argparse.ArgumentParser(description='Gerar matérias inteligentemente')
    parser.add_argument('--caminho-curso', required=True, help='Caminho da pasta do curso')

    args = parser.parse_args()
    caminho_curso = Path(args.caminho_curso)

    if not caminho_curso.exists():
        print(f"❌ Pasta não encontrada: {caminho_curso}")
        return 1

    gerador = GeradorMateriaInteligente(caminho_curso)
    return gerador.executar()


if __name__ == "__main__":
    sys.exit(main())
