import { prisma } from "../../lib/prisma";
import { BcryptServiceImpl } from "../../infra/service/bcrypt";

const bcript = new BcryptServiceImpl()

export const customerSeeders = async () => {
  const passwordHash = await bcript.hashPassword('password123', 6)

  await prisma.customer.create({
    data: {
      name: 'John Doe',
      password: passwordHash,
      email: 'jonhdoe@gmail.com',
      phone: '47991120973',
    }
  })
}