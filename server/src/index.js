import express from 'express'
import cors from 'cors';
import UserRoutes from './Routes/UserRoutes.js'
import mongoose from 'mongoose';
import 'dotenv/config.js'
import productRoutes from './Routes/ProductRoutes.js'

const app = express()

app.use(express.json({
    extended: true,
    limit: '50mb'
}))


app.use(
    cors({
        origin: '*'
    })
)

app.use('/api/user',UserRoutes)

app.use('/api/product',productRoutes)

const connect = async() => {

const Port = process.env.SERVER_PORT || 3000


    mongoose.connect(`${process.env.MONGO_DB_URI}`).then(() => {
        app.listen(Port,() => {
            console.log('server is on port and db is connected',Port)
        })
    })

}



connect()
