CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE,
    status VARCHAR(15)
);