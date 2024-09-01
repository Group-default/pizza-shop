import { InMemoryOrderRepository, InMemoryCustomerRepository, InMemoryProductRepository } from '../../../../tests/in-memory'
import { makeCustomer, makeOrder } from '../../../../tests/factory'
import { CreateOrder } from './create-order'
import { CustomerAlreadyExistsError } from '../../../../core/errors/customer-alreaty-exists'
import { CreatedOrderError } from '../../../../core/errors/created-order-error'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryProductRepository: InMemoryProductRepository
let sut: CreateOrder

describe('CreateOrderUseCase', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new CreateOrder(
      inMemoryOrderRepository,
      inMemoryCustomerRepository,
      inMemoryProductRepository,
    )
  })
  
  it('should be able to create a order', async () => {
    const customer = makeCustomer()
    const orderFake = makeOrder()

    await inMemoryCustomerRepository.create(customer)

    const resultOrder = await sut.execute({
      customerId: customer.Id,
      payment: orderFake.payment,
      totalPrice: orderFake.totalPrice,
      status: orderFake.status,
      itensOrder: orderFake.itensOrder,
    })

    if(resultOrder.isRight()){
      expect(resultOrder.isRight()).toBeTruthy()
      expect(inMemoryOrderRepository.order.length).toBe(1)
    }
  }) 

  it('should not be able to create in order with is customer that does not exists', async () => {
    const customer = makeCustomer()
    const orderFake = makeOrder()

    await inMemoryCustomerRepository.create(customer)

    const resultOrder = await sut.execute({
      customerId: 'idFake',
      payment: orderFake.payment,
      totalPrice: orderFake.totalPrice,
      status: orderFake.status,
      itensOrder: orderFake.itensOrder,
    })

    expect(resultOrder.isLeft()).toBeTruthy()
    expect(resultOrder.value).toBeInstanceOf(CustomerAlreadyExistsError)
  })

  it('Should not be able to create in order with totalPrice wrong', async () => {
    const customer = makeCustomer()
    const orderFake = makeOrder()

    await inMemoryCustomerRepository.create(customer)

    const resultOrder = await sut.execute({
      customerId: customer.Id,
      payment: '50.00',
      totalPrice: orderFake.totalPrice,
      status: orderFake.status,
      itensOrder: orderFake.itensOrder,
    })

    expect(resultOrder.isLeft()).toBeTruthy()
    expect(resultOrder.value).toBeInstanceOf(CreatedOrderError)
  })
})

