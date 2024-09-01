import { makeNeighborhood } from "../../../../tests/factory/make-neigborhood";
import { UpdateNeighborhood } from "./update-neighborhood";
import { InMemoryNeighborhoodRepository } from "../../../../tests/in-memory/in-memory-neighborhood-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let sut: UpdateNeighborhood
let inMemoryNeighborhoodRepository: InMemoryNeighborhoodRepository

describe('Neighborhood Update', () => {
  beforeEach(() => {
    inMemoryNeighborhoodRepository = new InMemoryNeighborhoodRepository() 
    sut = new UpdateNeighborhood(
      inMemoryNeighborhoodRepository,
    )
  })

  it('Should be update neighborhood', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const product = await sut.execute({
      id: neigborhoodFake.id,
      name: 'Murta',
      tax: '7.00'
    })

    if(product.isRight()) {
      expect(product.isRight()).toBeTruthy()
      expect(inMemoryNeighborhoodRepository.neighborhood.length).toBe(1)
    }
  })

  it('Should be not find by name a neighborhood return ResourceNotFound', async () => {
    const neigborhoodFake = makeNeighborhood()

    inMemoryNeighborhoodRepository.create(neigborhoodFake)

    const product = await sut.execute({
      id: 'idFake',
      name: 'Murta',
      tax: '7.00'
    })

    console.log(product.isLeft())

    expect(product.isLeft()).toBeTruthy()
    expect(product.value).toBeInstanceOf(ResourceNotFoundError)
  })
})