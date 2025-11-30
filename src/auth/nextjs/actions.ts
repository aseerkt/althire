'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createZodAction } from '@/lib/action'
import { prisma } from '@/prisma/client'
import {
  generateSalt,
  hashPassword,
  verifyPassword,
} from '../core/passwordHasher'
import {
  createUserSession,
  removeUserFromSession,
  sessionSchema,
} from '../core/session'
import { signInSchema, signUpSchema } from './schema'

export const signUp = createZodAction(signUpSchema, async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) {
    return {
      type: 'error',
      message: 'Username or email already taken',
    }
  }

  const salt = generateSalt(12)
  const hashedPassword = await hashPassword(data.password, salt)

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashedPassword,
      salt: salt,
    },
  })

  await createUserSession(sessionSchema.parse(newUser), await cookies())
  redirect('/')
})

export const signIn = createZodAction(signInSchema, async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })
  if (!existingUser) {
    return { type: 'error', message: 'Invalid email or password' }
  }

  const isPasswordValid = await verifyPassword(
    data.password,
    existingUser.salt,
    existingUser.password,
  )
  if (!isPasswordValid) {
    return { type: 'error', message: 'Invalid email or password' }
  }

  await createUserSession(sessionSchema.parse(existingUser), await cookies())

  redirect('/')
})

export const signOut = async () => {
  await removeUserFromSession(await cookies())
  redirect('/')
}
