<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

/**
 * Chamada da api Pessoa.
 *
 * User: Gelvazio Camargo
 * Date: 10/12/2020
 * Time: 17:40
 */
require_once("ControllerApiBase.php");
class ControllerApiPessoa extends ControllerApiBase {

    public function getPessoa(Request $request, Response $response, array $args) {
        $body = $request->getParsedBody();
    
        $pescodigo   = isset($body["pescodigo"]) ? $body["pescodigo"] : false;
    
        $sSql = "SELECT * FROM tbpessoa ORDER BY 1 desc ";
        if($pescodigo){
            $sSql = "SELECT * FROM tbpessoa where pescodigo = $pescodigo";
        }
        
        $aDados = $this->getQuery()->selectAll($sSql);
        
        return $response->withJson($aDados, 200);
    }

    public function getConsultaPessoa(Request $request, Response $response, array $args) {
        $sSql = "SELECT * FROM pessoa ORDER BY pescodigo";
        
        $aDados = $this->getQuery()->selectAll($sSql);
        
        return $response->withJson($aDados, 200);
    }
    
    public function savePessoa(Request $request, Response $response, array $args) {
        $body = $request->getParsedBody();
        
        $pescodigo   = isset($body["pescodigo"]) ? $body["pescodigo"] : false;
        $pesnome     = isset($body["pesnome"]) ? $body["pesnome"] : "NOME EM BRANCO";
        $pesendereco = isset($body["pesendereco"]) ? $body["pesendereco"] : "ENDERECO EM BRANCO";
        $pescpf      = isset($body["pescpf"]) ? $body["pescpf"] : "CPF EM BRANCO";
    
        // Se tiver codigo, e uma alteração, entao executa um update
        if($pescodigo){
            $sql = "update tbpessoa set pesnome = '$pesnome', pesendereco = '$pesendereco', pescpf = '$pescpf' where pescodigo = $pescodigo";
        } else {
            $sql = "insert into tbpessoa(pesnome,pesendereco,pescpf)values('$pesnome', '$pesendereco', '$pescpf');";
        }
        
        $executouQuery = $this->getQuery()->executaQuery($sql);
        
        if($executouQuery){
            $sSql = "SELECT * FROM tbpessoa ORDER BY 1 desc limit 1";
            if($pescodigo){
                $sSql = "SELECT * FROM tbpessoa where pescodigo = $pescodigo";
            }
            
            $aDados = $this->getQuery()->selectAll($sSql);
            
            return $response->withJson(array("status" => true, "mensagem" => "Registro inserido/alterado com sucesso!", "Pessoa" => $aDados), 200);
        }
        
        return $response->withJson(array("status" => false, "mensagem" => "Erro ao inserir/alterar registro!"), 200);
    }
    
    public function deletePessoa(Request $request, Response $response, array $args) {
        $body = $request->getParsedBody();
        
        $pescodigo   = isset($body["pescodigo"]) ? $body["pescodigo"] : false;
        
        $mensagem = "Não foi informado o parametro 'pescodigo' no body!";
        if($pescodigo){
            $sql = "delete from tbpessoa where pescodigo = $pescodigo";
            $executouQuery = $this->getQuery()->executaQuery($sql);
        
            if($executouQuery){
                return $response->withJson(array("status" => true, "mensagem" => "Registro excluido com sucesso!"), 200);
            }
            
            $mensagem = "Erro ao excluir registro!";
        }
        
        return $response->withJson(array("status" => false, "mensagem" => $mensagem), 200);
    }
    
    public function getFornecedor(Request $request, Response $response, array $args) {
        $body = $request->getParsedBody();
        
        return $response->withJson($body , 200);
    }
    
}
