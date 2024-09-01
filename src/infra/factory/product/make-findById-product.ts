import { PrismaProductRepository } from "../../repository/prisma/prisma-product";
import { FindByIdProduct } from "../../../domain/application/use-cases/product/findById-product";

export const makeFindByIdProduct = () => {
  const prismaProductRepository = new PrismaProductRepository()
  const findByIdProduct = new FindByIdProduct(prismaProductRepository)
  
  return findByIdProduct
}