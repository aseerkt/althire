import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import pluralize from 'pluralize'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Job, Organization } from '@/generated/prisma'
import { formatDate } from '@/lib/utils'

type JobInfoProps = {
  job: Job & { organization: Organization }
  totalJobApplicantsCount: number
  jobAction?: React.ReactNode
}

export function JobInfo({
  job,
  jobAction,
  totalJobApplicantsCount,
}: JobInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex gap-2 items-center'>
          <BuildingIcon />
          <Link href={`/company/${job.organization.slug}`}>
            {job.organization.name}
          </Link>
        </div>
        <CardTitle className='text-2xl'>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          {formatDate(job.createdAt)} · {totalJobApplicantsCount}{' '}
          {pluralize('applicant', totalJobApplicantsCount)}
        </p>
        <Badge variant='outline'>{job.workMode}</Badge>
      </CardContent>
      {jobAction && (
        <CardFooter>
          <CardAction>{jobAction}</CardAction>
        </CardFooter>
      )}
    </Card>
  )
}
