import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const query = searchParams.get('query')?.trim()
  const limit = Math.min(Number(searchParams.get('limit') ?? 10), 20)

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  const results = await prisma.location.findMany({
    where: {
      OR: [
        { city: { startsWith: query, mode: 'insensitive' } },
        { region: { startsWith: query, mode: 'insensitive' } },
        { country: { startsWith: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      city: true,
      region: true,
      country: true,
      countryCode: true,
    },
    orderBy: [
      { city: 'asc' }, // prefix hits bubble up
    ],
    take: limit,
  })

  return NextResponse.json(results)
}
