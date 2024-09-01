import { Neighborhood } from './../../../enterprise/entities/neighborhood';
import { Either, right } from "../../../../core/either";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";


type CreateNeighborhoodResponse = Either<null, { neighborhoods: Neighborhood[] }>

export class FindManyNeighborhood {
  constructor(
    private neighborhoodRepository: NeighborhoodRepository,
  ) { }

  async execute(): Promise<CreateNeighborhoodResponse> {

    const neighborhoods = await this.neighborhoodRepository.findMany()

    return right({ neighborhoods })
  }
}