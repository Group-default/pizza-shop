import { PrismaProductRepository } from "../../repository/prisma/prisma-product";
import { DeleteProduct } from "../../../domain/application/use-cases/product/delete-product";

export const makeDeleteProduct = () => {
  const prismaProductRepository = new PrismaProductRepository()
  const deleteProduct = new DeleteProduct(prismaProductRepository)
  
  return deleteProduct
}