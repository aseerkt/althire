import { Logo } from '@/components/Logo'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='w-full flex justify-center items-center min-h-dvh'>
      <div className='w-full max-w-[400px]'>
        <div className='flex items-center justify-center mb-8'>
          <Link href='/'>
            <Logo />
          </Link>
        </div>
        {children}
      </div>
    </section>
  )
}
