require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const db = require('./pgdb')

const errorMidle = require('./exceptions/errorMiddleware')
const tokenService = require('./services/tokenService')
const fileUpload = require("express-fileupload")

const PORT = process.env.PORT || 9000;
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
    //   origin: "http://localhost:3000", // Откуда присоединяется сокет клиент
    //   methods: ["GET", "POST"]
    origin: '*',
    }
  })
const router = require('./router/index')
const filesRouter = require('./router/filesRouter')
const { selectAction } = require('./controllers/socketController')

app.use(fileUpload({}))
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router)
app.use('/files', filesRouter)//express.static('./files')

app.use(errorMidle)

const start = async () => {
    try{
        http.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

io.on('connection', (socket) => {
  const token = socket.handshake.query.token;
  try {
    if (!token) throw new Error();
    if (tokenService.validateToken(token) == null) throw new Error();
    console.log('a user connected ' + socket.id);
    selectAction(io, socket)
  } catch (err) {
      // jwt verification failed
      socket.disconnect(); // disconnect client 
  }
  socket.on('disconnect', () => {
    console.log('a user disconnected');
});
});

start()