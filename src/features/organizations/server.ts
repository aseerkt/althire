import { getCurrentUser } from '@/auth/nextjs/server'
import { PER_PAGE } from '@/data/pagination'
import { OrganizationType } from '@/generated/prisma'
import { prisma } from '@/prisma/client'
import type { PaginationParams } from '@/types'

export const getOrganizationBySlug = async (slug: string) => {
  return await prisma.organization.findUnique({ where: { slug } })
}

export const getUserOrganizations = async (
  userId: string,
  orgType = OrganizationType.COMPANY,
) => {
  const organizations = await prisma.organization.findMany({
    where: { type: orgType, organizationMembers: { some: { userId } } },
    include: {
      organizationMembers: { where: { userId }, select: { id: true } },
    },
  })

  return organizations
}

export const getCurrentUserMembership = async (organizationId: string) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  const membership = await prisma.organizationMembers.findFirst({
    where: { organizationId, userId: currentUser.id },
  })

  return membership
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

export const getOrganizationMembersCount = (organizationId: string) =>
  prisma.organizationMembers.count({ where: { organizationId } })
