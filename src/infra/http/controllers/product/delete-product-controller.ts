import { FastifyRequest, FastifyReply } from "fastify";
import { makeDeleteProduct } from "../../../factory/product/make-delete-product";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const DeleteProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaDeleteProduct = z.object({
    id: z.string().uuid(), 
  })

  const { id } = schemaDeleteProduct.parse(request.params)
  console.log(id)

  const deleteProduct = makeDeleteProduct()

  const result = await deleteProduct.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(204).send()
}