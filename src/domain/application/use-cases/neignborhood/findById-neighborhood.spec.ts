import { makeNeighborhood } from "../../../../tests/factory/make-neigborhood";
import { FindByIdNeighborhood } from "./findById-neighborhood";
import { InMemoryNeighborhoodRepository } from "../../../../tests/in-memory/in-memory-neighborhood-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let sut: FindByIdNeighborhood
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository

describe('Neighborhood FindById', () => {
  beforeEach(() => {
    inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository() 
    sut = new FindByIdNeighborhood(
      inMemoryNeighborhoodRepository,
    )
  })

  it('Should be find by id a neighborhood', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const product = await sut.execute(neigborhoodFake.id)

    if(product.isRight()) {
      expect(product.isRight()).toBeTruthy()
      expect(inMemoryNeighborhoodRepository.neighborhood.length).toBe(1)
    }
  })

  it('Should be not find by id a neighborhood return ResourceNotFound', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const product = await sut.execute('idFake')

    expect(product.isLeft()).toBeTruthy()
    expect(product.value).toBeInstanceOf(ResourceNotFoundError)
  })
})