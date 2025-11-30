import { z } from 'zod'
import { EmploymentType, WorkMode } from '@/generated/prisma/enums'

export const experienceSchema = z.object({
  id: z.uuid().optional(),

  title: z.string().trim().min(1, 'Title is required'),
  organizationName: z.string().trim().min(1, 'Organization is required'),

  isCurrentlyWorking: z.boolean().default(false),

  startDate: z.coerce.date('Invalid date'),
  endDate: z.coerce.date().optional().nullable(),

  description: z.string().trim().optional().nullable(),

  employmentType: z.enum(EmploymentType, 'Employment type is required'),
  locationType: z.enum(WorkMode, 'Location type is required'),

  organizationId: z.uuid().optional().nullable(),
})

// ---- Extra validation ----
export const experienceWithValidation = experienceSchema
  .refine(
    (data) => {
      if (!data.isCurrentlyWorking && !data.endDate) return false
      return true
    },
    {
      error: 'End date is required',
      path: ['endDate'],
    },
  )
  .refine(
    (data) => {
      if (data.isCurrentlyWorking) return true
      if (!data.endDate) return true
      return data.endDate >= data.startDate
    },
    {
      error: 'End date cannot be earlier than start date',
      path: ['endDate'],
    },
  )

export type ExperienceFormValues = z.infer<typeof experienceSchema>
