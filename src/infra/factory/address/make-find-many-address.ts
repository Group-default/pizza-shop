import { FindManyAddress } from "../../../domain/application/use-cases/address/findMany-address"
import { PrismaAddressRepository } from "../../repository/prisma/prisma-address"
import { PrismaCustomerRepository } from '../../repository/prisma/prisma-customer';


export const MakeFindManyAddress = () => {
    const addressRepository = new PrismaAddressRepository()
    const customerRepository = new PrismaCustomerRepository()    
    const findManyAddress = new FindManyAddress(addressRepository, customerRepository)
    return findManyAddress
}

