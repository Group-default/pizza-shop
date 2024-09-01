import { prisma } from '../../lib/prisma'

export const neighborhoodSeeders = async () => {
    await prisma.neighborhood.createMany({
        data: [
            { name: 'Cordeiros', tax: '7.00' },
            { name: 'Cidade Nova', tax: '5.00' },
            { name: 'Imarui', tax: '9.00' },
            { name: 'Fazenda', tax: '10.00' },
            { name: 'São vicente', tax: '5.00' },
        ]
        
    })
}