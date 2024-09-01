import { MakeDeleteNeighborhood } from '../../../factory/neignborhood/make-delete-neighborhood';
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export const DeleteNeighborhoodController = async (request: FastifyRequest, reply: FastifyReply) => {
    const schemaNeighborhood = z.object({
      id: z.string().uuid(),
    })

    const { id } = schemaNeighborhood.parse(request.params)
  
    const makeNeighborhood = MakeDeleteNeighborhood()
    const result = await makeNeighborhood.execute(id)

    if(result.isLeft()) {
      const erro = result.value
      if(erro instanceof ResourceNotFoundError){
        return reply.code(404).send({ message: erro.message })
      }
    }

    return reply.status(204).send()
}