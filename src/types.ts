import type { $ZodFlattenedError } from 'zod/v4/core'

export type PaginationParams = { skip?: number; limit?: number }

export type ActionResponse<T> = {
  type: 'success' | 'error'
  message: string
  errors?: $ZodFlattenedError<T>
}
