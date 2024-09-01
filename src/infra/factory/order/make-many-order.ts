import { FindManyOrder } from "../../../domain/application/use-cases/order/findMany-order";
import { PrismaOrderRepository } from "../../repository/prisma/prisma-order";

export const makeFindManyOrder = () => {
  const prismaOrderRepository = new PrismaOrderRepository()
  const findManyOrder = new FindManyOrder(prismaOrderRepository)
  return findManyOrder
}