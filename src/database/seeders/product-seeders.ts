import { prisma } from '../../lib/prisma'

export const productSeeders = async () => {

    const categoryPizzas = await prisma.category.findFirst({
        where: { name: 'pizza' }
    })

    const categoryBebidas = await prisma.category.findFirst({
        where: { name: 'drink' }
    })
    
    await prisma.product.createMany({
        data: [
            {
              name: 'Calabresa',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: '../../../uploads/12b87242-b7cb-439a-873a-7248f963bc73.jpeg',
              price: '49.99',
              type: 'TRADITIONAL',
            },
            {
              name: 'Portuguesa',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: '../../../uploads/12b87242-b7cb-439a-873a-7248f963bc73.jpeg',
              price: '49.99',
              type: 'TRADITIONAL',
            },
            {
              name: 'Penosa',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: '../../../uploads/12b87242-b7cb-439a-873a-7248f963bc73.jpeg',
              price: '59.99',
              type: 'SPECIAL',
            },
            {
              name: '5 queijos',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: '../../../uploads/12b87242-b7cb-439a-873a-7248f963bc73.jpeg',
              price: '59.99',
              type: 'SPECIAL',
            },
            {
              name: 'Coca-cola 2l',
              categoryId: categoryBebidas!.id,
              description: 'Bebida gelada',
              imageUrl: '../../../uploads/12b87242-b7cb-439a-873a-7248f963bc73.jpeg',
              price: '10.00',
            },
            {
              name: 'Guaraná 200ml',
              categoryId: categoryBebidas!.id,
              description: 'Bebida gelada',
              imageUrl: '',
              price: '6.00',
            },
          ]
      })

}