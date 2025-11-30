'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function JobFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(params)
    if (value) newParams.set(key, value)
    else newParams.delete(key)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className='flex gap-2 mb-4'>
      <input
        placeholder='Search'
        defaultValue={params.get('search') ?? ''}
        onChange={(e) => updateParam('search', e.target.value)}
        className='border p-2 rounded'
      />
      <select
        defaultValue={params.get('industry') ?? ''}
        onChange={(e) => updateParam('industry', e.target.value)}
        className='border p-2 rounded'
      >
        <option value=''>All Industries</option>
        <option value='ACCOUNTING'>Accounting</option>
        <option value='ADVERTISING'>Advertising</option>
      </select>
    </div>
  )
}
