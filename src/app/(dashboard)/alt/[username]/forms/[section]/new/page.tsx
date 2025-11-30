import { notFound } from 'next/navigation'
import { UserProfile } from '@/features/users/components/UserProfile'
import { UserProfileSectionForm } from '@/features/users/components/UserProfileSectionForm'
import type { UserProfileSection } from '@/features/users/data'
import { isValidProfileSection } from '@/features/users/utils'

export default async function AddSectionModal({
  params,
}: PageProps<'/alt/[username]/forms/[section]/new'>) {
  const { username, section } = await params

  if (!isValidProfileSection(section)) {
    return notFound()
  }

  return (
    <>
      <UserProfile username={username} />
      <UserProfileSectionForm
        username={username}
        section={section as UserProfileSection}
        mode='ADD'
      />
    </>
  )
}
