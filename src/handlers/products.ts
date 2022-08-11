import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authMiddleware'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (_req : Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const products = await store.show(req.body.id)
    res.json(products)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const crt_product = await store.create(product)
        res.json(crt_product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const selectCategory = async (req: Request, res: Response) => {
    const products = await store.selectProductByCategory(req.body.category)
    res.json(products)
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.get('/products/:category', selectCategory)
}

export default productRoutes;