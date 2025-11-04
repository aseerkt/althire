import { getCurrentUser } from './auth/nextjs/server'
import { MemberRole } from './generated/prisma'
import { prisma } from './prisma/client'

export const requireAuth = async () => {
  const currentUser = await getCurrentUser()

  if (currentUser === null) {
    throw new Error('Unauthorized')
  }

  return currentUser
}

export async function requiredAdminPrivilege(
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
