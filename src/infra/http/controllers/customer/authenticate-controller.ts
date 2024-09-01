import { FastifyReply, FastifyRequest } from "fastify";
import { makeFactorieAuthenticate } from "../../../factory/customer/make-authenticate";
import * as z from 'zod'
import { InvalidCredentialsError } from "../../../../core/errors/invalid-credencial-error";

export const AuthenticateController = async (request: FastifyRequest, reply: FastifyReply ) => {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateSchema.parse(request.body)

  const authenticate = makeFactorieAuthenticate()

  const result = await authenticate.authenticate({ email, password })

  if(result.isLeft()){
    const erro = result.value
    if(erro instanceof InvalidCredentialsError){
      return reply.code(401).send({ message: erro.message })
    }
  }

  if(result.isRight()){
    const customerId = result.value.customer.Id
    const token = await reply.jwtSign( { sub: customerId, type: result.value.customer.Role } )
    const refreshToken = await reply.jwtSign(
      { user: { sub: customerId, type: result.value.customer.Role } }
    )
    console.log(token);
    
    return reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    }).send( {token} )

  }
  
}