import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { getUserSession } from '../core/session'

const _getCurrentUser = async () => {
  const session = await getUserSession(await cookies())
  if (!session) return null

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    omit: { password: true, salt: true },
  })

  return user
}

export const getCurrentUser = cache(async () => {
  const user = await _getCurrentUser()
  if (!user) {
    return null
  }
  return user
})
