CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL,
    userpassword VARCHAR NOT NULL
);