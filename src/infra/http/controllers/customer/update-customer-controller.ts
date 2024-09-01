import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { MakeUpdateCustomer } from '../../../factory/customer/make-update-customer';

export const UpdateCustomerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaCustomer = z.object({
    id: z.string(),
    withdrawalName: z.string(),
    phone: z.string(),
  })

  const { id, withdrawalName, phone } = schemaCustomer.parse(request.body)
  const makeCustomer = MakeUpdateCustomer()
  const result = await makeCustomer.execute({ id, withdrawalName, phone })

  if (result.isLeft()) {
    const erro = result.value
    if (erro instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: erro.message })
    }

  }

  return reply.status(200).send(result.value)
}