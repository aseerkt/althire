'use client'

import { DialogForm } from '@/components/DialogForm'
import { Button } from '@/components/ui/button'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { editOrganization } from '../actions'
import { type EditOrganizationData, editOrganizationSchema } from '../schemas'
import { OrganizationForm } from './OrganizationForm'

export const EditOrganization = ({
  organization,
}: {
  organization: EditOrganizationData
}) => {
  const { open, toggleOpen } = useDisclosure()
  const { isPending, handleSubmitAction, form } = useZodFormAction({
    schema: editOrganizationSchema,
    action: editOrganization,
    defaultValues: editOrganizationSchema.parse(organization),
    onSuccess: toggleOpen,
  })

  return (
    <>
      <Button onClick={toggleOpen} variant='outline'>
        Edit page
      </Button>
      <DialogForm
        formTitle='Edit organization'
        onSubmit={handleSubmitAction}
        open={open}
        dialogKey={organization.id}
        onOpenChange={toggleOpen}
        form={form}
        isPending={isPending}
      >
        <OrganizationForm mode='EDIT' />
      </DialogForm>
    </>
  )
}
