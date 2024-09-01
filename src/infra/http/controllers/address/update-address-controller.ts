import { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import * as z from 'zod'
import { MakeUpdateAddress } from "../../../factory/address/make-update-address";

export const UpdateAddressController = async (request: FastifyRequest, reply: FastifyReply) => {
    const schemaUpdateUpdate = z.object({
        number: z.string(),
        standard: z.boolean().optional(),
        street: z.string(),
        zipCode: z.string(),
        phone: z.string(),
        type: z.enum(["HOME", "WORK", "OTHER"]),
        neighborhood: z.string(),    
        id: z.string(),
        customerId: z.string(),    
    })
    
    const { street, id, number, type, phone, zipCode, customerId, standard, neighborhood } = schemaUpdateUpdate.parse(request.body)

    const updateAddress = MakeUpdateAddress()
    
    const result = await updateAddress.execute({ street, customerId, type,id, number, phone, zipCode, standard, neighborhood })
    
    if (result.isLeft()) {
        const error = result.value
        if (error instanceof ResourceNotFoundError) {
            return reply.code(404).send({ message: error.message })
        }
    }

    return reply.code(200).send()
}