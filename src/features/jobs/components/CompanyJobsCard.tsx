import { BriefcaseBusinessIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Organization } from '@/generated/prisma'

export function CompanyJobsCard({
  company,
  totalJobCount,
}: {
  company: Organization
  totalJobCount: number
}) {
  return (
    <Card className='min-w-[250px] min-h-[250px] h-full'>
      <CardContent className='flex-1 flex flex-col space-y-4 items-center justify-center'>
        <BriefcaseBusinessIcon className='h-14 w-14' />
        <p className='text-center'>
          {company.name} has {totalJobCount} posted jobs
        </p>
        <Button variant='outline' className='w-max' asChild>
          <Link href='/jobs'>See all jobs</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
