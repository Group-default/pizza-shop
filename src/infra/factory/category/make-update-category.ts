import { PrismaCategoryRepository } from "../../repository/prisma/prisma-category";
import { UpdateCategory } from "../../../domain/application/use-cases/category/update-category";

export const makeUpdateCategory = () => {
  const prismaCategoryRepository = new PrismaCategoryRepository()
  const updateCategory = new UpdateCategory(prismaCategoryRepository)

  return updateCategory
}