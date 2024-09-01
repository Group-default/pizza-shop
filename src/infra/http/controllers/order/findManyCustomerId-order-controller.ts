import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindManyCustomerIdOrder } from "../../../factory/order/make-find-by-customer-id-order";

export const FindManyCustomerIdOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization;

  if (!token) {
    return reply.code(401).send({ message: "Unauthorized" })
  }
  const order = makeFindManyCustomerIdOrder()
  const decodedToken = await request.jwtDecode<{ sub: string }>()
  const customerId = decodedToken.sub
  const orders = await order.execute({ customerId })
  return reply.code(200).send(orders.value?.orders)




}

