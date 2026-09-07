#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GERADOR DE PASTAS DE AULAS COM PLANO - Cria pastas AULA-XX e PLANO-AULAS.md em cada

PROPÓSITO:
  Ler ementa de uma matéria
  Criar pastas: AULA-01/, AULA-02/, etc
  Colocar PLANO-AULAS.md em cada pasta com conteúdo específico daquela aula

ESTRUTURA GERADA:
  {materia}/
  ├── AULAS/
  │   ├── AULA-01/
  │   │   └── PLANO-AULAS.md
  │   ├── AULA-02/
  │   │   └── PLANO-AULAS.md
  │   └── ...
  ├── EMENTA-PRINCIPAL-*.md
  └── PLANO-AULAS.md (ementa consolidada)

COMO USAR:
  python gerador-pastas-aulas-com-plano.py --caminho-curso ../sistema/CURSO
"""

import sys
import io
import re
import argparse
from pathlib import Path
from datetime import datetime

# Configurar encoding UTF-8 para Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


class GeradorPastasAulasComPlano:
    """Gerar pastas de aulas com PLANO-AULAS.md em cada uma."""

    def __init__(self, caminho_materia: Path):
        self.caminho_materia = Path(caminho_materia)
        self.pasta_aulas = self.caminho_materia / "AULAS"
        self.ementa_arquivo = None
        self.conteudo_ementa = None

    def encontrar_ementa(self) -> bool:
        """Procurar por arquivo EMENTA-PRINCIPAL-*.md ou PLANO-AULAS.md"""
        # Procurar EMENTA-PRINCIPAL-*.md
        arquivos_ementa = list(self.caminho_materia.glob("EMENTA-PRINCIPAL-*.md"))

        if not arquivos_ementa:
            # Procurar PLANO-AULAS.md (ementa consolidada)
            arquivos_ementa = list(self.caminho_materia.glob("PLANO-AULAS.md"))

        if not arquivos_ementa:
            # Procurar EMENTA-*.md
            arquivos_ementa = list(self.caminho_materia.glob("EMENTA-*.md"))

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
            print(f"    Erro ao ler ementa: {e}")
            return False

    def extrair_modulos(self) -> dict:
        """Extrair módulos e tópicos da ementa."""
        modulos = {}
        linhas = self.conteudo_ementa.split('\n')
        modulo_atual = None
        topicos = []

        for linha in linhas:
            # Encontro/Módulo novo (###, #### ENCONTRO, ### MÓDULO)
            if re.match(r'^#{3,4}\s+(?:ENCONTRO|M[óo]DULO)?\s*(\d+)?[:\s]*(.+)$', linha, re.IGNORECASE):
                # Salvar módulo anterior
                if modulo_atual and topicos:
                    modulos[modulo_atual] = topicos

                # Novo módulo
                match = re.match(r'^#{3,4}\s+(?:ENCONTRO|M[óo]DULO)?\s*(\d+)?[:\s]*(.+)$', linha, re.IGNORECASE)
                num = match.group(1) or str(len(modulos) + 1)
                nome = match.group(2).strip()
                modulo_atual = f"AULA-{int(num):02d}"
                topicos = [nome]  # Começar com o título como primeiro tópico

            # Tópicos (-, *, ou linhas com #####)
            elif modulo_atual:
                if re.match(r'^\s*[-*]\s+(.+)$', linha):
                    match = re.match(r'^\s*[-*]\s+(.+)$', linha)
                    topico = match.group(1).strip()
                    if topico and len(topico) > 3 and not topico.startswith('http'):
                        topicos.append(topico)

                elif re.match(r'^#{5,}\s+(.+)$', linha):
                    match = re.match(r'^#{5,}\s+(.+)$', linha)
                    subtopico = match.group(1).strip()
                    if subtopico and len(subtopico) > 3:
                        topicos.append(f"  • {subtopico}")

        # Salvar último módulo
        if modulo_atual and topicos:
            modulos[modulo_atual] = topicos

        return modulos if modulos else {"AULA-01": ["Conteúdo introdutório"]}

    def criar_pasta_aula(self, aula_nome: str, topicos: list) -> bool:
        """Criar pasta e PLANO-AULAS.md para uma aula."""
        pasta_aula = self.pasta_aulas / aula_nome

        try:
            pasta_aula.mkdir(parents=True, exist_ok=True)
        except Exception as e:
            print(f"    Erro ao criar pasta: {e}")
            return False

        # Gerar conteúdo do PLANO-AULAS.md
        titulo_aula = topicos[0] if topicos else aula_nome.replace('-', ' ').title()
        conteudo = f"""# {aula_nome.replace('-', ' ').upper()} — {titulo_aula}

**Data de Criação:** {datetime.now().strftime('%Y-%m-%d')}
**Status:** Plano gerado automaticamente

---

## Objetivo de Aprendizagem

Ao final desta aula, você será capaz de:
- Compreender os conceitos principais
- Aplicar técnicas e procedimentos
- Resolver problemas práticos

---

## Conteúdo Programático

"""

        # Adicionar tópicos
        if topicos:
            for idx, topico in enumerate(topicos[1:], 1):  # Pular o título
                conteudo += f"{topico}\n"

        conteudo += f"""

---

## Estratégias de Ensino

1. **Exposição Dialogada** (20 min)
   - Apresentação de conceitos principais
   - Exemplos práticos
   - Esclarecimento de dúvidas

2. **Atividade Prática** (40 min)
   - Exercício prático guiado
   - Resolução de problemas
   - Aplicação em situação real

3. **Discussão e Síntese** (20 min)
   - Síntese do aprendido
   - Reflexão sobre aplicações
   - Preparação para próxima aula

---

## Atividades Práticas

### Atividade Principal
**Objetivo:** Aplicar conceitos em projeto prático
**Duração:** 40 minutos
**Recursos:** Computador, software específico (conforme UC)

**Procedimento:**
1. Análise do problema proposto
2. Desenvolvimento da solução
3. Teste e validação
4. Apresentação dos resultados

### Atividade Complementar
**Tipo:** Leitura e pesquisa
**Entrega:** Próxima aula
**Descrição:** Material complementar para aprofundamento

---

## Recursos Necessários

- Computador com internet
- Software específico (conforme UC)
- Projetor/tela
- Quadro branco e marcadores
- Slides/material didático
- Exemplos práticos

---

## Avaliação Formativa

**Critérios de Avaliação:**
- Participação em atividades: 25%
- Execução prática: 50%
- Compreensão de conceitos: 25%

**Indicadores de Sucesso:**
- ✓ Participou das discussões
- ✓ Completou atividade prática
- ✓ Demonstrou compreensão dos conceitos

---

## Referências e Recursos

Consulte a ementa principal (EMENTA-PRINCIPAL-*.md) para:
- Referências bibliográficas completas
- Legislação aplicável
- Competências abordadas

---

## Notas Importantes

⚠️ **Este plano foi gerado automaticamente** e deve ser:
- Revisado e adaptado pelo professor
- Ajustado conforme necessidade pedagógica
- Atualizado com exemplos locais e atuais

---

**Gerado em:** {datetime.now().strftime('%Y-%m-%d %H:%M')}
**Próxima Aula:** {self._proxima_aula(aula_nome)}
"""

        # Salvar PLANO-AULAS.md
        arquivo_plano = pasta_aula / "PLANO-AULAS.md"
        try:
            with open(arquivo_plano, 'w', encoding='utf-8') as f:
                f.write(conteudo)
            return True
        except Exception as e:
            print(f"    Erro ao salvar PLANO-AULAS.md: {e}")
            return False

    def _proxima_aula(self, aula_nome: str) -> str:
        """Calcular nome da próxima aula."""
        match = re.search(r'(\d+)', aula_nome)
        if match:
            num = int(match.group(1))
            return f"AULA-{num+1:02d}"
        return "Próxima aula"

    def processar(self) -> bool:
        """Executar pipeline completo."""
        if not self.pasta_aulas.exists():
            print(f"    ⚠️ Pasta AULAS não encontrada")
            return False

        if not self.encontrar_ementa():
            print(f"    ⚠️ Ementa não encontrada")
            return False

        if not self.ler_ementa():
            print(f"    ❌ Erro ao ler ementa")
            return False

        # Extrair módulos
        modulos = self.extrair_modulos()

        if not modulos:
            print(f"    ⚠️ Nenhum módulo encontrado")
            return False

        # Criar pastas e PLANOs
        sucesso_count = 0
        for aula_nome, topicos in sorted(modulos.items()):
            if self.criar_pasta_aula(aula_nome, topicos):
                sucesso_count += 1

        if sucesso_count > 0:
            print(f"    ✅ {sucesso_count} pastas de aula criadas com PLANO-AULAS.md")
            return True

        return False


def main():
    parser = argparse.ArgumentParser(
        description='Gerar pastas de aulas com PLANO-AULAS.md em cada pasta'
    )
    parser.add_argument(
        '--caminho-curso',
        required=True,
        help='Caminho da pasta do curso (ex: ../sistema/CURSO)'
    )

    args = parser.parse_args()
    caminho_curso = Path(args.caminho_curso)

    print("\nGerador de Pastas de Aulas com Plano")
    print("=" * 70)

    if not caminho_curso.exists():
        print(f"❌ Pasta não encontrada: {caminho_curso}")
        return 1

    # Processar matérias no curso
    processados = 0
    erros = 0

    for materia_pasta in sorted(caminho_curso.iterdir()):
        if not materia_pasta.is_dir():
            continue

        if not (materia_pasta / "AULAS").exists():
            continue

        print(f"\n  {materia_pasta.name}...", end=" ")

        gerador = GeradorPastasAulasComPlano(materia_pasta)
        if gerador.processar():
            processados += 1
        else:
            erros += 1

    print("\n" + "=" * 70)
    print(f"✅ Processados: {processados} | ❌ Erros: {erros}")
    print("=" * 70)

    return 0 if erros == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
