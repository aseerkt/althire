import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { JobCard } from '@/features/jobs/components/JobCard'
import { OrganizationJobsCard } from '@/features/jobs/components/OrganizationJobsCard'
import {
  getOrganizationJobCount,
  getOrganizationJobs,
} from '@/features/jobs/server'
import { getOrganizationFromUri } from '@/features/organizations/server'

export default async function OrganizationJobsPage({
  params,
  searchParams,
}: PageProps<'/[orgType]/[uri]/jobs'>) {
  const { uri } = await params
  const { start } = await searchParams

  const skip = Number(start) || 0

  const { organization } = await getOrganizationFromUri(uri)

  if (organization == null) {
    return notFound()
  }
  const jobs = await getOrganizationJobs(organization.id, { skip, limit: 5 })
  const totalOrganizationJobsCount = await getOrganizationJobCount(
    organization.id,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className='-mb-4'>Recently posted jobs</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-3 w-full gap-4'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        <OrganizationJobsCard
          organization={organization}
          totalJobCount={totalOrganizationJobsCount}
        />
      </CardContent>
    </Card>
  )
}
