import { makeProduct } from "../../../../tests/factory/make-product";
import { InMemoryProductRepository } from "../../../../tests/in-memory/in-memory-product-repository";
import { DeleteProduct } from "./delete-product";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

let inMemoryproductRepository: InMemoryProductRepository
let sut: DeleteProduct

describe('Delete product', () => {
  beforeEach(() => {
    inMemoryproductRepository = new InMemoryProductRepository()
    sut = new DeleteProduct(inMemoryproductRepository)
  })

  it('Should be delete in product', async () => {
    const productFake = makeProduct()

    await inMemoryproductRepository.create(productFake)

    const result = await sut.execute(productFake.id)

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryproductRepository.products.length).toBe(0)
    }
  })

  it('Should be not delete in product', async () => {
    const productFake = makeProduct()

    await inMemoryproductRepository.create(productFake)

    const result = await sut.execute('idFake')

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})