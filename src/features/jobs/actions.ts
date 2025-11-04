'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { CACHE_KEY } from '@/data/cache'
import { createZodAction } from '@/lib/utils'
import { requireAdminPrivilege, requireAuth } from '@/permissions'
import { prisma } from '@/prisma/client'
import { createPostJobSchema } from './schemas'

export const createJobPost = createZodAction(
  createPostJobSchema,
  async (data) => {
    const currentUser = await requireAuth()
    await requireAdminPrivilege(currentUser.id, data.organizationId)

    const job = await prisma.job.create({ data })
    redirect(`/jobs/${job.id}`)
  },
)

export const applyForJob = async (jobId: string) => {
  const currentUser = await requireAuth()
  await prisma.jobApplication.create({
    data: { jobId, userId: currentUser!.id },
  })
  updateTag(CACHE_KEY.GET_JOB_APPLICANTS_COUNT(jobId))
  updateTag(CACHE_KEY.GET_USER_JOB_APPLICATION(currentUser.id, jobId))
}
