import { type ClassValue, clsx } from 'clsx'
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import type { $ZodFlattenedError } from 'zod/v4/core'
import type { ActionResponse } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(input: string): string {
  return input
    .normalize('NFKD') // handles accents like "Développeur"
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, '') // remove leading/trailing dashes
    .slice(0, 80) // optional: limit slug length
}

export function formatDate(date: string | Date): string {
  const now = Date.now()
  const past = new Date(date).getTime()
  const diffInSeconds = Math.round((now - past) / 1000)

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const ranges = {
    year: 3600 * 24 * 365,
    month: 3600 * 24 * 30,
    week: 3600 * 24 * 7,
    day: 3600 * 24,
    hour: 3600,
    minute: 60,
    second: 1,
  } as const

  for (const [unit, secondsInUnit] of Object.entries(ranges) as [
    Intl.RelativeTimeFormatUnit,
    number,
  ][]) {
    if (Math.abs(diffInSeconds) >= secondsInUnit || unit === 'second') {
      const value = -Math.round(diffInSeconds / secondsInUnit)
      return rtf.format(value, unit)
    }
  }

  return 'just now'
}

export function setZodFormError<TFieldValues extends FieldValues>(
  errors: $ZodFlattenedError<TFieldValues>,
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
    try {
      const res = await fn(parsed.data)
      return res
    } catch (err) {
      if (
        err instanceof Error &&
        'digest' in err &&
        err.digest === 'NEXT_REDIRECT'
      ) {
        throw err
      }
      return {
        type: 'error',
        message: 'Something went wrong',
      }
    }
  }
}
