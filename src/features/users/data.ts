import dynamic from 'next/dynamic'
import type z from 'zod'
import { createEducation, editEducation } from '../education/actions'
import { educationWithValidation } from '../education/schemas'
import { createExperience, editExperience } from '../experience/actions'
import { experienceWithValidation } from '../experience/schemas'
import type { ProfileSectionConfig } from './types'

// form components

const EducationForm = dynamic(() =>
  import('../education/components/EducationForm').then((m) => m.EducationForm),
)

const ExperienceForm = dynamic(() =>
  import('../experience/components/ExperienceForm').then(
    (m) => m.ExperienceForm,
  ),
)

// form section

export const userProfileSections = {
  experience: {
    addFormTitle: 'Add experience',
    editFormTitle: 'Edit experience',
    schema: experienceWithValidation,
    createAction: createExperience,
    editAction: editExperience,
    defaultValues: {
      title: '',
      description: '',
      organizationName: '',
      isCurrentlyWorking: false,
    },
    form: ExperienceForm,
  } satisfies ProfileSectionConfig<typeof experienceWithValidation>,
  education: {
    addFormTitle: 'Add education',
    editFormTitle: 'Edit education',
    schema: educationWithValidation,
    createAction: createEducation,
    editAction: editEducation,
    defaultValues: {
      organizationName: '',
      degree: '',
      grade: '',
    },
    form: EducationForm,
  } satisfies ProfileSectionConfig<typeof educationWithValidation>,
}

// derived types

export type UserProfileSection = keyof typeof userProfileSections

export type SectionFormSchema<S extends UserProfileSection> =
  (typeof userProfileSections)[S]['schema']

export type SectionFormValues<S extends UserProfileSection> = z.infer<
  SectionFormSchema<S>
>
