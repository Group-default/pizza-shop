import { Either, right } from "../../../../core/either";
import { CategoryRepository } from "../../repositories/category-repository";
import { Category } from "../../../enterprise/entities/category";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type categoryUseCasesResponse = Either<ResourceNotFoundError, { category: Category[] }>

export class FindManyCategory {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async execute(): Promise<categoryUseCasesResponse> {
    const category = await this.categoryRepository.findMany()

    return right({ category })
  }
}