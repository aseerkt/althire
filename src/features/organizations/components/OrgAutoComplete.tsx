import { useFormContext } from 'react-hook-form'
import useSWR from 'swr'
import { AutoComplete } from '@/components/form/AutoComplete'
import type { Organization } from '@/generated/prisma/browser'
import { OrganizationType } from '@/generated/prisma/enums'
import { useDebounce } from '@/hooks/use-debounce'
import { fetcher } from '@/lib/fetch'

type OrgAutoCompleteFormFields = {
  organizationName: string
  organizationId: string
}

export const OrgAutoComplete = ({
  label,
  schoolOnly,
}: {
  label: React.ReactNode
  schoolOnly?: boolean
}) => {
  const form = useFormContext<OrgAutoCompleteFormFields>()

  const debouncedSearch = useDebounce(form.watch('organizationName'))

  const { data = [], isLoading } = useSWR<Organization[]>(() => {
    const searchParams = new URLSearchParams()
    if (debouncedSearch.length < 1) return null
    searchParams.append('search', debouncedSearch)
    if (schoolOnly) {
      searchParams.append('type', OrganizationType.SCHOOL)
    }
    return `/api/organizations?${searchParams.toString()}`
  }, fetcher)

  return (
    <AutoComplete
      label={label}
      control={form.control}
      name='organizationName'
      data={data}
      isLoading={isLoading}
      getOptionId={(org) => org.id}
      getOptionLabel={(org) => org.name}
      onSelectValue={(value) => {
        form.setValue('organizationId', value)
        const orgName = data.find((org) => org.id === value)?.name
        if (orgName) {
          form.setValue('organizationName', orgName)
        }
      }}
      inputProps={{
        placeholder: 'Search organizations...',
        onChange: () => form.resetField('organizationId'),
      }}
    />
  )
}
