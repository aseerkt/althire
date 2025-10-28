import { JobItem } from '@/features/jobs/components/JobItem'
import { getAllJobs } from '@/features/jobs/server'

export default async function JobsPage() {
  const jobs = await getAllJobs()

  if (jobs.length === 0) {
    return <p>No jobs posted yet</p>
  }

  return (
    <div>
      <ul className='flex flex-col gap-4'>
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </ul>
    </div>
  )
}
