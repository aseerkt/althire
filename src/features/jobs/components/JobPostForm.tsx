'use client'
import { InputField } from '@/components/form/InputField'
import { SelectField } from '@/components/form/SelectField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { NativeSelectOption } from '@/components/ui/native-select'
import { type Organization, WorkMode } from '@/generated/prisma'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createJobPost } from '../actions'
import { type CreateJobPostData, createPostJobSchema } from '../schemas'

type PostJobFormProps = {
  companies: Organization[]
}

export function PostJobForm({ companies }: PostJobFormProps) {
  const { control, handleSubmit } = useForm<CreateJobPostData>({
    resolver: zodResolver(createPostJobSchema),
    defaultValues: {
      title: '',
      description: '',
      workMode: WorkMode.ONSITE,
      organizationId: companies[0].id,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    await createJobPost(data)
  })

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>Post a job</CardHeader>
      <CardContent>
        <form
          id='create-job-post-form'
          className='flex flex-col gap-5'
          onSubmit={onSubmit}
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
            label='Company'
            required
          >
            {companies.map((company) => (
              <NativeSelectOption key={company.id} value={company.id}>
                {company.name}
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
        <Button type='submit' className='ml-auto' form='create-job-post-form'>
          Post
        </Button>
      </CardFooter>
    </Card>
  )
}
