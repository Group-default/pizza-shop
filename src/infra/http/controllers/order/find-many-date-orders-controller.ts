import { z } from 'zod';
import { makeFindManyDateOrders } from './../../../factory/order/make-find-many-date-orders';
import { FastifyReply, FastifyRequest } from "fastify";

export const FindManyDateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {

    const bodySchema = z.object({
        formattedDate: z.string()
    })

    const { formattedDate } = bodySchema.parse(request.body)
    const date = formattedDate
    const order = makeFindManyDateOrders()

    const orders = await order.execute(date)

    return reply.code(200).send(orders.value?.order)

}
