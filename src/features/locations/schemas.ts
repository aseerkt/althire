import { z } from 'zod'

export const locationSchema = z.object({
  locationName: z.string().optional(),
  locationId: z.uuid().nullable(),
})

export type LocationFields = z.infer<typeof locationSchema>
