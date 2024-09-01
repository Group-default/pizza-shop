import { NeighborhoodRepository } from './../../repositories/neighborhood-repository';
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Address } from "../../../enterprise/entities/address";
import { AddressRepository } from "../../repositories/address-repository";
import { CustomerRepository } from "../../repositories/customer-repository";

interface CreateAddressUseCaseRequest {
  customerId: string
  type: "HOME"| "WORK" | "OTHER"
  street: string
  number: string
  standard?: boolean
  neighborhood: string
  zipCode: string
  phone: string
}

type CreateAddressUseCaseResponse = Either<ResourceNotFoundError, {address: Address}>

export class CreateAddress {
  constructor(
    private addressRepository: AddressRepository,
    private customerRepository: CustomerRepository,
    private neighborhoodRepository: NeighborhoodRepository
  ) { }

  async execute(addressReq: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const customer = await this.customerRepository.findById(addressReq.customerId)
    const neighborhood = await this.neighborhoodRepository.findByName(addressReq.neighborhood)
    console.log(addressReq);
    
    if (!customer) {
      return left(new ResourceNotFoundError())
    }

    if (!neighborhood) {
      return left(new ResourceNotFoundError())
    }

    const addressDefault = await this.addressRepository.findMany(customer.Id)

    const addressStandardExists = addressDefault.some(address => address.standard)  
  
    if (addressStandardExists) {
      const newAddress = Address.create({
        customerId: addressReq.customerId,
        neighborhoodId: neighborhood.id,
        number: addressReq.number,
        street: addressReq.street,
        type: addressReq.type,
        zipCode: addressReq.zipCode,
        standard: false,
        phone: addressReq.phone
      })
      await this.addressRepository.create(newAddress)
      return right({address: newAddress})
    } 
      const newAddress = Address.create({
        customerId: addressReq.customerId,
        neighborhoodId: neighborhood.id,
        number: addressReq.number,
        street: addressReq.street,
        type: addressReq.type,
        zipCode: addressReq.zipCode,
        standard: true,
        phone: addressReq.phone
      })
     const address = await this.addressRepository.create(newAddress)
    return right({address})
    
   
  }
}
