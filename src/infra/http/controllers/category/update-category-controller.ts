import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateCategory } from "../../../factory/category/make-update-category";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'

export const UpdateCategoryController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaUpdateCategory = z.object({
    id: z.string().uuid(),
    name: z.string()
  })

  const { id, name } = schemaUpdateCategory.parse(request.body)

  const updateCategory = makeUpdateCategory()

  const result = await updateCategory.execute({ id, name })

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send()
}