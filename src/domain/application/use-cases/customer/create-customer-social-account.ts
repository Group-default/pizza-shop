import { Either, left, right } from "../../../../core/either"
import { BadRequestError } from "../../../../core/errors/bad-request-error"
import { Account } from "../../../enterprise/entities/account"
import { Customer } from "../../../enterprise/entities/customer"
import { AccountRepository } from "../../repositories/account-repository"
import { CustomerRepository } from "../../repositories/customer-repository"

export interface CustomerUseCasesRequest {
    id: string    
    name: string
    email: string
    avatarUrl?: string,
    role?: 'ADMIN' | 'CUSTOMER'
        
}



type CustomerUseCasesResponse = Either<BadRequestError, { customer: Customer }>

export class CreateCustomerSocialAccount {
    constructor(
        private customerRepository: CustomerRepository,
        private accountRepository: AccountRepository
       
    ) { }

    async execute({ email, name, id , avatarUrl }: CustomerUseCasesRequest): Promise<CustomerUseCasesResponse> {
        let customer = await this.customerRepository.findByEmail(email)

        if(customer?.Email === null) {
            return left(new BadRequestError('Your social account must an email to authenticate'))
        }

        if (!customer) {
            const NewSocialCustomer = Customer.create({ email,avatarUrl, id, name, })
            customer = await this.customerRepository.create(NewSocialCustomer) 
        }
        
        const account = await this.accountRepository.findUnique({customerId: customer.Id, provider: 'GOOGLE'})

        if (!account) {
            const NewAccount = Account.create({customerId: customer?.Id, provider: 'GOOGLE', providerAccountId: id})
            await this.accountRepository.create(NewAccount)
        }


        return right({customer})
    }
}