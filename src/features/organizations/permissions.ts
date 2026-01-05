import { MemberRole } from '@/generated/prisma/enums'
import { redis } from '@/redis'
import { REDIS_CACHE_KEYS } from '@/redis/keys'
import { getCurrentUserMembership, getUserMembership } from './server'

function isAdmin(role: MemberRole) {
  return role === MemberRole.SUPER_ADMIN || role === MemberRole.ADMIN
}

export async function hasAdminPrivilege(organizationId: string) {
  const membership = await getCurrentUserMembership(organizationId)

  if (!membership) return false

  return isAdmin(membership.role)
}

export async function isAdminUser(organizationId: string, userId: string) {
  const cachedRole = await redis.get(
    REDIS_CACHE_KEYS.ORG_MEMBER_ROLE(organizationId, userId),
  )

  if (cachedRole) {
    return isAdmin(cachedRole as MemberRole)
  }

  const membership = await getUserMembership(organizationId, userId)

  if (!membership) return false

  await redis.set(
    REDIS_CACHE_KEYS.ORG_MEMBER_ROLE(organizationId, userId),
    membership.role,
  )

  return isAdmin(membership.role)
}
