import { Either, left, right } from "../../../../core/either";
import { AddressRepository } from "../../repositories/address-repository";
import { Address } from "../../../enterprise/entities";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { CustomerRepository } from "../../repositories/customer-repository";
import { IAddressList } from "../../../../interfaces/IAddressList";


type AddressUseCasesResponse = Either<ResourceNotFoundError, { address: IAddressList[] }>

export class FindManyAddress {
  constructor(
    private addressRepository: AddressRepository,
    private customerRepository: CustomerRepository
  ) {}

  async execute(customerId: string): Promise<AddressUseCasesResponse> {
    
    const customer = await this.customerRepository.findById(customerId)

    if (!customer) {
      return left(new ResourceNotFoundError())
    }
    const address = await this.addressRepository.findMany(customerId)

    if (!address) {
      return left(new ResourceNotFoundError())
    }

    return right({ address })
  }
}