import { UserProfile } from '@/features/users/components/UserProfile'

export default async function UserPage({
  params,
}: PageProps<'/alt/[username]'>) {
  const { username } = await params
  return <UserProfile username={username} />
}
