import { BriefcaseBusinessIcon, HomeIcon, UsersIcon } from 'lucide-react'
import { Suspense } from 'react'
import { requireAuth } from '@/permissions'
import { Logo } from '../Logo'
import { BusinessMenu } from './BusinessMenu'
import { NavLink } from './NavLink'
import { UserMenu } from './UserMenu'

const navLinks = [
  {
    title: 'Home',
    href: '#',
    icon: HomeIcon,
  },
  {
    title: 'My Network',
    href: '#',
    icon: UsersIcon,
  },
  {
    title: 'Jobs',
    href: '/jobs',
    icon: BriefcaseBusinessIcon,
  },
]

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between sticky top-0 right-0 left-0 z-50 bg-card px-6 h-16 border-b border-muted-foreground/10'>
      <Logo />
      <ul className='h-full flex items-center'>
        <Suspense>
          {navLinks.map((link) => (
            <li key={link.title} className='inline-block ml-6 h-full'>
              <NavLink
                href={link.href}
                className='flex flex-col min-w-16 justify-center font-semibold h-full items-center text-sm text-muted-foreground hover:text-foreground'
              >
                <link.icon strokeWidth={3} className='mb-1 h-5 w-5' />
                {link.title}
              </NavLink>
            </li>
          ))}
        </Suspense>
      </ul>
      <div className='flex items-center gap-6'>
        <Suspense>
          <SuspendedUserMenu />
        </Suspense>
        <BusinessMenu />
      </div>
    </nav>
  )
}

async function SuspendedUserMenu() {
  const currentUser = await requireAuth()
  return <UserMenu username={currentUser.username} />
}
