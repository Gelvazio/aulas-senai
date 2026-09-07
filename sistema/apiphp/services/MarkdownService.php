<?php

namespace App\Services;

use League\CommonMark\CommonMarkConverter;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\Table\TableExtension;
use League\CommonMark\Extension\Strikethrough\StrikethroughExtension;
use League\CommonMark\Extension\TaskList\TaskListExtension;

/**
 * Serviço para Parsing de Markdown com suporte a extensões
 *
 * Usa league/commonmark para conversão profissional de Markdown → HTML
 * com suporte a tabelas, strikethrough, listas de tarefas e código com highlight
 */
class MarkdownService
{
    private $converter;
    private $environment;

    public function __construct()
    {
        $this->initializeConverter();
    }

    /**
     * Inicializa o conversor com extensões
     */
    private function initializeConverter()
    {
        $this->environment = new Environment([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
            'max_nesting_level' => 100,
        ]);

        // Adicionar extensões
        $this->environment->addExtension(new TableExtension());
        $this->environment->addExtension(new StrikethroughExtension());
        $this->environment->addExtension(new TaskListExtension());

        $this->converter = new CommonMarkConverter([], $this->environment);
    }

    /**
     * Converte Markdown para HTML
     *
     * @param string $markdown Conteúdo em Markdown
     * @return string HTML renderizado
     */
    public function parseMarkdown(string $markdown): string
    {
        try {
            $html = $this->converter->convert($markdown);
            return (string) $html;
        } catch (\Exception $e) {
            error_log("Erro ao parsear Markdown: " . $e->getMessage());
            return "<p><strong>Erro ao processar Markdown</strong></p>";
        }
    }

    /**
     * Extrai metadados do Front Matter (YAML)
     *
     * Formato esperado:
     * ---
     * titulo: "Introdução à Tecnologia"
     * duracao: 2h
     * objetivos:
     *   - Objetivo 1
     *   - Objetivo 2
     * ---
     *
     * @param string $markdown Conteúdo com front matter
     * @return array Dados extraídos + markdown sem front matter
     */
    public function extractFrontMatter(string $markdown): array
    {
        $metadata = [];
        $content = $markdown;

        // Verificar se começa com ---
        if (preg_match('/^---\s*\n(.*?)\n---\s*\n/s', $markdown, $matches)) {
            $frontMatter = $matches[1];
            $content = substr($markdown, strlen($matches[0]));

            // Parse YAML simples (sem library YAML)
            $metadata = $this->parseSimpleYaml($frontMatter);
        }

        return [
            'metadata' => $metadata,
            'content' => trim($content)
        ];
    }

    /**
     * Parser YAML simplificado (sem dependência de library)
     * Suporta: strings, arrays, booleanos e números
     *
     * @param string $yaml Conteúdo YAML
     * @return array Dados parseados
     */
    private function parseSimpleYaml(string $yaml): array
    {
        $result = [];
        $lines = explode("\n", trim($yaml));

        foreach ($lines as $line) {
            $line = trim($line);

            // Ignorar linhas vazias e comentários
            if (empty($line) || strpos($line, '#') === 0) {
                continue;
            }

            // Detectar chave: valor
            if (strpos($line, ':') !== false) {
                list($key, $value) = explode(':', $line, 2);
                $key = trim($key);
                $value = trim($value);

                // Remover aspas
                if (preg_match('/^["\'](.+)["\']$/', $value, $m)) {
                    $value = $m[1];
                }

                // Detectar booleanos
                if (strtolower($value) === 'true') {
                    $value = true;
                } elseif (strtolower($value) === 'false') {
                    $value = false;
                } elseif (is_numeric($value)) {
                    $value = (int) $value;
                }

                $result[$key] = $value;
            }
        }

        return $result;
    }

    /**
     * Extrai título do Markdown (primeira linha com #)
     *
     * @param string $markdown Conteúdo Markdown
     * @return string Título extraído ou "Sem Título"
     */
    public function extractTitle(string $markdown): string
    {
        // Procurar primeira linha com #
        if (preg_match('/^#+\s+(.+)$/m', $markdown, $matches)) {
            return trim($matches[1]);
        }

        return "Sem Título";
    }

    /**
     * Calcula tempo estimado de leitura
     *
     * Regra: ~200 palavras por minuto
     *
     * @param string $markdown Conteúdo Markdown
     * @return int Tempo em minutos
     */
    public function estimateReadingTime(string $markdown): int
    {
        $words = str_word_count(strip_tags(html_entity_decode($markdown)));
        $minutes = ceil($words / 200);
        return max(1, $minutes);
    }

    /**
     * Extrai todos os headings (h1, h2, h3)
     * Útil para gerar Table of Contents
     *
     * @param string $html HTML renderizado
     * @return array Lista de headings [{ level, text, id }]
     */
    public function extractHeadings(string $html): array
    {
        $headings = [];
        $counter = ['h1' => 0, 'h2' => 0, 'h3' => 0];

        // Extrair h1, h2, h3
        if (preg_match_all('/<h([1-3]).*?>(.*?)<\/h\1>/i', $html, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $level = (int) $match[1];
                $text = strip_tags($match[2]);
                $key = "h$level";

                // Contar para gerar IDs únicos
                $counter[$key]++;
                $id = $this->slugify($text) . '-' . $counter[$key];

                $headings[] = [
                    'level' => $level,
                    'text' => $text,
                    'id' => $id
                ];
            }
        }

        return $headings;
    }

    /**
     * Converte string para slug (id-amigável)
     *
     * @param string $text Texto a converter
     * @return string Slug (lowercase, sem espaços, apenas letras/números)
     */
    private function slugify(string $text): string
    {
        $text = mb_strtolower($text, 'UTF-8');
        $text = preg_replace('/[^a-z0-9]+/', '-', $text);
        $text = trim($text, '-');
        return $text;
    }

    /**
     * Detecta idioma do conteúdo (heurística simples)
     *
     * @param string $markdown Conteúdo
     * @return string 'pt' ou 'en'
     */
    public function detectLanguage(string $markdown): string
    {
        // Palavras em português comuns
        $ptKeywords = ['introdução', 'objetivo', 'conteúdo', 'atividade', 'avaliação', 'referência'];

        foreach ($ptKeywords as $kw) {
            if (stripos($markdown, $kw) !== false) {
                return 'pt';
            }
        }

        return 'en';
    }

    /**
     * Adiciona syntax highlighting ao HTML
     * Nota: Requer highlight.js no frontend ou Pygments no backend
     *
     * @param string $html HTML com <code> tags
     * @param string $language Linguagem a usar
     * @return string HTML com classes de highlight
     */
    public function addSyntaxHighlighting(string $html, string $language = 'php'): string
    {
        // Adicionar classe 'hljs' aos blocos de código
        $html = preg_replace_callback(
            '/<code(?:\s+class="[^"]*")?>(.*?)<\/code>/s',
            function ($matches) use ($language) {
                $code = htmlspecialchars_decode($matches[1]);
                return '<code class="language-' . htmlspecialchars($language) . '">' . htmlspecialchars($code) . '</code>';
            },
            $html
        );

        return $html;
    }

    /**
     * Valida se o Markdown é válido
     *
     * @param string $markdown Conteúdo a validar
     * @return array { valid: bool, errors: array }
     */
    public function validate(string $markdown): array
    {
        $errors = [];

        // Verificar se está vazio
        if (empty(trim($markdown))) {
            $errors[] = "Markdown está vazio";
        }

        // Verificar tags não fechadas (heurística)
        $openBrackets = substr_count($markdown, '[');
        $closeBrackets = substr_count($markdown, ']');
        if ($openBrackets !== $closeBrackets) {
            $errors[] = "Colchetes não balanceados: $openBrackets abertos, $closeBrackets fechados";
        }

        // Verificar parênteses
        $openParen = substr_count($markdown, '(');
        $closeParen = substr_count($markdown, ')');
        if ($openParen !== $closeParen) {
            $errors[] = "Parênteses não balanceados";
        }

        return [
            'valid' => empty($errors),
            'errors' => $errors
        ];
    }
}
