import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { EducationList } from '@/features/education/components/EducationList'
import { ExperienceList } from '@/features/experience/components/ExperienceList'
import { requireAuth } from '@/permissions'
import { UserProfileSection } from '../layouts/UserProfileSection'
import { getUserByUsername } from '../server'
import { UserProfileInfo } from './UserProfileInfo'

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
      <UserProfileInfo user={user} />

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
