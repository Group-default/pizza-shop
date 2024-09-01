import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IOrderProps {
  id: string
  customerId: string
  itensOrder: any
  payment: {
    methodPayment: string
    flag?: string
    typeCard?: string  
  },
  address?:{
    phone?: string
    cep?: string
    street?: string
    number?: string
    tax?: string
    neighborhood?: string
  },  
  observation?: string | null
  methodDelivery: string
  totalPrice: string
  status: any
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends Entity<IOrderProps> {
  get id() {
    return this.props.id
  }

  get customerId() {
    return this.props.customerId
  }
  
  get status() {
    return this.props.status
  }
  
  get totalPrice() {
    return this.props.totalPrice
  }

  get payment() {
    return this.props.payment
  }

  get address() {
    return this.props.address
  }

  get observation() {
    return this.props.observation
  }

  get methodDelivery() {
    return this.props.methodDelivery
  }

  get itensOrder() {
    return this.props.itensOrder
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  changeStatus(status: string) {
    this.props.status = status
    this.touch()
  }

  static create(props: Optional<IOrderProps, "createdAt" | "id">) {
    const order = new Order({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return order
  } 
}