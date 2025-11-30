import { prisma } from '@/prisma/client'

export const getUserExperiences = async (userId: string) => {
  return prisma.experience.findMany({ where: { userId } })
}
