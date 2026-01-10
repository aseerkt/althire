import crypto from 'node:crypto'
import { z } from 'zod'
import {
  deleteUserSessionById,
  getUserSessionById,
  setUserSession,
} from '@/redis/actions'

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7 // 7 days
const SESSION_COOKIE_NAME = 'session-id'

type Cookies = {
  set: (cookie: {
    name: string
    value: string
    httpOnly: boolean
    secure: boolean
    sameSite: 'lax' | 'strict' | 'none'
    expires: number
  }) => void
  get: (name: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

export const sessionSchema = z.object({
  id: z.uuid(),
})

export type UserSession = z.infer<typeof sessionSchema>

export async function createUserSession(user: UserSession, cookies: Cookies) {
  // Implementation for creating a user session
  const sessionId = crypto.randomBytes(512).toString('hex')
  await setUserSession(
    sessionId,
    sessionSchema.parse(user),
    SESSION_EXPIRATION_SECONDS,
  )
  setCookie(sessionId, cookies)
}

export async function setCookie(sessionId: string, cookies: Cookies) {
  cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  })
}

export function getSessionCookie(cookies: Cookies) {
  return cookies.get(SESSION_COOKIE_NAME)
}

export async function getUserSession(cookies: Cookies) {
  const sessionCookie = getSessionCookie(cookies)

  if (!sessionCookie) return null

  const sessionData = await getUserSessionById(sessionCookie.value)
  if (!sessionData) return null

  return sessionSchema.parse(sessionData)
}

export async function removeUserFromSession(cookies: Cookies) {
  const sessionCookie = cookies.get(SESSION_COOKIE_NAME)
  if (sessionCookie) {
    deleteUserSessionById(sessionCookie.value)
    cookies.delete(SESSION_COOKIE_NAME)
  }
}
