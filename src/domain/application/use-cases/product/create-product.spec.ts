import { InMemoryProductRepository } from "../../../../tests/in-memory/in-memory-product-repository";
import { InMemoryCategoryRepository } from "../../../../tests/in-memory/in-memory-category-repository";
import { makeProduct } from "../../../../tests/factory/make-product";
import { Createproduct } from "./create-product";

let inMemoryproductRepository: InMemoryProductRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let sut: Createproduct

describe('CreateUseCaseproduct', () => {
  beforeEach(() => {
    inMemoryproductRepository = new InMemoryProductRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository() 
    sut = new Createproduct(
      inMemoryproductRepository,
      inMemoryCategoryRepository
    )
  })

  it('Should be able create a product', async () => {
    const productFake = makeProduct()

    const product = await sut.execute({
      name: productFake.name,
      category: "bebidas",
      description: productFake.description,
      price: productFake.price,
      size: productFake.size,
      image: productFake.image,
      type: productFake.type,
      status: productFake.status,
    })

    if(product.isRight()) {
      expect(product.isRight).toBeTruthy()
      expect(inMemoryproductRepository.products.length).toBe(1)
    }
  })
})