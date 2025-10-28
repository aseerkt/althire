'use client'
import { InputField } from '@/components/form/InputField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { OrganizationType } from '@/generated/prisma'
import { slugify } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createOrganization } from '../actions'
import {
  type CreateOrganizationData,
  createOrganizationSchema,
} from '../schemas'

export const CreateOrganizationForm = ({
  organizationType,
}: {
  organizationType: OrganizationType
}) => {
  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<CreateOrganizationData>({
      resolver: zodResolver(createOrganizationSchema),
      defaultValues: {
        name: '',
        slug: '',
        website: '',
        description: '',
        type: organizationType,
      },
    })

  const name = watch('name')

  // auto-fill slug when user types name — but don't overwrite manual edits
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (getValues().slug !== name) {
      setValue('slug', slugify(name))
    }
  }, [name])

  const onSubmit = async (data: CreateOrganizationData) => {
    await createOrganization(data)
  }

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>
        Create company page
      </CardHeader>
      <CardContent>
        <form
          id='create-company-page-form'
          className='flex flex-col gap-5'
          onSubmit={handleSubmit(onSubmit)}
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
          form='create-company-page-form'
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  )
}
