import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Organization } from '@/generated/prisma/browser'
import { industryMap, organizationSizeMap } from '../data'

export default function OrganizationAbout({
  organization,
}: {
  organization: Organization
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl -mb-4'>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>{organization.description}</p>
        <div className='flex flex-col mt-4 gap-2'>
          {organization.website && (
            <div className='flex flex-col'>
              <b>Website</b>
              <a href={organization.website}>{organization.website}</a>
            </div>
          )}
          <div>
            <b>Industry</b>
            <p className='text-muted-foreground'>
              {industryMap[organization.industry]}
            </p>
          </div>
          <div>
            <b>Organization size</b>
            <p className='text-muted-foreground'>
              {organizationSizeMap[organization.size]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
