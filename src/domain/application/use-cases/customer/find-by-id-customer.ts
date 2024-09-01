import { Either, right } from "../../../../core/either";
import {  } from "../../repositories/address-repository";
import { Customer } from "../../../enterprise/entities";
import { CustomerRepository } from "../../repositories/customer-repository";

type CustomerUseCasesResponse = Either<null, { customer: Customer | null}>

export class FindByIdCustomer {
    constructor(
        private CustomerRepository: CustomerRepository
    ) { }

    async execute(id: string): Promise<CustomerUseCasesResponse> {
        const customer = await this.CustomerRepository.findById(id)

    
        return right({ customer })
    }
}