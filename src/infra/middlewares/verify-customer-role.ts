import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyUserRole = (roleToVerify: 'ADMIN' | 'CUSTOMER' ) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        
        const {type, sub} = request.user
        if (type !== roleToVerify) {
            console.log('nao autorizado');
            
            return reply.status(401).send({ message: 'Unauthorized' })
        }
    }
}