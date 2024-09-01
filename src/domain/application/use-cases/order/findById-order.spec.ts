import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { makeOrder } from "../../../../tests/factory";
import { InMemoryOrderRepository } from "../../../../tests/in-memory";
import { FindByIdOrder } from "./findById-order";

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: FindByIdOrder

describe('FindById Order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FindByIdOrder(inMemoryOrderRepository)
  })

  it('Should be FindById in Order', async () => {
    const orderFake = makeOrder()

    await inMemoryOrderRepository.create(orderFake)

    const result = await sut.execute(orderFake.id)

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(result.value.order).toBe(orderFake)
    }
  })

  it('Should be not FindById in Order', async () => {
    const result = await sut.execute('idFake')

    if(result.isLeft()) {
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    }
  })
})