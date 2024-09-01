import { Order } from '../../enterprise/entities/order'
import { IOrderList, IOrderUpdate, OrderData } from '../../../interfaces/IOrderList'
export interface OrderRepository {
  create(order: Order): Promise<Order>
  findById(id: string): Promise<Order | null>
  findManyCustomer(customerId: string): Promise<IOrderList[]>
  findMany(): Promise<IOrderList[]>
  findManyData: (data: string) => Promise<OrderData[]>  
  update({id, status }: IOrderUpdate): Promise<void>
}