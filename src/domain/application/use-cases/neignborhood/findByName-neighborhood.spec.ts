import { makeNeighborhood } from "../../../../tests/factory/make-neigborhood";
import { FindByNameNeighborhood } from "./findByName-neighborhood";
import { InMemoryNeighborhoodRepository } from "../../../../tests/in-memory/in-memory-neighborhood-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let sut: FindByNameNeighborhood
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository

describe('Neighborhood FindByName', () => {
  beforeEach(() => {
    inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository() 
    sut = new FindByNameNeighborhood(
      inMemoryNeighborhoodRepository,
    )
  })

  it('Should be find by name a neighborhood', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const product = await sut.execute(neigborhoodFake.id)

    if(product.isRight()) {
      expect(product.isRight()).toBeTruthy()
      expect(inMemoryNeighborhoodRepository.neighborhood.length).toBe(1)
    }
  })

  it('Should be not find by name a neighborhood return ResourceNotFound', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const product = await sut.execute('idFake')

    expect(product.isLeft()).toBeTruthy()
    expect(product.value).toBeInstanceOf(ResourceNotFoundError)
  })
})