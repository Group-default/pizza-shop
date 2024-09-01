import { Either, left, right } from "../../../../core/either";
import { CategoryRepository } from "../../repositories/category-repository";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type categoryUseCasesResponse = Either<ResourceNotFoundError, {}>

export class DeleteCategory {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async execute(id: string): Promise<categoryUseCasesResponse> {
    const category = await this.categoryRepository.findById(id)

    console.log(category)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    await this.categoryRepository.delete(id)
    return right({})
  }
}