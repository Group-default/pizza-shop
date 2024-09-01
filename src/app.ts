import fastify from "fastify";
import fastifyExpress from '@fastify/express'
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from '@fastify/cookie'
import fastifyWebsocket from "@fastify/websocket";
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { env } from "./env";
import { Routes } from "./infra/http/controllers/routes";
import cors from '@fastify/cors'
import { resolve } from "path";
import fastifyIO from "fastify-socket.io";
import { OrderCustomer, QRCodeRoom } from "./@types";
import { errorHandler } from "./core/errors/error-handle";




const app = fastify();
export const socketToOrderMap: OrderCustomer[] = []
export const socketToQRCodeMap: QRCodeRoom[] = []


app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '7d'
  }
})

app.register((fastifyStatic), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

app.register(fastifyIO, {
  cors: {
    origin: 'https://seal-app-n7orh.ondigitalocean.app',
    methods: ['GET', 'POST']
  },
})

 
app.ready(() => {
  
  app.io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
    socket.on('OrderRoom', (data) => {
      const { roomId } = data
      socket.join(roomId)
      const userOrder = socketToOrderMap.find(user => user.roomId === roomId)
      if (userOrder) {
        userOrder.socketId = socket.id
      } else {
        socketToOrderMap.push({ socketId: socket.id, roomId })
      }

    });
    socket.on('join', (data) => {
      const { room } = data  
      socket.join(room)
      const userOrder = socketToQRCodeMap.find(user => user.room === room)
      if (userOrder) {
        userOrder.socketId = socket.id
      } else {
        socketToQRCodeMap.push({ socketId: socket.id, room })
      }
    })
    socket.on('statusUpdate', (data) => {
      const { orderId } = data
      socket.to(orderId).emit('statusUpdate', data)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    })
  })
})


app.register(cors)
app.register(fastifyWebsocket, { options: { clientTracking: true } })
app.register(multipart)
app.register(fastifyCookie)
app.register(fastifyExpress)
app.register(Routes)

app.setErrorHandler(errorHandler)

export default app