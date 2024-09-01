import { FindManyNeighborhood } from "../../../domain/application/use-cases/neignborhood/find-many-neignborhood"
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood"

export const MakeFindManyNeighborhood = () => {
  const prismaNeighborhoodRepository = new PrismaNeighborhoodRepository()
  const findManyNeighborhood = new FindManyNeighborhood(prismaNeighborhoodRepository)
  return findManyNeighborhood
}