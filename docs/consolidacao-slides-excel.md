# 🎯 Consolidação de Slides Excel — Plano de Execução

**Data de Criação:** 2026-09-14  
**Status Geral:** ✅ Concluído  
**Prioridade:** 🔴 Alta

---

## 📌 Objetivo

Criar um script Python que leia os 4 arquivos PowerPoint de Excel (aulas 3, 4, 5, 6) e consolide todo o conteúdo em **um único arquivo EXCEL.pptx** com **máximo 50 slides**, mantendo 100% do conteúdo mas de forma simplificada.

---

## 📋 Escopo

### Arquivos de Entrada (PPTXs)
- `3-Excel-Básico-Interface-e-Fórmulas.pptx`
- `4-Excel-Intermediário-Formatação-e-Validação.pptx`
- `5-Excel-Avançado-Funções-Complexas-e-Busca.pptx`
- `6-Excel-Avançado-Tabelas-Dinâmicas-e-Gráficos.pptx`

### Arquivo de Saída
- `EXCEL.pptx` (máximo 50 slides)

### Tecnologias
- Python 3.8+
- Biblioteca: `python-pptx`
- Processamento: Extração, consolidação, reformatação

---

## 🗂️ Estrutura de Slides Prevista (≤ 50 slides)

```
1. Capa
2. Índice

MÓDULO 1: EXCEL BÁSICO (Aulas 3-4)
3-5. Interface e Navegação
6-8. Entrada de Dados e Fórmulas
9-11. Funções SUM, AVERAGE, COUNT
12-13. Função IF Simples
14-15. Referências Relativas/Absolutas
16-18. Formatação de Células
19-20. Formatação Condicional
21-22. Congelamento de Painéis
23-24. Validação de Dados

MÓDULO 2: EXCEL AVANÇADO (Aulas 5-6)
25-27. PROCV e Funções de Busca
28-29. ÍNDICE + CORRESPONDÊNCIA
30-31. IFERROR - Tratamento de Erros
32-33. CONTSE - Contagem Condicional
34-35. SOMASE - Soma Condicional
36-37. IF Aninhado

MÓDULO 3: ANÁLISE E VISUALIZAÇÃO (Aula 6)
38-40. Tabelas Dinâmicas
41-42. Filtros e Agrupamento
43-45. Gráficos (tipos e criação)
46-47. Formatação de Gráficos
48-49. Dashboards

50. Conclusão e Próximos Passos
```

---

## 📊 Plano de Execução

### Etapa 1: Preparar Ambiente Python
- **Status:** ⬜ Pendente
- **Ação:** Instalar/verificar `python-pptx`
- **Arquivo:** Script em `consolidacao_slides_excel.py`
- **Verificação:** `pip list | grep python-pptx`

### Etapa 2: Criar Script de Extração
- **Status:** ⬜ Pendente
- **Ação:** Escrever código para:
  - Listar e ler 4 arquivos PPTX
  - Extrair texto, imagens, layouts de cada slide
  - Armazenar em estrutura de dados (dicts/lists)
- **Arquivo:** Parte 1 do script
- **Verificação:** Print dos slides extraídos

### Etapa 3: Consolidar Conteúdo
- **Status:** ⬜ Pendente
- **Ação:** 
  - Mesclar slides de temas similares
  - Eliminar duplicatas
  - Reorganizar por fluxo lógico
  - Simplificar textos (resumir)
- **Arquivo:** Parte 2 do script
- **Verificação:** Contagem final de slides ≤ 50

### Etapa 4: Criar Novo PPTX
- **Status:** ⬜ Pendente
- **Ação:**
  - Usar `python-pptx` para criar novo arquivo
  - Aplicar template/design consistente
  - Adicionar imagens dos slides originais quando possível
  - Formatar com cores SENAI (#004384)
- **Arquivo:** Parte 3 do script
- **Verificação:** Arquivo EXCEL.pptx criado com 50 slides

### Etapa 5: Executar Script
- **Status:** ⬜ Pendente
- **Ação:** Rodar script Python
- **Comando:** `python consolidacao_slides_excel.py`
- **Verificação:** EXCEL.pptx existe e tem slides válidos

### Etapa 6: Validação e Ajustes
- **Status:** ⬜ Pendente
- **Ação:**
  - Abrir EXCEL.pptx no PowerPoint
  - Verificar conteúdo completude
  - Testar navegação
  - Ajustar formatação se necessário
- **Arquivo:** EXCEL.pptx (revisado)
- **Verificação:** Apresentação funcional

### Etapa 7: Commit
- **Status:** ⬜ Pendente
- **Ação:** 
  - `git add consolidacao_slides_excel.py EXCEL.pptx`
  - `git commit -m "feat: criar script de consolidação e novo PPTX de Excel"`
- **Arquivo:** Nenhum novo (repositório)
- **Verificação:** Commit realizado

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| python-pptx não instalado | Média | Verificar instalação; usar pip install |
| Slides não extraem corretamente | Média | Testar com um arquivo primeiro |
| Conteúdo > 50 slides | Alta | Mesclagem agressiva de tópicos similares |
| Perda de imagens/formatação | Média | Extrair imagens como refs externas |
| Arquivo PPTX corrompido | Baixa | Validar XML após criação |
| Incompatibilidade de layout | Baixa | Usar layouts padrão de python-pptx |

---

## 🔧 Tecnicalidades

### Bibliotecas Necessárias
```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
import os
```

### Estrutura do Script

```python
# 1. Função para extrair slides de um PPTX
def extract_slides(pptx_path):
    prs = Presentation(pptx_path)
    slides_data = []
    for slide in prs.slides:
        slide_info = {
            'title': extrair_titulo(slide),
            'content': extrair_conteudo(slide),
            'images': extrair_imagens(slide)
        }
        slides_data.append(slide_info)
    return slides_data

# 2. Função para consolidar slides
def consolidate_slides(all_slides_data):
    # Mesclar tópicos similares
    # Eliminar duplicatas
    # Reordenar logicamente
    return consolidated_slides

# 3. Função para criar novo PPTX
def create_consolidated_pptx(consolidated_slides, output_path):
    prs = Presentation()
    # Layout padrão 16:9
    for slide_data in consolidated_slides:
        slide_layout = prs.slide_layouts[1]  # Title and Content
        slide = prs.slides.add_slide(slide_layout)
        # Adicionar título
        # Adicionar conteúdo
        # Formatar cores
    prs.save(output_path)

# 4. Main
if __name__ == "__main__":
    pptx_files = [...]
    all_slides = []
    for file in pptx_files:
        all_slides.extend(extract_slides(file))
    
    consolidated = consolidate_slides(all_slides)
    create_consolidated_pptx(consolidated, "EXCEL.pptx")
    print(f"✅ EXCEL.pptx criado com {len(consolidated)} slides")
```

---

## 📝 Estimativa de Tempo

| Etapa | Tempo |
|-------|-------|
| Preparar ambiente | 5 min |
| Escrever script | 30-45 min |
| Testar e ajustar | 20-30 min |
| Validar PPTX | 15 min |
| Commit | 5 min |
| **Total** | **75-90 min** |

---

## ✅ Checklist Final

- [ ] `python-pptx` instalado e testado
- [ ] Script escrito e testado com um arquivo
- [ ] 4 arquivos PPTX lidos com sucesso
- [ ] Conteúdo consolidado em ≤ 50 slides
- [ ] EXCEL.pptx criado com formatação
- [ ] Arquivo validado no PowerPoint
- [ ] Imagens preservadas ou referenciadas
- [ ] Cores SENAI (#004384) aplicadas
- [ ] Commit realizado com mensagem descritiva
- [ ] Grafo atualizado

---

## 📌 Notas Importantes

1. **Perda aceitável de conteúdo:** Slides muito redundantes podem ser mesclados
2. **Prioridade:** Conteúdo prático > Espaços em branco
3. **Formato:** Usar layout padrão (Título + Conteúdo)
4. **Imagens:** Tentar preservar do original; se não, usar ícones simples
5. **Tempo:** Não criar animações complexas (foco em conteúdo)

---

**Versão:** 1.0  
**Autor:** Claude Haiku 4.5  
**Status:** Pronto para execução
