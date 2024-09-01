import { DeleteAddress } from "../../../domain/application/use-cases/address/delete-address"
import { PrismaAddressRepository } from "../../repository/prisma/prisma-address"

export const MakeDeleteAddress = () => {
  const prismaAddressRepository = new PrismaAddressRepository()
  const deleteAddressUseCase = new DeleteAddress(prismaAddressRepository)
  return deleteAddressUseCase
}