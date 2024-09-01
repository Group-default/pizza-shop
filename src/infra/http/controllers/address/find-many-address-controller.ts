/* eslint-disable dot-notation */
import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { MakeFindManyAddress } from "../../../factory/address/make-find-many-address";

export const FindManyAddressController = async (request: FastifyRequest, reply: FastifyReply) => {

  const token = request.headers.authorization;
  if (!token) {
    return reply.status(401).send({ message: 'Token not found' })
  }

  const decodedToken = await request.jwtDecode<{ sub: string }>()
  const customerId = decodedToken.sub
  const makeFindManyAddress = MakeFindManyAddress()

  const result = await makeFindManyAddress.execute(customerId)

  if (result.isLeft()) {
    const error = result.value
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  if (result.isRight()) {
    return reply.status(201).send(result.value.address)
  }
}