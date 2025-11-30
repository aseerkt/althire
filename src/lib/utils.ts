import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export function formatLocaleDateString(date: string | Date | number) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
