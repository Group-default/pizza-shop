import { OrderRepository } from "../../repositories/order-repository";
import { Either, right } from "../../../../core/either";
import { IOrderList } from "../../../../interfaces/IOrderList";

type OrderUseCaseResponse = Either<null, { orders: IOrderList[] }>

export class FindManyOrder {
  constructor(private orderRepository: OrderRepository) { }

  async execute(): Promise<OrderUseCaseResponse> {

    const orders = await this.orderRepository.findMany()
    return right({ orders })

  }
}