import { FindByIdOrder } from "../../../domain/application/use-cases/order/findById-order";
import { PrismaOrderRepository } from "../../repository/prisma/prisma-order";

export const makeFindByIdOrder = () => {
  const prismaOrderRepository = new PrismaOrderRepository()
  const findByIdOrder = new FindByIdOrder(prismaOrderRepository)

  return findByIdOrder
}