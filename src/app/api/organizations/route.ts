import { NextResponse } from 'next/server'
import { OrganizationType } from '@/generated/prisma/client'
import { prisma } from '@/prisma/client'

const MIN_SEARCH_LENGTH = 2
const MAX_RESULTS = 6

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search')?.trim()
  const typeParam = searchParams.get('type')

  // 1️⃣ Validate search
  if (!search || search.length < MIN_SEARCH_LENGTH) {
    return NextResponse.json([])
  }

  // 2️⃣ Validate enum safely
  const type =
    // biome-ignore lint/suspicious/noExplicitAny: false positive
    typeParam && Object.values(OrganizationType).includes(typeParam as any)
      ? (typeParam as OrganizationType)
      : undefined

  // 3️⃣ Query
  const organizations = await prisma.organization.findMany({
    where: {
      name: {
        startsWith: search,
        mode: 'insensitive',
      },
      ...(type && { type }),
    },
    omit: { updatedAt: true },
    orderBy: {
      name: 'asc',
    },
    take: MAX_RESULTS,
  })

  return NextResponse.json(organizations)
}
