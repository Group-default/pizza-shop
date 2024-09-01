import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateOrder } from "../../../factory/order/make-update-order";
import * as z from 'zod'
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import app from "../../../../app";
import { makeFindByIdOrder } from "../../../factory/order/make-findById-order";

export const UpdateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaOrder = z.object({
    id: z.string().uuid(),
    status: z.enum(["WAITING", "ACCEPTED", "AWAITING_WITHDRAWAL", "PREPARING", "DELIVERY", "CANCELED", "FINISHED"]),
  })

  const token = request.headers.authorization;

  if (!token) {
    return reply.status(401).send({ message: 'Token not found' })
  }

  const { id, status,} = schemaOrder.parse(request.body)

  const order = makeUpdateOrder()
  const orderById = makeFindByIdOrder()


  const result = await order.execute({ id, status})


  if (result.isLeft()) {
    const erro = result.value
    if (erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }
  }
  const orderUpdate = await orderById.execute(id)


  if (orderUpdate.isRight()) {
    app.io.emit('OrderRoom', orderUpdate.value.order);
  }


  return reply.code(200).send({})
}
