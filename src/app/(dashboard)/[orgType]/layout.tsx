import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { isValidOrgType } from '@/features/organizations/utils'

export default function OrganizationLayout(props: LayoutProps<'/[orgType]'>) {
  return (
    <Suspense>
      <SuspenseLayout {...props} />
    </Suspense>
  )
}

async function SuspenseLayout({ params, children }: LayoutProps<'/[orgType]'>) {
  const { orgType } = await params

  if (!isValidOrgType(orgType.toUpperCase())) {
    return notFound()
  }

  return children
}
