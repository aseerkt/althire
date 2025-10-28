import { OrganizationType } from '@/generated/prisma'
import z from 'zod'

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  slug: z.string().min(1),
  website: z.url('Invalid URL').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  type: z.enum(OrganizationType),
})

export type CreateOrganizationData = z.infer<typeof createOrganizationSchema>
