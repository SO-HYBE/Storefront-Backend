CREATE TYPE crntst AS ENUM ('new');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    quantity integer,
    user_id bigint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE,
    status crntst NOT NULL
);