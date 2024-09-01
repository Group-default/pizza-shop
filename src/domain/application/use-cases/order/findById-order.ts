import { Either, left, right } from "../../../../core/either";
import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type orderUsecasesResponse = Either<ResourceNotFoundError, { order: Order }>

export class FindByIdOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string): Promise<orderUsecasesResponse> {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    return right({ order })
  }
}