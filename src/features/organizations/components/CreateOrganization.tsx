'use client'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { OrganizationType } from '@/generated/prisma/enums'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { createOrganization } from '../actions'
import { createOrganizationSchema } from '../schemas'
import { OrganizationForm } from './OrganizationForm'

export const CreateOrganization = () => {
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

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>
        Create althire page
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form
            id='company-page-form'
            className='flex flex-col gap-5'
            onSubmit={handleSubmitAction}
          >
            <OrganizationForm mode='ADD' />
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          className='ml-auto'
          disabled={isPending}
          form='company-page-form'
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  )
}
