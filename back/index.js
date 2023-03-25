require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const db = require('./pgdb')

const userRouter = require('./router/userRoutes')

const errorMidle = require('./exceptions/errorMiddleware')

const PORT = process.env.PORT || 9000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', userRouter)

app.use(errorMidle)

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()
// app.get('/', (req, res) => { res.status(200).json('Сервер работает111222')})