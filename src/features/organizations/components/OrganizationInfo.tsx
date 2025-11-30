import { Building2Icon, SquareArrowOutUpRightIcon } from 'lucide-react'
import { RouteTabs } from '@/components/RoutesTab'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Organization } from '@/generated/prisma/browser'
import { industryMap, organizationSizeMap } from '../data'

const organizationTabs = [
  { label: 'About', value: '' },
  { label: 'Jobs', value: '/jobs' },
  { label: 'People', value: '/people' },
]

export default function OrganizationInfo({
  slug,
  organization,
}: {
  slug: string
  organization: Organization
}) {
  return (
    <Card className='pt-0 overflow-hidden'>
      <div className='h-24 bg-primary'></div>
      <div className='-mt-24'>
        <div className='flex items-center ml-6 justify-center h-28 w-28 rounded-full ring-3 ring-primary-foreground mb-6 bg-background'>
          <Building2Icon className='h-20 w-20 text-primary' />
        </div>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            {organization.name}
          </CardTitle>
          <p>
            <span>{industryMap[organization.industry]}</span>
            <span> • </span>
            <span>{organizationSizeMap[organization.size]}</span>
          </p>
        </CardHeader>
      </div>
      <CardContent>
        {organization.website && (
          <Button asChild>
            <a
              className='text-primary'
              href={organization.website}
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
          basePath={`/${organization.type.toLocaleLowerCase()}/${slug}`}
          tabs={organizationTabs}
        />
      </CardFooter>
    </Card>
  )
}
