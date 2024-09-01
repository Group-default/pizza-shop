/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Either, left, right } from "../../../../core/either";
import { CustomerRepository } from "../../repositories/customer-repository";
import { OrderRepository } from "../../repositories/order-repository";
import { Order } from "../../../enterprise/entities/order"
import { CustomerAlreadyExistsError } from "../../../../core/errors/customer-alreaty-exists";
import { ProductRepository } from "../../repositories/product-repository";
import { CreatedOrderError } from "../../../../core/errors/created-order-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { AddressRepository } from "../../repositories/address-repository";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";


interface dataProduct {
  mode: "MIXED" | "SIMPLE"
  image_url: string
  product: string[]
  price: string
  size?: string
  quantity: number
}

interface AddressProps {
  phone?: string
  cep?: string
  street?: string
  number?: string
  tax?: string
  neighborhood?: string
}

interface CreateOrderUseCaseRequest {
  customerId: string
  payment: {
    methodPayment: string
    flag?: string
    typeCard?: string
  }
  address?: AddressProps
  observation?: string
  totalPrice: string
  methodDelivery: "DELIVERY" | "PICKUP" // 'delivery' | 'pickup'
  status: string
  itensOrder: dataProduct[]
}

type CreateOrderUseCaseResponse = Either<
  CustomerAlreadyExistsError | CreatedOrderError | ResourceNotFoundError, { order: Order }>

export class CreateOrder {
  private acumulador: number

  constructor(
    private orderRepository: OrderRepository,
    private customeRepository: CustomerRepository,
    private productRepository: ProductRepository,
    private addressRepository: AddressRepository,
    private neighborhoodRepository: NeighborhoodRepository,
  ) {
    this.acumulador = 0
  }

  async execute({ customerId, itensOrder,address, observation, payment, status, totalPrice, methodDelivery }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const customer = await this.customeRepository.findById(customerId)

    if (!customer) {
      return left(new CustomerAlreadyExistsError())
    }

    if (methodDelivery === 'DELIVERY') {
      
      this.acumulador += Number(address?.tax)
    }

    // array com os produtos
    await Promise.all(itensOrder.map(async (product) => {
      // se a pizza obtiver mais sabores
      if (product.mode === 'MIXED') {
        const prices = await Promise.all(product.product.map(async (productName) => {
          const product = await this.productRepository.findByName(productName)
          return Number(product?.price)
        }))

        const maxValue = Math.max(...prices)

        this.acumulador += ((product.size === 'HALF' ? (maxValue / 2) : maxValue) * Number(product.quantity));
        return
      }

      const response = await this.productRepository.findByName(product.product[0])
      const priceProduct = Number(response?.price)
      this.acumulador += ((product.size === 'HALF' ? (priceProduct / 2) : priceProduct) * Number(product.quantity));
    }));

    const value = Number(this.acumulador.toFixed(2))
    const valueMin = Number(totalPrice) - 0.5
    const valueMax = Number(totalPrice) + 0.5

    // min <= totalPrice < max
    if (value >= valueMin && value < valueMax) {
      const newOrder = Order.create({
        customerId,
        itensOrder,
        payment,
        address,
        observation,
        status,
        totalPrice: value.toString(),
        methodDelivery,
      })

      const order = await this.orderRepository.create(newOrder)
      return right({ order })
    }

    return left(new CreatedOrderError())
  }
}

