import { redirect } from 'next/navigation'
import { PostJobForm } from '@/features/jobs/components/JobPostForm'
import { getUserOrganizations } from '@/features/organizations/server'
import { requireAuth } from '@/permissions'

export default async function PostJobPage() {
  const currentUser = await requireAuth()

  const userCompanies = await getUserOrganizations(currentUser.id)

  if (userCompanies.length === 0) {
    return redirect('/company/create')
  }

  return <PostJobForm organizations={userCompanies} />
}
