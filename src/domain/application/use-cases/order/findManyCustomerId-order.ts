import { OrderRepository } from "../../repositories/order-repository";
import { Either, right } from "../../../../core/either";
import { IOrderList } from "../../../../interfaces/IOrderList";

interface OrderUseCaseRequest {
  customerId: string
}


type OrderUseCaseResponse = Either<null, { orders: IOrderList[] }>


export class FindManyCustomerIdOrder {
  constructor(private orderRepository: OrderRepository) { }

  async execute({ customerId }: OrderUseCaseRequest): Promise<OrderUseCaseResponse> {

    const orders = await this.orderRepository.findManyCustomer(customerId)
    return right({ orders })

  }
}