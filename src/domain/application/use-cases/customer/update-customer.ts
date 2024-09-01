import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { CustomerRepository } from "../../repositories/customer-repository";

interface UpdateCustomerUseCaseRequest {
    id: string
    withdrawalName: string
    phone: string   
}

type UpdateCustomerResponse = Either<ResourceNotFoundError, {}>

export class UpdateCustomer {
    constructor(
        private customerRepository: CustomerRepository,
    ) { }

    async execute({ id, withdrawalName, phone}: UpdateCustomerUseCaseRequest): Promise<UpdateCustomerResponse> {
        const customer = await this.customerRepository.findById(id)
        if (!customer) {
            return left(new ResourceNotFoundError())
        }
        await this.customerRepository.update(id, withdrawalName, phone)
        return right({})
    }
}