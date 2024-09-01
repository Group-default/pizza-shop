import { Either, left, right } from "../../../../core/either";
import { ProductRepository } from "../../repositories/product-repository";
import { Product } from "../../../enterprise/entities/product";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type ProductUseCasesResponse = Either<ResourceNotFoundError, { product: Product }>

export class FindByIdProduct {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<ProductUseCasesResponse> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({ product })
  }
}