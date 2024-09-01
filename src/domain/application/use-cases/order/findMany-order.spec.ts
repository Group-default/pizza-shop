import { InMemoryOrderRepository } from "../../../../tests/in-memory";
import { makeOrder } from "../../../../tests/factory";
import { FindManyCustomerIdOrder } from "./findManyCustomerId-order";

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: FindManyCustomerIdOrder


describe('FindAll Orders', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FindManyCustomerIdOrder(inMemoryOrderRepository)
  })

  it('Should be list orders', async () => {
    const orderFake = makeOrder()

    await inMemoryOrderRepository.create(orderFake)

    const roleUser = { customerRole: { role: 'user' }, customerId: 'customerId' }

    const result = await sut.execute(roleUser)

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryOrderRepository.order.length).toBe(1)
    }
  })
})
