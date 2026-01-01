'use client'
import { usePathname, useRouter } from 'next/navigation'
import type { FieldValues } from 'react-hook-form'
import { showAlert } from '@/components/AlertDialogProvider'
import { DialogForm } from '@/components/DialogForm'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { type UserProfileSection, userProfileSections } from '../data'

type BaseProps = {
  username: string
  section: UserProfileSection
}

type AddModeProps = BaseProps & {
  mode?: 'ADD'
  initialData?: never
}

type EditModeProps = BaseProps & {
  mode: 'EDIT'
  initialData: FieldValues
}

type UserProfileSectionFormProps = AddModeProps | EditModeProps

export function UserProfileSectionForm({
  username,
  section,
  mode = 'ADD',
  initialData,
}: UserProfileSectionFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentSection = userProfileSections[section]
  // biome-ignore lint/suspicious/noExplicitAny: false positive
  const { handleSubmitAction, isPending, form } = useZodFormAction<any>({
    schema: currentSection.schema,
    action:
      mode === 'ADD' ? currentSection.createAction : currentSection.editAction,
    defaultValues: mode === 'EDIT' ? initialData : currentSection.defaultValues,
    onSuccess: redirectBack,
  })

  function redirectBack() {
    router.push(`/alt/${username}`)
  }

  function redirectBackWithReset() {
    form.reset()
    redirectBack()
  }

  function handleClose() {
    if (form.formState.isDirty) {
      showAlert({
        title: 'Discard changes',
        description: 'Are you sure you want to discard the changes you made?',
        confirmText: 'Discard',
        cancelText: 'No thanks',
        onConfirm: redirectBackWithReset,
      })
    } else {
      redirectBackWithReset()
    }
  }

  return (
    <DialogForm
      dialogKey={pathname}
      open
      onOpenChange={handleClose}
      formTitle={
        mode === 'ADD'
          ? currentSection.addFormTitle
          : currentSection.editFormTitle
      }
      form={form}
      onSubmit={handleSubmitAction}
      isPending={isPending}
    >
      <currentSection.form />
    </DialogForm>
  )
}
