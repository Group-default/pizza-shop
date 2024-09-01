import { Either, right } from "../../../../core/either";
import { Neighborhood } from "../../../enterprise/entities/neighborhood";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";


interface CreateNeighborhoodUseCaseRequest {
  name: string
  tax:string
}

type CreateNeighborhoodResponse = Either<null, {}>

export class CreateNeighborhood {
  constructor(
    private neighborhoodRepository: NeighborhoodRepository,
  ) { }

  async execute(neighborhood: CreateNeighborhoodUseCaseRequest): Promise<CreateNeighborhoodResponse> {
   
    const newNeighborhood = Neighborhood.create(neighborhood)
    await this.neighborhoodRepository.create(newNeighborhood)

    return right({})
  }
}