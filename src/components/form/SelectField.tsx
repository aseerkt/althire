import { Controller, type FieldValues } from 'react-hook-form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import type { FieldProps } from '@/types'
import { NativeSelect, NativeSelectOption } from '../ui/native-select'

type SelectFieldProps<TFieldValues extends FieldValues> =
  React.SelectHTMLAttributes<HTMLSelectElement> &
    FieldProps<TFieldValues> & {
      placeholder: React.ReactNode
    }

export const SelectField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  placeholder,
  children,
  ...props
}: SelectFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      // biome-ignore lint/suspicious/noExplicitAny: false
      defaultValue={'' as any}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <NativeSelect
            {...field}
            {...props}
            id={field.name}
            aria-invalid={fieldState.invalid}
          >
            {placeholder && (
              <NativeSelectOption value='' disabled hidden>
                {placeholder}
              </NativeSelectOption>
            )}
            {children}
          </NativeSelect>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}
