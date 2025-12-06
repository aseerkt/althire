import { z } from 'zod'

// ---- Education Schema ----
export const educationSchema = z.object({
  id: z.uuid().optional(),

  organizationName: z.string().trim().min(1, 'Organization is required'),
  degree: z.string().trim().optional().nullable(),
  fieldOfStudy: z.string().trim().optional().nullable(),

  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),

  grade: z.string().trim().optional().nullable(),
  activities: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),

  organizationId: z.uuid().optional().nullable(),
})

// ---- Extra validation ----
export const educationWithValidation = educationSchema.refine(
  (data) => {
    if (!data.endDate) return true
    return data.endDate >= data.startDate
  },
  {
    message: 'endDate cannot be earlier than startDate',
    path: ['endDate'],
  },
)

export type EducationFormValues = z.infer<typeof educationSchema>
