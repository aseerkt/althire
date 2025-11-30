import { userProfileSections } from './data'

export const isValidProfileSection = (section: string) =>
  section in userProfileSections
