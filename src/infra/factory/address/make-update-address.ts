import { UpdateAddress } from "../../../domain/application/use-cases/address/update-address"
import { PrismaAddressRepository } from "../../repository/prisma/prisma-address"
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood"

export const MakeUpdateAddress = () => {
    const prismaAddressRepository = new PrismaAddressRepository()
    const neighborhoodRepository = new PrismaNeighborhoodRepository()    
    const updateAddressUseCase = new UpdateAddress(prismaAddressRepository, neighborhoodRepository)
    return updateAddressUseCase
}