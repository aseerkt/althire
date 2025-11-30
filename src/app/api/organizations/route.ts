import { OrganizationType } from '@/generated/prisma/client'
import { prisma } from '@/prisma/client'

export async function GET(request: Request) {
  const url = new URL(request.url)

  const search = url.searchParams.get('search')
  const organizationType = url.searchParams.get('type')

  if (!search) {
    return Response.json([])
  }

  if (
    organizationType &&
    !Object.values(OrganizationType).includes(
      organizationType as OrganizationType,
    )
  ) {
    return Response.json([])
  }

  const organizations = await prisma.organization.findMany({
    where: {
      name: { contains: search.toLowerCase(), mode: 'insensitive' },
      type: (organizationType as OrganizationType) ?? undefined,
    },
    take: 6,
  })

  return Response.json(organizations)
}
