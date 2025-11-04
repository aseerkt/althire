'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface RouteTabsProps {
  basePath: string
  tabs: {
    label: string
    value: string // relative path, e.g. "profile", "account"
  }[]
}

export function RouteTabs({ basePath, tabs }: RouteTabsProps) {
  const pathname = usePathname()
  const router = useRouter()

  const currentTab = tabs.find((tab) => pathname === `${basePath}${tab.value}`)
    ? pathname.replace(`${basePath}`, '')
    : '*'

  const handleTabChange = (value: string) => {
    router.push(`${basePath}${value}`)
  }

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className='w-full'>
      <TabsList className='w-full'>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className='flex-1'>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
