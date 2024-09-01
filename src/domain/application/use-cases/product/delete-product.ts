import { ProductRepository } from "../../repositories/product-repository";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type productUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteProduct {
  constructor(private productRepository: ProductRepository){}

  async execute(id: string): Promise<productUseCaseResponse> {
    console.log(id)
    const productId = await this.productRepository.findById(id)

    if (!productId) {
      return left(new ResourceNotFoundError())
    }

    await this.productRepository.delete(id)

    return right({})
  }
}