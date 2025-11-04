'use server'

import { redirect } from 'next/navigation'
import { createZodAction } from '@/lib/utils'
import { requireAuth, requiredAdminPrivilege } from '@/permissions'
import { prisma } from '@/prisma/client'
import { createPostJobSchema } from './schemas'

export const createJobPost = createZodAction(
  createPostJobSchema,
  async (data) => {
    const currentUser = await requireAuth()
    await requiredAdminPrivilege(currentUser.id, data.organizationId)

    const job = await prisma.job.create({ data })
    redirect(`/jobs/${job.id}`)
  },
)

export const applyForJob = async (jobId: string) => {
  const currentUser = await requireAuth()
  await prisma.jobApplication.create({
    data: { jobId, userId: currentUser!.id },
  })
}
