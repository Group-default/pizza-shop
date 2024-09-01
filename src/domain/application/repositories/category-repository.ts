import { Category } from "../../enterprise/entities/category";

export interface CategoryRepository {
  create(category: Category): Promise<void>
  findById(id: string): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
  findMany(): Promise<Category[]>
  update(category: Category): Promise<void>
  delete(id: string): Promise<void>
}