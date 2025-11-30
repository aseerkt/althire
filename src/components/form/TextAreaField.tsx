import { Controller, type FieldValues } from 'react-hook-form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import type { FieldProps } from '@/types'
import { Textarea } from '../ui/textarea'

type TextAreaFieldProps<TFieldValues extends FieldValues> =
  React.InputHTMLAttributes<HTMLTextAreaElement> & FieldProps<TFieldValues>

export const TextAreaField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: TextAreaFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Textarea
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
