import { Either, left, right } from "../../../../core/either";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';


type DeleteNeighborhoodResponse = Either<ResourceNotFoundError, {}>

export class DeleteNeighborhood {
  constructor(
    private neighborhoodRepository: NeighborhoodRepository,
  ) { }

  async execute(id: string): Promise<DeleteNeighborhoodResponse> {
    const neighborhood = await this.neighborhoodRepository.findById(id)

    if(!neighborhood) {
      left(new ResourceNotFoundError())
    }
    
    await this.neighborhoodRepository.delete(id)

    return right({ neighborhood })
  }
}