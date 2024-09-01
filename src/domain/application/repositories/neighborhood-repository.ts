import { Neighborhood } from './../../enterprise/entities/neighborhood';


export interface NeighborhoodRepository {
    create(neighborhood: Neighborhood): Promise<void>
    findMany(): Promise<Neighborhood[]>
    findById(id: string): Promise<Neighborhood | null>
    findByName(name: string): Promise<Neighborhood | null>
    update(neighborhood: Neighborhood): Promise<void>
    delete(id: string): Promise<void>
}