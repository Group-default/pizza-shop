import { BcryptServiceImpl } from "../../../../infra/service/bcrypt";
import { makeCustomer } from "../../../../tests/factory";
import { InMemoryBcryptService, InMemoryCustomerRepository } from "../../../../tests/in-memory";
import { Authenticate } from "./authenticate";

let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryBcrypt: InMemoryBcryptService
let sut: Authenticate

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryBcrypt = new InMemoryBcryptService()
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new Authenticate(inMemoryCustomerRepository, inMemoryBcrypt)
  })
  
  it('Shold be able to authenticate customer', async () => {
    const customer = makeCustomer()

    await inMemoryCustomerRepository.create(customer)

    const result = await sut.authenticate({
      email: customer.Email,
      password: customer.Password,
    })

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(result.value.customer.Id).toBe(customer.Id)
    }
  })
})