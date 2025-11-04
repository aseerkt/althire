'use client'
import { useEffect } from 'react'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { NativeSelectOption } from '@/components/ui/native-select'
import type {
  Industry,
  OrganizationSize,
  OrganizationType,
} from '@/generated/prisma'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { slugify } from '@/lib/utils'
import { createOrganization } from '../actions'
import { industryMap, organizationSizeMap } from '../data'
import { createOrganizationSchema } from '../schemas'

export const CreateOrganizationForm = ({
  organizationType,
}: {
  organizationType: OrganizationType
}) => {
  const { control, isPending, handleSubmitAction, watch, setValue, getValues } =
    useZodFormAction({
      schema: createOrganizationSchema,
      action: createOrganization,
      defaultValues: {
        name: '',
        slug: '',
        website: '',
        description: '',
        type: organizationType,
        size: undefined,
        industry: undefined,
      },
    })

  const name = watch('name')

  // auto-fill slug when user types name
  // biome-ignore lint/correctness/useExhaustiveDependencies: a
  useEffect(() => {
    if (getValues().slug !== name) {
      setValue('slug', slugify(name))
    }
  }, [name])

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>
        Create company page
      </CardHeader>
      <CardContent>
        <form
          id='create-company-page-form'
          className='flex flex-col gap-5'
          onSubmit={handleSubmitAction}
        >
          <InputField
            name='name'
            control={control}
            label='Company name'
            type='text'
            required
            placeholder='Add your company name'
          />
          <InputField
            name='slug'
            control={control}
            label='althire.com/company/*'
            placeholder='Add your unique althire address'
            type='text'
            required
          />
          <InputField
            name='website'
            control={control}
            label='Website'
            type='url'
            placeholder='ex: https://althire.com'
          />
          <SelectField
            name='industry'
            control={control}
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
            control={control}
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
            control={control}
            label='Tagline'
            type='textarea'
            placeholder='ex: An information services firm helping small business succeed'
          />
          <TextAreaField
            maxLength={500}
            name='description'
            control={control}
            label='Description'
            type='textarea'
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          className='ml-auto'
          disabled={isPending}
          form='create-company-page-form'
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  )
}
