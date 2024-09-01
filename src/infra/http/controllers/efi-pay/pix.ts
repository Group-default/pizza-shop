/* eslint-disable new-cap */
import fs from 'fs'
import https from 'https'
import axios from "axios"
import { FastifyReply, FastifyRequest } from "fastify"
import { array, z } from "zod"
import { env } from '../../../../env'
import path from 'path'

const credentials = {
  client_id: env.CLIENT_ID,
  client_secret: env.CLIENT_SECRET,
}
declare module "fastify" {
  interface FastifyRequest {
    accessToken: string;
  }
}
const billingBodySchema = z.object({
  calendario: z.object({
    expiracao: z.number(),
  }),
  devedor: z.object({
    cpf: z.string(),
    nome: z.string(),
  }),
  valor: z.object({
    original: z.string(),
  }),
  chave: z.string(),
  solicitacaoPagador: z.string(),
   
})

const certification = fs.readFileSync(
  path.resolve(__dirname, `./certs/${env.EFIPAY_CERT}`)
  )

const data = JSON.stringify({ grant_type: 'client_credentials' })

const dataCredentials = credentials.client_id + ':' + credentials.client_secret

const auth = Buffer.from(dataCredentials).toString('base64')

const agent = new https.Agent({
  pfx: certification,
  passphrase: '',
})

export async function OAuthEfi(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { devedor, valor, chave, solicitacaoPagador } = billingBodySchema.parse(request.body)

    const config = {
      method: "POST",
      url: "https://pix.api.efipay.com.br/oauth/token",
      headers: {
        Authorization: "Basic " + auth,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
      data,
    };

    const response = await axios(config);
    const userData = JSON.stringify({
      "calendario": {
        "expiracao": 3600
      },
      "devedor": {
        "cpf": devedor.cpf,
        "nome": devedor.nome
      },
      "valor": {
        "original": valor.original
      },
      chave,
      solicitacaoPagador,
      
    })

    const configPut = {
      method: "POST",
      url: `https://pix.api.efipay.com.br/v2/cob`,
      headers: {
        Authorization: "Bearer " + response.data.access_token,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
      data: userData,
    };

    const responseBilling = await axios(configPut);

    const getQrCode = responseBilling.data.loc.id

    const configQrCode = {
      method: "GET",
      url: `https://pix.api.efipay.com.br/v2/loc/${getQrCode}/qrcode`,
      headers: {
        Authorization: "Bearer " + response.data.access_token,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
    };
    const responseQrCode = await axios(configQrCode);
    
    return reply.status(200).send(responseQrCode.data)

  } catch (error) {
    reply.status(500).send({ message: 'Internal server error.' })
  }
}