import { UserIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { EducationList } from '@/features/education/components/EducationList'
import { ExperienceList } from '@/features/experience/components/ExperienceList'
import { requireAuth } from '@/permissions'
import { UserProfileSection } from '../layouts/UserProfileSection'
import { getUserByUsername } from '../server'

const sections = [
  {
    title: 'Experience',
    addHref: '/forms/experience/new',
    editHref: (username: string) => (itemId: string) =>
      `/alt/${username}/forms/experience/edit/${itemId}`,
    component: ExperienceList,
  },
  {
    title: 'Education',
    addHref: '/forms/education/new',
    editHref: (username: string) => (itemId: string) =>
      `/alt/${username}/forms/education/edit/${itemId}`,
    component: EducationList,
  },
]

export async function UserProfile({ username }: { username: string }) {
  const user = await getUserByUsername(username)

  if (!user) {
    return notFound()
  }

  const currentUser = await requireAuth()

  const isCurrentUserProfile = currentUser.id === user.id

  return (
    <div className='flex flex-col gap-4'>
      <Card className='pt-0 overflow-hidden'>
        <div className='h-24 bg-primary'></div>
        <div className='px-6 -mt-24'>
          <div className='flex items-center justify-center h-28 w-28 rounded-full ring-3 ring-primary-foreground mb-6 bg-background'>
            <UserIcon className='h-20 w-20 text-primary' />
          </div>
          <div>
            <h1 className='text-2xl font-bold'>{user.name}</h1>
            <p>{user.headline}</p>
          </div>
        </div>
      </Card>

      {sections.map((section) => (
        <UserProfileSection
          title={section.title}
          key={section.title}
          addHref={
            isCurrentUserProfile
              ? `/alt/${username}${section.addHref}`
              : undefined
          }
        >
          <Suspense fallback={<Skeleton />}>
            <section.component
              userId={user.id}
              editHref={
                isCurrentUserProfile ? section.editHref(username) : undefined
              }
            />
          </Suspense>
        </UserProfileSection>
      ))}
    </div>
  )
}
