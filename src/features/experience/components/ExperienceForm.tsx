'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { CheckboxField } from '@/components/form/CheckboxField'
import { DateField } from '@/components/form/DatePicker'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { NativeSelectOption } from '@/components/ui/native-select'
import { employmentTypeMap, workModeMap } from '@/features/jobs/data'
import { OrgAutoComplete } from '@/features/organizations/components/OrgAutoComplete'
import type { EmploymentType, WorkMode } from '@/generated/prisma/enums'
import type { ExperienceFormValues } from '../schemas'

export function ExperienceForm() {
  const form = useFormContext<ExperienceFormValues>()

  const isCurrentlyWorking = form.watch('isCurrentlyWorking')

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    if (isCurrentlyWorking) {
      form.resetField('endDate')
    }
  }, [isCurrentlyWorking])

  return (
    <>
      <InputField
        control={form.control}
        name='title'
        label='Title'
        placeholder='Ex: Retail Sales Manager'
      />
      <SelectField
        name='employmentType'
        control={form.control}
        label='Employment type'
        placeholder='Select employment type'
        required
      >
        {Object.keys(employmentTypeMap).map((employmentType) => (
          <NativeSelectOption key={employmentType} value={employmentType}>
            {employmentTypeMap[employmentType as EmploymentType]}
          </NativeSelectOption>
        ))}
      </SelectField>
      <OrgAutoComplete label='Company or organization' />
      <CheckboxField
        label='I am currently working in this role'
        control={form.control}
        name='isCurrentlyWorking'
      />
      <DateField control={form.control} name='startDate' label='Start date' />
      <DateField
        control={form.control}
        name='endDate'
        label='End date'
        disabled={isCurrentlyWorking}
      />
      <TextAreaField
        control={form.control}
        name='description'
        label='Description'
        placeholder='List your major duties and successes, highlighting specific projects'
      />
      <SelectField
        name='locationType'
        control={form.control}
        label='Location type'
        placeholder='Select location type'
        required
      >
        {Object.keys(workModeMap).map((workMode) => (
          <NativeSelectOption key={workMode} value={workMode}>
            {workModeMap[workMode as WorkMode]}
          </NativeSelectOption>
        ))}
      </SelectField>
    </>
  )
}
