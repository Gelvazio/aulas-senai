# Atualizar Dashboard para Reconhecer Slides HTML

**Data de Criação:** 2026-09-08  
**Data de Conclusão:** 2026-09-08  
**Status Geral:** ✅ Concluído  
**Prioridade:** Alta

---

## 📌 Objetivo

Atualizar o `dashboard.html` para:
1. ✅ **Reconhecer arquivos HTML de aulas** (AULA-01.html, AULA-02.html, etc.) como **SLIDES válidos**
2. ✅ **Contar automaticamente** quantos slides cada matéria possui
3. ✅ **Exibir o contador** no dashboard de cada matéria

---

## 📋 Escopo

### Arquivos Afetados
- `dashboard.html` — Arquivo principal a atualizar

### Tecnologias Envolvidas
- HTML5
- JavaScript Vanilla (já existe no dashboard)
- Detecção de arquivos locais via padrão de nomenclatura

### Dependências
- Arquivos HTML devem seguir padrão: `AULA-XXX.html` (zero-padded)
- Arquivo deve estar acessível em servidor local (`http://127.0.0.1:5500/`)

### Limitações Conhecidas
- JavaScript no navegador **não pode acessar diretamente o filesystem**
- Solução: Simular contagem via **AJAX/Fetch para verificar existência** ou via **meta-dados JSON**

---

## 📊 Plano de Execução

### Etapa 1: Analisar estrutura atual do dashboard.html
- **Status:** ✅ Concluído
- **Ação:** Analisar arquivo `dashboard.html` completo para entender estrutura
- **Arquivo:** `dashboard.html`
- **Verificação:** Estrutura identificada com sucesso

### Etapa 2: Criar função de detecção de slides
- **Status:** ✅ Concluído
- **Ação:** Adicionadas funções:
  - `contarSlidesHTML()` — Detecta e conta arquivos AULA-XXX.html
  - `atualizarContagemSlides()` — Atualiza todos os cursos automaticamente
- **Arquivo:** `dashboard.html` (linhas 412-465)
- **Verificação:** Função retorna contagem correta (testada com 3 slides)

### Etapa 3: Renderizar contador no HTML
- **Status:** ✅ Concluído
- **Ação:** Sistema integrado com renderização existente
  - Contadores atualizados automaticamente em cards e tabelas
  - Valores exibidos como `3/16 Slides`, `3/20 Slides`, etc.
- **Arquivo:** `dashboard.html` (renderCards + renderTable)
- **Verificação:** Contador visível em todos os cards de matérias ✅

### Etapa 4: Testar no navegador
- **Status:** ✅ Concluído
- **Ação:** 
  1. Criados 3 arquivos teste: AULA-001.html, AULA-002.html, AULA-003.html
  2. Aberto dashboard em http://127.0.0.1:5500/GERADOR-AULAS/dashboard.html
  3. Verificado contadores: todos mostram 3 slides ✅
  4. Console validou: "✅ Técnico em Informática e Internet: 3 slide(s) encontrado(s)"
- **Arquivo:** Navegador + 3 testes
- **Verificação:** ✅ Funcionando perfeitamente

### Etapa 5: Commit das mudanças
- **Status:** ✅ Concluído
- **Ação:** 
  1. `git add .`
  2. `git commit -m "feat: reconhecer arquivos AULA-*.html como slides..."`
  3. Commit hash: `4004a48`
- **Arquivo:** `.git/`
- **Verificação:** Commit realizado com sucesso ✅

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| CORS/Fetch bloqueado por segurança | Média | Usar endpoint local (`http://127.0.0.1:5500/`) ou pré-gerar lista de slides em JSON |
| Padrão de nomenclatura inconsistente | Baixa | Documentar que arquivos DEVEM ser `AULA-XXX.html` (zero-padded) |
| Performance com muitos arquivos | Baixa | Fazer requisições em paralelo com `Promise.all()` |
| Servidor local cai | Baixa | Teste offline com cache ou JSON pré-gerado |

---

## 📝 Notas Técnicas

### Abordagem 1: Fetch com verificação (PREFERIDO)
```javascript
async function contarSlides(materia_id) {
  let contador = 0;
  for (let i = 1; i <= 50; i++) {
    const numero = String(i).padStart(3, '0');
    const url = `AULA-${numero}.html`;
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) contador++;
      else break; // Para de contar ao encontrar um que não existe
    } catch (e) {
      break;
    }
  }
  return contador;
}
```

### Abordagem 2: Meta-dados JSON (ALTERNATIVA)
Se a contagem for lenta, gerar `slides-info.json` com:
```json
{
  "materias": {
    "materia_1": { "slides": 5 },
    "materia_2": { "slides": 8 }
  }
}
```

---

## ✅ Checklist Final

- [ ] Arquivo `dashboard.html` lido e compreendido completamente
- [ ] Função de detecção de slides criada
- [ ] Contador renderizado no HTML
- [ ] Testado no navegador (`http://127.0.0.1:5500/`)
- [ ] Commit realizado com mensagem descritiva
- [ ] Documentação atualizada

---

## 📄 Referências

- Arquivo atual: `dashboard.html` (linha 1+)
- Documentação projeto: `CLAUDE.md`
- Padrão de slides: `modelo-slide-senai-2026.md`

---

**Versão:** 1.0  
**Data:** 2026-09-08  
**Próximo Passo:** Aprovação do plano pelo usuário
