'use server'

import { createZodAction } from '@/lib/action'
import { requireAuth } from '@/permissions'
import { prisma } from '@/prisma/client'
import { educationWithValidation } from './schemas'

export const createEducation = createZodAction(
  educationWithValidation,
  async (data) => {
    const currentUser = await requireAuth()

    await prisma.education.create({
      data: {
        ...data,
        userId: currentUser.id,
      },
    })

    return {
      type: 'success',
      message: 'Education added',
    }
  },
)

export const editEducation = createZodAction(
  educationWithValidation,
  async (data) => {
    const currentUser = await requireAuth()

    await prisma.education.update({
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
      message: 'Education added',
    }
  },
)
