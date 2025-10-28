import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { NativeSelect } from '../ui/native-select'

interface SelectFieldProps<TFieldValues extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  description?: React.ReactNode
}

export const SelectField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: SelectFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <NativeSelect
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
