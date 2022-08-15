import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authMiddleware'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

const createOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        }

        const crt_order = await store.createOrder(order)
        res.json(crt_order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res: Response) => {
    const order = await store.index()
    res.json(order)
}

const show = async (req:Request, res:Response) => {
    const orderId : number = req.params.id as unknown as number
    const order = await store.show(orderId)
    return res.json(order)
}

const addProduct = async (req: Request, res: Response) => {
    const product_id: number = req.body.product_id
    const order_id: number = req.params.id as unknown as number
    const quantity: number = req.body.quantity
    console.log(1)
    console.log(typeof(product_id))
    console.log(product_id)
    try {
      const addedProduct = await store.addProduct(quantity, product_id, order_id)
      res.json(addedProduct)

      //use type any to be able to see the error thrown
    } catch(err: any) {
      res.status(400)
      res.json(err + product_id)
    }
  } 

const selectOrdersById = async ( req:Request , res: Response) => {
    const orders = await store.selectOrdersById(req.params.user_id as unknown as number)
    res.json(orders)
};

const deleteOrder = async (_req:Request, res: Response) => {
    const user = await store.deleteAll()
    return res.json(user)
}

const orderRoutes = (app: express.Application) => {
    app.post('/orders', createOrder)
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders/:id/products', addProduct)
    app.get('/orders/:user_id', verifyAuthToken, selectOrdersById)
    app.delete('/orders/delete', deleteOrder)
};

export default orderRoutes;