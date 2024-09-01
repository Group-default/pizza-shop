import { makeNeighborhood } from "../../../../tests/factory/make-neigborhood";
import { CreateNeighborhood } from "./create-neighborhood";
import { InMemoryNeighborhoodRepository } from "../../../../tests/in-memory/in-memory-neighborhood-repository";

let sut: CreateNeighborhood
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository

describe('CreateUseCase Neighborhood', () => {
  beforeEach(() => {
    inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository() 
    sut = new CreateNeighborhood(
      inMemoryNeighborhoodRepository,
    )
  })

  it('Should be able create a neighborhood', async () => {
    const neigborhoodFake = makeNeighborhood()

    const product = await sut.execute({
      name: neigborhoodFake.name,
      tax: neigborhoodFake.tax,
    })

    if(product.isRight()) {
      expect(product.isRight).toBeTruthy()
      expect(inMemoryNeighborhoodRepository.neighborhood.length).toBe(1)
    }
  })
})