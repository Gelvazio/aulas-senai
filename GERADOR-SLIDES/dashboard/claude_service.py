import json
import requests
from datetime import datetime
from anthropic import Anthropic

class ClaudeGeradoAulasService:
    """Serviço de integração com Claude API para geração de aulas"""

    def __init__(self, api_key=None):
        """Inicializa o cliente Anthropic"""
        self.client = Anthropic()
        self.model = "claude-3-5-sonnet-20241022"

    def verificar_status_geracao(self, conteudo_aulas_json):
        """
        Verifica se as aulas já foram geradas

        Args:
            conteudo_aulas_json: Dict com status de geração

        Returns:
            dict com status atual
        """
        if not conteudo_aulas_json:
            return {
                "status": "nao_gerado",
                "pode_gerar": True,
                "mensagem": "Nenhuma geração anterior encontrada"
            }

        status = conteudo_aulas_json.get("status", "nao_gerado")

        return {
            "status": status,
            "pode_gerar": status in ["nao_gerado", "erro"],
            "data_geracao": conteudo_aulas_json.get("data_geracao"),
            "total_aulas": conteudo_aulas_json.get("total_aulas", 0),
            "avisos": conteudo_aulas_json.get("avisos", [])
        }

    def gerar_plano_aulas(self, ementa_content, nome_uc, carga_horaria):
        """
        Gera plano de aulas usando Claude API

        Args:
            ementa_content: Conteúdo da ementa em formato texto
            nome_uc: Nome da UC/Matéria
            carga_horaria: Carga horária total

        Returns:
            dict com plano de aulas gerado
        """
        prompt = f"""
Você é um especialista em pedagogia e currículo. Analise a seguinte ementa e gere um plano detalhado de aulas.

# EMENTA

{ementa_content}

# INSTRUÇÕES DE GERAÇÃO

1. **Análise da Ementa**:
   - Extrair capacidades básicas
   - Identificar domínios de conhecimento
   - Mapear relações entre capacidades e conteúdos
   - Calcular distribuição de tempo

2. **Estrutura de Saída**:
   Retornar um JSON válido com a seguinte estrutura:
   {{
     "uc": "{nome_uc}",
     "carga_horaria": {carga_horaria},
     "total_aulas": <número calculado>,
     "capacidades": [
       {{
         "id": "cap_001",
         "titulo": "...",
         "descricao": "..."
       }}
     ],
     "dominios": [
       {{
         "id": "dom_001",
         "titulo": "...",
         "conteudos": ["...", "..."],
         "duracao_horas": <número>,
         "numero_aulas": <número>
       }}
     ],
     "aulas": [
       {{
         "numero": 1,
         "titulo": "...",
         "duracao_minutos": 120,
         "dominio_id": "dom_001",
         "objetivos": ["..."],
         "conteudos": ["..."],
         "atividades": ["..."],
         "recursos": ["..."],
         "slide_minimos": 15
       }}
     ],
     "capacidades_socioemocionais": ["..."],
     "avisos": []
   }}

3. **Regras Obrigatórias**:
   - Usar APENAS conteúdos presentes na ementa
   - Mínimo 15 slides por aula
   - Integrar competências socioemocionais
   - Cada aula tem: objetivos, conteúdos, atividades, avaliação
   - Retornar JSON válido (testável com JSON.parse)

4. **Avisos**:
   - Se houver inconsistências, listar em "avisos"
   - Exemplo: "Ementa menciona ABNT mas não especifica edição"
"""

        try:
            # Chamar Claude API
            message = self.client.messages.create(
                model=self.model,
                max_tokens=4096,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            # Extrair resposta
            resposta_texto = message.content[0].text

            # Tentar parsear JSON da resposta
            plano = self._extrair_json(resposta_texto)

            return {
                "status": "sucesso",
                "plano": plano,
                "modelo": self.model,
                "timestamp": datetime.now().isoformat()
            }

        except Exception as e:
            return {
                "status": "erro",
                "mensagem": str(e),
                "modelo": self.model,
                "timestamp": datetime.now().isoformat()
            }

    def _extrair_json(self, texto):
        """
        Extrai JSON válido de um texto que pode conter formatação markdown

        Args:
            texto: Texto contendo JSON

        Returns:
            dict parseado ou None
        """
        # Remover blocos de código markdown se existirem
        if "```json" in texto:
            inicio = texto.find("```json") + 7
            fim = texto.find("```", inicio)
            texto = texto[inicio:fim].strip()
        elif "```" in texto:
            inicio = texto.find("```") + 3
            fim = texto.find("```", inicio)
            texto = texto[inicio:fim].strip()

        try:
            return json.loads(texto)
        except json.JSONDecodeError:
            # Tentar encontrar primeiro { e último }
            inicio = texto.find("{")
            fim = texto.rfind("}") + 1
            if inicio >= 0 and fim > inicio:
                try:
                    return json.loads(texto[inicio:fim])
                except:
                    pass

        return None

    def gerar_slides_markdown(self, aula_data):
        """
        Gera conteúdo de slides em markdown baseado na aula

        Args:
            aula_data: dict com dados da aula

        Returns:
            str com markdown para slides
        """
        prompt = f"""
Gere conteúdo de slides em markdown para a seguinte aula:

Título: {aula_data.get('titulo', '')}
Objetivos: {', '.join(aula_data.get('objetivos', []))}
Conteúdos: {', '.join(aula_data.get('conteudos', []))}
Duração: {aula_data.get('duracao_minutos', 120)} minutos

Requisitos:
- Mínimo 15 slides
- Formato markdown com # para títulos de slides
- Cada slide deve ser separado por ---
- Usar exemplos práticos e relevantes
- Integrar contexto SENAI/indústria
- Incluir ao menos 2 atividades práticas

Retornar apenas o markdown dos slides, sem explicações adicionais.
"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            return message.content[0].text

        except Exception as e:
            return f"# Erro ao Gerar Slides\n\nErro: {str(e)}"

    def gerar_apostila(self, aula_data):
        """
        Gera conteúdo de apostila em HTML baseado na aula

        Args:
            aula_data: dict com dados da aula

        Returns:
            str com HTML da apostila
        """
        prompt = f"""
Gere conteúdo de apostila em HTML para a seguinte aula:

Título: {aula_data.get('titulo', '')}
Objetivos: {', '.join(aula_data.get('objetivos', []))}
Conteúdos: {', '.join(aula_data.get('conteudos', []))}

Inclua:
1. Resumo executivo
2. Conceitos principais (com exemplos práticos)
3. Estudos de caso (contexto SENAI)
4. Glossário de termos técnicos
5. Exemplos resolvidos
6. Exercícios propostos
7. Recursos adicionais

Retornar apenas HTML válido, sem DOCTYPE ou html tags externas.
Use classes CSS simples (container, section, title, content, etc).
"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            return message.content[0].text

        except Exception as e:
            return f"<div class='erro'><h2>Erro ao Gerar Apostila</h2><p>{str(e)}</p></div>"

    def criar_registro_geracao(self, plano_aulas, total_aulas_geradas=0):
        """
        Cria registro JSON para armazenar em conteudo_aulas

        Args:
            plano_aulas: dict com resultado de gerar_plano_aulas
            total_aulas_geradas: quantidade de aulas já geradas

        Returns:
            dict para armazenar em materia.conteudo_aulas
        """
        if plano_aulas.get("status") != "sucesso":
            return {
                "status": "erro",
                "data_geracao": None,
                "total_aulas": 0,
                "aulas_geradas": [],
                "timestamp_ultima_atualizacao": datetime.now().isoformat(),
                "versao_claude": "1.0",
                "prompt_usado": None,
                "avisos": [plano_aulas.get("mensagem", "Erro desconhecido")]
            }

        plano = plano_aulas.get("plano", {})

        return {
            "status": "gerado",
            "data_geracao": datetime.now().isoformat(),
            "total_aulas": plano.get("total_aulas", 0),
            "aulas_geradas": [
                {
                    "numero": a.get("numero"),
                    "titulo": a.get("titulo"),
                    "status": "gerada"
                }
                for a in plano.get("aulas", [])[:total_aulas_geradas]
            ],
            "timestamp_ultima_atualizacao": datetime.now().isoformat(),
            "versao_claude": "1.0",
            "prompt_usado": "gerar_plano_aulas_v1",
            "avisos": plano.get("avisos", [])
        }
