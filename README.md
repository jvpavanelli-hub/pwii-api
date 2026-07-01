# PWII - API de Gerenciamento de Usuários

API REST feita com **Express.js** e **MySQL puro** (sem ORM), para gerenciamento de usuários.

## Estrutura do projeto

```
pwii-api/
├── sql/
│   └── schema.sql          # script para criar o banco e a tabela
├── src/
│   ├── config/
│   │   └── db.js           # conexão com o MySQL (mysql2)
│   ├── controllers/
│   │   └── userController.js
│   ├── middlewares/
│   │   └── validate.js     # validações dos campos
│   ├── routes/
│   │   └── userRoutes.js
│   ├── seed.js             # cria o usuário admin inicial
│   └── server.js           # ponto de entrada da aplicação
├── .env.example
├── .gitignore
└── package.json
```

## Passo a passo para rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar o banco de dados

Com o MySQL rodando, execute o script `sql/schema.sql`. Pode ser pelo terminal:

```bash
mysql -u root -p < sql/schema.sql
```

Ou copie e cole o conteúdo do arquivo no MySQL Workbench / DBeaver / phpMyAdmin.

### 3. Configurar as variáveis de ambiente

Copie o `.env.example` para `.env` e ajuste com seus dados do MySQL:

```bash
cp .env.example .env
```

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=pwii_users
DB_PORT=3306
PORT=3000
```

### 4. Criar o usuário admin

```bash
npm run seed
```

Isso cria automaticamente:
- **usuário:** `admin`
- **senha:** `admin123`

### 5. Rodar a aplicação

```bash
npm run dev
```

A API vai subir em `http://localhost:3000`.

## Endpoints

| Método | Rota               | Descrição                       |
|--------|--------------------|----------------------------------|
| GET    | /api/usuarios      | Lista todos os usuários         |
| GET    | /api/usuarios/:id  | Busca um usuário pelo ID        |
| POST   | /api/usuarios      | Cria um novo usuário            |
| PUT    | /api/usuarios/:id  | Atualiza um usuário             |
| DELETE | /api/usuarios/:id  | Remove um usuário               |
| POST   | /api/login         | Faz login (usuário + senha)     |

### Exemplo - Criar usuário

```http
POST /api/usuarios
Content-Type: application/json

{
  "usuario": "joao123",
  "senha": "minhasenha"
}
```

### Exemplo - Login

```http
POST /api/login
Content-Type: application/json

{
  "usuario": "admin",
  "senha": "admin123"
}
```

### Regras de validação

- `usuario`: obrigatório, mínimo 3 caracteres, sem espaços, único no banco.
- `senha`: obrigatória, mínimo 6 caracteres (é armazenada com hash bcrypt, nunca em texto puro).

## Observações

- Não foi usado nenhum ORM (Sequelize, Prisma, etc.) — todas as queries usam `mysql2` com SQL puro, conforme pedido no trabalho.
- A senha é armazenada com hash (`bcrypt`) por boa prática de segurança, mesmo sem o JWT da parte extra.
