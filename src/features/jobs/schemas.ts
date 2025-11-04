import z from 'zod'
import { WorkMode } from '@/generated/prisma'

export const createPostJobSchema = z.object({
  title: z.string().min(1, 'Title required'),
  organizationId: z.uuid(),
  description: z
    .string()
    .min(100, 'Description should be minimum 100 characters'),
  workMode: z.enum(WorkMode, 'Work mode is required'),
})

export type CreateJobPostData = z.infer<typeof createPostJobSchema>
