import { makeProduct } from "../../../../tests/factory/make-product";
import { InMemoryProductRepository } from "../../../../tests/in-memory/in-memory-product-repository";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { UpdateProduct } from "./update-product";

let inMemoryProductRepository: InMemoryProductRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let sut: UpdateProduct

describe('Update Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    sut = new UpdateProduct(inMemoryProductRepository, inMemoryCategoryRepository)
  })

  it('Should be update in Product', async () => {
    const ProductFake = makeProduct()

    await inMemoryProductRepository.create(ProductFake)

    const result = await sut.execute({
      id: ProductFake.id,
      name: ProductFake.name,
      category: "pizzas",
      description: ProductFake.description,
      price: ProductFake.price,
      size: ProductFake.size,
      image: ProductFake.image,
      status: ProductFake.status,
    })

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
    }
  })

  it('Should be not updated in Product', async () => {
    const ProductFake = makeProduct()

    await inMemoryProductRepository.create(ProductFake)

    const result = await sut.execute({
      id: 'idProductFake',
      category: 'bebidas',
      name: 'Coca-cola',
      description: 'gelada',
      size: '600ml',
      price: '6.0',
      status: 'ACTIVE',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})