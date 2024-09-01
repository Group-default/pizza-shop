import { InMemoryProductRepository } from "../../../../tests/in-memory/in-memory-product-repository";
import { FindByIdProduct } from "./findById-product";
import { makeProduct } from "../../../../tests/factory/make-product";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let inMemoryproductRepository: InMemoryProductRepository
let sut: FindByIdProduct

describe('FindById product', () => {
  beforeEach(() => {
    inMemoryproductRepository = new InMemoryProductRepository()
    sut = new FindByIdProduct(inMemoryproductRepository)
  })

  it('Should be find by id a product', async () => {
    const productFake = makeProduct()
    
    await inMemoryproductRepository.create(productFake)

    const result = await sut.execute(productFake.id)
    
    if(result.isRight()){
      expect(result.isRight()).toBeTruthy()
      expect(result.value.product).toBe(productFake)
    }
  })

  it('Should not be find by id', async () => {
    const product = await sut.execute('idFake')

    expect(product.isLeft()).toBeTruthy()
    // toBeInstanceOf
    expect(product.value).toBeInstanceOf(ResourceNotFoundError)
  })
})