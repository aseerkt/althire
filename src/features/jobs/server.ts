import { PER_PAGE } from '@/data/pagination'
import { prisma } from '@/prisma/client'

export const getAllJobs = async ({
  skip = 0,
  limit = PER_PAGE,
}: {
  skip?: number
  limit?: number
}) => {
  return prisma.job.findMany({
    include: { organization: true },
    skip,
    take: limit,
  })
}

export const getAllJobsCount = () => prisma.job.count()

export const getJobById = (jobId: string) =>
  prisma.job.findUnique({
    where: { id: jobId },
    include: { organization: true },
  })
