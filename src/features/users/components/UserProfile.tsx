import { UserIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import EducationList from '@/features/education/components/EducationList'
import ExperienceList from '@/features/experience/components/ExperienceList'
import { UserProfileSection } from '../layouts/UserProfileSection'
import { getUserByUsername } from '../server'

const sections = [
  {
    title: 'Experience',
    editHref: '/details/experience',
    addHref: '/forms/experience/new',
    component: ExperienceList,
  },
  {
    title: 'Education',
    editHref: '/details/education',
    addHref: '/forms/education/new',
    component: EducationList,
  },
]

export async function UserProfile({ username }: { username: string }) {
  const user = await getUserByUsername(username)

  if (!user) {
    return notFound()
  }

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
          editHref={`/alt/${username}${section.editHref}`}
          addHref={`/alt/${username}${section.addHref}`}
        >
          <Suspense fallback={<Skeleton />}>
            <section.component userId={user.id} />
          </Suspense>
        </UserProfileSection>
      ))}
    </div>
  )
}
