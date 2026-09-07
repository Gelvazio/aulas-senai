<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Services\AulaService;
use App\Services\MarkdownService;

/**
 * Controller para endpoints de Aulas
 *
 * Rotas:
 * - GET  /api/aulas/{materia_id} — Listar aulas
 * - POST /api/aulas/gerar — Gerar HTMLs
 * - GET  /api/aulas/{aula_id}/html — Obter aula HTML
 */
class ControllerApiAula extends ControllerApiBase
{
    /**
     * GET /api/aulas/{materia_id}
     *
     * Lista todas as aulas de uma matéria
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function listarAulas(Request $request, Response $response, array $args)
    {
        try {
            $materiaId = $args['materia_id'] ?? null;

            if (empty($materiaId)) {
                return $this->respondWithError($response, 'materia_id obrigatório', 400);
            }

            $pastaAulas = $this->construirCaminhoAulas($materiaId);
            $service = new AulaService();
            $aulas = $service->listarAulas($pastaAulas);

            if (isset($aulas['erro'])) {
                return $this->respondWithError($response, $aulas['erro'], 404);
            }

            return $this->respondWithJson($response, [
                'status' => 'ok',
                'materia_id' => $materiaId,
                'total' => count($aulas),
                'aulas' => $aulas,
                'timestamp' => date('Y-m-d H:i:s')
            ], 200);

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * POST /api/aulas/gerar
     *
     * Gera HTMLs a partir de Markdown
     *
     * Body JSON esperado:
     * {
     *   "materia_id": "uuid",
     *   "pasta_aulas": "caminho/relativo",
     *   "gerar_index": true,
     *   "gerar_toc": true
     * }
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function gerarHtmlAulas(Request $request, Response $response)
    {
        try {
            $body = $request->getParsedBody();

            // Validar entrada
            if (empty($body['materia_id']) && empty($body['pasta_aulas'])) {
                return $this->respondWithError(
                    $response,
                    'materia_id ou pasta_aulas é obrigatório',
                    400
                );
            }

            // Resolver caminho da pasta
            $pastaAulas = $body['pasta_aulas'] ?? $this->construirCaminhoAulas($body['materia_id']);

            // Opções
            $opcoes = [
                'gerar_index' => $body['gerar_index'] ?? true,
                'gerar_toc' => $body['gerar_toc'] ?? true
            ];

            // Gerar
            $service = new AulaService();
            $resultado = $service->gerarHtmlAulas($pastaAulas, $opcoes);

            return $this->respondWithJson($response, $resultado, $resultado['codigo']);

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * GET /api/aulas/{aula_id}/html
     *
     * Retorna o HTML de uma aula específica
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function obterAulaHtml(Request $request, Response $response, array $args)
    {
        try {
            $aulaId = $args['aula_id'] ?? null;

            if (empty($aulaId)) {
                return $this->respondWithError($response, 'aula_id obrigatório', 400);
            }

            // TODO: Implementar busca de arquivo HTML
            // Por enquanto, retornar erro

            return $this->respondWithError(
                $response,
                'Funcionalidade em desenvolvimento',
                501
            );

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * POST /api/aulas/validar
     *
     * Valida estrutura de uma pasta de aulas
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function validarAulas(Request $request, Response $response)
    {
        try {
            $body = $request->getParsedBody();
            $pastaAulas = $body['pasta_aulas'] ?? null;

            if (empty($pastaAulas)) {
                return $this->respondWithError(
                    $response,
                    'pasta_aulas obrigatório',
                    400
                );
            }

            $service = new AulaService();

            // Validar que pasta existe
            if (!is_dir($pastaAulas)) {
                return $this->respondWithError(
                    $response,
                    "Pasta não encontrada: $pastaAulas",
                    404
                );
            }

            // Listar e validar aulas
            $aulas = $service->listarAulas($pastaAulas);

            return $this->respondWithJson($response, [
                'status' => 'ok',
                'pasta' => $pastaAulas,
                'total_aulas' => count($aulas),
                'aulas' => $aulas,
                'timestamp' => date('Y-m-d H:i:s')
            ], 200);

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * Constrói caminho da pasta AULAS baseado em materia_id
     *
     * Assume estrutura:
     * sistema/{CURSO}/{UC}/AULAS/
     *
     * @param string $materiaId ID da matéria
     * @return string Caminho da pasta AULAS
     */
    private function construirCaminhoAulas(string $materiaId): string
    {
        // TODO: Consultar Supabase para obter estrutura real
        // Por enquanto, retornar caminho padrão

        $basePath = dirname(dirname(dirname(__DIR__))) . '/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS';
        return $basePath;
    }
}
