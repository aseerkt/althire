import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CompanyJobsCard } from '@/features/jobs/components/CompanyJobsCard'
import { JobCard } from '@/features/jobs/components/JobCard'
import { getCompanyJobCount, getCompanyJobs } from '@/features/jobs/server'
import { getOrganizationBySlug } from '@/features/organizations/server'

export default async function CompanyJobsPage({
  params,
  searchParams,
}: PageProps<'/company/[companySlug]/jobs'>) {
  const { companySlug } = await params
  const { start } = await searchParams

  const skip = Number(start) || 0

  const company = await getOrganizationBySlug(companySlug)

  if (company == null) {
    return notFound()
  }
  const jobs = await getCompanyJobs(company.id, { skip, limit: 5 })
  const totalCompanyJobsCount = await getCompanyJobCount(company.id)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='-mb-4'>Recently posted jobs</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-3 w-full gap-4'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        <CompanyJobsCard
          company={company}
          totalJobCount={totalCompanyJobsCount}
        />
      </CardContent>
    </Card>
  )
}
