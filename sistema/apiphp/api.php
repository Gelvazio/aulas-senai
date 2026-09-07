<?php

date_default_timezone_set('America/Maceio');

use \Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require_once "lib/slim/autoload.php";
require_once("core/Utils.php");

require_once("controllers/ControllerApiBase.php");
require_once("controllers/ControllerApiUsuario.php");
require_once("controllers/ControllerApiPessoa.php");
require_once("controllers/ControllerApiFolhaPagamento.php");
require_once("controllers/ControllerApiAula.php");
require_once("controllers/ControllerApiMateria.php");

class Routes {

    public function __construct()
    {
        $this->runApp();
    }

    /**
     * Executa o app para realizar a chamada de rotas
     *
     * @throws Throwable
     */
    protected function runApp()
    {
        $app = new \Slim\App($this->getConfigurationContainer());
        
        $app->add(function ($req, $res, $next) {
            $response = $next($req, $res);
            
            return $response
                // ->withHeader('Access-Control-Allow-Origin', 'https://atividades-senac-gelvazio.vercel.app')
                // Aceita todas as origens
                ->withHeader('Access-Control-Allow-Origin', '*')
                // Aceita somente os atributos headers desta lista abaixo
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, apikey, x-api-key-system')
                // Aceita apenas os metodos abaixo
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        });
        
        // Agrupando rotas para adicionar o middleware em todas as rotas de uma só vez
        $app->group('', function () use ($app) {
            // Pagina inicial da api
            $app->get('/', ControllerApiBase::class . ':home');

            // Ping
            $app->get('/ping', ControllerApiBase::class . ':callPing');
            
            // Rotas de testes
            $app->get('/test', ControllerApiBase::class . ':test');
            $app->put('/test', ControllerApiBase::class . ':test');
            $app->post('/test', ControllerApiBase::class . ':test');
            $app->delete('/test', ControllerApiBase::class . ':test');

            // Cadastros - Usuarios
            $app->get('/users', ControllerApiUsuario::class . ':getUsuario');
            $app->post('/users', ControllerApiUsuario::class . ':gravaUsuario');
            $app->delete('/users', ControllerApiUsuario::class . ':deleteUsuario');
            $app->post('/login', ControllerApiUsuario::class . ':loginUsuario');
            $app->put('/updatepassword', ControllerApiUsuario::class . ':updatePassword');
            
            //$app->get('/logintest', ControllerApiUsuario::class . ':loginUsuario');

            // Pessoas
            $app->get('/pessoa', ControllerApiPessoa::class . ':getPessoa');
            $app->post('/pessoa', ControllerApiPessoa::class . ':savePessoa');
            $app->delete('/pessoa', ControllerApiPessoa::class . ':deletePessoa');
            
            // Fornecedor
            // $app->post('/fornecedor', ControllerApiPessoa::class . ':getFornecedor');
            $app->post('/fornecedor', ControllerApiPessoa::class . ':savePessoa');
            
            // Folhas de pagamento
            $app->get('/folha', ControllerApiFolhaPagamento::class . ':index');

            // Aulas (NOVO)
            $app->get('/aulas/{materia_id}', ControllerApiAula::class . ':listarAulas');
            $app->post('/aulas/gerar', ControllerApiAula::class . ':gerarHtmlAulas');
            $app->post('/aulas/validar', ControllerApiAula::class . ':validarAulas');
            $app->get('/aulas/{aula_id}/html', ControllerApiAula::class . ':obterAulaHtml');

            // Matérias (NOVO)
            $app->get('/materias', ControllerApiMateria::class . ':listarMaterias');
            $app->get('/materias/{id}', ControllerApiMateria::class . ':obterMateria');
            $app->get('/materias/{id}/validar', ControllerApiMateria::class . ':validarEstrutura');
            $app->post('/materias/{id}/sincronizar', ControllerApiMateria::class . ':sincronizarAulas');
            $app->post('/materias/{id}/exportar', ControllerApiMateria::class . ':exportarMateria');

        })->add($this->getMiddlewares());

        $app->run();
    }

    /**
     * Retorna a configuração das rotas
     *
     * @return \Slim\Container
     */
    private function getConfigurationContainer()
    {
        // Configuração de erros
        $configuration = [
            'settings' => [
                'displayErrorDetails' => true,
                'determineRouteBeforeAppMiddleware' => true,
            ],
        ];
        $configurationContainer = new \Slim\Container($configuration);

        return $configurationContainer;
    }

    /**
     * Retorna os midlewares de validação de rotas
     *
     * @return Closure
     */
    private function getMiddlewares()
    {
        // Middlewares
        $Middlware = function (Request $request, Response $response, $next) {
            
            $headers = $request->getHeaders();
            
            // if(isset($headers["HTTP_APIKEY"]) && is_array($headers["HTTP_APIKEY"])){
            //     $token = $headers["HTTP_APIKEY"][0];
            //     if (trim($token) == "") {
            //         $data = array("message" => "Acesso inválido - TOKEN - Envio:" . $token);
            //         return $response->withJson($data, 401);
            //     }
            //
            //     // Verifica se esse token de usuario existe
            //     if (!Routes::isValidTokenUsuario($token)) {
            //         $data = array("message" => "Token inválido", "token informado:" => $token);
            //         return $response->withJson($data, 401);
            //     }
            //
            // } else {
            //     $data = array("message" => "Token inválido!");
            //     return $response->withJson($data, 401);
            // }

            $response = $next($request, $response);

            return $response;
        };

        return $Middlware;
    }
  
    public static function isValidTokenUsuario($token) {
        require_once("core/Query.php");
        $oQuery = new Query();
        
        $aDados = $oQuery->select("select usutoken as token
                                     from tbusuario
                                    where tbusuario.usutoken = '$token'
                                      and coalesce(tbusuario.usuativo, 0) = 1");
        
        if (!$aDados) {
            return false;
        }
        
        return true;
    }
}

$routes = new Routes();
