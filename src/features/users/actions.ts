'use server'

import { updateTag } from 'next/cache'
import { CACHE_KEY } from '@/data/cache'
import { createZodAction } from '@/lib/action'
import { requireAuth } from '@/permissions'
import { prisma } from '@/prisma/client'
import { userInfoSchema } from './schemas'

export const editUserInfo = createZodAction(userInfoSchema, async (data) => {
  const currentUser = await requireAuth()

  await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name: data.name,
      headline: data.headline,
      locationId: data.locationId,
    },
  })

  updateTag(CACHE_KEY.GET_USER_BY_USERNAME(currentUser.username))

  return {
    type: 'success',
    message: 'User info updated',
  }
})
