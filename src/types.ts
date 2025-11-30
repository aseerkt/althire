import type { Control, FieldValues, Path } from 'react-hook-form'
import type { $ZodFlattenedError } from 'zod/v4/core'

export type PaginationParams = { skip?: number; limit?: number }

export type ActionResponse<T> = {
  type: 'success' | 'error'
  message: string
  errors?: Omit<$ZodFlattenedError<T>, 'formErrors'>
}

export type FieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  description?: React.ReactNode
}
