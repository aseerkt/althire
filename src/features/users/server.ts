import { cacheTag } from 'next/cache'
import { CACHE_KEY } from '@/data/cache'
import { prisma } from '@/prisma/client'

export const getUserByUsername = async (username: string) => {
  'use cache'
  cacheTag(CACHE_KEY.GET_USER_BY_USERNAME(username))
  const user = await prisma.user.findUnique({
    where: { username },
    omit: { password: true, salt: true, email: true },
  })
  return user
}
