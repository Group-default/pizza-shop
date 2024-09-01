import { Either, right } from "../../../../core/either";
import { Payment } from "../../../enterprise/entities/payment";
import { PaymentRepository } from "../../repositories/payment-repository";



interface CreatePaymentUseCaseRequest {
  endToEndId: string
  txid: string
  key: string
  value: string
  time: string
}

type CreatePaymentResponse = Either<null, {}>

export class CreatePayment {
  constructor(
    private paymentRepository: PaymentRepository,
  ) { }

  async execute(payment: CreatePaymentUseCaseRequest): Promise<CreatePaymentResponse> {

    const newPayment = Payment.create(payment)
    await this.paymentRepository.create(newPayment)
    return right({})
  }
}