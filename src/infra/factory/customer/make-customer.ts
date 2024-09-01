import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer";
import { CreateCustomer } from "../../../domain/application/use-cases/customer/create-customer";
import { BcryptServiceImpl } from "../../service/bcrypt";

export const makeCustomerFactorie = () => {
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const bcryptServiceImpl = new BcryptServiceImpl() 
  const createCustomer = new CreateCustomer(
    prismaCustomerRepository,
    bcryptServiceImpl,
  )

  return createCustomer
}