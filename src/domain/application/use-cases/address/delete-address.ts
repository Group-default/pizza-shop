import { AddressRepository } from "../../repositories/address-repository";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type AddressUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteAddress {
  constructor(private addressRepository: AddressRepository){}

  async execute(id: string): Promise<AddressUseCaseResponse> {
    const address = await this.addressRepository.findById(id)

    if (!address) {
      return left(new ResourceNotFoundError())
    }

    await this.addressRepository.delete(id)

    return right({})
  }
}