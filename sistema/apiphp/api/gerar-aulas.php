<?php
/**
 * API para Converter Markdown → HTML
 *
 * Endpoint: POST /api/gerar-aulas.php
 *
 * Request JSON:
 * {
 *   "acao": "gerar_aulas",
 *   "pasta_aulas": "/AULAS",
 *   "formato": "html"
 * }
 *
 * Response JSON:
 * {
 *   "status": "ok",
 *   "htmlsGerados": 10,
 *   "mensagem": "Conversão completa: 10 HTMLs gerados"
 * }
 */

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, Authorization');

// Responder a OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

date_default_timezone_set('America/Maceio');

// Classe simples para parsear Markdown
class MarkdownParser {
    public static function toHtml($markdown) {
        $html = htmlspecialchars($markdown, ENT_QUOTES, 'UTF-8');

        // Títulos
        $html = preg_replace('/^### (.+)$/m', '<h3>$1</h3>', $html);
        $html = preg_replace('/^## (.+)$/m', '<h2>$1</h2>', $html);
        $html = preg_replace('/^# (.+)$/m', '<h1>$1</h1>', $html);

        // Bold
        $html = preg_replace('/\*\*(.+?)\*\*/s', '<strong>$1</strong>', $html);
        $html = preg_replace('/__(.+?)__/s', '<strong>$1</strong>', $html);

        // Italic
        $html = preg_replace('/\*(.+?)\*/s', '<em>$1</em>', $html);
        $html = preg_replace('/_(.+?)_/s', '<em>$1</em>', $html);

        // Listas
        $html = preg_replace('/^\- (.+)$/m', '<li>$1</li>', $html);
        $html = preg_replace('/(<li>.*?<\/li>)/s', '<ul>$1</ul>', $html);

        // Parágrafos
        $html = str_replace("\n\n", '</p><p>', $html);
        if (strpos($html, '</p>') === false) {
            $html = '<p>' . $html . '</p>';
        }

        return $html;
    }
}

class GeradorAulas {
    private $pastaAulas;
    private $htmlsGerados = [];
    private $erros = [];

    public function __construct($pastaAulas) {
        $this->pastaAulas = $pastaAulas;
    }

    /**
     * Gera todos os HTMLs a partir dos MDs
     */
    public function gerar() {
        // Verificar se pasta existe
        if (!is_dir($this->pastaAulas)) {
            return [
                'status' => 'erro',
                'erro' => "Pasta não encontrada: {$this->pastaAulas}",
                'codigo' => 404
            ];
        }

        // Buscar todos os arquivos .md
        $arquivos = glob($this->pastaAulas . '/AULA-*.md');

        if (empty($arquivos)) {
            return [
                'status' => 'erro',
                'erro' => "Nenhum arquivo AULA-*.md encontrado em {$this->pastaAulas}",
                'codigo' => 404
            ];
        }

        // Processar cada arquivo
        foreach ($arquivos as $arquivo) {
            try {
                $this->processarAula($arquivo);
            } catch (Exception $e) {
                $this->erros[] = [
                    'arquivo' => basename($arquivo),
                    'erro' => $e->getMessage()
                ];
            }
        }

        // Gerar index.html
        try {
            $this->gerarIndex();
        } catch (Exception $e) {
            $this->erros[] = [
                'arquivo' => 'index.html',
                'erro' => $e->getMessage()
            ];
        }

        return [
            'status' => 'ok',
            'htmlsGerados' => count($this->htmlsGerados),
            'arquivosGerados' => $this->htmlsGerados,
            'mensagem' => sprintf(
                'Conversão completa: %d HTMLs gerados com sucesso',
                count($this->htmlsGerados)
            ),
            'erros' => $this->erros,
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * Processa um arquivo AULA-XX.md e gera AULA-XX.html
     */
    private function processarAula($caminhoMd) {
        $conteudo = file_get_contents($caminhoMd);

        if ($conteudo === false) {
            throw new Exception("Não foi possível ler o arquivo: $caminhoMd");
        }

        // Parse Markdown → HTML
        $htmlConteudo = MarkdownParser::toHtml($conteudo);

        // Extrai título (primeira linha ou primeira linha que começa com #)
        preg_match('/^#+ (.+)$/m', $conteudo, $matches);
        $titulo = $matches[1] ?? basename($caminhoMd, '.md');

        // Gera HTML completo
        $htmlCompleto = $this->gerarHtmlAula($titulo, $htmlConteudo, basename($caminhoMd));

        // Salva arquivo HTML
        $caminhoHtml = str_replace('.md', '.html', $caminhoMd);
        if (file_put_contents($caminhoHtml, $htmlCompleto) === false) {
            throw new Exception("Não foi possível escrever: $caminhoHtml");
        }

        $this->htmlsGerados[] = [
            'origem' => basename($caminhoMd),
            'saida' => basename($caminhoHtml),
            'titulo' => $titulo,
            'tamanho' => strlen($htmlCompleto),
            'data' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * Gera HTML completo de uma aula
     */
    private function gerarHtmlAula($titulo, $conteudo, $nomeArquivo) {
        return <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$titulo — SENAI</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            background: #e8eaed;
            min-height: 100vh;
            line-height: 1.6;
            color: #202124;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }

        .header {
            background: linear-gradient(135deg, #004384 0%, #0055b3 100%);
            color: #fff;
            padding: 32px 24px;
            border-bottom: 4px solid #f7941d;
        }

        .header h1 {
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: 700;
        }

        .header .meta {
            font-size: 13px;
            opacity: 0.8;
        }

        .content {
            padding: 32px 24px;
        }

        h1, h2, h3 {
            margin-top: 24px;
            margin-bottom: 12px;
            color: #004384;
        }

        h1 {
            font-size: 24px;
            border-bottom: 2px solid #f7941d;
            padding-bottom: 8px;
        }

        h2 {
            font-size: 20px;
            margin-top: 28px;
        }

        h3 {
            font-size: 16px;
        }

        p {
            margin-bottom: 16px;
            text-align: justify;
        }

        ul, ol {
            margin-left: 24px;
            margin-bottom: 16px;
        }

        li {
            margin-bottom: 8px;
        }

        strong {
            color: #e65100;
            font-weight: 700;
        }

        em {
            font-style: italic;
            color: #555;
        }

        .footer {
            padding: 24px;
            border-top: 1px solid #e8eaed;
            background: #f8f9fa;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #666;
        }

        .btn {
            display: inline-block;
            background: #004384;
            color: #fff;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.15s;
            border: none;
            cursor: pointer;
        }

        .btn:hover {
            background: #00306a;
        }

        .btn.secondary {
            background: #f1f3f4;
            color: #004384;
            margin-right: 8px;
        }

        .btn.secondary:hover {
            background: #e8eaed;
        }

        @media (max-width: 640px) {
            .header {
                padding: 20px 16px;
            }

            .header h1 {
                font-size: 20px;
            }

            .content {
                padding: 20px 16px;
            }

            .footer {
                flex-direction: column;
                gap: 12px;
            }
        }

        [data-theme="dark"] {
            background: #0a0d18;
            color: #e0e3e8;
        }

        [data-theme="dark"] .container {
            background: #1c1e2a;
        }

        [data-theme="dark"] h1,
        [data-theme="dark"] h2,
        [data-theme="dark"] h3 {
            color: #5588cc;
        }

        [data-theme="dark"] .header {
            background: linear-gradient(135deg, #003068 0%, #004384 100%);
        }

        [data-theme="dark"] .footer {
            background: #252830;
            border-color: #3a3d4a;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>$titulo</h1>
            <div class="meta">
                📚 SENAI — Aprendizagem Industrial
                <br>
                ⏱️ Gerado em: <strong>" . date('d/m/Y H:i') . "</strong>
            </div>
        </div>

        <div class="content">
            $conteudo
        </div>

        <div class="footer">
            <div>
                Arquivo: <strong>$nomeArquivo</strong>
                <br>
                Aula convertida de Markdown para HTML interativo
            </div>
            <div>
                <button class="btn secondary" onclick="toggleTema()">🌙 Escuro</button>
                <button class="btn" onclick="voltarIndex()">📑 Voltar ao Índice</button>
            </div>
        </div>
    </div>

    <script>
        // Aplicar tema salvo
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
    </script>
</body>
</html>
HTML;
    }

    /**
     * Gera index.html com links para todas as aulas
     */
    private function gerarIndex() {
        $htmlsLinks = '';

        foreach ($this->htmlsGerados as $aula) {
            $htmlsLinks .= <<<HTML
        <div class="aula-card">
            <div class="aula-numero">
                {$aula['saida']}
            </div>
            <div class="aula-info">
                <h3>{$aula['titulo']}</h3>
                <p>Tamanho: {$aula['tamanho']} bytes</p>
                <p>Convertida em: {$aula['data']}</p>
            </div>
            <a href="{$aula['saida']}" class="aula-link">
                ▶️ Abrir Aula
            </a>
        </div>
HTML;
        }

        $html = <<<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Índice de Aulas — SENAI</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            background: #e8eaed;
            min-height: 100vh;
            padding: 24px;
            color: #202124;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .header {
            background: linear-gradient(135deg, #004384 0%, #0055b3 100%);
            color: #fff;
            padding: 40px 32px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 32px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 12px;
            font-weight: 700;
        }

        .header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .aulas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }

        .aula-card {
            background: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.12);
            display: flex;
            flex-direction: column;
            gap: 12px;
            transition: transform 0.15s, box-shadow 0.15s;
        }

        .aula-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0,67,132,0.15);
        }

        .aula-numero {
            font-size: 11px;
            font-weight: 700;
            color: #f7941d;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .aula-info h3 {
            font-size: 18px;
            color: #004384;
            margin-bottom: 8px;
        }

        .aula-info p {
            font-size: 12px;
            color: #888;
            margin-bottom: 4px;
        }

        .aula-link {
            display: inline-block;
            background: #004384;
            color: #fff;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            text-align: center;
            transition: background 0.15s;
            margin-top: 8px;
        }

        .aula-link:hover {
            background: #00306a;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 24px;
            color: #666;
            font-size: 12px;
        }

        @media (max-width: 640px) {
            .header {
                padding: 24px 16px;
            }

            .header h1 {
                font-size: 24px;
            }

            .aulas-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Índice de Aulas Interativas</h1>
            <p>SENAI — Aprendizagem Industrial</p>
            <p>Total de aulas: " . count($this->htmlsGerados) . "</p>
        </div>

        <div class="aulas-grid">
            $htmlsLinks
        </div>

        <div class="footer">
            <p>Índice gerado em: " . date('d/m/Y H:i:s') . "</p>
            <p>Total de aulas: " . count($this->htmlsGerados) . " | Tamanho total: " . $this->calcularTamanhoTotal() . " bytes</p>
        </div>
    </div>
</body>
</html>
HTML;

        $caminhoIndex = $this->pastaAulas . '/index.html';
        if (file_put_contents($caminhoIndex, $html) === false) {
            throw new Exception("Não foi possível criar index.html");
        }
    }

    private function calcularTamanhoTotal() {
        $total = 0;
        foreach ($this->htmlsGerados as $aula) {
            $total += $aula['tamanho'];
        }
        return $total;
    }
}

// ========================================
// Handler Principal
// ========================================

try {
    // Ler JSON do body
    $json = file_get_contents('php://input');
    $dados = json_decode($json, true);

    if ($dados === null) {
        throw new Exception('JSON inválido ou vazio');
    }

    $acao = $dados['acao'] ?? null;

    if ($acao !== 'gerar_aulas') {
        throw new Exception("Ação desconhecida: $acao");
    }

    $pastaAulas = $dados['pasta_aulas'] ?? '/AULAS';

    // Converter para caminho absoluto se necessário
    if (strpos($pastaAulas, '/') === 0) {
        // Caminho absoluto dentro do container
        $pastaAulas = '/var/www/html' . $pastaAulas;
    }

    // Instanciar gerador e processar
    $gerador = new GeradorAulas($pastaAulas);
    $resultado = $gerador->gerar();

    // Retornar resultado
    http_response_code($resultado['codigo'] ?? 200);
    echo json_encode($resultado, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'erro',
        'codigo' => 500,
        'erro' => $e->getMessage(),
        'arquivo' => $e->getFile(),
        'linha' => $e->getLine(),
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
