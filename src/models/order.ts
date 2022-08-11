//@ts-ignore

import database from '../database'

export type Order = {
    id?: string,
    product_id: string,
    quantity?: string,
    user_id: string,
    status: string
}

export class OrderStore {
    async createOrder(order: Order): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await database.connect()
            const sql = 'INSERT INTO orders (product_id , quantity , user_id , status) VALUES ($1,$2,$3,$4) RETURNING *'
            const result = await conn.query(sql, [order.product_id, order.quantity, order.user_id, order.status])
            const orders = result.rows[0]
            
            conn.release();
            return orders;
        } catch (err) {
            throw new Error (`Could not add order ${order.id}. Error: ${err}`)
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
