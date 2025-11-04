import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { User } from '@/generated/prisma'

export function UserCard({
  user,
}: {
  user: Omit<User, 'password' | 'salt' | 'email'>
}) {
  return (
    <Card className='pt-0 overflow-hidden'>
      <div className='flex flex-col items-center'>
        <div className='w-full h-16 bg-accent'></div>
        <div className='w-24 h-24 bg-primary-foreground -mt-12 shadow flex justify-center items-center rounded-full'>
          <UserIcon className='w-10 h-10' />
        </div>
      </div>
      <CardHeader className='text-center'>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardFooter className='justify-center'>
        <Button variant='outline' asChild>
          <Link href={`/alt/${user.username}`}>View profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
