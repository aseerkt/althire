'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

export const NavLink = (props: ComponentProps<typeof Link>) => {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        pathname === props.href && 'border-b-3 border-foreground',
        props.className,
      )}
    />
  )
}
