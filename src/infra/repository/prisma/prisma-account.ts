
import { AccountRepository, IFindUniqueProps } from "../../../domain/application/repositories/account-repository";
import { prisma } from "../../../lib/prisma";
import { Account } from "../../../domain/enterprise/entities/account";

export class PrismaAccountRepository implements AccountRepository {
  async create (account: Account): Promise<void> {
    await prisma.account.create({
      data: {
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        customerId: account.customerId,
      }
    })

  }

async findUnique(account: IFindUniqueProps): Promise<Account | null> {
  const customer = await prisma.account.findUnique({
    where: {  
      provider_customerId: {
        provider: account.provider,
        customerId: account.customerId
      }
    }
  })

  if(!customer) return null

  return new Account(customer)
}
}