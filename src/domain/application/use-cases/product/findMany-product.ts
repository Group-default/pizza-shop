import { ProductRepository } from "../../repositories/product-repository";
import { IProductList } from "../../../../interfaces/IProduct-list";
import { Either, right } from "../../../../core/either";

type ProductResponse = Either<null, { products: IProductList[] }>

export class FindManyProduct {
  constructor(
    private productRepository: ProductRepository
  ){}

  async execute(): Promise<ProductResponse> {
    const products = await this.productRepository.findMany()
    return right({ products })
  }
}