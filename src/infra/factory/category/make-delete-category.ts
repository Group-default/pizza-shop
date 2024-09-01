import { PrismaCategoryRepository } from "../../repository/prisma/prisma-category";
import { DeleteCategory } from "../../../domain/application/use-cases/category/delete-category";

export const makeDeleteCategory = () => {
  const prismaCategoryRepository = new PrismaCategoryRepository()
  const deleteCategory = new DeleteCategory(prismaCategoryRepository)

  return deleteCategory
}