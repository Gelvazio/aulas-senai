#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GERADOR DE PASTAS DE AULAS COM PLANO - Cria pastas AULA-XX e PLANO-AULAS.md na raiz

PROPÓSITO:
  Ler ementa de uma matéria
  Criar pastas: AULA-01/, AULA-02/, etc
  Criar PLANO-AULAS.md consolidado na RAIZ DA MATERIA

ESTRUTURA GERADA:
  {materia}/
  ├── PLANO-AULAS.md ✅ (NA RAIZ)
  ├── AULAS/
  │   ├── AULA-01/
  │   ├── AULA-02/
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


class GeradorPastasAulasComPlano:
    """Gerar pastas de aulas + PLANO-AULAS.md consolidado na raiz."""

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

    def criar_pastas_aulas(self, modulos: dict) -> int:
        """Criar apenas as pastas AULA-01, AULA-02, etc (sem PLANO-AULAS.md)."""
        sucesso = 0

        for aula_nome in modulos.keys():
            pasta_aula = self.pasta_aulas / aula_nome

            try:
                pasta_aula.mkdir(parents=True, exist_ok=True)
                sucesso += 1
            except Exception as e:
                print(f"    Erro ao criar pasta {aula_nome}: {e}")

        return sucesso

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

**Aula:** {aula_nome}
**Duração:** {ch_por_encontro}h
**Dia:** A definir

#### Objetivos de Aprendizagem
- Compreender os conceitos principais
- Aplicar técnicas e procedimentos
- Resolver problemas práticos

#### Conteúdo Programático

"""

            # Adicionar tópicos
            if topicos:
                for topico in topicos[1:]:  # Pular o título
                    plano += f"{topico}\n"

            plano += f"""
#### Estratégias de Ensino
1. Exposição Dialogada (20 min)
   - Apresentação de conceitos
   - Exemplos práticos
   - Esclarecimento de dúvidas

2. Atividade Prática (40 min)
   - Exercício prático guiado
   - Resolução de problemas
   - Aplicação em situação real

3. Discussão e Síntese (20 min)
   - Síntese do aprendido
   - Reflexão sobre aplicações
   - Preparação para próxima aula

#### Atividades Práticas
- Atividade principal com duração de 40 minutos
- Exercício prático em laboratório ou sala de aula
- Recursos: Computador, software específico (conforme UC)

#### Recursos Necessários
- Computador com internet
- Software específico (conforme UC)
- Projetor/tela
- Quadro branco
- Material didático

#### Avaliação Formativa
- Participação: 25%
- Atividade prática: 50%
- Compreensão: 25%

#### Próximo Encontro
ENCONTRO {idx + 1} — {self._proxima_aula(modulos, idx)}

---
"""

        # Resumo final
        plano += f"""
## Resumo Geral

| Encontro | Título | Duração | Status |
|----------|--------|---------|--------|
"""

        for idx, (aula_nome, topicos) in enumerate(sorted(modulos.items()), 1):
            titulo_aula = topicos[0] if topicos else aula_nome.replace('-', ' ').title()
            plano += f"| {idx} | {titulo_aula} | {ch_por_encontro}h | ⏳ A lecionar |\n"

        plano += f"""

**Total:** {num_encontros} encontros × {ch_por_encontro}h = {num_encontros * ch_por_encontro}h

---

## Notas Importantes

⚠️ **Este plano foi gerado automaticamente** e deve ser:
- Revisado e adaptado pelo professor
- Ajustado conforme necessidade pedagógica
- Atualizado com exemplos locais e atuais

---

**Gerado em:** {data_hoje}
**Pasta de Aulas:** `AULAS/` (com subpastas AULA-01, AULA-02, ...)
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

    def _proxima_aula(self, modulos: dict, idx_atual: int) -> str:
        """Calcular nome da próxima aula."""
        chaves = sorted(modulos.keys())
        if idx_atual + 1 < len(chaves):
            topicos = modulos[chaves[idx_atual + 1]]
            return topicos[0] if topicos else chaves[idx_atual + 1]
        return "Conclusão e Síntese"

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

        # Criar pastas de aulas
        num_pastas = self.criar_pastas_aulas(modulos)

        # Gerar PLANO-AULAS.md consolidado na raiz
        if self.gerar_plano_consolidado(modulos):
            print(f"    ✅ {num_pastas} pastas criadas + PLANO-AULAS.md na raiz")
            return True

        return False


def main():
    parser = argparse.ArgumentParser(
        description='Gerar pastas de aulas + PLANO-AULAS.md na raiz da matéria'
    )
    parser.add_argument(
        '--caminho-curso',
        required=True,
        help='Caminho da pasta do curso (ex: ../sistema/CURSO)'
    )

    args = parser.parse_args()
    caminho_curso = Path(args.caminho_curso)

    print("\nGerador de Pastas de Aulas com Plano Consolidado")
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
