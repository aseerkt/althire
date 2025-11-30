import { EmploymentType, WorkMode } from '@/generated/prisma/enums'

export const employmentTypeMap = {
  [EmploymentType.FULL_TIME]: 'Full-time',
  [EmploymentType.PART_TIME]: 'Part-time',
  [EmploymentType.CONTRACT]: 'Contract',
  [EmploymentType.INTERNSHIP]: 'Internship',
  [EmploymentType.TEMPORARY]: 'Temporary',
  [EmploymentType.VOLUNTEER]: 'Volunteer',
}

export const workModeMap = {
  [WorkMode.ONSITE]: 'Onsite',
  [WorkMode.REMOTE]: 'Remote',
  [WorkMode.HYBRID]: 'Hybrid',
}
