import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCreatePayment } from "../../../factory/payment/make-create-payment";
import app from "../../../../app";
import { env } from "../../../../env";
import path from "path";
import EfiPay from 'sdk-typescript-apis-efi';

const options = {
  sandbox: false,
  client_id: env.CLIENT_ID,
  client_secret: env.CLIENT_SECRET,
  certificate: path.join(__dirname, 'certs', 'producao-492607-pizzadrua.p12')
}
export const PixConfirmationController = async (request: FastifyRequest, reply: FastifyReply) => {

  try {
    const pixConfirmationSchemaBody = z.object({
      endToEndId: z.string(),
      txid: z.string(),
      chave: z.string(),
      valor: z.string(),
      horario: z.string(),
    });
  
    const pixArrayData = z.object({
      pix: z.array(pixConfirmationSchemaBody),
    });

    const { pix } = pixArrayData.parse(request.body);

    const payment = MakeCreatePayment();

    // Use Promise.all para aguardar a conclusão de todas as operações
    await Promise.all(pix.map(async (item) => {
      await payment.execute({
        endToEndId: item.endToEndId,
        txid: item.txid,
        key: item.chave,
        value: item.valor,
        time: item.horario,
      });

      const params = {
        txid: item.txid
      }

      const efipay = new EfiPay(options)

      const response = await efipay.pixDetailCharge(params)
      
      app.io.to(response.solicitacaoPagador).emit('payment', { status: 'PaymentConfirmed' })
    }));
    
    return reply.status(200).send();
  } catch (error) {
    console.error('Erro durante o processamento da solicitação:', error);
    return reply.status(500).send('Erro interno do servidor');
  }
}
