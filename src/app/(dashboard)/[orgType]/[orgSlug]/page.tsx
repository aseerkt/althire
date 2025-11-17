import { notFound } from 'next/navigation'
import OrganizationAbout from '@/features/organizations/components/OrganizationAbout'
import { getOrganizationBySlug } from '@/features/organizations/server'

export default async function OrganizationPage({
  params,
}: PageProps<'/[orgType]/[orgSlug]'>) {
  const { orgSlug } = await params

  const organization = await getOrganizationBySlug(orgSlug)

  if (organization == null) {
    return notFound()
  }

  return <OrganizationAbout organization={organization} />
}
