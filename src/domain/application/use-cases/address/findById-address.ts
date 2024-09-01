import { Either, left, right } from "../../../../core/either";
import { AddressRepository } from "../../repositories/address-repository";
import { Address } from "../../../enterprise/entities";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type AddressUseCasesResponse = Either<ResourceNotFoundError, { address: Address }>

export class FindByIdAddress {
  constructor(
    private addressRepository: AddressRepository
  ) {}

  async execute(id: string): Promise<AddressUseCasesResponse> {
    const address = await this.addressRepository.findById(id)

    if (!address) {
      return left(new ResourceNotFoundError())
    }

    return right({ address })
  }
}