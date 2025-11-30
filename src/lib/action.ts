import { z } from 'zod'
import type { ActionResponse } from '@/types'

type ZodAction<TSchema extends z.ZodObject<z.ZodRawShape>> = (
  data: z.infer<TSchema>,
) => Promise<ActionResponse<z.infer<TSchema>>>

export function createZodAction<TSchema extends z.ZodObject<z.ZodRawShape>>(
  schema: TSchema,
  fn: ZodAction<TSchema>,
): ZodAction<TSchema> {
  return async (unsafeData) => {
    const parsed = schema.safeParse(unsafeData)

    if (!parsed.success) {
      return {
        type: 'error',
        message: 'Invalid form data',
        errors: z.flattenError(parsed.error),
      }
    }

    return fn(parsed.data)
  }
}
