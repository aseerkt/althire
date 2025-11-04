'use client'

import { InputField } from '@/components/form/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { signUp } from '../actions'
import { signUpSchema } from '../schema'

export const SignUpForm = () => {
  const {
    isPending,
    control,
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
            control={control}
            label='Username'
            type='text'
            required
          />
          <InputField
            name='email'
            control={control}
            label='Email'
            type='email'
            required
          />
          <InputField name='name' control={control} label='Name' required />
          <InputField
            name='password'
            control={control}
            label='Password'
            type='password'
            required
          />
          <InputField
            name='confirmPassword'
            control={control}
            label='Confirm Password'
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
          form='signup-form'
        >
          Sign up
        </Button>
      </CardFooter>
    </Card>
  )
}
