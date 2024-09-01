import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient()

async function seed () {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const  category = await prisma.category.create({
    data: {
      name: 'drink'
    }
  })
  await prisma.product.createMany({
    data: [
      {
        name: 'Calabresa',
        categoryId: category.id,
        price: '49.00',
        size: 'ENTIRE',
        type: 'PIZZA',
        imageUrl:'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Molho, Mussarela, Calabresa,Cebola, Oregáno',
      },
      {
        name: 'Portuguesa',
        categoryId: category.id,
        price: '49.00',
        size: 'ENTIRE',
        type: 'PIZZA',
        imageUrl:'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Molho, Mussarela, Calabresa,Tomate, Cebola, Ovo, Oregáno',
      },
      {
        name: 'Calabresa',
        categoryId: category.id,
        price: '49.00',
        size: 'ENTIRE',
        type: 'PIZZA',
        imageUrl:'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Molho, Mussarela, Calabresa,Cebola, Oregáno',
      },
      {
        name: 'Portuguesa',
        categoryId: category.id,
        price: '49.00',
        size: 'ENTIRE',
        type: 'PIZZA',
        imageUrl:'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Molho, Mussarela, Calabresa,Tomate, Cebola, Ovo, Oregáno',
      }
      ]

  })
}

seed().then(() => {
  console.log('Database seeded!')
})