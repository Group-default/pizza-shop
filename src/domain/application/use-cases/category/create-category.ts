import { Either, right } from "../../../../core/either"
import { Category } from "../../../enterprise/entities/category"
import { CategoryRepository } from "../../repositories/category-repository"

export interface CategoryUseCasesRequest {
  name: string
}

type CategoryUseCasesResponse = Either<null, {}>

export class CreateCategory{
  constructor(
    private categoryRepository: CategoryRepository,
    ) {}

  async execute({ name }: CategoryUseCasesRequest): Promise<CategoryUseCasesResponse> {
    const NewCategory = Category.create({ name })
    await this.categoryRepository.create(NewCategory)

    return right({})
  }
}