'use client'
import { useEffect, useEffectEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { NativeSelectOption } from '@/components/ui/native-select'
import type { Industry, OrganizationSize } from '@/generated/prisma/enums'
import { slugify } from '@/lib/utils'
import { industryMap, organizationSizeMap } from '../data'
import type { CreateOrganizationData } from '../schemas'
import { OrgTypeSelector } from './OrgTypeSelector'

type OrganizationFormProps = {
  mode: 'ADD' | 'EDIT'
}

export const OrganizationForm = ({ mode }: OrganizationFormProps) => {
  const form = useFormContext<CreateOrganizationData>()

  const selectedType = form.watch('type')

  const name = form.watch('name')

  const slugifyName = useEffectEvent((name: string) => {
    if (!form.formState.dirtyFields.slug) {
      form.setValue('slug', slugify(name), { shouldDirty: false })
    }
  })

  useEffect(() => {
    if (mode === 'ADD') {
      slugifyName(name)
    }
  }, [name, mode])

  return (
    <div className='flex flex-col space-y-4'>
      {mode === 'ADD' && (
        <OrgTypeSelector
          name='type'
          control={form.control}
          label='Organization type'
        />
      )}
      <InputField
        name='name'
        control={form.control}
        label='Name'
        type='text'
        placeholder="Add your organization's name"
      />
      <InputField
        name='slug'
        control={form.control}
        label={`althire.com/${selectedType.toLowerCase()}/*`}
        placeholder='Add your unique althire address'
        type='text'
      />
      <InputField
        name='website'
        control={form.control}
        label='Website'
        type='url'
        placeholder='ex: https://althire.com'
      />
      <SelectField
        name='industry'
        control={form.control}
        label='Industry'
        placeholder='Select industry'
      >
        {Object.keys(industryMap).map((industry) => (
          <NativeSelectOption key={industry} value={industry}>
            {industryMap[industry as Industry]}
          </NativeSelectOption>
        ))}
      </SelectField>
      <SelectField
        name='size'
        control={form.control}
        label='Organization size'
        placeholder='Select size'
      >
        {Object.keys(organizationSizeMap).map((size) => (
          <NativeSelectOption key={size} value={size}>
            {organizationSizeMap[size as OrganizationSize]}
          </NativeSelectOption>
        ))}
      </SelectField>
      <TextAreaField
        maxLength={300}
        name='tagline'
        control={form.control}
        label='Tagline'
        type='textarea'
        placeholder='ex: An information services firm helping small business succeed'
      />
      <TextAreaField
        maxLength={500}
        name='description'
        control={form.control}
        label='Description'
        type='textarea'
      />
    </div>
  )
}
