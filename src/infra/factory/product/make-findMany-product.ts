import { PrismaProductRepository } from "../../repository/prisma/prisma-product";
import { FindManyProduct } from "../../../domain/application/use-cases/product/findMany-product";

export const MakeFindManyProduct = () => {
  const prismaRepository = new PrismaProductRepository()
  const findManyProduct = new FindManyProduct(prismaRepository)
  
  return findManyProduct
}