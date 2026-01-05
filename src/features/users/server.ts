import { cacheTag } from 'next/cache'
import { CACHE_KEY } from '@/data/cache'
import { prisma } from '@/prisma/client'
import type { UserProfileSection } from './data'

export const getUserByUsername = async (username: string) => {
  'use cache'
  cacheTag(CACHE_KEY.GET_USER_BY_USERNAME(username))
  const user = await prisma.user.findUnique({
    where: { username },
    include: { location: true },
    omit: { password: true, salt: true, email: true },
  })
  return user
}

export const getUserProfileSection = async (
  userId: string,
  section: UserProfileSection,
  itemId: string,
) => {
  switch (section) {
    case 'experience':
      return prisma.experience.findFirst({ where: { userId, id: itemId } })
    case 'education':
      return prisma.education.findFirst({ where: { userId, id: itemId } })
    default:
      return null
  }
}
