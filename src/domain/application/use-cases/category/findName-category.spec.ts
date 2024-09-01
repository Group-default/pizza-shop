import { MakeCategory } from "../../../../tests/factory/make-category";
import { FindNameCategory } from "./findName-category";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";

let sut: FindNameCategory
let inMemoryCategoryRepository: InMemoryCategoryRepository

describe('FindByName Category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository() 
    sut = new FindNameCategory(
      inMemoryCategoryRepository,
    )
  })

  it('Should be findName a category', async () => {
    const category = MakeCategory()

    inMemoryCategoryRepository.create(category)

    const result = await sut.execute(category.name)

    if(result.isRight()) {
      expect(result.isRight).toBeTruthy()
      expect(inMemoryCategoryRepository.categorys.length).toBe(1)
    }
  })
})