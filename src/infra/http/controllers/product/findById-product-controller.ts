import { FastifyRequest, FastifyReply } from "fastify";
import { makeFindByIdProduct } from "../../../factory/product/make-findById-product";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const FindByIdProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaFindByIdProduct = z.object({
    id: z.string().uuid()
  })

  
  const { id } = schemaFindByIdProduct.parse(request.params)
  console.log(id)
  
  const findByIdProduct = makeFindByIdProduct()

  const result = await findByIdProduct.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send({ data: result.value })
}