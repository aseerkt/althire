import { Controller, type FieldValues } from 'react-hook-form'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { useDisclosure } from '@/hooks/use-disclosure'
import type { FieldProps } from '@/types'
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

type AutoCompleteProps<
  TFieldValues extends FieldValues,
  TData,
> = FieldProps<TFieldValues> & {
  data: TData[]
  isLoading: boolean
  getOptionId: (option: TData) => string
  getOptionLabel: (option: TData) => React.ReactNode
  onSelectValue: (value: string) => void
  inputProps: React.ComponentProps<typeof Input>
}

export const AutoComplete = <TFieldValues extends FieldValues, TData>({
  control,
  name,
  data,
  label,
  description,
  isLoading,
  getOptionId,
  getOptionLabel,
  onSelectValue,
  inputProps,
}: AutoCompleteProps<TFieldValues, TData>) => {
  const { open, toggleOpen } = useDisclosure(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Popover modal open={open} onOpenChange={toggleOpen}>
            <PopoverAnchor>
              <Input
                {...inputProps}
                {...field}
                id={field.name}
                onChange={(e) => {
                  toggleOpen()
                  field.onChange(e)
                  inputProps.onChange?.(e)
                }}
                aria-invalid={fieldState.invalid}
              />
            </PopoverAnchor>
            {(isLoading || data.length > 0) && (
              <PopoverContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className='p-0'
              >
                {isLoading && <Skeleton className='h-5 w-full' />}
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {data.map((option) => (
                        <CommandItem
                          key={getOptionId(option)}
                          value={getOptionId(option)}
                          onSelect={(value) => {
                            onSelectValue(value)
                            toggleOpen()
                          }}
                        >
                          {getOptionLabel(option)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            )}
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
