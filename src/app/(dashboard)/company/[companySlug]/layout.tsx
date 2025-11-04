import { Building2Icon, SquareArrowOutUpRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { RouteTabs } from '@/components/RoutesTab'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { industryMap, organizationSizeMap } from '@/features/organizations/data'
import { getOrganizationBySlug } from '@/features/organizations/server'

export default async function CompanyLayout(
  props: LayoutProps<'/company/[companySlug]'>,
) {
  return (
    <Suspense>
      <SuspendedCompanyLayout {...props} />{' '}
    </Suspense>
  )
}

async function SuspendedCompanyLayout({
  params,
  children,
}: LayoutProps<'/company/[companySlug]'>) {
  const { companySlug } = await params

  const company = await getOrganizationBySlug(companySlug)

  if (company == null) {
    return notFound()
  }

  return (
    <div className='flex flex-col gap-4'>
      <Card className='pt-0 overflow-hidden'>
        <div className='h-24 bg-primary'></div>
        <div className='-mt-24'>
          <div className='flex items-center ml-6 justify-center h-28 w-28 rounded-full ring-3 ring-primary-foreground mb-6 bg-background'>
            <Building2Icon className='h-20 w-20 text-primary' />
          </div>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>{company.name}</CardTitle>
            <p>
              <span>{industryMap[company.industry]}</span>
              <span> • </span>
              <span>{organizationSizeMap[company.size]}</span>
            </p>
          </CardHeader>
        </div>
        <CardContent>
          {company.website && (
            <Button asChild>
              <a
                className='text-primary'
                href={company.website}
                target='_blank'
                rel='noreferrer'
              >
                Visit website <SquareArrowOutUpRightIcon />
              </a>
            </Button>
          )}
        </CardContent>
        <CardFooter className='w-full border-t-2 pb-0 pt-4'>
          <RouteTabs
            basePath={`/company/${companySlug}`}
            tabs={[
              { label: 'About', value: '' },
              { label: 'Jobs', value: '/jobs' },
              { label: 'People', value: '/people' },
            ]}
          />
        </CardFooter>
      </Card>
      <div>{children}</div>
    </div>
  )
}
