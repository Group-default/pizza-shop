import { MakeCategory } from "../../../../tests/factory/make-category";
import { FindByIdCategory } from "./findById-category";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let sut: FindByIdCategory
let inMemoryCategoryRepository: InMemoryCategoryRepository

describe('FindById Category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository() 
    sut = new FindByIdCategory(
      inMemoryCategoryRepository,
    )
  })

  it('Should be findById a category', async () => {
    const category = MakeCategory()

    inMemoryCategoryRepository.create(category)

    const result = await sut.execute(category.id)

    if(result.isRight()) {
      expect(result.isRight).toBeTruthy()
      expect(inMemoryCategoryRepository.categorys.length).toBe(1)
    }
  })

  it('Should be return ResourceNotFond with id invalid', async () => {
    const category = MakeCategory()

    inMemoryCategoryRepository.create(category)

    const result = await sut.execute('fakeId')

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})