import { UpdateOrder } from "../../../domain/application/use-cases/order/update-order";
import { PrismaOrderRepository } from "../../repository/prisma/prisma-order";

export const makeUpdateOrder = () => {
  const prismaOrderRepository = new PrismaOrderRepository()
  const updateOrder = new UpdateOrder(prismaOrderRepository)

  return updateOrder
}