//@ts-ignore

import database from '../database'

export type Order = {
    id?: string,
    user_id: string,
    status: string
}

export class OrderStore {
    async createOrder(order: Order): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await database.connect()
            const sql = 'INSERT INTO orders (user_id , status) VALUES ($1,$2) RETURNING *'
            const result = await conn.query(sql, [order.user_id, order.status])
            const orders = result.rows[0]
            
            conn.release();
            return orders;
        } catch (err) {
            throw new Error (`Could not add order ${order.id}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await database.connect()
      
            const result = await conn.query(sql, [quantity, orderId, productId])
      
            const order = result.rows[0]
      
            conn.release()
      
            return order
          } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
          }
    }

    async selectOrdersById(userId: string): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=$1'
            const result = await conn.query(sql, [userId]);
            
            conn.release()

            return result.rows;
        } catch (err) {
            throw new Error (`Could not get the orders using the id: ${userId}. Error : ${err}`)
        }
    }
};
