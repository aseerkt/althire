import { UserIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { PublicUser } from '../types'
import { UserInfoForm } from './UserInfoForm'

export function UserProfileInfo({ user }: { user: PublicUser }) {
  return (
    <Card className='pt-0 overflow-hidden'>
      <div className='h-24 bg-primary'></div>
      <div className='px-6 -mt-24'>
        <div className='flex items-center justify-center h-28 w-28 rounded-full ring-3 ring-primary-foreground mb-6 bg-background'>
          <UserIcon className='h-20 w-20 text-primary' />
        </div>
        <div className='relative'>
          <UserInfoForm user={user} />
          <h1 className='text-2xl font-bold'>{user.name}</h1>
          <p>{user.headline}</p>
        </div>
      </div>
    </Card>
  )
}
