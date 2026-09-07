#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GERADOR DE AULAS COM PLANO - Cria arquivos AULA-XX.md e PLANO-AULAS.md na raiz

PROPÓSITO:
  Ler ementa de uma matéria
  Criar arquivos: AULA-01.md, AULA-02.md, etc na pasta AULAS/
  Criar PLANO-AULAS.md consolidado na RAIZ DA MATERIA

ESTRUTURA GERADA:
  {materia}/
  ├── PLANO-AULAS.md ✅ (NA RAIZ - CONSOLIDADO)
  ├── AULAS/
  │   ├── AULA-01.md
  │   ├── AULA-02.md
  │   └── ...
  └── EMENTA-PRINCIPAL-*.md

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


class GeradorAulasComPlano:
    """Gerar arquivos de aulas + PLANO-AULAS.md consolidado na raiz."""

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

    def criar_arquivo_aula(self, aula_nome: str, topicos: list) -> bool:
        """Criar arquivo AULA-XX.md com conteúdo específico da aula."""
        titulo_aula = topicos[0] if topicos else aula_nome.replace('-', ' ').title()

        conteudo = f"""# {aula_nome.replace('-', ' ').upper()} — {titulo_aula}

**Data de Criação:** {datetime.now().strftime('%Y-%m-%d')}
**Status:** Conteúdo da aula

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
            for topico in topicos[1:]:  # Pular o título
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

**Gerado em:** {datetime.now().strftime('%Y-%m-%d %H:%M')}
"""

        # Salvar AULA-XX.md na pasta AULAS/
        arquivo_aula = self.pasta_aulas / f"{aula_nome}.md"
        try:
            with open(arquivo_aula, 'w', encoding='utf-8') as f:
                f.write(conteudo)
            return True
        except Exception as e:
            print(f"    Erro ao salvar {aula_nome}.md: {e}")
            return False

    def gerar_plano_consolidado(self, modulos: dict) -> bool:
        """Gerar PLANO-AULAS.md consolidado NA RAIZ DA MATERIA."""
        titulo_materia = self.caminho_materia.name.replace('_', ' ').title()
        data_hoje = datetime.now().strftime('%Y-%m-%d')

        # Estimar número de encontros
        num_encontros = len(modulos)
        ch_por_encontro = 4  # Padrão: 4 horas por encontro

        plano = f"""# PLANO DE AULAS: {titulo_materia}

**Data de Criação:** {data_hoje}
**Total de Encontros:** {num_encontros}
**Duração por Encontro:** {ch_por_encontro}h
**Carga Horária Total:** {num_encontros * ch_por_encontro}h
**Status:** Gerado automaticamente por gerador-pastas-aulas-com-plano.py

---

## Estrutura de Encontros

"""

        # Adicionar cada encontro/aula
        for idx, (aula_nome, topicos) in enumerate(sorted(modulos.items()), 1):
            titulo_aula = topicos[0] if topicos else aula_nome.replace('-', ' ').title()

            plano += f"""
### ENCONTRO {idx} — {titulo_aula}

**Arquivo:** `AULAS/{aula_nome}.md`
**Duração:** {ch_por_encontro}h
**Dia:** A definir

#### Objetivos de Aprendizagem
- Compreender os conceitos principais
- Aplicar técnicas e procedimentos
- Resolver problemas práticos

#### Conteúdo Programático

"""

            # Adicionar tópicos (resumo)
            if topicos:
                for topico in topicos[1:3]:  # Mostrar apenas 2-3 tópicos como resumo
                    plano += f"- {topico}\n"
                if len(topicos) > 3:
                    plano += f"- ... (ver {aula_nome}.md para conteúdo completo)\n"

            plano += f"""
#### Estratégias de Ensino
1. Exposição Dialogada (20 min)
2. Atividade Prática (40 min)
3. Discussão e Síntese (20 min)

#### Recursos Necessários
- Computador com internet
- Software específico (conforme UC)
- Projetor/tela
- Quadro branco

#### Avaliação Formativa
- Participação: 25%
- Atividade prática: 50%
- Compreensão: 25%

---
"""

        # Resumo final
        plano += f"""
## Resumo Geral de Aulas

| Encontro | Arquivo | Título | Duração | Status |
|----------|---------|--------|---------|--------|
"""

        for idx, (aula_nome, topicos) in enumerate(sorted(modulos.items()), 1):
            titulo_aula = topicos[0] if topicos else aula_nome.replace('-', ' ').title()
            plano += f"| {idx} | `{aula_nome}.md` | {titulo_aula} | {ch_por_encontro}h | ⏳ |\n"

        plano += f"""

**Total:** {num_encontros} encontros × {ch_por_encontro}h = {num_encontros * ch_por_encontro}h

---

## Estrutura de Arquivos

```
{self.caminho_materia.name}/
├── PLANO-AULAS.md (este arquivo)
├── AULAS/
│   ├── AULA-01.md
│   ├── AULA-02.md
│   ├── AULA-03.md
│   └── ...
├── EMENTA-PRINCIPAL-*.md
└── ...
```

---

## Notas Importantes

⚠️ **Este plano foi gerado automaticamente** e deve ser:
- Revisado e adaptado pelo professor
- Ajustado conforme necessidade pedagógica
- Atualizado com exemplos locais e atuais

---

**Gerado em:** {data_hoje}
**Próxima Revisão:** Recomendada ao final do semestre
"""

        # Salvar PLANO-AULAS.md na RAIZ da matéria
        arquivo_plano = self.caminho_materia / "PLANO-AULAS.md"
        try:
            with open(arquivo_plano, 'w', encoding='utf-8') as f:
                f.write(plano)
            return True
        except Exception as e:
            print(f"    Erro ao salvar PLANO-AULAS.md: {e}")
            return False

    def processar(self) -> bool:
        """Executar pipeline completo."""
        if not self.pasta_aulas.exists():
            try:
                self.pasta_aulas.mkdir(parents=True, exist_ok=True)
            except Exception as e:
                print(f"    ❌ Erro ao criar pasta AULAS: {e}")
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

        # Criar arquivos de aulas
        num_aulas = 0
        for aula_nome, topicos in sorted(modulos.items()):
            if self.criar_arquivo_aula(aula_nome, topicos):
                num_aulas += 1

        # Gerar PLANO-AULAS.md consolidado na raiz
        if self.gerar_plano_consolidado(modulos):
            print(f"    ✅ {num_aulas} arquivos de aula criados + PLANO-AULAS.md na raiz")
            return True

        return False


def main():
    parser = argparse.ArgumentParser(
        description='Gerar arquivos de aulas + PLANO-AULAS.md na raiz da matéria'
    )
    parser.add_argument(
        '--caminho-curso',
        required=True,
        help='Caminho da pasta do curso (ex: ../sistema/CURSO)'
    )

    args = parser.parse_args()
    caminho_curso = Path(args.caminho_curso)

    print("\nGerador de Aulas com Plano Consolidado")
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

        if not (materia_pasta / "AULAS").exists() and not (materia_pasta / "EMENTA-PRINCIPAL-" in str(materia_pasta.glob("EMENTA-*"))):
            # Procurar por ementa mesmo que AULAS não exista
            if not list(materia_pasta.glob("EMENTA-*.md")):
                continue

        print(f"\n  {materia_pasta.name}...", end=" ")

        gerador = GeradorAulasComPlano(materia_pasta)
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
