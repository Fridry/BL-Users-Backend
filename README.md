# Users REST API

API para manipulação de informações sobre um usuário.

## Criada utilizando

- Typescript;
- Express;
- Cors;
- MongoDB;
- Mongoose;
- Jest;
- Faker;
- cpf-cnpj-validator.

## Instalação

    yarn install

Crie um arquivo .env ou altere o arquivo .env.exemple e complete com as informações solicitadas.

## Iniciar a API

    yarn dev

A aplicação irá iniciar em: http://localhost:3333

## Rodar os testes

    yarn test (--watchAll)

## Buscar usuários cadastrados no sistema

### Request

`GET /user`

### Response

    [
      {
        "_id": "ObjectID",
        "name": "Primeiro nome",
        "lastname": "Sobrenome",
        "phone": "Telefone",
        "cpf": "CPF",
      }
    ]

## Buscar um usuário cadastrado no sistema utilizando o CPF

### Request

`GET /user/cpf`

### Response

    {
      "_id": "ObjectID",
      "name": "Primeiro nome",
      "lastname": "Sobrenome",
      "phone": "Telefone",
      "cpf": "CPF",
    }

## Caso um usuário não seja encontrado

### Request

`GET /user/cpf`

### Response

    {
      "success": false,
      "msg": "Informações do CPF não armazenadas."
    }

## Cadastrar um usuário no sistema

### Request

`POST /user`

    {
      "name": "Primeiro nome",
      "lastname": "Sobrenome",
      "phone": "Telefone",
      "cpf": "CPF",
    }

### Response

    {
      "_id": "ObjectID",
      "name": "Primeiro nome",
      "lastname": "Sobrenome",
      "phone": "Telefone",
      "cpf": "CPF",
    }

## Atualizar um usuário no sistema utilizando o CPF

### Request

`PUT /user/cpf`

    {
      "name": "Primeiro nome atualizado"
    }

### Response

    {
      "_id": "ObjectID",
      "name": "Primeiro nome atualizado",
      "lastname": "Sobrenome",
      "phone": "Telefone",
      "cpf": "CPF",
    }

## Excluir um usuário cadastrado no sistema utilizando o CPF

### Request

`DELETE /user/cpf`

### Response

`No body`
