import { Product, IProductProps  } from "../../domain/enterprise/entities";


export const makeProduct = (override: Partial<IProductProps> = {}): Product => {
    const product =  Product.create({
        name: "Pizza",
        categoryId: '1',
        price: "23,00",
        size: "Grande",
        type: 'TRADITIONAL',
        image: "imageUrl",
        description: "Any description",
        status: "ACTIVE",
        ...override
    })

    return product
}