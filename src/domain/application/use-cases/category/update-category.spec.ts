import { MakeCategory } from "../../../../tests/factory/make-category";
import { UpdateCategory } from "./update-category";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";

let sut: UpdateCategory
let inMemoryCategoryRepository: InMemoryCategoryRepository

describe('Update Category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository() 
    sut = new UpdateCategory(
      inMemoryCategoryRepository,
    )
  })

  it('Should be update a category', async () => {
    const category = MakeCategory()

    inMemoryCategoryRepository.create(category)

    const result = await sut.execute({
      id: category.id,
      name: 'Molhos',
    })

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryCategoryRepository.categorys).not.toBe(category)
    }
  })
})