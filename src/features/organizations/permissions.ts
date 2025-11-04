import { getCurrentUser } from '@/auth/nextjs/server'
import { MemberRole } from '@/generated/prisma'
import { prisma } from '@/prisma/client'

export async function hasAdminPrivilege(organizationId: string) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return false
  const membership = await prisma.organizationMembers.findFirst({
    where: { organizationId, userId: currentUser.id },
    select: { role: true },
  })

  if (!membership) return false

  return membership.role !== MemberRole.MEMBER
}
