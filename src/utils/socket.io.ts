import { FastifyInstance } from 'fastify';
import { Server, Socket } from 'socket.io';

let io: Server;

export function configureSocketIO(fastify: FastifyInstance) {
    const httpServer = fastify.server;
    io = new Server(httpServer, {
        cors: {
            origin: 'https://seal-app-n7orh.ondigitalocean.app',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        // Defina outros manipuladores de eventos Socket.io, conforme necessário
    });

    return io;
}

export { io }; // Exporte a instância do Socket.io