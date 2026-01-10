import { cacheTag } from 'next/cache'
import { cookies } from 'next/headers'
import { CACHE_KEY } from '@/data/cache'
import { prisma } from '@/prisma/client'
import { getUserSessionById } from '@/redis/actions'
import { getSessionCookie } from '../core/session'

const _getCurrentUser = async (sessionId: string) => {
  'use cache'
  cacheTag(CACHE_KEY.CURRENT_USER())

  const session = await getUserSessionById(sessionId)
  if (!session) return null

  return await prisma.user.findUnique({
    where: { id: session.id },
    omit: { password: true, salt: true },
  })
}

export const getCurrentUser = async () => {
  const sessionCookie = getSessionCookie(await cookies())
  if (!sessionCookie) return null

  return await _getCurrentUser(sessionCookie.value)
}
