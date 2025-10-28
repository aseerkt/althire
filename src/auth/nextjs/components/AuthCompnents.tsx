import { getCurrentUser } from '../server'

export const IsSignedIn = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await getCurrentUser()
  return user ? children : null
}

export const IsSignedOut = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await getCurrentUser()
  return user ? null : children
}
