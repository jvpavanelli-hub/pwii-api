# API PWII - Gerenciamento de Usuários

Trabalho final de PWII. API feita em Express com MySQL (sem ORM).

## Como rodar o projeto

1. Instale as dependências:
2. Crie o banco rodando o arquivo `sql/schema.sql` no MySQL.

3. Copie o arquivo `.env.example` para `.env` e coloque os dados do seu MySQL:
4. Crie o usuário admin:
(usuário: admin / senha: admin123)

5. Rode o projeto:
A API sobe em `http://localhost:3000`

## Rotas

- GET /api/usuarios
- GET /api/usuarios/:id
- POST /api/usuarios
- PUT /api/usuarios/:id
- DELETE /api/usuarios/:id
- POST /api/login

## Integrantes
- João Vitor Pavanelli
- Vitor Alencar
