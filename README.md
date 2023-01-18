# Skill Test Backend Developer

## Library yang dipakai

- express
- sequelize
- pg
- bcrypt
- multer
- jsonwebtoken
- nodemon

## Endpoint yang ada

### Endpoint Create Auth

- http:localhost:8000/api/login
- http:localhost:8000/api/register
- http:localhost:8000/api/forgotpassword

### Endpoint Create User Management

- http:localhost:8000/api/user
- http:localhost:8000/api/user
- http:localhost:8000/api/user/:id
- http:localhost:8000/api/user/:id

### Endpoint Create Product Management

- http:localhost:8000/api/product
- http:localhost:8000/api/product
- http:localhost:8000/api/product/:id
- http:localhost:8000/api/product/:id

## STEP

### terminal

- NPM init -y
- npm i
  - express
  - sequelize
  - pg
  - bcryptjs
  - jsonwebtoken
  - nodemon
- sequelize init
- sequelize db:create
- sequelize model:generate
  - user
  - user detail
  - product
- npm start
