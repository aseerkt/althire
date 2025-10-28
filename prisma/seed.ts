import { faker } from '@faker-js/faker'
import { hashPassword } from '@/auth/core/passwordHasher'
import {
  EmploymentType,
  Industry,
  OrganizationSize,
  type Prisma,
  PrismaClient,
  WorkMode,
} from '@/generated/prisma'
import { slugify } from '@/lib/utils'

// Prisma Client

const prisma = new PrismaClient()

// Constants

const USER_PASSWORD = 'test@123'
const USER_SALT = 'salt'

const USER_COUNT = 50
const COMPANY_COUNT = 20
const JOB_COUNT = 20

// helpers

function randomEnumValue<T extends object>(enumObj: T): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][]
  return faker.helpers.arrayElement(values)
}

// MAIN

async function main() {
  console.log('Seeding users...')
  const password = await hashPassword(USER_PASSWORD, USER_SALT)
  const users = await prisma.user.createManyAndReturn({
    data: new Array(USER_COUNT).fill(0).map<Prisma.UserCreateManyInput>(() => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      username: faker.internet.username(),
      headline: faker.person.jobTitle(),
      password: password,
      salt: USER_SALT,
    })),
  })

  console.log('Seeding companies...')

  const companies = await prisma.organization.createManyAndReturn({
    data: new Array(COMPANY_COUNT)
      .fill(0)
      .map<Prisma.OrganizationCreateManyInput>(() => ({
        name: faker.company.name(),
        description: faker.lorem.paragraph(5),
        industry: randomEnumValue(Industry),
        size: randomEnumValue(OrganizationSize),
        slug: slugify(faker.company.name()),
        tagline: faker.person.jobDescriptor(),
        website: faker.internet.url(),
      })),
  })

  console.log('Seeding company members...')

  const createCompanyMembersInput: Prisma.OrganizationMembersCreateManyInput[] =
    []

  for (let i = 0; i < companies.length; i++) {
    for (let j = 0; j < users.length; j++) {
      createCompanyMembersInput.push({
        organizationId: companies[i].id,
        userId: users[j].id,
      })
    }
  }

  await prisma.organizationMembers.createMany({
    data: createCompanyMembersInput,
  })

  console.log('Seeding jobs...')

  const createManyJobInput: Prisma.JobCreateManyInput[] = []

  for (let i = 0; i < companies.length; i++) {
    for (let j = 0; j < JOB_COUNT; j++) {
      createManyJobInput.push({
        organizationId: companies[i].id,
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
