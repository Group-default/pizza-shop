import { FastifyRequest, FastifyReply } from "fastify";
import { makeDeleteCategory } from "../../../factory/category/make-delete-category";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'

export const DeleteCategoryController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaDeletecategory = z.object({
    id: z.string().uuid(), 
  })

  const { id } = schemaDeletecategory.parse(request.params)

  const deleteCategory = makeDeleteCategory()

  const result = await deleteCategory.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(204).send()
}