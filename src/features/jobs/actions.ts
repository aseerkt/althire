'use server'

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/auth/nextjs/server'
import { prisma } from '@/prisma/client'
import type { CreateJobPostData } from './schemas'

export const createJobPost = async (data: CreateJobPostData) => {
  const job = await prisma.job.create({ data })
  return redirect(`/jobs/${job.id}`)
}

export const applyForJob = async (jobId: string) => {
  const currentUser = await getCurrentUser()
  await prisma.jobApplication.create({
    data: { jobId, userId: currentUser!.id },
  })
}
