import { InMemoryAddressRepository } from "../../../../tests/in-memory";
import { DeleteAddress } from "./delete-address";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { makeAddress } from "../../../../tests/factory/make-address";

let inMemoryAddressRepository: InMemoryAddressRepository
let sut: DeleteAddress

describe('Delete Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    sut = new DeleteAddress(inMemoryAddressRepository)
  })

  it('Should be delete in Adress', async () => {
    const addressFake = makeAddress()

    await inMemoryAddressRepository.create(addressFake)

    const result = await sut.execute(addressFake.id)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryAddressRepository.address.length).toBe(0)
    }
  })

  it('Should be not delete in Drink', async () => {
    const addressFake = makeAddress()

    await inMemoryAddressRepository.create(addressFake)

    const result = await sut.execute('idFake')

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})