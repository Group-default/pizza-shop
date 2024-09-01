import { FastifyReply, FastifyRequest } from "fastify";
import { MakeFindManyProduct } from "../../../factory/product/make-findMany-product";

export const FindManyProductController = async (_request: FastifyRequest, reply: FastifyReply) => {  
  const products = MakeFindManyProduct()

  const result = await products.execute()

  const arrayProducts = result.value?.products.map((product) => {
    return {
      id: product.id,
      product:[{name: product.name}],
      price: product.price,
      description: product.description,
      category: {
        id: product.category.id,
        name: product.category.name
      },
      size: product.size,
      type: product.type,
      status: product.status,
      image_url: product.imageUrl
    }


  })  

  return reply.code(200).send(arrayProducts)
}