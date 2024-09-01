import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateProduct } from "../../../factory/product/make-create-product";
import * as z from 'zod'
import { CategoryNotFoundError } from "../../../../core/errors/category-not-found-error";

export const CreateProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaProduct = z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    price: z.string(),
    imageUrl: z.string(),
    size: z.string().optional(),
    type: z.string().optional(),
    status: z.enum(["ACTIVE", "DISABLE"]).optional(),
  })
  
  const { category, name, price, imageUrl, description, type, size, status } = schemaProduct.parse(request.body)

  const product = makeCreateProduct()

  const result = await product.execute({ category, name, imageUrl, price, description, type, size, status })

  if (result.isLeft()) {
    const erro = result.value
    if (erro instanceof CategoryNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(201).send()
}