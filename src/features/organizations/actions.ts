'use server'

import { getCurrentUser } from '@/auth/nextjs/server'
import { MemberRole } from '@/generated/prisma'
import { prisma } from '@/prisma/client'
import { redirect } from 'next/navigation'
import type { CreateOrganizationData } from './schemas'

export async function createOrganization(data: CreateOrganizationData) {
  const currentUser = await getCurrentUser()
  const company = await prisma.organization.create({
    data,
  })
  await prisma.organizationMembers.create({
    data: {
      organizationId: company.id,
      userId: currentUser!.id,
      role: MemberRole.EMPLOYER,
    },
  })
  redirect(`/company/${company.slug}`)
}
