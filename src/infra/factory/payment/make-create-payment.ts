import { CreatePayment } from "../../../domain/application/use-cases/payment/create-payment"
import { PrismaPaymentRepository } from "../../repository/prisma/prisma-payment"

export const MakeCreatePayment = () => {
  const paymentRepository = new PrismaPaymentRepository()
  const createPayment = new CreatePayment(paymentRepository)
  return createPayment
}