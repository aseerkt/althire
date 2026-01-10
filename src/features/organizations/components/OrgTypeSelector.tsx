import { Building2Icon, BuildingIcon } from 'lucide-react'
import { Controller, type FieldValues } from 'react-hook-form'
import { Field, FieldLabel } from '@/components/ui/field'
import { OrganizationType } from '@/generated/prisma/enums'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types'

const organizationTypes = [
  {
    title: 'Company',
    subTitle: 'Small, medium and large businesses',
    icon: BuildingIcon,
    value: OrganizationType.COMPANY,
  },
  {
    title: 'Educational institution',
    subTitle: 'Schools and universities',
    icon: Building2Icon,
    value: OrganizationType.SCHOOL,
  },
]

type OrgTypeSelectorProps<TFieldValues extends FieldValues> =
  FieldProps<TFieldValues>

export const OrgTypeSelector = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
}: OrgTypeSelectorProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          {label && <FieldLabel>{label}</FieldLabel>}
          <div
            role='radiogroup'
            className='grid grid-cols-2 items-center gap-4'
          >
            {organizationTypes.map((orgType) => (
              <label
                htmlFor={orgType.value}
                key={orgType.value}
                className={cn(
                  'flex bg-accent h-full cursor-pointer hover:shadow-lg flex-col items-center gap-4 p-6 border shadow rounded-md',
                  field.value === orgType.value &&
                    'bg-accent-foreground text-accent',
                )}
              >
                <input
                  type='radio'
                  {...field}
                  value={orgType.value}
                  id={orgType.value}
                  checked={field.value === orgType.value}
                  hidden
                />
                <div className='flex flex-col text-center items-center'>
                  <div className='mb-2'>
                    <orgType.icon className='w-8 h-8' />
                  </div>
                  <b>{orgType.title}</b>
                  <small>{orgType.subTitle}</small>
                </div>
              </label>
            ))}
          </div>
        </Field>
      )}
    />
  )
}
