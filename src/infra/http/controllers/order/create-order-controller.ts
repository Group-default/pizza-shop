import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateOrder } from "../../../factory/order/make-create-order";
import * as z from 'zod'
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";
import { CreatedOrderError } from "../../../../core/errors/created-order-error";
import app from "../../../../app";
import { makeFindByIdOrder } from "../../../factory/order/make-findById-order";

export const CreateOrderController = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log(request.body);
  const schemaOrder = z.object({
    totalPrice: z.string(),
    payment: z.object({
      methodPayment: z.string(),
      flag: z.string().optional(),
      typeCard: z.string().optional(),
    }),
    address: z.object({
      phone: z.string().optional(),
      cep: z.string().optional(),
      street: z.string().optional(),
      number: z.string().optional(),
      tax: z.string().optional(),
      neighborhood: z.string().optional(),
    }).optional(),
    observation: z.string().optional(),
    methodDelivery: z.enum(["DELIVERY", "PICKUP"]),
    status: z.enum(["WAITING", "ACCEPTED", "AWAITING_WITHDRAWAL", "PREPARING", "DELIVERY", "CANCELED", "FINISHED"]),
    itensOrder: z.array(
      z.object({
        mode: z.enum(["MIXED", "SIMPLE"]),
        product: z.string().array(),
        image_url: z.string(),
        price: z.string(),
        size: z.string().optional(),
        quantity: z.number(),
      })),
  })
  
  const { itensOrder, payment,observation, address, totalPrice, status, methodDelivery } = schemaOrder.parse(request.body)

  const order = makeCreateOrder()

  const token = request.headers.authorization;

  if (!token) {
    return reply.status(401).send({ message: 'Token not found' })
  }

  const decodedToken = await request.jwtDecode<{ sub: string }>()
  const customerId = decodedToken.sub

  const result = await order.execute(
    {
      customerId,
      methodDelivery,
      itensOrder,
      payment,
      address,
      observation,
      totalPrice,
      status
    })

  if (result.isLeft()) {
    const erro = result.value

    if (erro instanceof CustomerAlreadyExistsError) {
      return reply.code(400).send({ message: erro.message })
    }
    if (erro instanceof CreatedOrderError) {
      return reply.code(400).send({ message: erro.message })
    }
  }

  const orders = makeFindByIdOrder()
  if (result.isRight()) {
    const findOrderById = await orders.execute(result.value.order.id)
    if (findOrderById.isRight()) {
      
      app.io.emit('OrderRoom', findOrderById.value.order);
    }
  }

  if (result.isRight()) {
    return reply.code(201).send(result.value.order)
  }
}