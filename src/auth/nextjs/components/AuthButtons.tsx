import Link from 'next/link'
import type React from 'react'
import { signOut } from '../actions'

export function SignInLink({ children }: { children?: React.ReactNode }) {
  return <Link href='/sign-in'>{children}</Link>
}

export function SignUpLink({ children }: { children?: React.ReactNode }) {
  return <Link href='/sign-up'>{children}</Link>
}

export function SignOutButton({ children }: { children?: React.ReactNode }) {
  return (
    <button type='button' onClick={() => signOut()}>
      {children}
    </button>
  )
}
