import { Product } from "../../enterprise/entities";
import { IProductList } from "../../../interfaces/IProduct-list";


export interface ProductRepository {
    create: (product: Product) => Promise<void>
    findById: (id: string) => Promise<Product | null>
    findByName: (name: string) => Promise<Product | null>
    findMany: () => Promise<IProductList[]>
    update: (product: Product) => Promise<void>
    delete: (id: string) => Promise<void> 
}
