#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GERADOR DE PLANO DE AULAS - Lê ementa e gera PLANO-AULAS.md

PROPÓSITO:
  Ler arquivo EMENTA-PRINCIPAL-*.md de cada curso
  Extrair estrutura de conteúdo e módulos
  Criar PLANO-AULAS.md estruturado com:
  - Encontros numerados (1 a N)
  - Objetivos por encontro
  - Conteúdo detalhado
  - Duração estimada
  - Metodologia e avaliação

ESTRUTURA ESPERADA DA EMENTA:
  # EMENTA: Curso Name

  ## Informações Gerais
  - Carga horária: XYZ horas
  - Total de aulas: N encontros

  ## Conteúdo Programático
  ### Módulo 1: Nome
  - Tópico 1.1
  - Tópico 1.2

  ### Módulo 2: Nome
  - Tópico 2.1

SAÍDA:
  PLANO-AULAS.md (em cada pasta de curso)
  - ENCONTRO 1: Introdução
  - ENCONTRO 2: Desenvolvimento
  - etc.

COMO USAR:
  python gerador-plano-aula.py                    # Processa todos
  python gerador-plano-aula.py --pasta MECANICA   # Pasta específica
"""

import sys
import io
import re
from pathlib import Path
from datetime import datetime

# Configurar encoding UTF-8 para Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


class GeradorPlanoAula:
    """Gerar PLANO-AULAS.md a partir de ementa."""

    def __init__(self, caminho_curso: Path):
        self.caminho_curso = Path(caminho_curso)
        self.ementa_arquivo = None
        self.conteudo_ementa = None

    def encontrar_ementa(self) -> bool:
        """Procurar por arquivo EMENTA-PRINCIPAL-*.md"""
        arquivos_ementa = list(self.caminho_curso.glob("EMENTA-PRINCIPAL-*.md"))

        if not arquivos_ementa:
            # Tentar EMENTA-*.md
            arquivos_ementa = list(self.caminho_curso.glob("EMENTA-*.md"))

        if not arquivos_ementa:
            return False

        self.ementa_arquivo = arquivos_ementa[0]
        return True

    def ler_ementa(self) -> bool:
        """Ler conteúdo da ementa."""
        try:
            with open(self.ementa_arquivo, 'r', encoding='utf-8') as f:
                self.conteudo_ementa = f.read()
            return True
        except Exception as e:
            print(f"  Erro ao ler ementa: {e}")
            return False

    def extrair_carga_horaria(self) -> int:
        """Extrair carga horária da ementa."""
        # Procurar padrões comuns
        padroes = [
            r'Carga hor[aá]ria[:\s]+(\d+)\s*h',
            r'(\d+)\s*horas?\s*(?:de\s*)?aula',
            r'Duração[:\s]+(\d+)\s*h',
            r'Total[:\s]+(\d+)\s*h',
        ]

        for padrao in padroes:
            match = re.search(padrao, self.conteudo_ementa, re.IGNORECASE)
            if match:
                return int(match.group(1))

        return 30  # Padrão: 30 horas

    def extrair_modulos(self) -> list:
        """Extrair módulos e conteúdo da ementa."""
        modulos = []

        # Procurar por seções "## " ou "### Módulo"
        linhas = self.conteudo_ementa.split('\n')

        modulo_atual = None
        conteudo_atual = []

        for linha in linhas:
            # Módulo novo
            if re.match(r'^###?\s+(?:M[óo]dulo\s+)?(\d+)?[:\s]*(.+)$', linha, re.IGNORECASE):
                # Salvar módulo anterior
                if modulo_atual:
                    modulos.append({
                        'nome': modulo_atual,
                        'conteudo': conteudo_atual
                    })

                # Novo módulo
                match = re.match(r'^###?\s+(?:M[óo]dulo\s+)?(\d+)?[:\s]*(.+)$', linha, re.IGNORECASE)
                modulo_atual = match.group(2).strip()
                conteudo_atual = []

            # Tópico (líneas com - ou *)
            elif modulo_atual and re.match(r'^\s*[-*]\s+(.+)$', linha):
                match = re.match(r'^\s*[-*]\s+(.+)$', linha)
                topico = match.group(1).strip()
                if topico and not topico.startswith('http'):
                    conteudo_atual.append(topico)

            # Linhas com números (1.1, 2.1, etc)
            elif modulo_atual and re.match(r'^\s*\d+\.\d+\s+', linha):
                conteudo_atual.append(linha.strip())

        # Salvar último módulo
        if modulo_atual:
            modulos.append({
                'nome': modulo_atual,
                'conteudo': conteudo_atual
            })

        return modulos if modulos else [
            {'nome': 'Conceitos Fundamentais', 'conteudo': ['Introdução e fundamentos']},
            {'nome': 'Desenvolvimento Prático', 'conteudo': ['Aplicação e prática']},
        ]

    def gerar_plano_aulas(self, modulos: list, ch_total: int) -> str:
        """Gerar conteúdo do PLANO-AULAS.md."""
        nome_curso = self.caminho_curso.name.replace('_', ' ').title()
        data_hoje = datetime.now().strftime('%Y-%m-%d')

        # Estimar número de encontros (2-4 horas por encontro)
        num_encontros = max(5, ch_total // 4)
        ch_por_encontro = ch_total // num_encontros

        plano = f"""# PLANO DE AULAS: {nome_curso}

**Data de Criação:** {data_hoje}
**Carga Horária Total:** {ch_total}h
**Total de Encontros:** {num_encontros}
**Duração por Encontro:** {ch_por_encontro}h
**Status:** Gerado automaticamente por gerador-plano-aula.py

---

## Estrutura de Encontros

"""

        # Distribuir módulos entre encontros
        encontro_num = 1
        modulos_por_encontro = max(1, len(modulos) / num_encontros) if modulos else 1

        for idx, modulo in enumerate(modulos):
            # Determinar em qual encontro este módulo se enquadra
            encontro_idx = int(idx / modulos_por_encontro)
            if encontro_idx >= num_encontros:
                encontro_idx = num_encontros - 1

            encontro_num = encontro_idx + 1

            # Primeiro encontro do módulo
            if idx % max(1, int(modulos_por_encontro)) == 0:
                plano += f"""
### ENCONTRO {encontro_num} — {modulo['nome']}

**Duração:** {ch_por_encontro}h
**Dia:** A definir

#### Objetivos de Aprendizagem
- Compreender conceitos de {modulo['nome'].lower()}
- Aplicar conhecimentos práticos de {modulo['nome'].lower()}
- Desenvolver habilidades técnicas

#### Conteúdo Programático

"""
                if modulo['conteudo']:
                    for topico in modulo['conteudo'][:5]:  # Max 5 tópicos por encontro
                        plano += f"- {topico}\n"
                else:
                    plano += f"- {modulo['nome']}\n"

                plano += f"""
#### Estratégias de Ensino
1. Aula expositiva com exemplos práticos (30 min)
2. Atividades em grupo ou duplas (60 min)
3. Apresentação de resultados (15 min)
4. Discussão e feedback (15 min)

#### Atividades Práticas

**Atividade Principal:** Exercício prático sobre {modulo['nome']}
- **Objetivo:** Aplicar conceitos em situação real
- **Duração:** 60 minutos
- **Recursos:** Computador, software específico (conforme UC)

**Atividade Complementar:** Leitura e reflexão
- **Texto/Recurso:** Material complementar
- **Entrega:** Próximo encontro

#### Recursos Necessários
- Computador com internet
- Software específico (conforme UC)
- Projetor/tela
- Quadro branco
- Slides/material didático

#### Avaliação Formativa
- Observação de participação (25%)
- Atividade prática realizada (50%)
- Engajamento em discussões (25%)

#### Próximo Encontro
ENCONTRO {encontro_num + 1} — {modulos[idx + 1]['nome'] if idx + 1 < len(modulos) else 'Conclusão e Síntese'}

---
"""

        # Encontro final (síntese e avaliação)
        plano += f"""
### ENCONTRO {num_encontros} — Síntese e Avaliação Final

**Duração:** {ch_por_encontro}h
**Dia:** A definir

#### Objetivos
- Consolidar conhecimentos adquiridos
- Realizar avaliação formativa final
- Reflexão sobre aprendizagem

#### Conteúdo
- Revisão de conceitos-chave
- Análise de casos práticos
- Preparação para validação de competências

#### Atividades
- Revisão colaborativa (30 min)
- Prova escrita ou prática (60 min)
- Feedback e encerramento (30 min)

#### Critérios de Avaliação
- Assiduidade: ✓
- Participação: ✓
- Avaliações formativas: ✓
- Atividades práticas: ✓
- Avaliação final: Nota ≥ 7,0

---

## Referências Bibliográficas

Consulte a ementa oficial (EMENTA-PRINCIPAL-{nome_curso.replace(' ', '-').upper()}.md) para:
- Referências completas
- Metodologia detalhada
- Competências abordadas
- Legislação aplicável

---

## Notas Importantes

- ⚠️ **Este plano foi gerado automaticamente** e deve ser revisado/adaptado pelo professor
- ✏️ **Datas e encontros** devem ser definidos conforme calendário escolar
- 📅 **Cronograma** sujeito a ajustes pedagógicos necessários
- 🔄 **Recursos** podem variar conforme disponibilidade local

---

**Gerado em:** {data_hoje}
**Próxima revisão:** Recomendada ao final do semestre
**Responsável:** Professor(a) responsável pela UC
"""

        return plano

    def salvar_plano(self, plano: str) -> bool:
        """Salvar PLANO-AULAS.md na pasta do curso."""
        try:
            arquivo_saida = self.caminho_curso / "PLANO-AULAS.md"
            with open(arquivo_saida, 'w', encoding='utf-8') as f:
                f.write(plano)
            return True
        except Exception as e:
            print(f"  Erro ao salvar: {e}")
            return False

    def processar(self) -> bool:
        """Executar pipeline completo."""
        if not self.encontrar_ementa():
            print(f"  ⚠️ Ementa não encontrada")
            return False

        if not self.ler_ementa():
            print(f"  ❌ Erro ao ler ementa")
            return False

        # Extrair informações
        ch_total = self.extrair_carga_horaria()
        modulos = self.extrair_modulos()

        # Gerar plano
        plano = self.gerar_plano_aulas(modulos, ch_total)

        # Salvar
        if self.salvar_plano(plano):
            print(f"  ✅ PLANO-AULAS.md criado ({len(plano)} caracteres)")
            return True

        return False


def main():
    pasta_sistema = Path(__file__).parent.parent / "sistema"
    excluir = {'.claude', 'assets', 'GERADOR-AULAS', '.vscode', '.git', '__pycache__'}

    print("\nGerador de Plano de Aulas - Lendo Ementas")
    print("=" * 70)
    print(f"Pasta: {pasta_sistema}\n")

    processados = 0
    erros = 0

    # Processar cada pasta de curso
    for curso_pasta in sorted(pasta_sistema.iterdir()):
        if not curso_pasta.is_dir() or curso_pasta.name in excluir:
            continue

        print(f"  {curso_pasta.name}...", end=" ")

        gerador = GeradorPlanoAula(curso_pasta)
        if gerador.processar():
            processados += 1
        else:
            erros += 1

    print("\n" + "=" * 70)
    print(f"✅ Processados: {processados} | ❌ Erros: {erros}")
    print("=" * 70)


if __name__ == "__main__":
    main()
