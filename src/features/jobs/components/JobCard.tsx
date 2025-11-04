import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Prisma } from '@/generated/prisma'
import { formatDate } from '@/lib/utils'

type JobWithCompany = Prisma.JobGetPayload<{ include: { organization: true } }>

export function JobCard({ job }: { job: JobWithCompany }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className='min-w-[250px] min-h-[250px] h-full hover:shadow-lg'>
        <CardHeader className='flex items-center gap-2'>
          <BuildingIcon className='h-10 w-10' />
          <p>{job.organization.name}</p>
        </CardHeader>
        <CardContent className='flex-1'>
          <CardTitle>
            {job.title} ({job.workMode})
          </CardTitle>
        </CardContent>
        <CardFooter>{formatDate(job.createdAt)}</CardFooter>
      </Card>
    </Link>
  )
}
