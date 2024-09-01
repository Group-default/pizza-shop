
import { PaymentRepository } from "../../../domain/application/repositories/payment-repository";
import { Payment } from "../../../domain/enterprise/entities/payment";
import { prisma } from "../../../lib/prisma";


export class PrismaPaymentRepository implements PaymentRepository {
  async create(payment: Payment): Promise<void> {
    await prisma.payment.create({
      data: {
        endToEndId: payment.endToEndId,
        txid: payment.txid,
        key: payment.key,
        value: payment.value,
        time: payment.time,
      }
    })
  }

  async findMany(): Promise<Payment[]> {
    const payments = await prisma.payment.findMany()
    return payments.map((payment) => new Payment(payment))
  }
}