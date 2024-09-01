import { AddressRepository } from "../../domain/application/repositories/address-repository";
import { Address } from "../../domain/enterprise/entities/address";
import { IAddressList } from "../../interfaces/IAddressList";


export class InMemoryAddressRepository implements AddressRepository {
  public address: Address[] = []

  async create(address: Address): Promise<Address> {
    this.address.push(address)
    return address
  }

  async findById(id: string): Promise<Address | null> {
    const address = this.address.find(add => add.id === id)

    if (!address) {
      return null
    }

    return address
  }

  async findMany(): Promise<IAddressList[]> {
    return this.address
  }

  async find(customerId: string): Promise<Address[]> {
    return this.address.filter(add => add.customerId === customerId)
  }

  async update(address: Address): Promise<void> {
    const index = this.address.findIndex(add => add.id === address.id)
    if (index >= 0) {
      this.address[index] = address
    }
  }
  
  async delete(id: string): Promise<void> {
    this.address = this.address.filter(add => add.id !== id)
  }
}