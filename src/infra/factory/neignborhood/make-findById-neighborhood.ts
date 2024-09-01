import { FindByIdNeighborhood } from "../../../domain/application/use-cases/neignborhood/findById-neighborhood"
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood"

export const MakeFindByIdNeighborhood = () => {
  const neighborhoodRepository = new PrismaNeighborhoodRepository()
  const findByIdNeighborhood = new FindByIdNeighborhood(neighborhoodRepository)
  return findByIdNeighborhood
} 