import { Either, left, right } from "../../../../core/either";
import { CategoryRepository } from "../../repositories/category-repository";
import { Category } from "../../../enterprise/entities/category";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";

type categoryUseCasesResponse = Either<ResourceNotFoundError, { category: Category }>

export class FindNameCategory {
  constructor(
    private categoryRepository: CategoryRepository
  ) {}

  async execute(name: string): Promise<categoryUseCasesResponse> {
    const nameLower = name.toLocaleLowerCase() 
    const category = await this.categoryRepository.findByName(nameLower)
    
    if (!category) {
      return left(new ResourceNotFoundError())
    }

    return right({ category })
  }
}