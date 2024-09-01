import { MakeCategory } from "../../../../tests/factory/make-category";
import { FindManyCategory } from "./findMany-category";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";

let sut: FindManyCategory
let inMemoryCategoryRepository: InMemoryCategoryRepository

describe('FindMany Category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository() 
    sut = new FindManyCategory(
      inMemoryCategoryRepository,
    )
  })

  it('Should be findMany a category', async () => {
    const category = MakeCategory()

    inMemoryCategoryRepository.create(category)

    const result = await sut.execute()

    if(result.isRight()) {
      expect(result.isRight).toBeTruthy()
      expect(inMemoryCategoryRepository.categorys.length).toBe(1)
    }
  })
})