import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EditOrganization } from '@/features/organizations/components/EditOrganization'
import { getOrganizationFromUri } from '@/features/organizations/server'

export default async function AdminLayout({
  params,
  children,
}: LayoutProps<'/[orgType]/[uri]/admin'>) {
  const { orgType, uri } = await params

  const { organization } = await getOrganizationFromUri(uri)

  if (!organization) {
    return notFound()
  }

  return (
    <div className='flex gap-6'>
      <Card className='w-56.25 py-0 overflow-hidden'>
        <div className='h-15.5 w-full bg-primary border-b'></div>
        <div className='p-6 space-y-4 -mt-20'>
          <div className='h-18 w-18 flex justify-center items-center ring-2 ring-primary-foreground bg-background rounded-md'>
            <BuildingIcon />
          </div>
          <h2 className='text-lg font-semibold'>{organization.name}</h2>
          <Button asChild>
            <Link href={`/${orgType}/${organization.slug}`}>
              View as member
            </Link>
          </Button>
          <EditOrganization organization={organization} />
        </div>
      </Card>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
