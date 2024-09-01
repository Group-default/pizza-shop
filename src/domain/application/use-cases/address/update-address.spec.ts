import { InMemoryAddressRepository } from "../../../../tests/in-memory";
import { UpdateAddress } from "./update-address";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { makeCustomer } from "../../../../tests/factory";
import { makeAddress } from "../../../../tests/factory/make-address";
import { InMemoryNeighborhoodRepository } from "../../../../tests/in-memory/in-memory-neighborhood-repository";

let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository
let sut: UpdateAddress

describe('Update Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository()
    sut = new UpdateAddress(inMemoryAddressRepository, inMemoryNeighborhoodRepository)
  })

  it('Should be update a address', async () => {
    const customer = makeCustomer()    

    const addressFake = makeAddress({ customerId: customer.Id })

    const result = await sut.execute(addressFake)
    
    if(result.isRight()){
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryAddressRepository.address.length).toBe(1)
    }
  })

  it('Should not be update Address', async () => {
    const addressFake = makeAddress({ customerId: 'idFake'})

    const result = await sut.execute(addressFake)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})