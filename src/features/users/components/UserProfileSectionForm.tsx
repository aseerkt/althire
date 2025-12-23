'use client'
import { usePathname, useRouter } from 'next/navigation'
import { type FieldValues, FormProvider } from 'react-hook-form'
import { showAlert } from '@/components/AlertDialogProvider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
    <Dialog key={pathname} open onOpenChange={handleClose}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmitAction} id='section-form'>
          <DialogContent className='sm:max-w-112.5 max-h-[calc(100dvh-100px)] flex flex-col gap-0 p-0'>
            <DialogHeader className='p-6 border-b'>
              <DialogTitle>
                {mode === 'ADD'
                  ? currentSection.addFormTitle
                  : currentSection.editFormTitle}
              </DialogTitle>
            </DialogHeader>
            <div className='flex-1 overflow-y-auto'>
              <div className='px-6 py-8 flex flex-col space-y-4'>
                <currentSection.form />
              </div>
            </div>

            <DialogFooter className='p-6 border-t'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' form='section-form' disabled={isPending}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  )
}
