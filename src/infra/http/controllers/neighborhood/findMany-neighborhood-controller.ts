import { MakeFindManyNeighborhood } from '../../../factory/neignborhood/make-findMany-neighborhood';
import { FastifyReply, FastifyRequest } from "fastify";


export const FindManyNeighborhoodController = async (_request: FastifyRequest, reply: FastifyReply) => {
  const makeNeighborhood = MakeFindManyNeighborhood()
  const result = await makeNeighborhood.execute()
  const neighborhoods = result.value?.neighborhoods.map((neighborhood) => {
    return {
      id: neighborhood.id, 
      name: neighborhood.name, 
      tax: neighborhood.tax,
      status: neighborhood.status
    }
  })

  return reply.status(200).send(neighborhoods)
}