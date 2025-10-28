import { OrganizationType } from '@/generated/prisma'
import { prisma } from '@/prisma/client'

export const getOrganizationBySlug = async (slug: string) => {
  return await prisma.organization.findUnique({ where: { slug } })
}

export const getUserOrganizations = async (
  userId: string,
  orgType = OrganizationType.COMPANY,
) => {
  const organizations = await prisma.organization.findMany({
    where: { type: orgType },
    include: {
      organizationMembers: { where: { userId }, select: { id: true } },
    },
  })

  return organizations
}
