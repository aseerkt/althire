import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import type { $ZodFlattenedError } from 'zod/v4/core'

export function setZodFormError<TFieldValues extends FieldValues>(
  errors: Omit<$ZodFlattenedError<TFieldValues>, 'formErrors'>,
  setError: UseFormSetError<TFieldValues>,
) {
  Object.entries(errors.fieldErrors).forEach(([key, messages]) => {
    if (messages?.length) {
      setError(key as Path<TFieldValues>, {
        message: messages[0],
      })
    }
  })
}
