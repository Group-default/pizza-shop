import { MakeCategory } from "../../../../tests/factory/make-category";
import { DeleteCategory } from "./delete-category";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";

let sut: DeleteCategory
let inMemoryCategoryRepository: InMemoryCategoryRepository

describe('Delete Category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository() 
    sut = new DeleteCategory(
      inMemoryCategoryRepository,
    )
  })

  it('Should be able delete a category', async () => {
    const category = MakeCategory()

    inMemoryCategoryRepository.create(category)

    const result = await sut.execute(category.id)

    if(result.isRight()) {
      expect(result.isRight).toBeTruthy()
      expect(inMemoryCategoryRepository.categorys.length).toBe(0)
    }
  })
})