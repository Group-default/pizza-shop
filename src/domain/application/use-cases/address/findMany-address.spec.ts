import { InMemoryCustomerRepository } from './../../../../tests/in-memory/in-memory-customer-repository';
import { InMemoryAddressRepository } from "../../../../tests/in-memory";
import { FindManyAddress } from "./findMany-address";
import { makeCustomer } from "../../../../tests/factory";
import { makeAddress } from "../../../../tests/factory/make-address";

let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: FindManyAddress

describe('FindMany Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new FindManyAddress(inMemoryAddressRepository, inMemoryCustomerRepository)
  })

  it('Should be findMany a Address', async () => {
    const customer = makeCustomer()
    const address = makeAddress({ customerId: customer.Id })    

    inMemoryAddressRepository.create(address)

    const result = await sut.execute({customerId: customer.Id})
    
    if(result.isRight()){
      expect(result.isRight()).toBeTruthy()
      expect(result.value.address.length).toBe(1)
    }
  })
})