import express, { Router, Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import { verifyAuthToken } from '../middlewares/authMiddleware'
import jwt, { Secret } from 'jsonwebtoken'
require("dotenv").config();

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const user = await store.index()
    res.json(user)
}

const show = async (req:Request, res:Response) => {
    const userId : number = req.params.id as unknown as number
    const user = await store.show(userId)
    return res.json(user)
}

const create = async (req:Request, res: Response) => {
        const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        userpassword: req.body.userpassword
        }
    
    try {
    const crt_user = await store.create(user)
    var token = jwt.sign({ user: crt_user },`${process.env.TOKEN_SECRET}`)
    res.json(token)
    
    //use type any to be able to see the error thrown
    } catch (err: any) {
        res.status(400)
        res.json(err + user)
    }
    
}

const deleteUser = async (_req:Request, res: Response) => {
    const user = await store.deleteAll()
    return res.json(user)
}


const userRoutes = (app: express.Application) => {
    app.post('/users', create)
    app.get('/users',verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.delete('/users/delete', deleteUser)
}

export default userRoutes;