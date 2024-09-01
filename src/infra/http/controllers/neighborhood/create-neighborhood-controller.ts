import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { MakeCreateNeighborhood } from "../../../factory/neignborhood/make-create-neighborhood";


export const CreateNeighborhoodController = async (request: FastifyRequest, reply: FastifyReply) => {
  const neighborhoodBodySchema = z.object({
    name: z.string(),
    tax: z.string(),
  })

  const { name, tax } = neighborhoodBodySchema.parse(request.body)

  const makeNeighborhood = MakeCreateNeighborhood()
  await makeNeighborhood.execute({ name, tax })

  return reply.status(201).send()
}