'use client'

import { PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { DialogForm } from '@/components/DialogForm'
import { InputField } from '@/components/form/InputField'
import { TextAreaField } from '@/components/form/TextAreaField'
import { Button } from '@/components/ui/button'
import { LocationAutoComplete } from '@/features/locations/components/LocationAutoComplete'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { editUserInfo } from '../actions'
import { userInfoSchema } from '../schemas'
import type { PublicUser } from '../types'

export function UserInfoForm({ user }: { user: PublicUser }) {
  const [open, setOpen] = useState(false)

  const { form, handleSubmitAction, isPending } = useZodFormAction({
    schema: userInfoSchema,
    action: editUserInfo,
    defaultValues: {
      name: user.name,
      headline: user.headline,
      locationName: '',
      locationId: user.locationId,
    },
    onSuccess: () => setOpen(false),
  })

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpen(true)
    } else {
      form.reset()
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className='absolute right-0 top-0'
        variant='ghost'
        size='icon'
      >
        <PencilIcon />
      </Button>
      {open && (
        <DialogForm
          dialogKey='user-info'
          open
          onOpenChange={handleOpenChange}
          form={form}
          formTitle='Edit intro'
          onSubmit={handleSubmitAction}
          isPending={isPending}
        >
          <InputField control={form.control} name='name' label='Full name' />
          <TextAreaField
            control={form.control}
            name='headline'
            label='Headline'
          />
          <LocationAutoComplete />
        </DialogForm>
      )}
    </>
  )
}
