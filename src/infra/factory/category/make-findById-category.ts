import { PrismaCategoryRepository } from "../../repository/prisma/prisma-category";
import { FindByIdCategory } from "../../../domain/application/use-cases/category/findById-category";

export const makeFindByIdCategory = () => {
  const prismaCategoryRepository = new PrismaCategoryRepository()
  const findByIdCategory = new FindByIdCategory(prismaCategoryRepository)

  return findByIdCategory
}