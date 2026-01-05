-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'VOLUNTEER', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('COMPANY', 'SCHOOL');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('ACCOUNTING', 'ADVERTISING', 'AGRICULTURE', 'AIRLINES_AVIATION', 'APPAREL_FASHION', 'ARCHITECTURE_PLANNING', 'AUTOMOTIVE', 'BANKING', 'BIOTECHNOLOGY', 'BROADCAST_MEDIA', 'CHEMICALS', 'CIVIL_ENGINEERING', 'COMPUTER_HARDWARE', 'COMPUTER_SOFTWARE', 'CONSTRUCTION', 'CONSULTING', 'CONSUMER_ELECTRONICS', 'CONSUMER_GOODS', 'EDUCATION', 'ELECTRICAL_ELECTRONIC_MANUFACTURING', 'ENERGY', 'ENTERTAINMENT', 'ENVIRONMENTAL_SERVICES', 'FINANCIAL_SERVICES', 'FOOD_BEVERAGES', 'GOVERNMENT_ADMINISTRATION', 'HEALTHCARE', 'HOSPITALITY', 'HUMAN_RESOURCES', 'INDUSTRIAL_AUTOMATION', 'INFORMATION_SERVICES', 'INFORMATION_TECHNOLOGY', 'INSURANCE', 'INTERNET', 'INVESTMENT_BANKING', 'LAW_PRACTICE', 'LEGAL_SERVICES', 'LOGISTICS_SUPPLY_CHAIN', 'MANUFACTURING', 'MARKETING', 'MEDIA', 'MEDICAL_DEVICES', 'MINING_METALS', 'NONPROFIT', 'OIL_ENERGY', 'PHARMACEUTICALS', 'PUBLIC_RELATIONS', 'REAL_ESTATE', 'RESEARCH', 'RESTAURANTS', 'RETAIL', 'SPORTS', 'TELECOMMUNICATIONS', 'TRANSPORTATION', 'UTILITIES', 'VENTURE_CAPITAL', 'WHOLESALE');

-- CreateEnum
CREATE TYPE "OrganizationSize" AS ENUM ('SELF_EMPLOYED', 'ONE_TO_TEN', 'ELEVEN_TO_FIFTY', 'FIFTY_ONE_TO_TWO_HUNDRED', 'TWO_HUNDRED_ONE_TO_FIVE_HUNDRED', 'FIVE_HUNDRED_ONE_TO_ONE_THOUSAND', 'ONE_THOUSAND_ONE_TO_FIVE_THOUSAND', 'FIVE_THOUSAND_ONE_TO_TEN_THOUSAND', 'TEN_THOUSAND_PLUS');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "username" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "salt" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "headline" STRING,
    "about" STRING,
    "locationId" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "type" "OrganizationType" NOT NULL DEFAULT 'COMPANY',
    "website" STRING,
    "description" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "industry" "Industry" NOT NULL,
    "size" "OrganizationSize" NOT NULL,
    "tagline" STRING,
    "locationId" STRING,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMembers" (
    "id" STRING NOT NULL,
    "organizationId" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "workMode" "WorkMode" NOT NULL DEFAULT 'ONSITE',
    "employmentType" "EmploymentType" NOT NULL DEFAULT 'FULL_TIME',
    "organizationId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationId" STRING,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "jobId" STRING NOT NULL,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" STRING NOT NULL,
    "latitude" FLOAT8,
    "longitude" FLOAT8,
    "city" STRING NOT NULL,
    "region" STRING NOT NULL,
    "country" STRING NOT NULL,
    "countryCode" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "organizationName" STRING,
    "isCurrentlyWorking" BOOL NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" STRING,
    "employmentType" "EmploymentType" NOT NULL,
    "locationType" "WorkMode" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "locationId" STRING,
    "organizationId" STRING,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" STRING NOT NULL,
    "organizationName" STRING,
    "degree" STRING,
    "fieldOfStudy" STRING,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "grade" STRING,
    "activities" STRING,
    "description" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "organizationId" STRING,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_type_idx" ON "Organization"("type");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMembers_organizationId_userId_key" ON "OrganizationMembers"("organizationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_userId_jobId_key" ON "JobApplication"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembers" ADD CONSTRAINT "OrganizationMembers_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembers" ADD CONSTRAINT "OrganizationMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
