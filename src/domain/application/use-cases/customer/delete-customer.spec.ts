import { InMemoryCustomerRepository } from "../../../../tests/in-memory";
import { makeCustomer } from "../../../../tests/factory/make-customer";
import { DeleteCustomer } from "./delete-customer";

let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: DeleteCustomer

describe('Delete Customer', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new DeleteCustomer(inMemoryCustomerRepository)
  })

  it('Should be able delete a customer', async () => {
    const customerFake = makeCustomer()

    await inMemoryCustomerRepository.create(customerFake)

    const result = await sut.execute(customerFake.Id)

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryCustomerRepository.customers.length).toBe(0)
    }
  })

  it('Should be able not delete a customer', async () => {
    const customerFake = makeCustomer()

    await inMemoryCustomerRepository.create(customerFake)

    const result = await sut.execute('idFake')

    if(result.isLeft()) {
      expect(result.isLeft()).toBeTruthy()
      expect(inMemoryCustomerRepository.customers.length).toBe(1)
    }
  })
})