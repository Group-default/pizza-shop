import { makeNeighborhood } from "../../../../tests/factory/make-neigborhood";
import { FindManyNeighborhood } from "./find-many-neignborhood";
import { InMemoryNeighborhoodRepository } from "../../../../tests/in-memory/in-memory-neighborhood-repository";

let sut: FindManyNeighborhood
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository

describe('CreateUseCase Neighborhood', () => {
  beforeEach(() => {
    inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository() 
    sut = new FindManyNeighborhood(
      inMemoryNeighborhoodRepository,
    )
  })

  it('Should be find Many a neighborhood', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const product = await sut.execute()

    if(product.isRight()) {
      expect(product.isRight).toBeTruthy()
      expect(inMemoryNeighborhoodRepository.neighborhood.length).toBe(1)
    }
  })
})