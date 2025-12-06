import { PencilIcon } from 'lucide-react'
import { ButtonLink } from '@/components/ButtonLink'
import { UserResourceList } from '@/features/users/components/UserResourceList'
import { getUserEducations } from '../server'
import { EducationItem } from './EducationItem'

export async function EducationList({
  userId,
  editHref,
}: {
  userId: string
  editHref?: (itemId: string) => string
}) {
  return (
    <UserResourceList
      userId={userId}
      emptyTitle='No education added'
      emptyDescription="You haven't added any education details"
      itemFetcher={getUserEducations}
      ItemComponent={({ item }) => (
        <EducationItem
          education={item}
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
