import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ApplyJobButton } from '@/features/jobs/components/ApplyJobButton'
import { JobInfo } from '@/features/jobs/components/JobInfo'
import {
  getJobById,
  getTotalApplicantsCount,
  getUserJobApplication,
} from '@/features/jobs/server'
import { hasAdminPrivilege } from '@/features/organizations/permissions'
import { requireAuth } from '@/permissions'

export default async function JobPage({ params }: PageProps<'/jobs/[jobId]'>) {
  const currentUser = await requireAuth()
  const { jobId } = await params

  const job = await getJobById(jobId)

  if (job === null) {
    return notFound()
  }

  const totalJobApplicantsCount = await getTotalApplicantsCount(jobId)

  const isAdmin = await hasAdminPrivilege(currentUser.id, job.organizationId)

  let jobAction: React.JSX.Element | null

  if (isAdmin) {
    jobAction =
      totalJobApplicantsCount === 0 ? null : (
        <Button asChild>
          <Link href={`/jobs/${job.id}/applicants`}>See applicants</Link>
        </Button>
      )
  } else {
    const currentUserApplication = await getUserJobApplication(
      currentUser!.id,
      jobId,
    )

    jobAction = currentUserApplication ? (
      <Button disabled>Applied</Button>
    ) : (
      <ApplyJobButton
        jobId={job.id}
        jobTitle={job.title}
        organizationName={job.organization.name}
      />
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <JobInfo
        job={job}
        totalJobApplicantsCount={totalJobApplicantsCount}
        jobAction={jobAction}
      />
      <Card>
        <CardHeader>
          <CardTitle>About the job</CardTitle>
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
