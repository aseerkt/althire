'use client'

import { InputField } from '@/components/form/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { signUp } from '../actions'
import { signUpSchema } from '../schema'
import { SignInLink } from './AuthButtons'

export const SignUpForm = () => {
  const {
    isPending,
    form,
    handleSubmitAction: handleSignUp,
  } = useZodFormAction({
    schema: signUpSchema,
    action: signUp,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  })

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>Sign Up</CardHeader>
      <CardContent>
        <form
          id='signup-form'
          className='flex flex-col gap-5'
          onSubmit={handleSignUp}
        >
          <InputField
            name='username'
            control={form.control}
            label='Username'
            type='text'
            required
          />
          <InputField
            name='email'
            control={form.control}
            label='Email'
            type='email'
            required
          />
          <InputField
            name='name'
            control={form.control}
            label='Name'
            required
          />
          <InputField
            name='password'
            control={form.control}
            label='Password'
            type='password'
            required
          />
          <InputField
            name='confirmPassword'
            control={form.control}
            label='Confirm Password'
            type='password'
            required
          />
        </form>
      </CardContent>
      <CardFooter className='flex flex-col gap-2'>
        <Button
          type='submit'
          disabled={isPending}
          className='ml-auto'
          form='signup-form'
        >
          Sign up
        </Button>
        <Separator />
        <div>
          Already have an account? <SignInLink>Sign in</SignInLink>
        </div>
      </CardFooter>
    </Card>
  )
}
