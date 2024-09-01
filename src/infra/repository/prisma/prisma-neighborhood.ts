import { NeighborhoodRepository } from "../../../domain/application/repositories/neighborhood-repository";
import { Neighborhood } from "../../../domain/enterprise/entities/neighborhood";
import { prisma } from "../../../lib/prisma";


export class PrismaNeighborhoodRepository implements NeighborhoodRepository {
  async create(neighborhood: Neighborhood): Promise<void> {
    await prisma.neighborhood.create({
      data: {
        name: neighborhood.name,
        tax: neighborhood.tax
      }
    })
  }

  async findMany(): Promise<Neighborhood[]> {
    const neighborhoods = await prisma.neighborhood.findMany()
    return neighborhoods.map((neighborhood) => new Neighborhood(neighborhood))
  }

  async findByName(name: string): Promise<Neighborhood | null> {
    const neighborhood = await prisma.neighborhood.findFirst({
      where: { name }
    })

    if(!neighborhood) return null

    return new Neighborhood(neighborhood)
  }

  async findById(id: string): Promise<Neighborhood | null> {
    const neigborhood = await prisma.neighborhood.findUnique({
      where: { id },
    })

    if(!neigborhood) return null

    return new Neighborhood(neigborhood)
  }

  async delete(id: string): Promise<void> {
    await prisma.neighborhood.delete({ where: { id }})
  }

  async update(neighborhood: Neighborhood): Promise<void> {
    await prisma.neighborhood.update({
      where: { id: neighborhood.id },
      data: { 
        name: neighborhood.name,
        tax: neighborhood.tax,
        status: neighborhood.status,  
        updatedAt: new Date(),
       }
    })
  }
}