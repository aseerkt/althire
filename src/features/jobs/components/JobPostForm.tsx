'use client'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { NativeSelectOption } from '@/components/ui/native-select'
import { type Organization, WorkMode } from '@/generated/prisma'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { createJobPost } from '../actions'
import { createPostJobSchema } from '../schemas'

type PostJobFormProps = {
  organizations: Organization[]
}

export function PostJobForm({ organizations }: PostJobFormProps) {
  const {
    isPending,
    control,
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
            control={control}
            label='Job title'
            type='text'
            required
          />
          <SelectField
            name='organizationId'
            control={control}
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
            control={control}
            label='Work mode'
            required
          >
            {Object.keys(WorkMode).map((workMode) => (
              <NativeSelectOption key={workMode} value={workMode}>
                {workMode}
              </NativeSelectOption>
            ))}
          </SelectField>
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
