'use server'

import { cacheTag } from 'next/cache'
import { getCurrentUser } from '@/auth/nextjs/server'
import { CACHE_KEY } from '@/data/cache'
import { PER_PAGE } from '@/data/common'
import { isUUID } from '@/lib/utils'
import { prisma } from '@/prisma/client'
import { redis } from '@/redis'
import { REDIS_CACHE_KEYS } from '@/redis/keys'
import type { PaginationParams } from '@/types'

export async function getOrganizationFromUri(uri: string) {
  'use cache'
  cacheTag(CACHE_KEY.GET_COMPANY_BY_URI(uri))

  const isID = isUUID(uri)

  const organization = await prisma.organization.findUnique({
    where: isID ? { id: uri } : { slug: uri },
  })

  return { isID, organization }
}

export const getOrgFromCache = async (uri: string) => {
  let orgId: string | null

  const isID = isUUID(uri)

  if (isID) {
    orgId = uri
  } else {
    orgId = await redis.get(REDIS_CACHE_KEYS.ORG_ID_FROM_SLUG(uri))
  }

  if (orgId) {
    const cached = await redis.get(REDIS_CACHE_KEYS.ORG_BY_ID(orgId))
    if (cached) {
      return { org: JSON.parse(cached), isID }
    }
  }

  const org = await prisma.organization.findUnique({
    where: isID ? { id: uri } : { slug: uri },
  })

  if (!org) return { org: null, isID }

  await redis.mset({
    [REDIS_CACHE_KEYS.ORG_BY_ID(org.id)]: JSON.stringify(org),
    [REDIS_CACHE_KEYS.ORG_ID_FROM_SLUG(org.slug)]: org.id,
  })

  return { org, isID }
}

export const getUserOrganizations = async (userId: string) => {
  return prisma.organization.findMany({
    where: { organizationMembers: { some: { userId } } },
    include: {
      organizationMembers: { where: { userId }, select: { id: true } },
    },
  })
}

export const getCurrentUserMembership = async (organizationId: string) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return getUserMembership(organizationId, currentUser.id)
}

export const getUserMembership = async (
  organizationId: string,
  userId: string,
) => {
  return prisma.organizationMembers.findFirst({
    where: { organizationId, userId },
  })
}

export const getOrganizationMembers = async (
  organizationId: string,
  { skip = 0, limit = PER_PAGE }: {} & PaginationParams,
) => {
  return await prisma.organizationMembers.findMany({
    where: { organizationId },
    include: { user: { omit: { password: true, salt: true, email: true } } },
    skip: skip,
    take: limit,
  })
}

export const getOrganizationMembersCount = async (organizationId: string) =>
  prisma.organizationMembers.count({ where: { organizationId } })
