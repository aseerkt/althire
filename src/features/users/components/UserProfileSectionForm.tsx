'use client'
import { usePathname, useRouter } from 'next/navigation'
import type { FieldValues } from 'react-hook-form'
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
    onSuccess: redirectToProfilePage,
  })

  function redirectToProfilePage() {
    router.push(`/alt/${username}`)
  }

  return (
    <DialogForm
      dialogKey={pathname}
      open
      onOpenChange={redirectToProfilePage}
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
