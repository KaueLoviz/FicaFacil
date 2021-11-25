<?php

namespace Model;

use PDO;
use Helper\Response;
use Helper\Connection;

class ProceduresModel{

public function getTodosAcertos(
        $dentro = ':cliente, :inicio, :fim',
        $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
        ] 
    ){
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getAcertos($dentro)");
            if($stmt->execute($parametros)){
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    } 
    
    public function getTodosErros(
        $dentro = ':cliente, :inicio, :fim',
        $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
        ] 
    ){
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getErros($dentro)");
            if($stmt->execute($parametros)){
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getQuantidadeQuestoesPorCliente(
        $dentro = ':cliente, :inicio, :fim, :materia',
        $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
            ':materia' => null,
        ] 
    ){
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getQuantidadeQuestoesPorCliente($dentro)");
            if($stmt->execute($parametros)){
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getSimuladosRefazer(
        $dentro = ':cliente, :inicio, :fim',
        $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
        ] 
    ){
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getSimuladosPorCliente($dentro)");
            if($stmt->execute($parametros)){
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getSimuladosPorCliente(
        $dentro = ':cliente, :inicio',
        $parametros = [
            ':cliente' => null,
            ':inicio' => null,
        ] 
    ){
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getSimuladosPorCliente($dentro)");
            if($stmt->execute($parametros)){
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }
}
?>