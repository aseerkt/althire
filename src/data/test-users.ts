import type { Prisma } from '@/generated/prisma/browser'

export const testUsers: Prisma.UserCreateManyInput[] = [
  {
    email: 'aseer@test.com',
    name: 'Aseer KT',
    username: 'aseerkt',
    headline: 'Full Stack Web Developer',
    password: 'aseer@123',
    salt: 'salt',
  },
  {
    email: 'john@test.com',
    name: 'John Doe',
    username: 'john',
    headline: 'UI/UX Designer',
    password: 'john@123',
    salt: 'salt',
  },
  {
    email: 'jane@test.com',
    name: 'Jane Doe',
    username: 'jane',
    headline: 'Web-flow designer',
    password: 'jane@123',
    salt: 'salt',
  },
  {
    email: 'walker@test.com',
    name: 'Eddie Walker',
    username: 'walker',
    headline: 'DevOps Engineer',
    password: 'john@123',
    salt: 'salt',
  },
]
