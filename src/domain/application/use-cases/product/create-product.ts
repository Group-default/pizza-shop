import { Either, left, right } from "../../../../core/either";
import { ProductRepository } from "../../repositories/product-repository";
import { Product } from "../../../enterprise/entities/product";
import { CategoryRepository } from "../../repositories/category-repository";
import { CategoryNotFoundError } from "../../../../core/errors/category-not-found-error";

export interface ProductUseCaseRequest {
  name: string
  category: string
  type?: string
  size?: string
  imageUrl: string
  description: string
  price: string
  status?: "ACTIVE" | "DISABLE"
}

type ProductUseCasesResponse = Either<CategoryNotFoundError, {}>

export class Createproduct {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) { }

  async execute({ name, description, category, imageUrl, price, size, type, status }: ProductUseCaseRequest): Promise<ProductUseCasesResponse> {
    const categoryProduct = await this.categoryRepository.findByName(category)

    if (!categoryProduct) {
      return left(new CategoryNotFoundError())
    }

    const newProduct = Product.create({
      name,
      description,
      categoryId: categoryProduct.id,
      price,
      imageUrl,
      size,
      type,
      status,
    })


    await this.productRepository.create(newProduct)

    return right({})
  }
}