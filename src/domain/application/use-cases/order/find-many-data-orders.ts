import { Either, right } from "../../../../core/either";
import { OrderRepository } from "../../repositories/order-repository";
import { OrderData } from "../../../../interfaces/IOrderList";

type orderUseCasesResponse = Either<null, { order: OrderData[] }>

export class FindManyDataOrders {
    constructor(private orderRepository: OrderRepository) { }

    async execute(data: string): Promise<orderUseCasesResponse> {
        const order = await this.orderRepository.findManyData(data)
        return right({ order })
    }
}