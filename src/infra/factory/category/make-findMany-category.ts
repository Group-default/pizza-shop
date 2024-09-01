import { PrismaCategoryRepository } from "../../repository/prisma/prisma-category";
import { FindManyCategory } from "../../../domain/application/use-cases/category/findMany-category";

export const makeFindManyCategory = () => {
  const prismaCategoryRepository = new PrismaCategoryRepository()
  const findManyCategory = new FindManyCategory(prismaCategoryRepository)

  return findManyCategory
}