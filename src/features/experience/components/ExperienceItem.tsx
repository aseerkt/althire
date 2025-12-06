import { BuildingIcon } from 'lucide-react'
import { CardTitle } from '@/components/ui/card'
import { employmentTypeMap, workModeMap } from '@/features/jobs/data'
import type { Experience } from '@/generated/prisma/browser'
import { formatDateRangeWithDuration } from '@/lib/utils'

type ExperienceItemProps = {
  experience: Experience
  action: React.ReactNode
}

export function ExperienceItem({ experience, action }: ExperienceItemProps) {
  return (
    <li>
      <div className='flex py-4 flex-row gap-4'>
        <div>
          <BuildingIcon className='w-10 h-10' />
        </div>
        <div className='flex-1'>
          <CardTitle className='mb-2'>{experience.title}</CardTitle>
          <div>
            {experience.organizationName} ·{' '}
            {employmentTypeMap[experience.employmentType]}
          </div>
          <div className='text-muted-foreground'>
            {formatDateRangeWithDuration(
              experience.startDate,
              experience.isCurrentlyWorking ? null : experience.endDate,
            )}
          </div>
          <div className='text-muted-foreground'>
            {workModeMap[experience.locationType]}
          </div>
          <p>{experience.description}</p>
        </div>
        <div>{action}</div>
      </div>
    </li>
  )
}
