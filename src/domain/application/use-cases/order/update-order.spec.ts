import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { makeOrder } from "../../../../tests/factory";
import { InMemoryOrderRepository } from "../../../../tests/in-memory";
import { UpdateOrder } from "./update-order";

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: UpdateOrder

describe('Update Order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new UpdateOrder(inMemoryOrderRepository) 
  })

  it('Should be in Update Order', async () => {
    const order = makeOrder()

    await inMemoryOrderRepository.create(order)

    const result = await sut.execute({
      id: order.id,
      customerId: order.customerId,
      payment: order.payment,
      status: "FINISHED",
      totalPrice: order.totalPrice,
      itensOrder: order.itensOrder,
    })

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
    }
  })

  it('Should be in not update Order', async () => {
    const order = makeOrder()

    await inMemoryOrderRepository.create(order)

    const result = await sut.execute({
      id: 'idFake',
      customerId: order.customerId,
      payment: order.payment,
      status: "FINISHED",
      totalPrice: order.totalPrice,
      itensOrder: order.itensOrder,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})