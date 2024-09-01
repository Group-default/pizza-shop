import { Either, left, right } from "../../../../core/either";
import { ProductRepository } from "../../repositories/product-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Product } from "../../../enterprise/entities/product";
import { CategoryRepository } from "../../repositories/category-repository";

interface productUseCaseRequest {
  id: string,
  name: string
  category: string
  type?: string
  imageUrl: string
  size?: string
  description: string
  price: string
  status: "ACTIVE" | "DISABLE"
}

type ProductUseCasesResponse = Either<ResourceNotFoundError, {}>

export class UpdateProduct {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({ id, category, name, description, price, size, imageUrl, type, status }: productUseCaseRequest): Promise<ProductUseCasesResponse> {
    const idProduct = await this.productRepository.findById(id)
    const categoryProduct = await this.categoryRepository.findByName(category)

    if (idProduct && categoryProduct) {
      const updateProduct = Product.create({
        id,
        categoryId: categoryProduct.id,
        name,
        description,
        price,
        size, 
        imageUrl,
        type,
        status,
      })
  
      await this.productRepository.update(updateProduct)
  
      return right({})
    }
    
    return left(new ResourceNotFoundError())
  }
}