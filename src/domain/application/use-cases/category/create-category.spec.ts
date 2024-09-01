import { MakeCategory } from "../../../../tests/factory/make-category";
import { CreateCategory } from "./create-category";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";

let sut: CreateCategory
let inMemoryNeighborhoodRepository: InMemoryCategoryRepository

describe('CreateUseCase Neighborhood', () => {
  beforeEach(() => {
    inMemoryNeighborhoodRepository = new InMemoryCategoryRepository() 
    sut = new CreateCategory(
      inMemoryNeighborhoodRepository,
    )
  })

  it('Should be able create a category', async () => {
    const category = MakeCategory()

    const result = await sut.execute(category)

    if(result.isRight()) {
      expect(result.isRight).toBeTruthy()
      expect(inMemoryNeighborhoodRepository.categorys.length).toBe(1)
    }
  })
})