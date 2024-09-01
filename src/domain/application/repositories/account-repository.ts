import { Account } from "../../enterprise/entities/account"

export interface IFindUniqueProps {
  provider: "GOOGLE" | "GITHUB"
  customerId: string
}


export interface AccountRepository {
  create(account: Account): Promise<void>
  findUnique(account: IFindUniqueProps): Promise<Account | null>
}