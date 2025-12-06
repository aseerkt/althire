import dynamic from 'next/dynamic'
import { createEducation } from '../education/actions'
import {
  type EducationFormValues,
  educationWithValidation,
} from '../education/schemas'
import { createExperience } from '../experience/actions'
import {
  type ExperienceFormValues,
  experienceWithValidation,
} from '../experience/schemas'

// form components

const EducationForm = dynamic(() =>
  import('../education/components/EducationForm').then((m) => m.EducationForm),
)

const ExperienceForm = dynamic(() =>
  import('../experience/components/ExperienceForm').then(
    (m) => m.ExperienceForm,
  ),
)

export const userProfileSections = {
  experience: {
    addFormTitle: 'Add experience',
    editFormTitle: 'Edit experience',
    schema: experienceWithValidation,
    action: createExperience,
    defaultValues: {
      title: '',
      description: '',
      organizationName: '',
      isCurrentlyWorking: false,
    } as ExperienceFormValues,
    form: ExperienceForm,
  },
  education: {
    addFormTitle: 'Add education',
    editFormTitle: 'Edit education',
    schema: educationWithValidation,
    action: createEducation,
    defaultValues: {
      organizationName: '',
      degree: '',
      grade: '',
    } as EducationFormValues,
    form: EducationForm,
  },
}

export type UserProfileSection = keyof typeof userProfileSections
