/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "../../../lib/prisma";
import { OrderRepository } from "../../../domain/application/repositories/order-repository";
import { Order } from "../../../domain/enterprise/entities";
import { OrderData } from "../../../interfaces/IOrderList";

export class PrismaOrderRepository implements OrderRepository {
  async create({ customerId, totalPrice, itensOrder,address, payment, status,observation, methodDelivery }: Order): Promise<Order> {    
    const order =  await prisma.order.create({
      data: { 
        customerId,
        itensOrder,
        status,
        payment,
        address,
        observation,
        totalPrice,
        methodDelivery,
      }
    })

    return order
  }

  async findById(id: string): Promise<any | null> {
    const order = await prisma.order.findUnique({
      where: { id }, select: {
        customer: {
          select: {
            withdrawalName: true,
            email: true,
            name: true,
            phone: true,  
            id: true,
          }
        },
        itensOrder:true,
        address:true,
        id: true,
        methodDelivery: true,
        payment: true,
        observation: true,      
        status: true,
        totalPrice: true
      }
    })

    if(!order) return null

    return order
  }

  async findMany(): Promise<any[]> {
    const orders = await prisma.order.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            withdrawalName: true,  
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    

    return orders
  }

  async findManyData(date: string): Promise<OrderData[]> {
    const formattedDate = date.split('T')[0];
    try {
      const orders: OrderData[] = await prisma.$queryRaw`
      SELECT
        o.id as "orderId",
        o."customerId",
        o.status,
        o."methodDelivery",
        o."observation",
        o."payment",
        o."address",
        o."itensOrder",
        o."totalPrice",
        o."createdAt" as "orderCreatedAt",
        c.id as "customerId",
        c.name as "customerName",
        c.email as "customerEmail",
        c.phone as "customerPhone",
        c."withdrawalName"
      FROM "Order" o
      JOIN "Customer" c ON o."customerId" = c.id
      WHERE DATE(o."createdAt") = to_date(${formattedDate}, 'YYYY-MM-DD')
    `;
      
      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    }  
  }

  async findManyCustomer(customerId: string): Promise<any> {
    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            withdrawalName: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders
  }

  async update({ id, status }: Order): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    })
  }
}