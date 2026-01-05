import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import OrganizationInfo from '@/features/organizations/components/OrganizationInfo'
import { hasAdminPrivilege } from '@/features/organizations/permissions'
import { getOrganizationFromUri } from '@/features/organizations/server'

export default async function OrganizationLayout(
  props: LayoutProps<'/[orgType]/[uri]'>,
) {
  return (
    <Suspense>
      <SuspendedOrganizationLayout {...props} />
    </Suspense>
  )
}

async function SuspendedOrganizationLayout({
  params,
  children,
}: LayoutProps<'/[orgType]/[uri]'>) {
  const { orgType, uri } = await params

  const { organization } = await getOrganizationFromUri(uri)

  if (!organization) {
    return notFound()
  }

  const isAdmin = await hasAdminPrivilege(organization.id)

  return (
    <div className='flex flex-col gap-4'>
      <OrganizationInfo
        slug={organization.slug}
        organization={organization}
        adminLink={isAdmin ? `/${orgType}/${organization.id}/admin` : undefined}
      />
      <div>{children}</div>
    </div>
  )
}
