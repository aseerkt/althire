import type { ReactNode } from 'react'
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { DialogFooter, DialogHeader } from './ui/dialog'

type DialogFormProps<TFormValues extends FieldValues> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<TFormValues>
  onSubmit: () => void
  formTitle: ReactNode
  children: ReactNode
  isPending?: boolean
  dialogKey?: string | number
}

export function DialogForm<TFormValues extends FieldValues>({
  open,
  onOpenChange,
  form,
  onSubmit,
  formTitle,
  children,
  isPending = false,
  dialogKey,
}: DialogFormProps<TFormValues>) {
  return (
    <Dialog modal key={dialogKey} open={open} onOpenChange={onOpenChange}>
      <FormProvider {...form} key={dialogKey}>
        <form onSubmit={onSubmit} id='dialog-form'>
          <DialogContent className='sm:max-w-112.5 max-h-[calc(100dvh-100px)] flex flex-col gap-0 p-0'>
            <DialogHeader className='p-6 border-b'>
              <DialogTitle>{formTitle}</DialogTitle>
            </DialogHeader>

            <div className='flex-1 overflow-y-auto'>
              <div className='px-6 py-8 flex flex-col space-y-4'>
                {children}
              </div>
            </div>

            <DialogFooter className='p-6 border-t'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' form='dialog-form' disabled={isPending}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  )
}
