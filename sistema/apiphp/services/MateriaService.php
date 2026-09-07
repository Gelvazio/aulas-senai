<?php

namespace App\Services;

/**
 * Serviço para gerenciar matérias
 *
 * Responsabilidades:
 * - Consultar matérias no Supabase
 * - Filtrar por curso
 * - Gerenciar dados de UC
 *
 * Nota: Implementação stub para demonstração
 * Integração real com Supabase seria feita via SDK oficial
 */
class MateriaService
{
    private $supabaseUrl;
    private $supabaseKey;

    public function __construct(string $supabaseUrl = null, string $supabaseKey = null)
    {
        $this->supabaseUrl = $supabaseUrl ?? getenv('SUPABASE_URL');
        $this->supabaseKey = $supabaseKey ?? getenv('SUPABASE_KEY');
    }

    /**
     * Lista todas as matérias
     *
     * @param array $filtros Filtros opcionais (curso_id, etc)
     * @return array Lista de matérias
     */
    public function listarMaterias(array $filtros = []): array
    {
        // TODO: Implementar chamada REST ao Supabase
        // GET /rest/v1/materia?select=*

        return [
            'status' => 'ok',
            'dados' => [],
            'nota' => 'Integração com Supabase requerida'
        ];
    }

    /**
     * Obtém uma matéria específica
     *
     * @param string $materiaId ID da matéria
     * @return array Dados da matéria
     */
    public function obterMateria(string $materiaId): array
    {
        // TODO: Implementar chamada REST ao Supabase
        // GET /rest/v1/materia?id=eq.{materiaId}&select=*

        return [
            'status' => 'ok',
            'dados' => [
                'id' => $materiaId,
                'nome' => 'Matéria Exemplo',
                'unidade_curricular_id' => null
            ]
        ];
    }

    /**
     * Lista matérias de um curso
     *
     * @param string $cursoId ID do curso
     * @return array Lista de matérias
     */
    public function obterPorCurso(string $cursoId): array
    {
        // TODO: Implementar chamada REST ao Supabase
        // GET /rest/v1/cursomateria?curso_id=eq.{cursoId}&select=materia(*)

        return [
            'status' => 'ok',
            'dados' => [],
            'nota' => 'Integração com Supabase requerida'
        ];
    }

    /**
     * Cria nova matéria com aulas
     *
     * @param array $dados Dados da matéria
     * @return array Resultado da criação
     */
    public function criarComAulas(array $dados): array
    {
        // Validar dados obrigatórios
        $obrigatorios = ['nome', 'curso_id'];
        foreach ($obrigatorios as $campo) {
            if (empty($dados[$campo])) {
                return [
                    'status' => 'erro',
                    'codigo' => 400,
                    'erro' => "Campo obrigatório ausente: $campo"
                ];
            }
        }

        // TODO: Implementar chamada REST ao Supabase
        // POST /rest/v1/materia

        return [
            'status' => 'ok',
            'codigo' => 201,
            'dados' => ['id' => 'novo-id'],
            'nota' => 'Integração com Supabase requerida'
        ];
    }

    /**
     * Sincroniza aulas do filesystem com Supabase
     *
     * @param string $materiaId ID da matéria
     * @param string $pastaAulas Pasta com aulas
     * @return array Resultado da sincronização
     */
    public function sincronizarAulas(string $materiaId, string $pastaAulas): array
    {
        if (!is_dir($pastaAulas)) {
            return [
                'status' => 'erro',
                'codigo' => 404,
                'erro' => "Pasta não encontrada: $pastaAulas"
            ];
        }

        // TODO: Implementar sincronização
        // 1. Listar AULA-*.md em $pastaAulas
        // 2. Para cada arquivo, criar/atualizar registro em tabela 'aula'
        // 3. Registrar timestamps

        return [
            'status' => 'ok',
            'aulasProcessadas' => 0,
            'nota' => 'Integração com Supabase requerida'
        ];
    }

    /**
     * Valida estrutura de uma matéria
     *
     * Verifica se existem as pastas obrigatórias:
     * - AULAS/
     * - MATERIAIS/
     *
     * @param string $pastaMateria Caminho da pasta da matéria
     * @return array { valida: bool, erros: array }
     */
    public function validarEstrutura(string $pastaMateria): array
    {
        $erros = [];
        $pastaAbsoluta = realpath($pastaMateria);

        if (!$pastaAbsoluta || !is_dir($pastaAbsoluta)) {
            return [
                'valida' => false,
                'erros' => ["Pasta da matéria não existe: $pastaMateria"]
            ];
        }

        // Verificar pastas obrigatórias
        $pastasObrigatorias = ['AULAS', 'MATERIAIS'];
        foreach ($pastasObrigatorias as $pasta) {
            $caminho = $pastaAbsoluta . DIRECTORY_SEPARATOR . $pasta;
            if (!is_dir($caminho)) {
                $erros[] = "Pasta obrigatória não encontrada: $pasta/";
            }
        }

        // Verificar arquivos de ementa
        $ementas = glob($pastaAbsoluta . '/EMENTA*.md');
        if (empty($ementas)) {
            $erros[] = "Nenhum arquivo EMENTA*.md encontrado";
        }

        return [
            'valida' => empty($erros),
            'erros' => $erros,
            'avisos' => $this->gerarAvisos($pastaAbsoluta)
        ];
    }

    /**
     * Gera avisos sobre a estrutura
     *
     * @param string $pastaAbsoluta Caminho absoluto
     * @return array Avisos úteis
     */
    private function gerarAvisos(string $pastaAbsoluta): array
    {
        $avisos = [];

        // Avisar se pouquíssimas aulas
        $aulas = glob($pastaAbsoluta . '/AULAS/AULA-*.md');
        if (count($aulas) < 5) {
            $avisos[] = sprintf(
                "Poucas aulas encontradas: %d (esperado >= 5)",
                count($aulas)
            );
        }

        // Avisar se não há materiais
        $materiais = glob($pastaAbsoluta . '/MATERIAIS/*');
        if (empty($materiais)) {
            $avisos[] = "Pasta MATERIAIS/ vazia";
        }

        return $avisos;
    }

    /**
     * Exporta dados de uma matéria para JSON
     *
     * @param string $materiaId ID da matéria
     * @param string $pastaAulas Pasta com aulas
     * @return array JSON exportado
     */
    public function exportarParaJson(string $materiaId, string $pastaAulas): array
    {
        $aulas = $this->listarAulas($pastaAulas);

        return [
            'materia_id' => $materiaId,
            'timestamp_exportacao' => date('Y-m-d H:i:s'),
            'total_aulas' => count($aulas),
            'aulas' => $aulas
        ];
    }

    /**
     * Lista aulas de uma pasta
     *
     * Helper para exportarParaJson
     *
     * @param string $pastaAulas Pasta AULAS/
     * @return array Lista de aulas
     */
    private function listarAulas(string $pastaAulas): array
    {
        $aulas = [];
        $arquivos = glob($pastaAulas . '/AULA-*.md');

        foreach ($arquivos as $arquivo) {
            $aulas[] = [
                'arquivo' => basename($arquivo),
                'tamanho_bytes' => filesize($arquivo),
                'modificado_em' => date('Y-m-d H:i:s', filemtime($arquivo))
            ];
        }

        return $aulas;
    }
}
