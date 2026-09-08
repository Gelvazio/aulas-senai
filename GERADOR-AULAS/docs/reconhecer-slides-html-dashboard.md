# Atualizar Dashboard para Reconhecer Slides HTML

**Data de Criação:** 2026-09-08  
**Status Geral:** ⬜ Planejado  
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
- **Status:** ⬜ Pendente
- **Ação:** Ler arquivo `dashboard.html` completamente para entender:
  - Como matérias são listadas
  - Onde adicionar o contador
  - Estrutura de dados (localStorage, JSON, etc.)
- **Arquivo:** `dashboard.html`
- **Verificação:** Identificar seção de matérias e onde renderizar contador

### Etapa 2: Criar função de detecção de slides
- **Status:** ⬜ Pendente
- **Ação:** Adicionar função JavaScript que:
  1. Para cada matéria, tenta acessar arquivos `AULA-001.html`, `AULA-002.html`, etc.
  2. Usa `fetch()` para verificar se arquivo existe (status 200)
  3. Conta quantos slides (arquivos) existem
  4. Retorna número de slides
- **Arquivo:** `dashboard.html` (bloco `<script>`)
- **Verificação:** Função retorna número correto

### Etapa 3: Renderizar contador no HTML
- **Status:** ⬜ Pendente
- **Ação:** 
  1. Localizar template de card de matéria no HTML
  2. Adicionar elemento visual para contador (ex: badge "📊 5 slides")
  3. Populá-lo dinamicamente com resultado da Etapa 2
- **Arquivo:** `dashboard.html` (seção HTML)
- **Verificação:** Contador aparece visualmente ao lado de cada matéria

### Etapa 4: Testar no navegador
- **Status:** ⬜ Pendente
- **Ação:** 
  1. Abrir `http://127.0.0.1:5500/GERADOR-AULAS/dashboard.html`
  2. Verificar se contador aparece
  3. Criar um arquivo teste `AULA-001.html` temporário para validar
  4. Confirmar que contador incrementa corretamente
- **Arquivo:** Navegador + arquivo teste
- **Verificação:** Contador aparece e funciona corretamente

### Etapa 5: Commit das mudanças
- **Status:** ⬜ Pendente
- **Ação:** 
  1. `git add .`
  2. `git commit -m "feat: reconhecer arquivos AULA-*.html como slides no dashboard"`
- **Arquivo:** `.git/`
- **Verificação:** Commit realizado com sucesso

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
