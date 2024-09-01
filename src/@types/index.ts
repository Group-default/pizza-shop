/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-namespace */
import '@fastify/jwt'
import 'fastify'
import { Server } from 'socket.io'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      type: 'ADMIN' | 'CUSTOMER' 
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}


declare global {
  namespace NodeJS {
    interface Global {
      privateRoom: string;
    }
  }
}

export interface OrderCustomer {
  socketId: string
  roomId: string
}

export interface QRCodeRoom {
  socketId: string
  room: string
}