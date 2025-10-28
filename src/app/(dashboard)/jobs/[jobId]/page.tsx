import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ApplyJobButton } from '@/features/jobs/components/ApplyJobButton'
import { getJobById } from '@/features/jobs/server'

export default async function JobPage({ params }: PageProps<'/jobs/[jobId]'>) {
  const { jobId } = await params

  const job = await getJobById(jobId)

  if (job === null) {
    return notFound()
  }

  return (
    <div className='flex flex-col gap-6'>
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
          <Badge variant='outline'>{job.workMode}</Badge>
        </CardContent>
        <CardFooter>
          <CardAction>
            <ApplyJobButton
              jobId={job.id}
              jobTitle={job.title}
              companyName={job.organization.name}
            />
          </CardAction>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>About this job</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{job.description}</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>About the company</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex mb-4 gap-2 items-center'>
            <BuildingIcon />
            <Link href={`/company/${job.organization.slug}`}>
              {job.organization.name}
            </Link>
          </div>
          <CardDescription>{job.organization.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
