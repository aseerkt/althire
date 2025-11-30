import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters'),
})

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters'),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters'),
    name: z.string().trim().min(3, 'Name must be at least 3 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignInData = z.infer<typeof signInSchema>
export type SignUpData = z.infer<typeof signUpSchema>
