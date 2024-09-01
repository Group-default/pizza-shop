import { ProductOrder } from "../../enterprise/entities";

export interface ProductOrderRepository {
  create: (productOrder: ProductOrder) => Promise<void>
  findProduct: (order: string) => Promise<ProductOrder[] | null>
  findMany: () => Promise<ProductOrder[]>
}