import { FastifyRequest, FastifyReply } from "fastify";
import { makeFindByIdCategory } from "../../../factory/category/make-findById-category";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'

export const FindByIdCategoryController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaFindByIdCategory = z.object({
    id: z.string().uuid()
  })

  const { id } = schemaFindByIdCategory.parse(request.params)

  const findByIdcategory = makeFindByIdCategory()

  const result = await findByIdcategory.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }

  return reply.code(200).send({ data: result.value })
}