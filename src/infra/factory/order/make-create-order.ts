import { CreateOrder } from "../../../domain/application/use-cases/order/create-order";
import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer";
import { PrismaOrderRepository } from "../../repository/prisma/prisma-order";
import { PrismaProductRepository } from "../../repository/prisma/prisma-product";
import { PrismaAddressRepository } from "../../repository/prisma/prisma-address";
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood";

export const makeCreateOrder = () => {
  const prismaOrderRepository = new PrismaOrderRepository()
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const prismaProductRepository = new PrismaProductRepository()
  const prismaAddressRepository = new PrismaAddressRepository()
  const prismaNeighborhoodRepository = new PrismaNeighborhoodRepository()
  const createOrder = new CreateOrder(
    prismaOrderRepository,
    prismaCustomerRepository,
    prismaProductRepository,
    prismaAddressRepository,
    prismaNeighborhoodRepository
    )

  return createOrder
}