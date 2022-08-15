import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authMiddleware'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (_req : Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const products = await store.show(req.params.id as unknown as number)
    res.json(products)
}

const create = async (req: Request, res: Response) => {
    
    const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

    try {
        const crt_product = await store.create(product)
        res.json(crt_product)
        //use type any to be able to see the error thrown
    } catch (err: any) {
        res.status(400)
        res.json(err + product)
    }
}

const selectCategory = async (req: Request, res: Response) => {
    const products = await store.selectProductByCategory(req.params.category as unknown as string)
    res.json(products)
}

const deleteProducts = async (_req:Request, res: Response) => {
    const Product = await store.deleteAll()
    return res.json(Product)
}
const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.get('/products/category/:category', selectCategory)
    app.delete('/products/delete', deleteProducts)
}

export default productRoutes;