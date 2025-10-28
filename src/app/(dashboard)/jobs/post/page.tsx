import { getCurrentUser } from '@/auth/nextjs/server'
import { PostJobForm } from '@/features/jobs/components/JobPostForm'
import { getUserOrganizations } from '@/features/organizations/server'
import { redirect } from 'next/navigation'

export default async function PostJobPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  const userCompanies = await getUserOrganizations(currentUser.id)

  if (userCompanies.length === 0) {
    return redirect('/company/create')
  }

  return <PostJobForm companies={userCompanies} />
}
