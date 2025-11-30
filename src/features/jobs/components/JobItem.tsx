import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item'
import type { Prisma } from '@/generated/prisma/browser'

type JobWithOrganization = Prisma.JobGetPayload<{
  include: { organization: true }
}>

export function JobItem({ job }: { job: JobWithOrganization }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Item variant='outline' className='bg-card'>
        <ItemMedia className='h-full'>
          <BuildingIcon className='h-10 w-10' />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className='font-semibold mb-2'>
            {job.title} ({job.workMode})
          </ItemTitle>
          <ItemContent>{job.organization.name}</ItemContent>
        </ItemContent>
      </Item>
    </Link>
  )
}
