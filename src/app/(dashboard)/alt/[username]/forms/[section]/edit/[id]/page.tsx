import { notFound } from 'next/navigation'
import { UserProfile } from '@/features/users/components/UserProfile'
import { UserProfileSectionForm } from '@/features/users/components/UserProfileSectionForm'
import type { UserProfileSection } from '@/features/users/data'
import {
  getUserByUsername,
  getUserProfileSection,
} from '@/features/users/server'
import { isValidProfileSection } from '@/features/users/utils'

export default async function EditSectionModal({
  params,
}: PageProps<'/alt/[username]/forms/[section]/edit/[id]'>) {
  const { username, section, id: itemId } = await params

  if (!isValidProfileSection(section)) {
    return notFound()
  }

  const user = await getUserByUsername(username)

  if (!user) {
    return notFound()
  }

  const item = await getUserProfileSection(
    user.id,
    section as UserProfileSection,
    itemId,
  )

  if (!item) {
    return notFound()
  }

  return (
    <>
      <UserProfile username={username} />
      <UserProfileSectionForm
        username={username}
        section={section as UserProfileSection}
        mode='EDIT'
        initialData={item}
      />
    </>
  )
}
