import { OrganizationType } from '@/generated/prisma/enums'

export function isValidOrgType(orgType: string) {
  return (
    orgType === OrganizationType.COMPANY || orgType === OrganizationType.SCHOOL
  )
}
