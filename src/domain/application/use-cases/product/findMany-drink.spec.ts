import { InMemoryProductRepository } from "../../../../tests/in-memory/in-memory-product-repository";
import { FindManyProduct } from "./findMany-product";
import { makeProduct } from "../../../../tests/factory/make-product";

let inMemoryProductRepository: InMemoryProductRepository
let sut: FindManyProduct

describe('FindAll products', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new FindManyProduct(inMemoryProductRepository)
  })

  it('Should be to bring in list Drisks', async () => {
    const productFake = makeProduct()
    const arr = ['1', '2']
    
    arr.forEach( async () => (
      await inMemoryProductRepository.create(productFake)
    ));

    const result = await sut.execute()

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(result.value.products.length).toBe(2)
    }
  })
})