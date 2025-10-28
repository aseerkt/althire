import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.url(),
  REDIS_HOST: z.hostname(),
  REDIS_PORT: z.coerce.number(),
})

export const env = envSchema.parse(process.env)
