import { SignInLink, SignUpLink } from '@/auth/nextjs/components/AuthButtons'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex flex-col px-6 py-4 max-w-4xl mx-auto'>
      <nav className='flex gap-2 items-center w-full justify-between'>
        <Logo />
        <div className='flex items-center gap-2'>
          <SignInLink>
            <Button variant='outline' size='lg'>
              Sign in
            </Button>
          </SignInLink>
          <SignUpLink>
            <Button size='lg'>Join</Button>
          </SignUpLink>
        </div>
      </nav>
      <div className='flex flex-col gap-4 justify-center items-center w-full text-center min-h-[500px]'>
        <p className='font-semibold text-muted-foreground text-5xl mb-10'>
          Find your dream job and
          <br /> build your career
        </p>
        <SignInLink>
          <Button variant='outline' size='lg'>
            Sign in with email
          </Button>
        </SignInLink>
        <p>
          New to althire? <SignUpLink>Join now</SignUpLink>
        </p>
      </div>
    </div>
  )
}
