'use client'

import { InputField } from '@/components/form/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { signIn } from '../actions'
import { signInSchema } from '../schema'

export const SignInForm = () => {
  const {
    isPending,
    handleSubmitAction: handleSignIn,
    control,
  } = useZodFormAction({
    schema: signInSchema,
    action: signIn,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>Sign In</CardHeader>
      <CardContent>
        <form
          id='signin-form'
          className='flex flex-col gap-5'
          onSubmit={handleSignIn}
        >
          <InputField
            name='email'
            control={control}
            label='Email'
            type='email'
            required
          />
          <InputField
            name='password'
            control={control}
            label='Password'
            type='password'
            required
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          disabled={isPending}
          className='ml-auto'
          form='signin-form'
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  )
}
