import { notFound } from 'next/navigation'
import { Paginator } from '@/components/Paginator'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  getOrganizationBySlug,
  getOrganizationMembers,
  getOrganizationMembersCount,
} from '@/features/organizations/server'
import { UserCard } from '@/features/users/components/UserCard'

export default async function OrganizationPeoplePage({
  params,
  searchParams,
}: PageProps<'/[orgType]/[orgSlug]/people'>) {
  const { orgSlug } = await params
  const { start } = await searchParams

  const skip = Number(start) || 0

  const organization = await getOrganizationBySlug(orgSlug)

  if (organization == null) {
    return notFound()
  }
  const members = await getOrganizationMembers(organization.id, { skip })
  const totalOrganizationMembersCount = await getOrganizationMembersCount(
    organization.id,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className='-mb-4'>
          {totalOrganizationMembersCount} associated members
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-3 w-full gap-4'>
        {members.map((member) => (
          <UserCard key={member.id} user={member.user} />
        ))}
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Paginator skip={skip} totalCount={totalOrganizationMembersCount} />
      </CardFooter>
    </Card>
  )
}
