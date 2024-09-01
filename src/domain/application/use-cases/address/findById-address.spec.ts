import { InMemoryAddressRepository } from "../../../../tests/in-memory";
import { FindByIdAddress } from "./findById-address";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { makeCustomer } from "../../../../tests/factory";

let inMemoryAddressRepository: InMemoryAddressRepository
let sut: FindByIdAddress

describe('FindById Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    sut = new FindByIdAddress(inMemoryAddressRepository)
  })

  it('Should be findById a address', async () => {
    const customer = makeCustomer()    

    const result = await sut.execute(customer.Id)
    
    if(result.isRight()){
      expect(result.isRight()).toBeTruthy()
      expect(result.value.address.customerId).toBe(customer.Id)
    }
  })

  it('Should not be findById address', async () => {
    const drink = await sut.execute('idFake')

    expect(drink.isLeft()).toBeTruthy()
    // toBeInstanceOf
    expect(drink.value).toBeInstanceOf(ResourceNotFoundError)
  })
})