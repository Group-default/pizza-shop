import { CustomerRepository } from "../../repositories/customer-repository";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type CustomerUseCasesResponse = Either<ResourceNotFoundError, {}>

export class DeleteCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<CustomerUseCasesResponse> {
    const customer = await this.customerRepository.findById(id)

    if(!customer) {
      return left(new ResourceNotFoundError())
    } 

    await this.customerRepository.delete(id)

    return right({})
  }
}