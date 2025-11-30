import type { CheckboxProps } from '@radix-ui/react-checkbox'
import { Controller, type FieldValues } from 'react-hook-form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import type { FieldProps } from '@/types'
import { Checkbox } from '../ui/checkbox'

type CheckboxFieldProps<TFieldValues extends FieldValues> = CheckboxProps &
  FieldProps<TFieldValues>

export const CheckboxField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: CheckboxFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className='flex gap-2 items-center'>
            <Checkbox
              {...field}
              {...props}
              checked={field.value}
              onCheckedChange={field.onChange}
              id={field.name}
              aria-invalid={fieldState.invalid}
            />
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          </div>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}
