import { Controller, type FieldValues } from 'react-hook-form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { FieldProps } from '@/types'

type InputFieldProps<TFieldValues extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & FieldProps<TFieldValues>

export const InputField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: InputFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Input
            {...field}
            {...props}
            id={field.name}
            aria-invalid={fieldState.invalid}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}
