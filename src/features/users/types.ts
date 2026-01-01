import type { z } from 'zod'
import type { User } from '@/generated/prisma/browser'
import type { ZodAction } from '@/lib/action'

export type ProfileSectionConfig<TSchema extends z.ZodObject> = {
  addFormTitle: string
  editFormTitle: string
  schema: TSchema
  createAction: ZodAction<TSchema>
  editAction: ZodAction<TSchema>
  defaultValues: Partial<z.infer<TSchema>>
  form: React.ComponentType
}

export type PublicUser = Omit<User, 'email' | 'password' | 'salt'>
