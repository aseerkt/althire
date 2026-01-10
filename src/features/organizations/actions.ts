'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/auth/nextjs/server'
import { CACHE_KEY } from '@/data/cache'
import { Prisma } from '@/generated/prisma/client'
import { MemberRole } from '@/generated/prisma/enums'
import { createZodAction } from '@/lib/action'
import { prisma } from '@/prisma/client'
import { replaceOrgIdSlug, setOrganization } from '@/redis/actions'
import { hasAdminPrivilege } from './permissions'
import { createOrganizationSchema, editOrganizationSchema } from './schemas'

export const createOrganization = createZodAction(
  createOrganizationSchema,
  async (data) => {
    const currentUser = await getCurrentUser()

    try {
      const organization = await prisma.$transaction(async (tx) => {
        const org = await tx.organization.create({
          data,
        })
        await tx.organizationMembers.create({
          data: {
            organizationId: org.id,
            userId: currentUser!.id,
            role: MemberRole.SUPER_ADMIN,
          },
        })
        return org
      })

      await setOrganization(organization)

      redirect(`/${organization.type.toLowerCase()}/${organization.slug}`)
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

export const editOrganization = createZodAction(
  editOrganizationSchema,
  async (data) => {
    const isAdmin = await hasAdminPrivilege(data.id)

    if (!isAdmin) {
      return {
        type: 'error',
        message: 'Permission denied',
      }
    }

    const { id, type, ...updateData } = data

    try {
      const prevOrg = await prisma.organization.findUnique({
        where: { id },
        select: { id: true, slug: true },
      })

      if (!prevOrg) {
        return {
          type: 'error',
          message: 'Organization not found',
        }
      }
      const newOrg = await prisma.organization.update({
        where: { id },
        data: updateData,
      })
      // update redis cache
      if (prevOrg.slug !== data.slug) {
        await replaceOrgIdSlug(prevOrg.id, prevOrg.slug, data.slug)
      }
      await setOrganization(newOrg)

      // update next cache
      updateTag(CACHE_KEY.GET_COMPANY_BY_URI(prevOrg.id))
      updateTag(CACHE_KEY.GET_COMPANY_BY_URI(prevOrg.slug))

      return {
        type: 'success',
        message: 'Organization updated successfully',
      }
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
