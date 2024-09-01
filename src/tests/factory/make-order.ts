import { IOrderProps, Order } from '../../domain/enterprise/entities/order'


const dataProduct = [
  {
    "mode": "SIMPLE",
    "product": ["Calabresa"],
    "size": "inteira",
    "quantity": "1"
  },
  {
    "mode": "MIXED",
    "product": ["Penosa", "5 queijos"],
    "size": "inteira",
    "quantity": "1"
  }							
]

export const makeOrder = (override: Partial<IOrderProps> = {}) => {
  const order = Order.create({
    customerId: 'id-customer',
    payment: "PIX",
    totalPrice: "109.98",
    status: "WAITING",
    itensOrder: dataProduct,
    ...override,
  })

  return order
}