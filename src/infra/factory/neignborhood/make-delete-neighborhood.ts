import { DeleteNeighborhood } from "../../../domain/application/use-cases/neignborhood/delete-neighborhood"
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood"

export const MakeDeleteNeighborhood = () => {
  const neighborhoodRepository = new PrismaNeighborhoodRepository()
  const deleteNeighborhood = new DeleteNeighborhood(neighborhoodRepository)
  return deleteNeighborhood
}   