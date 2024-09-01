import { FindManyDataOrders } from "../../../domain/application/use-cases/order/find-many-data-orders";
import { PrismaOrderRepository } from "../../repository/prisma/prisma-order";

export const makeFindManyDateOrders = () => {
    const prismaOrderRepository = new PrismaOrderRepository()
    const findManyDateOrder = new FindManyDataOrders(prismaOrderRepository)

    return findManyDateOrder
}