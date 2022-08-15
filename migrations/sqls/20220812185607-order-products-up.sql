CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES  products(id) ON DELETE CASCADE,
    order_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES  orders(id) ON DELETE CASCADE
);