import { CategoryRepository } from "../../domain/application/repositories/category-repository";
import { Category } from "../../domain/enterprise/entities";

export class InMemoryCategoryRepository implements CategoryRepository {
    public categorys: Category[] = []

    async create(category: Category): Promise<void> {
        this.categorys.push(category)
    }

    async findById(id: string): Promise<Category | null> {
        const category =  this.categorys.find(category => category.id === id)

        if (!category) {
            return null
        }

        return category
    }

    async findByName(name: string): Promise<Category | null> {
        const nameCategory = this.categorys.find(category => category.name === name)
        if (!nameCategory) return null
        return nameCategory
    }

    async findMany(): Promise<Category[]> {
        return this.categorys
    }

    async update(categoryUpdate: Category): Promise<void> {
        const index = this.categorys.findIndex(category => category.id === categoryUpdate.id)
        
        if(index >= 0) {
            this.categorys[index] = categoryUpdate
        }
    }

    async delete(id: string): Promise<void> {
        this.categorys = this.categorys.filter(category => category.id !== id)
    }
}