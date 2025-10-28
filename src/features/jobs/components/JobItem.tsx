import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import type { Prisma } from '@/generated/prisma'

type JobWithCompany = Prisma.JobGetPayload<{ include: { organization: true } }>

export function JobItem({ job }: { job: JobWithCompany }) {
  return (
    <Item variant='outline' className='bg-card'>
      <ItemMedia className='h-full'>
        <BuildingIcon className='h-10 w-10' />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className='font-semibold mb-2'>
          <Link href={`/jobs/${job.id}`}>
            {job.title} ({job.workMode})
          </Link>
        </ItemTitle>
        <ItemContent>{job.organization.name}</ItemContent>
      </ItemContent>
      <ItemActions>
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>Apply</Link>
        </Button>
      </ItemActions>
    </Item>
  )
}
