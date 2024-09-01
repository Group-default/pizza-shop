import { FastifyReply, FastifyRequest } from "fastify";
import EfiPay from 'sdk-typescript-apis-efi';
import { env } from "../../../../env"
import path from 'path'
// import fs from 'fs'

const options = {
  sandbox: false,
  client_id: env.CLIENT_ID,
  client_secret: env.CLIENT_SECRET,
  certificate: path.join(__dirname, 'certs', 'producao-492607-pizzadrua.p12')
}

const WebHookPixController = async (request: FastifyRequest, reply: FastifyReply) => {
  
  return reply.status(200).send('Hello World!')
}

const WebHookVerifyCertificateController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const body = {
      webhookUrl: 'https://api.pizzadrua.online/prod/webhook',
    }
    const params = {
      chave: 'a471ed5a-0b30-4507-8e9e-c9ba73ec33cb',
    }

    const efipay = new EfiPay(options)

    const response = await efipay.pixConfigWebhook(params, body)
    
    return reply.status(200).send(response)

  } catch (error) {
    console.log('error', error);
  }
}

export { WebHookPixController, WebHookVerifyCertificateController }
