------------------------------------------------------------STOREFRONT BACKEND------------------------------------------------------------

This project was made by Sohib Amer in 8/11/2022.

It was made for a Udacity course (Web Development- Advanced Track).

The project is a storefront backend that acts as a shopping service for a client.

I learnt alot about using psql, testing with jasmine, password hashing, jwt tokens, security, and using yarn to make better code.

I tried to be as convinient as possible in my project.

TO RUN THE DATABASE:

-in the server's root user type: psql postgres
-CREATE USER random_user WITH PASSWORD 'hardpassword38';

-CREATE DATABASE store_front;

-CREATE DATABASE store_front_test;

-\c store_front

GRANT ALL PRIVILEGES ON DATABASE store_front to random_user;


-\c store_front_test

GRANT ALL PRIVILEGES ON DATABASE store_front_test to random_user;

TO RUN THE CODE: 

- type yarn in the terminal
- yarn watch to initialize and run the server
- yarn db:up to migrate up
- Then you can use the users, orders, and products methods

TO TEST THE CODE: 
- type yarn test in the terminal

---------------------THIS PROJECT IS FULLY MADE BY SOHIB AMER AND ALL COPYRIGHTS ARE SAVED FOR HIM---------------------
