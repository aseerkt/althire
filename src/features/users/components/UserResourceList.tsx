import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type UserResourceListProps<T extends { id: string }> = {
  emptyTitle: string
  emptyDescription: string
  itemFetcher: (userId: string) => Promise<T[]>
  userId: string
  ItemComponent: (props: { item: T }) => React.JSX.Element
}

export async function UserResourceList<T extends { id: string }>({
  emptyTitle,
  emptyDescription,
  userId,
  itemFetcher: fetcher,
  ItemComponent,
}: UserResourceListProps<T>) {
  const items = await fetcher(userId)

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{emptyTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{emptyDescription}</CardDescription>
        </CardContent>
      </Card>
    )
  }

  return (
    <ul className='flex flex-col  divide-y divide-border'>
      {items.map((item: T) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </ul>
  )
}
