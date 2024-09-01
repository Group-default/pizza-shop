import { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'
import { makeFindByIdCustomer } from "../../../factory/customer/make-find-by-id-customer";

export const FindByIdCustomerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const schemaFindByIdCustomer = z.object({
    id: z.string()
  })
  const customer = await request.jwtVerify<{sub: string}>()
  console.log(customer);
  
  const  {id}  = schemaFindByIdCustomer.parse({id: customer.sub}) 
  const findByIdCustomer = makeFindByIdCustomer()

  const result = await findByIdCustomer.execute(id)

  if (result.isRight()) {
    const response  = result.value.customer 
    return reply.code(200).send({ customer: response })
  }
}