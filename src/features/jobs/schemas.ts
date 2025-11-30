import z from 'zod'
import { EmploymentType, WorkMode } from '@/generated/prisma/enums'

export const createPostJobSchema = z.object({
  title: z.string().trim().min(1, 'Title required'),
  organizationId: z.uuid(),
  description: z
    .string()
    .trim()
    .min(50, 'Description should be minimum 50 characters'),
  workMode: z.enum(WorkMode, 'Work mode is required'),
  employmentType: z.enum(EmploymentType, 'Employment type is required'),
})

export type CreateJobPostData = z.infer<typeof createPostJobSchema>
