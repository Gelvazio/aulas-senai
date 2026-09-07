<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Services\MateriaService;

/**
 * Controller para endpoints de Matérias
 *
 * Rotas:
 * - GET  /api/materias — Listar matérias
 * - GET  /api/materias/{id} — Obter matéria específica
 * - GET  /api/materias/{id}/validar — Validar estrutura
 */
class ControllerApiMateria extends ControllerApiBase
{
    /**
     * GET /api/materias
     *
     * Lista todas as matérias
     *
     * Query params opcionais:
     * - curso_id: filtrar por curso
     * - limit: 10 (padrão)
     * - offset: 0 (padrão)
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function listarMaterias(Request $request, Response $response)
    {
        try {
            $params = $request->getQueryParams();

            $service = new MateriaService();
            $resultado = $service->listarMaterias([
                'curso_id' => $params['curso_id'] ?? null,
                'limit' => (int) ($params['limit'] ?? 10),
                'offset' => (int) ($params['offset'] ?? 0)
            ]);

            return $this->respondWithJson($response, $resultado, 200);

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * GET /api/materias/{id}
     *
     * Obtém uma matéria específica
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function obterMateria(Request $request, Response $response, array $args)
    {
        try {
            $id = $args['id'] ?? null;

            if (empty($id)) {
                return $this->respondWithError($response, 'id obrigatório', 400);
            }

            $service = new MateriaService();
            $resultado = $service->obterMateria($id);

            return $this->respondWithJson($response, $resultado, 200);

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * GET /api/materias/{id}/validar
     *
     * Valida estrutura de uma matéria
     *
     * Verifica:
     * - Pasta AULAS/ existe
     * - Pasta MATERIAIS/ existe
     * - Arquivo EMENTA*.md existe
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function validarEstrutura(Request $request, Response $response, array $args)
    {
        try {
            $id = $args['id'] ?? null;

            if (empty($id)) {
                return $this->respondWithError($response, 'id obrigatório', 400);
            }

            // TODO: Resolver caminho real da matéria via Supabase
            $caminhoMateria = $this->resolverCaminhoMateria($id);

            $service = new MateriaService();
            $resultado = $service->validarEstrutura($caminhoMateria);

            return $this->respondWithJson($response, [
                'status' => 'ok',
                'materia_id' => $id,
                'caminho' => $caminhoMateria,
                'validacao' => $resultado,
                'timestamp' => date('Y-m-d H:i:s')
            ], 200);

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * POST /api/materias/{id}/sincronizar
     *
     * Sincroniza aulas do filesystem com Supabase
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function sincronizarAulas(Request $request, Response $response, array $args)
    {
        try {
            $id = $args['id'] ?? null;

            if (empty($id)) {
                return $this->respondWithError($response, 'id obrigatório', 400);
            }

            $caminhoMateria = $this->resolverCaminhoMateria($id);
            $pastaAulas = $caminhoMateria . '/AULAS';

            $service = new MateriaService();
            $resultado = $service->sincronizarAulas($id, $pastaAulas);

            return $this->respondWithJson($response, $resultado, 200);

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * POST /api/materias/{id}/exportar
     *
     * Exporta dados de uma matéria para JSON
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function exportarMateria(Request $request, Response $response, array $args)
    {
        try {
            $id = $args['id'] ?? null;

            if (empty($id)) {
                return $this->respondWithError($response, 'id obrigatório', 400);
            }

            $caminhoMateria = $this->resolverCaminhoMateria($id);
            $pastaAulas = $caminhoMateria . '/AULAS';

            $service = new MateriaService();
            $dados = $service->exportarParaJson($id, $pastaAulas);

            // Retornar com header de download
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withHeader('Content-Disposition', 'attachment; filename="materia_' . $id . '.json"')
                ->withStatus(200)
                ->write(json_encode($dados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        } catch (\Exception $e) {
            return $this->respondWithError($response, $e->getMessage(), 500);
        }
    }

    /**
     * Resolve caminho real de uma matéria
     *
     * TODO: Consultar Supabase para mapear ID → caminho filesystem
     *
     * @param string $id ID da matéria
     * @return string Caminho da pasta
     */
    private function resolverCaminhoMateria(string $id): string
    {
        // Mapping hardcoded para exemplo
        $mapeamento = [
            'fundamentos_tech_prog' => 'FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO',
            'intro_tic' => 'APRENDIZAGEM-INDUSTRIAL/INTRODUCAO-TIC',
            'analise_dados' => 'GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO'
        ];

        $caminho = $mapeamento[$id] ?? null;

        if (!$caminho) {
            throw new \Exception("Matéria não encontrada: $id");
        }

        return dirname(dirname(dirname(__DIR__))) . '/' . $caminho;
    }
}
