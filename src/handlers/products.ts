import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authMiddleware'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (_req : Request, res: Response) => {
    try{
     const products = await store.index()
     res.json(products)   
    } catch (err) {
        throw new Error (`Could not show all products in index. Error: ${err}`)
    }
}

const show = async (req: Request, res: Response) => {
    const productId: number = req.params.id as unknown as number
    try {
        const products = await store.show(productId)
        res.json(products)
    } catch (err) {
        throw new Error (`Could not show product by id ${productId}. Error: ${err}`)
    }
    
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
    const category: string = req.params.category as unknown as string
    try{
        const products = await store.selectProductByCategory(category)
        res.json(products)
    } catch (err) {
        throw new Error(`Could not select product by category ${category}. Error: ${err}`)
    }
}

const deleteProducts = async (_req:Request, res: Response) => {
    try{
        const Product = await store.deleteAll()
        return res.json(Product)
    } catch (err) {
        throw new Error (`Could not delete all products. Error: ${err}`)
    }
    
}
const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.get('/products/category/:category', selectCategory)
    app.delete('/products/delete', deleteProducts)
}

export default productRoutes;