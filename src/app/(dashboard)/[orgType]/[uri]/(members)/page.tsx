import { notFound } from 'next/navigation'
import OrganizationAbout from '@/features/organizations/components/OrganizationAbout'
import { getOrganizationFromUri } from '@/features/organizations/server'

export default async function OrganizationPage({
  params,
}: PageProps<'/[orgType]/[uri]'>) {
  const { uri } = await params

  const { organization } = await getOrganizationFromUri(uri)

  if (!organization) {
    return notFound()
  }

  return <OrganizationAbout organization={organization} />
}
