import { FindByIdCustomer } from "../../../domain/application/use-cases/customer/find-by-id-customer";
import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer";

export const makeFindByIdCustomer = () => {
    const prismaCustomerRepository = new PrismaCustomerRepository()
    const findByIdCustomer = new FindByIdCustomer(prismaCustomerRepository)

    return findByIdCustomer
}