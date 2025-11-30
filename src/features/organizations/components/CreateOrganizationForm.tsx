'use client'
import { Building2Icon, BuildingIcon } from 'lucide-react'
import { useEffect, useEffectEvent } from 'react'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { NativeSelectOption } from '@/components/ui/native-select'
import {
  type Industry,
  type OrganizationSize,
  OrganizationType,
} from '@/generated/prisma/enums'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { cn, slugify } from '@/lib/utils'
import { createOrganization } from '../actions'
import { industryMap, organizationSizeMap } from '../data'
import { createOrganizationSchema } from '../schemas'

const organizationTypes = [
  {
    title: 'Company',
    subTitle: 'Small, medium and large businesses',
    icon: BuildingIcon,
    value: OrganizationType.COMPANY,
  },
  {
    title: 'Educational institution',
    subTitle: 'Schools and universities',
    icon: Building2Icon,
    value: OrganizationType.SCHOOL,
  },
]

export const CreateOrganizationForm = () => {
  const { isPending, handleSubmitAction, form } = useZodFormAction({
    schema: createOrganizationSchema,
    action: createOrganization,
    defaultValues: {
      name: '',
      slug: '',
      website: '',
      description: '',
      type: OrganizationType.COMPANY,
      size: undefined,
      industry: undefined,
    },
  })

  const selectedType = form.watch('type')

  const name = form.watch('name')

  const slugifyName = useEffectEvent((name: string) => {
    form.setValue('slug', slugify(name))
  })

  useEffect(() => {
    slugifyName(name)
  }, [name])

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>
        Create althire page
      </CardHeader>
      <CardContent>
        <form
          id='create-company-page-form'
          className='flex flex-col gap-5'
          onSubmit={handleSubmitAction}
        >
          <Field>
            <FieldLabel>Organization type</FieldLabel>
            <div
              role='radiogroup'
              className='grid grid-cols-2 items-center gap-4'
            >
              {organizationTypes.map((orgType) => (
                <label
                  htmlFor={orgType.value}
                  key={orgType.value}
                  className={cn(
                    'flex bg-accent h-full cursor-pointer hover:shadow-lg flex-col items-center gap-4 p-6 border shadow rounded-md',
                    selectedType === orgType.value &&
                      'bg-accent-foreground text-accent',
                  )}
                >
                  <input
                    type='radio'
                    value={orgType.value}
                    {...form.register('type')}
                    id={orgType.value}
                    checked={selectedType === orgType.value}
                    hidden
                  />
                  <div className='flex flex-col text-center items-center'>
                    <div className='mb-2'>
                      <orgType.icon className='w-8 h-8' />
                    </div>
                    <b>{orgType.title}</b>
                    <small>{orgType.subTitle}</small>
                  </div>
                </label>
              ))}
            </div>
          </Field>
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
