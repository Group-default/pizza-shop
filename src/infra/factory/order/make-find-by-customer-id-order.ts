import { FindManyCustomerIdOrder } from "../../../domain/application/use-cases/order/findManyCustomerId-order";
import { PrismaOrderRepository } from "../../repository/prisma/prisma-order";

export const makeFindManyCustomerIdOrder = () => {
  const prismaOrderRepository = new PrismaOrderRepository()
  const findManyCustomerIdOrder = new FindManyCustomerIdOrder(prismaOrderRepository)

  return findManyCustomerIdOrder
}