import { notFound } from 'next/navigation'
import { Paginator } from '@/components/Paginator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { JobInfo } from '@/features/jobs/components/JobInfo'
import {
  getJobApplicants,
  getJobById,
  getTotalApplicantsCount,
} from '@/features/jobs/server'
import { hasAdminPrivilege } from '@/features/organizations/permissions'

export default async function CompanyJobApplicantsPage({
  params,
  searchParams,
}: PageProps<'/jobs/[jobId]/applicants'>) {
  const { start } = await searchParams
  const { jobId } = await params

  const skip = Number(start) || 0

  const job = await getJobById(jobId)

  if (!job) {
    return notFound()
  }

  const isAdmin = await hasAdminPrivilege(job?.organizationId)

  if (!isAdmin) {
    return notFound()
  }

  const jobApplicants = await getJobApplicants(jobId, { skip })

  const totalApplicantsCount = await getTotalApplicantsCount(jobId)

  return (
    <div className='flex flex-col gap-4'>
      <JobInfo job={job} totalJobApplicantsCount={totalApplicantsCount} />
      <Card>
        <CardHeader>
          <CardTitle>List of applicants</CardTitle>
        </CardHeader>
        <CardContent>
          {totalApplicantsCount === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No applicants for the job yet</CardTitle>
              </CardHeader>
            </Card>
          ) : (
            <>
              {jobApplicants.map((applicant) => (
                <div key={applicant.id}>{applicant.user.name}</div>
              ))}
              <Paginator skip={skip} totalCount={totalApplicantsCount} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
