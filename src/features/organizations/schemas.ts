import z from 'zod'
import {
  Industry,
  OrganizationSize,
  OrganizationType,
} from '@/generated/prisma/enums'

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters'),
  slug: z
    .string()
    .trim()
    .min(3, 'URL must be minimum 3 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'URL can only use lowercase alphabet, numeric and hyphen characters',
    ),
  website: z.httpUrl('Invalid URL').nullable(),
  description: z
    .string()
    .trim()
    .min(20, 'Description must be at least 20 characters')
    .nullable(),
  type: z.enum(OrganizationType, 'Please select an organization type'),
  industry: z.enum(Industry, { error: 'Please select an industry' }),
  size: z.enum(OrganizationSize, {
    error: 'Please select an organization size',
  }),
  tagline: z.string().nullable(),
})

export const editOrganizationSchema = createOrganizationSchema.extend({
  id: z.uuid(),
})

export type CreateOrganizationData = z.infer<typeof createOrganizationSchema>

export type EditOrganizationData = z.infer<typeof editOrganizationSchema>
