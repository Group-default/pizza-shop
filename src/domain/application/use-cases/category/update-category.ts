import { Either, left, right } from "../../../../core/either";
import { CategoryRepository } from "../../repositories/category-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Category } from "../../../enterprise/entities/category";

interface CategoryUseCasesRequest {
  id: string
  name: string
}

type CategoryUseCasesResponse = Either<ResourceNotFoundError, {}>

export class UpdateCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ id, name }: CategoryUseCasesRequest): Promise<CategoryUseCasesResponse> {
    const category = await this.categoryRepository.findById(id)
    
    if(!category) {
      return left(new ResourceNotFoundError())
    }

    const updateCategory = Category.create({ id, name })

    await this.categoryRepository.update(updateCategory)

    return right({})
  }
}