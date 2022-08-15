CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price VARCHAR NOT NULL,
    category VARCHAR(64) NOT NULL
);