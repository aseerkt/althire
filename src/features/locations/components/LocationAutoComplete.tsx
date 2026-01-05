import { useFormContext } from 'react-hook-form'
import useSWR from 'swr'
import { AutoComplete } from '@/components/form/AutoComplete'
import type { Location } from '@/generated/prisma/browser'
import { useDebounce } from '@/hooks/use-debounce'
import { fetcher } from '@/lib/fetch'
import type { LocationFields } from '../schemas'
import { displayLocation } from '../utils'

export function LocationAutoComplete() {
  const form = useFormContext<LocationFields>()

  const debouncedSearch = useDebounce(form.watch('locationName'))

  const { data = [], isLoading } = useSWR<Location[]>(() => {
    if (!debouncedSearch) return null
    if (debouncedSearch.length < 1) return null

    const searchParams = new URLSearchParams()
    searchParams.append('query', debouncedSearch)

    return `/api/locations?${searchParams.toString()}`
  }, fetcher)

  return (
    <AutoComplete
      control={form.control}
      name='locationName'
      label='Location'
      getOptionId={(option) => option.id}
      getOptionLabel={displayLocation}
      onSelectValue={(value) => {
        form.setValue('locationId', value)
        const location = data.find((loc) => loc.id === value)
        if (location) {
          const locationName = displayLocation(location)
          form.setValue('locationName', locationName)
        }
      }}
      inputProps={{
        placeholder: 'Search location...',
        onChange: () => form.resetField('locationId'),
      }}
      data={data}
      isLoading={isLoading}
    />
  )
}
