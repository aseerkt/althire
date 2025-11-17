import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import OrganizationInfo from '@/features/organizations/components/OrganizationInfo'
import { getOrganizationBySlug } from '@/features/organizations/server'
import { OrganizationType } from '@/generated/prisma'

export default async function OrganizationLayout(
  props: LayoutProps<'/[orgType]/[orgSlug]'>,
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
}: LayoutProps<'/[orgType]/[orgSlug]'>) {
  const { orgType, orgSlug } = await params

  if (
    orgType !== OrganizationType.COMPANY.toLocaleLowerCase() &&
    orgType !== OrganizationType.SCHOOL.toLocaleLowerCase()
  ) {
    return notFound()
  }

  const organization = await getOrganizationBySlug(orgSlug)

  if (organization == null) {
    return notFound()
  }

  return (
    <div className='flex flex-col gap-4'>
      <OrganizationInfo slug={orgSlug} organization={organization} />
      <div>{children}</div>
    </div>
  )
}
