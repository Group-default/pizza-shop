import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { MakeDeleteAddress } from "../../../factory/address/make-delete-address"
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

export const DeleteAddressController = async (request: FastifyRequest, reply: FastifyReply) => {
    const schemaDeleteAddress = z.object({
        id: z.string().uuid(),
    })

    const { id } = schemaDeleteAddress.parse(request.params)

    const deleteAddress = MakeDeleteAddress()

    const result = await deleteAddress.execute(id)

    if (result.isLeft()) {
        const error = result.value
        if (error instanceof ResourceNotFoundError) {
            return reply.code(404).send({ message: error.message })
        }
    }

    return reply.code(204).send()
}