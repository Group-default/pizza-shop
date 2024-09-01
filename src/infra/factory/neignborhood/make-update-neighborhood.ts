import { UpdateNeighborhood } from "../../../domain/application/use-cases/neignborhood/update-neighborhood"
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood"

export const MakeUpdateNeighborhood = () => {
  const prismaNeighborhoodRepository = new PrismaNeighborhoodRepository()
  const updateNeighborhood = new UpdateNeighborhood(prismaNeighborhoodRepository)
  return updateNeighborhood
}