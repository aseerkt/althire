import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { type Resolver, type UseFormProps, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { setZodFormError } from '@/lib/utils'
import type { ActionResponse } from '@/types'

interface UseZodFormActionProps<T extends z.ZodObject<z.ZodRawShape>>
  extends UseFormProps<z.infer<T>> {
  schema: T
  action: (data: z.infer<T>) => Promise<ActionResponse<z.infer<T>>>
}

export function useZodFormAction<T extends z.ZodObject<z.ZodRawShape>>({
  schema,
  action,
  ...props
}: UseZodFormActionProps<T>) {
  const [isPending, startTransition] = useTransition()
  const form = useForm({
    ...props,
    // zodResolver has a slightly different generic shape for input vs output depending on
    // the zod schema. Cast to Resolver with the inferred type so TypeScript matches
    // the useForm generics and avoids the TS2322 assignment error.
    resolver: zodResolver(schema) as unknown as Resolver<
      z.infer<T>,
      unknown,
      z.infer<T>
    >,
  })

  const { handleSubmit, setError } = form

  const handleSubmitAction = handleSubmit((data) => {
    startTransition(async () => {
      try {
        const res = await action(data)

        if (res.message) toast.error(res.message)
        if (res.errors) setZodFormError(res.errors, setError)
      } catch (error) {
        // ✅ correct way to detect redirect errors
        if (
          error instanceof Error &&
          'digest' in error &&
          error.digest === 'NEXT_REDIRECT'
        ) {
          throw error // let Next.js handle redirect
        }

        toast.error('Something went wrong')
      }
    })
  })

  return { isPending, handleSubmitAction, ...form } as const
}
