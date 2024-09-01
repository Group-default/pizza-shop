import { InMemoryNeighborhoodRepository } from './../../../../tests/in-memory/in-memory-neighborhood-repository';
import { InMemoryAddressRepository } from "../../../../tests/in-memory/in-memory-address-repository"
import { CreateAddress } from "./create-address"
import { InMemoryCustomerRepository } from "../../../../tests/in-memory/in-memory-customer-repository"
import { makeCustomer } from "../../../../tests/factory/make-customer"
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error"


let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository
let sut: CreateAddress

describe("Create Address", () => {
    beforeEach(() => {   
        inMemoryAddressRepository = new InMemoryAddressRepository()
        inMemoryCustomerRepository = new InMemoryCustomerRepository()
        inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository()
        sut = new CreateAddress(
           inMemoryAddressRepository,
           inMemoryCustomerRepository,
           inMemoryNeighborhoodRepository 
        )
    })

    it('should be able to create a address', async () => {
        const customer = makeCustomer()
        
        await inMemoryCustomerRepository.create(customer)

        const result = await sut.execute({
            customerId: customer.Id,
            street: "Street",
            type: "HOME",
            number: '1',
            neighborhood: "neighborhood",
            zipCode: "ZipCode",
            phone: "Phone",
        })

        if (result.isRight()) {
            expect(result.isRight()).toBeTruthy()
            expect(inMemoryAddressRepository.address.length).toBe(1)
        }

    })

    it('should not be able to create a address with a customer that does not exist', async () => {
        const result = await sut.execute({
            customerId: 'fakeId',
            street: "Street12",
            number: '121',
            type: "HOME",
            neighborhood: "neighborhood",
            zipCode: "ZipCode",
            phone: "Phonee",
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })

})