'use client'

import { useFormContext } from 'react-hook-form'
import { DateField } from '@/components/form/DatePicker'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { NativeSelectOption } from '@/components/ui/native-select'
import { OrgAutoComplete } from '@/features/organizations/components/OrgAutoComplete'
import { industryMap } from '@/features/organizations/data'
import type { Industry } from '@/generated/prisma/enums'
import type { EducationFormValues } from '../schemas'

export function EducationForm() {
  const form = useFormContext<EducationFormValues>()

  return (
    <div className='flex flex-col gap-4'>
      <OrgAutoComplete label='School or university' schoolOnly />
      <InputField
        control={form.control}
        name='degree'
        label='Degree'
        placeholder="Ex: Bachelor's"
      />
      <SelectField
        name='fieldOfStudy'
        control={form.control}
        label='Field of study'
        placeholder='Select field'
      >
        {Object.keys(industryMap).map((industry) => (
          <NativeSelectOption key={industry} value={industry}>
            {industryMap[industry as Industry]}
          </NativeSelectOption>
        ))}
      </SelectField>
      <InputField control={form.control} name='grade' label='Grade' />
      <DateField control={form.control} name='startDate' label='Start date' />
      <DateField control={form.control} name='endDate' label='End date' />
      <TextAreaField
        control={form.control}
        name='activities'
        label='Activities and societies'
        placeholder='Ex: Alpha Phi Omega, Marching Band, Volleyball'
      />
      <TextAreaField
        control={form.control}
        name='description'
        label='Activities and societies'
      />
    </div>
  )
}
