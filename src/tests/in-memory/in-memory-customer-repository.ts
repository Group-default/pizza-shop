import { CustomerRepository } from "../../domain/application/repositories/customer-repository";
import { Customer } from "../../domain/enterprise/entities/customer";


export class InMemoryCustomerRepository implements CustomerRepository {
    public customers: Customer[] = []

    async create(customer: Customer): Promise<void> {
       this.customers.push(customer)
       
    }

    async findById(id: string): Promise<Customer | null> {
        const customer = this.customers.find(customer => customer.Id === id)

        if (!customer) {
            return null
        }

        return customer
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const customer = this.customers.find(customer => customer.Email === email)

        if (!customer) {
            return null
        }

        return customer
    }

    async delete(id: string): Promise<void> {
        const arrCustomers = this.customers.filter(customer => customer.Id !== id)
        this.customers = arrCustomers
    }
}