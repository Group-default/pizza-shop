import { UpdateCustomer } from "../../../domain/application/use-cases/customer/update-customer"
import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer"

export const MakeUpdateCustomer = () => {
    const prismaCustomerRepository = new PrismaCustomerRepository()
    const updateCustomer = new UpdateCustomer(prismaCustomerRepository)
    return updateCustomer
}