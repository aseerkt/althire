import { Skeleton } from '@/components/ui/skeleton'

export default function OrganizationPageLoading() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-60 w-full' />
    </div>
  )
}
