import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateCategory } from "../../../factory/category/make-create-category";
import * as z from 'zod'

export const CreateCategoryController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaCategory = z.object({
      name: z.string(),
  })

  const { name } = schemaCategory.parse(request.body)

  const category = makeCreateCategory()

  await category.execute({ name })

  return reply.code(201).send()
}