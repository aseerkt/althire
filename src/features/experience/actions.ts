'use server'

import { createZodAction } from '@/lib/action'
import { requireAuth } from '@/permissions'
import { prisma } from '@/prisma/client'
import { experienceWithValidation } from './schemas'

export const createExperience = createZodAction(
  experienceWithValidation,
  async (data) => {
    const currentUser = await requireAuth()

    await prisma.experience.create({
      data: {
        ...data,
        userId: currentUser.id,
      },
    })

    return {
      type: 'success',
      message: 'Experience added',
    }
  },
)

export const editExperience = createZodAction(
  experienceWithValidation,
  async (data) => {
    const currentUser = await requireAuth()

    await prisma.experience.update({
      where: {
        id: data.id,
        userId: currentUser.id,
      },
      data: {
        ...data,
      },
    })

    return {
      type: 'success',
      message: 'Experience updated',
    }
  },
)
