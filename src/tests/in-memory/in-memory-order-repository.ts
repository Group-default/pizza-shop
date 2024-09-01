import { OrderRepository } from '../../domain/application/repositories/order-repository'
import { Order } from '../../domain/enterprise/entities/order'
import { IOrderList } from '../../interfaces/IOrderList'

export class InMemoryOrderRepository implements OrderRepository{
  public order:Order[] = []

  async create(order: Order): Promise<void> {
    this.order.push(order)
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.order.find(order => order.id === id )
    
    if (!order) {
      return null
    }

    return order
  }

  async findMany(): Promise<any[]> {
    return this.order  
  }

  async findManyCustomer(customerId: string): Promise<any[]> {
    return this.order
  }

  async update(orderUpdate: Order): Promise<void> {
    const index = this.order.findIndex(order => order.id === orderUpdate.id)
    if (index >= 0) {
      this.order[index] = orderUpdate
    }
  }
}