'use server'

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/auth/nextjs/server'
import { MemberRole, Prisma } from '@/generated/prisma'
import { createZodAction } from '@/lib/utils'
import { prisma } from '@/prisma/client'
import { createOrganizationSchema } from './schemas'

export const createOrganization = createZodAction(
  createOrganizationSchema,
  async (data) => {
    const currentUser = await getCurrentUser()

    try {
      const company = await prisma.$transaction(async (tx) => {
        const company = await tx.organization.create({
          data,
        })
        await tx.organizationMembers.create({
          data: {
            organizationId: company.id,
            userId: currentUser!.id,
            role: MemberRole.EMPLOYER,
          },
        })
        return company
      })
      redirect(`/company/${company.slug}`)
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return {
            type: 'error',
            message: 'Organization unique address already taken',
            errors: {
              fieldErrors: { slug: ['unique address already taken'] },
            },
          }
        }
      }
      throw err
    }
  },
)
