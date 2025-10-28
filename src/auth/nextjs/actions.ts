'use server'

import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
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
import {
  type SignInData,
  type SignUpData,
  signInSchema,
  signUpSchema,
} from './schema'

export const signUp = async (unsafeData: SignUpData) => {
  const { success, data } = signUpSchema.safeParse(unsafeData)

  if (!success) return 'Unable to create account'

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) return 'User with this email already exists'

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
}

export const signIn = async (unsafeData: SignInData) => {
  const { success, data } = signInSchema.safeParse(unsafeData)

  if (!success) return 'Invalid email or password'

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })
  if (!existingUser) return 'Invalid email or password'

  const isPasswordValid = await verifyPassword(
    data.password,
    existingUser.salt,
    existingUser.password,
  )
  if (!isPasswordValid) return 'Invalid email or password'

  await createUserSession(sessionSchema.parse(existingUser), await cookies())

  redirect('/')
}

export const signOut = async () => {
  await removeUserFromSession(await cookies())
  redirect('/')
}
