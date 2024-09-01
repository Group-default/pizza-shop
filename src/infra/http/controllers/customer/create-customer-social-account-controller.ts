import { FastifyReply, FastifyRequest } from "fastify";
import * as z from 'zod'
import { makeCustomerSocialAccountFactory } from "../../../factory/customer/make-create-social-account";
import { BadRequestError } from "../../../../core/errors/bad-request-error";

export const CreateCustomerSocialAccountController = async (request: FastifyRequest, reply: FastifyReply) => {
    const createBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        id: z.string(),
        avatarUrl: z.string()
    })

    const { name, email, id, avatarUrl } = createBodySchema.parse(request.body)
      
    const customer = makeCustomerSocialAccountFactory()

    const result =  await customer.execute({ name, email, id, avatarUrl })

    if(result.isLeft()){
        const erro = result.value
        if(erro instanceof BadRequestError){
          return reply.code(401).send({ message: erro.message })
        }
      } 

    if(result.isRight()){
        const customerId = result.value.customer.Id
        const token = await reply.jwtSign( { sub: customerId, type: result.value.customer.Role } )
        const refreshToken = await reply.jwtSign(
          { user: { sub: customerId, type: result.value.customer.Role } }
        )
       
          
        return reply.setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true
        }).send( {token} )
    
      }
}