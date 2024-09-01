import { makeNeighborhood } from "../../../../tests/factory/make-neigborhood";
import { DeleteNeighborhood } from "./delete-neighborhood";
import { InMemoryNeighborhoodRepository } from "../../../../tests/in-memory/in-memory-neighborhood-repository";

let sut: DeleteNeighborhood
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository

describe('DeleteUseCase Neighborhood', () => {
  beforeEach(() => {
    inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository() 
    sut = new DeleteNeighborhood(
      inMemoryNeighborhoodRepository,
    )
  })

  it('Should be able delete a neighborhood', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const result = await sut.execute(neigborhoodFake.id)

    if(result.isRight()) {
      expect(result.isRight).toBeTruthy()
      expect(inMemoryNeighborhoodRepository.neighborhood.length).toBe(0)
    }
  })
})