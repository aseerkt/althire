import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '@/data/env'
import { PrismaClient } from '@/generated/prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ['query', 'info', 'error', 'warn'],
    adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
