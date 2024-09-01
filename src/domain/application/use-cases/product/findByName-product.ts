import { Either, left, right } from "../../../../core/either";
import { ProductRepository } from "../../repositories/product-repository";
import { Product } from "../../../enterprise/entities/product";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type ProductUseCasesResponse = Either<ResourceNotFoundError, { product: Product }>

export class FindByNameProduct {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute(name: string): Promise<ProductUseCasesResponse> {
    const product = await this.productRepository.findByName(name)

    if (!product) {
      console.log('product n exixts')
      return left(new ResourceNotFoundError())
    }

    return right({ product })
  }
}