import Redis from 'ioredis'
import type { UserSession } from '@/auth/core/session'
import { env } from '@/data/env'

export const redis = new Redis(env.REDIS_PORT, env.REDIS_HOST)

export const setUserSession = (
  sessionId: string,
  sessionData: UserSession,
  expirationInSeconds: number,
) => {
  return redis.set(
    `session:${sessionId}`,
    JSON.stringify(sessionData),
    'EX',
    expirationInSeconds,
  )
}

export const getUserSessionById = async (sessionId: string) => {
  const session = await redis.get(`session:${sessionId}`)
  if (!session) return null
  return JSON.parse(session)
}

export const deleteUserSessionById = (sessionId: string) => {
  return redis.del(`session:${sessionId}`)
}
