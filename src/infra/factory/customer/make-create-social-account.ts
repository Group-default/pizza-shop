import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer";
import { CreateCustomerSocialAccount } from "../../../domain/application/use-cases/customer/create-customer-social-account";
import { PrismaAccountRepository } from "../../repository/prisma/prisma-account";

export const makeCustomerSocialAccountFactory = () => {
    const prismaCustomerRepository = new PrismaCustomerRepository()
    const prismaAccountRepository = new PrismaAccountRepository()
    const createCustomerSocialAccount = new CreateCustomerSocialAccount(
        prismaCustomerRepository,
        prismaAccountRepository
    )

    return createCustomerSocialAccount
}