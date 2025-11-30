import { prisma } from '@/prisma/client'

export const getUserEducations = async (userId: string) => {
  return prisma.education.findMany({ where: { userId } })
}
