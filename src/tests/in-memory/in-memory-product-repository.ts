import { ProductRepository } from "../../domain/application/repositories/product-repository";
import { Product } from "../../domain/enterprise/entities";

export class InMemoryProductRepository implements ProductRepository {
    public products: Product[] = []

    async create(product: Product): Promise<void> {
        this.products.push(product)
    }

    async findById(id: string): Promise<Product | null> {
        const product =  this.products.find(product => product.id === id)

        if (!product) {
            return null
        }

        return product
    }

    async findByName(name: string): Promise<Product | null> {
        const nameProduct = this.products.find(product => product.name === name)
        if (!nameProduct) return null
        return nameProduct
    }

    async findMany(): Promise<any[]> {
        return this.products
    }

    async update(productUpdate: Product): Promise<void> {
        const index = this.products.findIndex(product => product.id === productUpdate.id)
        
        if(index >= 0) {
            this.products[index] = productUpdate
        }
    }

    async delete(id: string): Promise<void> {
        this.products = this.products.filter(product => product.id !== id)
    }
}