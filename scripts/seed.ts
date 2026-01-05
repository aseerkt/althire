import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { hashPassword } from '@/auth/core/passwordHasher'
import { testUsers } from '@/data/test-users'
import {
  EmploymentType,
  Industry,
  OrganizationSize,
  OrganizationType,
  type Prisma,
  WorkMode,
} from '@/generated/prisma/client'
import { slugify } from '@/lib/utils'
import { prisma } from '@/prisma/client'

// Constants

const USER_PASSWORD = 'test@123'
const USER_SALT = 'salt'

const USER_COUNT = 50
const ORGANIZATION_COUNT = 40
const JOB_COUNT = 20

// helpers

function randomEnumValue<T extends object>(enumObj: T): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][]
  return faker.helpers.arrayElement(values)
}

// MAIN

async function main() {
  console.log('Seeding users...')

  const hashedTestUsers = await Promise.all(
    testUsers.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password, user.salt),
    })),
  )
  const password = await hashPassword(USER_PASSWORD, USER_SALT)
  const users = await prisma.user.createManyAndReturn({
    data: new Array(USER_COUNT)
      .fill(0)
      .map<Prisma.UserCreateManyInput>(() => ({
        email: faker.internet.email(),
        name: faker.person.fullName(),
        username: faker.internet.username(),
        headline: faker.person.jobTitle(),
        password: password,
        salt: USER_SALT,
      }))
      .concat(hashedTestUsers),
  })

  console.log('Seeding organizations...')

  const organizations = await prisma.organization.createManyAndReturn({
    data: new Array(ORGANIZATION_COUNT)
      .fill(0)
      .map<Prisma.OrganizationCreateManyInput>(() => {
        const organizationName = faker.company.name()
        return {
          name: organizationName,
          type: randomEnumValue(OrganizationType),
          description: faker.lorem.paragraph(5),
          industry: randomEnumValue(Industry),
          size: randomEnumValue(OrganizationSize),
          slug: slugify(organizationName),
          tagline: faker.person.jobDescriptor(),
          website: faker.internet.url(),
        }
      }),
  })

  console.log('Seeding organization members...')

  const createOrgMembersInput: Prisma.OrganizationMembersCreateManyInput[] = []

  for (let i = 0; i < organizations.length; i++) {
    for (let j = 0; j < users.length; j++) {
      createOrgMembersInput.push({
        organizationId: organizations[i].id,
        userId: users[j].id,
      })
    }
  }

  await prisma.organizationMembers.createMany({
    data: createOrgMembersInput,
  })

  console.log('Seeding jobs...')

  const createManyJobInput: Prisma.JobCreateManyInput[] = []

  for (let i = 0; i < organizations.length; i++) {
    for (let j = 0; j < JOB_COUNT; j++) {
      createManyJobInput.push({
        organizationId: organizations[i].id,
        title: faker.person.jobTitle(),
        description: faker.lorem.paragraph(10),
        employmentType: randomEnumValue(EmploymentType),
        workMode: randomEnumValue(WorkMode),
      })
    }
  }

  await prisma.job.createMany({ data: createManyJobInput })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
