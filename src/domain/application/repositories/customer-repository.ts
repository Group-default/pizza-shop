import { Customer } from "../../enterprise/entities/customer";

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>
  createSocialAccount(customer: Customer): Promise<void>
  findByEmail(email: string): Promise<Customer | null>
  findById(id: string): Promise<Customer | null>
  update(id:string, name:string, phone:string): Promise<void> 
  delete(id: string): Promise<void>
}