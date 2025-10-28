import { prisma } from '@/prisma/client'

export const getAllJobs = async () => {
  return prisma.job.findMany({ include: { organization: true } })
}

export const getJobById = (jobId: string) =>
  prisma.job.findUnique({
    where: { id: jobId },
    include: { organization: true },
  })
