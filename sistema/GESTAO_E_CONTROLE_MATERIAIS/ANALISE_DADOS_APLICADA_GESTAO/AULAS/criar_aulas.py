# Script para criar arquivos das aulas

aulas_info = [
    (3, "04-09-2026", "Porcentagem e Conversão de Unidades", 1),
    (4, "06-09-2026", "Introdução à Estatística Básica", 1),
    (5, "10-09-2026", "Área, Volume e Peso", 1),
    (6, "11-09-2026", "Sequência Lógica", 1),
    (7, "13-09-2026", "Introdução ao Excel e Navegação Básica", 2),
    (8, "17-09-2026", "Fórmulas e Funções Essenciais", 2),
    (9, "18-09-2026", "Formatação e Apresentação de Dados", 2),
    (10, "20-09-2026", "Funções de Busca e Consulta", 3),
    (11, "24-09-2026", "Função SE Avançada e CONTSE", 3),
    (12, "25-09-2026", "Tabelas Dinâmicas", 3),
    (13, "27-09-2026", "Filtros e Validação de Dados", 3),
    (14, "01-10-2026", "Gráficos e Visualização de Dados", 3),
    (15, "02-10-2026", "Introdução a Dashboards", 4),
    (16, "04-10-2026", "Criação de Dashboard Prático", 4),
]

modulos = {1: "Fundamentos Matemáticos", 2: "Excel Básico", 3: "Excel Avançado", 4: "Dashboards e Análise"}

for num, data, titulo, modulo in aulas_info:
    conteudo = f"""# AULA {num:02d}: {titulo}

**Data:** {data}  
**Duração:** 2 horas  
**Módulo:** {modulo} - {modulos[modulo]}  
**Docente:** [Nome do Professor]

---

## 📚 OBJETIVOS DA AULA

1. Compreender os principais conceitos de \"{titulo}\"
2. Aplicar o conhecimento em situações práticas de gestão
3. Desenvolver habilidades técnicas e analíticas
4. Resolver problemas reais do dia a dia empresarial

---

## 📖 CONTEÚDO PROGRAMÁTICO

### 1. Conceitos Fundamentais

Nesta aula abordaremos os tópicos centrais relacionados a {titulo.lower()}, com especial atenção às aplicações práticas em gestão de materiais e análise de dados.

#### 1.1 Definições e Contexto
- Importância do tema
- Aplicações na empresa
- Relação com disciplinas anteriores

#### 1.2 Conceitos-Chave
- Principais ideias a serem compreendidas
- Exemplos práticos
- Casos de uso reais

---

### 2. Aplicações Práticas

#### 2.1 Exemplos do Dia a Dia
Exemplos concretos de como este conceito é utilizado em operações reais.

#### 2.2 Resolução de Problemas
Metodologia para resolver problemas utilizando os conceitos aprendidos.

#### 2.3 Boas Práticas
Técnicas recomendadas e melhores práticas de mercado.

---

## 💻 ATIVIDADES PRÁTICAS

### Atividade 1: Compreensão de Conceitos (25 min)
Exercícios de fixação dos conceitos principais.

### Atividade 2: Aplicação Prática (35 min)
Resolução de problemas com dados reais ou simulados.

### Atividade 3: Consolidação (20 min)
Exercício integrador utilizando todos os conceitos da aula.

---

## 📊 RECURSOS UTILIZADOS

- Computador/Notebook
- Software necessário ([Excel/Python/Planilha/etc])
- Dados de exemplo
- Material de apoio e slides

---

## 🏠 TRABALHO DE CASA

1. **Exercícios teóricos:** Lista de 5-10 questões sobre os conceitos aprendidos
2. **Exercícios práticos:** Resolver 3-5 problemas com dados reais
3. **Leitura complementar:** Ler material de apoio fornecido
4. **Preparação:** Revisar conceitos para próxima aula

---

## ✅ CRITÉRIOS DE AVALIAÇÃO

| Aspecto | Peso |
|---------|------|
| Participação em aula | 20% |
| Realização de atividades | 50% |
| Trabalho de casa | 30% |

---

## 📝 NOTAS IMPORTANTES

- Trazer todos os materiais necessários
- Participar ativamente das atividades
- Tirar dúvidas durante a aula
- Fazer o trabalho de casa com atenção

---

## 🔗 REFERÊNCIAS

- Material de apoio fornecido pelo docente
- Exemplos práticos da empresa
- Pesquisa em fontes confiáveis

---

**Próxima aula:** [Próximo título da aula]

"""
    
    filename = f"AULA-{num:02d}-{data}.md"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"✓ Criado: {filename}")

print("\n✅ Todas as aulas foram criadas com sucesso!")
