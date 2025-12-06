import { Building2Icon } from 'lucide-react'
import { CardTitle } from '@/components/ui/card'
import type { Education } from '@/generated/prisma/browser'
import { formatDateRangeWithDuration } from '@/lib/utils'

type EducationItemProps = {
  education: Education
  action?: React.ReactNode
}

export function EducationItem({ education, action }: EducationItemProps) {
  return (
    <li>
      <div className='flex flex-row py-4 gap-4'>
        <div>
          <Building2Icon className='w-10 h-10' />
        </div>
        <div className='flex-1'>
          <CardTitle className='mb-2'>{education.organizationName}</CardTitle>
          <div>{education.degree}</div>
          <div className='text-muted-foreground'>
            {formatDateRangeWithDuration(
              education.startDate,
              education.endDate,
            )}
          </div>
          <p>{education.description}</p>
        </div>
        <div>{action}</div>
      </div>
    </li>
  )
}
