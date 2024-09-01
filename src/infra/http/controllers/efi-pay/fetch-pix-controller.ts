import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../../lib/prisma";


export const FetchPixController = async (request: FastifyRequest, reply: FastifyReply) => {
    const response = await prisma.payment.findMany()
    return reply.status(200).send(response)
}