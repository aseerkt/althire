import { Card } from '@/components/ui/card'
import { getUserByUsername } from '@/features/users/server'
import { UserIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function UserPage({
  params,
}: PageProps<'/alt/[username]'>) {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    return notFound()
  }

  return (
    <Card className='pt-0 overflow-hidden'>
      <div className='h-24 bg-primary'></div>
      <div className='px-6 -mt-24'>
        <div className='flex items-center justify-center h-28 w-28 rounded-full ring-3 ring-primary-foreground mb-6 bg-background'>
          <UserIcon className='h-20 w-20 text-primary' />
        </div>
        <div>
          <h1 className='text-2xl font-bold'>{user.name}</h1>
        </div>
      </div>
    </Card>
  )
}
