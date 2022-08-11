import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authMiddleware'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

const createOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
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

const selectOrdersById = async ( req:Request , res: Response) => {
    const orders = await store.selectOrdersById(req.body.user_id)
    res.json(orders)
};

const orderRoutes = (app: express.Application) => {
    app.post('/orders/:id', createOrder)
    app.get('/orders/:user_id', verifyAuthToken, selectOrdersById)
};

export default orderRoutes;