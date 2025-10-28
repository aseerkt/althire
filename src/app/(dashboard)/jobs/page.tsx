import { Paginator } from '@/components/Paginator'
import { JobItem } from '@/features/jobs/components/JobItem'
import { getAllJobs, getAllJobsCount } from '@/features/jobs/server'

export default async function JobsPage({ searchParams }: PageProps<'/jobs'>) {
  const { start } = await searchParams

  const skip = Number(start) || 0
  const jobs = await getAllJobs({ skip })

  const totalJobCount = await getAllJobsCount()

  if (jobs.length === 0) {
    return <p>No jobs posted yet</p>
  }

  return (
    <div>
      <ul className='flex flex-col gap-4 mb-6'>
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </ul>
      <Paginator skip={skip} totalCount={totalJobCount} />
    </div>
  )
}
