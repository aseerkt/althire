import z from 'zod'
import {
  Industry,
  OrganizationSize,
  OrganizationType,
} from '@/generated/prisma'

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  slug: z.string().min(1),
  website: z.httpUrl('Invalid URL').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  type: z.enum(OrganizationType),
  industry: z.enum(Industry, { error: 'Please select an industry' }),
  size: z.enum(OrganizationSize, {
    error: 'Please select an organization size',
  }),
  tagline: z.string().optional(),
})

export type CreateOrganizationData = z.infer<typeof createOrganizationSchema>
