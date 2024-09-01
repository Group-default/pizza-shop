import { prisma } from '../../lib/prisma'

export const addressSeeders = async () => {
    const customer = await prisma.customer.findUnique({
      where: { email: 'jonhdoe@gmail.com' }
    })

    const neighborhoodImarui = await prisma.neighborhood.findFirst({
      where: { name: 'Imarui' },
    })

    const neighborhoodCordeiros = await prisma.neighborhood.findFirst({
      where: { name: 'Cordeiros' },
    })

    await prisma.address.createMany({
        data: [
            {
              customerId: customer!.id,
              neighborhoodId: neighborhoodImarui!.id,
              number: '485',
              street: 'Felipe Alencastro',
              phone: '47991120973',
              zipCode: '69063430',
              type: 'HOME',
            },
            {
              customerId: customer!.id,
              neighborhoodId: neighborhoodCordeiros!.id,
              number: '415',
              street: 'rua do Trabalho',
              phone: '47991120973',
              zipCode: '69063420',
              type: 'WORK',
            },
        ]
    })
}