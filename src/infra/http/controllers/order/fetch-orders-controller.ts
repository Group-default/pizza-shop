import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindManyOrder } from "../../../factory/order/make-many-order";

export const FetchOrdersController = async (request: FastifyRequest, reply: FastifyReply) => {
  const orders = makeFindManyOrder()
  const result = await orders.execute()
  return reply.code(200).send(result.value?.orders)

}

