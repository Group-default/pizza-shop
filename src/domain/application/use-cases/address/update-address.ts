import { Either, left, right } from "../../../../core/either";
import { AddressRepository } from "../../repositories/address-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Address, } from "../../../enterprise/entities";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";

interface AddressUseCaseRequest {
  id: string
  customerId: string
  type: "HOME" | "WORK" | "OTHER"
  street: string
  standard?: boolean
  number: string
  neighborhood: string
  zipCode: string
  phone: string
}

type AddressUseCasesResponse = Either<ResourceNotFoundError, {}>

export class UpdateAddress {
  constructor(
    private addressRepository: AddressRepository,
    private neighborhood: NeighborhoodRepository
  ) { }

  async execute(addressUpdate: AddressUseCaseRequest): Promise<AddressUseCasesResponse> {
   
    const address = await this.addressRepository.findById(addressUpdate.id)
    const addresses = await this.addressRepository.find(addressUpdate.customerId)
    const neighborhood = await this.neighborhood.findByName(addressUpdate.neighborhood)

    if (!address || !neighborhood) {
      return left(new ResourceNotFoundError())
    }

    const existingDefaultAddress = addresses.find(address => address.standard)
    

    if (existingDefaultAddress) {
    
      const addressUpdated = Address.create({
        customerId: existingDefaultAddress.customerId,
        type: existingDefaultAddress.type,
        street: existingDefaultAddress.street,
        standard: false,
        number: existingDefaultAddress.number,
        neighborhoodId: neighborhood.id,
        zipCode: existingDefaultAddress.zipCode,
        phone: existingDefaultAddress.phone,
        id: existingDefaultAddress.id
      })
      await this.addressRepository.update(addressUpdated)

    }

    const addressUpdated = Address.create({
      customerId: addressUpdate.customerId,
      type: addressUpdate.type,
      street: addressUpdate.street,
      standard: addressUpdate.standard,
      number: addressUpdate.number,
      neighborhoodId: neighborhood.id,
      zipCode: addressUpdate.zipCode,
      phone: addressUpdate.phone,
      id: addressUpdate.id
    })

    await this.addressRepository.update(addressUpdated)

    return right({})
  }
}