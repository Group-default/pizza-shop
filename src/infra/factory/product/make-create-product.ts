import { PrismaProductRepository } from "../../repository/prisma/prisma-product";
import { Createproduct } from "../../../domain/application/use-cases/product/create-product";
import { PrismaCategoryRepository } from "../../repository/prisma/prisma-category";

export const makeCreateProduct = () => {
  const prismaProductRepository = new PrismaProductRepository()
  const prismaCategoryRepository = new PrismaCategoryRepository
  const createProduct = new Createproduct(prismaProductRepository, prismaCategoryRepository)

  return createProduct
}