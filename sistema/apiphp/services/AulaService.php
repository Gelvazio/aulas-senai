<?php

namespace App\Services;

/**
 * Serviço para gerenciar aulas
 *
 * Responsabilidades:
 * - Listar aulas de uma matéria
 * - Gerar HTML a partir de Markdown
 * - Gerenciar arquivos HTML
 * - Gerar index.html com navegação
 */
class AulaService
{
    private $markdownService;
    private $pastaBase;

    public function __construct(string $pastaBase = null)
    {
        $this->markdownService = new MarkdownService();
        $this->pastaBase = $pastaBase ?? dirname(__DIR__) . '/../../';
    }

    /**
     * Lista todas as aulas de uma pasta AULAS/
     *
     * @param string $pastaAulas Caminho relativo ou absoluto da pasta AULAS
     * @return array Lista de aulas encontradas
     */
    public function listarAulas(string $pastaAulas): array
    {
        $aulas = [];
        $caminhoCompleto = $this->resolverCaminho($pastaAulas);

        if (!is_dir($caminhoCompleto)) {
            return ['erro' => "Pasta não encontrada: $caminhoCompleto"];
        }

        // Buscar arquivos AULA-*.md
        $arquivos = glob($caminhoCompleto . '/AULA-*.md');
        if (empty($arquivos)) {
            return [];
        }

        foreach ($arquivos as $arquivo) {
            $aulas[] = $this->extrairMetadadosAula($arquivo);
        }

        // Ordenar por número da aula
        usort($aulas, function ($a, $b) {
            return $a['numero'] <=> $b['numero'];
        });

        return $aulas;
    }

    /**
     * Extrai metadados de um arquivo de aula
     *
     * @param string $caminhoArquivo Caminho completo do arquivo
     * @return array Metadados da aula
     */
    private function extrairMetadadosAula(string $caminhoArquivo): array
    {
        $conteudo = file_get_contents($caminhoArquivo);

        // Extrair front matter
        $parsed = $this->markdownService->extractFrontMatter($conteudo);
        $metadata = $parsed['metadata'];
        $conteudoMarkdown = $parsed['content'];

        // Extrair título
        $titulo = $metadata['titulo'] ?? $this->markdownService->extractTitle($conteudoMarkdown);

        // Extrair número da aula do nome do arquivo
        $nomeArquivo = basename($caminhoArquivo, '.md');
        preg_match('/AULA-(\d+)/i', $nomeArquivo, $matches);
        $numero = (int) ($matches[1] ?? 0);

        return [
            'numero' => $numero,
            'titulo' => $titulo,
            'arquivo_md' => basename($caminhoArquivo),
            'arquivo_html' => str_replace('.md', '.html', basename($caminhoArquivo)),
            'duracao_horas' => $metadata['duracao'] ?? $metadata['duracao_horas'] ?? 2,
            'objetivos' => $metadata['objetivos'] ?? [],
            'tamanho_bytes' => strlen($conteudo),
            'tempo_leitura_min' => $this->markdownService->estimateReadingTime($conteudoMarkdown),
            'data_modificacao' => date('Y-m-d H:i:s', filemtime($caminhoArquivo))
        ];
    }

    /**
     * Gera HTML para todas as aulas de uma pasta
     *
     * @param string $pastaAulas Caminho da pasta AULAS
     * @param array $opcoes Opções: gerar_index, gerar_toc, etc
     * @return array { status, htmlsGerados, arquivos, erros }
     */
    public function gerarHtmlAulas(string $pastaAulas, array $opcoes = []): array
    {
        $caminhoCompleto = $this->resolverCaminho($pastaAulas);
        $htmlsGerados = [];
        $erros = [];

        if (!is_dir($caminhoCompleto)) {
            return [
                'status' => 'erro',
                'codigo' => 404,
                'erro' => "Pasta não encontrada: $caminhoCompleto"
            ];
        }

        // Listar aulas
        $aulas = $this->listarAulas($pastaAulas);
        if (isset($aulas['erro'])) {
            return [
                'status' => 'erro',
                'codigo' => 404,
                'erro' => $aulas['erro']
            ];
        }

        if (empty($aulas)) {
            return [
                'status' => 'aviso',
                'codigo' => 200,
                'mensagem' => 'Nenhuma aula encontrada para gerar HTML',
                'htmlsGerados' => 0
            ];
        }

        // Gerar HTML para cada aula
        foreach ($aulas as $aula) {
            try {
                $resultado = $this->gerarHtmlAula(
                    $caminhoCompleto . '/' . $aula['arquivo_md'],
                    $aula
                );

                if ($resultado['sucesso']) {
                    $htmlsGerados[] = $resultado['dados'];
                } else {
                    $erros[] = $resultado['erro'];
                }
            } catch (\Exception $e) {
                $erros[] = [
                    'arquivo' => $aula['arquivo_md'],
                    'erro' => $e->getMessage()
                ];
            }
        }

        // Gerar index.html se solicitado
        if ($opcoes['gerar_index'] ?? true) {
            try {
                $this->gerarIndexHtml($htmlsGerados, $caminhoCompleto);
            } catch (\Exception $e) {
                $erros[] = ['arquivo' => 'index.html', 'erro' => $e->getMessage()];
            }
        }

        return [
            'status' => empty($erros) ? 'ok' : 'parcial',
            'codigo' => 200,
            'htmlsGerados' => count($htmlsGerados),
            'arquivos' => $htmlsGerados,
            'erros' => $erros,
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * Gera HTML para uma aula individual
     *
     * @param string $caminhoMd Caminho completo do arquivo .md
     * @param array $metadadosAula Metadados extraídos
     * @return array { sucesso: bool, dados/erro }
     */
    private function gerarHtmlAula(string $caminhoMd, array $metadadosAula): array
    {
        $conteudo = file_get_contents($caminhoMd);
        if ($conteudo === false) {
            return [
                'sucesso' => false,
                'erro' => ['arquivo' => basename($caminhoMd), 'erro' => 'Não foi possível ler o arquivo']
            ];
        }

        // Validar Markdown
        $validacao = $this->markdownService->validate($conteudo);
        if (!$validacao['valid']) {
            return [
                'sucesso' => false,
                'erro' => ['arquivo' => basename($caminhoMd), 'erro' => implode('; ', $validacao['errors'])]
            ];
        }

        // Parse Markdown
        $parsed = $this->markdownService->extractFrontMatter($conteudo);
        $htmlConteudo = $this->markdownService->parseMarkdown($parsed['content']);

        // Extrair headings para TOC
        $headings = $this->markdownService->extractHeadings($htmlConteudo);

        // Gerar HTML completo
        $htmlCompleto = $this->gerarTemplateHtml(
            $metadadosAula['titulo'],
            $htmlConteudo,
            basename($caminhoMd),
            $metadadosAula['tempo_leitura_min'],
            $headings
        );

        // Salvar arquivo HTML
        $caminhoHtml = str_replace('.md', '.html', $caminhoMd);
        if (file_put_contents($caminhoHtml, $htmlCompleto) === false) {
            return [
                'sucesso' => false,
                'erro' => ['arquivo' => basename($caminhoHtml), 'erro' => 'Não foi possível escrever o arquivo HTML']
            ];
        }

        return [
            'sucesso' => true,
            'dados' => [
                'numero' => $metadadosAula['numero'],
                'titulo' => $metadadosAula['titulo'],
                'origem' => basename($caminhoMd),
                'saida' => basename($caminhoHtml),
                'tamanho_bytes' => strlen($htmlCompleto),
                'tempo_leitura_min' => $metadadosAula['tempo_leitura_min'],
                'data_geracao' => date('Y-m-d H:i:s')
            ]
        ];
    }

    /**
     * Gera template HTML completo da aula
     *
     * @param string $titulo Título da aula
     * @param string $conteudo HTML do conteúdo
     * @param string $nomeArquivo Nome do arquivo original
     * @param int $tempoLeitura Tempo de leitura em minutos
     * @param array $headings Headings para TOC
     * @return string HTML completo
     */
    private function gerarTemplateHtml(
        string $titulo,
        string $conteudo,
        string $nomeArquivo,
        int $tempoLeitura,
        array $headings
    ): string {
        $toc = $this->gerarToc($headings);
        $dataAgora = date('d/m/Y H:i');

        return <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$titulo — SENAI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css">
    <style>
        :root {
            --color-primary: #004384;
            --color-secondary: #f7941d;
            --bg-light: #fff;
            --text-light: #202124;
            --bg-code: #f5f5f5;
        }

        @media (prefers-color-scheme: dark) {
            [data-theme="dark"] {
                --bg-light: #1c1e2a;
                --text-light: #e0e3e8;
                --bg-code: #2d2d2d;
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--bg-light);
            color: var(--text-light);
            line-height: 1.7;
            transition: background 0.3s, color 0.3s;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 250px;
            gap: 2rem;
            padding: 2rem;
        }

        @media (max-width: 900px) {
            .container {
                grid-template-columns: 1fr;
            }
            .toc {
                display: none;
            }
        }

        .breadcrumb {
            display: flex;
            gap: 0.5rem;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
            color: #666;
        }

        .breadcrumb a {
            color: var(--color-primary);
            text-decoration: none;
        }

        .breadcrumb a:hover {
            text-decoration: underline;
        }

        .aula-header {
            border-bottom: 3px solid var(--color-secondary);
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
        }

        .aula-header h1 {
            font-size: 2.5rem;
            color: var(--color-primary);
            margin-bottom: 0.5rem;
        }

        .meta {
            display: flex;
            gap: 1.5rem;
            font-size: 0.95rem;
            color: #666;
        }

        .aula-content {
            max-width: 100%;
        }

        .aula-content h1 {
            font-size: 2rem;
            color: var(--color-primary);
            margin-top: 2rem;
            margin-bottom: 1rem;
        }

        .aula-content h2 {
            font-size: 1.5rem;
            color: var(--color-primary);
            margin-top: 1.5rem;
            margin-bottom: 0.8rem;
            border-left: 4px solid var(--color-secondary);
            padding-left: 1rem;
        }

        .aula-content h3 {
            font-size: 1.2rem;
            color: #555;
            margin-top: 1.2rem;
            margin-bottom: 0.6rem;
        }

        .aula-content p {
            margin-bottom: 1rem;
            text-align: justify;
        }

        .aula-content ul,
        .aula-content ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
        }

        .aula-content li {
            margin-bottom: 0.5rem;
        }

        .aula-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            border: 1px solid #ddd;
        }

        .aula-content table th {
            background: var(--color-primary);
            color: white;
            padding: 1rem;
            text-align: left;
        }

        .aula-content table td {
            padding: 0.8rem;
            border: 1px solid #ddd;
        }

        .aula-content table tr:hover {
            background: var(--bg-code);
        }

        .aula-content code {
            background: var(--bg-code);
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
        }

        .aula-content pre {
            background: var(--bg-code);
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 1rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }

        .aula-content pre code {
            background: none;
            padding: 0;
            border-radius: 0;
        }

        .toc {
            background: var(--bg-code);
            padding: 1.5rem;
            border-radius: 8px;
            position: sticky;
            top: 2rem;
            max-height: calc(100vh - 4rem);
            overflow-y: auto;
        }

        .toc h3 {
            font-size: 1rem;
            margin-bottom: 1rem;
            color: var(--color-primary);
        }

        .toc ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .toc li {
            margin-bottom: 0.5rem;
        }

        .toc a {
            color: var(--color-primary);
            text-decoration: none;
            font-size: 0.9rem;
        }

        .toc a:hover {
            text-decoration: underline;
        }

        .toc .level-2 {
            padding-left: 1rem;
        }

        .toc .level-3 {
            padding-left: 2rem;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2rem;
            border-top: 1px solid #ddd;
            margin-top: 3rem;
            font-size: 0.9rem;
            color: #666;
        }

        .footer button {
            background: var(--color-primary);
            color: white;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
        }

        .footer button:hover {
            background: var(--color-secondary);
        }

        .theme-toggle {
            margin-left: 0.5rem;
        }
    </style>
</head>
<body data-theme="light">
    <div class="container">
        <main>
            <nav class="breadcrumb">
                <a href="index.html">📚 Índice</a>
                <span>/</span>
                <span>$titulo</span>
            </nav>

            <header class="aula-header">
                <h1>$titulo</h1>
                <div class="meta">
                    <span>📚 SENAI — Aprendizagem Industrial</span>
                    <span>⏱️ ~$tempoLeitura min de leitura</span>
                    <span>📅 Gerado: $dataAgora</span>
                </div>
            </header>

            <article class="aula-content">
                $conteudo
            </article>

            <footer class="footer">
                <div>
                    <strong>Arquivo:</strong> $nomeArquivo<br>
                    Aula convertida de Markdown para HTML interativo
                </div>
                <div>
                    <button onclick="voltarIndex()">📑 Voltar ao Índice</button>
                    <button class="theme-toggle" onclick="toggleTema()">🌙 Tema</button>
                </div>
            </footer>
        </main>

        <aside class="toc">
            $toc
        </aside>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
    <script>
        (function() {
            const tema = localStorage.getItem('senai_tema') || 'light';
            if (tema === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        })();

        function toggleTema() {
            const html = document.documentElement;
            const tema = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', tema);
            localStorage.setItem('senai_tema', tema);
        }

        function voltarIndex() {
            window.location.href = 'index.html';
        }

        hljs.highlightAll();
    </script>
</body>
</html>
HTML;
    }

    /**
     * Gera Table of Contents (TOC) em HTML
     *
     * @param array $headings Array de headings extraídos
     * @return string HTML do TOC
     */
    private function gerarToc(array $headings): string
    {
        if (empty($headings)) {
            return '<h3>Índice</h3><p>Sem seções</p>';
        }

        $toc = '<h3>Índice</h3><ul>';

        foreach ($headings as $heading) {
            $levelClass = 'level-' . $heading['level'];
            $toc .= sprintf(
                '<li class="%s"><a href="#%s">%s</a></li>',
                $levelClass,
                htmlspecialchars($heading['id']),
                htmlspecialchars($heading['text'])
            );
        }

        $toc .= '</ul>';
        return $toc;
    }

    /**
     * Gera index.html com lista de aulas
     *
     * @param array $aulas Array de aulas geradas
     * @param string $pastaDestino Pasta onde salvar index.html
     * @return bool Sucesso ou falha
     */
    private function gerarIndexHtml(array $aulas, string $pastaDestino): bool
    {
        $cards = '';
        $totalBytes = 0;

        foreach ($aulas as $aula) {
            $totalBytes += $aula['tamanho_bytes'];

            $cards .= sprintf(
                <<<HTML
                <div class="aula-card">
                    <div class="aula-numero">AULA %02d</div>
                    <div class="aula-info">
                        <h3>%s</h3>
                        <p>⏱️ %d min de leitura</p>
                        <p>📅 %s</p>
                    </div>
                    <a href="%s" class="aula-link">▶️ Abrir</a>
                </div>
HTML
                ,
                $aula['numero'],
                htmlspecialchars($aula['titulo']),
                $aula['tempo_leitura_min'],
                $aula['data_geracao'],
                htmlspecialchars($aula['saida'])
            );
        }

        $html = <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Índice de Aulas — SENAI</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; background: #e8eaed; padding: 2rem; color: #202124; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #004384 0%, #0055b3 100%); color: white; padding: 3rem 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .header p { opacity: 0.9; }
        .aulas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .aula-card { background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.12); transition: transform 0.15s, box-shadow 0.15s; }
        .aula-card:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(0,67,132,0.15); }
        .aula-numero { font-size: 0.8rem; font-weight: 700; color: #f7941d; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
        .aula-info h3 { font-size: 1.2rem; color: #004384; margin-bottom: 0.5rem; }
        .aula-info p { font-size: 0.85rem; color: #888; margin-bottom: 0.3rem; }
        .aula-link { display: inline-block; background: #004384; color: white; padding: 0.6rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 1rem; transition: background 0.15s; }
        .aula-link:hover { background: #00306a; }
        .footer { text-align: center; margin-top: 3rem; padding: 1.5rem; color: #666; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Índice de Aulas Interativas</h1>
            <p>SENAI — Aprendizagem Industrial</p>
            <p>Total: " . count($aulas) . " aulas | " . round($totalBytes / 1024, 1) . " KB</p>
        </div>
        <div class="aulas-grid">
            $cards
        </div>
        <div class="footer">
            <p>Índice gerado em " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
HTML;

        return file_put_contents($pastaDestino . '/index.html', $html) !== false;
    }

    /**
     * Resolve caminho relativo para absoluto
     *
     * @param string $caminho Caminho relativo ou absoluto
     * @return string Caminho absoluto
     */
    private function resolverCaminho(string $caminho): string
    {
        // Se já é absoluto (em Windows: C:\, em Unix: /)
        if (DIRECTORY_SEPARATOR === '\\') {
            if (preg_match('/^[a-zA-Z]:/', $caminho)) {
                return $caminho;
            }
        } else {
            if (strpos($caminho, '/') === 0) {
                return $caminho;
            }
        }

        // Concatenar com base
        return rtrim($this->pastaBase, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . ltrim($caminho, '/\\');
    }
}
