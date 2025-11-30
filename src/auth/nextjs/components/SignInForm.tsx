'use client'

import { InputField } from '@/components/form/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Separator } from '@/components/ui/separator'
import { testUsers } from '@/data/test-users'
import { useZodFormAction } from '@/hooks/use-zod-form-action'
import { signIn } from '../actions'
import { signInSchema } from '../schema'
import { SignUpLink } from './AuthButtons'

export const SignInForm = () => {
  const {
    isPending,
    handleSubmitAction: handleSignIn,
    form,
  } = useZodFormAction({
    schema: signInSchema,
    action: signIn,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleOnSelectTestUser = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const email = event.target.value
    form.setValue('email', email)
    form.setValue(
      'password',
      testUsers.find((user) => user.email === email)!.password,
    )
  }

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
            control={form.control}
            label='Email'
            type='email'
            required
          />
          <InputField
            name='password'
            control={form.control}
            label='Password'
            type='password'
            required
          />
        </form>
      </CardContent>
      <CardFooter className='flex flex-col gap-2'>
        <div className='flex justify-between w-full'>
          <NativeSelect defaultValue='' onChange={handleOnSelectTestUser}>
            <NativeSelectOption value='' disabled>
              Select test user
            </NativeSelectOption>
            {testUsers.map((user) => (
              <NativeSelectOption key={user.username} value={user.email}>
                {user.username}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <Button type='submit' disabled={isPending} form='signin-form'>
            Sign in
          </Button>
        </div>
        <Separator />
        <div>
          New to althire? <SignUpLink>Join</SignUpLink>
        </div>
      </CardFooter>
    </Card>
  )
}
