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
    try{
        const order = await store.index()
    res.json(order)
    } catch(err) {
        throw new Error (`Could not show all orders. Error: ${err}`)
    } 
}

const show = async (req:Request, res:Response) => {
    const orderId : number = req.params.id as unknown as number
    try{     
    const order = await store.show(orderId)
    return res.json(order)
    } catch (err) {
        throw new Error (`Could not show order ${orderId}. Error: ${err}`)
    }
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
    const orderId : number = req.params.user_id as unknown as number
    try {
        const orders = await store.selectOrdersById(orderId)
        res.json(orders) 
    } catch (err) {
        throw new Error (`Could not show order by id ${orderId}. Error: ${err}`)
    }
    
};

const deleteOrder = async (_req:Request, res: Response) => {
    try {
        const user = await store.deleteAll()
        return res.json(user)
    } catch (err) {
        throw new Error (`Could not delete all orders. Error: ${err}`)
    }
    
}

const orderRoutes = (app: express.Application) => {
    app.post('/orders', verifyAuthToken, createOrder)
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id', verifyAuthToken, show)
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
    app.get('/orders/:user_id', verifyAuthToken, selectOrdersById)
    app.delete('/orders/delete', verifyAuthToken, deleteOrder)
};

export default orderRoutes;