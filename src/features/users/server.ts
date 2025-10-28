import { prisma } from '@/prisma/client'

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    omit: { password: true, salt: true, email: true },
  })
  return user
}
