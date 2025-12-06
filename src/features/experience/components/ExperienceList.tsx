import { PencilIcon } from 'lucide-react'
import { ButtonLink } from '@/components/ButtonLink'
import { UserResourceList } from '@/features/users/components/UserResourceList'
import { getUserExperiences } from '../server'
import { ExperienceItem } from './ExperienceItem'

export async function ExperienceList({
  userId,
  editHref,
}: {
  userId: string
  editHref?: (itemId: string) => string
}) {
  return (
    <UserResourceList
      userId={userId}
      emptyTitle='No experience added'
      emptyDescription='You haven’t added any work experience yet'
      itemFetcher={getUserExperiences}
      ItemComponent={({ item }) => (
        <ExperienceItem
          experience={item}
          action={
            editHref ? (
              <ButtonLink href={editHref(item.id)}>
                <PencilIcon />
              </ButtonLink>
            ) : null
          }
        />
      )}
    />
  )
}
