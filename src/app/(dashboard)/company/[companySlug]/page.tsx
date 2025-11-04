import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { industryMap, organizationSizeMap } from '@/features/organizations/data'
import { getOrganizationBySlug } from '@/features/organizations/server'

export default async function CompanyPage({
  params,
}: PageProps<'/company/[companySlug]'>) {
  const { companySlug } = await params

  const company = await getOrganizationBySlug(companySlug)

  if (company == null) {
    return notFound()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl -mb-4'>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>{company.description}</p>
        <div className='flex flex-col mt-4 gap-2'>
          {company.website && (
            <div className='flex flex-col'>
              <b>Website</b>
              <a href={company.website}>{company.website}</a>
            </div>
          )}
          <div>
            <b>Industry</b>
            <p className='text-muted-foreground'>
              {industryMap[company.industry]}
            </p>
          </div>
          <div>
            <b>Company size</b>
            <p className='text-muted-foreground'>
              {organizationSizeMap[company.size]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
