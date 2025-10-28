import { Card } from '@/components/ui/card'
import { getOrganizationBySlug } from '@/features/organizations/server'
import { Building2Icon } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function CompanyPage({
  params,
}: PageProps<'/company/[companySlug]'>) {
  const { companySlug } = await params

  const company = await getOrganizationBySlug(companySlug)

  if (company == null) {
    return notFound()
  }

  return (
    <Card className='pt-0 overflow-hidden'>
      <div className='h-24 bg-primary'></div>
      <div className='px-6 -mt-24'>
        <div className='flex items-center justify-center h-28 w-28 rounded-full ring-3 ring-primary-foreground mb-6 bg-background'>
          <Building2Icon className='h-20 w-20 text-primary' />
        </div>
        <div>
          <h1 className='text-2xl font-bold'>{company.name}</h1>
          {company.website && (
            <a
              className='text-primary'
              href={company.website}
              target='_blank'
              rel='noreferrer'
            >
              {company.website}
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
