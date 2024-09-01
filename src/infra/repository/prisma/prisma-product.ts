import { prisma } from "../../../lib/prisma";
import { ProductRepository } from "../../../domain/application/repositories/product-repository";
import { Product } from "../../../domain/enterprise/entities";
import { IProductList } from "../../../interfaces/IProduct-list";

export class PrismaProductRepository implements ProductRepository {
  async create({ name, categoryId, price, size,imageUrl, type, description, status }: Product): Promise<void> {    
   
    await prisma.product.create({
      data: { 
        name,
        categoryId,
        imageUrl,
        description,
        price,
        size,
        type,
        status,
      }
    })
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if(!product) return null

    return new Product(product)
  }

  async findByName(name: string): Promise<Product | null> {
    const productExist = await prisma.product.findFirst({
      where: { name }
    })

    if(!productExist) return null

    return new Product(productExist)
  }

  async findMany(): Promise<IProductList[]> {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        categoryId: false,
        description: true,
        price: true,
        imageUrl: true,
        size: true,
        type: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    return products
  }

  async update({ id, categoryId, name, price, type,imageUrl, size, description, status }: Product): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        categoryId,
        price,
        imageUrl,
        type,
        size,
        description,
        updatedAt: new Date(),
        status,
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } })
  }
}