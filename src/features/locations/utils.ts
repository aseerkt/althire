import type { Location } from '@/generated/prisma/browser'

export function displayLocation(location: Location) {
  return `${location.city}, ${location.region}, ${location.country}`
}
