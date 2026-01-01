import { z } from 'zod'
import { locationSchema } from '../locations/schemas'

export const userInfoSchema = z
  .object({
    name: z.string().trim().min(3),
    headline: z.string().nullable(),
  })
  .extend(locationSchema.shape)
