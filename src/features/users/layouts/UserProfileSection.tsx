import { PencilIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type UserProfileSectionProps = {
  title: string
  addHref?: string
  editHref?: string
  children: React.ReactNode
}

export function UserProfileSection({
  title,
  addHref,
  editHref,
  children,
}: UserProfileSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          {addHref && (
            <Button variant='ghost' size='icon' asChild>
              <Link href={addHref}>
                <PlusIcon />
              </Link>
            </Button>
          )}
          {editHref && (
            <Button variant='ghost' size='icon' asChild>
              <Link href={editHref}>
                <PencilIcon />
              </Link>
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
