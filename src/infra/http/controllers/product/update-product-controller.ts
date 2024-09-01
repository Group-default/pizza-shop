import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateProduct } from "../../../factory/product/make-update-product";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'

export const UpdateProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaUpdateProduct = z.object({
    id: z.string().uuid(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    price: z.string(),
    size: z.string().optional(),
    type: z.string().optional(),
    status: z.enum(["ACTIVE", "DISABLE"]),
  })
  
  const { id, name, category, price, description, imageUrl, type, size, status } = schemaUpdateProduct.parse(request.body)

  const updateProduct = makeUpdateProduct()

  const result = await updateProduct.execute({ id, name, category, price, description, imageUrl, type, size, status })

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send()
}