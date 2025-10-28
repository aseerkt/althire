import { WorkMode } from '@/generated/prisma'
import z from 'zod'

export const createPostJobSchema = z.object({
  title: z.string(),
  organizationId: z.uuid(),
  description: z.string(),
  workMode: z.enum(WorkMode),
})

export type CreateJobPostData = z.infer<typeof createPostJobSchema>
