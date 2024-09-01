import { NeighborhoodRepository } from "../../domain/application/repositories/neighborhood-repository";
import { Neighborhood } from "../../domain/enterprise/entities/neighborhood";


export class InMemoryNeighborhoodRepository implements NeighborhoodRepository {
  public neighborhood: Neighborhood[] = []

  async create(neighborhood: Neighborhood): Promise<void> {
    this.neighborhood.push(neighborhood)
  }


  async findByName(name: string): Promise<Neighborhood | null> {
    const neighborhood = this.neighborhood.find(add => add.name === name)

    if (!neighborhood) {
      return null
    }

    return neighborhood
  }

  async findMany(): Promise<Neighborhood[]> {
    return this.neighborhood
  }

  async findById(id: string): Promise<Neighborhood |null> {
    const findNeighborhood = this.neighborhood.find(neigh => neigh.id === id)

    if(!findNeighborhood) return null

    return findNeighborhood
  }

  async delete(id: string): Promise<void> {
    this.neighborhood = this.neighborhood.filter(neigh => neigh.id !== id)
  }

  async update(neighborhood: Neighborhood): Promise<void> {
    const index = this.neighborhood.findIndex(neigh => neigh.id === neighborhood.id)
        
    if(index >= 0) {
        this.neighborhood[index] = neighborhood
    }
  }
}