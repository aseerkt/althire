'use client'

import { Slot } from '@radix-ui/react-slot'
import type { Button } from '@/components/ui/button'
import { signOut } from '../actions'

export function LogoutButton({
  children,
  asChild,
  ...props
}: { children?: React.ReactNode } & React.ComponentProps<typeof Button>) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp {...props} data-slot='button' type='button' onClick={signOut}>
      {children}
    </Comp>
  )
}
