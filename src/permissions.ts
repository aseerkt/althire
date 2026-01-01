import { forbidden, redirect } from 'next/navigation'
import { getCurrentUser } from './auth/nextjs/server'
import { MemberRole } from './generated/prisma/client'
import { prisma } from './prisma/client'

export async function requireAuth() {
  const currentUser = await getCurrentUser()

  if (currentUser === null) {
    redirect('/sign-in')
  }

  return currentUser
}

export async function isCurrentUser(userId: string) {
  const currentUser = await requireAuth()
  if (currentUser.id !== userId) {
    forbidden()
  }
  return currentUser
}

export async function requireAdminPrivilege(
  userId: string,
  organizationId: string,
) {
  const membership = await prisma.organizationMembers.findFirst({
    where: { organizationId, userId },
    select: { role: true },
  })

  if (!membership || membership.role !== MemberRole.MEMBER) {
    throw new Error('Unauthorized')
  }

  return membership.role
}
