import { Authenticate } from "../../../domain/application/use-cases/authenticate/authenticate";
import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer"; 
import { BcryptServiceImpl } from "../../service/bcrypt";

export const makeFactorieAuthenticate = () => {
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const bcriptyServiceImpl = new BcryptServiceImpl()
  const authenticate = new Authenticate(
    prismaCustomerRepository,
    bcriptyServiceImpl,
  )
  
  return authenticate
}