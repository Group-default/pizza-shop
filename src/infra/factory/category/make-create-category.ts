import { PrismaCategoryRepository } from "../../repository/prisma/prisma-category";
import { CreateCategory } from "../../../domain/application/use-cases/category/create-category";

export const makeCreateCategory = () => {
  const prismaCategoryRepository = new PrismaCategoryRepository()
  const createCategory = new CreateCategory(prismaCategoryRepository)

  return createCategory
}