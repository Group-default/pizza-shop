import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { makeCustomerFactorie } from "../../../factory/customer/make-customer";
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";

export const CreateCustomerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'CUSTOMER']).optional(),
    id: z.string().optional(),
  })

  const { name, email, password, id, role } = createBodySchema.parse(request.body)
  
  const customer = makeCustomerFactorie()

  const result = await customer.execute({ name, email, password, id, role})

  if(result.isLeft()) {
    const error = result.value
    if(error instanceof CustomerAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}