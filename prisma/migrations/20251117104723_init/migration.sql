-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('Remote', 'On-site', 'Hybrid');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('Full-time', 'Part-time', 'Contract', 'Temporary', 'Volunteer', 'Internship');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('Pending', 'Reviewed', 'Accepted', 'Rejected');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('Super Admin', 'Admin', 'Member');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('COMPANY', 'SCHOOL');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('Accounting', 'Advertising', 'Agriculture', 'Airlines & Aviation', 'Apparel & Fashion', 'Architecture & Planning', 'Automotive', 'Banking', 'Biotechnology', 'Broadcast Media', 'Chemicals', 'Civil Engineering', 'Computer Hardware', 'Computer Software', 'Construction', 'Consulting', 'Consumer Electronics', 'Consumer Goods', 'Education', 'Electrical/Electronic Manufacturing', 'Energy', 'Entertainment', 'Environmental Services', 'Financial Services', 'Food & Beverages', 'Government Administration', 'Healthcare', 'Hospitality', 'Human Resources', 'Industrial Automation', 'Information Services', 'Information Technology', 'Insurance', 'Internet', 'Investment Banking', 'Law Practice', 'Legal Services', 'Logistics & Supply Chain', 'Manufacturing', 'Marketing', 'Media', 'Medical Devices', 'Mining & Metals', 'Nonprofit Organization Management', 'Oil & Energy', 'Pharmaceuticals', 'Public Relations & Communications', 'Real Estate', 'Research', 'Restaurants', 'Retail', 'Sports', 'Telecommunications', 'Transportation', 'Utilities', 'Venture Capital & Private Equity', 'Wholesale');

-- CreateEnum
CREATE TYPE "OrganizationSize" AS ENUM ('Self-employed', '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '501-1,000 employees', '1,001-5,000 employees', '5,001-10,000 employees', '10,001+ employees');

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
    "role" "MemberRole" NOT NULL DEFAULT 'Member',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "workMode" "WorkMode" NOT NULL DEFAULT 'On-site',
    "employmentType" "EmploymentType" NOT NULL DEFAULT 'Full-time',
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
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'Pending',
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
    "schoolName" STRING,
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
    "schoolId" STRING,

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
ALTER TABLE "Education" ADD CONSTRAINT "Education_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
