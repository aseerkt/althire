import { getCurrentUser } from '@/auth/nextjs/server'
import { PER_PAGE } from '@/data/pagination'
import { prisma } from '@/prisma/client'
import type { PaginationParams } from '@/types'

export const getAllJobs = async (
  { companyId }: { companyId?: string },
  { skip = 0, limit = PER_PAGE }: PaginationParams,
) => {
  return prisma.job.findMany({
    ...(companyId ? { where: { organizationId: companyId } } : {}),
    include: { organization: true },
    skip,
    take: limit,
  })
}

export const getAllJobsCount = () => prisma.job.count()
export const getCompanyJobCount = (companyId: string) =>
  prisma.job.count({ where: { organizationId: companyId } })

export const getJobById = (jobId: string) =>
  prisma.job.findUnique({
    where: { id: jobId },
    include: { organization: true },
  })

export const getCompanyJobs = (
  organizationId: string,
  { skip, limit }: PaginationParams,
) => {
  return prisma.job.findMany({
    where: { organizationId },
    include: { organization: true },
    skip,
    take: limit,
  })
}

export const getJobApplicants = async (
  jobId: string,
  { skip = 0, limit = PER_PAGE }: PaginationParams,
) => {
  return prisma.jobApplication.findMany({
    where: { jobId },
    include: {
      user: {
        omit: { password: true, salt: true, email: true },
      },
    },
    skip,
    take: limit,
  })
}

export const getTotalApplicantsCount = (jobId: string) =>
  prisma.jobApplication.count({ where: { jobId } })

export const getCurrentUserApplication = async (jobId: string) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return prisma.jobApplication.findFirst({
    where: { jobId, userId: currentUser?.id },
  })
}
