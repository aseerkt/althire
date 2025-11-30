import { useTransition } from 'react'
import type { FieldValues, UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { setZodFormError } from '@/lib/form'
import type { ActionResponse } from '@/types'

export function useFormTransition() {
  const [isPending, startTransition] = useTransition()

  function startFormTransition<TData extends FieldValues>(
    action: () => Promise<ActionResponse<TData>>,
    setError: UseFormSetError<TData>,
  ) {
    startTransition(async () => {
      try {
        const { message, errors } = await action()
        if (message) {
          toast.error(message)
        }
        if (errors) {
          setZodFormError(errors, setError)
        }
      } catch (error) {
        if (
          error instanceof Error &&
          'message' in error &&
          error.message === 'NEXT_REDIRECT'
        ) {
          return
        }
        toast.error('Something went wrong')
      }
    })
  }

  return { isPending, startFormTransition }
}
