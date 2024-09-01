import { CreateAddress } from "../../../domain/application/use-cases/address/create-address"
import {PrismaAddressRepository} from "../../repository/prisma/prisma-address"
import { PrismaCustomerRepository } from "../../repository/prisma/prisma-customer"
import { PrismaNeighborhoodRepository } from "../../repository/prisma/prisma-neighborhood"


export const MakeCreateAddress = () => {
  const addressRepository = new PrismaAddressRepository()
  const customerRepository = new PrismaCustomerRepository()
  const neighborhoodRepository = new PrismaNeighborhoodRepository()
  const createAddress = new CreateAddress(addressRepository, customerRepository, neighborhoodRepository)
  return createAddress
}