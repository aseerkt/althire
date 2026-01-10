import type { UserSession } from '@/auth/core/session'
import type { Organization } from '@/generated/prisma/client'
import { redis } from '.'
import { REDIS_CACHE_KEYS } from './keys'

// User session

export const setUserSession = (
  sessionId: string,
  sessionData: UserSession,
  expirationInSeconds: number,
) => {
  return redis.set(
    REDIS_CACHE_KEYS.SESSION(sessionId),
    JSON.stringify(sessionData),
    'EX',
    expirationInSeconds,
  )
}

export const getUserSessionById = async (sessionId: string) => {
  const session = await redis.get(REDIS_CACHE_KEYS.SESSION(sessionId))
  if (!session) return null
  return JSON.parse(session)
}

export const deleteUserSessionById = (sessionId: string) => {
  return redis.del(REDIS_CACHE_KEYS.SESSION(sessionId))
}

// Organization

export const setOrganization = async (organization: Organization) => {
  await redis.mset({
    [REDIS_CACHE_KEYS.ORG_BY_ID(organization.id)]: JSON.stringify(organization),
    [REDIS_CACHE_KEYS.ORG_ID_FROM_SLUG(organization.slug)]: organization.id,
  })
}

export const getOrganization = async (orgId: string) => {
  const cached = await redis.get(REDIS_CACHE_KEYS.ORG_BY_ID(orgId))

  if (!cached) return null

  return JSON.stringify(cached)
}

export const getOrgIdFromSlug = async (orgSlug: string) => {
  return redis.get(REDIS_CACHE_KEYS.ORG_ID_FROM_SLUG(orgSlug))
}

export const replaceOrgIdSlug = async (
  orgId: string,
  prevSlug: string,
  newSlug: string,
) => {
  await redis.del(REDIS_CACHE_KEYS.ORG_ID_FROM_SLUG(prevSlug))
  await redis.set(REDIS_CACHE_KEYS.ORG_ID_FROM_SLUG(newSlug), orgId)
}
