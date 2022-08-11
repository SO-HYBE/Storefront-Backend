CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64),
    lastname VARCHAR(64),
    username VARCHAR(64),
    password_digest VARCHAR
};