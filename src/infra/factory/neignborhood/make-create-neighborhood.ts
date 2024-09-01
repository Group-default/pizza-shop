import { CreateNeighborhood } from "../../../domain/application/use-cases/neignborhood/create-neighborhood"
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood"

export const MakeCreateNeighborhood = () => {
    const neighborhoodRepository = new PrismaNeighborhoodRepository()
    const createNeighborhood = new CreateNeighborhood(neighborhoodRepository)
    return createNeighborhood
}