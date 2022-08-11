import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import { verifyAuthToken } from '../middlewares/authMiddleware'


const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const user = await store.index()
    res.json(user)
}

const show = async (req:Request, res:Response) => {
    const user = await store.show(req.body.id)
    res.json(user)
}

const create = async (req:Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
        }
    
    const crt_user = await store.create(user)
    res.json(crt_user)
    
    } catch (err) {
        res.status(400)
        res.json(err)
    }

    const authenticate = async (req: Request, res: Response) => {
        const user: User = {
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          userName: req.body.username,
          password: req.body.password,
        }
        try {
            const u = await store.authenticate(user.userName, user.password)
            res.json(u)
        } catch(error) {
            res.status(401)
            res.json({ error })
        }
      }
    
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', verifyAuthToken, create)
}

export default userRoutes;