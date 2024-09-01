import { InMemoryCustomerRepository, InMemoryBcryptService } from "../../../../tests/in-memory";
import { makeCustomer } from "../../../../tests/factory/make-customer";
import { CreateCustomer } from "./create-customer";

let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryBcryptService: InMemoryBcryptService
let sut: CreateCustomer

describe('Create Customer', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    inMemoryBcryptService = new InMemoryBcryptService() 
    sut = new CreateCustomer(inMemoryCustomerRepository, inMemoryBcryptService)
  })

  it('Should be able create a customer', async () => {
    const customerFake = makeCustomer()

    const passWordHashFake = await inMemoryBcryptService.hashPassword(customerFake.Password, 6)

    const customer = await sut.execute({
      name: customerFake.Name,
      email: customerFake.Email,
      phone: customerFake.Phone,
      password: passWordHashFake,
    })

    if(customer.isRight()) {
      expect(customer.isRight()).toBeTruthy()
      expect(inMemoryCustomerRepository.customers.length).toBe(1)
    }
  })
})