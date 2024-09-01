import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindManyCategory } from "../../../factory/category/make-findMany-category";

export const FindManyCategoryController = async (_request: FastifyRequest, reply: FastifyReply) => {  
  const categorys = makeFindManyCategory()

  const result = await categorys.execute()

  return reply.code(200).send({ data: result.value })
}