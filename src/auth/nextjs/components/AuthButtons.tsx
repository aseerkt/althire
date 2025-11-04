import Link from 'next/link'
import type React from 'react'

export function SignInLink({ children }: { children?: React.ReactNode }) {
  return <Link href='/sign-in'>{children}</Link>
}

export function SignUpLink({ children }: { children?: React.ReactNode }) {
  return <Link href='/sign-up'>{children}</Link>
}
