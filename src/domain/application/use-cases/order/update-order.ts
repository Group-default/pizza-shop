import { OrderRepository } from "../../repositories/order-repository";
import { Either, right, left } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

interface UpdatedOrderUseCaseRequest {
  id: string
  status: 'WAITING' | 'ACCEPTED' | 'AWAITING_WITHDRAWAL' | 'PREPARING' | 'DELIVERY' | 'CANCELED' | 'FINISHED'
}

type UpdatedOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdateOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderUpdate: UpdatedOrderUseCaseRequest): Promise<UpdatedOrderUseCaseResponse> {

    const orderId = await this.orderRepository.findById(orderUpdate.id)

    if(!orderId) {
      return left(new ResourceNotFoundError())
    }

    

    await this.orderRepository.update({id: orderUpdate.id, status: orderUpdate.status})

    return right({})
  } 
}
