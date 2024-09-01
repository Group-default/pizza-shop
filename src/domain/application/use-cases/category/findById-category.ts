import { Either, left, right } from "../../../../core/either";
import { CategoryRepository } from "../../repositories/category-repository";
import { Category } from "../../../enterprise/entities/category";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type categoryUseCasesResponse = Either<ResourceNotFoundError, { category: Category }>

export class FindByIdCategory {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async execute(id: string): Promise<categoryUseCasesResponse> {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    return right({ category })
  }
}