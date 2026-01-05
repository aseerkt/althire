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

export const isUUID = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)

export function formatDateFromNow(date: string | Date): string {
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

export function formatDateRangeWithDuration(
  start: Date,
  end?: Date | null,
): string {
  const format = (d: Date) =>
    d.toLocaleString('en-US', { month: 'short', year: 'numeric' })

  const startStr = format(start)
  const endDate = end ?? new Date()
  const endStr = end ? format(endDate) : 'Present'

  // Calculate duration
  let years = endDate.getFullYear() - start.getFullYear()
  let months = endDate.getMonth() - start.getMonth()

  if (months < 0) {
    years -= 1
    months += 12
  }

  const yearsStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : ''
  const monthsStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : ''

  const duration =
    yearsStr && monthsStr
      ? `${yearsStr} ${monthsStr}`
      : yearsStr || monthsStr || '0 mos'

  return `${startStr} – ${endStr} · ${duration}`
}
