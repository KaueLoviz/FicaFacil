<?php

namespace Model;

class UserModel
{

    private string $nome;
    private string $email;
    private string $senha;

    public function getNome(): string
    {
        return $this->nome;
    }
    public function getEmail(): string
    {
        return $this->email;
    }
    public function getSenha(): string
    {
        return $this->senha;
    }
    public function setNome(string $nome): void
    {
        $this->nome = $nome;
    }
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }
    public function setSenha(string $senha): void
    {
        $this->senha = $senha;
    }


    public function get($params)
    {
    }
    public function post($params)
    {
    }
    public function put($params)
    {
    }
    public function delete($params)
    {
    }
}
