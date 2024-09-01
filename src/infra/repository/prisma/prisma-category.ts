import { prisma } from "../../../lib/prisma";
import { CategoryRepository } from "../../../domain/application/repositories/category-repository";
import { Category } from "../../../domain/enterprise/entities";

export class PrismaCategoryRepository implements CategoryRepository {
  async create({ name }: Category): Promise<void> {
    await prisma.category.create({ data: { name } })
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { id }
    })

    if(!category) return null

    return new Category(category)
  }

  async findByName(name: string): Promise<Category | null> {
    const categoryLower = name.toLocaleLowerCase()
    const category = await prisma.category.findFirst({
      where: { name: categoryLower }
    })

    if(!category) return null
    return new Category(category)
  }

  async findMany(): Promise<Category[]> {
    const category = await prisma.category.findMany()
    const arrCategory = category.map(category => new Category(category))
    return arrCategory
  }

  async update({ id, name }: Category): Promise<void> {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        updatedAt: new Date()
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } })
  }
}