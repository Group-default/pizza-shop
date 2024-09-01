import { PrismaProductRepository } from "../../repository/prisma/prisma-product";
import { UpdateProduct } from "../../../domain/application/use-cases/product/update-product";
import { PrismaCategoryRepository } from "../../repository/prisma/prisma-category";

export const makeUpdateProduct = () => {
  const prismaProductRepository = new PrismaProductRepository()
  const prismaCategoryRepository = new PrismaCategoryRepository()
  const updateProduct = new UpdateProduct(prismaProductRepository, prismaCategoryRepository)
  
  return updateProduct
}