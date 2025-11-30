import type { z } from 'zod'
import { createEducation } from '../education/actions'
import { EducationForm } from '../education/components/EducationForm'
import { educationWithValidation } from '../education/schemas'
import { createExperience } from '../experience/actions'
import { ExperienceForm } from '../experience/components/ExperienceForm'
import { experienceWithValidation } from '../experience/schemas'

export const userProfileSections = {
  experience: {
    addFormTitle: 'Add experience',
    editFormTitle: 'Edit experience',
    formDescription: '',
    schema: experienceWithValidation,
    action: createExperience,
    defaultValues: {
      title: '',
      description: '',
      organizationName: '',
      isCurrentlyWorking: false,
    } as z.infer<typeof experienceWithValidation>,
    form: ExperienceForm,
  },
  education: {
    addFormTitle: 'Add education',
    editFormTitle: 'Edit education',
    formDescription: '',
    schema: educationWithValidation,
    action: createEducation,
    defaultValues: {
      organizationName: '',
      degree: '',
      grade: '',
    } as z.infer<typeof educationWithValidation>,
    form: EducationForm,
  },
}

export type UserProfileSection = keyof typeof userProfileSections
