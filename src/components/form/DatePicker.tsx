import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'
import { Controller, type FieldValues } from 'react-hook-form'
import { date } from 'zod'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { useDisclosure } from '@/hooks/use-disclosure'
import { formatLocaleDateString } from '@/lib/utils'
import type { FieldProps } from '@/types'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

type DateFieldProps<TFieldValues extends FieldValues> =
  FieldProps<TFieldValues> &
    React.ComponentProps<typeof Calendar> & { disabled?: boolean }

export const DateField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: DateFieldProps<TFieldValues>) => {
  const { open, toggleOpen } = useDisclosure(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} aria-disabled={props.disabled}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Popover open={open} onOpenChange={toggleOpen} modal>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                data-empty={!date}
                disabled={props.disabled}
                className='data-[empty=true]:text-muted-foreground w-70 justify-start text-left font-normal'
              >
                <CalendarIcon />
                {field.value ? (
                  formatLocaleDateString(field.value)
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto overflow-hidden p-0 z-10'
              align='start'
            >
              <Calendar
                mode='single'
                captionLayout='dropdown'
                {...field}
                selected={field.value}
                month={field.value}
                onSelect={(date) => {
                  field.onChange(date)
                  toggleOpen()
                }}
                onMonthChange={field.onChange}
              />
            </PopoverContent>
          </Popover>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}
