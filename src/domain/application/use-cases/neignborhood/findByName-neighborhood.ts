import { Neighborhood } from './../../../enterprise/entities/neighborhood';
import { Either, left, right } from "../../../../core/either";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';


type FindByNameNeighborhoodResponse = Either<ResourceNotFoundError, { neighborhood: Neighborhood }>

export class FindByNameNeighborhood {
  constructor(
    private neighborhoodRepository: NeighborhoodRepository,
  ) { }

  async execute(id: string): Promise<FindByNameNeighborhoodResponse> {
    const neighborhood = await this.neighborhoodRepository.findById(id)

    if(!neighborhood) {
      return left(new ResourceNotFoundError())
    }
    
    return right({ neighborhood })
  }
}