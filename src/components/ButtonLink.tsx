import Link, { type LinkProps } from 'next/link'
import { Button } from './ui/button'

type ButtonLinkProps = LinkProps & {
  children: React.ReactNode
  buttonProps?: React.ComponentType<typeof Button>
}

export function ButtonLink({ buttonProps, ...linkProps }: ButtonLinkProps) {
  return (
    <Button variant='ghost' {...buttonProps} asChild>
      <Link {...linkProps} />
    </Button>
  )
}
