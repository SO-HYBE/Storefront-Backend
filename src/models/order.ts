//@ts-ignore

import database from '../database'

export type Order = {
    id?: number,
    user_id: number,
    status: string
}

export type Order_Product = {
    id?: number,
    quantity: number,
    product_id: number,
    order_id: number
 }
export class OrderStore {

    async index(): Promise<Order[]> {
        try{
            // @ts-ignore
            const conn = await database.connect()
            const sql = "SELECT * FROM orders"

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error (`Could not get orders. Error: ${err}`)
        }
    }

    async show (id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await database.connect()
        
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
            } catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`)
            }
    }

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

    async addProduct(quantity: number, product_id: number, order_id: number): Promise<Order_Product> {
        try {
            //@ts-ignore
            const conn = await database.connect()
            const sql = 'INSERT INTO order_products (quantity, product_id, order_id) VALUES($1, $2, $3) RETURNING *'     
            const result = await conn.query(sql, [quantity, product_id, order_id])
            console.log(2)
            console.log(typeof(product_id))
            console.log(product_id)
            const order = result.rows[0]
      
            conn.release()
      
            return order
          } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id} : ${err}`)
          }
    }

    async selectOrdersById(user_id: number): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE user_id = ($1)'
            const result = await conn.query(sql, [user_id]);
            conn.release()

            return result.rows;
        } catch (err) {
            throw new Error (`Could not get the orders using the id: ${user_id}. Error : ${err}`)
        }
    }
    async deleteAll(): Promise<Order> {
        try {
          //@ts-ignore
          const conn = await database.connect();
          const sql = 'DELETE FROM orders RETURNING *';
          const result = await conn.query(sql);
          conn.release();
    
          return result.rows;
        } catch (err) {
          throw new Error(`Orders can not be deleted . Error: ${err}`);
        }
      }
};
