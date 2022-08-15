------------------------------------------------------------STOREFRONT BACKEND------------------------------------------------------------

This project was made by Sohib Amer in 8/11/2022.

It was made for a Udacity course (Web Development- Advanced Track).

The project is a storefront backend that acts as a shopping service for a client.

I learnt alot about using psql, testing with jasmine, password hashing, jwt tokens, security, and using yarn to make better code.

I tried to be as convinient as possible in my project.

THE PORT NUMBER FOR DB: 5432
THE PORT NUMBER FOR SERVER: 3000

THE ENVIRONMENT VARIABLES ARE:

POSTGRES_HOST=localhost
POSTGRES_DB=store_front
POSTGRES_DB_TEST=store_front_test
POSTGRES_USER=random_user
POSTGRES_PASSWORD=hardpassword38
ENV=dev
BCRYPT_PASSWORD=just-a-random-string
SALT_ROUNDS=10
TOKEN_SECRET=crunchyspinach1

PACKAGE INSTALLATION INSTRUCTIONS:
 - npm install express
 - npm install @types/express
 - npm install -D typescript
 - npm install -g db-migrate
 - npm install --save cors
 - npm install bcrypt
 - npm install -D @types/bcrypt
 - npm install jswonwebtoken --save
 - npm install -D @types/jsonwebtoken
 - npm install pg
 - npm install -D jasmine
 - npm install -D env
 - npm install -D @types/dotenv
 - npm install -D @types/pg
 - npm install -D jasmine-spec-reporter
 - npm install -D jasmine-ts
 - npm install supertest
 - npm install --save-dev @types/supertest

TO SETUP DATABASES:
 -  psql -U postgres
 - CREATE USER random_user WITH PASSWORD 'hardpassword38';

 - CREATE DATABASE store_front;

 - CREATE DATABASE store_front_test;

 - \c store_front

 - GRANT ALL PRIVILEGES ON DATABASE store_front to random_user;


 - \c store_front_test

 - GRANT ALL PRIVILEGES ON DATABASE store_front_test to random_user;

MIGRATIONS UP:
 - CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    FOREIGN KEY (order_id) REFERENCES  orders(id) ON DELETE CASCADE,
    product_id bigint REFERENCES products(id),
    FOREIGN KEY (product_id) REFERENCES  products(id) ON DELETE CASCADE,
);

 - CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE,
    status VARCHAR(15)
);
 
 - CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64),
    lastname VARCHAR(64),
    username VARCHAR(64),
    password_digest VARCHAR
};
 
 - CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(64) NOT NULL
);

MIGRATIONS DOWN:
- DROP TABLE order_products;
- DROP TABLE orders;
- DROP TABLE users;
- DROP TABLE products;

ENPOINTS:

- POST '/orders/:id' create order
- POST '/orders/:id/products' add products to an order
- GET '/orders/:user_id' get order by id
- GET '/products' index
- GET '/products/:id' show 
- POST '/products' create
- GET '/products/:category' get product by category
- GET '/users' index
- GET '/users/:id' show
- POST '/users' create

TO RUN THE CODE: 

- type yarn in the terminal
- yarn watch to initialize and run the server
- yarn db:up to migrate up
- Then you can use the users, orders, and products methods

TO TEST THE CODE:
- type yarn db:up to initiate the migrations 
- type yarn test in the terminal

---------------------THIS PROJECT IS FULLY MADE BY SOHIB AMER AND ALL COPYRIGHTS ARE SAVED FOR HIM---------------------
