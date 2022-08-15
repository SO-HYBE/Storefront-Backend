import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
require("dotenv").config();

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;