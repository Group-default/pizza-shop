
import { FastifyReply, FastifyRequest } from "fastify";
import { MakeFindManyNeighborhood } from "../../../factory/neignborhood/make-findMany-neighborhood";


export const FindManyNeighborhoodController = async (request: FastifyRequest, reply: FastifyReply) => {
 
    const makeNeighborhood = MakeFindManyNeighborhood()
    const result = await makeNeighborhood.execute()

    return reply.status(200).send( result.value?.neighborhoods )
}