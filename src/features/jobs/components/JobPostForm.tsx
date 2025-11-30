'use client'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { NativeSelectOption } from '@/components/ui/native-select'
import type { Organization } from '@/generated/prisma/browser'
import { type EmploymentType, WorkMode } from '@/generated/prisma/enums'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { createJobPost } from '../actions'
import { employmentTypeMap, workModeMap } from '../data'
import { createPostJobSchema } from '../schemas'

type PostJobFormProps = {
  organizations: Organization[]
}

export function PostJobForm({ organizations }: PostJobFormProps) {
  const {
    isPending,
    form,
    handleSubmitAction: handleCreateJobPost,
  } = useZodFormAction({
    schema: createPostJobSchema,
    action: createJobPost,
    defaultValues: {
      title: '',
      description: '',
      workMode: WorkMode.ONSITE,
      organizationId: organizations[0].id,
    },
  })

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>Post a job</CardHeader>
      <CardContent>
        <form
          id='create-job-post-form'
          className='flex flex-col gap-5'
          onSubmit={handleCreateJobPost}
        >
          <InputField
            name='title'
            control={form.control}
            label='Job title'
            type='text'
            required
          />
          <SelectField
            name='organizationId'
            control={form.control}
            label='Organization'
            required
          >
            {organizations.map((organization) => (
              <NativeSelectOption key={organization.id} value={organization.id}>
                {organization.name}
              </NativeSelectOption>
            ))}
          </SelectField>
          <SelectField
            name='workMode'
            control={form.control}
            label='Work mode'
            required
          >
            {Object.keys(workModeMap).map((workMode) => (
              <NativeSelectOption key={workMode} value={workMode}>
                {workModeMap[workMode as WorkMode]}
              </NativeSelectOption>
            ))}
          </SelectField>
          <SelectField
            name='employmentType'
            control={form.control}
            label='Employment type'
            required
          >
            {Object.keys(employmentTypeMap).map((employmentType) => (
              <NativeSelectOption
                key={employmentType}
                value={employmentTypeMap[employmentType as EmploymentType]}
              >
                {employmentType}
              </NativeSelectOption>
            ))}
          </SelectField>
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
          disabled={isPending}
          type='submit'
          className='ml-auto'
          form='create-job-post-form'
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  )
}
