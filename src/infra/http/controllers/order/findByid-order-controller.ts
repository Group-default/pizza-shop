import { FastifyRequest, FastifyReply } from "fastify";
import { makeFindByIdOrder } from "../../../factory/order/make-findById-order";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'

export const FindByIdOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaFindByIdProduct = z.object({
    id: z.string().uuid()
  })

  const { id } = schemaFindByIdProduct.parse(request.params)

  const findByIdOrder = makeFindByIdOrder()

  const result = await findByIdOrder.execute(id)

  if(result.isLeft()) {
    const erro = result.value
    if(erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }
  if (result.isRight()) {
    return reply.code(200).send(result.value.order)
  }
}